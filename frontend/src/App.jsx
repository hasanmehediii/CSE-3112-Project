import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import AboutUs from "./common/AboutUs";
import Contact from "./common/Contact";
import FAQ from "./common/FAQ";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
}
