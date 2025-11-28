import type { 
  APIKey, 
  APIRequest, 
  UsageStats, 
  ServiceEndpoint, 
  User, 
  PricingTier, 
  Transaction 
} from '../types/api';
import type { APIServicePricing, PricingCreateRequest, PricingUpdateRequest } from '../types/pricing';
import type { 
  PlanApiCost, 
  PlanApiCostCreateRequest, 
  PlanApiCostUpdateRequest,
  PlanApiCostSummary 
} from '../types/planApiCosts';

// Mock data
const mockAPIKeys: APIKey[] = [
  // User 1 - John Smith (3 keys) - Balance: $850.00
  {
    id: '1',
    key: 'mk_live_abc123def456ghi789jkl012',
    name: 'Production App',
    userId: 'user_1',
    userEmail: 'john.smith@techcorp.com',
    createdAt: '2024-01-15T10:00:00Z',
    lastUsed: '2025-10-30T08:45:00Z',
    status: 'active',
    requestCount: 1856789,
    monthlyLimit: 10000000,
    currentMonthCost: 4567.25,
    totalCost: 8250.50
  },
  {
    id: '2',
    key: 'mk_live_xyz789abc123def456ghi012',
    name: 'Mobile Backend',
    userId: 'user_1',
    userEmail: 'john.smith@techcorp.com',
    createdAt: '2024-03-10T14:20:00Z',
    lastUsed: '2025-10-29T16:45:00Z',
    status: 'active',
    requestCount: 450000,
    monthlyLimit: 5000000,
    currentMonthCost: 1250.50,
    totalCost: 2890.25
  },
  {
    id: '3',
    key: 'mk_live_def456ghi789jkl012mno345',
    name: 'Analytics Service',
    userId: 'user_1',
    userEmail: 'john.smith@techcorp.com',
    createdAt: '2024-05-20T09:30:00Z',
    lastUsed: '2025-10-28T11:20:00Z',
    status: 'active',
    requestCount: 150000,
    monthlyLimit: 2000000,
    currentMonthCost: 425.00,
    totalCost: 1310.00
  },
  // User 2 - Sarah Johnson (2 keys) - Balance: $245.50
  {
    id: '4',
    key: 'mk_live_mno345pqr678stu901vwx234',
    name: 'Main API',
    userId: 'user_2',
    userEmail: 'sarah.johnson@startups.io',
    createdAt: '2024-03-22T08:15:00Z',
    lastUsed: '2025-10-30T09:12:00Z',
    status: 'active',
    requestCount: 467234,
    monthlyLimit: 3000000,
    currentMonthCost: 1234.25,
    totalCost: 3190.25
  },
  {
    id: '5',
    key: 'mk_live_pqr678stu901vwx234yza567',
    name: 'Development',
    userId: 'user_2',
    userEmail: 'sarah.johnson@startups.io',
    createdAt: '2024-06-15T13:40:00Z',
    lastUsed: '2025-10-29T14:30:00Z',
    status: 'active',
    requestCount: 100000,
    monthlyLimit: 1000000,
    currentMonthCost: 280.00,
    totalCost: 700.00
  },
  // User 3 - Mike Chen (1 key) - Balance: $15.00
  {
    id: '6',
    key: 'mk_live_yza567bcd890efg123hij456',
    name: 'Testing Server',
    userId: 'user_3',
    userEmail: 'mike.chen@devlabs.com',
    createdAt: '2024-06-10T14:20:00Z',
    lastUsed: '2025-10-28T16:20:00Z',
    status: 'active',
    requestCount: 89456,
    monthlyLimit: 1000000,
    currentMonthCost: 234.80,
    totalCost: 445.80
  },
  // User 4 - Emma Rodriguez (2 keys - suspended) - Balance: $0
  {
    id: '7',
    key: 'mk_live_klm789nop012qrs345tuv678',
    name: 'Legacy System',
    userId: 'user_4',
    userEmail: 'emma.rodriguez@maptech.es',
    createdAt: '2024-02-05T11:45:00Z',
    lastUsed: '2025-10-15T12:00:00Z',
    status: 'suspended',
    requestCount: 100000,
    monthlyLimit: 5000000,
    currentMonthCost: 0,
    totalCost: 890.00
  },
  {
    id: '8',
    key: 'mk_live_tuv678wxy901zab234cde567',
    name: 'Old Production',
    userId: 'user_4',
    userEmail: 'emma.rodriguez@maptech.es',
    createdAt: '2023-12-10T10:00:00Z',
    lastUsed: '2025-09-20T08:30:00Z',
    status: 'suspended',
    requestCount: 23456,
    monthlyLimit: 2000000,
    currentMonthCost: 0,
    totalCost: 350.00
  },
  // User 5 - Alex Kim (4 keys) - Balance: $1250.00
  {
    id: '9',
    key: 'mk_live_efg123hij456klm789nop012',
    name: 'Main Production',
    userId: 'user_5',
    userEmail: 'alex.kim@geoservices.kr',
    createdAt: '2024-04-18T09:00:00Z',
    lastUsed: '2025-10-29T18:20:00Z',
    status: 'active',
    requestCount: 1200000,
    monthlyLimit: 8000000,
    currentMonthCost: 3200.50,
    totalCost: 5500.00
  },
  {
    id: '10',
    key: 'mk_live_hij456klm789nop012qrs345',
    name: 'Mobile Services',
    userId: 'user_5',
    userEmail: 'alex.kim@geoservices.kr',
    createdAt: '2024-05-22T11:30:00Z',
    lastUsed: '2025-10-30T07:15:00Z',
    status: 'active',
    requestCount: 450000,
    monthlyLimit: 4000000,
    currentMonthCost: 1245.90,
    totalCost: 2100.40
  },
  {
    id: '11',
    key: 'mk_live_klm789nop012qrs345tuv678',
    name: 'Analytics Pipeline',
    userId: 'user_5',
    userEmail: 'alex.kim@geoservices.kr',
    createdAt: '2024-07-08T15:20:00Z',
    lastUsed: '2025-10-29T22:45:00Z',
    status: 'active',
    requestCount: 150543,
    monthlyLimit: 2000000,
    currentMonthCost: 420.50,
    totalCost: 865.50
  },
  {
    id: '12',
    key: 'mk_live_nop012qrs345tuv678wxy901',
    name: 'Development & Testing',
    userId: 'user_5',
    userEmail: 'alex.kim@geoservices.kr',
    createdAt: '2024-08-15T10:00:00Z',
    lastUsed: '2025-10-28T13:30:00Z',
    status: 'active',
    requestCount: 76000,
    monthlyLimit: 1000000,
    currentMonthCost: 199.00,
    totalCost: 300.00
  }
];

const mockUsers: User[] = [
  {
    id: 'admin_user',
    email: 'admin@roktenh.io',
    name: 'Admin User',
    company: 'RokTenh Map API',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
    status: 'active',
    totalRequests: 15230,
    totalBalance: 500.00,
    totalSpent: 1234.56,
    apiKeysCount: 3
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
    totalBalance: 8.50,
    totalSpent: 445.80,
    apiKeysCount: 2
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
    apiKeysCount: 1
  }
];

const serviceEndpoints: ServiceEndpoint[] = [
  {
    name: 'Geocode',
    path: '/api/v1/geocode',
    method: 'GET',
    description: 'Convert addresses to coordinates',
    category: 'geocoding',
    pricePerRequest: 0.005
  },
  {
    name: 'Reverse Geocode',
    path: '/api/v1/reverse-geocode',
    method: 'GET',
    description: 'Convert coordinates to addresses',
    category: 'geocoding',
    pricePerRequest: 0.005
  },
  {
    name: 'Place Search',
    path: '/api/v1/places/search',
    method: 'GET',
    description: 'Search for places by query',
    category: 'places',
    pricePerRequest: 0.017
  },
  {
    name: 'Place Details',
    path: '/api/v1/places/details',
    method: 'GET',
    description: 'Get detailed information about a place',
    category: 'places',
    pricePerRequest: 0.017
  },
  {
    name: 'Nearby Search',
    path: '/api/v1/places/nearby',
    method: 'GET',
    description: 'Find places near a location',
    category: 'places',
    pricePerRequest: 0.017
  },
  {
    name: 'Directions',
    path: '/api/v1/directions',
    method: 'GET',
    description: 'Get directions between locations',
    category: 'routing',
    pricePerRequest: 0.005
  },
  {
    name: 'Distance Matrix',
    path: '/api/v1/distance-matrix',
    method: 'GET',
    description: 'Calculate distances between multiple points',
    category: 'routing',
    pricePerRequest: 0.010
  },
  {
    name: 'Static Map',
    path: '/api/v1/maps/static',
    method: 'GET',
    description: 'Generate static map images',
    category: 'maps',
    pricePerRequest: 0.002
  },
  {
    name: 'Tile Server',
    path: '/api/v1/maps/tiles/{z}/{x}/{y}',
    method: 'GET',
    description: 'Serve map tiles for interactive maps',
    category: 'maps',
    pricePerRequest: 0.002
  },
  {
    name: 'Elevation',
    path: '/api/v1/elevation',
    method: 'GET',
    description: 'Get elevation data for coordinates',
    category: 'elevation',
    pricePerRequest: 0.005
  }
];

const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'basic',
    displayName: 'Starter',
    rateLimit: 100,
    volumeDiscounts: [
      { requests: 0, pricePerThousand: 5.00 },
      { requests: 100000, pricePerThousand: 4.50 },
      { requests: 500000, pricePerThousand: 4.00 }
    ],
    features: [
      'Pay as you go pricing',
      'All API endpoints',
      'Email support',
      '100 req/second rate limit',
      'Volume discounts at 100K+',
      'Top up balance anytime'
    ]
  },
  {
    id: 'pro',
    name: 'pro',
    displayName: 'Professional',
    rateLimit: 500,
    volumeDiscounts: [
      { requests: 0, pricePerThousand: 4.00 },
      { requests: 100000, pricePerThousand: 3.50 },
      { requests: 500000, pricePerThousand: 3.00 },
      { requests: 1000000, pricePerThousand: 2.50 }
    ],
    features: [
      'Better base pricing',
      'Premium endpoints',
      'Priority support',
      '500 req/second rate limit',
      'Advanced analytics',
      'Up to 50% volume discounts'
    ]
  },
  {
    id: 'enterprise',
    name: 'enterprise',
    displayName: 'Enterprise',
    rateLimit: 10000,
    volumeDiscounts: [
      { requests: 0, pricePerThousand: 3.00 },
      { requests: 100000, pricePerThousand: 2.50 },
      { requests: 500000, pricePerThousand: 2.00 },
      { requests: 1000000, pricePerThousand: 1.50 },
      { requests: 5000000, pricePerThousand: 1.00 }
    ],
    features: [
      'Lowest per-request pricing',
      'Custom volume pricing',
      'Unlimited API access',
      'Dedicated support',
      '10,000+ req/second',
      'SLA guarantee',
      'Custom deployment options'
    ]
  }
];

// API Service Pricing - Used for landing page and pricing calculator
const apiServicePricing: APIServicePricing[] = [
  {
    id: 'svc_geocoding',
    serviceKey: 'geocoding',
    name: 'Geocoding API',
    nameKey: 'geocodingApi',
    descKey: 'geocodingApiDesc',
    description: 'Convert addresses to coordinates and vice versa',
    icon: 'MapPin',
    pricePerThousand: 2.50,
    pricePerRequest: 0.0025,
    googlePrice: 5.00,
    category: 'geocoding',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    isActive: true,
    order: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'svc_routing',
    serviceKey: 'routing',
    name: 'Routing API',
    nameKey: 'routingApi',
    descKey: 'routingApiDesc',
    description: 'Calculate routes and directions between locations',
    icon: 'Navigation',
    pricePerThousand: 2.50,
    pricePerRequest: 0.0025,
    googlePrice: 5.00,
    category: 'routing',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    isActive: true,
    order: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'svc_places',
    serviceKey: 'places',
    name: 'Places API',
    nameKey: 'placesApiName',
    descKey: 'placesApiFullDesc',
    description: 'Search and discover places with detailed information',
    icon: 'Search',
    pricePerThousand: 8.50,
    pricePerRequest: 0.0085,
    googlePrice: 17.00,
    category: 'places',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    isActive: true,
    order: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'svc_maptiles',
    serviceKey: 'mapTiles',
    name: 'Map Tiles API',
    nameKey: 'mapTilesApi',
    descKey: 'mapTilesApiDesc',
    description: 'High-quality map tiles for interactive mapping',
    icon: 'Map',
    pricePerThousand: 1.00,
    pricePerRequest: 0.0010,
    googlePrice: 2.00,
    category: 'maps',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    isActive: true,
    order: 4,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
];

// Plan API Costs - Configure pricing per plan per service
const planApiCosts: PlanApiCost[] = [
  // Basic Plan
  {
    id: 'pac_basic_geocoding',
    planId: 'basic',
    planName: 'Starter',
    serviceKey: 'geocoding',
    serviceName: 'Geocoding API',
    pricePerThousand: 2.50,
    pricePerRequest: 0.0025,
    includedRequests: 0, // Pay-as-you-go
    monthlyLimit: 100000, // 100K limit for basic
    discountPercent: 0,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pac_basic_routing',
    planId: 'basic',
    planName: 'Starter',
    serviceKey: 'routing',
    serviceName: 'Routing API',
    pricePerThousand: 2.50,
    pricePerRequest: 0.0025,
    includedRequests: 0,
    monthlyLimit: 100000,
    discountPercent: 0,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pac_basic_places',
    planId: 'basic',
    planName: 'Starter',
    serviceKey: 'places',
    serviceName: 'Places API',
    pricePerThousand: 8.50,
    pricePerRequest: 0.0085,
    includedRequests: 0,
    monthlyLimit: 50000,
    discountPercent: 0,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pac_basic_maptiles',
    planId: 'basic',
    planName: 'Starter',
    serviceKey: 'mapTiles',
    serviceName: 'Map Tiles API',
    pricePerThousand: 1.00,
    pricePerRequest: 0.0010,
    includedRequests: 0,
    monthlyLimit: 500000,
    discountPercent: 0,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  
  // Pro Plan (10% discount)
  {
    id: 'pac_pro_geocoding',
    planId: 'pro',
    planName: 'Professional',
    serviceKey: 'geocoding',
    serviceName: 'Geocoding API',
    pricePerThousand: 2.25, // 10% off
    pricePerRequest: 0.00225,
    includedRequests: 10000, // 10K included
    monthlyLimit: 500000, // 500K limit
    discountPercent: 10,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pac_pro_routing',
    planId: 'pro',
    planName: 'Professional',
    serviceKey: 'routing',
    serviceName: 'Routing API',
    pricePerThousand: 2.25,
    pricePerRequest: 0.00225,
    includedRequests: 10000,
    monthlyLimit: 500000,
    discountPercent: 10,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pac_pro_places',
    planId: 'pro',
    planName: 'Professional',
    serviceKey: 'places',
    serviceName: 'Places API',
    pricePerThousand: 7.65, // 10% off
    pricePerRequest: 0.00765,
    includedRequests: 5000,
    monthlyLimit: 250000,
    discountPercent: 10,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pac_pro_maptiles',
    planId: 'pro',
    planName: 'Professional',
    serviceKey: 'mapTiles',
    serviceName: 'Map Tiles API',
    pricePerThousand: 0.90,
    pricePerRequest: 0.00090,
    includedRequests: 50000,
    monthlyLimit: 2000000,
    discountPercent: 10,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  
  // Enterprise Plan (25% discount + higher limits)
  {
    id: 'pac_enterprise_geocoding',
    planId: 'enterprise',
    planName: 'Enterprise',
    serviceKey: 'geocoding',
    serviceName: 'Geocoding API',
    pricePerThousand: 1.875, // 25% off
    pricePerRequest: 0.001875,
    includedRequests: 100000, // 100K included
    monthlyLimit: null, // Unlimited
    discountPercent: 25,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pac_enterprise_routing',
    planId: 'enterprise',
    planName: 'Enterprise',
    serviceKey: 'routing',
    serviceName: 'Routing API',
    pricePerThousand: 1.875,
    pricePerRequest: 0.001875,
    includedRequests: 100000,
    monthlyLimit: null,
    discountPercent: 25,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pac_enterprise_places',
    planId: 'enterprise',
    planName: 'Enterprise',
    serviceKey: 'places',
    serviceName: 'Places API',
    pricePerThousand: 6.375, // 25% off
    pricePerRequest: 0.006375,
    includedRequests: 50000,
    monthlyLimit: null,
    discountPercent: 25,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pac_enterprise_maptiles',
    planId: 'enterprise',
    planName: 'Enterprise',
    serviceKey: 'mapTiles',
    serviceName: 'Map Tiles API',
    pricePerThousand: 0.75,
    pricePerRequest: 0.00075,
    includedRequests: 500000,
    monthlyLimit: null,
    discountPercent: 25,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
];

class APIServiceManager {
  private transactionStorage: Transaction[] = [];
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // API Key Management
  async getAPIKeys(): Promise<APIKey[]> {
    await this.delay(300);
    return [...mockAPIKeys];
  }

  async getAPIKeyById(id: string): Promise<APIKey | null> {
    await this.delay(200);
    return mockAPIKeys.find(key => key.id === id) || null;
  }

  async createAPIKey(data: {
    name: string;
    userId: string;
    userEmail: string;
  }): Promise<APIKey> {
    await this.delay(400);
    const newKey: APIKey = {
      id: `key_${Date.now()}`,
      key: `mk_live_${this.generateRandomString(24)}`,
      name: data.name,
      userId: data.userId,
      userEmail: data.userEmail,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      status: 'active',
      requestCount: 0,
      monthlyLimit: 1000000,
      currentMonthCost: 0,
      totalCost: 0
      // Note: balance is now centralized at User level
    };
    mockAPIKeys.push(newKey);
    return newKey;
  }

  async updateAPIKeyStatus(id: string, status: APIKey['status']): Promise<APIKey> {
    await this.delay(300);
    const key = mockAPIKeys.find(k => k.id === id);
    if (!key) throw new Error('API key not found');
    key.status = status;
    return key;
  }

  async deleteAPIKey(id: string): Promise<void> {
    await this.delay(300);
    const index = mockAPIKeys.findIndex(k => k.id === id);
    if (index !== -1) {
      mockAPIKeys.splice(index, 1);
    }
  }

  // User Management
  async getUsers(): Promise<User[]> {
    await this.delay(300);
    return [...mockUsers];
  }

  async getAllUsers(): Promise<User[]> {
    // Alias for getUsers() - used in admin context
    return this.getUsers();
  }

  async getUserById(id: string): Promise<User | null> {
    await this.delay(200);
    return mockUsers.find(user => user.id === id) || null;
  }

  // Analytics
  async getUsageStats(): Promise<UsageStats> {
    await this.delay(400);
    const totalRequests = mockAPIKeys.reduce((sum, key) => sum + key.requestCount, 0);
    const activeKeys = mockAPIKeys.filter(key => key.status === 'active').length;
    const totalRevenue = mockAPIKeys.reduce((sum, key) => sum + key.totalCost, 0);
    const revenueToday = mockAPIKeys.reduce((sum, key) => sum + (key.currentMonthCost * 0.05), 0);
    
    return {
      totalRequests,
      requestsToday: Math.floor(totalRequests * 0.05),
      activeKeys,
      totalUsers: mockUsers.length,
      averageResponseTime: 145,
      errorRate: 0.8,
      totalRevenue,
      revenueToday
    };
  }

  async getRequestHistory(limit: number = 100): Promise<APIRequest[]> {
    await this.delay(500);
    const requests: APIRequest[] = [];
    const endpoints = serviceEndpoints.map(e => ({ path: e.path, price: e.pricePerRequest }));
    const statusCodes = [200, 200, 200, 200, 200, 200, 200, 201, 400, 404, 429, 500];
    const methods = ['GET', 'GET', 'GET', 'GET', 'POST', 'PUT', 'DELETE'];
    const ipPrefixes = ['72.181', '192.168', '10.0', '172.16', '203.0', '198.51', '45.33', '104.21'];
    
    // Add featured requests with specific API keys
    const featuredApiKey = mockAPIKeys.find(k => k.key === 'mk_live_klm789nop012qrs345tuv678');
    if (featuredApiKey) {
      // Add multiple requests with this key to show it's actively being used
      const featuredRequests = [
        {
          id: `req_featured_1`,
          apiKeyId: featuredApiKey.id,
          endpoint: '/api/v1/maps/tiles/{z}/{x}/{y}',
          method: 'GET',
          statusCode: 200,
          responseTime: 461,
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
          ipAddress: '72.181.74.137',
          userAgent: 'Mozilla/5.0 (compatible; API Client/1.0)',
          cost: 0.0001
        },
        {
          id: `req_featured_2`,
          apiKeyId: featuredApiKey.id,
          endpoint: '/api/v1/geocoding/search',
          method: 'GET',
          statusCode: 200,
          responseTime: 234,
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
          ipAddress: '72.181.74.137',
          userAgent: 'Mozilla/5.0 (compatible; API Client/1.0)',
          cost: 0.001
        },
        {
          id: `req_featured_3`,
          apiKeyId: featuredApiKey.id,
          endpoint: '/api/v1/routing/directions',
          method: 'POST',
          statusCode: 200,
          responseTime: 587,
          timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
          ipAddress: '72.181.74.137',
          userAgent: 'Mozilla/5.0 (compatible; API Client/1.0)',
          cost: 0.002
        }
      ];
      requests.push(...featuredRequests);
    }
    
    // Generate diverse sample data
    for (let i = 0; i < limit - 3; i++) {
      const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      const method = methods[Math.floor(Math.random() * methods.length)];
      const statusCode = statusCodes[Math.floor(Math.random() * statusCodes.length)];
      const ipPrefix = ipPrefixes[Math.floor(Math.random() * ipPrefixes.length)];
      
      requests.push({
        id: `req_${i}`,
        apiKeyId: mockAPIKeys[Math.floor(Math.random() * mockAPIKeys.length)].id,
        endpoint: endpoint.path,
        method: method,
        statusCode: statusCode,
        responseTime: Math.floor(50 + Math.random() * 950),
        timestamp: timestamp.toISOString(),
        ipAddress: `${ipPrefix}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (compatible; API Client/1.0)',
        cost: endpoint.price
      });
    }
    
    return requests.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getRequests(userId?: string, limit: number = 100): Promise<APIRequest[]> {
    // Alias for getRequestHistory - used in dashboard
    // Note: userId filtering could be implemented if needed
    return this.getRequestHistory(limit);
  }

  // Service Info
  async getServiceEndpoints(): Promise<ServiceEndpoint[]> {
    await this.delay(200);
    return [...serviceEndpoints];
  }

  async getEndpoints(): Promise<ServiceEndpoint[]> {
    // Alias for getServiceEndpoints - used in dashboard
    return this.getServiceEndpoints();
  }

  async getPricingTiers(): Promise<PricingTier[]> {
    await this.delay(200);
    return [...pricingTiers];
  }

  // Wallet Management
  async getTransactions(userId?: string): Promise<Transaction[]> {
    await this.delay(300);
    
    // Initialize storage with mock data if empty
    if (this.transactionStorage.length === 0) {
      this.transactionStorage = [
        {
          id: 'txn_021',
          userId: 'admin_user',
          type: 'top_up',
          amount: 75.00,
          balanceBefore: 267.67,
          balanceAfter: 342.67,
          description: 'Account top-up via KHQR',
          timestamp: '2024-11-04T09:15:00Z',
          status: 'completed',
          paymentMethod: 'KHQR'
        },
        {
          id: 'txn_pending_001',
          userId: 'admin_user',
          type: 'top_up',
          amount: 100.00,
          balanceBefore: 342.67,
          balanceAfter: 342.67,
          description: 'Account top-up via KHQR',
          timestamp: '2024-11-02T14:30:00Z',
          status: 'pending',
          paymentMethod: 'KHQR'
        },
        {
          id: 'txn_020',
          userId: 'admin_user',
          type: 'usage',
          amount: -15.33,
          balanceBefore: 283.00,
          balanceAfter: 267.67,
          description: 'API usage charges - Geocoding & Places',
          timestamp: '2024-11-02T08:45:00Z',
          status: 'completed',
          apiKeyId: '1'
        },
        {
          id: 'txn_019',
          userId: 'admin_user',
          type: 'top_up',
          amount: 200.00,
          balanceBefore: 83.00,
          balanceAfter: 283.00,
          description: 'Account top-up via KHQR',
          timestamp: '2024-11-01T16:20:00Z',
          status: 'completed',
          paymentMethod: 'KHQR'
        },
        {
          id: 'txn_003',
          userId: 'admin_user',
          type: 'usage',
          amount: -29.88,
          balanceBefore: 112.88,
          balanceAfter: 83.00,
          description: 'API usage charges - Map Tiles',
          timestamp: '2024-11-01T08:15:00Z',
          status: 'completed',
          apiKeyId: '1'
        }
      ];
    }
    
    // Sort by timestamp (most recent first)
    const sortedTransactions = [...this.transactionStorage].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    if (userId) {
      return sortedTransactions.filter(t => t.userId === userId);
    }
    return sortedTransactions;
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    await this.delay(200);
    return [
      {
        id: 'pm_001',
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiryMonth: 12,
        expiryYear: 2026,
        isDefault: true,
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'pm_002',
        type: 'card',
        last4: '8888',
        brand: 'Mastercard',
        expiryMonth: 8,
        expiryYear: 2025,
        isDefault: false,
        createdAt: '2024-03-10T09:15:00Z'
      },
      {
        id: 'pm_003',
        type: 'paypal',
        isDefault: false,
        createdAt: '2024-02-20T14:30:00Z'
      }
    ];
  }

  async addPaymentMethod(data: Omit<PaymentMethod, 'id' | 'createdAt'>): Promise<PaymentMethod> {
    await this.delay(400);
    return {
      id: `pm_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString()
    };
  }

  async removePaymentMethod(id: string): Promise<void> {
    await this.delay(300);
    // Mock removal
  }

  async setDefaultPaymentMethod(id: string): Promise<void> {
    await this.delay(300);
    // Mock setting default
  }

  async createTopUpTransaction(userId: string, amount: number, paymentMethodId: string, status: 'pending' | 'completed' = 'completed'): Promise<Transaction> {
    await this.delay(500);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId,
      type: 'top_up',
      amount,
      balanceBefore: user.totalBalance,
      balanceAfter: status === 'completed' ? user.totalBalance + amount : user.totalBalance,
      description: `Account top-up via ${paymentMethodId}`,
      timestamp: new Date().toISOString(),
      status,
      paymentMethod: paymentMethodId
    };
    
    // Store the transaction in memory
    this.transactionStorage.push(transaction);
    
    console.log('📝 Transaction stored:', transaction);
    console.log('📦 Total transactions in storage:', this.transactionStorage.length);
    
    // Only update balance if transaction is completed
    if (status === 'completed') {
      user.totalBalance += amount;
    }
    
    return transaction;
  }

  async updateTransactionStatus(transactionId: string, status: 'completed' | 'pending' | 'failed', userId: string): Promise<Transaction> {
    await this.delay(300);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    
    // Find the transaction in storage
    const transaction = this.transactionStorage.find(t => t.id === transactionId);
    if (!transaction) throw new Error('Transaction not found');
    
    console.log('🔄 Updating transaction status:', { transactionId, oldStatus: transaction.status, newStatus: status });
    
    // If changing from pending to completed, update balance
    if (transaction.status === 'pending' && status === 'completed') {
      user.totalBalance += transaction.amount;
      transaction.balanceAfter = user.totalBalance;
      console.log('💰 Balance updated:', { oldBalance: user.totalBalance - transaction.amount, newBalance: user.totalBalance });
    }
    
    // Update the status
    transaction.status = status;
    
    console.log('✅ Transaction updated:', transaction);
    
    return transaction;
  }

  /**
   * Check payment status from bank API
   * This simulates checking with the bank to see if payment was received
   * In production, this would call the actual bank/payment gateway API
   * 
   * @param transactionId - The transaction ID to check
   * @param hasDownloadedQR - Whether the user has downloaded the QR code
   * @returns Payment status information
   */
  async checkPaymentStatus(transactionId: string, hasDownloadedQR: boolean = false): Promise<{ 
    isPaid: boolean; 
    transactionId: string;
    status: 'pending' | 'completed' | 'failed';
  }> {
    await this.delay(1000); // Simulate API delay
    
    // Find the transaction
    const transaction = this.transactionStorage.find(t => t.id === transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    
    // 🧪 TESTING MODE: Smart condition based on QR download
    // - If user downloaded QR → Payment FAILS (they downloaded but didn't pay)
    // - If user didn't download QR → Payment SUCCEEDS (they paid directly)
    const isPaid = !hasDownloadedQR; // Success when NOT downloaded, fail when downloaded
    
    console.log('🏦 Bank API check:', { 
      transactionId, 
      hasDownloadedQR, 
      isPaid, 
      logic: hasDownloadedQR ? 'Downloaded QR → FAIL' : 'No Download → SUCCESS',
      currentStatus: transaction.status 
    });
    
    return {
      isPaid,
      transactionId,
      status: isPaid ? 'completed' : 'pending'
    };
  }

  // API Service Pricing Management
  async getAPIServicePricing(): Promise<APIServicePricing[]> {
    await this.delay(300);
    return [...apiServicePricing].sort((a, b) => a.order - b.order);
  }

  async getActiveAPIServicePricing(): Promise<APIServicePricing[]> {
    await this.delay(300);
    return apiServicePricing
      .filter(service => service.isActive)
      .sort((a, b) => a.order - b.order);
  }

  async getAPIServicePricingById(id: string): Promise<APIServicePricing | null> {
    await this.delay(200);
    return apiServicePricing.find(service => service.id === id) || null;
  }

  async createAPIServicePricing(data: PricingCreateRequest): Promise<APIServicePricing> {
    await this.delay(400);
    const newService: APIServicePricing = {
      id: `svc_${Date.now()}`,
      ...data,
      pricePerRequest: data.pricePerThousand / 1000,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    apiServicePricing.push(newService);
    return newService;
  }

  async updateAPIServicePricing(data: PricingUpdateRequest): Promise<APIServicePricing> {
    await this.delay(400);
    const service = apiServicePricing.find(s => s.id === data.id);
    if (!service) throw new Error('Service not found');

    // Update fields
    if (data.name !== undefined) service.name = data.name;
    if (data.description !== undefined) service.description = data.description;
    if (data.pricePerThousand !== undefined) {
      service.pricePerThousand = data.pricePerThousand;
      service.pricePerRequest = data.pricePerThousand / 1000;
    }
    if (data.googlePrice !== undefined) service.googlePrice = data.googlePrice;
    if (data.isActive !== undefined) service.isActive = data.isActive;
    if (data.order !== undefined) service.order = data.order;
    
    service.updatedAt = new Date().toISOString();
    
    return service;
  }

  async deleteAPIServicePricing(id: string): Promise<void> {
    await this.delay(300);
    const index = apiServicePricing.findIndex(s => s.id === id);
    if (index !== -1) {
      apiServicePricing.splice(index, 1);
    }
  }

  async toggleAPIServicePricingStatus(id: string): Promise<APIServicePricing> {
    await this.delay(300);
    const service = apiServicePricing.find(s => s.id === id);
    if (!service) throw new Error('Service not found');
    
    service.isActive = !service.isActive;
    service.updatedAt = new Date().toISOString();
    
    return service;
  }

  async reorderAPIServicePricing(serviceId: string, newOrder: number): Promise<APIServicePricing[]> {
    await this.delay(300);
    const service = apiServicePricing.find(s => s.id === serviceId);
    if (!service) throw new Error('Service not found');

    const oldOrder = service.order;
    
    // Update orders for other services
    apiServicePricing.forEach(s => {
      if (s.id === serviceId) {
        s.order = newOrder;
      } else if (oldOrder < newOrder && s.order > oldOrder && s.order <= newOrder) {
        s.order -= 1;
      } else if (oldOrder > newOrder && s.order >= newOrder && s.order < oldOrder) {
        s.order += 1;
      }
      s.updatedAt = new Date().toISOString();
    });

    return [...apiServicePricing].sort((a, b) => a.order - b.order);
  }

  // Plan API Costs Management
  async getPlanApiCosts(): Promise<PlanApiCost[]> {
    await this.delay(300);
    return [...planApiCosts];
  }

  async getPlanApiCostsByPlanId(planId: string): Promise<PlanApiCost[]> {
    await this.delay(300);
    return planApiCosts.filter(cost => cost.planId === planId && cost.isActive);
  }

  async getActivePlanApiCosts(): Promise<PlanApiCost[]> {
    await this.delay(300);
    return planApiCosts.filter(cost => cost.isActive);
  }

  async getPlanApiCostById(id: string): Promise<PlanApiCost | null> {
    await this.delay(200);
    return planApiCosts.find(cost => cost.id === id) || null;
  }

  async createPlanApiCost(data: PlanApiCostCreateRequest): Promise<PlanApiCost> {
    await this.delay(400);
    
    // Get plan and service names
    const plan = pricingTiers.find(p => p.id === data.planId);
    const service = apiServicePricing.find(s => s.serviceKey === data.serviceKey);
    
    if (!plan || !service) {
      throw new Error('Plan or service not found');
    }
    
    const newCost: PlanApiCost = {
      id: `pac_${Date.now()}`,
      planId: data.planId,
      planName: plan.displayName,
      serviceKey: data.serviceKey,
      serviceName: service.name,
      pricePerThousand: data.pricePerThousand,
      pricePerRequest: data.pricePerThousand / 1000,
      includedRequests: data.includedRequests || 0,
      monthlyLimit: data.monthlyLimit === undefined ? null : data.monthlyLimit,
      discountPercent: data.discountPercent || 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    planApiCosts.push(newCost);
    return newCost;
  }

  async updatePlanApiCost(data: PlanApiCostUpdateRequest): Promise<PlanApiCost> {
    await this.delay(400);
    const cost = planApiCosts.find(c => c.id === data.id);
    if (!cost) throw new Error('Cost not found');

    // Update fields
    if (data.pricePerThousand !== undefined) {
      cost.pricePerThousand = data.pricePerThousand;
      cost.pricePerRequest = data.pricePerThousand / 1000;
    }
    if (data.includedRequests !== undefined) cost.includedRequests = data.includedRequests;
    if (data.monthlyLimit !== undefined) cost.monthlyLimit = data.monthlyLimit;
    if (data.discountPercent !== undefined) cost.discountPercent = data.discountPercent;
    
    cost.updatedAt = new Date().toISOString();
    
    return cost;
  }

  async deletePlanApiCost(id: string): Promise<void> {
    await this.delay(300);
    const index = planApiCosts.findIndex(c => c.id === id);
    if (index !== -1) {
      planApiCosts.splice(index, 1);
    }
  }

  async togglePlanApiCostStatus(id: string): Promise<PlanApiCost> {
    await this.delay(300);
    const cost = planApiCosts.find(c => c.id === id);
    if (!cost) throw new Error('Cost not found');
    
    cost.isActive = !cost.isActive;
    cost.updatedAt = new Date().toISOString();
    
    return cost;
  }

  async reorderPlanApiCost(costId: string, newOrder: number): Promise<PlanApiCost[]> {
    await this.delay(300);
    const cost = planApiCosts.find(c => c.id === costId);
    if (!cost) throw new Error('Cost not found');

    const oldOrder = cost.order;
    
    // Update orders for other costs
    planApiCosts.forEach(c => {
      if (c.id === costId) {
        c.order = newOrder;
      } else if (oldOrder < newOrder && c.order > oldOrder && c.order <= newOrder) {
        c.order -= 1;
      } else if (oldOrder > newOrder && c.order >= newOrder && c.order < oldOrder) {
        c.order += 1;
      }
      c.updatedAt = new Date().toISOString();
    });

    return [...planApiCosts].sort((a, b) => a.order - b.order);
  }

  // Helper
  private generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

export const apiServiceManager = new APIServiceManager();