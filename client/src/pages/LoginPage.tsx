import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

const containerStyle: React.CSSProperties = {
  maxWidth: "400px",
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

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  fontWeight: 500,
  cursor: "pointer",
  marginTop: "5px",
};

const errorStyle: React.CSSProperties = {
  color: "#b91c1c",
  fontSize: "0.85rem",
  marginBottom: "10px",
};

function LoginPage() {
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const { login, userRole } = useAuth();
  const navigate = useNavigate();

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
      login(res.access_token);

      // redirect based on role
      if (userRole === "student") navigate("/student");
      else if (userRole === "canteen") navigate("/canteen");
      else if (userRole === "admin") navigate("/admin");
      else navigate("/student");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Login</h2>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={buttonStyle} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
