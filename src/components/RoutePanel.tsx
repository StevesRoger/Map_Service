import { X, Navigation, Clock, Ruler } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import type { RouteResponse } from '../services/mapService';

interface RoutePanelProps {
  route: RouteResponse | null;
  startAddress: string;
  endAddress: string;
  onClose: () => void;
}

export function RoutePanel({ route, startAddress, endAddress, onClose }: RoutePanelProps) {
  if (!route) return null;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          <h3 className="text-gray-900">Route Details</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">From</p>
            <p className="text-gray-900">{startAddress}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">To</p>
            <p className="text-gray-900">{endAddress}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Distance</p>
            <p className="text-gray-900">{route.distance} km</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-gray-900">{route.duration} min</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h4 className="text-gray-900 mb-3">Directions</h4>
        <div className="space-y-2">
          {route.steps.map((step, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm">
                {index + 1}
              </div>
              <p className="text-sm text-gray-700 pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
