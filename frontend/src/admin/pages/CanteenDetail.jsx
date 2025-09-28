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

const CanteenDetailsCard = styled.div`
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

const MenuSection = styled.div`
  background-color: #ffffff; /* Clean white background */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Subtle shadow */
  margin-top: 2rem;
`;

const MenuTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const FoodName = styled.span`
  font-weight: 600;
  color: #333;
`;

const FoodPrice = styled.span`
  color: #16a34a; /* Green for price */
  font-weight: 600;
`;

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const DateInput = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  cursor: pointer;
  background-color: #ffffff;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  &:focus {
    border-color: #2c3e50;
    outline: none;
  }
`;

const CanteenDetail = () => {
  const { canteenId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Helper to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Placeholder data for canteens and menus per date
  const canteensData = {
    'tong': {
      name: 'Tong',
      owner: 'Mr. Rahman',
      phone: '0123456789',
      menus: {
        [formatDate(new Date(2025, 8, 26))]: [ // September 26, 2025 (example past date)
          { id: 1, name: 'Chicken Biryani', price: 180 },
          { id: 2, name: 'Salad', price: 40 },
        ],
        [formatDate(new Date(2025, 8, 27))]: [ // September 27, 2025 (example past date)
          { id: 1, name: 'Vegetable Curry', price: 100 },
          { id: 2, name: 'Roti', price: 20 },
        ],
        [formatDate(new Date())]: [ // Current day
          { id: 1, name: 'Chicken Curry', price: 120 },
          { id: 2, name: 'Rice', price: 30 },
          { id: 3, name: 'Dal', price: 40 },
        ],
      },
    },
    'math-canteen': {
      name: 'Math Canteen',
      owner: 'Ms. Akter',
      phone: '0987654321',
      menus: {
        [formatDate(new Date(2025, 8, 26))]: [ // September 26, 2025 (example past date)
          { id: 1, name: 'Fish Fry', price: 130 },
          { id: 2, name: 'Khichuri', price: 90 },
        ],
        [formatDate(new Date())]: [ // Current day
          { id: 1, name: 'Beef Bhuna', price: 150 },
          { id: 2, name: 'Roti', price: 15 },
          { id: 3, name: 'Vegetable', price: 50 },
        ],
      },
    },
    'kolavobon': {
      name: 'Kolavobon',
      owner: 'Mr. Islam',
      phone: '0112233445',
      menus: {
        [formatDate(new Date(2025, 8, 27))]: [ // September 27, 2025 (example past date)
          { id: 1, name: 'Egg Curry', price: 80 },
          { id: 2, name: 'Paratha', price: 25 },
        ],
        [formatDate(new Date())]: [ // Current day
          { id: 1, name: 'Fish Fry', price: 100 },
          { id: 2, name: 'Khichuri', price: 80 },
          { id: 3, name: 'Egg Curry', price: 70 },
        ],
      },
    },
  };

  const currentCanteen = canteensData[canteenId];

  if (!currentCanteen) {
    return (
      <PageContainer>
        <AdminNavbar />
        <ContentWrapper>
          <Title>Canteen Not Found</Title>
          <p style={{ textAlign: 'center' }}>The canteen you are looking for does not exist.</p>
        </ContentWrapper>
        <Footer />
      </PageContainer>
    );
  }

  const displayDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const menuForSelectedDate = currentCanteen.menus[formatDate(selectedDate)] || [];

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <ContentWrapper>
        <Title>{currentCanteen.name} Details</Title>
        <CanteenDetailsCard>
          <DetailItem><strong>Owner:</strong> {currentCanteen.owner}</DetailItem>
          <DetailItem><strong>Phone:</strong> {currentCanteen.phone}</DetailItem>
        </CanteenDetailsCard>

        <DatePickerContainer>
          <DateInput
            type="date"
            value={formatDate(selectedDate)}
            onChange={handleDateChange}
          />
        </DatePickerContainer>

        <MenuSection>
          <MenuTitle>Food Menu for {displayDate}</MenuTitle>
          {
            menuForSelectedDate.length > 0 ? (
              menuForSelectedDate.map((item) => (
                <MenuItem key={item.id}>
                  <FoodName>{item.name}</FoodName>
                  <FoodPrice>${item.price.toFixed(2)}</FoodPrice>
                </MenuItem>
              ))
            ) : (
              <p style={{ textAlign: 'center' }}>No menu available for this date.</p>
            )
          }
        </MenuSection>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default CanteenDetail;
