// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";

const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  backgroundColor: 'linear-gradient(to right, #07015cff, #5c2a06ff)', // soft warm background
};

/* ---------------- HERO ---------------- */

const heroSectionStyle: CSSProperties = {
  position: "relative",
  minHeight: "100vh",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "left",
  padding: "140px 40px 90px",
  backgroundImage:
    'linear-gradient(to bottom right, rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url("/background.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)",
};

const heroContentStyle: CSSProperties = {
  maxWidth: "900px",
  zIndex: 1,
};

const heroTitleStyle: CSSProperties = {
  fontSize: "3.1rem",
  fontWeight: 800,
  marginBottom: "18px",
  textShadow: "0 2px 4px rgba(0,0,0,0.6)",
};

const heroSubtitleStyle: CSSProperties = {
  fontSize: "1.15rem",
  lineHeight: 1.8,
  maxWidth: "620px",
  marginBottom: "30px",
  opacity: 0.95,
};

const heroButtonStyle: CSSProperties = {
  padding: "14px 30px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#f97316",
  color: "white",
  fontSize: "1.05rem",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease",
};

/* ---------------- GENERIC SECTION ---------------- */

const sectionOuterStyle: CSSProperties = {
  padding: "0 20px",
};

const sectionInnerBase: CSSProperties = {
  padding: "40px 32px",
  maxWidth: "1100px",
  margin: "0 auto",
  borderRadius: "24px",
  boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: "8px",
  textAlign: "center",
  color: "#111827",
};

const sectionSubtitleStyle: CSSProperties = {
  fontSize: "0.98rem",
  color: "#6b7280",
  textAlign: "center",
  marginBottom: "26px",
};

/* ---------------- STATS SECTION ---------------- */

const statsSectionInnerStyle: CSSProperties = {
  ...sectionInnerBase,
  backgroundColor: "#ffffff",
  marginTop: "-40px", // float over hero
  position: "relative",
};

const statsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "20px",
};

const statCardStyle: CSSProperties = {
  background:
    "radial-gradient(circle at top left, #ffedd5, #ffffff)",
  borderRadius: "18px",
  padding: "20px 18px",
  textAlign: "center",
  border: "1px solid #fed7aa",
};

const statNumberStyle: CSSProperties = {
  fontSize: "1.8rem",
  fontWeight: 800,
  color: "#f97316",
  marginBottom: "4px",
};

const statLabelStyle: CSSProperties = {
  fontSize: "0.95rem",
  color: "#4b5563",
};

/* ---------------- FEATURE CARDS SECTIONS ---------------- */

const featuresSectionInnerStyle: CSSProperties = {
  ...sectionInnerBase,
  backgroundColor: "#fff7ed",
  marginTop: "28px",
};

const extraSectionInnerStyle: CSSProperties = {
  ...sectionInnerBase,
  backgroundColor: "#ffffff",
  marginTop: "28px",
  marginBottom: "60px",
};

const cardGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
};

const featureCardStyle: CSSProperties = {
  backgroundColor: "white",
  borderRadius: "18px",
  padding: "20px 18px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  border: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const featureIconStyle: CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "999px",
  backgroundColor: "#ffedd5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.4rem",
  marginBottom: "4px",
};

const featureTitleStyle: CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 600,
  color: "#111827",
};

const featureTextStyle: CSSProperties = {
  fontSize: "0.95rem",
  color: "#6b7280",
  lineHeight: 1.7,
};

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div style={pageWrapperStyle}>
      {/* HERO */}
      <section style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>Smart Campus Meals with Khaikhai</h1>
          <p style={heroSubtitleStyle}>
            Skip the queue, avoid surprise stock-outs, and enjoy fresh meals on time.
            Khaikhai connects students and canteens with a simple, fast, and
            transparent pre-order system.
          </p>
          <button
            style={heroButtonStyle}
            onClick={handleGetStarted}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fb923c";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f97316";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* STATS / HIGHLIGHTS */}
      <section style={sectionOuterStyle}>
        <div style={statsSectionInnerStyle}>
          <h2 style={sectionTitleStyle}>Why Students & Canteens Love Khaikhai</h2>
          <p style={sectionSubtitleStyle}>
            Built for campus life – reliable, organised, and actually pleasant to use.
          </p>
          <div style={statsGridStyle}>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>500+</div>
              <div style={statLabelStyle}>Student users</div>
            </div>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>10+</div>
              <div style={statLabelStyle}>Canteen partners</div>
            </div>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>99%</div>
              <div style={statLabelStyle}>On-time pickups</div>
            </div>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>4.8★</div>
              <div style={statLabelStyle}>Average experience rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={sectionOuterStyle}>
        <div style={featuresSectionInnerStyle}>
          <h2 style={sectionTitleStyle}>How Khaikhai Works</h2>
          <p style={sectionSubtitleStyle}>
            A simple flow for students, canteens, and admins.
          </p>
          <div style={cardGridStyle}>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🎓</div>
              <h3 style={featureTitleStyle}>For Students</h3>
              <p style={featureTextStyle}>
                Browse menus, pre-book meals, track order status, and raise complaints
                directly from your dashboard. No more guessing what&apos;s left at
                the counter.
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🍽️</div>
              <h3 style={featureTitleStyle}>For Canteens</h3>
              <p style={featureTextStyle}>
                See demand in advance, manage orders in real-time, and reduce waste.
                Handle complaints and respond to students from one simple panel.
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🏛️</div>
              <h3 style={featureTitleStyle}>For Admins</h3>
              <p style={featureTextStyle}>
                Monitor all canteens, compare performance, and use centralised data on
                usage and complaints to guide policy and improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXTRA SECTION */}
      <section style={sectionOuterStyle}>
        <div style={extraSectionInnerStyle}>
          <h2 style={sectionTitleStyle}>Built with Care for Campus Scale</h2>
          <p style={sectionSubtitleStyle}>
            Designed with performance, reliability, and usability in mind.
          </p>
          <div style={cardGridStyle}>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>✨</div>
              <h3 style={featureTitleStyle}>Clean, Focused UI</h3>
              <p style={featureTextStyle}>
                Minimal, distraction-free screens that make it easy to order, manage,
                and track meals without digging through complex menus.
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🔐</div>
              <h3 style={featureTitleStyle}>Role-based Access</h3>
              <p style={featureTextStyle}>
                Clear separation between student, canteen, and admin views keeps the
                platform secure and easier to maintain.
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>💬</div>
              <h3 style={featureTitleStyle}>Complaint Handling</h3>
              <p style={featureTextStyle}>
                Complaints are linked to orders and meals, so canteens and admins can
                investigate and respond quickly with full context.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
