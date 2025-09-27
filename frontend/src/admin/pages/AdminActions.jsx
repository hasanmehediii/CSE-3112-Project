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

const CanteenTable = styled.table`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 0.5rem;
`;

const ApproveButton = styled(Button)`
  background-color: #48bb78;
  color: white;
  &:hover { background-color: #38a169; }
`;

const RejectButton = styled(Button)`
  background-color: #f56565;
  color: white;
  &:hover { background-color: #e53e3e; }
`;

const RemoveButton = styled(Button)`
  background-color: #e53e3e;
  color: white;
  &:hover { background-color: #c53030; }
`;

const UpdateButton = styled(Button)`
  background-color: #4299e1;
  color: white;
  &:hover { background-color: #3182ce; }
`;

const Status = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-weight: 600;
  color: white;
  background-color: ${({ status }) => {
    if (status === 'Approved') return '#48bb78';
    if (status === 'Pending') return '#ecc94b';
    if (status === 'Rejected') return '#f56565';
    return '#a0aec0';
  }};
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const initialCanteens = [
  { id: 1, name: 'Main Canteen', status: 'Approved' },
  { id: 2, name: 'New Snack Bar', status: 'Pending' },
  { id: 3, name: 'Old Cafe', status: 'Rejected' },
  { id: 4, name: 'Test Canteen', status: 'Approved' },
];

const AdminActions = () => {
  const [canteens, setCanteens] = useState(initialCanteens);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCanteen, setEditingCanteen] = useState(null);
  const [newName, setNewName] = useState('');

  const handleApprove = (id) => {
    setCanteens(canteens.map(c => c.id === id ? { ...c, status: 'Approved' } : c));
  };

  const handleReject = (id) => {
    setCanteens(canteens.map(c => c.id === id ? { ...c, status: 'Rejected' } : c));
  };

  const handleRemove = (id) => {
    setCanteens(canteens.filter(c => c.id !== id));
  };

  const openUpdateModal = (canteen) => {
    setEditingCanteen(canteen);
    setNewName(canteen.name);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    setCanteens(canteens.map(c => c.id === editingCanteen.id ? { ...c, name: newName } : c));
    setIsModalOpen(false);
    setEditingCanteen(null);
  };

  return (
    <Container>
      <Title>Canteen Management</Title>
      <CanteenTable>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {canteens.map(canteen => (
            <tr key={canteen.id}>
              <Td>{canteen.name}</Td>
              <Td><Status status={canteen.status}>{canteen.status}</Status></Td>
              <Td>
                {canteen.status === 'Pending' && (
                  <>
                    <ApproveButton onClick={() => handleApprove(canteen.id)}>Approve</ApproveButton>
                    <RejectButton onClick={() => handleReject(canteen.id)}>Reject</RejectButton>
                  </>
                )}
                {canteen.status === 'Approved' && (
                  <RemoveButton onClick={() => handleRemove(canteen.id)}>Remove</RemoveButton>
                )}
                <UpdateButton onClick={() => openUpdateModal(canteen)}>Update</UpdateButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </CanteenTable>

      {isModalOpen && (
        <ModalBackdrop>
          <ModalContent>
            <h2>Edit Canteen Name</h2>
            <Input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
            />
            <Button onClick={handleUpdate}>Save</Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalContent>
        </ModalBackdrop>
      )}
    </Container>
  );
};

export default AdminActions;
