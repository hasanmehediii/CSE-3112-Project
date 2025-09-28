import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const PageContainer = styled.div`
  min-height: 100vh;
  background-image: url('/eating-person.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  padding-top: 7rem;
  background: rgba(0, 0, 0, 0.6);
`;

const AboutUsContent = styled.div`
  max-width: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const TextContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  font-size: 1.1rem;
  line-height: 1.8;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutUs = () => {
  return (
    <PageContainer>
      <Navbar />
      <ContentWrapper>
        <AboutUsContent>
          <Title>About Khaikhai</Title>
          <TextContainer>
            <p>
              Welcome to Khaikhai, your ultimate companion for a healthier lifestyle. We are dedicated to helping you manage your food and nutrition with ease and precision. Our mission is to empower you to make smarter food choices and achieve your wellness goals through our innovative platform.
            </p>
            <p>
              Founded in 2024, Khaikhai is designed to be a comprehensive tool for tracking meals, planning diets, and discovering new recipes. Our team of nutritionists and developers are committed to providing a user-friendly experience that is both informative and motivating. We believe in building a community that supports each other in the journey towards better health.
            </p>
          </TextContainer>
        </AboutUsContent>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default AboutUs;