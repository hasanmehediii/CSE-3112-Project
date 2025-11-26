import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [canteen, setCanteen] = useState({
    name: '',
    contact: '',
    description: '',
    open_hours: {
      start: '',
      end: '',
    },
  });
  const [canteenId, setCanteenId] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState(null); // New state for owner info

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setOwnerInfo(user); // Set owner information
      if (user.canteen_id) {
        setCanteenId(user.canteen_id);
        axios.get(`http://localhost:8000/canteens/${user.canteen_id}`)
          .then(response => {
            setCanteen(response.data);
          })
          .catch(error => {
            console.error('Error fetching canteen data:', error);
          });
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'start' || name === 'end') {
      setCanteen(prevCanteen => ({
        ...prevCanteen,
        open_hours: {
          ...prevCanteen.open_hours,
          [name]: value,
        },
      }));
    } else {
      setCanteen(prevCanteen => ({
        ...prevCanteen,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = () => {
    axios.patch(`http://localhost:8000/canteens/${canteenId}`, canteen)
      .then(response => {
        alert('Canteen details updated successfully');
      })
      .catch(error => {
        console.error('Error updating canteen data:', error);
        alert('Failed to update canteen details');
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your canteen account? This action cannot be undone.')) {
      axios.delete(`http://localhost:8000/canteens/${canteenId}`)
        .then(response => {
          alert('Canteen account deleted successfully');
          // Log out and redirect
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/';
        })
        .catch(error => {
          console.error('Error deleting canteen account:', error);
          alert('Failed to delete canteen account');
        });
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#1f2937' }}>
        Canteen Settings
      </h1>
      
      <div style={{
        background: '#fff',
        padding: '2.5rem',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        maxWidth: '700px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1f2937' }}>
            Owner Information
        </h2>
        {ownerInfo && (
            <>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                        Owner Name
                    </label>
                    <input 
                        type="text" 
                        value={ownerInfo.name} 
                        readOnly
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            backgroundColor: '#f9fafb'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                        Owner Email
                    </label>
                    <input 
                        type="email" 
                        value={ownerInfo.email} 
                        readOnly
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            backgroundColor: '#f9fafb'
                        }}
                    />
                </div>
            </>
        )}
      </div>

      <div style={{
        background: '#fff',
        padding: '2.5rem',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        maxWidth: '700px'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1f2937' }}>
            Canteen Information
        </h2>
        {canteenId && (
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                    Canteen ID
                </label>
                <input 
                    type="text" 
                    value={canteenId} 
                    readOnly
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        backgroundColor: '#f9fafb'
                    }}
                />
            </div>
        )}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
            Canteen Name
          </label>
          <input 
            type="text"
            name="name"
            value={canteen.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
            Contact Number
          </label>
          <input 
            type="tel"
            name="contact"
            value={canteen.contact}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
            Opening Time
          </label>
          <input 
            type="time"
            name="start"
            value={canteen.open_hours.start}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
            Closing Time
          </label>
          <input 
            type="time"
            name="end"
            value={canteen.open_hours.end}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
            About Canteen
          </label>
          <textarea 
            rows="4"
            name="description"
            value={canteen.description}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <button onClick={handleSaveChanges} style={{
          background: '#16a34a',
          color: '#fff',
          padding: '1rem 2rem',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          width: '100%',
          transition: 'background 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = '#15803d'}
        onMouseLeave={(e) => e.target.style.background = '#16a34a'}
        >
          Save Changes
        </button>

        <button onClick={handleDelete} style={{
          background: '#dc2626',
          color: '#fff',
          padding: '1rem 2rem',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          width: '100%',
          marginTop: '1rem',
          transition: 'background 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = '#b91c1c'}
        onMouseLeave={(e) => e.target.style.background = '#dc2626'}
        >
          Delete Canteen Account
        </button>
      </div>
    </div>
  );
};

export default Settings;