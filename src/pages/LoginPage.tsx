import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [currentView, setCurrentView] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {currentView === 'login' ? 'Login' : 'Register'}
        </h1>
        
        <form onSubmit={currentView === 'login' ? handleLogin : handleRegister}>
          {currentView === 'register' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {currentView === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        
        <p className="mt-4 text-center">
          {currentView === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setCurrentView('register')}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setCurrentView('login')}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;