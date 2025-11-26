import React, { useState } from 'react';
import axios from 'axios';
import MealModal from '../components/MealModal'; // Assuming MealModal is in components folder

const UploadMenu = () => {
    const [menuTitle, setMenuTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dailyMeals, setDailyMeals] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');

    const handleAddMeal = (day, meal) => {
        setDailyMeals(prev => ({
            ...prev,
            [day]: [...prev[day], meal]
        }));
    };

    const openModal = (day) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const canteenId = user?.canteen_id;

        if (!canteenId) {
            console.error("Canteen ID not found");
            return;
        }

        const newMenu = {
            canteen_id: canteenId,
            title: menuTitle,
            description,
            start_date: startDate,
            end_date: endDate,
            meals: Object.entries(dailyMeals).map(([day, items]) => ({ day, items: items.map(item => ({ meal_id: item._id, name: item.name, price: item.price, image_url: item.image_url })) }))
        };

        try {
            await axios.post('http://localhost:8000/menu', newMenu);
            alert('Menu uploaded successfully!');
            // Clear form
            setMenuTitle('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setDailyMeals({ Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] });
        } catch (error) {
            console.error("Error uploading menu:", error);
            alert('Failed to upload menu.');
        }
    };

    return (
        <div>
            {isModalOpen && <MealModal day={selectedDay} onAddMeal={handleAddMeal} onClose={() => setIsModalOpen(false)} />}
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#1f2937' }}>
                Create Weekly Menu
            </h1>

            <form onSubmit={handleSubmit} style={{
                background: '#fff',
                padding: '2.5rem',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                maxWidth: '800px'
            }}>
                {/* ... form fields for menu details ... */}

                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', color: '#1f2937' }}>Daily Meals</h2>
                    {Object.keys(dailyMeals).map(day => (
                        <div key={day} style={{ marginTop: '1rem' }}>
                            <h3 style={{ fontWeight: '600' }}>{day}</h3>
                            {dailyMeals[day].map((meal, index) => (
                                <div key={index}>{meal.name} - ₹{meal.price}</div>
                            ))}
                            <button type="button" onClick={() => openModal(day)}>Add Meal for {day}</button>
                        </div>
                    ))}
                </div>

                <button type="submit" style={{
                    background: '#16a34a',
                    color: '#fff',
                    padding: '1rem 2rem',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '1.5rem'
                }}>
                    Create Menu
                </button>
            </form>
        </div>
    );
};

export default UploadMenu;
