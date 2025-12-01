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
  padding: "120px 16px 40px", // gap from floating navbar
  backgroundImage:
    'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(254,243,231,0.8)), url("/background.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const containerStyle: CSSProperties = {
  width: "100%",
  maxWidth: "520px",
  padding: "28px 26px 24px",
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
  backgroundImage: "linear-gradient(to right, #16a34a, #22c55e)",
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

const baseInputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const inputStyle: CSSProperties = {
  ...baseInputStyle,
};

const selectStyle: CSSProperties = {
  ...baseInputStyle,
  appearance: "none",
  backgroundImage:
    'linear-gradient(45deg, transparent 50%, #6b7280 50%), linear-gradient(135deg, #6b7280 50%, transparent 50%)',
  backgroundPosition: "calc(100% - 14px) 50%, calc(100% - 10px) 50%",
  backgroundSize: "4px 4px, 4px 4px",
  backgroundRepeat: "no-repeat",
};

const roleHintStyle: CSSProperties = {
  fontSize: "0.78rem",
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
  backgroundColor: "#16a34a",
  color: "white",
  fontWeight: 600,
  fontSize: "0.95rem",
  cursor: "pointer",
  marginTop: "12px",
  boxShadow: "0 10px 25px rgba(22, 163, 74, 0.35)",
  transition:
    "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
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

const helperTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
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
    e.currentTarget.style.borderColor = "#16a34a";
    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(22, 163, 74, 0.35)";
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#d1d5db";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={smallTagStyle}>Create account</div>
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
                Full Name
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
                <option value="canteen">Canteen Owner</option>
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
                    Registration No
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
                    Canteen Name
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
              e.currentTarget.style.backgroundColor = "#15803d";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 14px 30px rgba(22, 163, 74, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#16a34a";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(22, 163, 74, 0.35)";
            }}
          >
            Register
          </button>

          <div style={helperTextStyle}>
            Already have an account? Log in from the top menu.
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
