import React from "react";
import styled from "styled-components";
import Footer from "./components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { FaStore, FaUserGraduate, FaExclamationCircle, FaHome, FaSignOutAlt, FaTasks } from "react-icons/fa";

// Styled Components for Admin Layout
const AdminContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%);
  display: flex;
  flex-direction: column;
`;

const AdminNavbar = styled.nav`
  width: 100%;
  background: linear-gradient(90deg, #2563eb 60%, #16a34a 100%);
  padding: 1.2rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px #0002;
  z-index: 10;
`;

const AdminNavLinks = styled.ul`
  display: flex;
  gap: 2.2rem;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const AdminNavLink = styled.li`
  a {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s;
    padding: 0.2rem 0.8rem;
    border-radius: 1rem;
    &:hover {
      color: #bbf7d0;
      background: rgba(255,255,255,0.08);
    }
  }
`;

const AdminBody = styled.div`
  flex: 1;
  padding: 3rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(120deg, #f0fdf4 0%, #dbeafe 100%);
`;

const AdminTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
  text-shadow: 0 2px 12px #16a34a33;
`;

const AdminCards = styled.div`
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`;

const AdminCard = styled.div`
  background: linear-gradient(135deg, #fbbf24 0%, #34d399 100%);
  color: #222;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #16a34a22;
  padding: 2.5rem 2rem;
  min-width: 260px;
  max-width: 320px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  font-size: 1.15rem;
  font-weight: 500;
  &:hover {
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 8px 32px #2563eb33;
    background: linear-gradient(135deg, #34d399 0%, #fbbf24 100%);
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2563eb;
`;

export default function Admin() {
  const navigate = useNavigate();

  const cards = [
    {
      icon: <FaStore />,
      title: "Manage Canteens",
      desc: "View, add, or update canteen information and menus.",
    },
    {
      icon: <FaUserGraduate />,
      title: "Manage Students",
      desc: "View and manage student accounts and registrations.",
    },
    {
      icon: <FaExclamationCircle />,
      title: "Complaints",
      desc: "Review and resolve user complaints efficiently.",
    },
    {
      icon: <FaTasks />,
      title: "Actions",
      desc: "Perform admin actions and monitor system activity.",
    },
  ];

  // Logout handler
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <AdminContainer>
      {/* Admin Navbar */}
      <AdminNavbar>
        <div style={{ fontWeight: 900, fontSize: "2rem", color: "#fff", letterSpacing: "2px" }}>
          Khaikhai Admin
        </div>
        <AdminNavLinks>
          <AdminNavLink>
            <Link to="#"><FaStore />Canteen</Link>
          </AdminNavLink>
          <AdminNavLink>
            <Link to="#"><FaUserGraduate />Student</Link>
          </AdminNavLink>
          <AdminNavLink>
            <Link to="#"><FaExclamationCircle />Complain</Link>
          </AdminNavLink>
          <AdminNavLink>
            <Link to="#"><FaTasks />Actions</Link>
          </AdminNavLink>
          <AdminNavLink>
            <Link to="/"><FaHome />Home</Link>
          </AdminNavLink>
          <AdminNavLink>
            <a href="#" onClick={handleLogout}><FaSignOutAlt />Logout</a>
          </AdminNavLink>
        </AdminNavLinks>
      </AdminNavbar>

      {/* Admin Body */}
      <AdminBody>
        <AdminTitle>Welcome, Admin!</AdminTitle>
        <p style={{ fontSize: "1.2rem", color: "#2563eb", marginBottom: "2.5rem" }}>
          Manage all aspects of Khaikhai from this colorful dashboard.
        </p>
        <AdminCards>
          {cards.map((card, idx) => (
            <AdminCard key={idx}>
              <CardIcon>{card.icon}</CardIcon>
              <div style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.5rem" }}>{card.title}</div>
              <div>{card.desc}</div>
            </AdminCard>
          ))}
        </AdminCards>
      </AdminBody>

      {/* Footer */}
      <Footer />
    </AdminContainer>
  );
}

import Admin from "./Admin";
// ...
<Route path="/admin" element={<Admin />} />