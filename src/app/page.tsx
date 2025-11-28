'use client';

import { useState, useEffect } from 'react';
import { Server, Settings, BarChart3, Key, Book, Calculator, Users, Menu, X, UserCog, Wallet, LogOut, Bell, Globe, ChevronDown, ChevronsLeft, ChevronsRight, Plus, AlertTriangle, CheckCircle, Info, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { AdminDashboard } from '@/components/AdminDashboard';
import { APIKeyManager } from '@/components/APIKeyManager';
import { RequestLogs } from '@/components/RequestLogs';
import { APIDocumentation } from '@/components/APIDocumentation';
import { PricingPlans } from '@/components/PricingPlans';
import { PricingManagement } from '@/components/PricingManagement';
import { UserManagement } from '@/components/UserManagement';
import { WalletManagement } from '@/components/WalletManagement';
import { Settings as SettingsPage } from '@/components/Settings';
import { SettingsDialog } from '@/components/SettingsDialog';
import { TopUpDialog } from '@/components/TopUpDialog';
import { Login } from '@/components/Login';
import { SignUp } from '@/components/SignUp';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { LandingPage } from '@/components/LandingPage';
import { NotificationPanel } from '@/components/NotificationPanel';
import { ThemeProvider } from '@/components/ThemeContext';
import { AuthProvider, useAuth } from '@/components/AuthContext';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { apiServiceManager } from '@/services/apiService';
import { NotificationService } from '@/services/notificationService';
import type { APIKey, APIRequest, UsageStats, ServiceEndpoint, User, Transaction } from '@/types/api';
import type { Notification } from '@/types/notification';

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
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [hasPendingTransactions, setHasPendingTransactions] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showTopUpAlert, setShowTopUpAlert] = useState(false);
  const [lowBalanceAlertShown, setLowBalanceAlertShown] = useState(false);

  const fontClass = language === 'km' ? 'font-kh' : 'font-en';
  const isAdmin = user?.role === 'admin';

  // Load data function
  const loadData = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const userId = user.id;

      const [keysData, reqData, usersData, statsData, endpointsData, transactionsData] = await Promise.all([
        apiServiceManager.getAPIKeys(userId),
        apiServiceManager.getRequests(userId),
        isAdmin ? apiServiceManager.getAllUsers() : Promise.resolve([]),
        apiServiceManager.getUsageStats(userId),
        apiServiceManager.getEndpoints(),
        apiServiceManager.getTransactions(userId)
      ]);

      setApiKeys(keysData);
      setRequests(reqData);
      setUsers(usersData);
      setStats(statsData);
      setEndpoints(endpointsData);
      setTransactions(transactionsData);
      setUserBalance(user.balance || 0);

      const hasPending = transactionsData.some((t: Transaction) => t.status === 'pending');
      setHasPendingTransactions(hasPending);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error(t.common.loadError);
    } finally {
      setIsLoading(false);
    }
  };

  // Notification handling
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    NotificationService.initialize(user.id);
    const notifs = NotificationService.getAllNotifications();
    setNotifications(notifs);
    setUnreadCount(NotificationService.getUnreadCount());

    const unsubscribe = NotificationService.subscribe((notification) => {
      setNotifications(NotificationService.getAllNotifications());
      setUnreadCount(NotificationService.getUnreadCount());
      toast.info(notification.message);
    });

    return () => unsubscribe();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadData();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (userBalance < 1.99 && !lowBalanceAlertShown && isAuthenticated) {
      setShowTopUpAlert(true);
      setLowBalanceAlertShown(true);
    } else if (userBalance >= 1.99) {
      setShowTopUpAlert(false);
      setLowBalanceAlertShown(false);
    }
  }, [userBalance, lowBalanceAlertShown, isAuthenticated]);

  useEffect(() => {
    setDisplayName(user?.name || 'Nanith');
  }, [user?.name]);

  const handleNotificationClick = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
    if (!isNotificationPanelOpen) {
      NotificationService.markAllAsRead();
      setUnreadCount(0);
    }
  };

  const handleClearAllNotifications = () => {
    NotificationService.clearAll();
    setNotifications([]);
    setUnreadCount(0);
    setIsNotificationPanelOpen(false);
  };

  const handleBalanceUpdate = (newBalance: number) => {
    setUserBalance(newBalance);
    if (user) {
      user.balance = newBalance;
    }
  };

  const handleTopUpSuccess = (amount: number, newBalance: number) => {
    loadData();
  };

  const handleLogout = () => {
    logout();
    setShowLandingPage(true);
  };

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    if (showLandingPage) {
      return (
        <LandingPage
          onGetStarted={() => {
            setShowLandingPage(false);
            setAuthView('signup');
          }}
          onSignIn={() => {
            setShowLandingPage(false);
            setAuthView('login');
          }}
        />
      );
    }

    if (authView === 'login') {
      return (
        <Login
          onSwitchToSignup={() => setAuthView('signup')}
          onBackToLanding={() => setShowLandingPage(true)}
        />
      );
    }

    return (
      <SignUp
        onSwitchToLogin={() => setAuthView('login')}
        onBackToLanding={() => setShowLandingPage(true)}
      />
    );
  }

  // Show welcome screen for new users
  if (isNewUser && !authLoading) {
    return <WelcomeScreen onGetStarted={dismissWelcome} />;
  }

  // Main dashboard content
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Server className="w-6 h-6 text-blue-500" />
              <span className="font-en">RokTenh Map</span>
            </div>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            {isSidebarCollapsed ? (
              <ChevronsRight className="w-5 h-5 text-zinc-400" />
            ) : (
              <ChevronsLeft className="w-5 h-5 text-zinc-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <TooltipProvider>
            {[
              { id: 'dashboard', icon: BarChart3, label: t.nav.dashboard, admin: false },
              { id: 'api-keys', icon: Key, label: t.nav.apiKeys, admin: false },
              { id: 'requests', icon: Server, label: t.nav.requests, admin: false },
              { id: 'wallet', icon: Wallet, label: isAdmin ? t.nav.creditWallet : t.nav.wallet, admin: false },
              { id: 'pricing', icon: Calculator, label: t.nav.pricing, admin: false },
              { id: 'documentation', icon: Book, label: t.nav.documentation, admin: false },
              { id: 'users', icon: Users, label: t.nav.users, admin: true },
              { id: 'pricing-management', icon: DollarSign, label: t.nav.pricingManagement, admin: true },
            ]
              .filter(item => !item.admin || isAdmin)
              .map((item) => {
                const Icon = item.icon;
                return (
                  <Tooltip key={item.id} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                          activeTab === item.id
                            ? 'bg-blue-600 text-white'
                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                        } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {!isSidebarCollapsed && (
                          <span className={`text-sm ${fontClass}`}>{item.label}</span>
                        )}
                      </button>
                    </TooltipTrigger>
                    {isSidebarCollapsed && (
                      <TooltipContent side="right" className={fontClass}>
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
          </TooltipProvider>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <div className="lg:hidden flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-500" />
                <span className="font-en">RokTenh Map</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'km' : 'en')}
                className="hidden sm:flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span className="font-en">{language === 'en' ? 'KH' : 'EN'}</span>
              </Button>

              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNotificationClick}
                  className="relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-en">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {/* Notification Panel */}
                {isNotificationPanelOpen && (
                  <NotificationPanel
                    notifications={notifications}
                    onClose={() => setIsNotificationPanelOpen(false)}
                    onClearAll={handleClearAllNotifications}
                  />
                )}
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-sm font-en">
                        {displayName?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className={`hidden sm:block ${fontClass}`}>{displayName}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                    <UserCog className="w-4 h-4 mr-2" />
                    <span className={fontClass}>{t.nav.settings}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className={fontClass}>{t.nav.logout}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-zinc-900 border-b border-zinc-800 p-4">
            <nav className="space-y-1">
              {[
                { id: 'dashboard', icon: BarChart3, label: t.nav.dashboard, admin: false },
                { id: 'api-keys', icon: Key, label: t.nav.apiKeys, admin: false },
                { id: 'requests', icon: Server, label: t.nav.requests, admin: false },
                { id: 'wallet', icon: Wallet, label: isAdmin ? t.nav.creditWallet : t.nav.wallet, admin: false },
                { id: 'pricing', icon: Calculator, label: t.nav.pricing, admin: false },
                { id: 'documentation', icon: Book, label: t.nav.documentation, admin: false },
                { id: 'users', icon: Users, label: t.nav.users, admin: true },
                { id: 'pricing-management', icon: DollarSign, label: t.nav.pricingManagement, admin: true },
              ]
                .filter(item => !item.admin || isAdmin)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        activeTab === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className={`text-sm ${fontClass}`}>{item.label}</span>
                    </button>
                  );
                })}
            </nav>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              stats={stats}
              requests={requests}
              apiKeys={apiKeys}
              endpoints={endpoints}
              users={users}
              isAdmin={isAdmin}
            />
          )}
          {activeTab === 'api-keys' && (
            <APIKeyManager
              apiKeys={apiKeys}
              onKeysUpdate={loadData}
            />
          )}
          {activeTab === 'requests' && (
            <RequestLogs
              requests={requests}
              isAdmin={isAdmin}
              allUsers={users}
            />
          )}
          {activeTab === 'wallet' && (
            <WalletManagement
              userBalance={userBalance}
              onBalanceUpdate={handleBalanceUpdate}
              adminTransactions={transactions}
              currentUserId={user?.id}
              onTopUpSuccess={handleTopUpSuccess}
            />
          )}
          {activeTab === 'pricing' && <PricingPlans />}
          {activeTab === 'documentation' && <APIDocumentation endpoints={endpoints} />}
          {activeTab === 'users' && isAdmin && (
            <UserManagement users={users} onUsersUpdate={loadData} />
          )}
          {activeTab === 'pricing-management' && isAdmin && <PricingManagement />}
          {activeTab === 'settings' && (
            <SettingsPage
              profilePhoto={profilePhoto}
              setProfilePhoto={setProfilePhoto}
              displayName={displayName}
              setDisplayName={setDisplayName}
            />
          )}
        </main>
      </div>

      {/* Top-Up Dialog */}
      <TopUpDialog
        isOpen={isTopUpDialogOpen}
        onClose={() => setIsTopUpDialogOpen(false)}
        userBalance={userBalance}
        onBalanceUpdate={handleBalanceUpdate}
        onTopUpSuccess={handleTopUpSuccess}
      />

      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profilePhoto={profilePhoto}
        setProfilePhoto={setProfilePhoto}
        displayName={displayName}
        setDisplayName={setDisplayName}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}