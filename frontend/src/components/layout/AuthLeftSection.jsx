
import React from 'react';

const AuthLeftSection = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f0f8f0', // Light green background
      color: '#333',
      textAlign: 'center',
      flex: '1', // Take up available space
      minHeight: '100vh', // Full height
      boxSizing: 'border-box'
    }}>
      <div style={{ marginBottom: '30px' }}>
        {/* Company Logo */}
        <h1 style={{
          fontSize: '3em',
          fontWeight: 'bold',
          color: '#228B22', // Forest Green
          margin: '0'
        }}>
          KrishiNet
        </h1>
        {/* You can replace this with an actual icon if an icon library is available */}
        {/* <img src="/path/to/leaf-icon.png" alt="Leaf Icon" style={{ width: '80px', height: '80px', marginBottom: '10px' }} /> */}
      </div>

      {/* Short Description */}
      <p style={{
        fontSize: '1.1em',
        lineHeight: '1.6',
        maxWidth: '600px',
        marginBottom: '40px'
      }}>
        KrishiNet is your comprehensive digital platform dedicated to empowering farmers with cutting-edge technology and essential resources. From real-time market insights to personalized crop management advice, we connect the agricultural community to foster growth, sustainability, and prosperity. Join us in cultivating a smarter future for farming.
      </p>

      {/* Social Media Links */}
      <div style={{
        display: 'flex',
        gap: '20px',
        fontSize: '2em'
      }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3b5998', textDecoration: 'none' }}>
          {/* Facebook Icon (Unicode) */}
          &#x1F4F1; {/* Placeholder for a phone/social media icon */}
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00acee', textDecoration: 'none' }}>
          {/* Twitter Icon (Unicode) */}
          &#x1F426; {/* Placeholder for a bird/social media icon */}
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#C13584', textDecoration: 'none' }}>
          {/* Instagram Icon (Unicode) */}
          &#x1F4F7; {/* Placeholder for a camera/social media icon */}
        </a>
      </div>
    </div>
  );
};

export default AuthLeftSection;
