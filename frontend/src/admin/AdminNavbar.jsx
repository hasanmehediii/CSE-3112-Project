import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const NavbarContainer = styled.nav`
  background-color: #1a202c;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &.active {
    color: #48bb78;
    font-weight: 700;
  }

  &:hover {
    color: #48bb78;
  }
`;

const LogoutButton = styled.button`
  background-color: #e53e3e;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c53030;
  }
`;

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <NavbarContainer>
      <NavLinks>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="canteen">Canteen</StyledNavLink>
        <StyledNavLink to="students">Students</StyledNavLink>
        <StyledNavLink to="complains">Complains</StyledNavLink>
        <StyledNavLink to="actions">Actions</StyledNavLink>
      </NavLinks>
      <LogoutButton onClick={logout}>Logout</LogoutButton>
    </NavbarContainer>
  );
};

export default AdminNavbar;
