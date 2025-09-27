import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
<<<<<<< Updated upstream
=======
import AboutUs from "./common/AboutUs";
import Contact from "./common/Contact";
import FAQ from "./common/FAQ";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageCanteen from "./admin/activity/ManageCanteen";
import ManageStudents from "./admin/activity/ManageStudents";
import AdminComplains from "./admin/pages/AdminComplains";
import AdminActions from "./admin/pages/AdminActions";
>>>>>>> Stashed changes

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
<<<<<<< Updated upstream
=======
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="canteen" element={<ManageCanteen />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="complains" element={<AdminComplains />} />
        <Route path="actions" element={<AdminActions />} />
      </Route>
>>>>>>> Stashed changes
    </Routes>
  );
}
