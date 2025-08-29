import React from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>KrishiNet</h1>
            <p style={styles.heroSubtitle}>Your trusted partner in modern farming. We provide AI-driven insights, market access, and financial solutions to empower farmers across the nation.</p>
          </div>
        </div>
      </div>
      <div style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>500K+</h2>
            <p style={styles.statText}>Farmers Connected</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>95%+</h2>
            <p style={styles.statText}>AI Accuracy</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>10,000+</h2>
            <p style={styles.statText}>Villages Covered</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>24/7</h2>
            <p style={styles.statText}>Support</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  mainContent: {
    paddingLeft: '5rem',
  },
  hero: {
    backgroundImage: `url('/Home6.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: '#fff',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '5rem',
    boxSizing: 'border-box',
  },
  heroText: {
    textAlign: 'left',
    maxWidth: '600px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '2rem',
    borderRadius: '10px',
  },
  heroTitle: {
    fontSize: '6rem',
    fontWeight: 'bold',
    margin: 0,
    fontFamily: '"Roboto", sans-serif',
    background: '-webkit-linear-gradient(45deg, #4CAF50, #2196F3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    marginTop: '1rem',
    fontFamily: '"Open Sans", sans-serif',
    color: '#f0f0f0',
    lineHeight: '1.4',
  },
  statsSection: {
    padding: '4rem 2rem 4rem 7rem',
    backgroundColor: '#f8f9fa',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    margin: '1rem',
    flex: 1,
    minWidth: '200px',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#28a745',
    margin: 0,
  },
  statText: {
    fontSize: '1.2rem',
    color: '#6c757d',
    marginTop: '0.5rem',
  }
};

export default Home;
