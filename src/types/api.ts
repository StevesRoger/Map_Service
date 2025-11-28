export interface APIKey {
  id: string;
  key: string;
  name: string;
  userId: string;
  userEmail: string;
  createdAt: string;
  lastUsed: string | null;
  status: 'active' | 'suspended' | 'expired';
  requestCount: number;
  monthlyLimit: number;
  currentMonthCost: number;
  totalCost: number;
  // Note: balance is now centralized at User level, not per-key
}

export interface APIRequest {
  id: string;
  apiKeyId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  cost: number;
}

export interface ServiceEndpoint {
  name: string;
  path: string;
  method: string;
  description: string;
  category: 'geocoding' | 'routing' | 'places' | 'maps' | 'elevation';
  pricePerRequest: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  createdAt: string;
  lastLogin: string | null;
  status: 'active' | 'suspended';
  totalRequests: number;
  totalBalance: number;
  totalSpent: number;
  apiKeysCount: number;
  country?: string;
  phoneNumber?: string;
}

export interface UsageStats {
  totalRequests: number;
  requestsToday: number;
  activeKeys: number;
  totalUsers: number;
  averageResponseTime: number;
  errorRate: number;
  totalRevenue: number;
  revenueToday: number;
}

export interface PricingTier {
  id: string;
  name: 'basic' | 'pro' | 'enterprise';
  displayName: string;
  features: string[];
  rateLimit: number;
  volumeDiscounts: {
    requests: number;
    pricePerThousand: number;
  }[];
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'top_up' | 'usage' | 'refund' | 'adjustment';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod?: string;
  apiKeyId?: string;
  requestId?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank_transfer';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: string;
}
