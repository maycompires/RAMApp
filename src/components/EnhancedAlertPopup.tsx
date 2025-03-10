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
    <div className="enhanced-alert-popup compact-popup">
      {/* Header with title and risk level */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-bold text-base text-gray-800 truncate">{alert.title}</h3>
        <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium ${getRiskLevelColor(alert.riskLevel)}`}>
          {alert.riskLevel.charAt(0).toUpperCase() + alert.riskLevel.slice(1)}
        </span>
      </div>
      
      {/* Description - limite de 60 caracteres */}
      <p className="text-xs text-gray-700 mt-1 mb-2 border-b border-gray-100 pb-2">
        {alert.description.length > 60 
          ? `${alert.description.substring(0, 60)}...` 
          : alert.description}
      </p>
      
      {/* Location info - simplificado */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <MapPin className="w-3 h-3 text-gray-500 flex-shrink-0" />
        <div className="text-xs text-gray-700 truncate">
          <p className="truncate">{getAddressDisplay()}</p>
        </div>
      </div>
      
      {/* Time and radius info - compacto em linha */}
      <div className="flex items-center justify-between mb-2 text-[10px] text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-gray-500" />
          <span>{formatDate(alert.timestamp)}</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-gray-500" />
          <span>Raio: {alert.radius}m</span>
        </div>
      </div>
      
      {/* Coordenadas */}
      <div className="text-[10px] text-gray-500 mb-1.5">
        Lat: {alert.location.lat.toFixed(5)}, Lng: {alert.location.lng.toFixed(5)}
      </div>
      
      {/* Location details - mais compacto */}
      {!locationInfo.loading && !locationInfo.error && locationInfo.address && (
        <div className="bg-gray-50 p-1.5 rounded text-[10px] text-gray-700">
          <h4 className="font-medium text-gray-800 flex items-center gap-1">
            <Info className="w-3 h-3" /> Detalhes
          </h4>
          <div className="mt-1">
            {Object.entries(locationInfo.address)
              .filter(([key, value]) => 
                value && 
                ['city', 'suburb', 'road'].includes(key)
              )
              .map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize mr-1">{key === 'city' ? 'Cidade' : key === 'suburb' ? 'Bairro' : key === 'road' ? 'Rua' : key}:</span>
                  <span className="font-medium truncate max-w-[120px]">{value}</span>
                </div>
              ))
            }
          </div>
        </div>
      )}
      
      {/* Draggable message */}
      {isDraggable && (
        <p className="text-[10px] text-gray-500 italic mt-1.5 text-center">
          Arraste para reposicionar
        </p>
      )}
    </div>
  );
};

export default EnhancedAlertPopup;