import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import EnhancedAlertPopup from '../components/EnhancedAlertPopup';

// Coordenadas e configurações
const FLORIANOPOLIS_CENTER = {
  lat: -27.5969,
  lng: -48.5495
};

// Raio padrão fixo para todos os alertas (em metros)
const DEFAULT_RADIUS = 50;

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

// Componente para centralizar o mapa em Florianópolis
function SetViewOnInit() {
  const map = useMap();
  
  useEffect(() => {
    map.setView([FLORIANOPOLIS_CENTER.lat, FLORIANOPOLIS_CENTER.lng], 13);
  }, [map]);
  
  return null;
}

// Componente de marcador arrastável
function DraggableMarker({ alert, onMarkerDrag }: { 
  alert: Alert, 
  onMarkerDrag: (id: number, lat: number, lng: number) => void 
}) {
  const [position, setPosition] = useState({
    lat: alert.location.lat,
    lng: alert.location.lng
  });
  
  const markerRef = React.useRef(null);

  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const newPos = marker.getLatLng();
          setPosition(newPos);
          onMarkerDrag(alert.id, newPos.lat, newPos.lng);
        }
      },
    }),
    [alert.id, onMarkerDrag],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={[position.lat, position.lng]}
      ref={markerRef}
      className={`marker-icon-${alert.riskLevel.toLowerCase()}`}
    >
      <Popup className="enhanced-popup compact-popup" maxWidth={240} minWidth={220}>
        <EnhancedAlertPopup alert={alert} isDraggable={true} />
      </Popup>
    </Marker>
  );
}

function MapPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const alertsFromStorage = localStorage.getItem('alerts') || '[]';
    setAlerts(JSON.parse(alertsFromStorage));
    
    // Adicionar estilos CSS para ícones de marcadores personalizados e popup
    const style = document.createElement('style');
    style.textContent = `
      .marker-icon-low {
        filter: hue-rotate(120deg) brightness(1.2);
      }
      .marker-icon-medium {
        filter: hue-rotate(30deg) brightness(1.2);
      }
      .marker-icon-high {
        filter: hue-rotate(-30deg) brightness(1.2);
      }
      .enhanced-popup .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
      }
      .enhanced-popup .leaflet-popup-content {
        margin: 10px;
        padding: 0;
      }
      .enhanced-popup .leaflet-popup-tip {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
      }
      .compact-popup .leaflet-popup-content-wrapper {
        font-size: 11px;
      }
      .compact-popup .leaflet-popup-content {
        margin: 8px;
      }
      
      @media (max-width: 640px) {
        .enhanced-popup .leaflet-popup-content {
          margin: 8px;
          min-width: 180px;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Handler para responsividade
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.head.removeChild(style);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getRiskColor = (riskLevel: string): string => {
    switch (riskLevel) {
      case 'low':
        return '#22c55e';
      case 'medium':
        return '#eab308';
      case 'high':
        return '#ef4444';
      default:
        return '#3b82f6';
    }
  };

  const handleMarkerDrag = (id: number, lat: number, lng: number) => {
    const updatedAlerts = alerts.map(alert => {
      if (alert.id === id) {
        return {
          ...alert,
          location: {
            lat,
            lng
          }
        };
      }
      return alert;
    });
    
    setAlerts(updatedAlerts);
    localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
  };

  return (
    <div className="h-[calc(100vh-5rem)]">
      <div className="bg-white rounded-lg shadow-md p-1 sm:p-2 h-full relative">
        <div className="absolute top-2 left-2 right-2 z-10 bg-white bg-opacity-90 rounded px-2 py-1 text-xs text-gray-600 shadow-sm">
          <p>Você pode arrastar os marcadores para reposicionar os alertas no mapa.</p>
        </div>
        
        <MapContainer
          center={[FLORIANOPOLIS_CENTER.lat, FLORIANOPOLIS_CENTER.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <SetViewOnInit />
          
          {alerts.map((alert) => (
            <React.Fragment key={alert.id}>
              <Circle
                center={[alert.location.lat, alert.location.lng]}
                radius={DEFAULT_RADIUS}
                pathOptions={{
                  color: getRiskColor(alert.riskLevel),
                  fillColor: getRiskColor(alert.riskLevel),
                  fillOpacity: 0.2
                }}
              />
              <DraggableMarker 
                alert={alert} 
                onMarkerDrag={handleMarkerDrag} 
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;