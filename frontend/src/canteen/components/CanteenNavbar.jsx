import React from 'react';
import { LogOut } from 'lucide-react';

const CanteenNavbar = ({ onLogout }) => {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '700', margin: 0 }}>
          Khaikhai Canteen
        </h1>
      </div>
      
      <button 
        onClick={onLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255,255,255,0.2)',
          color: '#fff',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '50px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
      >
        <LogOut size={20} />
        Logout
      </button>
    </nav>
  );
};

export default CanteenNavbar;