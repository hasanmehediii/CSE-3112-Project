// src/pages/RegisterPage.tsx
import {
  type FormEvent,
  useState,
  type CSSProperties,
  type FocusEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "80px 16px 40px", // gap from floating navbar
  background:
    "radial-gradient(circle at top left, rgba(34,197,94,0.26), transparent 52%), " +
    "radial-gradient(circle at bottom right, rgba(37,99,235,0.32), transparent 55%), " +
    "linear-gradient(135deg, #020617, #020617)",
  color: "#e5e7eb",
};

const containerStyle: CSSProperties = {
  width: "100%",
  maxWidth: "520px",
  padding: "22px 22px 24px",
  backgroundColor: "rgba(15, 23, 42, 0.96)",
  borderRadius: "18px",
  border: "1px solid rgba(148,163,184,0.35)",
  boxShadow: "0 34px 80px rgba(15, 23, 42, 0.8)",
  backdropFilter: "blur(18px)",
};

// Brand row (same family as Login)
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
    "conic-gradient(from 200deg, #22c55e, #facc15, #38bdf8, #22c55e)",
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
  color: "#22c55e",
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
  backgroundImage: "linear-gradient(to right, #22c55e, #4ade80)",
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

const baseInputStyle: CSSProperties = {
  width: "100%",
  padding: "9px 11px",
  borderRadius: "9px",
  border: "1px solid #374151",
  fontSize: "0.85rem",
  outline: "none",
  transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  backgroundColor: "#020617",
  color: "#e5e7eb",
};

const inputStyle: CSSProperties = {
  ...baseInputStyle,
};

const selectStyle: CSSProperties = {
  ...baseInputStyle,
  appearance: "none",
  backgroundImage:
    'linear-gradient(45deg, transparent 50%, #9ca3af 50%), linear-gradient(135deg, #9ca3af 50%, transparent 50%)',
  backgroundPosition: "calc(100% - 14px) 50%, calc(100% - 10px) 50%",
  backgroundSize: "4px 4px, 4px 4px",
  backgroundRepeat: "no-repeat",
};

const roleHintStyle: CSSProperties = {
  fontSize: "0.75rem",
  color: "#9ca3af",
  marginTop: "4px",
};

const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "12px 16px",
  marginTop: "4px",
};

const fieldWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const buttonStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "999px",
  border: "none",
  backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "white",
  fontWeight: 600,
  fontSize: "0.95rem",
  cursor: "pointer",
  marginTop: "12px",
  boxShadow: "0 14px 30px rgba(22, 163, 74, 0.55)",
  transition:
    "background-position 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
  backgroundSize: "150% 150%",
  backgroundPosition: "0% 50%",
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

const helperTextStyle: CSSProperties = {
  fontSize: "0.78rem",
  color: "#9ca3af",
  marginTop: "10px",
  textAlign: "right",
};

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"student" | "canteen" | "admin">("student");
  const [password, setPassword] = useState("");
  const [dept, setDept] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [canteenName, setCanteenName] = useState("");
  const [location, setLocation] = useState("");

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const body: any = {
        name,
        email,
        password,
        role,
      };

      if (role === "student") {
        body.registration_no = registrationNo;
        body.dept = dept;
      } else if (role === "canteen") {
        body.canteen_name = canteenName;
        body.location = location;
      }

      await apiRequest(
        "/users/register",
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        null
      );
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.currentTarget.style.borderColor = "#22c55e";
    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(34,197,94,0.5)";
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#374151";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* Brand row (to match Login) */}
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
          <div style={envPillStyle}>Create account</div>
        </div>

        <div style={smallTagStyle}>Get started</div>
        <h2 style={titleStyle}>Sign up for Khaikhai</h2>
        <p style={subtitleStyle}>
          Choose your role and get started with campus meal management.
        </p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={formGridStyle}>
            {/* Name */}
            <div style={fieldWrapperStyle}>
              <label style={labelStyle} htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                style={inputStyle}
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Email */}
            <div style={fieldWrapperStyle}>
              <label style={labelStyle} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                style={inputStyle}
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Role */}
            <div style={fieldWrapperStyle}>
              <label style={labelStyle} htmlFor="role">
                Register as
              </label>
              <select
                id="role"
                style={selectStyle}
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <option value="student">Student</option>
                <option value="canteen">Canteen owner</option>
                <option value="admin">Admin</option>
              </select>
              <div style={roleHintStyle}>
                Students order meals; canteen owners manage menus &amp; orders.
              </div>
            </div>

            {/* Password */}
            <div style={fieldWrapperStyle}>
              <label style={labelStyle} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                style={inputStyle}
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Student extra fields */}
            {role === "student" && (
              <>
                <div style={fieldWrapperStyle}>
                  <label style={labelStyle} htmlFor="reg">
                    Registration no
                  </label>
                  <input
                    id="reg"
                    style={inputStyle}
                    placeholder="e.g. 2021123456"
                    value={registrationNo}
                    onChange={(e) => setRegistrationNo(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <div style={fieldWrapperStyle}>
                  <label style={labelStyle} htmlFor="dept">
                    Department
                  </label>
                  <input
                    id="dept"
                    style={inputStyle}
                    placeholder="e.g. CSE, EEE"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </>
            )}

            {/* Canteen extra fields */}
            {role === "canteen" && (
              <>
                <div style={fieldWrapperStyle}>
                  <label style={labelStyle} htmlFor="canteenName">
                    Canteen name
                  </label>
                  <input
                    id="canteenName"
                    style={inputStyle}
                    placeholder="e.g. TSC Cafeteria"
                    value={canteenName}
                    onChange={(e) => setCanteenName(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <div style={fieldWrapperStyle}>
                  <label style={labelStyle} htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    style={inputStyle}
                    placeholder="e.g. TSC, Dhaka University"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </>
            )}
          </div>

          <button
            style={buttonStyle}
            type="submit"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 18px 36px rgba(22,163,74,0.7)";
              (e.currentTarget as HTMLButtonElement).style.backgroundPosition =
                "100% 50%";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 14px 30px rgba(22,163,74,0.55)";
              (e.currentTarget as HTMLButtonElement).style.backgroundPosition =
                "0% 50%";
            }}
          >
            Register
          </button>

          <div style={helperTextStyle}>
            Already have an account?{" "}
            <span
              style={{
                color: "#f97316",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
