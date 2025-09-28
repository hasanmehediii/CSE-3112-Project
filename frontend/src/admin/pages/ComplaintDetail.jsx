import React, { useState } from 'react';
import styled from 'styled-components';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';

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

const ComplaintCard = styled.div`
  background-color: #ffffff; /* Clean white background */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Subtle shadow */
  margin-bottom: 2rem;
`;

const DetailItem = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #555;

  strong {
    color: #2c3e50;
  }
`;

const ReplySection = styled.div`
  background-color: #ffffff; /* Clean white background */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Subtle shadow */
  margin-top: 2rem;
`;

const ReplyTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  &:focus {
    border-color: #2c3e50;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  background-color: ${(props) => (props.isGreen ? '#28a745' : '#dc3545')}; /* Green or Red */
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const ComplaintDetail = () => {
  const { complaintId } = useParams();
  const [replyText, setReplyText] = useState('');
  const [isReplied, setIsReplied] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  // Placeholder data for complaints
  const complaintsData = {
    '1': {
      date: '2025-09-25',
      complaint: 'The food in Tong canteen was cold and unappetizing.',
      reply: '',
      resolved: false,
    },
    '2': {
      date: '2025-09-26',
      complaint: 'Math Canteen ran out of biryani very early today.',
      reply: 'We apologize for the inconvenience. We will ensure better stock management.',
      resolved: true,
    },
    '3': {
      date: '2025-09-27',
              complaint: 'Kolavobon canteen\'s prices seem to have increased without notice.',      reply: '',
      resolved: false,
    },
  };

  const currentComplaint = complaintsData[complaintId];

  if (!currentComplaint) {
    return (
      <PageContainer>
        <AdminNavbar />
        <ContentWrapper>
          <Title>Complaint Not Found</Title>
          <p style={{ textAlign: 'center' }}>The complaint you are looking for does not exist.</p>
        </ContentWrapper>
        <Footer />
      </PageContainer>
    );
  }

  // Initialize state based on current complaint data
  useState(() => {
    if (currentComplaint.reply) {
      setReplyText(currentComplaint.reply);
      setIsReplied(true);
    }
    setIsResolved(currentComplaint.resolved);
  }, [complaintId]);

  const handleSendReply = () => {
    // In a real application, you would send this reply to the backend
    console.log(`Replying to complaint ${complaintId}: ${replyText}`);
    setIsReplied(true);
    // Optionally, update the backend with the reply
  };

  const handleMarkAsResolved = () => {
    // In a real application, you would update the backend to mark as resolved
    console.log(`Complaint ${complaintId} marked as resolved.`);
    setIsResolved(true);
    // Optionally, update the backend with the resolved status
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <ContentWrapper>
        <Title>Complaint Details</Title>
        <ComplaintCard>
          <DetailItem><strong>Date:</strong> {currentComplaint.date}</DetailItem>
          <DetailItem><strong>Complaint:</strong> {currentComplaint.complaint}</DetailItem>
          {currentComplaint.reply && <DetailItem><strong>Previous Reply:</strong> {currentComplaint.reply}</DetailItem>}
        </ComplaintCard>

        <ReplySection>
          <ReplyTitle>Reply to Complaint</ReplyTitle>
          <Textarea
            placeholder="Type your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <ButtonContainer>
            <Button onClick={handleSendReply} isGreen={isReplied}>
              {isReplied ? 'Reply Sent' : 'Send Reply'}
            </Button>
            <Button onClick={handleMarkAsResolved} isGreen={isResolved}>
              {isResolved ? 'Resolved' : 'Mark as Resolved'}
            </Button>
          </ButtonContainer>
        </ReplySection>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default ComplaintDetail;
