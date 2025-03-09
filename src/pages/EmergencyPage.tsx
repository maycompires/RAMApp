import React from 'react';
import { Phone, AlertCircle, Siren, Building2 } from 'lucide-react';

function EmergencyPage() {
  const handleEmergencyContact = (service: string) => {
    alert(`Connecting to ${service}...`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex items-center">
          <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
          <p className="text-red-700">
            In case of immediate danger, call emergency services immediately.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Emergency Contacts</h2>
          <div className="space-y-4">
            <button
              onClick={() => handleEmergencyContact('Emergency Services')}
              className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100"
            >
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-red-500 mr-3" />
                <span className="font-semibold">Emergency Services</span>
              </div>
              <span className="text-xl font-bold">190</span>
            </button>

            <button
              onClick={() => handleEmergencyContact('Fire Department')}
              className="w-full flex items-center justify-between p-4 bg-orange-50 rounded-lg hover:bg-orange-100"
            >
              <div className="flex items-center">
                <Siren className="w-6 h-6 text-orange-500 mr-3" />
                <span className="font-semibold">Fire Department</span>
              </div>
              <span className="text-xl font-bold">193</span>
            </button>

            <button
              onClick={() => handleEmergencyContact('Civil Defense')}
              className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <div className="flex items-center">
                <Building2 className="w-6 h-6 text-blue-500 mr-3" />
                <span className="font-semibold">Civil Defense</span>
              </div>
              <span className="text-xl font-bold">199</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Emergency Guidelines</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Stay Calm</h3>
              <p className="text-gray-600">
                Take deep breaths and try to remain calm. This will help you think clearly and act effectively.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Assess the Situation</h3>
              <p className="text-gray-600">
                Quickly evaluate the emergency and identify immediate risks to safety.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Follow Instructions</h3>
              <p className="text-gray-600">
                Listen to and follow instructions from emergency services personnel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyPage;