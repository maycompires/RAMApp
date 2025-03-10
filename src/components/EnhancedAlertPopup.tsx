import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Calendar, Droplet, Wind, Info } from 'lucide-react';

interface Alert {
  id: number;
  title: string;
  description: string;
  riskLevel: string;
  radius: number;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: string;
}

interface LocationInfo {
  address?: {
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    neighbourhood?: string;
    [key: string]: string | undefined;
  };
  display_name?: string;
  loading: boolean;
  error: string | null;
}

interface EnhancedAlertPopupProps {
  alert: Alert;
  isDraggable?: boolean;
}

const getRiskLevelColor = (riskLevel: string): string => {
  switch (riskLevel.toLowerCase()) {
    case 'low':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'high':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-blue-600 bg-blue-100';
  }
};

const EnhancedAlertPopup: React.FC<EnhancedAlertPopupProps> = ({ alert, isDraggable = false }) => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchLocationInfo = async () => {
      try {
        setLocationInfo(prev => ({ ...prev, loading: true, error: null }));
        
        // Nominatim API for reverse geocoding (getting address from coordinates)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${alert.location.lat}&lon=${alert.location.lng}&zoom=18&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
              'User-Agent': 'RAMApp/1.0'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch location information');
        }
        
        const data = await response.json();
        setLocationInfo({
          ...data,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching location info:', error);
        setLocationInfo({
          loading: false,
          error: 'Failed to load location information'
        });
      }
    };

    fetchLocationInfo();
  }, [alert.location.lat, alert.location.lng]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getAddressDisplay = (): string => {
    if (locationInfo.loading) return 'Carregando endereço...';
    if (locationInfo.error) return 'Endereço não disponível';
    
    if (locationInfo.address) {
      const { road, suburb, city, state, neighbourhood } = locationInfo.address;
      
      const parts = [];
      if (road) parts.push(road);
      if (neighbourhood) parts.push(neighbourhood);
      if (suburb) parts.push(suburb);
      if (city) parts.push(city);
      if (state) parts.push(state);
      
      return parts.join(', ');
    }
    
    return locationInfo.display_name || 'Endereço não disponível';
  };

  return (
    <div className="enhanced-alert-popup">
      {/* Header with title and risk level */}
      <div className="mb-2 flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-800">{alert.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(alert.riskLevel)}`}>
          {alert.riskLevel.charAt(0).toUpperCase() + alert.riskLevel.slice(1)}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm text-gray-700 mb-3 border-b pb-2">{alert.description}</p>
      
      {/* Location info */}
      <div className="flex items-start gap-2 mb-2">
        <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-700">
          <p>{getAddressDisplay()}</p>
          <div className="text-xs text-gray-500 mt-1">
            Lat: {alert.location.lat.toFixed(6)}, Lng: {alert.location.lng.toFixed(6)}
          </div>
        </div>
      </div>
      
      {/* Time and radius info */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-700">{formatDate(alert.timestamp)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-700">Raio: {alert.radius}m</span>
        </div>
      </div>
      
      {/* Location details */}
      {!locationInfo.loading && !locationInfo.error && locationInfo.address && (
        <div className="bg-gray-50 p-2 rounded-md text-xs text-gray-700 mb-2">
          <h4 className="font-semibold text-gray-800 flex items-center gap-1 mb-1">
            <Info className="w-3.5 h-3.5" /> Detalhes da área
          </h4>
          <div className="grid grid-cols-1 gap-1">
            {Object.entries(locationInfo.address)
              .filter(([key, value]) => 
                value && 
                !['lat', 'lon', 'country_code', 'house_number'].includes(key)
              )
              .slice(0, 5)
              .map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize">{key.replace('_', ' ')}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))
            }
          </div>
        </div>
      )}
      
      {/* Draggable message */}
      {isDraggable && (
        <p className="text-xs text-gray-500 italic border-t pt-2 mt-2">
          Arraste para reposicionar este alerta
        </p>
      )}
    </div>
  );
};

export default EnhancedAlertPopup;