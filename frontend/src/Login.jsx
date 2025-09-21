import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === form.email && u.password === form.password
    );
    if (found) {
      setMessage("Login successful!");
    } else {
      setMessage("Invalid email or password.");
    }
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
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2563eb" }}>Login</h2>
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
          Login
        </button>
        {message && <div style={{ color: message.includes("success") ? "#16a34a" : "#e11d48", marginTop: "1rem", textAlign: "center" }}>{message}</div>}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#2563eb", fontWeight: "bold", textDecoration: "underline" }}>
            Sign Up
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