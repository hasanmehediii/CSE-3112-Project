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

const ComplaintList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ComplaintCard = styled(Link)`
  background-color: ${(props) => (props.status === 'resolved' ? '#d4edda' : props.status === 'pending' ? '#fff3cd' : '#f8d7da')}; /* Green, Yellow, Red */
  border: 1px solid ${(props) => (props.status === 'resolved' ? '#28a745' : props.status === 'pending' ? '#ffc107' : '#dc3545')};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Subtle shadow */
  text-align: left;
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

const ComplaintTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50; /* Dark blue for title */
`;

const ComplaintDate = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d; /* Muted gray for date */
`;

const ComplaintStatusText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.status === 'resolved' ? '#28a745' : props.status === 'pending' ? '#ffc107' : '#dc3545')};
  margin-top: 0.5rem;
`;

const ComplaintManagement = () => {
  const complaints = [
    { id: '1', title: 'Complaint 1', date: '2025-09-25', status: 'pending' },
    { id: '2', title: 'Complaint 2', date: '2025-09-26', status: 'resolved' },
    { id: '3', title: 'Complaint 3', date: '2025-09-27', status: 'pending' },
  ];

  return (
    <PageContainer>
      <AdminNavbar />
      <ContentWrapper>
        <Title>Complaint Management</Title>
        <ComplaintList>
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint.id} to={`/admin/complains/${complaint.id}`} status={complaint.status}>
              <ComplaintTitle>{complaint.title}</ComplaintTitle>
              <ComplaintDate>Date: {complaint.date}</ComplaintDate>
              <ComplaintStatusText status={complaint.status}>Status: {complaint.status}</ComplaintStatusText>
            </ComplaintCard>
          ))}
        </ComplaintList>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default ComplaintManagement;
