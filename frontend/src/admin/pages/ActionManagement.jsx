import React, { useState } from 'react';
import styled from 'styled-components';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f7f6;
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
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CanteenList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const CanteenCard = styled.div` /* Changed from Link to div to allow internal links and buttons */
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  color: #2c3e50;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

const CanteenName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const CanteenStatus = styled.p`
  font-size: 0.9rem;
  color: ${(props) => (props.status === 'Active' ? '#28a745' : props.status === 'Pending' ? '#ffc107' : '#dc3545')};
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
`;

const ActionButton = styled.button`
  padding: 0.6rem 1rem;
  border-radius: 5px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  background-color: ${(props) => (props.approve ? '#28a745' : '#dc3545')}; /* Green for approve, Red for delete */
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const AddCanteenButton = styled.button`
  background-color: #007bff; /* Blue for add */
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  display: block;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: #0056b3;
  }
`;

const ActionManagement = () => {
  const [canteens, setCanteens] = useState([
    { id: 'tong', name: 'Tong', status: 'Active' },
    { id: 'math-canteen', name: 'Math Canteen', status: 'Pending' },
    { id: 'kolavobon', name: 'Kolavobon', status: 'Inactive' },
  ]);

  const handleApprove = (id) => {
    setCanteens(canteens.map(canteen =>
      canteen.id === id ? { ...canteen, status: 'Active' } : canteen
    ));
    console.log(`Canteen ${id} approved.`);
  };

  const handleDelete = (id) => {
    setCanteens(canteens.filter(canteen => canteen.id !== id));
    console.log(`Canteen ${id} deleted.`);
  };

  const handleAddCanteen = () => {
    const newId = `new-canteen-${Date.now()}`;
    const newName = prompt('Enter new canteen name:');
    if (newName) {
      setCanteens([...canteens, { id: newId, name: newName, status: 'Pending' }]);
      console.log(`New canteen ${newName} added.`);
    }
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <ContentWrapper>
        <Title>Action Management</Title>
        <AddCanteenButton onClick={handleAddCanteen}>Add New Canteen</AddCanteenButton>
        <CanteenList>
          {canteens.map((canteen) => (
            <CanteenCard key={canteen.id}>
              <Link to={`/admin/canteen/${canteen.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CanteenName>{canteen.name}</CanteenName>
                <CanteenStatus status={canteen.status}>Status: {canteen.status}</CanteenStatus>
              </Link>
              <ButtonContainer>
                <ActionButton approve onClick={() => handleApprove(canteen.id)}>
                  Approve
                </ActionButton>
                <ActionButton onClick={() => handleDelete(canteen.id)}>
                  Delete
                </ActionButton>
              </ButtonContainer>
            </CanteenCard>
          ))}
        </CanteenList>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default ActionManagement;
