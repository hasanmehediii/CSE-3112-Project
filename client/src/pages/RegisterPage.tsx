// src/pages/RegisterPage.tsx
import {
  type FormEvent,
  useState,
  type CSSProperties,
  type FocusEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, getErrorMessage } from "../api";

/* ── Reuse the same keyframes injected by LoginPage ── */
const STYLE_ID = "auth-keyframes";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes auth-fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes auth-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes auth-glow   { 0%,100%{opacity:.45} 50%{opacity:.8} }
    .auth-input:focus { border-color:#ea580c !important; box-shadow:0 0 0 3px rgba(234,88,12,.18) !important; }
    .auth-btn:hover { transform:translateY(-2px) !important; box-shadow:0 20px 40px rgba(234,88,12,.55) !important; }
  `;
  document.head.appendChild(s);
}

/* ── Tokens ── */
const brand   = "#ea580c";
const brandLt = "#f97316";

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "100px 20px 48px",
  background: "linear-gradient(170deg, #0f172a 0%, #0c0f1a 50%, #1a0f0a 100%)",
  position: "relative",
  overflow: "hidden",
};

const orbStyle = (top: string, left: string, size: number, color: string, delay: string): CSSProperties => ({
  position: "absolute", top, left,
  width: size, height: size, borderRadius: "50%",
  background: `radial-gradient(circle, ${color}, transparent 65%)`,
  animation: `auth-float 8s ease-in-out infinite ${delay}`,
  pointerEvents: "none",
});

const cardStyle: CSSProperties = {
  width: "100%",
  maxWidth: 520,
  padding: "32px 28px 28px",
  borderRadius: 22,
  background: "rgba(15,23,42,.85)",
  border: "1px solid rgba(148,163,184,.12)",
  boxShadow: "0 40px 80px rgba(0,0,0,.5)",
  backdropFilter: "blur(24px)",
  color: "#e2e8f0",
  position: "relative",
  zIndex: 1,
  animation: "auth-fadeUp .6s both",
};

const labelStyle: CSSProperties = {
  fontSize: ".8rem",
  fontWeight: 600,
  color: "#94a3b8",
  marginBottom: 6,
  display: "block",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 12,
  border: "1px solid rgba(148,163,184,.15)",
  fontSize: ".88rem",
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
  background: "rgba(0,0,0,.25)",
  color: "#e2e8f0",
};

const btnStyle: CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 999,
  border: "none",
  background: `linear-gradient(135deg, ${brandLt}, ${brand})`,
  color: "white",
  fontWeight: 700,
  fontSize: ".95rem",
  cursor: "pointer",
  marginTop: 12,
  boxShadow: `0 14px 32px rgba(234,88,12,.4)`,
  transition: "transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s",
};

const errorStyle: CSSProperties = {
  padding: "10px 14px",
  borderRadius: 12,
  background: "rgba(127,29,29,.35)",
  border: "1px solid rgba(248,113,113,.35)",
  color: "#fca5a5",
  fontSize: ".82rem",
  marginBottom: 16,
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "14px 18px",
  marginTop: 4,
};

const fieldStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dept, setDept] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const body = {
        name,
        email,
        password,
        registration_no: registrationNo || undefined,
        dept: dept || undefined,
      };
      await apiRequest(
        "/users/register",
        { method: "POST", body: JSON.stringify(body) },
        null,
      );
      navigate("/login");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Registration failed"));
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = brand;
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(234,88,12,.18)";
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(148,163,184,.15)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={pageStyle}>
      {/* Decorative orbs */}
      <div style={orbStyle("70%", "-30px", 350, "rgba(234,88,12,.12)", "0s")} />
      <div style={orbStyle("-40px", "70%", 280, "rgba(99,102,241,.1)", "3s")} />

      <div style={cardStyle}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" alt="KhaiKhai" style={{ width: 32, height: 32, borderRadius: "50%" }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: ".92rem", color: "white" }}>KhaiKhai</div>
              <div style={{ fontSize: ".7rem", color: "#64748b" }}>Campus meal planner</div>
            </div>
          </div>
          <span style={{
            fontSize: ".68rem", padding: "3px 10px", borderRadius: 999,
            border: "1px solid rgba(148,163,184,.12)",
            color: "#64748b", background: "rgba(0,0,0,.2)",
          }}>Create account</span>
        </div>

        {/* Header */}
        <div style={{ fontSize: ".72rem", textTransform: "uppercase" as const, letterSpacing: ".12em", color: "#64748b", marginBottom: 4 }}>
          Get started
        </div>
        <h2 style={{
          margin: "0 0 4px", fontSize: "1.5rem", fontWeight: 750,
          background: `linear-gradient(135deg, ${brandLt}, #fb923c)`,
          WebkitBackgroundClip: "text", color: "transparent",
        }}>
          Sign up for KhaiKhai
        </h2>
        <p style={{ margin: "0 0 20px", fontSize: ".84rem", color: "#64748b", lineHeight: 1.5 }}>
          Create your student account to browse and order campus meals.
        </p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={gridStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="name">Full name</label>
              <input
                id="name" className="auth-input" style={inputStyle}
                placeholder="Your full name"
                value={name} onChange={(e) => setName(e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="email">Email</label>
              <input
                id="email" className="auth-input" style={inputStyle}
                type="email" placeholder="you@gmail.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="password">Password</label>
              <input
                id="password" className="auth-input" style={inputStyle}
                type="password" placeholder="Create a strong password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur}
                minLength={8} required
              />
              <div style={{ fontSize: ".72rem", color: "#475569", marginTop: 4 }}>
                At least 8 characters with a letter and number.
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="reg">Registration no</label>
              <input
                id="reg" className="auth-input" style={inputStyle}
                placeholder="e.g. 2021123456"
                value={registrationNo} onChange={(e) => setRegistrationNo(e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="dept">Department</label>
              <input
                id="dept" className="auth-input" style={inputStyle}
                placeholder="e.g. CSE, EEE"
                value={dept} onChange={(e) => setDept(e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur}
              />
            </div>
          </div>

          <button className="auth-btn" style={btnStyle} type="submit">
            Create account
          </button>

          <div style={{
            marginTop: 14, fontSize: ".78rem", color: "#64748b", textAlign: "right" as const,
          }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: brandLt, textDecoration: "none", fontWeight: 600 }}>
              Log in →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
