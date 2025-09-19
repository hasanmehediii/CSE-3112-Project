import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function Home() {
  return (
    <div className="home-bg-container">
      <div className="home-bg-overlay"></div>

      {/* Navbar */}
      <nav className="home-navbar navbar-blur">
        <div className="navbar-logo">Khaikhai</div>
        <ul className="navbar-links">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About Us</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
          <li><a href="#faq" className="nav-link">FAQ</a></li>
          <li>
            <Link
              to="/login"
              className="hero-btn navbar-login-btn"
            >
              Login / SignUp
            </Link>
          </li>
        </ul>
      </nav>

      {/* Centered Content */}
      <div className="home-center-content">
        <h1 className="hero-title" style={{ color: "#fff", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", textAlign: "center" }}>
          Welcome to Khaikhai
        </h1>
        <p className="hero-desc">
          Discover a smarter way to manage your food and nutrition. Join us to track, plan, and enjoy your meals with ease!
        </p>
      </div>

      {/* Bottom Button */}
      <div className="home-bottom-btn">
        <Link to="/open-account" className="hero-btn">
          Open an Account
        </Link>
      </div>
    </div>
  );
}
