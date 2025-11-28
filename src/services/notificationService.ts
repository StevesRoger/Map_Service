import type { Notification, NotificationType } from '../types/notification';

const STORAGE_KEY = 'roktenh_notifications';
const MAX_NOTIFICATIONS = 50;

type NotificationSubscriber = (notification: Notification) => void;

export class NotificationService {
  private static currentUserId: string | null = null;
  private static subscribers: NotificationSubscriber[] = [];
  
  static initialize(userId: string): void {
    this.currentUserId = userId;
  }

  static getAllNotifications(): Notification[] {
    return this.loadNotifications();
  }

  static getUnreadCount(): number {
    const notifications = this.loadNotifications();
    return notifications.filter(n => !n.read).length;
  }

  static subscribe(callback: NotificationSubscriber): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private static notifySubscribers(notification: Notification): void {
    this.subscribers.forEach(callback => callback(notification));
  }

  private static getTimeAgo(timestamp: number): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600) > 1 ? 's' : ''} ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400) > 1 ? 's' : ''} ago`;
    return `${Math.floor(seconds / 604800)} week${Math.floor(seconds / 604800) > 1 ? 's' : ''} ago`;
  }

  static loadNotifications(): Notification[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const notifications = JSON.parse(stored);
      // Update time ago for all notifications
      return notifications.map((n: Notification) => ({
        ...n,
        time: this.getTimeAgo(n.timestamp)
      }));
    } catch (error) {
      console.error('Error loading notifications:', error);
      return [];
    }
  }

  static saveNotifications(notifications: Notification[]): void {
    try {
      // Keep only the most recent notifications
      const limited = notifications.slice(0, MAX_NOTIFICATIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }

  static createNotification(
    type: NotificationType,
    title: string,
    message: string,
    actionLabel?: string,
    userId?: string
  ): Notification {
    const timestamp = Date.now();
    return {
      id: `notification_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      message,
      time: 'Just now',
      timestamp,
      read: false,
      actionLabel,
      userId
    };
  }

  static addNotification(
    notifications: Notification[],
    type: NotificationType,
    title: string,
    message: string,
    actionLabel?: string,
    userId?: string
  ): Notification[] {
    const newNotification = this.createNotification(type, title, message, actionLabel, userId);
    const updated = [newNotification, ...notifications];
    this.saveNotifications(updated);
    this.notifySubscribers(newNotification);
    return updated;
  }

  static markAsRead(notifications: Notification[], notificationId: string): Notification[] {
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    this.saveNotifications(updated);
    return updated;
  }

  static markAllAsRead(notifications: Notification[]): Notification[] {
    const updated = notifications.map(n => ({ ...n, read: true }));
    this.saveNotifications(updated);
    return updated;
  }

  static clearAll(): Notification[] {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }

  // Auto-generate notifications based on events
  static notifyBalanceZero(notifications: Notification[], balance: number): Notification[] {
    if (balance === 0) {
      // Check if we already have a recent zero balance notification (within last hour)
      const recentZeroBalanceNotification = notifications.find(
        n => n.title.includes('Balance Depleted') && (Date.now() - n.timestamp) < 3600000
      );
      
      if (!recentZeroBalanceNotification) {
        return this.addNotification(
          notifications,
          'error',
          '💸 Balance Depleted',
          'Your wallet balance is $0.00. Top up now to continue using API services.',
          'Top Up Wallet'
        );
      }
    }
    return notifications;
  }

  static notifyLowBalance(notifications: Notification[], balance: number): Notification[] {
    if (balance > 0 && balance < 50) {
      // Check if we already have a recent low balance notification (within last 6 hours)
      const recentLowBalanceNotification = notifications.find(
        n => n.title.includes('Low Balance') && (Date.now() - n.timestamp) < 21600000
      );
      
      if (!recentLowBalanceNotification) {
        return this.addNotification(
          notifications,
          'warning',
          '⚠️ Low Balance Warning',
          `Your wallet balance is $${balance.toFixed(2)}. Consider topping up soon.`,
          'Top Up Wallet'
        );
      }
    }
    return notifications;
  }

  static notifyTopUpSuccess(notifications: Notification[], amount: number, newBalance: number): Notification[] {
    console.log('🔔 NotificationService.notifyTopUpSuccess called', { amount, newBalance, currentCount: notifications.length });
    const result = this.addNotification(
      notifications,
      'success',
      '✅ Top-Up Successful',
      `Added $${amount.toFixed(2)} to your wallet. New balance: $${newBalance.toFixed(2)}`
    );
    console.log('🔔 NotificationService.notifyTopUpSuccess result', { newCount: result.length, newNotification: result[0] });
    return result;
  }

  static notifyAPIKeyCreated(notifications: Notification[], keyName: string): Notification[] {
    return this.addNotification(
      notifications,
      'success',
      '🔑 API Key Created',
      `New API key "${keyName}" has been successfully created.`
    );
  }

  static notifyAPIKeyDeleted(notifications: Notification[], keyName: string): Notification[] {
    return this.addNotification(
      notifications,
      'info',
      '🗑️ API Key Deleted',
      `API key "${keyName}" has been permanently deleted.`
    );
  }

  static notifyAPIKeyStatusChanged(
    notifications: Notification[], 
    keyName: string, 
    status: 'active' | 'inactive'
  ): Notification[] {
    return this.addNotification(
      notifications,
      'info',
      `🔄 API Key ${status === 'active' ? 'Activated' : 'Deactivated'}`,
      `API key "${keyName}" is now ${status}.`
    );
  }

  static notifyBalanceAdjusted(
    notifications: Notification[], 
    amount: number, 
    newBalance: number,
    adjustedBy?: string
  ): Notification[] {
    const isPositive = amount > 0;
    return this.addNotification(
      notifications,
      isPositive ? 'success' : 'warning',
      `💰 Balance ${isPositive ? 'Added' : 'Deducted'}`,
      `${adjustedBy ? `Admin (${adjustedBy}) ` : ''}${isPositive ? 'added' : 'deducted'} $${Math.abs(amount).toFixed(2)}. New balance: $${newBalance.toFixed(2)}`
    );
  }

  static notifyAccountSuspended(notifications: Notification[]): Notification[] {
    return this.addNotification(
      notifications,
      'error',
      '🚫 Account Suspended',
      'Your account has been suspended by an administrator. Please contact support.'
    );
  }

  static notifyAccountActivated(notifications: Notification[]): Notification[] {
    return this.addNotification(
      notifications,
      'success',
      '✅ Account Activated',
      'Your account has been activated. You can now use all services.'
    );
  }

  static notifyWelcome(notifications: Notification[], userName: string): Notification[] {
    return this.addNotification(
      notifications,
      'info',
      '👋 Welcome to RokTenh Map API',
      `Hello ${userName}! Get started by creating your first API key and topping up your wallet.`,
      'Get Started'
    );
  }

  static notifyHighUsage(notifications: Notification[], requestCount: number): Notification[] {
    return this.addNotification(
      notifications,
      'warning',
      '📊 High API Usage Detected',
      `Your API has received ${requestCount.toLocaleString()} requests today. Monitor your usage to avoid unexpected charges.`
    );
  }

  static notifyRateLimitWarning(notifications: Notification[], percentage: number): Notification[] {
    return this.addNotification(
      notifications,
      'warning',
      '⏱️ Rate Limit Warning',
      `You've used ${percentage}% of your rate limit. Consider upgrading or optimizing your requests.`
    );
  }

  // Admin notifications
  static notifyNewUserRegistration(notifications: Notification[], userName: string, userEmail: string): Notification[] {
    return this.addNotification(
      notifications,
      'info',
      '👤 New User Registered',
      `${userName} (${userEmail}) has registered for RokTenh Map API.`
    );
  }

  static notifyUserBalanceDepleted(notifications: Notification[], userName: string): Notification[] {
    return this.addNotification(
      notifications,
      'warning',
      '💸 User Balance Depleted',
      `User "${userName}" has run out of wallet balance.`
    );
  }
}