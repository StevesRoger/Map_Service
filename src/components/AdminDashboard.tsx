import { formatNumber } from '../utils/formatNumber';
import { formatCurrency } from '../utils/formatNumber';
import { useEffect, useState, useMemo } from 'react';
import { DollarSign, Key, Wallet, TrendingUp, BarChart3, Activity, CheckCircle2, Clock, AlertCircle, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { UsageStats } from '../types/api';
import { useLanguage } from './LanguageContext';

interface AdminDashboardProps {
  stats: UsageStats | null;
  userBalance: number; // Centralized wallet balance
}

export function AdminDashboard({ stats, userBalance }: AdminDashboardProps) {
  const { t, language } = useLanguage();
  
  // Font class based on language
  const fontClass = language === 'km' ? 'font-kh' : 'font-en';
  
  const [mounted, setMounted] = useState(false);
  const [animatedSuccessRate, setAnimatedSuccessRate] = useState(0);
  const [dateFilter, setDateFilter] = useState('30days');
  
  // Animated counters for stat cards
  const [animatedSpentToday, setAnimatedSpentToday] = useState(0);
  const [animatedActiveKeys, setAnimatedActiveKeys] = useState(0);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [animatedTotalSpent, setAnimatedTotalSpent] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate user-specific stats with null checks
  const spentToday = stats?.revenueToday ?? 0;
  const yourBalance = userBalance; // Use centralized wallet balance
  const totalSpent = stats?.totalRevenue ?? 0;
  const activeKeys = stats?.activeKeys ?? 0;

  // Filtered stats based on date filter
  const filteredStats = useMemo(() => {
    const generateRandomValue = (min: number, max: number) => 
      Math.floor(Math.random() * (max - min + 1)) + min;

    switch (dateFilter) {
      case 'today': {
        const totalReqs = generateRandomValue(2000, 5000);
        const errorRate = Math.random() * 5; // 0-5% error rate
        const spentAmount = Math.random() * 50 + 10; // $10-$60
        return {
          totalRequests: totalReqs,
          successRequests: totalReqs - Math.round(totalReqs * errorRate / 100),
          errorRequests: Math.round(totalReqs * errorRate / 100),
          successRate: 100 - errorRate,
          spent: spentAmount,
          totalSpent: spentAmount
        };
      }
      
      case '7days': {
        const totalReqs = generateRandomValue(10000, 18000);
        const errorRate = Math.random() * 4;
        const spentAmount = Math.random() * 200 + 100; // $100-$300
        return {
          totalRequests: totalReqs,
          successRequests: totalReqs - Math.round(totalReqs * errorRate / 100),
          errorRequests: Math.round(totalReqs * errorRate / 100),
          successRate: 100 - errorRate,
          spent: spentAmount,
          totalSpent: spentAmount
        };
      }
      
      case '30days': {
        const totalReqs = generateRandomValue(40000, 80000);
        const errorRate = Math.random() * 3;
        const spentAmount = Math.random() * 500 + 300; // $300-$800
        return {
          totalRequests: totalReqs,
          successRequests: totalReqs - Math.round(totalReqs * errorRate / 100),
          errorRequests: Math.round(totalReqs * errorRate / 100),
          successRate: 100 - errorRate,
          spent: spentAmount,
          totalSpent: spentAmount
        };
      }
      
      case 'thisMonth': {
        const currentDay = new Date().getDate();
        const totalReqs = generateRandomValue(currentDay * 1000, currentDay * 2500);
        const errorRate = Math.random() * 3.5;
        const spentAmount = Math.random() * (currentDay * 20) + (currentDay * 10);
        return {
          totalRequests: totalReqs,
          successRequests: totalReqs - Math.round(totalReqs * errorRate / 100),
          errorRequests: Math.round(totalReqs * errorRate / 100),
          successRate: 100 - errorRate,
          spent: spentAmount,
          totalSpent: spentAmount
        };
      }
      
      case 'allTime': {
        const totalReqs = stats?.totalRequests ?? 0;
        const errorRate = stats?.errorRate ?? 0;
        return {
          totalRequests: totalReqs,
          successRequests: totalReqs - Math.round(totalReqs * errorRate / 100),
          errorRequests: Math.round(totalReqs * errorRate / 100),
          successRate: 100 - errorRate,
          spent: totalSpent,
          totalSpent: totalSpent
        };
      }
      
      default:
        return {
          totalRequests: stats?.totalRequests ?? 0,
          successRequests: stats?.totalRequests ? stats.totalRequests - Math.round(stats.totalRequests * stats.errorRate / 100) : 0,
          errorRequests: stats?.totalRequests ? Math.round(stats.totalRequests * stats.errorRate / 100) : 0,
          successRate: stats?.errorRate ? 100 - stats.errorRate : 0,
          spent: spentToday,
          totalSpent: totalSpent
        };
    }
  }, [dateFilter, stats?.totalRequests, stats?.errorRate, spentToday, totalSpent]);

  // Success rate for traffic gauge
  const successRate = filteredStats.successRate;

  // Get chart title based on date filter
  const getChartTitle = () => {
    switch (dateFilter) {
      case 'today':
        return t.dashboard.todayReport;
      case '7days':
        return t.dashboard.sevenDayReport;
      case '30days':
        return t.dashboard.thirtyDayReport;
      case 'thisMonth':
        return t.dashboard.monthlyReport;
      case 'allTime':
        return t.dashboard.allTimeReport;
      default:
        return t.dashboard.monthlyReport;
    }
  };

  // Animate success rate counter
  useEffect(() => {
    if (mounted) {
      const duration = 1500; // Animation duration in ms
      const steps = 60; // Number of animation steps
      const increment = successRate / steps;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setAnimatedSuccessRate(increment * currentStep);
        } else {
          setAnimatedSuccessRate(successRate);
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [mounted, successRate]);

  // Animate stat counters with staggered delays
  useEffect(() => {
    if (mounted) {
      const animateValue = (
        start: number,
        end: number,
        duration: number,
        setter: (value: number) => void,
        delay: number = 0
      ) => {
        setTimeout(() => {
          const steps = 60;
          const increment = (end - start) / steps;
          const stepDuration = duration / steps;
          
          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            if (currentStep <= steps) {
              setter(start + increment * currentStep);
            } else {
              setter(end);
              clearInterval(timer);
            }
          }, stepDuration);
        }, delay);
      };

      animateValue(0, filteredStats.spent, 1000, setAnimatedSpentToday, 100);
      animateValue(0, activeKeys, 1000, setAnimatedActiveKeys, 200);
      animateValue(0, yourBalance, 1000, setAnimatedBalance, 300);
      animateValue(0, filteredStats.totalSpent, 1000, setAnimatedTotalSpent, 400);
    }
  }, [mounted, filteredStats.spent, filteredStats.totalSpent, activeKeys, yourBalance]);

  const statCards = [
    {
      title: t.dashboard.spentToday,
      value: formatCurrency(animatedSpentToday),
      icon: DollarSign,
      bgColor: 'bg-blue-500',
      iconBg: 'bg-blue-100 dark:bg-blue-950',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: t.dashboard.activeKeys,
      value: formatNumber(Math.round(animatedActiveKeys), { locale: 'en' }),
      icon: Key,
      bgColor: 'bg-purple-500',
      iconBg: 'bg-purple-100 dark:bg-purple-950',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: t.dashboard.yourBalance,
      value: formatCurrency(animatedBalance),
      icon: Wallet,
      bgColor: 'bg-green-500',
      iconBg: 'bg-green-100 dark:bg-green-950',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: t.dashboard.totalSpent,
      value: formatCurrency(animatedTotalSpent),
      icon: TrendingUp,
      bgColor: 'bg-orange-500',
      iconBg: 'bg-orange-100 dark:bg-orange-950',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  // Chart data for request trends
  const chartData = useMemo(() => {
    const generateRandomValue = (min: number, max: number) => 
      Math.floor(Math.random() * (max - min + 1)) + min;

    switch (dateFilter) {
      case 'today': {
        // Hourly data for today (24 hours)
        return Array.from({ length: 24 }, (_, i) => ({
          label: `${i.toString().padStart(2, '0')}:00`,
          requests: generateRandomValue(50, 300)
        }));
      }
      
      case '7days': {
        // Daily data for last 7 days
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days.map(day => ({
          label: day,
          requests: generateRandomValue(800, 2500)
        }));
      }
      
      case '30days': {
        // Daily data for last 30 days
        return Array.from({ length: 30 }, (_, i) => ({
          label: `Day ${i + 1}`,
          requests: generateRandomValue(800, 3000)
        }));
      }
      
      case 'thisMonth': {
        // Daily data for current month
        const currentDay = new Date().getDate();
        return Array.from({ length: currentDay }, (_, i) => ({
          label: `${i + 1}`,
          requests: generateRandomValue(800, 3200)
        }));
      }
      
      case 'allTime': {
        // Monthly data for all time (12 months)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map(month => ({
          label: month,
          requests: generateRandomValue(1200, 4500)
        }));
      }
      
      default:
        return [];
    }
  }, [dateFilter]);

  // Status items
  const statusItems = [
    { label: 'Done', status: 'complete', icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Data review pending', status: 'pending', icon: Clock, color: 'text-orange-500' },
    { label: 'Finalized', status: 'complete', icon: CheckCircle2, color: 'text-green-500' }
  ];

  return (
    <div className="space-y-6 w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className={`text-zinc-900 dark:text-zinc-100 mb-1 ${fontClass}`}>{t.dashboard.title}</h2>
          <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}>{t.dashboard.monitorUsageAndPerformance}</p>
        </div>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 cursor-pointer">
            <Calendar className="w-4 h-4 mr-2 text-zinc-600 dark:text-zinc-400" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <SelectItem value="today" className="text-zinc-900 dark:text-zinc-100 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">{t.dashboard.today}</SelectItem>
            <SelectItem value="7days" className="text-zinc-900 dark:text-zinc-100 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">{t.dashboard.last7Days}</SelectItem>
            <SelectItem value="30days" className="text-zinc-900 dark:text-zinc-100 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">{t.dashboard.last30Days}</SelectItem>
            <SelectItem value="thisMonth" className="text-zinc-900 dark:text-zinc-100 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">{t.dashboard.thisMonth}</SelectItem>
            <SelectItem value="allTime" className="text-zinc-900 dark:text-zinc-100 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">{t.dashboard.allTime}</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <Card className="p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}>{stat.title}</p>
                    <motion.p 
                      className="text-xl text-zinc-900 dark:text-zinc-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                  <motion.div 
                    className={`w-8 h-8 sm:w-12 sm:h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Request Trends Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="md:col-span-2"
        >
          <Card className="p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 mb-6"
            >
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <h3 className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>{getChartTitle()}</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                  <XAxis 
                    dataKey="label" 
                    stroke="#71717a"
                    tick={{ fill: '#a1a1aa', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#71717a"
                    tick={{ fill: '#a1a1aa', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      border: '1px solid #3f3f46',
                      borderRadius: '8px',
                      color: '#fafafa'
                    }}
                  />
                  <Bar 
                    dataKey="requests" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </Card>
        </motion.div>

        {/* Traffic Update & Status */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Traffic Update Card */}
          <Card className="p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 mb-6"
            >
              <Activity className="w-5 h-5 text-green-500" />
              <h3 className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>{t.dashboard.trafficUpdate}</h3>
            </motion.div>
            
            {/* Circular Progress */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-col items-center justify-center py-4"
            >
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#27272a"
                    strokeWidth="12"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#22c55e"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    initial={{ strokeDashoffset: `${2 * Math.PI * 70}` }}
                    animate={{ strokeDashoffset: `${2 * Math.PI * 70 * (1 - animatedSuccessRate / 100)}` }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    className="text-3xl text-zinc-900 dark:text-zinc-100"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    {animatedSuccessRate.toFixed(1)}%
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="space-y-3 mt-6"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
                  />
                  <span className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}>{t.dashboard.success}</span>
                </div>
                <span className="text-sm text-zinc-900 dark:text-zinc-100">{filteredStats.successRequests}</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                  />
                  <span className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}>{t.dashboard.errors}</span>
                </div>
                <span className="text-sm text-zinc-900 dark:text-zinc-100">{filteredStats.errorRequests}</span>
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}