import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

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
  align-items: flex-start;
  padding: 2rem;
  padding-top: 7rem;
  background: rgba(0, 0, 0, 0.6);
`;

const FAQContent = styled.div`
  max-width: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const FAQItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  margin-bottom: 12px;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const Question = styled.div`
  padding: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Answer = styled.div`
  padding: 0 1.2rem 1.2rem 1.2rem;
  font-size: 1rem;
  line-height: 1.6;
`;

const faqs = [
  {
    question: "How do I track my meals?",
    answer: "You can track your meals by searching for food items in our database and adding them to your daily log. You can also create your own custom food items."
  },
  {
    question: "Can I create a custom meal plan?",
    answer: "Yes, you can create a custom meal plan based on your dietary preferences and goals. Our app will provide you with suggestions and help you stay on track."
  },
  {
    question: "How can I see my nutrition summary?",
    answer: "You can view your nutrition summary for the day, week, or month in the dashboard. It will show you a breakdown of your calorie intake, macros, and micros."
  },
  {
    question: "Is my data private?",
    answer: "Yes, your data is private and secure. We do not share your personal information with third parties."
  },
  {
    question: "What kind of recipes can I find?",
    answer: "We have a wide variety of recipes for all kinds of diets, including vegetarian, vegan, gluten-free, and more. You can search for recipes based on ingredients, cuisine, and dietary restrictions."
  },
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. You will be asked to provide your email address, and we will send you a link to reset your password."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentWrapper>
        <FAQContent>
          <Title>Frequently Asked Questions</Title>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <Question onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span>{activeIndex === index ? '−' : '+'}</span>
              </Question>
              {activeIndex === index && (
                <Answer>{faq.answer}</Answer>
              )}
            </FAQItem>
          ))}
        </FAQContent>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default FAQ;
