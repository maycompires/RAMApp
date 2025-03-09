import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Bell, Trash2, Edit } from 'lucide-react';

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
  radius: number;
}

function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<NewAlert>({
    title: '',
    description: '',
    riskLevel: 'medium',
    radius: 15,
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

  const validateRiskLevel = (input: string | undefined) => {
    const level = input?.toLowerCase()?.trim();
    return ['low', 'medium', 'high'].includes(level || '') ? level : 'medium';
  };

  const handleSaveAlert = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { title, description, riskLevel, radius } = currentAlert;

          if (!title.trim() || !description.trim()) {
            alert('Title and description are required!');
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
                radius: Math.min(Math.max(0, radius), 30),
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
              radius: Math.min(Math.max(0, radius), 30),
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
          setCurrentAlert({ title: '', description: '', riskLevel: 'medium', radius: 15 });
          setShowModal(false);
          setIsEditing(false);
          setEditingId(null);
        },
        (error) => {
          alert('Failed to get location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const handleEditClick = (alert: Alert) => {
    setIsEditing(true);
    setEditingId(alert.id);
    setCurrentAlert({
      title: alert.title,
      description: alert.description,
      riskLevel: alert.riskLevel,
      radius: alert.radius
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
      [name]: name === 'radius' ? parseInt(value) || 0 : value,
    }));
  };

  const handleCreateNewClick = () => {
    setIsEditing(false);
    setEditingId(null);
    setCurrentAlert({
      title: '',
      description: '',
      riskLevel: 'medium',
      radius: 15
    });
    setShowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Alerts</h1>
        <button
          onClick={handleCreateNewClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <Bell className="w-5 h-5 mr-2" />
          Create Alert
        </button>
      </div>

      {/* Modal for creating or editing alerts */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? 'Edit Alert' : 'Create New Alert'}
            </h2>
            <form onSubmit={handleSaveAlert}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Title</label>
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
                <label className="block text-gray-700 mb-1">Description</label>
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
                <label className="block text-gray-700 mb-1">Risk Level</label>
                <select
                  name="riskLevel"
                  value={currentAlert.riskLevel}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Radius (0-30 meters)</label>
                <input
                  type="number"
                  name="radius"
                  value={currentAlert.radius}
                  onChange={handleInputChange}
                  min="0"
                  max="30"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setEditingId(null);
                    setCurrentAlert({ title: '', description: '', riskLevel: 'medium', radius: 15 });
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isEditing ? 'Save Changes' : 'Create'}
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
                    {alert.riskLevel?.charAt(0).toUpperCase() + alert.riskLevel?.slice(1)} Risk
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{alert.description}</p>
                <p className="text-sm text-gray-500 mt-2">Radius: {alert.radius}m</p>
                <p className="text-sm text-gray-500">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(alert)}
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
            <p className="text-gray-600">No alerts yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlertsPage;