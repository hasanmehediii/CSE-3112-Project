import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background-color: #f0f4f8;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 2rem;
  text-align: center;
`;

const ComplaintGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ComplaintBox = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  &.active {
    border: 2px solid #48bb78;
  }
`;

const ComplaintDetails = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
`;

const DetailTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const Info = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: #48bb78;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #38a169;
  }
`;

const ResolveButton = styled(Button)`
  background-color: ${({ resolved }) => (resolved ? '#48bb78' : '#e53e3e')};

  &:hover {
    background-color: ${({ resolved }) => (resolved ? '#38a169' : '#c53030')};
  }
`;

const initialComplaints = [
  {
    id: 1,
    name: 'John Doe',
    complaint: 'The biriyani was too spicy.',
    date: '2025-09-27',
    status: 'Open',
    reply: ''
  },
  {
    id: 2,
    name: 'Jane Smith',
    complaint: 'The pizza was cold.',
    date: '2025-09-26',
    status: 'Resolved',
    reply: 'We are sorry for the inconvenience. We have refunded your money.'
  },
];

const AdminComplains = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
    setReplyText('');
    setReplySent(false);
  };

  const handleSendReply = () => {
    if (!replyText) return;

    const updatedComplaints = complaints.map(c => 
      c.id === selectedComplaint.id ? { ...c, reply: replyText, status: 'Resolved' } : c
    );
    setComplaints(updatedComplaints);
    setSelectedComplaint({ ...selectedComplaint, reply: replyText, status: 'Resolved' });
    setReplySent(true);
    setReplyText('');
  };

  const handleResolveClick = () => {
    const updatedComplaints = complaints.map(c => 
      c.id === selectedComplaint.id ? { ...c, status: c.status === 'Open' ? 'Resolved' : 'Open' } : c
    );
    setComplaints(updatedComplaints);
    setSelectedComplaint({ ...selectedComplaint, status: selectedComplaint.status === 'Open' ? 'Resolved' : 'Open' });
  };

  return (
    <Container>
      <Title>Manage Complains</Title>
      <ComplaintGrid>
        {complaints.map((complaint, index) => (
          <ComplaintBox
            key={complaint.id}
            className={selectedComplaint && selectedComplaint.id === complaint.id ? 'active' : ''}
            onClick={() => handleComplaintClick(complaint)}
          >
            <h3>Complaint #{index + 1}</h3>
            <p>{complaint.status}</p>
          </ComplaintBox>
        ))}
      </ComplaintGrid>

      {selectedComplaint && (
        <ComplaintDetails>
            <DetailTitle>Complaint from {selectedComplaint.name}</DetailTitle>
            <Info><strong>Date:</strong> {selectedComplaint.date}</Info>
            <Info><strong>Status:</strong> {selectedComplaint.status}</Info>
            <Info><strong>Complaint:</strong> {selectedComplaint.complaint}</Info>
            {selectedComplaint.reply && <Info><strong>Reply:</strong> {selectedComplaint.reply}</Info>}
            <Textarea 
              placeholder="Write your reply here..." 
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <Button onClick={handleSendReply}>Send Reply</Button>
            <ResolveButton 
              resolved={selectedComplaint.status === 'Resolved'} 
              onClick={handleResolveClick}
            >
              {selectedComplaint.status === 'Resolved' ? 'Mark as Open' : 'Mark as Resolved'}
            </ResolveButton>
            {replySent && <p>Reply sent!</p>}
        </ComplaintDetails>
      )}
    </Container>
  );
};

export default AdminComplains;