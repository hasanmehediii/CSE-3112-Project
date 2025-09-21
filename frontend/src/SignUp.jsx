import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    studentReg: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Sign up successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(120deg, #a8ff78 0%, #78ffd6 100%)",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2.5rem 2rem",
          borderRadius: "1.5rem",
          boxShadow: "0 4px 24px #16a34a22",
          minWidth: "320px",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2563eb" }}>Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={form.username}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="studentReg"
          placeholder="Student Registration"
          value={form.studentReg}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.8rem",
            background: "linear-gradient(90deg, #2563eb 60%, #16a34a 100%)",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "1rem",
            fontSize: "1.1rem",
            marginTop: "1rem",
            cursor: "pointer"
          }}
        >
          Sign Up
        </button>
        {message && <div style={{ color: "#16a34a", marginTop: "1rem", textAlign: "center" }}>{message}</div>}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2563eb", fontWeight: "bold", textDecoration: "underline" }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.7rem",
  margin: "0.5rem 0",
  borderRadius: "0.7rem",
  border: "1px solid #ddd",
  fontSize: "1rem",
};