import React from 'react';

const Purchases = () => {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#1f2937' }}>
        Purchase History
      </h1>
      
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
      }}>
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <input 
            type="date"
            style={{
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          <input 
            type="date"
            style={{
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          <button style={{
            background: '#16a34a',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Filter
          </button>
        </div>
        
        <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
          No purchase records available. Start selling to see transactions here.
        </p>
      </div>
    </div>
  );
};

export default Purchases;
