import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaLock, FaUserFriends, FaMoneyBillWave } from "react-icons/fa";
import Navbar from "./components/Navbar";   // Import your Navbar
import Footer from "./components/Footer";   // Import your Footer
import "./App.css";

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
  max-width: 1200px;
  margin: 0 auto;
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
    <div className="home-container" style={{ fontFamily: "Poppins, sans-serif" }}>
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
          backgroundImage: `url("/eating-person.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          textAlign: "left",
          padding: "0 5rem",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "700",
            marginBottom: "1rem",
            textShadow: "0 2px 8px #0008",
          }}
        >
          Welcome to Khaikhai
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            marginBottom: "2rem",
            maxWidth: "600px",
            textShadow: "0 2px 8px #0008",
          }}
        >
          Discover a smarter way to manage your food and nutrition. Join us to
          track, plan, and enjoy your meals with ease!
        </p>
        <Link
          to="/signup"
          className="hero-btn"
          style={{
            fontSize: "1.2rem",
            fontWeight: "600",
            color: "#fff",
            background: "#16a34a",
            padding: "1rem 2.5rem",
            borderRadius: "50px",
            textDecoration: "none",
            transition: "background 0.3s ease",
          }}
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <FeaturesSection>
        <SectionTitle>Why Choose Khaikhai?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <IconWrapper>
              <FaLock />
            </IconWrapper>
            <FeatureTitle>App Security</FeatureTitle>
            <FeatureText>
              Your data and privacy are protected by advanced security and encryption measures.
            </FeatureText>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper>
              <FaUserFriends />
            </IconWrapper>
            <FeatureTitle>Customer-First Approach</FeatureTitle>
            <FeatureText>
              We prioritize your needs with 24/7 support and personalized food management services.
            </FeatureText>
          </FeatureCard>
          <FeatureCard>
            <IconWrapper>
              <FaMoneyBillWave />
            </IconWrapper>
            <FeatureTitle>Payment System</FeatureTitle>
            <FeatureText>
              Enjoy seamless and secure payment options for all your food and nutrition needs.
            </FeatureText>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      {/* Footer */}
      <Footer />
    </div>
  );
}
