import React from 'react';
import { Shield, AlertTriangle, Umbrella, ChevronFirst as FirstAid } from 'lucide-react';

function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Safety Guidelines</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
            <h2 className="text-xl font-semibold">Risk Prevention</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2"></span>
              <p>Monitor local weather forecasts and warnings regularly</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2"></span>
              <p>Keep emergency contact numbers readily available</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2"></span>
              <p>Know your area's evacuation routes and safe zones</p>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FirstAid className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold">Emergency Kit</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
              <p>First aid supplies and essential medications</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
              <p>Flashlights and extra batteries</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
              <p>Non-perishable food and water supply</p>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-xl font-semibold">Home Safety</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
              <p>Install and maintain smoke detectors</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
              <p>Keep important documents in a waterproof container</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
              <p>Have a family emergency plan and practice it</p>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Umbrella className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">Weather Safety</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <p>Stay informed about severe weather conditions</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <p>Know the signs of different weather hazards</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <p>Have a backup power source ready</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SafetyPage;