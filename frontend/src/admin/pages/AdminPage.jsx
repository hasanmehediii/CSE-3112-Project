import React from 'react';
import styled from 'styled-components';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f7f6; /* Light, professional background */
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50; /* Dark blue for professionalism */
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: none;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const MetricBox = styled.div`
  background-color: #ffffff; /* Default white background */
  color: #2c3e50; /* Dark blue text */
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Subtle shadow */
  text-align: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  &:nth-child(1) {
    background-color: #e6f7ff; /* Light Blue */
    border: 1px solid #91d5ff;
  }
  &:nth-child(2) {
    background-color: #f6ffed; /* Light Green */
    border: 1px solid #b7eb8f;
  }
  &:nth-child(3) {
    background-color: #fff1f0; /* Light Red */
    border: 1px solid #ffa39e;
  }
  &:nth-child(4) {
    background-color: #fffbe6; /* Light Yellow */
    border: 1px solid #ffe58f;
  }
`;

const MetricTitle = styled.h3`
  color: #7f8c8d; /* Muted gray for title */
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const MetricValue = styled.p`
  color: #2c3e50; /* Dark blue for value */
  font-size: 2.5rem;
  font-weight: bold;
`;

const AdminPage = () => {
  // Placeholder data
  const totalUsers = 1234;
  const totalOrders = 567;
  const openComplains = 12;
  const revenue = 12345.67;

  return (
    <PageContainer>
      <AdminNavbar />
      <ContentWrapper>
        <Title>Admin Dashboard</Title>
        <DashboardGrid>
          <MetricBox>
            <MetricTitle>Total Users</MetricTitle>
            <MetricValue>{totalUsers}</MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricTitle>Total Orders</MetricTitle>
            <MetricValue>{totalOrders}</MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricTitle>Open Complains</MetricTitle>
            <MetricValue>{openComplains}</MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricTitle>Revenue</MetricTitle>
            <MetricValue>${revenue.toFixed(2)}</MetricValue>
          </MetricBox>
        </DashboardGrid>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default AdminPage;
