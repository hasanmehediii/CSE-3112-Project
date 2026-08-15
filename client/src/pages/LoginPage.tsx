// src/pages/LoginPage.tsx
import { type FormEvent, useState, type CSSProperties, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, getErrorMessage } from "../api";
import { useAuth } from "../context/auth";

/* ── Inject keyframes ── */
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
  maxWidth: 440,
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
  marginTop: 8,
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

const toggleBtnStyle: CSSProperties = {
  position: "absolute",
  right: 10,
  top: "50%",
  transform: "translateY(-50%)",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,.2)",
  padding: "3px 10px",
  fontSize: ".72rem",
  cursor: "pointer",
  background: "rgba(0,0,0,.3)",
  color: "#94a3b8",
  display: "flex",
  alignItems: "center",
  gap: 4,
  transition: "background .15s",
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, userRole, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userRole) return;
    if (userRole === "student") navigate("/student", { replace: true });
    else if (userRole === "canteen") navigate("/canteen", { replace: true });
    else if (userRole === "admin") navigate("/admin", { replace: true });
  }, [token, userRole, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await apiRequest<{ access_token: string }>(
        "/users/login",
        { method: "POST", body: JSON.stringify({ email, password }) },
        null,
      );
      login(res.access_token);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Login failed"));
    }
  };

  return (
    <div style={pageStyle}>
      {/* Decorative orbs */}
      <div style={orbStyle("-60px", "-40px", 400, "rgba(234,88,12,.14)", "0s")} />
      <div style={orbStyle("60%", "75%", 300, "rgba(99,102,241,.1)", "2s")} />

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
          }}>Secure login</span>
        </div>

        {/* Header */}
        <div style={{ fontSize: ".72rem", textTransform: "uppercase" as const, letterSpacing: ".12em", color: "#64748b", marginBottom: 4 }}>
          Welcome back
        </div>
        <h2 style={{
          margin: "0 0 4px", fontSize: "1.5rem", fontWeight: 750,
          background: `linear-gradient(135deg, ${brandLt}, #fb923c)`,
          WebkitBackgroundClip: "text", color: "transparent",
        }}>
          Log in to your account
        </h2>
        <p style={{ margin: "0 0 20px", fontSize: ".84rem", color: "#64748b", lineHeight: 1.5 }}>
          Access your dashboard to manage meals, orders, and complaints.
        </p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle} htmlFor="email">Email address</label>
          <input
            id="email"
            className="auth-input"
            style={{ ...inputStyle, marginBottom: 16 }}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={labelStyle} htmlFor="password">Password</label>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <input
              id="password"
              className="auth-input"
              style={{ ...inputStyle, paddingRight: 80 }}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              style={toggleBtnStyle}
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? "Hide" : "Show"}
              <span aria-hidden="true">{showPassword ? "🙈" : "👁️"}</span>
            </button>
          </div>

          <button className="auth-btn" style={btnStyle} type="submit">
            Sign in
          </button>

          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: 14, fontSize: ".78rem", color: "#64748b",
          }}>
            <span>Use your campus credentials.</span>
            <Link to="/register" style={{ color: brandLt, textDecoration: "none", fontWeight: 600 }}>
              Create account →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
