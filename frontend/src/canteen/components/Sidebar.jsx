import React from 'react';
import { Home, Upload, ShoppingCart, MessageSquare, Package, Settings } from 'lucide-react';

const Sidebar = ({ activeScreen, setActiveScreen }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'upload', icon: Upload, label: 'Upload Menu' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'purchases', icon: Package, label: 'Purchases' },
    { id: 'complaints', icon: MessageSquare, label: 'Complaints' },
    { id: 'settings', icon: Settings, label: 'Canteen Settings' }
  ];

  return (
    <aside style={{
      width: '260px',
      background: '#120000ff',
      minHeight: 'calc(100vh - 73px)',
      padding: '2rem 0',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
    }}>
      {menuItems.map(item => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 2rem',
              background: isActive ? '#16a34a' : 'transparent',
              color: isActive ? '#fff' : '#d1d5db',
              border: 'none',
              borderLeft: isActive ? '4px solid #fff' : '4px solid transparent',
              fontSize: '1rem',
              fontWeight: isActive ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.target.style.background = '#1f1f1f';
                e.target.style.color = '#fff';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.target.style.background = 'transparent';
                e.target.style.color = '#d1d5db';
              }
            }}
          >
            <Icon size={20} />
            {item.label}
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;