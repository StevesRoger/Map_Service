/**
 * Plan API Cost Configuration Types
 * Defines pricing and limits for API services per pricing plan
 */

export interface PlanApiCost {
  id: string;
  planId: string; // References PricingTier
  planName: string; // Display name (Basic, Pro, Enterprise)
  serviceKey: string; // References APIServicePricing
  serviceName: string; // Display name (Geocoding API, etc.)
  
  // Pricing configuration
  pricePerThousand: number; // Price per 1000 requests
  pricePerRequest: number; // Calculated: pricePerThousand / 1000
  
  // Limits & allowances
  includedRequests: number; // Requests included in the plan (0 = pay-as-you-go)
  monthlyLimit: number | null; // Max requests per month (null = unlimited)
  
  // Discount configuration
  discountPercent: number; // Discount compared to standard pricing (0-100)
  
  // Status
  isActive: boolean;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface PlanApiCostCreateRequest {
  planId: string;
  serviceKey: string;
  pricePerThousand: number;
  includedRequests?: number;
  monthlyLimit?: number | null;
  discountPercent?: number;
}

export interface PlanApiCostUpdateRequest {
  id: string;
  pricePerThousand?: number;
  includedRequests?: number;
  monthlyLimit?: number | null;
  discountPercent?: number;
}

export interface PlanApiCostSummary {
  planId: string;
  planName: string;
  totalServices: number;
  totalIncludedRequests: number;
  averageDiscount: number;
  estimatedMonthlyCost: number;
}
