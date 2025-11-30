// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode, CSSProperties } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/StudentDashboard";
import CanteenDashboard from "./pages/CanteenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CanteenProfile from "./pages/CanteenProfile";
import { useAuth } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import CanteenComplaints from "./pages/CanteenComplaints";
import CanteenOrders from "./pages/CanteenOrders";
import StudentProfilePage from "./pages/StudentProfile";
import StudentComplaintsPage from "./pages/StudentComplaints";
import HomePage from "./pages/Home";        // ⬅️ new
import Footer from "./components/Footer";   // ⬅️ new

function RequireAuth({
  children,
  role,
}: {
  children: ReactNode;
  role?: "student" | "canteen" | "admin";
}) {
  const { token, userRole } = useAuth();

  // Not logged in at all → go to login
  if (!token) return <Navigate to="/login" replace />;

  // Token exists, but role-based info not ready yet → show small loading state
  if (role && !userRole) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          fontSize: "0.95rem",
          color: "#6b7280",
        }}
      >
        Loading your dashboard...
      </div>
    );
  }

  // Now userRole is known – enforce correct role
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}


const appWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#f6f7fb",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: "flex",
  flexDirection: "column",
};

function App() {
  return (
    <div style={appWrapperStyle}>
      <NavBar />
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/student"
          element={
            <RequireAuth role="student">
              <StudentDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/student/profile"
          element={
            <RequireAuth role="student">
              <StudentProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/student/complaints"
          element={
            <RequireAuth role="student">
              <StudentComplaintsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/canteen"
          element={
            <RequireAuth role="canteen">
              <CanteenDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/canteen/orders"
          element={
            <RequireAuth role="canteen">
              <CanteenOrders />
            </RequireAuth>
          }
        />
        <Route
          path="/canteen/profile"
          element={
            <RequireAuth role="canteen">
              <CanteenProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/canteen/complaints"
          element={
            <RequireAuth role="canteen">
              <CanteenComplaints />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <AdminDashboard />
            </RequireAuth>
          }
        />

        {/* Any unknown route -> go to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global footer */}
      <Footer />
    </div>
  );
}

export default App;
