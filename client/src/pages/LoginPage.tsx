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
  padding: "120px 16px 40px",
  backgroundImage:
    'linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(254,243,231,0.7)), url("/background.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const containerStyle: CSSProperties = {
  width: "100%",
  maxWidth: "470px",
  padding: "28px 26px",
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  borderRadius: "20px",
  boxShadow: "0 18px 45px rgba(15, 23, 42, 0.16)",
  border: "1px solid #e5e7eb",
};

const smallTagStyle: CSSProperties = {
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#9ca3af",
  marginBottom: "4px",
};

const titleStyle: CSSProperties = {
  marginBottom: "4px",
  fontSize: "1.7rem",
  fontWeight: 700,
  textAlign: "left",
  backgroundImage: "linear-gradient(to right, #f97316, #ea580c)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const subtitleStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "#6b7280",
  marginBottom: "18px",
};

const labelStyle: CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "4px",
  display: "block",
};

const inputStyleBase: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const buttonStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#f97316",
  color: "white",
  fontWeight: 600,
  fontSize: "0.95rem",
  cursor: "pointer",
  marginTop: "6px",
  boxShadow: "0 10px 25px rgba(249, 115, 22, 0.35)",
  transition:
    "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
};

const helperRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.8rem",
  color: "#6b7280",
  marginTop: "8px",
};

const errorStyle: CSSProperties = {
  color: "#b91c1c",
  fontSize: "0.85rem",
  marginBottom: "10px",
  padding: "8px 10px",
  borderRadius: "8px",
  backgroundColor: "#fee2e2",
  border: "1px solid #fecaca",
};

const passwordWrapperStyle: CSSProperties = {
  position: "relative",
  marginBottom: "12px",
};

const passwordInputStyle: CSSProperties = {
  ...inputStyleBase,
  paddingRight: "80px",
  marginBottom: 0,
};

const toggleButtonStyle: CSSProperties = {
  position: "absolute",
  right: "8px",
  top: "50%",
  transform: "translateY(-50%)",
  borderRadius: "999px",
  border: "none",
  padding: "4px 10px",
  fontSize: "0.75rem",
  cursor: "pointer",
  backgroundColor: "#f3f4f6",
  color: "#4b5563",
  display: "flex",
  alignItems: "center",
  gap: "4px",
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
        <div style={smallTagStyle}>Welcome back</div>
        <h2 style={titleStyle}>Log in to Khaikhai</h2>
        <p style={subtitleStyle}>
          Access your dashboard to manage meals, orders, and complaints.
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
                "0 0 0 1px rgba(249, 115, 22, 0.4)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
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
                  "0 0 0 1px rgba(249, 115, 22, 0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              type="button"
              style={toggleButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
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
              e.currentTarget.style.backgroundColor = "#ea580c";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 14px 30px rgba(249, 115, 22, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f97316";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(249, 115, 22, 0.35)";
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
