import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #718096;
  margin-bottom: 3rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const CardData = styled.p`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1a202c;
`;

const AdminDashboard = () => {
  return (
    <DashboardContainer>
      <Title>Admin Dashboard</Title>
      <Subtitle>Welcome back, Admin! Here's a summary of the platform.</Subtitle>

      <CardGrid>
        <Card>
          <CardTitle>Total Users</CardTitle>
          <CardData>1,234</CardData>
        </Card>
        <Card>
          <CardTitle>Total Orders</CardTitle>
          <CardData>5,678</CardData>
        </Card>
        <Card>
          <CardTitle>Open Complains</CardTitle>
          <CardData>23</CardData>
        </Card>
        <Card>
          <CardTitle>Revenue</CardTitle>
          <CardData>$12,345</CardData>
        </Card>
      </CardGrid>
    </DashboardContainer>
  );
};

export default AdminDashboard;
