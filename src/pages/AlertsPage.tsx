import React, { useState, useEffect } from 'react';
import { Bell, Trash2, Edit } from 'lucide-react';

function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [editingAlert, setEditingAlert] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    description: '',
    riskLevel: 'medium',
  });

  useEffect(() => {
    const savedAlerts = localStorage.getItem('alerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  const getRiskColor = (riskLevel) => {
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

  const validateRiskLevel = (input) => {
    const level = input?.toLowerCase()?.trim();
    return ['low', 'medium', 'high'].includes(level) ? level : 'medium';
  };

  const handleCreateAlert = (e) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { title, description, riskLevel } = newAlert;

          if (!title.trim() || !description.trim()) {
            alert('Título e descrição são obrigatórios!');
            return;
          }

          const validatedAlert = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            riskLevel: validateRiskLevel(riskLevel),
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            timestamp: new Date().toISOString(),
          };

          const updatedAlerts = [...alerts, validatedAlert];
          setAlerts(updatedAlerts);
          localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
          setNewAlert({ title: '', description: '', riskLevel: 'medium' });
          setShowCreateModal(false);
        },
        (error) => {
          alert('Falha ao obter localização: ' + error.message);
        }
      );
    } else {
      alert('Geolocalização não é suportada pelo seu navegador');
    }
  };

  const handleEditAlert = (alert) => {
    const title = prompt('Editar título do alerta:', alert.title);
    if (!title) return;

    const description = prompt('Editar descrição do alerta:', alert.description);
    if (!description) return;

    const riskInput = prompt('Editar nível de risco (baixo, médio, alto):', alert.riskLevel);
    const radius = alert.radius ? parseInt(prompt('Editar raio (0-30 metros):', alert.radius)) : null;

    const updatedAlert = {
      ...alert,
      title: title.trim(),
      description: description.trim(),
      riskLevel: validateRiskLevel(riskInput),
      ...(radius !== null && { radius: Math.min(Math.max(0, radius || alert.radius), 30) }),
    };

    const updatedAlerts = alerts.map((a) => (a.id === alert.id ? updatedAlert : a));
    setAlerts(updatedAlerts);
    localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
    setEditingAlert(null);
  };

  const handleDeleteAlert = (id) => {
    const updatedAlerts = alerts.filter((alert) => alert.id !== id);
    setAlerts(updatedAlerts);
    localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlert((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Alertas</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <Bell className="w-5 h-5 mr-2" />
          Criar Alerta
        </button>
      </div>

      {/* Modal para criação de alertas */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Criar Novo Alerta</h2>
            <form onSubmit={handleCreateAlert}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  name="title"
                  value={newAlert.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Descrição</label>
                <textarea
                  name="description"
                  value={newAlert.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Nível de Risco</label>
                <select
                  name="riskLevel"
                  value={newAlert.riskLevel}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="low">Baixo</option>
                  <option value="medium">Médio</option>
                  <option value="high">Alto</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-gray-800">{alert.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getRiskColor(
                      alert.riskLevel
                    )}`}
                  >
                    Risco {alert.riskLevel?.charAt(0).toUpperCase() + alert.riskLevel?.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{alert.description}</p>
                {alert.radius && <p className="text-sm text-gray-500 mt-2">Raio: {alert.radius}m</p>}
                <p className="text-sm text-gray-500">
                  {new Date(alert.timestamp).toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditAlert(alert)}
                  className="text-blue-500 hover:text-blue-600 p-2"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteAlert(alert.id)}
                  className="text-red-500 hover:text-red-600 p-2"
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