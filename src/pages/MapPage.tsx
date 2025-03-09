import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

function MapPage() {
  const alertsFromStorage = localStorage.getItem('alerts') || '[]';
  const alerts: Alert[] = JSON.parse(alertsFromStorage);

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

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="bg-white rounded-lg shadow-md p-4 h-full">
        <MapContainer
          center={[-23.550520, -46.633308]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {alerts.map((alert) => (
            <React.Fragment key={alert.id}>
              <Circle
                center={[alert.location.lat, alert.location.lng]}
                radius={alert.radius}
                pathOptions={{
                  color: getRiskColor(alert.riskLevel),
                  fillColor: getRiskColor(alert.riskLevel),
                  fillOpacity: 0.2
                }}
              />
              <Marker position={[alert.location.lat, alert.location.lng]}>
                <Popup>
                  <div>
                    <h3 className="font-bold">{alert.title}</h3>
                    <p className="text-sm">{alert.description}</p>
                    <p className="text-sm mt-2">
                      Risk Level: <span className="font-semibold capitalize">{alert.riskLevel}</span>
                    </p>
                    <p className="text-sm">
                      Radius: <span className="font-semibold">{alert.radius}m</span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;