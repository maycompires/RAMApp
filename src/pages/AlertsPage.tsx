import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Bell, Trash2, Edit, MapPin, Calendar, AlertTriangle } from 'lucide-react';

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

interface NewAlert {
  title: string;
  description: string;
  riskLevel: string;
}

const DEFAULT_RADIUS = 50;

function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<NewAlert>({
    title: '',
    description: '',
    riskLevel: 'medium',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const savedAlerts = localStorage.getItem('alerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  const getRiskColor = (riskLevel: string | undefined) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskBorder = (riskLevel: string | undefined) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return 'border-green-500';
      case 'medium':
        return 'border-yellow-500';
      case 'high':
        return 'border-red-500';
      default:
        return 'border-gray-500';
    }
  };

  const validateRiskLevel = (input: string | undefined) => {
    const level = input?.toLowerCase()?.trim();
    return ['low', 'medium', 'high'].includes(level || '') ? level : 'medium';
  };

  const handleSaveAlert = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { title, description, riskLevel } = currentAlert;

          if (!title.trim() || !description.trim()) {
            alert('Título e descrição são obrigatórios!');
            return;
          }

          if (isEditing && editingId !== null) {
            // Update existing alert
            const updatedAlert = alerts.find(a => a.id === editingId);
            
            if (updatedAlert) {
              const editedAlert: Alert = {
                ...updatedAlert,
                title: title.trim(),
                description: description.trim(),
                riskLevel: validateRiskLevel(riskLevel) || 'medium',
                // Mantenha o raio original se estiver editando
                radius: updatedAlert.radius,
              };

              const updatedAlerts = alerts.map((a) => (a.id === editingId ? editedAlert : a));
              setAlerts(updatedAlerts);
              localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
            }
          } else {
            // Create new alert
            const newAlertObj: Alert = {
              id: Date.now(),
              title: title.trim(),
              description: description.trim(),
              riskLevel: validateRiskLevel(riskLevel) || 'medium',
              radius: DEFAULT_RADIUS,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              timestamp: new Date().toISOString(),
            };

            const updatedAlerts = [...alerts, newAlertObj];
            setAlerts(updatedAlerts);
            localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
          }

          // Reset state and close modal
          setCurrentAlert({ title: '', description: '', riskLevel: 'medium' });
          setShowModal(false);
          setIsEditing(false);
          setEditingId(null);
        },
        (error) => {
          alert('Falha ao obter localização: ' + error.message);
        }
      );
    } else {
      alert('Geolocalização não é suportada pelo seu navegador');
    }
  };

  const handleEditClick = (alert: Alert) => {
    setIsEditing(true);
    setEditingId(alert.id);
    setCurrentAlert({
      title: alert.title,
      description: alert.description,
      riskLevel: alert.riskLevel,
    });
    setShowModal(true);
  };

  const handleDeleteAlert = (id: number) => {
    const updatedAlerts = alerts.filter((alert) => alert.id !== id);
    setAlerts(updatedAlerts);
    localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentAlert((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateNewClick = () => {
    setIsEditing(false);
    setEditingId(null);
    setCurrentAlert({
      title: '',
      description: '',
      riskLevel: 'medium',
    });
    setShowModal(true);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Alertas</h1>
        <button
          onClick={handleCreateNewClick}
          className="bg-blue-500 text-white w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center sm:justify-start"
        >
          <Bell className="w-5 h-5 mr-2" />
          Criar Alerta
        </button>
      </div>

      {/* Modal for creating or editing alerts */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              {isEditing ? 'Editar Alerta' : 'Criar Novo Alerta'}
            </h2>
            <form onSubmit={handleSaveAlert}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  name="title"
                  value={currentAlert.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Descrição</label>
                <textarea
                  name="description"
                  value={currentAlert.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Nível de Risco</label>
                <select
                  name="riskLevel"
                  value={currentAlert.riskLevel}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="low">Baixo</option>
                  <option value="medium">Médio</option>
                  <option value="high">Alto</option>
                </select>
              </div>
              {isEditing && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    O raio do alerta é fixo em {DEFAULT_RADIUS} metros
                  </p>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setEditingId(null);
                    setCurrentAlert({ title: '', description: '', riskLevel: 'medium' });
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isEditing ? 'Salvar Alterações' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getRiskBorder(alert.riskLevel)}`}
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-start">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{alert.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${getRiskColor(
                      alert.riskLevel
                    )}`}
                  >
                    Risco {alert.riskLevel?.toLowerCase() === 'low' ? 'Baixo' : 
                           alert.riskLevel?.toLowerCase() === 'medium' ? 'Médio' : 
                           alert.riskLevel?.toLowerCase() === 'high' ? 'Alto' : ''}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{alert.description}</p>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>Lat: {alert.location.lat.toFixed(4)}, Lng: {alert.location.lng.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-gray-400" />
                    <span>Raio: {alert.radius}m</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{formatDate(alert.timestamp)}</span>
                  </div>
                </div>
              </div>
              <div className="flex mt-3 sm:mt-0 justify-end space-x-2">
                <button
                  onClick={() => handleEditClick(alert)}
                  className="text-blue-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteAlert(alert.id)}
                  className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum alerta ainda. Crie um para começar!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlertsPage;