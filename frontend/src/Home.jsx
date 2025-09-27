import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

<<<<<<< Updated upstream
export default function Home() {
  return (
    <div>
      {/* Hero Section with full background image */}
      <div
        className="home-bg-container"
        style={{
          background: `url("/eating-person.jpg") center center/cover no-repeat`,
          minHeight: "100vh",
          width: "100vw",
=======
const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background: #120000ff;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: #5f5a42ff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #16a34a;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  color: #000000ff;
`;

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#fff", // or your image
        margin: 0,
        padding: 0,
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
          width: "100vw", // Ensure full width
          background: `url("/eating-person.jpg") center center/cover no-repeat`,
          color: "#fff",
          textAlign: "left",
          padding: "0 5vw", // Use vw for responsive padding
>>>>>>> Stashed changes
          position: "relative",
          margin: 0, // Remove any margin
          boxSizing: "border-box", // Ensure padding doesn't cause overflow
          overflow: "hidden", // Prevent scrollbars from appearing
        }}
      >
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

        {/* Left-aligned Content */}
        <div
          className="home-center-content"
          style={{
            textAlign: "left",
            left: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: "600px",
            position: "absolute",
          }}
        >
          <h1
            className="hero-title"
            style={{
              color: "#fff",
              background: "none",
              WebkitBackgroundClip: "unset",
              WebkitTextFillColor: "unset",
              textAlign: "left",
            }}
          >
            Welcome to Khaikhai
          </h1>
          <p
            className="hero-desc"
            style={{
              color: "#fff",
              textShadow: "0 2px 8px #0008",
              textAlign: "left",
              marginBottom: "2.5rem",
            }}
          >
            Discover a smarter way to manage your food and nutrition. Join us to track, plan, and enjoy your meals with ease!
          </p>
        </div>

        {/* Centered Get Started Button */}
        <div
          className="home-bottom-btn"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "8%",
            transform: "translateX(-50%)",
            marginTop: "2rem",
            zIndex: 2,
          }}
        >
          <Link to="/open-account" className="hero-btn">
            Get Started
          </Link>
        </div>
      </div>

      {/* Why Choose Khaikhai Section (appears after scroll) */}
      <section style={{
        background: "#fff",
        padding: "3rem 1rem 2rem 1rem",
        borderTopLeftRadius: "2rem",
        borderTopRightRadius: "2rem",
        boxShadow: "0 -2px 24px #0001",
        position: "relative",
        zIndex: 5,
        marginTop: "-2rem"
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "2.5rem",
          letterSpacing: "1px"
        }}>
          Why Choose Khaikhai?
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap",
          marginBottom: "2.5rem"
        }}>
          {/* App Security */}
          <div style={{ flex: "1 1 220px", maxWidth: "320px", textAlign: "center" }}>
            <img src="https://img.icons8.com/fluency/48/lock-2.png" alt="App Security" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontWeight: "bold", fontSize: "1.3rem" }}>App Security</h3>
            <p style={{ color: "#444" }}>
              Your data and privacy are protected by advanced security and encryption measures.
            </p>
          </div>
          {/* Customer-First Approach */}
          <div style={{ flex: "1 1 220px", maxWidth: "320px", textAlign: "center" }}>
            <img src="https://img.icons8.com/fluency/48/user-group-man-man.png" alt="Customer First" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontWeight: "bold", fontSize: "1.3rem" }}>Customer-First Approach</h3>
            <p style={{ color: "#444" }}>
              We prioritize your needs with 24/7 support and personalized food management services.
            </p>
          </div>
          {/* Payment System */}
          <div style={{ flex: "1 1 220px", maxWidth: "320px", textAlign: "center" }}>
            <img src="https://img.icons8.com/fluency/48/money.png" alt="Payment System" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontWeight: "bold", fontSize: "1.3rem" }}>Payment System</h3>
            <p style={{ color: "#444" }}>
              Enjoy seamless and secure payment options for all your food and nutrition needs.
            </p>
          </div>
        </div>
        {/* Optional: Add your image below the section */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <img
            src="c:/Users/Nafisha/Downloads/6230921249622706120.jpg"
            alt="Khaikhai Illustration"
            style={{
              maxWidth: "600px",
              width: "100%",
              borderRadius: "1.5rem",
              boxShadow: "0 4px 24px #16a34a22"
            }}
          />
        </div>
      </section>
    </div>
  );
}


