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

function RequireAuth({
  children,
  role,
}: {
  children: ReactNode;
  role?: "student" | "canteen" | "admin";
}) {
  const { token, userRole } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (role && userRole !== role) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

const appWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#f6f7fb",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

function App() {
  return (
    <div style={appWrapperStyle}>
      <NavBar />
      <Routes>
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
          path="/canteen"
          element={
            <RequireAuth role="canteen">
              <CanteenDashboard />
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

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
