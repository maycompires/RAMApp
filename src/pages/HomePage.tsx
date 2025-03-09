import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Bell, Shield, Phone } from 'lucide-react';

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Risk Monitor</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/map"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Map className="w-8 h-8 text-blue-500" />
            <h2 className="text-xl font-semibold ml-3">Risk Map</h2>
          </div>
          <p className="text-gray-600">
            View and monitor risk areas in real-time with our interactive map interface.
          </p>
        </Link>

        <Link
          to="/alerts"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Bell className="w-8 h-8 text-orange-500" />
            <h2 className="text-xl font-semibold ml-3">Alerts</h2>
          </div>
          <p className="text-gray-600">
            Create and manage alerts for various risk situations in your area.
          </p>
        </Link>

        <Link
          to="/safety"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-green-500" />
            <h2 className="text-xl font-semibold ml-3">Safety Tips</h2>
          </div>
          <p className="text-gray-600">
            Access important safety guidelines and preventive measures.
          </p>
        </Link>

        <Link
          to="/emergency"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Phone className="w-8 h-8 text-red-500" />
            <h2 className="text-xl font-semibold ml-3">Emergency</h2>
          </div>
          <p className="text-gray-600">
            Quick access to emergency contacts and resources.
          </p>
        </Link>
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">About Risk Monitor</h2>
        <p className="text-gray-700 mb-4">
          Risk Monitor is your comprehensive solution for monitoring and managing risk areas in your community. 
          Our platform enables real-time tracking, alert creation, and access to vital safety resources.
        </p>
        <p className="text-gray-700">
          Stay informed, stay safe, and help keep your community protected by actively participating in risk monitoring and management.
        </p>
      </div>
    </div>
  );
}

export default HomePage;