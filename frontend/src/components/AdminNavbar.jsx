import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background-color: #2c3e50; /* Dark blue-gray for professionalism */
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  text-shadow: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #34495e; /* Slightly lighter dark blue-gray on hover */
    transform: translateY(-2px);
  }
`;

const AdminNavbar = () => {
  return (
    <NavbarContainer>
      <Logo to="/admin">Admin Panel</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/admin/canteen">Canteen</NavLink>
        <NavLink to="/admin/students">Students</NavLink>
        <NavLink to="/admin/complains">Complains</NavLink>
        <NavLink to="/admin/actions">Actions</NavLink>
        <NavLink to="/">Logout</NavLink> {/* Assuming a logout route */}
      </NavLinks>
    </NavbarContainer>
  );
};

export default AdminNavbar;
