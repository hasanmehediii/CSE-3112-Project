import React from 'react';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

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

const ContactContent = styled.div`
  max-width: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  grid-column: 1 / -1; /* Span across both columns */
  text-align: center;
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;

  svg {
    margin-right: 1rem;
    font-size: 1.5rem;
    color: #16a34a;
  }
`;

const FormContainer = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  resize: vertical;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background-color: #16a34a;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #15803d;
  }
`;

const Contact = () => {
  return (
    <PageContainer>
      <Navbar />
      <ContentWrapper>
        <ContactContent>
          <Title>Get in Touch</Title>
          <ContactInfo>
            <h2>Contact Information</h2>
            <p>
              Have a question or need help with your nutrition goals? We're here for you. Reach out to us through any of the channels below.
            </p>
            <InfoItem>
              <FaMapMarkerAlt />
              <span>123 Nutrition Street, Healthy City, 12345</span>
            </InfoItem>
            <InfoItem>
              <FaPhone />
              <span>(123) 456-7890</span>
            </InfoItem>
            <InfoItem>
              <FaEnvelope />
              <span>support@khaikhai.com</span>
            </InfoItem>
          </ContactInfo>
          <FormContainer>
            <h2>Send a Message</h2>
            <Form>
              <Input type="text" placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Textarea placeholder="Your Message" rows="6"></Textarea>
              <Button type="submit">Send Message</Button>
            </Form>
          </FormContainer>
        </ContactContent>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default Contact;