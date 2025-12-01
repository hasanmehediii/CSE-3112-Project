// src/components/NavBar.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const baseNavStyle: React.CSSProperties = {
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

const baseRightSectionStyle: React.CSSProperties = {
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

const hamburgerButtonStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "999px",
  border: "1px solid rgba(148, 163, 184, 0.7)",
  backgroundColor: "rgba(15, 23, 42, 0.75)",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  padding: 0,
};

function NavBar() {
  const { token, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Detect mobile based on width
  useEffect(() => {
    const update = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 640);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuOpen) return;
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
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

  const navStyle: React.CSSProperties = isMobile
    ? {
        ...baseNavStyle,
        left: 0,
        transform: "none",
        width: "100%",
        borderRadius: 18,
        padding: "8px 14px",
      }
    : baseNavStyle;

  const rightSectionStyle: React.CSSProperties = {
    ...baseRightSectionStyle,
    justifyContent: isMobile ? "flex-end" : "flex-end",
  };

  const handleMenuLinkClick = () => {
    setMenuOpen(false);
  };

  const renderLinks = () => (
    <>
      {!token && (
        <>
          <Link
            to="/"
            style={baseLinkStyle}
            onClick={handleMenuLinkClick}
            onMouseEnter={(e) => hoverOn(e.currentTarget)}
            onMouseLeave={(e) => hoverOff(e.currentTarget)}
          >
            Home
          </Link>
          <Link
            to="/login"
            style={baseLinkStyle}
            onClick={handleMenuLinkClick}
            onMouseEnter={(e) => hoverOn(e.currentTarget)}
            onMouseLeave={(e) => hoverOff(e.currentTarget)}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={baseLinkStyle}
            onClick={handleMenuLinkClick}
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
            onClick={handleMenuLinkClick}
            onMouseEnter={(e) => hoverOn(e.currentTarget)}
            onMouseLeave={(e) => hoverOff(e.currentTarget)}
          >
            Dashboard
          </Link>
          <Link
            to="/student/profile"
            style={baseLinkStyle}
            onClick={handleMenuLinkClick}
            onMouseEnter={(e) => hoverOn(e.currentTarget)}
            onMouseLeave={(e) => hoverOff(e.currentTarget)}
          >
            Profile
          </Link>
          <Link
            to="/student/complaints"
            style={baseLinkStyle}
            onClick={handleMenuLinkClick}
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
            onClick={handleMenuLinkClick}
            onMouseEnter={(e) => hoverOn(e.currentTarget)}
            onMouseLeave={(e) => hoverOff(e.currentTarget)}
          >
            Canteen Dashboard
          </Link>
          <Link
            to="/canteen/orders"
            style={baseLinkStyle}
            onClick={handleMenuLinkClick}
            onMouseEnter={(e) => hoverOn(e.currentTarget)}
            onMouseLeave={(e) => hoverOff(e.currentTarget)}
          >
            Orders
          </Link>
          <Link
            to="/canteen/profile"
            style={baseLinkStyle}
            onClick={handleMenuLinkClick}
            onMouseEnter={(e) => hoverOn(e.currentTarget)}
            onMouseLeave={(e) => hoverOff(e.currentTarget)}
          >
            Profile
          </Link>
          <Link
            to="/canteen/complaints"
            style={baseLinkStyle}
            onClick={handleMenuLinkClick}
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
          onClick={handleMenuLinkClick}
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
    </>
  );

  return (
    <>
      <nav style={navStyle}>
        {/* Left: logo + brand */}
        <div style={leftSectionStyle}>
          <Link to="/" style={brandLinkStyle} onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="KhaiKhai" style={logoStyle} />
            <span style={brandTextStyle}>KhaiKhai</span>
          </Link>
        </div>

        {/* Right: desktop links or mobile hamburger */}
        <div style={rightSectionStyle}>
          {isMobile ? (
            <button
              ref={buttonRef}
              style={hamburgerButtonStyle}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {/* three dots style icon */}
              <span style={{ marginTop: -2 }}>⋮</span>
            </button>
          ) : (
            renderLinks()
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: 70,
            left: 0,
            right: 0,
            padding: "10px 14px 16px",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              borderRadius: 18,
              border: "1px solid rgba(148, 163, 184, 0.6)",
              padding: "10px 10px 12px",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.65)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {renderLinks()}
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
