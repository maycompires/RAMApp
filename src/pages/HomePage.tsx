import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Bell, Shield, Phone } from 'lucide-react';

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Bem-vindo ao Aplicativo de Monitoramento de Áreas de Risco </h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/map"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Map className="w-8 h-8 text-blue-500" />
            <h2 className="text-xl font-semibold ml-3">Mapa de Riscos</h2>
          </div>
          <p className="text-gray-600">
            Visualize e monitore áreas de risco em tempo real com nossa interface de mapa interativo.
          </p>
        </Link>

        <Link
          to="/alerts"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Bell className="w-8 h-8 text-orange-500" />
            <h2 className="text-xl font-semibold ml-3">Alertas</h2>
          </div>
          <p className="text-gray-600">
            Crie e gerencie alertas para várias situações de risco em sua área.
          </p>
        </Link>

        <Link
          to="/safety"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-green-500" />
            <h2 className="text-xl font-semibold ml-3">Dicas de Segurança</h2>
          </div>
          <p className="text-gray-600">
            Acesse diretrizes de segurança importantes e medidas preventivas.
          </p>
        </Link>

        <Link
          to="/emergency"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Phone className="w-8 h-8 text-red-500" />
            <h2 className="text-xl font-semibold ml-3">Emergência</h2>
          </div>
          <p className="text-gray-600">
            Acesso rápido a contatos de emergência e recursos.
          </p>
        </Link>
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Sobre o Risk Monitor</h2>
        <p className="text-gray-700 mb-4">
          O Risk Monitor é sua solução abrangente para monitoramento e gerenciamento de áreas de risco em sua comunidade. 
          Nossa plataforma permite rastreamento em tempo real, criação de alertas e acesso a recursos vitais de segurança.
        </p>
        <p className="text-gray-700">
          Mantenha-se informado, seguro e ajude a proteger sua comunidade participando ativamente do monitoramento e gerenciamento de riscos.
        </p>
      </div>
    </div>
  );
}

export default HomePage;