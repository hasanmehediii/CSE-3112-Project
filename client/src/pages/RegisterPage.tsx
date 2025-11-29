import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

const containerStyle: React.CSSProperties = {
  maxWidth: "450px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
};

const titleStyle: React.CSSProperties = {
  marginBottom: "10px",
  fontSize: "1.4rem",
  fontWeight: 600,
  textAlign: "center",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid #d1d5db",
  fontSize: "0.9rem",
};

const selectStyle = inputStyle;

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#16a34a",
  color: "white",
  fontWeight: 500,
  cursor: "pointer",
};

const errorStyle: React.CSSProperties = {
  color: "#b91c1c",
  fontSize: "0.85rem",
  marginBottom: "10px",
};

function RegisterPage() {
  const [name, setName] = useState("Test User");
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

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Register</h2>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          style={selectStyle as React.CSSProperties}
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
        >
          <option value="student">Student</option>
          <option value="canteen">Canteen Owner</option>
          <option value="admin">Admin</option>
        </select>

        {role === "student" && (
          <>
            <input
              style={inputStyle}
              placeholder="Registration No"
              value={registrationNo}
              onChange={(e) => setRegistrationNo(e.target.value)}
            />
            <input
              style={inputStyle}
              placeholder="Department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />
          </>
        )}

        {role === "canteen" && (
          <>
            <input
              style={inputStyle}
              placeholder="Canteen Name"
              value={canteenName}
              onChange={(e) => setCanteenName(e.target.value)}
            />
            <input
              style={inputStyle}
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </>
        )}

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={buttonStyle} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
