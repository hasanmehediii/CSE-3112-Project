import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";   // ✅ no /pages

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
