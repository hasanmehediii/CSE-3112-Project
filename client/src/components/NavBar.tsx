// src/components/NavBar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navStyle: React.CSSProperties = {
  position: "fixed",
  top: 16,
  left: "50%",
  transform: "translateX(-50%)",
  width: "min(1120px, 94%)",
  padding: "10px 22px",
  borderRadius: "999px",
  backgroundColor: "rgba(15, 23, 42, 0.55)", // dark + transparent
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  boxShadow: "0 18px 45px rgba(15, 23, 42, 0.45)",
  border: "1px solid rgba(148, 163, 184, 0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 1000,
};

const leftSectionStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const brandLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textDecoration: "none",
  color: "white",
};

const brandTextStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "1.2rem",
};

const logoStyle: React.CSSProperties = {
  height: 32,
  width: 32,
  borderRadius: "50%",
  objectFit: "cover",
};

const rightSectionStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const baseLinkStyle: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontSize: "0.95rem",
  padding: "7px 14px",
  borderRadius: "999px",
  transition: "background-color 0.2s ease, transform 0.15s ease",
};

const buttonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#f97316",
  color: "white",
  cursor: "pointer",
  fontSize: "0.95rem",
  fontWeight: 500,
  transition: "background-color 0.2s ease, transform 0.15s ease",
};

function NavBar() {
  const { token, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const hoverOn = (el: HTMLAnchorElement | null) => {
    if (!el) return;
    el.style.backgroundColor = "rgba(248, 250, 252, 0.16)";
    el.style.transform = "translateY(-1px)";
  };

  const hoverOff = (el: HTMLAnchorElement | null) => {
    if (!el) return;
    el.style.backgroundColor = "transparent";
    el.style.transform = "translateY(0)";
  };

  const buttonHoverOn = (el: HTMLButtonElement | null) => {
    if (!el) return;
    el.style.backgroundColor = "#ea580c";
    el.style.transform = "translateY(-1px)";
  };

  const buttonHoverOff = (el: HTMLButtonElement | null) => {
    if (!el) return;
    el.style.backgroundColor = "#f97316";
    el.style.transform = "translateY(0)";
  };

  return (
    <nav style={navStyle}>
      {/* Left: logo + brand */}
      <div style={leftSectionStyle}>
        <Link to="/" style={brandLinkStyle}>
          <img src="/logo.png" alt="KhaiKhai" style={logoStyle} />
          <span style={brandTextStyle}>KhaiKhai</span>
        </Link>
      </div>

      {/* Right: links */}
      <div style={rightSectionStyle}>
        {!token && (
          <>
            <Link
              to="/"
              style={baseLinkStyle}
              onMouseEnter={(e) => hoverOn(e.currentTarget)}
              onMouseLeave={(e) => hoverOff(e.currentTarget)}
            >
              Home
            </Link>
            <Link
              to="/login"
              style={baseLinkStyle}
              onMouseEnter={(e) => hoverOn(e.currentTarget)}
              onMouseLeave={(e) => hoverOff(e.currentTarget)}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={baseLinkStyle}
              onMouseEnter={(e) => hoverOn(e.currentTarget)}
              onMouseLeave={(e) => hoverOff(e.currentTarget)}
            >
              Register
            </Link>
          </>
        )}

        {token && userRole === "student" && (
          <>
            <Link
              to="/student"
              style={baseLinkStyle}
              onMouseEnter={(e) => hoverOn(e.currentTarget)}
              onMouseLeave={(e) => hoverOff(e.currentTarget)}
            >
              Dashboard
            </Link>
            <Link
              to="/student/profile"
              style={baseLinkStyle}
              onMouseEnter={(e) => hoverOn(e.currentTarget)}
              onMouseLeave={(e) => hoverOff(e.currentTarget)}
            >
              Profile
            </Link>
            <Link
              to="/student/complaints"
              style={baseLinkStyle}
              onMouseEnter={(e) => hoverOn(e.currentTarget)}
              onMouseLeave={(e) => hoverOff(e.currentTarget)}
            >
              Complaints
            </Link>
          </>
        )}

        {token && userRole === "canteen" && (
          <>
            <Link
              to="/canteen"
              style={baseLinkStyle}
              onMouseEnter={(e) => hoverOn(e.currentTarget)}
              onMouseLeave={(e) => hoverOff(e.currentTarget)}
            >
              Canteen Dashboard
            </Link>
            <Link
              to="/canteen/orders"
              style={baseLinkStyle}
              onMouseEnter={(e) => hoverOn(e.currentTarget)}
              onMouseLeave={(e) => hoverOff(e.currentTarget)}
            >
              Orders
            </Link>
            <Link
              to="/canteen/profile"
              style={baseLinkStyle}
              onMouseEnter={(e) => hoverOn(e.currentTarget)}
              onMouseLeave={(e) => hoverOff(e.currentTarget)}
            >
              Profile
            </Link>
            <Link
              to="/canteen/complaints"
              style={baseLinkStyle}
              onMouseEnter={(e) => hoverOn(e.currentTarget)}
              onMouseLeave={(e) => hoverOff(e.currentTarget)}
            >
              Complaints
            </Link>
          </>
        )}

        {token && userRole === "admin" && (
          <Link
            to="/admin"
            style={baseLinkStyle}
            onMouseEnter={(e) => hoverOn(e.currentTarget)}
            onMouseLeave={(e) => hoverOff(e.currentTarget)}
          >
            Admin Dashboard
          </Link>
        )}

        {token && (
          <button
            style={buttonStyle}
            onClick={handleLogout}
            onMouseEnter={(e) => buttonHoverOn(e.currentTarget)}
            onMouseLeave={(e) => buttonHoverOff(e.currentTarget)}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
