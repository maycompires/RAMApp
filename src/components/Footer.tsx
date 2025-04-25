import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-md mt-2 py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <h2 className="text-lg font-bold text-gray-800">RAMApp</h2>
            <p className="text-gray-600 text-xs">Monitoramento de Áreas de Risco</p>
          </div>
          <div className="text-gray-600 text-xs">
            <p>&copy; {new Date().getFullYear()} RAMApp. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;