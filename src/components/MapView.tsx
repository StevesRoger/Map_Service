import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import type { Location } from '../services/mapService';

interface MapViewProps {
  center: [number, number];
  zoom: number;
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  onMapClick?: (lat: number, lng: number) => void;
}

export function MapView({
  center,
  zoom,
  locations,
  selectedLocation,
  onLocationSelect,
  onMapClick
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [L, setL] = useState<any>(null);
  const markersRef = useRef<any[]>([]);

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Load Leaflet JS
      const L = await import('leaflet');
      setL(L.default);
    };

    loadLeaflet();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!L || !mapContainerRef.current || map) return;

    const newMap = L.map(mapContainerRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(newMap);

    // Handle map clicks
    if (onMapClick) {
      newMap.on('click', (e: any) => {
        onMapClick(e.latlng.lat, e.latlng.lng);
      });
    }

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, [L, center, zoom]);

  // Update map center
  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);

  // Update markers
  useEffect(() => {
    if (!map || !L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    locations.forEach(location => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative">
            <div class="absolute -translate-x-1/2 -translate-y-full">
              <div class="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg ${
                selectedLocation?.id === location.id ? 'ring-4 ring-blue-300' : ''
              }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
            </div>
          </div>
        `,
        iconSize: [0, 0]
      });

      const marker = L.marker([location.latitude, location.longitude], { icon })
        .addTo(map)
        .on('click', () => onLocationSelect(location));

      markersRef.current.push(marker);
    });
  }, [map, L, locations, selectedLocation, onLocationSelect]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full rounded-lg overflow-hidden" />
      
      {!L && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-gray-700">{locations.length} locations</span>
        </div>
      </div>
    </div>
  );
}
