import React from 'react';
import { Shield, AlertTriangle, Umbrella, ChevronFirst as FirstAid } from 'lucide-react';

function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Diretrizes de Segurança</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
            <h2 className="text-xl font-semibold">Prevenção de Riscos</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2"></span>
              <p>Monitore regularmente as previsões e alertas climáticos locais</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2"></span>
              <p>Mantenha números de contato de emergência facilmente acessíveis</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2"></span>
              <p>Conheça as rotas de evacuação e zonas seguras da sua área</p>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FirstAid className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold">Kit de Emergência</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
              <p>Suprimentos de primeiros socorros e medicamentos essenciais</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
              <p>Lanternas e baterias extras</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
              <p>Alimentos não perecíveis e suprimento de água</p>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-xl font-semibold">Segurança em Casa</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
              <p>Instale e mantenha detectores de fumaça</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
              <p>Mantenha documentos importantes em um recipiente à prova d'água</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
              <p>Tenha um plano de emergência familiar e pratique-o</p>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Umbrella className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">Segurança Climática</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <p>Mantenha-se informado sobre condições climáticas severas</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <p>Conheça os sinais de diferentes perigos climáticos</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <p>Tenha uma fonte de energia reserva pronta</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SafetyPage;