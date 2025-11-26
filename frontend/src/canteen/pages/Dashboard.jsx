import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, MessageSquare, IndianRupee } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState([
        { title: 'Total Orders', value: '0', color: '#16a34a', icon: ShoppingCart },
        { title: 'Menu Items', value: '0', color: '#2563eb', icon: Package },
        { title: 'Pending Complaints', value: '0', color: '#dc2626', icon: MessageSquare },
        { title: 'Today\'s Revenue', value: '₹0', color: '#f59e0b', icon: IndianRupee }
    ]);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Get canteen_id from localStorage
                const user = JSON.parse(localStorage.getItem('user'));
                const canteenId = user?.canteen_id;

                if (!canteenId) {
                    console.error("Canteen ID not found in local storage.");
                    return;
                }

                // Fetch stats
                const [orderStatsRes, menuItemsRes, pendingComplaintsRes] = await Promise.all([
                    axios.get(`http://localhost:8000/api/orders/stats/${canteenId}`),
                    axios.get(`http://localhost:8000/api/menus/${canteenId}`),
                    axios.get(`http://localhost:8000/api/feedback/pending/${canteenId}`)
                ]);

                const newStats = [
                    { ...stats[0], value: orderStatsRes.data.total_orders },
                    { ...stats[1], value: menuItemsRes.data.length },
                    { ...stats[2], value: pendingComplaintsRes.data.pending_complaints },
                    { ...stats[3], value: `₹${orderStatsRes.data.todays_revenue}` }
                ];
                setStats(newStats);

                // Fetch recent activity (e.g., last 5 orders)
                const recentOrdersRes = await axios.get(`http://localhost:8000/api/orders?canteen_id=${canteenId}&limit=5`);
                setRecentActivity(recentOrdersRes.data);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#1f2937' }}>
                Dashboard Overview
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} style={{
                            background: '#fff',
                            padding: '2rem',
                            borderRadius: '15px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                            borderLeft: `5px solid ${stat.color}`,
                            transition: 'transform 0.3s ease'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                        {stat.title}
                                    </p>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: stat.color, margin: 0 }}>
                                        {stat.value}
                                    </h2>
                                </div>
                                <Icon size={40} color={stat.color} style={{ opacity: 0.3 }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{
                background: '#fff',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    Recent Activity
                </h2>
                {recentActivity.length > 0 ? (
                    <ul>
                        {recentActivity.map(activity => (
                            <li key={activity._id} style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                                Order #{activity._id} for ₹{activity.total_price} was placed.
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: '#6b7280' }}>No recent activity to display.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;