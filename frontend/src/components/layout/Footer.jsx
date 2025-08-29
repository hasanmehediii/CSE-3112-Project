import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.gridContainer}>
          {/* Left Section: Company Logo and Description */}
          <div style={styles.krishiNetSection}>
            <h2 style={styles.logo}>KrishiNet</h2>
            <p style={styles.description}>
              KrishiNet is a comprehensive agricultural platform dedicated to empowering farmers with essential resources, market insights, and financial tools to foster sustainable growth and prosperity. 
                          </p>
          </div>

          {/* Quick Links Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Quick Links</h3>
            <ul style={styles.list}>
              <li><Link to="/" style={styles.link}>Home</Link></li>
              <li><Link to="/market" style={styles.link}>Market</Link></li>
              <li><Link to="/loans" style={styles.link}>Loans</Link></li>
              <li><Link to="/insurance" style={styles.link}>Insurance</Link></li>
              <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Resources</h3>
            <ul style={styles.list}>
              <li><a href="#" style={styles.link}>Farming Tips</a></li>
              <li><a href="#" style={styles.link}>Weather Forecast</a></li>
              <li><a href="#" style={styles.link}>Government Schemes</a></li>
              <li><a href="#" style={styles.link}>Crop Calendar</a></li>
            </ul>
          </div>

          {/* Right Section: Contact */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact Us</h3>
            <p style={styles.contactInfo}>
              123 Agri-Tech Road,<br />
              Green Valley, AG 56789<br />
              Email: info@krishinet.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div style={styles.bottomBar}>
          <p style={styles.copyright}>&copy; 2025 KrishiNet. All Rights Reserved.</p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink}><img src="/social/facebook.png" alt="Facebook" style={styles.socialIcon}/></a>
            <a href="#" style={styles.socialLink}><img src="/social/twitter.png" alt="Twitter" style={styles.socialIcon}/></a>
            <a href="#" style={styles.socialLink}><img src="/social/instagram.png" alt="Instagram" style={styles.socialIcon}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2d3748', // Dark gray, similar to gray-800
    color: '#e2e8f0', // Light text color
    padding: '2rem 1rem',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #4a5568', // Darker gray border
  },
  krishiNetSection: {
    gridColumn: 'span 2', // Spans 2 columns on larger screens
  },
  logo: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#68d391', // A green color for the logo
    marginBottom: '1rem',
  },
  description: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    maxWidth: '400px',
  },
  section: {
    marginBottom: '1rem',
    marginTop: '1rem', // Added to shift sections slightly downwards
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#cbd5e0', // Lighter gray for titles
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    color: '#e2e8f0',
    textDecoration: 'none',
    marginBottom: '0.5rem',
    display: 'block',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#68d391', // Green on hover
    },
  },
  contactInfo: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1.5rem',
    flexWrap: 'wrap',
  },
  copyright: {
    fontSize: '0.8rem',
    margin: 0,
  },
  socialLinks: {
    display: 'flex',
    gap: '0.5rem', // Decreased gap
  },
  socialLink: {
    color: '#e2e8f0',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px', // Decreased size
    height: '30px', // Decreased size
    borderRadius: '50%',
    backgroundColor: '#4a5568',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#68d391',
    },
  },
  socialIcon: {
    width: '20px', // Size of the icon image itself
    height: '20px',
  },
};

export default Footer;