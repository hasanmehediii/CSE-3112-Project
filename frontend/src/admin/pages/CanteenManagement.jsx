import React from 'react';
import styled from 'styled-components';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

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

const CanteenList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const CanteenCard = styled(Link)`
  background-color: ${(props) => (props.status === 'Active' ? '#d4edda' : props.status === 'Pending' ? '#fff3cd' : '#f8d7da')}; /* Green, Yellow, Red */
  border: 1px solid ${(props) => (props.status === 'Active' ? '#28a745' : props.status === 'Pending' ? '#ffc107' : '#dc3545')};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Subtle shadow */
  text-align: center;
  text-decoration: none;
  color: #2c3e50; /* Dark blue text */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  p {
    color: #7f8c8d; /* Muted gray for text */
  }
`;

const CanteenName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50; /* Dark blue for name */
`;

const CanteenStatusText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.status === 'Active' ? '#28a745' : props.status === 'Pending' ? '#ffc107' : '#dc3545')};
  margin-top: 0.5rem;
`;

const CanteenManagement = () => {
  const canteens = [
    { id: 'tong', name: 'Tong', status: 'Active' },
    { id: 'math-canteen', name: 'Math Canteen', status: 'Pending' },
    { id: 'kolavobon', name: 'Kolavobon', status: 'Inactive' },
  ];

  return (
    <PageContainer>
      <AdminNavbar />
      <ContentWrapper>
        <Title>Canteen Management</Title>
        <CanteenList>
          {canteens.map((canteen) => (
            <CanteenCard key={canteen.id} to={`/admin/canteen/${canteen.id}`} status={canteen.status}>
              <CanteenName>{canteen.name}</CanteenName>
              <CanteenStatusText status={canteen.status}>Status: {canteen.status}</CanteenStatusText>
              <p>View Details & Menu</p>
            </CanteenCard>
          ))}
        </CanteenList>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default CanteenManagement;
