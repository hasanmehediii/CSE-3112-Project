import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

type Complaint = {
  id: number;
  student_id: number;
  canteen_id?: number | null;
  meal_id?: number | null;
  order_id?: number | null;
  message: string;
  status: string;
};

const pageStyle: React.CSSProperties = {
  maxWidth: "900px",
  margin: "20px auto",
  padding: "10px",
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: "8px",
};

const complaintRowStyle: React.CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  padding: "6px 0",
  fontSize: "0.9rem",
};

const smallTextStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

function AdminDashboard() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const data = await apiRequest("/complaints/all", {}, token);
        setComplaints(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [token]);

  return (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <div style={titleStyle}>Admin Dashboard</div>
        <div style={smallTextStyle}>View all complaints from students.</div>
      </div>

      <div style={sectionStyle}>
        <div style={titleStyle}>Complaints</div>
        {complaints.map((c) => (
          <div key={c.id} style={complaintRowStyle}>
            <div>
              <strong>#{c.id}</strong> – {c.message}
            </div>
            <div style={smallTextStyle}>
              Student: {c.student_id} | Canteen: {c.canteen_id ?? "-"} | Meal:{" "}
              {c.meal_id ?? "-"} | Order: {c.order_id ?? "-"}
            </div>
            <div style={smallTextStyle}>Status: {c.status}</div>
          </div>
        ))}
        {complaints.length === 0 && (
          <div style={smallTextStyle}>No complaints yet.</div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
