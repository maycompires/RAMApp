import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home, Map, Bell, Shield, Phone, LogOut, Menu, X } from 'lucide-react';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import AlertsPage from './pages/AlertsPage';
import SafetyPage from './pages/SafetyPage';
import EmergencyPage from './pages/EmergencyPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
  };

  const NavLink = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
    <Link
      to={to}
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon className="w-5 h-5 mr-2" />
      <span>{children}</span>
    </Link>
  );

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">Risk Monitor</h1>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-4">
                <NavLink to="/" icon={Home}>Home</NavLink>
                <NavLink to="/map" icon={Map}>Map</NavLink>
                <NavLink to="/alerts" icon={Bell}>Alerts</NavLink>
                <NavLink to="/safety" icon={Shield}>Safety</NavLink>
                <NavLink to="/emergency" icon={Phone}>Emergency</NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden bg-white border-t py-2">
              <div className="container mx-auto px-4 space-y-2">
                <NavLink to="/" icon={Home}>Home</NavLink>
                <NavLink to="/map" icon={Map}>Map</NavLink>
                <NavLink to="/alerts" icon={Bell}>Alerts</NavLink>
                <NavLink to="/safety" icon={Shield}>Safety</NavLink>
                <NavLink to="/emergency" icon={Phone}>Emergency</NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
            </nav>
          )}
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;