import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapPage() {
  const [alerts, setAlerts] = useState(JSON.parse(localStorage.getItem('alerts') || '[]'));

  // Monitora mudanças no localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedAlerts = JSON.parse(localStorage.getItem('alerts') || '[]');
      setAlerts(updatedAlerts);
    };

    // Escuta eventos de mudança no localStorage (funciona em abas diferentes)
    window.addEventListener('storage', handleStorageChange);

    // Também verifica mudanças na mesma aba
    const interval = setInterval(() => {
      const updatedAlerts = JSON.parse(localStorage.getItem('alerts') || '[]');
      if (JSON.stringify(updatedAlerts) !== JSON.stringify(alerts)) {
        setAlerts(updatedAlerts);
      }
    }, 1000); // Verifica a cada 1 segundo

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [alerts]);

  const getRiskColor = (riskLevel) => {
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
          center={[-27.5969, -48.5495]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {alerts.map((alert) => (
            <React.Fragment key={alert.id}>
              <Circle
                center={[alert.location.lat, alert.location.lng]}
                radius={100} // Raio fixo de 100 metros
                pathOptions={{
                  color: getRiskColor(alert.riskLevel),
                  fillColor: getRiskColor(alert.riskLevel),
                  fillOpacity: 0.2,
                }}
              />
              <Marker position={[alert.location.lat, alert.location.lng]}>
                <Popup>
                  <div>
                    <h3 className="font-bold">{alert.title}</h3>
                    <p className="text-sm">{alert.description}</p>
                    <p className="text-sm mt-2">
                      Nível de Risco: <span className="font-semibold capitalize">{alert.riskLevel}</span>
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