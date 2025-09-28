import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import AboutUs from "./common/AboutUs";
import Contact from "./common/Contact";
import FAQ from "./common/FAQ";
import AdminPage from "./admin/pages/AdminPage";
import CanteenManagement from "./admin/pages/CanteenManagement";
import CanteenDetail from "./admin/pages/CanteenDetail";
import StudentManagement from "./admin/pages/StudentManagement";
import ComplaintManagement from "./admin/pages/ComplaintManagement";
import ComplaintDetail from "./admin/pages/ComplaintDetail";
import ActionManagement from "./admin/pages/ActionManagement";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/canteen" element={<CanteenManagement />} />
      <Route path="/admin/canteen/:canteenId" element={<CanteenDetail />} />
      <Route path="/admin/students" element={<StudentManagement />} />
      <Route path="/admin/complains" element={<ComplaintManagement />} />
      <Route path="/admin/complains/:complaintId" element={<ComplaintDetail />} />
      <Route path="/admin/actions" element={<ActionManagement />} />
    </Routes>
  );
}
