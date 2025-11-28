'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Shield, User, Bell, Palette, Mail, CreditCard, Globe, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { theme, setTheme } = useTheme();
  // User Profile Settings
  const [userName, setUserName] = useState('Admin User');
  const [userEmail, setUserEmail] = useState('admin@roktenh.io');
  const [userPhone, setUserPhone] = useState('+1 (555) 123-4567');
  const [companyName, setCompanyName] = useState('RokTenh Technologies');

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [usageAlerts, setUsageAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  // API Configuration
  const [defaultRateLimit, setDefaultRateLimit] = useState('1000');
  const [apiTimeout, setApiTimeout] = useState('30');
  const [enableCORS, setEnableCORS] = useState(true);
  const [enableWebhooks, setEnableWebhooks] = useState(false);

  // Display Preferences
  const [timezone, setTimezone] = useState('UTC');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [language, setLanguage] = useState('en');

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card border-zinc-200 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Platform Settings
          </DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-400">
            Manage your account, API configuration, and platform preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="api">
              <Shield className="w-4 h-4 mr-2" />
              API
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Palette className="w-4 h-4 mr-2" />
              Display
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="p-6 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
              <h3 className="text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Account Information
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-300">Full Name</Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="mt-2 bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-300">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="mt-2 bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-zinc-700 dark:text-zinc-300">Phone Number</Label>
                  <Input
                    id="phone"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="mt-2 bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-zinc-700 dark:text-zinc-300">Company Name</Label>
                  <Input
                    id="company"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-2 bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
              <h3 className="text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-500" />
                Billing Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-800 dark:text-zinc-200">Current Balance</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Available credit for API requests</p>
                  </div>
                  <p className="text-2xl text-green-500 dark:text-green-400">$247.50</p>
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-800 dark:text-zinc-200">Payment Method</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">•••• •••• •••• 4242</p>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-6 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
              <h3 className="text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif" className="text-zinc-800 dark:text-zinc-200">Email Notifications</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Receive updates via email</p>
                  </div>
                  <Switch
                    id="email-notif"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="usage-alerts" className="text-zinc-800 dark:text-zinc-200">Usage Alerts</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Get notified when approaching limits</p>
                  </div>
                  <Switch
                    id="usage-alerts"
                    checked={usageAlerts}
                    onCheckedChange={setUsageAlerts}
                  />
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="security-alerts" className="text-zinc-800 dark:text-zinc-200">Security Alerts</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Important security notifications</p>
                  </div>
                  <Switch
                    id="security-alerts"
                    checked={securityAlerts}
                    onCheckedChange={setSecurityAlerts}
                  />
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports" className="text-zinc-800 dark:text-zinc-200">Weekly Reports</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Receive weekly usage summaries</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={weeklyReports}
                    onCheckedChange={setWeeklyReports}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-800 dark:text-blue-300 mb-1">Contact Preferences</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    We'll send critical alerts to your registered email. You can also reach us on 
                    Telegram @RokTenh_Sales for immediate support.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* API Configuration */}
          <TabsContent value="api" className="space-y-4">
            <Card className="p-6 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
              <h3 className="text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                API Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rate-limit" className="text-zinc-700 dark:text-zinc-300">Default Rate Limit (req/min)</Label>
                  <Input
                    id="rate-limit"
                    type="number"
                    value={defaultRateLimit}
                    onChange={(e) => setDefaultRateLimit(e.target.value)}
                    className="mt-2 bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Maximum requests per minute for new API keys</p>
                </div>
                <div>
                  <Label htmlFor="timeout" className="text-zinc-700 dark:text-zinc-300">API Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    value={apiTimeout}
                    onChange={(e) => setApiTimeout(e.target.value)}
                    className="mt-2 bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Request timeout duration</p>
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cors" className="text-zinc-800 dark:text-zinc-200">Enable CORS</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Allow cross-origin requests</p>
                  </div>
                  <Switch
                    id="cors"
                    checked={enableCORS}
                    onCheckedChange={setEnableCORS}
                  />
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="webhooks" className="text-zinc-800 dark:text-zinc-200">Enable Webhooks</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Receive event notifications</p>
                  </div>
                  <Switch
                    id="webhooks"
                    checked={enableWebhooks}
                    onCheckedChange={setEnableWebhooks}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
              <h3 className="text-zinc-900 dark:text-zinc-100 mb-4">API Domain Configuration</h3>
              <div className="space-y-3">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded border border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Production API</p>
                  <p className="text-zinc-900 dark:text-zinc-200 font-mono text-sm">https://api.roktenh.io</p>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded border border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Documentation</p>
                  <p className="text-zinc-900 dark:text-zinc-200 font-mono text-sm">https://docs.roktenh.io</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Display Preferences */}
          <TabsContent value="preferences" className="space-y-4">
            <Card className="p-6 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
              <h3 className="text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Regional Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="timezone" className="text-zinc-700 dark:text-zinc-300">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="mt-2 bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                      <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                      <SelectItem value="JST">JST (Japan Standard Time)</SelectItem>
                      <SelectItem value="GMT">GMT (Greenwich Mean Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date-format" className="text-zinc-700 dark:text-zinc-300">Date Format</Label>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger className="mt-2 bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language" className="text-zinc-700 dark:text-zinc-300">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="mt-2 bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
              <h3 className="text-zinc-100 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-500" />
                Appearance
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-zinc-700 dark:text-zinc-300 mb-3 block">Theme Mode</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-lg border-2 transition-all group ${
                        theme === 'dark' 
                          ? 'border-blue-500 bg-zinc-100 dark:bg-zinc-950' 
                          : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-zinc-900 dark:text-zinc-100">Dark</span>
                        <div className={`w-3 h-3 rounded-full ${
                          theme === 'dark' ? 'bg-blue-500' : 'border-2 border-zinc-400 dark:border-zinc-700'
                        }`} />
                      </div>
                      <div className="w-full h-16 rounded bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-700 p-2 space-y-1">
                        <div className="h-2 w-3/4 bg-zinc-700 rounded" />
                        <div className="h-2 w-1/2 bg-zinc-800 rounded" />
                        <div className="h-2 w-2/3 bg-zinc-800 rounded" />
                      </div>
                    </button>
                    <button 
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-lg border-2 transition-all group ${
                        theme === 'light' 
                          ? 'border-blue-500 bg-zinc-100 dark:bg-zinc-950' 
                          : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-zinc-900 dark:text-zinc-100">Light</span>
                        <div className={`w-3 h-3 rounded-full ${
                          theme === 'light' ? 'bg-blue-500' : 'border-2 border-zinc-400 dark:border-zinc-700'
                        }`} />
                      </div>
                      <div className="w-full h-16 rounded bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 p-2 space-y-1">
                        <div className="h-2 w-3/4 bg-gray-300 rounded" />
                        <div className="h-2 w-1/2 bg-gray-200 rounded" />
                        <div className="h-2 w-2/3 bg-gray-200 rounded" />
                      </div>
                    </button>
                  </div>
                </div>

                <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-zinc-800 dark:text-zinc-200">Compact Mode</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Reduce spacing and padding</p>
                  </div>
                  <Switch />
                </div>

                <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                <div>
                  <Label className="text-zinc-700 dark:text-zinc-300 mb-2 block">Data Density</Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger className="bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact - More data per screen</SelectItem>
                      <SelectItem value="comfortable">Comfortable - Balanced</SelectItem>
                      <SelectItem value="spacious">Spacious - Extra padding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                <div>
                  <Label className="text-zinc-700 dark:text-zinc-300 mb-3 block">Accent Color</Label>
                  <div className="grid grid-cols-6 gap-2">
                    <button className="w-10 h-10 rounded-lg bg-blue-600 ring-2 ring-blue-400 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 transition-transform hover:scale-110" title="Blue (Current)" />
                    <button className="w-10 h-10 rounded-lg bg-purple-600 hover:ring-2 hover:ring-purple-400 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-zinc-950 transition-transform hover:scale-110" title="Purple" />
                    <button className="w-10 h-10 rounded-lg bg-green-600 hover:ring-2 hover:ring-green-400 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-zinc-950 transition-transform hover:scale-110" title="Green" />
                    <button className="w-10 h-10 rounded-lg bg-orange-600 hover:ring-2 hover:ring-orange-400 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-zinc-950 transition-transform hover:scale-110" title="Orange" />
                    <button className="w-10 h-10 rounded-lg bg-pink-600 hover:ring-2 hover:ring-pink-400 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-zinc-950 transition-transform hover:scale-110" title="Pink" />
                    <button className="w-10 h-10 rounded-lg bg-teal-600 hover:ring-2 hover:ring-teal-400 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-zinc-950 transition-transform hover:scale-110" title="Teal" />
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                    Choose your preferred accent color for buttons and highlights
                  </p>
                </div>

                <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-zinc-800 dark:text-zinc-200">Animations</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Enable smooth transitions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveSettings}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}