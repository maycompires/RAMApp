import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, Bell, Shield, Phone, Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
}

function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // Get user's location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Get API key from environment variables
          const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );
          
          if (!response.ok) {
            throw new Error('Falha ao obter dados climáticos');
          }
          
          const data = await response.json();
          setWeather(data);
          setLoading(false);
        }, 
        (err) => {
          setError('Permissão de localização negada. Não é possível mostrar o clima.');
          setLoading(false);
        });
      } catch (err) {
        setError('Erro ao obter dados climáticos');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-600">Carregando informações climáticas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg text-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold">{weather.name}</h3>
          <div className="flex items-center mt-2">
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description}
              className="w-16 h-16 mr-2"
            />
            <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
          </div>
          <p className="capitalize text-lg mt-1">{weather.weather[0].description}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Thermometer className="w-5 h-5 mr-2" />
            <span>Sensação: {Math.round(weather.main.feels_like)}°C</span>
          </div>
          <div className="flex items-center">
            <Droplets className="w-5 h-5 mr-2" />
            <span>Umidade: {weather.main.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="w-5 h-5 mr-2" />
            <span>Vento: {Math.round(weather.wind.speed * 3.6)} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Bem-vindo ao Aplicativo de Monitoramento de Áreas de Risco </h1>
      
      <WeatherCard />
      
      <div className="mt-6 grid md:grid-cols-2 gap-6">
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