import { useState, useEffect, lazy, Suspense, memo, useCallback, useMemo, ComponentType } from 'react';
import { toast } from 'sonner';
import {
  Server,
  Settings,
  BarChart3,
  Key,
  Book,
  Calculator,
  Users,
  Menu,
  X,
  UserCog,
  Wallet,
  LogOut,
  Globe,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Bell,
  CircleDollarSign,
  AlertTriangle,
  DollarSign,
  Plus,
  AlertCircle,
  CheckCircle,
  Info,
  Clock
} from 'lucide-react';

// Critical path imports (needed immediately)
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LandingPage } from './components/LandingPage';

// Lazy loaded components (code splitting)
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const APIKeyManager = lazy(() => import('./components/APIKeyManager').then(m => ({ default: m.APIKeyManager })));
const RequestLogs = lazy(() => import('./components/RequestLogs').then(m => ({ default: m.RequestLogs })));
const APIDocumentation = lazy(() => import('./components/APIDocumentation').then(m => ({ default: m.APIDocumentation })));
const PricingPlans = lazy(() => import('./components/PricingPlans').then(m => ({ default: m.PricingPlans })));
const PricingManagement = lazy(() => import('./components/PricingManagement').then(m => ({ default: m.PricingManagement })));
const WalletManagement = lazy(() => import('./components/WalletManagement').then(m => ({ default: m.WalletManagement })));
const SettingsPage = lazy(() => import('./components/Settings').then(m => ({ default: m.Settings })));
const UserManagement = lazy(() => import('./components/UserManagement').then(m => ({ default: m.UserManagement })));

// Lazy loaded dialogs
const SettingsDialog = lazy(() => import('./components/SettingsDialog').then(m => ({ default: m.SettingsDialog })));
const TopUpDialog = lazy(() => import('./components/TopUpDialog').then(m => ({ default: m.TopUpDialog })));

// Loading Component
import { LoadingFallback, InlineLoader } from './components/LoadingFallback';
import { Logo } from './components/Logo';

// Contexts
import { ThemeProvider } from 'next-themes';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LanguageProvider, useLanguage } from './components/LanguageContext';

// UI Components
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Badge } from './components/ui/badge';

// Services
import { apiServiceManager } from './services/apiService';
import { NotificationService } from './services/notificationService';

// Types
import type { APIKey, APIRequest, UsageStats, ServiceEndpoint, User, Transaction } from './types/api';
import type { Notification } from './types/notification';
import type { Language } from './translations';

type FlagIconProps = { className?: string };

type LanguageOption = {
  code: Language;
  label: string;
  nativeLabel: string;
  Icon: ComponentType<FlagIconProps>;
};

const FlagUS = memo(function FlagUS({ className = 'w-5 h-5' }: FlagIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V385.38c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.621c0-21.178-17.167-38.345-38.345-38.345z"
        fill="#41479b"
      />
      <path
        d="M511.469 120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54 107.147V88.276h-88.276v107.147L48.322 88.276h-9.977c-19.017 0-34.792 13.847-37.814 32.007l139.778 91.58H0v88.276h140.309L.531 391.717c3.022 18.159 18.797 32.007 37.814 32.007h9.977l163.54-107.147v107.147h52.966h35.31V316.577l163.54 107.147h9.977c19.017 0 34.792-13.847 37.814-32.007l-139.778-91.58H512v-88.276H371.691l139.778-91.579z"
        fill="#f5f5f5"
      />
      <path
        d="M282.483 88.276h-52.966v141.241H0v52.966h229.517v141.241h52.966V282.483H512v-52.966H282.483z"
        fill="#ff4b55"
      />
      <path
        d="m24.793 421.252 186.583-121.114h-32.428L9.224 410.31a38.393 38.393 0 0 0 15.569 10.942zM346.388 300.138H313.96l180.716 117.305a38.515 38.515 0 0 0 12.287-13.075l-160.575-104.23zM4.049 109.475l157.73 102.387h32.428L15.475 95.842a38.499 38.499 0 0 0-11.426 13.633zM332.566 211.862l170.035-110.375a38.4 38.4 0 0 0-15.699-10.86L300.138 211.862h32.428z"
        fill="#ff4b55"
      />
    </svg>
  );
});

const FlagKH = memo(function FlagKH({ className = 'w-5 h-5' }: FlagIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M473.654 423.724H38.345C17.167 423.724 0 406.557 0 385.379V126.621c0-21.177 17.167-38.345 38.345-38.345h435.309c21.177 0 38.345 17.167 38.345 38.345v258.758c0 21.178-17.168 38.345-38.345 38.345z"
        fill="#41479b"
      />
      <path d="M0 167.721h512v176.55H0z" fill="#ff4b55" />
      <path
        d="M372.816 322.933v-12.516h-4.172v-8.344h-4.173v-8.344h-4.172v-8.344h-12.516v-25.031h-.001l4.173-4.173v-12.516h-4.172v-8.343h-4.172v-12.517h-4.171v-8.344h-4.172v-8.344h-4.172v-4.171h-8.345v4.171h-4.172v8.344h-4.172v8.344h-4.171v12.517h-4.172v8.343h-25.033V231.15h-4.171v-12.517h-4.172v-12.516h-4.172v-8.343h-4.172v-8.344h-4.172v-4.173h-2.086v-4.172h-4.172v4.172h-2.087v4.173h-4.171v8.344h-4.172v8.343h-4.172v12.516h-4.172v12.517h-4.172v12.515h-25.032v-8.343h-4.172v-12.517h-4.172v-8.344h-4.172v-8.344h-4.172v-4.171h-8.344v4.171h-4.172v8.344h-4.172v8.344h-4.172v12.517h-4.172v8.343h-4.172v12.516l4.17 4.173h.002v25.031h-12.515v8.344h-4.172v8.344h-4.173v8.344h-4.172v12.516h-4.172v12.516h241.975v-12.516z"
        fill="#f5f5f5"
      />
    </svg>
  );
});

function AppContent() {
  const { user, isAuthenticated, authLoading, isNewUser, dismissWelcome, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [requests, setRequests] = useState<APIRequest[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [endpoints, setEndpoints] = useState<ServiceEndpoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>(user?.name || 'Nanith');
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false);
  const [isZeroBalanceAlertDismissed, setIsZeroBalanceAlertDismissed] = useState(false);
  const [isLowBalanceAlertDismissed, setIsLowBalanceAlertDismissed] = useState(false);
  const [adminTransactions, setAdminTransactions] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasShownWelcomeNotification, setHasShownWelcomeNotification] = useState(false);

  // Memoize current user data (before useEffects that need it)
  const currentUser = useMemo(() => 
    users.find(u => u.email === user?.email),
    [users, user?.email]
  );

  const currentUserBalance = useMemo(() => 
    currentUser?.totalBalance || 0,
    [currentUser]
  );

  const currentUserId = useMemo(() => 
    currentUser?.id,
    [currentUser]
  );

  const currentUserName = useMemo(() => 
    currentUser?.name || displayName,
    [currentUser, displayName]
  );

  // Memoize font class
  const fontClass = useMemo(() => 
    language === 'km' ? 'font-kh' : 'font-en',
    [language]
  );

  // Load notifications from localStorage on mount
  useEffect(() => {
    const loadedNotifications = NotificationService.loadNotifications();
    setNotifications(loadedNotifications);
  }, []);

  // Auto-check for balance notifications
  useEffect(() => {
    if (!user || !isAuthenticated) return;
    
    // Auto-generate zero balance notification
    const updatedZero = NotificationService.notifyBalanceZero(notifications, currentUserBalance);
    if (updatedZero.length > notifications.length) {
      setNotifications(updatedZero);
    }

    // Auto-generate low balance notification
    const updatedLow = NotificationService.notifyLowBalance(notifications, currentUserBalance);
    if (updatedLow.length > notifications.length) {
      setNotifications(updatedLow);
    }
  }, [currentUserBalance, user, isAuthenticated, notifications]);

  // Welcome notification for new users (after dismissing welcome screen)
  useEffect(() => {
    if (isAuthenticated && !isNewUser && user && !hasShownWelcomeNotification) {
      const hasWelcomeNotif = notifications.some(n => n.title.includes('Welcome'));
      if (!hasWelcomeNotif) {
        const updated = NotificationService.notifyWelcome(notifications, user.name || 'there');
        setNotifications(updated);
        setHasShownWelcomeNotification(true);
      }
    }
  }, [isAuthenticated, isNewUser, user, hasShownWelcomeNotification]);

  // Load and sync profile photo and display name
  useEffect(() => {
    // Load initial photo from localStorage
    const loadProfilePhoto = () => {
      const savedPhoto = localStorage.getItem('roktenh_profile_photo');
      setProfilePhoto(savedPhoto);
    };

    // Load initial name from localStorage
    const loadDisplayName = () => {
      const savedName = localStorage.getItem('roktenh_fullname');
      if (savedName) {
        setDisplayName(savedName);
      }
    };
    
    loadProfilePhoto();
    loadDisplayName();

    // Listen for storage changes (from Settings component)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'roktenh_profile_photo') {
        setProfilePhoto(e.newValue);
      }
      if (e.key === 'roktenh_fullname') {
        setDisplayName(e.newValue || user?.name || 'Nanith');
      }
    };

    // Listen for custom event when photo changes in same tab
    const handlePhotoUpdate = () => {
      loadProfilePhoto();
    };

    // Listen for custom event when account settings change in same tab
    const handleAccountUpdate = () => {
      loadDisplayName();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profilePhotoUpdated', handlePhotoUpdate);
    window.addEventListener('accountSettingsUpdated', handleAccountUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profilePhotoUpdated', handlePhotoUpdate);
      window.removeEventListener('accountSettingsUpdated', handleAccountUpdate);
    };
  }, [user?.name]);

  // Suppress CSS security errors from browser dev tools/extensions
  useEffect(() => {
    const isStylesheetError = (msg: string) => {
      const patterns = [
        'cssRules',
        'CSSStyleSheet',
        'stylesheet',
        'SecurityError',
        'Cannot access rules',
        'Failed to read',
        'cross-origin'
      ];
      return patterns.some(pattern => msg.toLowerCase().includes(pattern.toLowerCase()));
    };

    // Suppress runtime errors
    const handleError = (event: ErrorEvent) => {
      const message = event.message || '';
      if (isStylesheetError(message)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }
    };

    // Suppress unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason?.message || String(event.reason) || '';
      if (isStylesheetError(message)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    };

    // Suppress console errors and warnings
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args: any[]) => {
      const message = args.map(arg => String(arg)).join(' ');
      if (isStylesheetError(message)) {
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      const message = args.map(arg => String(arg)).join(' ');
      if (isStylesheetError(message)) {
        return;
      }
      originalWarn.apply(console, args);
    };

    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);
    
    return () => {
      window.removeEventListener('error', handleError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  useEffect(() => {
    document.title = 'RokTenh Map - Platform Management Console';
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [keysData, requestsData, statsData, endpointsData] = await Promise.all([
        apiServiceManager.getAPIKeys(),
        apiServiceManager.getRequestHistory(100),
        apiServiceManager.getUsageStats(),
        apiServiceManager.getServiceEndpoints()
      ]);

      setApiKeys(keysData);
      setRequests(requestsData);
      setStats(statsData);
      setEndpoints(endpointsData);

      // Generate mock users based on API keys
      const mockUsers: User[] = [
        {
          id: 'admin_user',
          email: 'admin@roktenh.io',
          name: 'Admin User',
          company: 'RokTenh Map',
          createdAt: '2024-01-01T00:00:00Z',
          lastLogin: new Date().toISOString(),
          status: 'active',
          totalRequests: 15230,
          totalBalance: 500.00,
          totalSpent: 1234.56,
          apiKeysCount: 3,
          country: 'Cambodia',
          phoneNumber: '+855-12-345-678'
        },
        {
          id: 'user_low_balance',
          email: 'lowbalance@roktenh.io',
          name: 'Low Balance User',
          company: 'Test Company',
          createdAt: '2024-06-10T14:20:00Z',
          lastLogin: '2025-10-30T16:30:00Z',
          status: 'active',
          totalRequests: 89456,
          totalBalance: 1.55,
          totalSpent: 445.80,
          apiKeysCount: 2,
          country: 'United States',
          phoneNumber: '+1-555-1234'
        },
        {
          id: 'user_zero_balance',
          email: 'zerobalance@roktenh.io',
          name: 'Zero Balance User',
          company: 'Empty Wallet Inc',
          createdAt: '2024-02-05T11:45:00Z',
          lastLogin: '2025-10-30T12:15:00Z',
          status: 'active',
          totalRequests: 123456,
          totalBalance: 0.00,
          totalSpent: 1240.00,
          apiKeysCount: 1,
          country: 'Canada',
          phoneNumber: '+1-416-555-0199'
        }
      ];

      setUsers(mockUsers);

      // Add sample API keys for mock users
      const mockAPIKeys: APIKey[] = [
        // Admin User API Keys (3 keys)
        {
          id: 'key_admin_prod',
          key: 'rtk_live_4d8f9a2b1c5e7f3d9a8b2c1e4f7d9a3b',
          name: 'Production API Key',
          userId: 'admin_user',
          userEmail: 'admin@roktenh.io',
          createdAt: '2024-01-15T10:30:00Z',
          lastUsed: new Date().toISOString(),
          status: 'active',
          requestCount: 8450,
          monthlyLimit: 100000,
          currentMonthCost: 45.67,
          totalCost: 892.34
        },
        {
          id: 'key_admin_dev',
          key: 'rtk_test_7b3e9f1a4c8d2e5f6a9b3c7d1e4f8a2b',
          name: 'Development Key',
          userId: 'admin_user',
          userEmail: 'admin@roktenh.io',
          createdAt: '2024-02-20T14:15:00Z',
          lastUsed: '2025-11-05T09:20:00Z',
          status: 'active',
          requestCount: 4230,
          monthlyLimit: 50000,
          currentMonthCost: 23.12,
          totalCost: 234.56
        },
        {
          id: 'key_admin_staging',
          key: 'rtk_test_9c2e5f8a1b4d7e3f6a9c2d5e8f1b4a7c',
          name: 'Staging Environment',
          userId: 'admin_user',
          userEmail: 'admin@roktenh.io',
          createdAt: '2024-03-10T16:45:00Z',
          lastUsed: '2025-11-06T14:30:00Z',
          status: 'active',
          requestCount: 2550,
          monthlyLimit: 25000,
          currentMonthCost: 12.88,
          totalCost: 107.66
        },
        // Low Balance User API Keys (2 keys)
        {
          id: 'key_low_main',
          key: 'rtk_live_2f5a8c1e4b7d9f3a6c2e5f8b1d4a7c9e',
          name: 'Main Production Key',
          userId: 'user_low_balance',
          userEmail: 'lowbalance@roktenh.io',
          createdAt: '2024-06-15T11:20:00Z',
          lastUsed: new Date().toISOString(),
          status: 'active',
          requestCount: 67234,
          monthlyLimit: 150000,
          currentMonthCost: 178.45,
          totalCost: 389.20
        },
        {
          id: 'key_low_backup',
          key: 'rtk_live_8d3f6a9c2e5b1f4d7a9c3e6f2b5d8a1c',
          name: 'Backup API Key',
          userId: 'user_low_balance',
          userEmail: 'lowbalance@roktenh.io',
          createdAt: '2024-07-22T09:10:00Z',
          lastUsed: '2025-11-04T18:45:00Z',
          status: 'active',
          requestCount: 22222,
          monthlyLimit: 50000,
          currentMonthCost: 56.60,
          totalCost: 56.60
        },
        // Zero Balance User API Keys (1 key)
        {
          id: 'key_zero_only',
          key: 'rtk_live_1e4f7a9c2d5b8e1f4a7c9d2e5f8b1a4c',
          name: 'Legacy Production Key',
          userId: 'user_zero_balance',
          userEmail: 'zerobalance@roktenh.io',
          createdAt: '2024-02-08T13:30:00Z',
          lastUsed: '2025-11-01T10:15:00Z',
          status: 'suspended',
          requestCount: 123456,
          monthlyLimit: 200000,
          currentMonthCost: 0.00,
          totalCost: 1240.00
        }
      ];

      // Combine existing keys with mock keys
      setApiKeys([...keysData, ...mockAPIKeys]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateKey = useCallback(async (data: { name: string }) => {
    try {
      const newKey = await apiServiceManager.createAPIKey({
        ...data,
        userId: 'current_user',
        userEmail: 'admin@roktenh.io'
      });
      setApiKeys(prev => [newKey, ...prev]);
      
      // Add notification
      setNotifications(prev => NotificationService.notifyAPIKeyCreated(prev, data.name));
    } catch (error) {
      console.error('Error creating API key:', error);
    }
  }, []);

  const handleDeleteKey = useCallback(async (id: string) => {
    try {
      const keyToDelete = apiKeys.find(key => key.id === id);
      await apiServiceManager.deleteAPIKey(id);
      setApiKeys(prev => prev.filter(key => key.id !== id));
      
      // Add notification
      if (keyToDelete) {
        setNotifications(prev => NotificationService.notifyAPIKeyDeleted(prev, keyToDelete.name));
      }
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  }, [apiKeys]);

  const handleToggleStatus = useCallback(async (id: string, status: APIKey['status']) => {
    try {
      const keyToUpdate = apiKeys.find(key => key.id === id);
      const updatedKey = await apiServiceManager.updateAPIKeyStatus(id, status);
      setApiKeys(prev => prev.map(key => key.id === id ? updatedKey : key));
      
      // Add notification
      if (keyToUpdate) {
        setNotifications(prev => NotificationService.notifyAPIKeyStatusChanged(prev, keyToUpdate.name, status));
      }
    } catch (error) {
      console.error('Error updating API key:', error);
    }
  }, [apiKeys]);

  const handleSuspendUser = useCallback((userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'suspended' as const } : user
    ));
  }, []);

  const handleActivateUser = useCallback((userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'active' as const } : user
    ));
  }, []);

  const handleAdjustBalance = (userId: string, amount: number) => {
    // Check if current user is admin
    if (user?.role !== 'admin') {
      toast.error('Only administrators can adjust user balances');
      return;
    }

    // Find the admin user
    const adminUser = users.find(u => u.email === user.email);
    const targetUser = users.find(u => u.id === userId);

    if (!adminUser || !targetUser) {
      toast.error('User not found');
      return;
    }

    // Check if admin has enough balance when adding funds (positive amount)
    if (amount > 0 && adminUser.totalBalance < amount) {
      toast.error(`Insufficient admin wallet balance. Available: $${adminUser.totalBalance.toFixed(2)}`);
      return;
    }

    // Check if target user would have negative balance when deducting (negative amount)
    if (amount < 0 && targetUser.totalBalance + amount < 0) {
      toast.error(`Cannot deduct more than user's current balance of $${targetUser.totalBalance.toFixed(2)}`);
      return;
    }

    const newTargetBalance = targetUser.totalBalance + amount;

    // Perform the transfer
    setUsers(users.map(u => {
      if (u.id === userId) {
        // Add/deduct balance to target user
        return { ...u, totalBalance: newTargetBalance };
      } else if (u.email === user.email) {
        // For positive amounts (adding to user), deduct from admin
        // For negative amounts (removing from user), add back to admin
        return { ...u, totalBalance: u.totalBalance - amount };
      }
      return u;
    }));

    // Create transaction records for logging
    const timestamp = new Date().toISOString();
    const adminTransaction: Transaction = {
      id: `txn_${Date.now()}_admin`,
      userId: adminUser.id,
      type: 'adjustment',
      amount: -amount, // Negative for admin (deduction)
      balanceBefore: adminUser.totalBalance,
      balanceAfter: adminUser.totalBalance - amount,
      description: `Transfer to ${targetUser.name}: ${amount > 0 ? 'Added' : 'Deducted'} $${Math.abs(amount).toFixed(2)}`,
      timestamp,
      status: 'completed'
    };

    const userTransaction: Transaction = {
      id: `txn_${Date.now()}_user`,
      userId: targetUser.id,
      type: 'adjustment',
      amount: amount, // Positive/Negative for user (addition/deduction)
      balanceBefore: targetUser.totalBalance,
      balanceAfter: newTargetBalance,
      description: `Admin adjustment by ${adminUser.name}`,
      timestamp,
      status: 'completed'
    };

    // Log transactions to console for demo
    console.log('💰 Admin Wallet Transfer:', {
      adminTransaction,
      userTransaction,
      adminBalanceBefore: adminUser.totalBalance,
      adminBalanceAfter: adminUser.totalBalance - amount,
      userBalanceBefore: targetUser.totalBalance,
      userBalanceAfter: newTargetBalance
    });

    // Save transactions to state
    setAdminTransactions(prev => [adminTransaction, userTransaction, ...prev]);

    // Add notification for balance adjustment
    const updated = NotificationService.notifyBalanceAdjusted(
      notifications, 
      amount, 
      newTargetBalance,
      adminUser.name
    );
    setNotifications(updated);

    // Show success message
    if (amount > 0) {
      toast.success(`Successfully transferred $${amount.toFixed(2)} from admin wallet to ${targetUser.name}`);
    } else {
      toast.success(`Successfully deducted $${Math.abs(amount).toFixed(2)} from ${targetUser.name} (returned to admin wallet)`);
    }
  };

  const languageOptions = useMemo<LanguageOption[]>(() => ([
    { code: 'en', label: 'English', nativeLabel: 'English', Icon: FlagUS },
    { code: 'km', label: 'Khmer', nativeLabel: 'ខ្មែរ', Icon: FlagKH }
  ]), []);

  const currentLanguageOption = useMemo(
    () => languageOptions.find(option => option.code === language) ?? languageOptions[0],
    [language, languageOptions]
  );

  const CurrentLanguageIcon = currentLanguageOption.Icon;

  const navItems = useMemo(() => [
    { id: 'dashboard', label: t.nav.dashboard, icon: BarChart3 },
    ...(user?.role === 'admin' ? [{ id: 'users', label: t.nav.userManagement, icon: UserCog }] : []),
    { id: 'wallet', label: t.nav.wallet, icon: Wallet },
    { id: 'keys', label: t.nav.apiKeys, icon: Key },
    { id: 'logs', label: t.nav.requestLogs, icon: Server },
    { id: 'docs', label: t.nav.documentation, icon: Book },
    { id: 'pricing', label: t.pricing.title, icon: Calculator },
    ...(user?.role === 'admin' ? [
      { id: 'pricing-management', label: 'Pricing Management', icon: DollarSign }
    ] : []),
  ], [user?.role, t]);

  const handleGetStarted = useCallback(() => {
    setShowLandingPage(false);
    setAuthView('signup');
  }, []);

  const handleSwitchToSignup = useCallback(() => setAuthView('signup'), []);
  const handleSwitchToLogin = useCallback(() => setAuthView('login'), []);
  const handleBackToLanding = useCallback(() => setShowLandingPage(true), []);

  // Show landing page for non-authenticated users who haven't chosen to login/signup
  if (!isAuthenticated && !authLoading && showLandingPage) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Show auth screens if not authenticated
  if (!isAuthenticated && !authLoading) {
    return authView === 'login' ? (
      <Login 
        onSwitchToSignup={handleSwitchToSignup}
        onBackToLanding={handleBackToLanding}
      />
    ) : (
      <SignUp 
        onSwitchToLogin={handleSwitchToLogin}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  // Show welcome screen for new users
  if (isAuthenticated && isNewUser) {
    return (
      <WelcomeScreen 
        userName={user?.name || 'there'} 
        onGetStarted={dismissWelcome}
      />
    );
  }

  if (isLoading || !stats || authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading RokTenh Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-zinc-900 dark:bg-zinc-900 border-b border-zinc-800 dark:border-zinc-800 px-4 sm:px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity font-en" 
            onClick={() => setActiveTab('dashboard')}
          >
            <Logo />
            <div>
              <h1 className="text-white text-sm sm:text-base">RokTenh Map</h1>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-en">Map Service Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="p-2 px-2.5 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  aria-label={language === 'en' ? 'Switch language' : 'ប្ដូរភាសា'}
                >
                  <CurrentLanguageIcon className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 bg-zinc-900 border-zinc-800">
                <div className="px-3 py-2">
                  <p className={`text-xs text-zinc-500 ${language === 'km' ? 'font-kh' : 'font-en'}`}>
                    {language === 'en' ? 'Select language' : 'ជ្រើសរើសភាសា'}
                  </p>
                </div>
                <DropdownMenuSeparator className="bg-zinc-800" />
                {languageOptions.map((option) => {
                  const OptionIcon = option.Icon;

                  return (
                    <DropdownMenuItem 
                      key={option.code}
                      onClick={() => setLanguage(option.code)}
                      className={`cursor-pointer focus:bg-zinc-800 focus:text-white ${
                        language === option.code ? 'text-white bg-zinc-800' : 'text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <OptionIcon className="w-5 h-5" />
                        <div className="flex flex-col">
                          <span className="text-sm text-white">{option.label}</span>
                          <span className={`text-xs text-zinc-500 ${option.code === 'km' ? 'font-kh' : 'font-en'}`}>
                            {option.nativeLabel}
                          </span>
                        </div>
                        {language === option.code && (
                          <CheckCircle className="w-4 h-4 text-blue-400 ml-auto" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors relative cursor-pointer">
                  <Bell className="w-5 h-5 text-zinc-400" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-zinc-900 border-zinc-800 p-0">
                <div className="px-4 py-3 border-b border-zinc-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white">{t.notifications.title}</h3>
                    {notifications.filter(n => !n.read).length > 0 && (
                      <button
                        onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        {t.notifications.markAllRead}
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-zinc-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">{t.notifications.noNotifications}</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-zinc-800/30' : ''
                        }`}
                        onClick={() => {
                          setNotifications(notifications.map(n => 
                            n.id === notification.id ? { ...n, read: true } : n
                          ));
                        }}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {notification.type === 'error' && (
                              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertCircle className="w-4 h-4 text-red-500" />
                              </div>
                            )}
                            {notification.type === 'warning' && (
                              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              </div>
                            )}
                            {notification.type === 'success' && (
                              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              </div>
                            )}
                            {notification.type === 'info' && (
                              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Info className="w-4 h-4 text-blue-500" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className={`text-sm ${!notification.read ? 'text-white' : 'text-zinc-300'}`}>
                                {notification.titleKey ? t.notifications[notification.titleKey] : notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400 mb-1">
                              {notification.messageKey ? t.notifications[notification.messageKey] : notification.message}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-zinc-500">
                              <Clock className="w-3 h-3" />
                              <span>{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-zinc-800">
                    <button
                      onClick={() => {
                        setNotifications([]);
                      }}
                      className="w-full text-center text-sm text-zinc-400 hover:text-zinc-300 py-1"
                    >
                      {t.notifications.clearAll}
                    </button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-sm overflow-hidden">
                    {profilePhoto ? (
                      <img 
                        src={profilePhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0).toUpperCase() || 'N'
                    )}
                  </div>
                  <span className="text-sm text-white hidden sm:inline font-en">{displayName}</span>
                  <ChevronDown className="w-4 h-4 text-zinc-400 hidden sm:block" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-zinc-900 border-zinc-800">
                <DropdownMenuItem 
                  onClick={() => {
                    setActiveTab('settings');
                    setIsMobileMenuOpen(false);
                  }}
                  className="cursor-pointer text-zinc-300 focus:bg-zinc-800 focus:text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t.common.settings}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem 
                  onClick={logout}
                  className="cursor-pointer text-zinc-300 focus:bg-zinc-800 focus:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t.common.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-zinc-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`
            bg-zinc-900 dark:bg-zinc-900 border-r border-zinc-800 dark:border-zinc-800 overflow-y-auto flex flex-col
            transition-all duration-300 ease-in-out
            scroll-smooth overscroll-contain
            ${isMobileMenuOpen 
              ? 'w-64 translate-x-0 fixed top-[57px] bottom-0 left-0 z-40 shadow-2xl lg:relative lg:top-0' 
              : 'w-64 -translate-x-full fixed top-[57px] bottom-0 left-0 z-40 lg:relative lg:top-0 lg:translate-x-0'
            }
            ${!isMobileMenuOpen && isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
          `}
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            scrollbarColor: '#3f3f46 transparent'
          }}
        >
          <TooltipProvider>
            <nav className="p-4 space-y-1 mx-[0px] md:mt-[16px] lg:mt-0 md:mb-[16px] lg:mb-[70px] font-bold m-[0px]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isCollapsed = !isMobileMenuOpen && isSidebarCollapsed;
                const fontClass = language === 'km' ? 'font-kh' : 'font-en';
                const button = (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 md:py-2 lg:py-2.5 rounded-lg 
                      transition-all duration-200 ease-in-out
                      active:scale-95 touch-manipulation cursor-pointer
                      ${
                        activeTab === item.id
                          ? 'bg-[#1B5BA5] text-white shadow-sm'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className={`text-sm font-bold font-normal ${fontClass}`}>{item.id === 'wallet' && user?.role === 'admin' ? 'Credit Wallet' : item.label}</span>}
                  </button>
                );

                return isCollapsed ? (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      {button}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className={fontClass}>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : button;
              })}
            </nav>

            <div className="p-4 md:p-3 lg:p-4 mt-auto space-y-3 md:space-y-2 lg:space-y-3">
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm text-zinc-300">{t.wallet.yourBalance}</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-zinc-400">{t.wallet.realTimeUpdates}</span>
                  </div>
                  <div className="text-2xl text-white mb-3 text-[20px]">
                    ${(users.find(u => u.email === user?.email)?.totalBalance || 0).toFixed(2)} <span className="text-sm font-en">USD</span>
                  </div>
                  <Button
                    className="w-full bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white h-10 py-[8px] px-[12px] py-[0px]"
                    onClick={() => {
                      setIsTopUpDialogOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t.wallet.topUpBalance}
                  </Button>
                </div>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className={`hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors ${isSidebarCollapsed ? 'flex-col' : ''}`}
                  >
                    {isSidebarCollapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
                    <span className="text-xs">{isSidebarCollapsed ? t.common.open : t.common.close}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{isSidebarCollapsed ? t.nav.openMenu : t.nav.closeMenu}</p>
                </TooltipContent>
              </Tooltip>


            </div>
          </TooltipProvider>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[rgb(0,0,0)] flex flex-col">
          <div className="max-w-7xl flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-[20px] p-[20px] max-w-[1920px]">
            {/* Balance Alerts - Show only on Wallet, API Keys, and Request Logs pages */}
            {(() => {
              const showAlerts = activeTab === 'wallet' || activeTab === 'keys' || activeTab === 'logs';
              
              if (!showAlerts) return null;
              
              return (
                <>
                  {/* Zero Balance Warning - Critical Alert */}
                  {currentUserBalance === 0 && !isZeroBalanceAlertDismissed && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-950/30 rounded-lg border border-red-300 dark:border-red-900/50">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm text-red-800 dark:text-red-300 ${fontClass}`}>
                            {t.alerts.zeroBalance}
                          </p>
                          <p className={`text-xs text-red-700 dark:text-red-400/80 mt-1 ${fontClass}`}>
                            {t.alerts.zeroBalanceDesc}
                          </p>
                        </div>
                        <Button
                          onClick={() => setIsZeroBalanceAlertDismissed(true)}
                          size="sm"
                          variant="ghost"
                          className="text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 flex-shrink-0 h-8 w-8 p-0 -mt-1 -mr-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Low Balance Warning */}
                  {currentUserBalance > 0 && currentUserBalance < 1.99 && !isLowBalanceAlertDismissed && (
                    <div className="mb-6 p-3 sm:p-4 bg-yellow-100 dark:bg-yellow-950/30 rounded-lg border border-yellow-300 dark:border-yellow-900/50">
                      {/* Mobile Layout */}
                      <div className="flex sm:hidden flex-col">
                        <div className="flex items-start gap-3 mb-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm text-yellow-800 dark:text-yellow-300 ${fontClass}`}>
                              {t.alerts.lowBalance}
                            </p>
                            <p className={`text-xs text-yellow-700 dark:text-yellow-400/80 mt-1 ${fontClass}`}>
                              {t.alerts.lowBalanceDesc}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className={`text-xs text-yellow-600 dark:text-yellow-500 ${fontClass}`}>
                                {t.alerts.remaining}:
                              </span>
                              <span className="text-sm font-en text-yellow-700 dark:text-yellow-400">
                                ${currentUserBalance.toFixed(2)} USD
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={() => setIsLowBalanceAlertDismissed(true)}
                            size="sm"
                            variant="ghost"
                            className="text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 flex-shrink-0 h-8 w-8 p-0 -mt-1 -mr-1"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button 
                          onClick={() => setActiveTab('wallet')}
                          size="default"
                          className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white border-0 h-10"
                        >
                          <Wallet className="w-4 h-4 mr-2" />
                          <span className={fontClass}>{t.alerts.topUpWallet}</span>
                        </Button>
                      </div>
                      
                      {/* Desktop Layout - Original Horizontal Design */}
                      <div className="hidden sm:flex items-start sm:items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                        <div className="flex-1">
                          <p className={`text-sm text-yellow-800 dark:text-yellow-300 ${fontClass}`}>
                            {t.alerts.lowBalance} • <span className="font-en">${currentUserBalance.toFixed(2)}</span> {t.alerts.remaining.toLowerCase()}
                          </p>
                          <p className={`text-xs text-yellow-700 dark:text-yellow-400/80 mt-1 ${fontClass}`}>
                            {t.alerts.lowBalanceDesc}
                          </p>
                        </div>
                        <Button 
                          onClick={() => setActiveTab('wallet')}
                          size="sm"
                          className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white border-0 flex-shrink-0"
                        >
                          <Wallet className="w-4 h-4 mr-2" />
                          <span className={fontClass}>{t.alerts.topUpWallet}</span>
                        </Button>
                        <Button
                          onClick={() => setIsLowBalanceAlertDismissed(true)}
                          size="sm"
                          variant="ghost"
                          className="text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 flex-shrink-0 h-8 w-8 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}

            {activeTab === 'dashboard' && (
              <Suspense fallback={<LoadingFallback text="Loading Dashboard..." />}>
                <AdminDashboard 
                  stats={stats} 
                  userBalance={currentUserBalance}
                />
              </Suspense>
            )}
            {activeTab === 'users' && user?.role === 'admin' && (
              <Suspense fallback={<LoadingFallback text="Loading Users..." />}>
                <UserManagement
                  users={users}
                  apiKeys={apiKeys}
                  onSuspendUser={handleSuspendUser}
                  onActivateUser={handleActivateUser}
                  onAdjustBalance={handleAdjustBalance}
                />
              </Suspense>
            )}
            {activeTab === 'wallet' && (
              <Suspense fallback={<LoadingFallback text="Loading Wallet..." />}>
                <WalletManagement 
                  userBalance={currentUserBalance}
                  adminTransactions={adminTransactions}
                  currentUserId={currentUserId}
                  onBalanceUpdate={(newBalance) => {
                    setUsers(users.map(u => 
                      u.email === user?.email 
                        ? { ...u, totalBalance: newBalance }
                        : u
                    ));
                  }}
                  onTopUpSuccess={(amount, newBalance) => {
                    // Add notification for successful top-up from wallet page
                    const updated = NotificationService.notifyTopUpSuccess(notifications, amount, newBalance);
                    setNotifications(updated);
                  }}
                />
              </Suspense>
            )}
            {activeTab === 'keys' && (
              <Suspense fallback={<LoadingFallback text="Loading API Keys..." />}>
                <APIKeyManager
                  apiKeys={apiKeys}
                  onCreateKey={handleCreateKey}
                  onDeleteKey={handleDeleteKey}
                  onToggleStatus={handleToggleStatus}
                />
              </Suspense>
            )}
            {activeTab === 'logs' && (
              <Suspense fallback={<LoadingFallback text="Loading Request Logs..." />}>
                <RequestLogs requests={requests} apiKeys={apiKeys} />
              </Suspense>
            )}
            {activeTab === 'docs' && (
              <Suspense fallback={<LoadingFallback text="Loading Documentation..." />}>
                <APIDocumentation endpoints={endpoints} />
              </Suspense>
            )}
            {activeTab === 'pricing' && (
              <Suspense fallback={<LoadingFallback text="Loading Pricing..." />}>
                <PricingPlans 
                  onNavigateToWallet={() => setActiveTab('wallet')}
                />
              </Suspense>
            )}
            {activeTab === 'pricing-management' && user?.role === 'admin' && (
              <Suspense fallback={<LoadingFallback text="Loading Pricing Management..." />}>
                <PricingManagement />
              </Suspense>
            )}
            {activeTab === 'settings' && (
              <Suspense fallback={<LoadingFallback text="Loading Settings..." />}>
                <SettingsPage />
              </Suspense>
            )}
          </div>
          
          {/* Footer */}
          <footer className="bg-zinc-900 dark:bg-zinc-900 border-t border-zinc-800 dark:border-zinc-800 px-4 sm:px-6 lg:px-8 py-3 rounded-lg mx-4 sm:mx-6 lg:mx-8 mb-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-xs text-zinc-500">© 2014-2025 {t.footer.allRightsReserved}</p>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-xs text-zinc-500">{t.footer.weAccept}</span>
                <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded font-en">KHQR</span>
                <span className="text-xs text-zinc-500">{t.footer.version} 1.1.9</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Settings Dialog */}
      {isSettingsOpen && (
        <Suspense fallback={null}>
          <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
        </Suspense>
      )}

      {/* Top Up Dialog */}
      {isTopUpDialogOpen && (
        <Suspense fallback={null}>
          <TopUpDialog 
        open={isTopUpDialogOpen} 
        onOpenChange={setIsTopUpDialogOpen}
        userBalance={currentUserBalance}
        userId={currentUserId}
        userName={currentUserName}
        userEmail={user?.email}
        onBalanceUpdate={(newBalance) => {
          setUsers(users.map(u => 
            u.email === user?.email 
              ? { ...u, totalBalance: newBalance }
              : u
          ));
        }}
        onTransactionCreated={(transaction) => {
          // Add new pending transaction
          setAdminTransactions(prev => [transaction, ...prev]);
        }}
        onTransactionUpdate={(transaction) => {
          // Update existing transaction (pending -> completed)
          setAdminTransactions(prev => 
            prev.map(txn => txn.id === transaction.id ? transaction : txn)
          );
        }}
        onTopUpSuccess={(amount, newBalance) => {
          // Add notification for successful top-up
          const updated = NotificationService.notifyTopUpSuccess(notifications, amount, newBalance);
          setNotifications(updated);
        }}
      />
        </Suspense>
      )}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
