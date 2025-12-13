// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

/* ---------------- 3D DASHBOARD CARD ---------------- */

function useTiltAnimation() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const transform = `perspective(1200px) rotateX(${(-tilt.y * 14).toFixed(
    2
  )}deg) rotateY(${(tilt.x * 18).toFixed(2)}deg) scale(${hovering ? 1.02 : 1
    })`;

  return {
    cardRef,
    transform,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
  };
}

/* ---------------- PAGE + HERO ---------------- */

const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  backgroundColor: "#020617",
  backgroundImage:
    "radial-gradient(circle at top left, rgba(30,64,175,0.35) 0, transparent 60%)",
};

const heroSectionStyle: CSSProperties = {
  position: "relative",
  minHeight: "100vh",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "left",
  padding: "140px 40px 110px",
  backgroundImage:
    'linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("/background5.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)",
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
  opacity: 0.96,
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
  boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
  transition:
    "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease",
};

/* Scroll hint (circle) */

const scrollHintWrapperStyle: CSSProperties = {
  position: "absolute",
  bottom: "32px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2,
};

const scrollHintCircleStyle: CSSProperties = {
  width: "56px",
  height: "56px",
  borderRadius: "999px",
  background:
    "radial-gradient(circle at top, #f97316, #ea580c 60%, #7c2d12 90%)",
  boxShadow:
    "0 0 0 8px rgba(249,115,22,0.22), 0 22px 50px rgba(0,0,0,0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const scrollHintArrowStyle: CSSProperties = {
  fontSize: "1.4rem",
  color: "white",
  textShadow: "0 2px 4px rgba(0,0,0,0.7)",
};

/* ---------------- 3D EXPERIENCE SECTION ---------------- */

const experienceSectionStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "40px 20px 60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  background:
    "radial-gradient(circle at top, #0b1120 0, #020617 45%, #020617 100%)",
};

const experienceInnerStyle: CSSProperties = {
  maxWidth: "1150px",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.2fr)",
  gap: "32px",
  alignItems: "center",
};

const experienceLeftStyle: CSSProperties = {
  color: "white",
};

const expTagStyle: CSSProperties = {
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: "#a5b4fc",
  marginBottom: "6px",
};

const expTitleStyle: CSSProperties = {
  fontSize: "2.1rem",
  fontWeight: 750,
  marginBottom: "8px",
};

const expSubtitleStyle: CSSProperties = {
  fontSize: "0.95rem",
  color: "#cbd5f5",
  marginBottom: "18px",
  maxWidth: "420px",
};

const expListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "20px",
};

const expListItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
  fontSize: "0.9rem",
  color: "#e5e7eb",
};

const bulletStyle: CSSProperties = {
  width: "18px",
  height: "18px",
  borderRadius: "999px",
  background:
    "radial-gradient(circle at top left, #f97316, #ea580c 60%, #7c2d12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.75rem",
};

const expPillRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const expPillStyle: CSSProperties = {
  padding: "6px 10px",
  borderRadius: "999px",
  border: "1px solid rgba(148,163,184,0.4)",
  fontSize: "0.75rem",
  color: "#e5e7eb",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.4))",
};

/* 3D card wrapper */

const cardOuterWrapper: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardGlowStyle: CSSProperties = {
  position: "absolute",
  inset: "auto",
  width: "85%",
  maxWidth: "520px",
  height: "24px",
  borderRadius: "999px",
  background:
    "radial-gradient(circle at center, rgba(56,189,248,0.4), transparent 60%)",
  filter: "blur(10px)",
  transform: "translateY(52px)",
  opacity: 0.65,
  pointerEvents: "none",
};

const cardBaseStyle: CSSProperties = {
  position: "relative",
  maxWidth: "520px",
  width: "100%",
  transformStyle: "preserve-3d",
};

const dashboardCardStyle: CSSProperties = {
  position: "relative",
  borderRadius: "26px",
  padding: "20px 20px 18px",
  background:
    "linear-gradient(145deg, #020617, #020617, #0b1120, #1f2937)",
  border: "1px solid rgba(148,163,184,0.6)",
  boxShadow:
    "0 26px 70px rgba(15,23,42,0.7), 0 0 0 1px rgba(15,23,42,0.9), 0 0 60px rgba(59,130,246,0.25)",
  color: "white",
  overflow: "hidden",
  transition: "box-shadow 0.25s ease",
};

const cardHeaderRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "14px",
};

const cardBadge: CSSProperties = {
  padding: "4px 10px",
  borderRadius: "999px",
  background:
    "linear-gradient(135deg, rgba(52,211,153,0.25), rgba(16,185,129,0.05))",
  border: "1px solid rgba(52,211,153,0.4)",
  fontSize: "0.75rem",
  color: "#bbf7d0",
};

const cardTitleText: CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 600,
};

const cardDots: CSSProperties = {
  display: "flex",
  gap: "4px",
};

const dot: CSSProperties = {
  width: "7px",
  height: "7px",
  borderRadius: "999px",
  backgroundColor: "rgba(148,163,184,0.7)",
};

const cardMainGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
  gap: "16px",
};

const miniStatCol: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const miniStatCard: CSSProperties = {
  borderRadius: "16px",
  padding: "10px 11px",
  background:
    "linear-gradient(145deg, rgba(15,23,42,0.9), rgba(15,23,42,0.6))",
  border: "1px solid rgba(55,65,81,0.9)",
  fontSize: "0.8rem",
};

const miniStatLabel: CSSProperties = {
  color: "#9ca3af",
  marginBottom: "2px",
};

const miniStatValue: CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 700,
};

const miniStatSub: CSSProperties = {
  fontSize: "0.7rem",
  color: "#bbf7d0",
};

const orderListCard: CSSProperties = {
  borderRadius: "16px",
  padding: "10px 11px",
  background:
    "radial-gradient(circle at top left, rgba(59,130,246,0.26), rgba(15,23,42,0.95))",
  border: "1px solid rgba(59,130,246,0.55)",
  fontSize: "0.78rem",
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const orderRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const orderName: CSSProperties = {
  color: "#e5e7eb",
};

const orderMeta: CSSProperties = {
  fontSize: "0.7rem",
  color: "#9ca3af",
};

const orderStatusPill: CSSProperties = {
  padding: "3px 8px",
  borderRadius: "999px",
  fontSize: "0.7rem",
};

const orderStatusReady: CSSProperties = {
  ...orderStatusPill,
  backgroundColor: "rgba(52,211,153,0.15)",
  color: "#6ee7b7",
  border: "1px solid rgba(52,211,153,0.5)",
};

const orderStatusPrep: CSSProperties = {
  ...orderStatusPill,
  backgroundColor: "rgba(234,179,8,0.1)",
  color: "#facc15",
  border: "1px solid rgba(234,179,8,0.5)",
};

const orderStatusNew: CSSProperties = {
  ...orderStatusPill,
  backgroundColor: "rgba(59,130,246,0.2)",
  color: "#bfdbfe",
  border: "1px solid rgba(59,130,246,0.6)",
};

/* Floating chips under card */

const chipRowStyle: CSSProperties = {
  marginTop: "26px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "12px",
};

const floatingChipStyle: CSSProperties = {
  padding: "10px 14px",
  borderRadius: "999px",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.7))",
  border: "1px solid rgba(148,163,184,0.6)",
  fontSize: "0.8rem",
  color: "#e5e7eb",
  boxShadow: "0 10px 26px rgba(15,23,42,0.7)",
  transition:
    "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "default",
};

const chipIconCircle: CSSProperties = {
  width: "22px",
  height: "22px",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.85rem",
  background:
    "radial-gradient(circle at top left, rgba(249,115,22,0.9), rgba(252,211,77,0.7))",
};

/* ---------------- EXTRA ROLE SNAPSHOT SECTION ---------------- */

const extraSectionStyle: CSSProperties = {
  minHeight: "90vh",
  padding: "40px 20px 80px",
  boxSizing: "border-box",
  background:
    "radial-gradient(circle at bottom, #020617 0, #020617 30%, #020617 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const extraInnerStyle: CSSProperties = {
  maxWidth: "1100px",
  width: "100%",
  color: "white",
};

const extraTitleRowStyle: CSSProperties = {
  marginBottom: "24px",
};

const extraTitleStyle: CSSProperties = {
  fontSize: "1.8rem",
  fontWeight: 700,
  marginBottom: "6px",
};

const extraSubtitleStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "#9ca3af",
  maxWidth: "520px",
};

const extraCardsRowStyle: CSSProperties = {
  marginTop: "10px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "18px",
};

const roleCardStyle: CSSProperties = {
  borderRadius: "20px",
  padding: "18px 16px",
  background:
    "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.7))",
  border: "1px solid rgba(148,163,184,0.6)",
  boxShadow: "0 14px 36px rgba(15,23,42,0.85)",
  transformStyle: "preserve-3d",
  transition:
    "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
  fontSize: "0.9rem",
};

const roleLabelStyle: CSSProperties = {
  fontSize: "0.78rem",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "#a5b4fc",
  marginBottom: "4px",
};

const roleTitleTextStyle: CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 600,
  marginBottom: "8px",
};

const roleTextStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#e5e7eb",
  marginBottom: "10px",
};

const roleTagRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
};

const roleTagStyle: CSSProperties = {
  fontSize: "0.75rem",
  padding: "4px 8px",
  borderRadius: "999px",
  backgroundColor: "rgba(15,23,42,0.9)",
  border: "1px solid rgba(148,163,184,0.6)",
};

/* ---------------- COMPONENT ---------------- */

function HomePage() {
  const navigate = useNavigate();
  const {
    cardRef,
    transform,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
  } = useTiltAnimation();
  const [cardVisible, setCardVisible] = useState(false);

  // scroll hint vertical animation
  const [scrollHintOffset, setScrollHintOffset] = useState(0);

  useEffect(() => {
    // simple "appear from empty" when user scrolls near this section
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight || 800;

      // when user has scrolled at least ~0.6 of hero height
      if (scrollY > viewportHeight * 0.6) {
        setCardVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let frameId: number;
    const start = performance.now();

    const loop = (t: number) => {
      const elapsed = t - start;
      // smooth sine wave: amplitude ~6px
      const offset = Math.sin(elapsed / 900) * 6;
      setScrollHintOffset(offset);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const visibleStyle: CSSProperties = cardVisible
    ? {
      opacity: 1,
      transform: `${transform}`,
      filter: "blur(0px)",
    }
    : {
      opacity: 0,
      transform: "translateY(160px) scale(0.9)",
      filter: "blur(14px)",
    };

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleScrollHintClick = () => {
    const el = document.getElementById("experience-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={pageWrapperStyle}>
      {/* HERO */}
      <section style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>Smart Campus Meals with Khaikhai</h1>
          <p style={heroSubtitleStyle}>
            Skip the queue, avoid surprise stock-outs, and enjoy fresh meals on
            time. Khaikhai connects students and canteens with a simple, fast,
            and transparent pre-order system.
          </p>
          <button
            style={heroButtonStyle}
            onClick={handleGetStarted}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fb923c";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 16px 34px rgba(0,0,0,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f97316";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 12px 30px rgba(0,0,0,0.45)";
            }}
          >
            Get Started
          </button>
        </div>

        {/* animated circular scroll hint */}
        <div
          style={{
            ...scrollHintWrapperStyle,
            transform: `translateX(-50%) translateY(${scrollHintOffset}px)`,
          }}
        >
          <div
            style={scrollHintCircleStyle}
            onClick={handleScrollHintClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 0 0 10px rgba(249,115,22,0.26), 0 26px 60px rgba(0,0,0,0.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 0 0 8px rgba(249,115,22,0.22), 0 22px 50px rgba(0,0,0,0.75)";
            }}
          >
            <span style={scrollHintArrowStyle}>↓</span>
          </div>
        </div>
      </section>

      {/* SINGLE 3D EXPERIENCE SECTION (everything before footer) */}
      <section id="experience-section" style={experienceSectionStyle}>
        <div style={experienceInnerStyle}>
          {/* LEFT TEXT */}
          <div style={experienceLeftStyle}>
            <div style={expTagStyle}>Designed for real canteens</div>
            <h2 style={expTitleStyle}>See your campus canteen in 3D.</h2>
            <p style={expSubtitleStyle}>
              Khaikhai gives canteen owners a live view of orders, pickups, and
              complaints – all in one place, engineered to feel like a real
              control room.
            </p>

            <div style={expListStyle}>
              <div style={expListItemStyle}>
                <div style={bulletStyle}>✓</div>
                <div>
                  Live order board with colour-coded states for{" "}
                  <strong>New</strong>, <strong>Preparing</strong>, and{" "}
                  <strong>Ready</strong>.
                </div>
              </div>
              <div style={expListItemStyle}>
                <div style={bulletStyle}>✓</div>
                <div>
                  At-a-glance stats so you instantly see{" "}
                  <strong>today’s demand</strong> and average waiting time.
                </div>
              </div>
              <div style={expListItemStyle}>
                <div style={bulletStyle}>✓</div>
                <div>
                  Built for busy owners – <strong>no clutter</strong>, only the
                  screens you actually use during rush hour.
                </div>
              </div>
            </div>

            <div style={expPillRowStyle}>
              <div style={expPillStyle}>Real-time order tiles</div>
              <div style={expPillStyle}>Complaint-aware dashboard</div>
              <div style={expPillStyle}>Student-friendly pickup view</div>
            </div>
          </div>

          {/* RIGHT 3D CARD + FLOATING CHIPS */}
          <div>
            <div style={cardOuterWrapper}>
              <div style={{ ...cardBaseStyle }}>
                {/* glow under card */}
                <div style={cardGlowStyle} />

                <div
                  ref={cardRef}
                  style={{
                    ...dashboardCardStyle,
                    ...visibleStyle,
                    transition:
                      "opacity 0.9s ease-out, transform 0.9s ease-out, filter 0.9s ease-out, box-shadow 0.25s ease",
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={handleMouseEnter}
                >
                  {/* card header */}
                  <div style={cardHeaderRow}>
                    <div style={cardTitleText}>Canteen Control Panel</div>
                    <div style={cardDots}>
                      <span style={{ ...dot, backgroundColor: "#f97316" }} />
                      <span style={{ ...dot, backgroundColor: "#4ade80" }} />
                      <span style={dot} />
                    </div>
                  </div>

                  <div style={cardHeaderRow}>
                    <div style={cardBadge}>Live • Today&apos;s orders</div>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      Campus canteens · Khaikhai
                    </span>
                  </div>

                  {/* main content */}
                  <div style={cardMainGrid}>
                    {/* mini stats */}
                    <div style={miniStatCol}>
                      <div style={miniStatCard}>
                        <div style={miniStatLabel}>Total orders</div>
                        <div style={miniStatValue}>124</div>
                        <div style={miniStatSub}>+18% vs yesterday</div>
                      </div>
                      <div style={miniStatCard}>
                        <div style={miniStatLabel}>Avg. pickup time</div>
                        <div style={miniStatValue}>07:32</div>
                        <div style={miniStatSub}>
                          On track • Lunch rush handled
                        </div>
                      </div>
                      <div style={miniStatCard}>
                        <div style={miniStatLabel}>Complaints</div>
                        <div style={miniStatValue}>3</div>
                        <div style={{ ...miniStatSub, color: "#fecaca" }}>
                          All linked to orders
                        </div>
                      </div>
                    </div>

                    {/* order list preview */}
                    <div style={orderListCard}>
                      <div
                        style={{
                          ...orderRowStyle,
                          marginBottom: "4px",
                          fontWeight: 600,
                          fontSize: "0.78rem",
                          color: "#bfdbfe",
                        }}
                      >
                        <span>Live Orders</span>
                        <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
                          Canteen #03
                        </span>
                      </div>

                      <div style={orderRowStyle}>
                        <div>
                          <div style={orderName}>Chicken Khichuri</div>
                          <div style={orderMeta}>Seat-12 • 11:45 AM</div>
                        </div>
                        <div style={orderStatusReady}>Ready</div>
                      </div>

                      <div style={orderRowStyle}>
                        <div>
                          <div style={orderName}>Beef Tehari</div>
                          <div style={orderMeta}>Token #42 • 11:38 AM</div>
                        </div>
                        <div style={orderStatusPrep}>Preparing</div>
                      </div>

                      <div style={orderRowStyle}>
                        <div>
                          <div style={orderName}>Veg Combo</div>
                          <div style={orderMeta}>Seat-07 • 11:33 AM</div>
                        </div>
                        <div style={orderStatusNew}>New</div>
                      </div>

                      <div
                        style={{
                          marginTop: "6px",
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                        }}
                      >
                        Complaints are attached directly to these orders, so you
                        always know the full story before responding.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating chips row */}
            <div style={chipRowStyle}>
              <div
                style={floatingChipStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 40px rgba(15,23,42,0.85)";
                  e.currentTarget.style.borderColor = "rgba(96,165,250,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 26px rgba(15,23,42,0.7)";
                  e.currentTarget.style.borderColor = "rgba(148,163,184,0.6)";
                }}
              >
                <div style={chipIconCircle}>📊</div>
                Smart demand analytics
              </div>

              <div
                style={floatingChipStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 40px rgba(15,23,42,0.85)";
                  e.currentTarget.style.borderColor = "rgba(52,211,153,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 26px rgba(15,23,42,0.7)";
                  e.currentTarget.style.borderColor = "rgba(148,163,184,0.6)";
                }}
              >
                <div style={chipIconCircle}>⚡</div>
                One-tap status updates
              </div>

              <div
                style={floatingChipStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 40px rgba(15,23,42,0.85)";
                  e.currentTarget.style.borderColor = "rgba(248,250,252,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 26px rgba(15,23,42,0.7)";
                  e.currentTarget.style.borderColor = "rgba(148,163,184,0.6)";
                }}
              >
                <div style={chipIconCircle}>💬</div>
                Order-linked complaints
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXTRA ROLE SNAPSHOT SECTION */}
      <section style={extraSectionStyle}>
        <div style={extraInnerStyle}>
          <div style={extraTitleRowStyle}>
            <h2 style={extraTitleStyle}>Three dashboards. One Khaikhai.</h2>
            <p style={extraSubtitleStyle}>
              Students, canteens and admins all get views tuned to their daily
              work – so everyone stays in sync without sharing cluttered screens.
            </p>
          </div>

          <div style={extraCardsRowStyle}>
            {/* Student card */}
            <div
              style={roleCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "perspective(900px) rotateX(6deg) rotateY(-6deg) translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 24px 50px rgba(15,23,42,0.95)";
                e.currentTarget.style.borderColor =
                  "rgba(96,165,250,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 14px 36px rgba(15,23,42,0.85)";
                e.currentTarget.style.borderColor =
                  "rgba(148,163,184,0.6)";
              }}
            >
              <div style={roleLabelStyle}>Student view</div>
              <div style={roleTitleTextStyle}>Plan your meals calmly.</div>
              <p style={roleTextStyle}>
                Students see available meals, budget picks, and their current
                orders – no need to run to the counter just to check if it&apos;s
                finished.
              </p>
              <div style={roleTagRowStyle}>
                <span style={roleTagStyle}>Today&apos;s menu</span>
                <span style={roleTagStyle}>Quick pickup orders</span>
                <span style={roleTagStyle}>Complaint tracking</span>
              </div>
            </div>

            {/* Canteen card */}
            <div
              style={roleCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "perspective(900px) rotateX(6deg) rotateY(6deg) translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 24px 50px rgba(15,23,42,0.95)";
                e.currentTarget.style.borderColor =
                  "rgba(52,211,153,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 14px 36px rgba(15,23,42,0.85)";
                e.currentTarget.style.borderColor =
                  "rgba(148,163,184,0.6)";
              }}
            >
              <div style={roleLabelStyle}>Canteen view</div>
              <div style={roleTitleTextStyle}>Handle rush like a pro.</div>
              <p style={roleTextStyle}>
                Live orders, ready states, and complaint context help owners
                handle peak times without shouting name after name into a noisy
                crowd.
              </p>
              <div style={roleTagRowStyle}>
                <span style={roleTagStyle}>Live orders</span>
                <span style={roleTagStyle}>Inventory-aware menus</span>
                <span style={roleTagStyle}>Complaint replies</span>
              </div>
            </div>

            {/* Admin card */}
            <div
              style={roleCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "perspective(900px) rotateX(6deg) rotateY(0deg) translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 24px 50px rgba(15,23,42,0.95)";
                e.currentTarget.style.borderColor =
                  "rgba(248,250,252,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 14px 36px rgba(15,23,42,0.85)";
                e.currentTarget.style.borderColor =
                  "rgba(148,163,184,0.6)";
              }}
            >
              <div style={roleLabelStyle}>Admin view</div>
              <div style={roleTitleTextStyle}>See the whole ecosystem.</div>
              <p style={roleTextStyle}>
                Admins can compare canteens, track complaint patterns, and
                enforce standards using real data instead of WhatsApp rumours.
              </p>
              <div style={roleTagRowStyle}>
                <span style={roleTagStyle}>Cross-canteen stats</span>
                <span style={roleTagStyle}>Complaint trends</span>
                <span style={roleTagStyle}>Policy feedback loop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer comes from App.tsx below this */}
    </div>
  );
}

export default HomePage;
