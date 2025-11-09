// ✅ Updated SignUp.js with two-column layout + role + canteen_id + preferences

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
  max-width: 650px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #00b51bff;
  font-size: 2rem;
  font-weight: 700;
`;

// ✅ Two-column grid
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
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

const Select = styled.select`
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

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentReg, setStudentReg] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [canteenId, setCanteenId] = useState('');
  const [diet, setDiet] = useState('none');
  const [allergies, setAllergies] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      username,
      email,
      phone,
      studentReg,
      password,
      role,
      canteen_id: role === "owner" ? canteenId : null,
      preferences: role === "student" ? {
        diet,
        allergies: allergies.split(',').map(a => a.trim()),
      } : {},
    };

    console.log(payload);
    navigate('/login');
  };

  return (
    <PageContainer>
      <Navbar />
      <SignUpContainer>
        <SignUpCard>
          <Title>Sign Up</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={handleSubmit}>
            <FormGrid>
              <InputGroup>
                <Label>Username</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
              </InputGroup>

              <InputGroup>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </InputGroup>

              <InputGroup>
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </InputGroup>

              <InputGroup>
                <Label>Student Registration</Label>
                <Input value={studentReg} onChange={(e) => setStudentReg(e.target.value)} required />
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </InputGroup>

              <InputGroup>
                <Label>Role</Label>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="student">Student</option>
                  <option value="owner">Canteen Owner</option>
                </Select>
              </InputGroup>

              {role === 'owner' && (
                <InputGroup>
                  <Label>Canteen ID</Label>
                  <Input value={canteenId} onChange={(e) => setCanteenId(e.target.value)} />
                </InputGroup>
              )}

              {role === 'student' && (
                <>
                  <InputGroup>
                    <Label>Diet</Label>
                    <Select value={diet} onChange={(e) => setDiet(e.target.value)}>
                      <option value="none">None</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </Select>
                  </InputGroup>

                  <InputGroup>
                    <Label>Allergies (comma separated)</Label>
                    <Input value={allergies} onChange={(e) => setAllergies(e.target.value)} />
                  </InputGroup>
                </>
              )}
            </FormGrid>

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
