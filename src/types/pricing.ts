export interface APIServicePricing {
  id: string;
  serviceKey: string;
  name: string;
  nameKey?: string; // Translation key for the name
  descKey?: string; // Translation key for the description
  description: string;
  icon: string; // Icon name from lucide-react
  pricePerThousand: number;
  pricePerRequest: number;
  googlePrice: number; // For comparison
  category: 'geocoding' | 'routing' | 'places' | 'maps' | 'other';
  color: string; // Tailwind color class
  bgColor: string; // Tailwind background color class
  isActive: boolean;
  order: number; // Display order
  createdAt: string;
  updatedAt: string;
}

export interface PricingUpdateRequest {
  id: string;
  name?: string;
  description?: string;
  pricePerThousand?: number;
  googlePrice?: number;
  isActive?: boolean;
  order?: number;
}

export interface PricingCreateRequest {
  serviceKey: string;
  name: string;
  description: string;
  icon: string;
  pricePerThousand: number;
  googlePrice: number;
  category: 'geocoding' | 'routing' | 'places' | 'maps' | 'other';
  color: string;
  bgColor: string;
  order: number;
}