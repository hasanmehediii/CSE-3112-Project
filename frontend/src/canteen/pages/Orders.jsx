import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [canteenId, setCanteenId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.canteen_id) {
      setCanteenId(user.canteen_id);
      axios.get(`http://localhost:8000/orders/canteen/${user.canteen_id}`)
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    }
  }, []);

  const handleUpdateStatus = (orderId, status) => {
    axios.put(`http://localhost:8000/orders/${orderId}`, { status })
      .then(response => {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        );
        alert('Order status updated successfully');
      })
      .catch(error => {
        console.error('Error updating order status:', error);
        alert('Failed to update order status');
      });
  };

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#1f2937' }}>
        Manage Orders
      </h1>
      
      <div style={{
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Order ID</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Student ID</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Meal ID</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Total</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Time</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem', color: '#1f2937', fontWeight: '600' }}>{order.id}</td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>{order.student_id}</td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>{order.meal_id}</td>
                <td style={{ padding: '1rem', color: '#16a34a', fontWeight: '600' }}>₹{order.total_price}</td>
                <td style={{ padding: '1rem', color: '#6b7280' }}>{new Date(order.order_date).toLocaleTimeString()}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    background: order.status === 'delivered' ? '#d1fae5' : order.status === 'pending' ? '#fef3c7' : '#dbeafe',
                    color: order.status === 'delivered' ? '#065f46' : order.status === 'pending' ? '#92400e' : '#1e40af'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <select onChange={(e) => handleUpdateStatus(order.id, e.target.value)} value={order.status}>
                    <option value="pending">Pending</option>
                    <option value="prepared">Prepared</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;