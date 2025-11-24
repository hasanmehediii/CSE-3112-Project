import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const SignUpContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/eating-person.jpg');
  background-size: cover;
  background-position: center;
  padding: 6rem 3rem;
`;

const SignUpCard = styled.div`
  background: rgba(255, 153, 0, 0.2);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #00b51bff;
  font-size: 2rem;
  font-weight: 700;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  color: #ffea00ff;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus { border-color: #16a34a; outline: none; }
`;

const Button = styled.button`
  background-color: #16a34a;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 1rem;

  &:hover { background-color: #15803d; }
`;

const LoginText = styled.p`
  margin-top: 1.5rem;
  color: #80ff00ff;
`;

const LoginLink = styled(Link)`
  color: #16a34a;
  font-weight: 600;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const CanteenOwnerSignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      name: username,
      email,
      password,
      profile_image: profileImage,
    };

    try {
      const response = await fetch('http://localhost:8000/auth/owner/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong');
      }

      navigate('/canteen/login');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <SignUpContainer>
        <SignUpCard>
          <Title>Canteen Owner Sign Up</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Username</Label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
            </InputGroup>

            <InputGroup>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </InputGroup>

            <InputGroup>
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </InputGroup>

            <InputGroup>
              <Label>Profile Image URL</Label>
              <Input type="text" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
            </InputGroup>

            <Button type="submit">Sign Up</Button>
          </form>

          <LoginText>
            Already have an account? <LoginLink to="/login">Login</LoginLink>
          </LoginText>
        </SignUpCard>
      </SignUpContainer>
      <Footer />
    </PageContainer>
  );
};

export default CanteenOwnerSignUp;