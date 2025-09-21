import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #a8ff78 0%, #78ffd6 100%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #16a34a22;
  min-width: 320px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #16a34a;
`;

const FormPage = ({ title, children }) => {
  return (
    <PageContainer>
      <FormContainer>
        <Title>{title}</Title>
        {children}
      </FormContainer>
    </PageContainer>
  );
};

export default FormPage;
