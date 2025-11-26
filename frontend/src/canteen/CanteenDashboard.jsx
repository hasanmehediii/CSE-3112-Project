import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CanteenNavbar from './components/CanteenNavbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UploadMenu from './pages/UploadMenu';
import Orders from './pages/Orders';
import Purchases from './pages/Purchases';
import Complaints from './pages/Complaints';
import Settings from './pages/Settings';

export default function CanteenDashboard() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const navigate = useNavigate();

  const renderScreen = () => {
    switch(activeScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadMenu />;
      case 'orders':
        return <Orders />;
      case 'purchases':
        return <Orders />;
      case 'complaints':
        return <Complaints />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', background: '#f3f4f6', minHeight: '100vh' }}>
      <CanteenNavbar onLogout={handleLogout} />
      
      <div style={{ display: 'flex' }}>
        <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        
        <main style={{ 
          flex: 1, 
          padding: '2.5rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}