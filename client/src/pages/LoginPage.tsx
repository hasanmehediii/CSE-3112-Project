// src/pages/LoginPage.tsx
import { type FormEvent, useState, type CSSProperties, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "80px 16px 40px",
  background:
    "radial-gradient(circle at top left, rgba(249,115,22,0.28), transparent 52%), " +
    "radial-gradient(circle at bottom right, rgba(37,99,235,0.3), transparent 55%), " +
    "linear-gradient(135deg, #020617, #020617)",
  color: "#0f172a",
};

const containerStyle: CSSProperties = {
  width: "100%",
  maxWidth: "480px",
  padding: "22px 22px 24px",
  borderRadius: "18px",
  backgroundColor: "rgba(15, 23, 42, 0.96)",
  border: "1px solid rgba(148,163,184,0.35)",
  boxShadow: "0 34px 80px rgba(15, 23, 42, 0.8)",
  backdropFilter: "blur(18px)",
  color: "#e5e7eb",
};

// Brand row at the top
const brandRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "14px",
};

const brandLeftStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const brandIconStyle: CSSProperties = {
  width: "32px",
  height: "32px",
  borderRadius: "999px",
  background:
    "conic-gradient(from 200deg, #f97316, #facc15, #22c55e, #f97316)",
  padding: "2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const brandIconInnerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: "999px",
  backgroundColor: "#020617",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "#f97316",
};

const brandNameStyle: CSSProperties = {
  fontSize: "0.9rem",
  fontWeight: 600,
};

const brandTagStyle: CSSProperties = {
  fontSize: "0.7rem",
  color: "#9ca3af",
};

const envPillStyle: CSSProperties = {
  fontSize: "0.7rem",
  padding: "3px 8px",
  borderRadius: "999px",
  border: "1px solid rgba(55,65,81,0.9)",
  backgroundColor: "rgba(15,23,42,0.8)",
  color: "#9ca3af",
};

const smallTagStyle: CSSProperties = {
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "#9ca3af",
  marginBottom: "4px",
};

const titleStyle: CSSProperties = {
  marginBottom: "4px",
  fontSize: "1.55rem",
  fontWeight: 700,
  textAlign: "left",
  backgroundImage: "linear-gradient(to right, #f97316, #fb923c)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const subtitleStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#9ca3af",
  marginBottom: "16px",
};

const labelStyle: CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 500,
  color: "#e5e7eb",
  marginBottom: "4px",
  display: "block",
};

const inputStyleBase: CSSProperties = {
  width: "100%",
  padding: "9px 11px",
  marginBottom: "12px",
  borderRadius: "9px",
  border: "1px solid #374151",
  fontSize: "0.85rem",
  outline: "none",
  transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  backgroundColor: "#020617",
  color: "#e5e7eb",
};

const buttonStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "999px",
  border: "none",
  backgroundImage: "linear-gradient(135deg, #f97316, #ea580c)",
  color: "white",
  fontWeight: 600,
  fontSize: "0.95rem",
  cursor: "pointer",
  marginTop: "6px",
  boxShadow: "0 14px 28px rgba(249, 115, 22, 0.55)",
  transition:
    "background-position 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
  backgroundSize: "150% 150%",
  backgroundPosition: "0% 50%",
};

const helperRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.78rem",
  color: "#9ca3af",
  marginTop: "8px",
};

const errorStyle: CSSProperties = {
  color: "#fecaca",
  fontSize: "0.8rem",
  marginBottom: "12px",
  padding: "8px 10px",
  borderRadius: "8px",
  backgroundColor: "rgba(127, 29, 29, 0.4)",
  border: "1px solid rgba(248, 113, 113, 0.6)",
};

const passwordWrapperStyle: CSSProperties = {
  position: "relative",
  marginBottom: "12px",
};

const passwordInputStyle: CSSProperties = {
  ...inputStyleBase,
  paddingRight: "82px",
  marginBottom: 0,
};

const toggleButtonStyle: CSSProperties = {
  position: "absolute",
  right: "8px",
  top: "50%",
  transform: "translateY(-50%)",
  borderRadius: "999px",
  border: "1px solid #4b5563",
  padding: "3px 9px",
  fontSize: "0.72rem",
  cursor: "pointer",
  backgroundColor: "#020617",
  color: "#d1d5db",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  transition: "background-color 0.15s, border-color 0.15s, transform 0.12s",
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, userRole, token } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect AFTER token + role are known
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
      const res = await apiRequest(
        "/users/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
        null
      );

      // Just set the token; role will be loaded by AuthContext
      login(res.access_token);
      // ⬆️ No navigate here based on stale userRole
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* Brand row */}
        <div style={brandRowStyle}>
          <div style={brandLeftStyle}>
            <div style={brandIconStyle}>
              <div style={brandIconInnerStyle}>K</div>
            </div>
            <div>
              <div style={brandNameStyle}>Khaikhai</div>
              <div style={brandTagStyle}>Campus meal planner</div>
            </div>
          </div>
          <div style={envPillStyle}>Secure login</div>
        </div>

        <div style={smallTagStyle}>Welcome back</div>
        <h2 style={titleStyle}>Log in to your account</h2>
        <p style={subtitleStyle}>
          Access your dashboard to manage meals, orders, and complaints in one
          place.
        </p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            style={inputStyleBase}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#f97316";
              e.currentTarget.style.boxShadow =
                "0 0 0 1px rgba(249,115,22,0.6)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#374151";
              e.currentTarget.style.boxShadow = "none";
            }}
          />

          <label style={labelStyle} htmlFor="password">
            Password
          </label>
          <div style={passwordWrapperStyle}>
            <input
              id="password"
              style={passwordInputStyle}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#f97316";
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px rgba(249,115,22,0.6)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#374151";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              type="button"
              style={toggleButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#111827";
                e.currentTarget.style.borderColor = "#6b7280";
                e.currentTarget.style.transform = "translateY(-50%) translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#020617";
                e.currentTarget.style.borderColor = "#4b5563";
                e.currentTarget.style.transform = "translateY(-50%)";
              }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
              <span aria-hidden="true">{showPassword ? "🙈" : "👁️"}</span>
            </button>
          </div>

          <button
            style={buttonStyle}
            type="submit"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 18px 34px rgba(249,115,22,0.7)";
              (e.currentTarget as HTMLButtonElement).style.backgroundPosition =
                "100% 50%";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 14px 28px rgba(249,115,22,0.55)";
              (e.currentTarget as HTMLButtonElement).style.backgroundPosition =
                "0% 50%";
            }}
          >
            Login
          </button>

          <div style={helperRowStyle}>
            <span>Use your campus account credentials.</span>
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#f97316",
              }}
              // onClick={() => navigate("/forgot-password")}
            >
              Forgot?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
