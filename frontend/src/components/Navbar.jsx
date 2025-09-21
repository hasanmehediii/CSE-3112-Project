import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext.jsx";

const Nav = styled.nav`
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: ${({ staticNav }) => (staticNav ? 'static' : 'absolute')};
  top: ${({ staticNav }) => (staticNav ? '0' : '20px')};
  left: ${({ staticNav }) => (staticNav ? '0' : '50%')};
  transform: ${({ staticNav }) => (staticNav ? 'none' : 'translateX(-50%)')};
  width: ${({ staticNav }) => (staticNav ? '100%' : '90%')};
  max-width: ${({ staticNav }) => (staticNav ? '100%' : '1200px')};
  border-radius: ${({ staticNav }) => (staticNav ? '0' : '15px')};
  z-index: 1000;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.7rem;
  font-weight: bold;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  font-size: 1.2rem;

  &:hover {
    color: #ddd;
  }
`;

const Button = styled(Link)`
  background-color: #16a34a; /* Green for Khaikhai */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  margin-left: 1rem;

  &:hover {
    background-color: #15803d;
  }
`;

const UserMenu = styled.div`
  position: relative;
  cursor: pointer;
`;

const UserName = styled.span`
  font-size: 1.2rem;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: #16a34a;
  border-radius: 5px;

  &:hover {
    background-color: #15803d;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2c3e50;
  border-radius: 5px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 160px;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  display: block;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`;

const Navbar = ({ staticNav }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/user-profile");
    setShowDropdown(false);
  };

  return (
    <Nav staticNav={staticNav}>
      <Logo to="/">Khaikhai</Logo>
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink to="/">Home</NavLink>
        {user && <NavLink to="/home">Dashboard</NavLink>}
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        {user ? (
          <UserMenu>
            <UserName onClick={() => setShowDropdown(!showDropdown)}>
              {user && user.name}
            </UserName>
            {showDropdown && (
              <DropdownMenu>
                <DropdownItem onClick={handleProfileClick}>
                  User Profile
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            )}
          </UserMenu>
        ) : (
          <Button to="/login">Login / SignUp</Button>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;
