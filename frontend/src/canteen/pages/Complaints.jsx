import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [canteenId, setCanteenId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.canteen_id) {
      setCanteenId(user.canteen_id);
      axios.get(`http://localhost:8000/feedback/canteen/${user.canteen_id}`)
        .then(response => {
          setComplaints(response.data);
        })
        .catch(error => {
          console.error('Error fetching complaints:', error);
        });
    }
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#1f2937' }}>
        Student Complaints
      </h1>
      
      <div style={{
        display: 'grid',
        gap: '1.5rem'
      }}>
        {complaints.map(complaint => (
          <div key={complaint.id} style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            borderLeft: `5px solid ${complaint.rating > 3 ? '#16a34a' : '#dc2626'}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {complaint.student_id}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{new Date(complaint.created_at).toLocaleDateString()}</p>
              </div>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
              }}>
                Rating: {complaint.rating}
              </span>
            </div>
            <p style={{ color: '#4b5563', marginBottom: '1rem' }}>{complaint.comment}</p>
            <button style={{
              background: '#16a34a',
              color: '#fff',
              padding: '0.5rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              Respond
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
