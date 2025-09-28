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
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #16a34a;
    outline: none;
  }
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

  &:hover {
    background-color: #15803d;
  }
`;

const LoginText = styled.p`
  margin-top: 1.5rem;
  color: #555;
`;

const LoginLink = styled(Link)`
  color: #16a34a;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentReg, setStudentReg] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // In a real app, you would make an API call to register the user.
    // For this demo, we'll just simulate a successful registration.
    console.log({ username, email, phone, studentReg, password });
    navigate('/login');
  };

  return (
    <PageContainer>
      <Navbar/>
      <SignUpContainer>
        <SignUpCard>
          <Title>Sign Up</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="studentReg">Student Registration</Label>
              <Input
                type="text"
                id="studentReg"
                placeholder="Enter your student registration"
                value={studentReg}
                onChange={(e) => setStudentReg(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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

export default SignUp;