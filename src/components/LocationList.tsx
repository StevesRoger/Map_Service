import { MapPin, Star, Navigation2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Location } from '../services/mapService';

interface LocationListProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  onGetDirections?: (location: Location) => void;
}

export function LocationList({
  locations,
  selectedLocation,
  onLocationSelect,
  onGetDirections
}: LocationListProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      restaurant: 'bg-orange-100 text-orange-700',
      hotel: 'bg-purple-100 text-purple-700',
      attraction: 'bg-blue-100 text-blue-700',
      shopping: 'bg-green-100 text-green-700',
      other: 'bg-gray-100 text-gray-700'
    };
    return colors[category] || colors.other;
  };

  if (locations.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No locations found</p>
        <p className="text-sm">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {locations.map((location) => (
        <Card
          key={location.id}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedLocation?.id === location.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => onLocationSelect(location)}
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 truncate">{location.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{location.address}</p>
              </div>
              <Badge className={getCategoryColor(location.category)}>
                {location.category}
              </Badge>
            </div>

            {location.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-700">{location.rating}</span>
              </div>
            )}

            {location.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{location.description}</p>
            )}

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onLocationSelect(location);
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                View on Map
              </Button>
              {onGetDirections && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onGetDirections(location);
                  }}
                >
                  <Navigation2 className="w-4 h-4 mr-2" />
                  Directions
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
