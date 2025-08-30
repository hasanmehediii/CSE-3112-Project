
import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navbar />
      <div style={styles.hero}>
        <div style={styles.overlay}>
          <div style={styles.loginCard}>
            <h2 style={styles.title}>Login</h2>
            <form>
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>Email or Mobile</label>
                <input type="text" id="email" style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} id="password" style={styles.input} />
                  <span onClick={togglePasswordVisibility} style={styles.eyeIcon}>
                    {showPassword ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>
              <div style={styles.options}>
                <Link to="/forget-password" style={styles.link}>Forget Password?</Link>
              </div>
              <button type="submit" style={styles.button}>Login</button>
              <div style={styles.signup}>
                <p>Don't have an account? <Link to="/signup" style={{...styles.link, ...styles.signupLink}}>Sign up</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  hero: {
    backgroundImage: `url('/Home3.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '2rem',
    borderRadius: '10px',
    backdropFilter: 'blur(5px)',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '1.5rem',
    fontSize: '2rem',
  },
  inputGroup: {
    marginBottom: '1.5rem',
    position: 'relative',
  },
  label: {
    display: 'block',
    color: '#fff',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  eyeIcon: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
  options: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  signup: {
    marginTop: '1.5rem',
    textAlign: 'center',
    color: '#fff',
  },
  signupLink: {
    backgroundColor: '#4CAF50',
    padding: '10px 15px',
    borderRadius: '5px',
  }
};

export default Login;
