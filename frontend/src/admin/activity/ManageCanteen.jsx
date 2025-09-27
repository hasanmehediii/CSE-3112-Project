import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
`;

const CanteenList = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1rem;
`;

const CanteenItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2d3748;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #edf2f7;
  }

  &.active {
    background-color: #48bb78;
    color: white;
  }
`;

const CanteenDetails = styled.div`
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

const MenuTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MenuItem = styled.li`
  background-color: #f7fafc;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #2d3748;
`;

const DatePickerWrapper = styled.div`
    margin-bottom: 1rem;
    .react-datepicker-wrapper {
        width: 100%;
    }
    .react-datepicker__input-container input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        font-size: 1rem;
    }
`;

const canteensData = [
  {
    id: 1,
    name: 'Tong',
    owner: 'Mr. Tong',
    phone: '123-456-7890',
    menu: {
      '2025-09-28': ['Biriyani', 'Tehari', 'Khichuri'],
      '2025-09-29': ['Chicken Curry', 'Fish Fry', 'Vegetable Mix'],
    },
  },
  {
    id: 2,
    name: 'Cafe 2',
    owner: 'Mrs. Smith',
    phone: '098-765-4321',
    menu: {
      '2025-09-28': ['Pasta', 'Pizza', 'Salad'],
      '2025-09-29': ['Burger', 'Fries', 'Sandwich'],
    },
  },
  {
    id: 3,
    name: 'Snack Bar',
    owner: 'Mr. Bean',
    phone: '555-555-5555',
    menu: {
      '2025-09-28': ['Samosa', 'Singara', 'Chotpoti'],
      '2025-09-29': ['Puri', 'Dal', 'Halim'],
    },
  },
];

const ManageCanteen = () => {
  const [selectedCanteen, setSelectedCanteen] = useState(canteensData[0]);
  const [selectedDate, setSelectedDate] = useState(new Date('2025-09-28'));

  const handleCanteenClick = (canteen) => {
    setSelectedCanteen(canteen);
  };

  const getMenuForDate = (canteen, date) => {
    const dateString = date.toISOString().split('T')[0];
    return canteen.menu[dateString] || ['No menu available for this date.'];
  };

  return (
    <Container>
      <Title>Manage Canteens</Title>
      <MainLayout>
        <CanteenList>
          {canteensData.map((canteen) => (
            <CanteenItem
              key={canteen.id}
              className={selectedCanteen && selectedCanteen.id === canteen.id ? 'active' : ''}
              onClick={() => handleCanteenClick(canteen)}
            >
              {canteen.name}
            </CanteenItem>
          ))}
        </CanteenList>
        <CanteenDetails>
          {selectedCanteen ? (
            <>
              <DetailTitle>{selectedCanteen.name}</DetailTitle>
              <Info><strong>Owner:</strong> {selectedCanteen.owner}</Info>
              <Info><strong>Phone:</strong> {selectedCanteen.phone}</Info>
              <MenuTitle>Menu for {selectedDate.toLocaleDateString()}</MenuTitle>
              <DatePickerWrapper>
                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
              </DatePickerWrapper>
              <Menu>
                {getMenuForDate(selectedCanteen, selectedDate).map((item, index) => (
                  <MenuItem key={index}>{item}</MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <p>Select a canteen to see details.</p>
          )}
        </CanteenDetails>
      </MainLayout>
    </Container>
  );
};

export default ManageCanteen;