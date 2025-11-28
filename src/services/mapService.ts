// Map API Service
// This demonstrates a service layer architecture for map-related API calls

export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: 'restaurant' | 'hotel' | 'attraction' | 'shopping' | 'other';
  rating?: number;
  description?: string;
}

export interface RouteResponse {
  distance: number;
  duration: number;
  steps: string[];
}

// Mock data for demonstration
const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Central Park',
    address: 'New York, NY 10022',
    latitude: 40.7829,
    longitude: -73.9654,
    category: 'attraction',
    rating: 4.8,
    description: 'Iconic urban park with walking paths and recreational facilities'
  },
  {
    id: '2',
    name: 'The Metropolitan Museum',
    address: '1000 5th Ave, New York, NY 10028',
    latitude: 40.7794,
    longitude: -73.9632,
    category: 'attraction',
    rating: 4.9,
    description: 'World-renowned art museum'
  },
  {
    id: '3',
    name: 'Times Square',
    address: 'Manhattan, NY 10036',
    latitude: 40.7580,
    longitude: -73.9855,
    category: 'attraction',
    rating: 4.5,
    description: 'Famous commercial intersection and entertainment hub'
  },
  {
    id: '4',
    name: 'Brooklyn Bridge',
    address: 'New York, NY 10038',
    latitude: 40.7061,
    longitude: -73.9969,
    category: 'attraction',
    rating: 4.7,
    description: 'Historic bridge connecting Manhattan and Brooklyn'
  },
  {
    id: '5',
    name: 'Grand Central Terminal',
    address: '89 E 42nd St, New York, NY 10017',
    latitude: 40.7527,
    longitude: -73.9772,
    category: 'attraction',
    rating: 4.6,
    description: 'Historic train station and architectural landmark'
  }
];

class MapAPIService {
  private apiKey: string;

  constructor(apiKey: string = 'YOUR_API_KEY_HERE') {
    this.apiKey = apiKey;
  }

  /**
   * Search for locations by query
   */
  async searchLocations(query: string, category?: string): Promise<Location[]> {
    // Simulate API delay
    await this.delay(300);

    // Mock implementation - filter locations by query
    let results = mockLocations.filter(loc => 
      loc.name.toLowerCase().includes(query.toLowerCase()) ||
      loc.address.toLowerCase().includes(query.toLowerCase())
    );

    if (category && category !== 'all') {
      results = results.filter(loc => loc.category === category);
    }

    return results;
  }

  /**
   * Get location by ID
   */
  async getLocationById(id: string): Promise<Location | null> {
    await this.delay(200);
    return mockLocations.find(loc => loc.id === id) || null;
  }

  /**
   * Geocode an address to coordinates
   */
  async geocodeAddress(address: string): Promise<{ latitude: number; longitude: number } | null> {
    await this.delay(300);

    // Mock geocoding - return first matching location's coordinates
    const location = mockLocations.find(loc => 
      loc.address.toLowerCase().includes(address.toLowerCase())
    );

    if (location) {
      return { latitude: location.latitude, longitude: location.longitude };
    }

    // Default to New York City center if no match
    return { latitude: 40.7128, longitude: -74.0060 };
  }

  /**
   * Reverse geocode coordinates to address
   */
  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    await this.delay(300);

    // Mock reverse geocoding - find nearest location
    let nearest = mockLocations[0];
    let minDistance = this.calculateDistance(latitude, longitude, nearest.latitude, nearest.longitude);

    mockLocations.forEach(loc => {
      const distance = this.calculateDistance(latitude, longitude, loc.latitude, loc.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = loc;
      }
    });

    return nearest.address;
  }

  /**
   * Get route between two points
   */
  async getRoute(
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number
  ): Promise<RouteResponse> {
    await this.delay(400);

    const distance = this.calculateDistance(startLat, startLng, endLat, endLng);
    const duration = distance * 2; // Mock: 2 minutes per km

    return {
      distance: Math.round(distance * 10) / 10,
      duration: Math.round(duration),
      steps: [
        'Head north on current street',
        'Turn right at the intersection',
        'Continue straight for 2 km',
        'Turn left onto destination street',
        'Arrive at destination'
      ]
    };
  }

  /**
   * Get nearby locations
   */
  async getNearbyLocations(
    latitude: number,
    longitude: number,
    radius: number = 5,
    category?: string
  ): Promise<Location[]> {
    await this.delay(300);

    let nearby = mockLocations.filter(loc => {
      const distance = this.calculateDistance(latitude, longitude, loc.latitude, loc.longitude);
      return distance <= radius;
    });

    if (category && category !== 'all') {
      nearby = nearby.filter(loc => loc.category === category);
    }

    // Sort by distance
    nearby.sort((a, b) => {
      const distA = this.calculateDistance(latitude, longitude, a.latitude, a.longitude);
      const distB = this.calculateDistance(latitude, longitude, b.latitude, b.longitude);
      return distA - distB;
    });

    return nearby;
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const mapService = new MapAPIService();
