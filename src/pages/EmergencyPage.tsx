import React from 'react';
import { Phone, AlertCircle, Siren, Building2 } from 'lucide-react';

function EmergencyPage() {
  const handleEmergencyContact = (service: string) => {
    alert(`Conectando-se a ${service}...`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex items-center">
          <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
          <p className="text-red-700">
            Em caso de perigo imediato, ligue para os serviços de emergência imediatamente.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Contatos de Emergência</h2>
          <div className="space-y-4">
            <button
              onClick={() => handleEmergencyContact('Serviços de Emergência')}
              className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100"
            >
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-red-500 mr-3" />
                <span className="font-semibold">Serviços de Emergência</span>
              </div>
              <span className="text-xl font-bold">190</span>
            </button>

            <button
              onClick={() => handleEmergencyContact('Corpo de Bombeiros')}
              className="w-full flex items-center justify-between p-4 bg-orange-50 rounded-lg hover:bg-orange-100"
            >
              <div className="flex items-center">
                <Siren className="w-6 h-6 text-orange-500 mr-3" />
                <span className="font-semibold">Corpo de Bombeiros</span>
              </div>
              <span className="text-xl font-bold">193</span>
            </button>

            <button
              onClick={() => handleEmergencyContact('Defesa Civil')}
              className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <div className="flex items-center">
                <Building2 className="w-6 h-6 text-blue-500 mr-3" />
                <span className="font-semibold">Defesa Civil</span>
              </div>
              <span className="text-xl font-bold">199</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Diretrizes de Emergência</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Mantenha a Calma</h3>
              <p className="text-gray-600">
                Respire fundo e tente manter a calma. Isso ajudará você a pensar com clareza e agir de forma eficaz.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Avalie a Situação</h3>
              <p className="text-gray-600">
                Avalie rapidamente a emergência e identifique os riscos imediatos à segurança.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Siga as Instruções</h3>
              <p className="text-gray-600">
                Ouça e siga as instruções do pessoal dos serviços de emergência.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyPage;