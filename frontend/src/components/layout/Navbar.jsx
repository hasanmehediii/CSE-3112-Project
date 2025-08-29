import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, login, logout } = useAuth();

  return (
    <>
      <style>
        {`
          .dock-item:hover {
            transform: scale(1.2);
            background-color: rgba(255, 255, 255, 0.2);
          }
        `}
      </style>
      <div style={styles.dockContainer}>
        <div style={styles.dock}>
          <div style={styles.brand}>KrishiNet</div>
          <Link to="/" className="dock-item" style={styles.dockItem}>Home</Link>
          <Link to="/about" className="dock-item" style={styles.dockItem}>About</Link>
          <Link to="/services" className="dock-item" style={styles.dockItem}>Services</Link>
          <Link to="/contact" className="dock-item" style={styles.dockItem}>Contact</Link>
          <div style={styles.authSection}>
            {user ? (
              <>
                <span style={styles.username}>{user.username}</span>
                <button onClick={logout} className="dock-item" style={styles.dockItem}>Logout</button>
              </>
            ) : (
              <button onClick={login} className="dock-item" style={{...styles.dockItem, ...styles.loginButton}}>Login</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  dockContainer: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  },
  dock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '20px',
    padding: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
  dockItem: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '15px',
    transition: 'transform 0.2s, background-color 0.2s',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  authSection: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
  },
  username: {
    color: '#fff',
    marginRight: '10px',
    fontWeight: 'bold',
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    marginRight: '20px',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
  },
};

export default Navbar;