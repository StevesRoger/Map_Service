export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  timestamp: number;
  read: boolean;
  actionLabel?: string;
  actionCallback?: () => void;
  userId?: string;
}

export interface NotificationTemplate {
  type: NotificationType;
  title: string;
  message: string;
  actionLabel?: string;
}
