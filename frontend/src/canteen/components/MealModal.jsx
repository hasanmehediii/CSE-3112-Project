import React, { useState } from 'react';
import axios from 'axios';

const MealModal = ({ day, onAddMeal, onClose }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [dietType, setDietType] = useState('veg');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const canteenId = user?.canteen_id;

        if (!canteenId) {
            console.error("Canteen ID not found");
            return;
        }

        const newMeal = {
            canteen_id: canteenId,
            name,
            price: parseFloat(price),
            image_url: imageUrl,
            category,
            diet_type: dietType,
            is_available: true
        };

        try {
            const response = await axios.post('http://localhost:8000/meals', newMeal);
            onAddMeal(day, response.data.meal);
            onClose();
        } catch (error) {
            console.error("Error creating meal:", error);
            alert('Failed to create meal.');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                background: '#fff',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                width: '400px'
            }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem' }}>Add Meal for {day}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Meal Name" value={name} onChange={(e) => setName(e.target.value)} required 
                           style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '2px solid #e5e7eb' }}/>
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required
                           style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '2px solid #e5e7eb' }}/>
                    <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                           style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '2px solid #e5e7eb' }}/>
                    <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required
                            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '2px solid #e5e7eb' }}/>
                    <select value={dietType} onChange={(e) => setDietType(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '2px solid #e5e7eb' }}>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                        <option value="vegan">Vegan</option>
                    </select>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                        <button type="button" onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: '#e5e7eb', fontWeight: 600 }}>Cancel</button>
                        <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: '#16a34a', color: 'white', fontWeight: 600 }}>Add Meal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MealModal;