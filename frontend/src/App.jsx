import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
