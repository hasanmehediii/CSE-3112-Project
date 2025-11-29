import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
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

const pageStyle: CSSProperties = {
  maxWidth: "900px",
  margin: "20px auto",
  padding: "10px",
};

const sectionStyle: CSSProperties = {
  backgroundColor: "white",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const titleStyle: CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: "8px",
};

const complaintRowStyle: CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  padding: "6px 0",
  fontSize: "0.9rem",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

function CanteenComplaints() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    (async () => {
      setLoading(true);
      try {
        const data = await apiRequest("/complaints/canteen", {}, token);
        setComplaints(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <div style={titleStyle}>Complaints About My Canteen</div>
        <div style={smallTextStyle}>
          These are complaints created by students that are linked to your canteen.
        </div>
      </div>

      <div style={sectionStyle}>
        {loading && <div style={smallTextStyle}>Loading complaints...</div>}
        {!loading && complaints.length === 0 && (
          <div style={smallTextStyle}>No complaints found for your canteen.</div>
        )}
        {complaints.map((c) => (
          <div key={c.id} style={complaintRowStyle}>
            <div>
              <strong>#{c.id}</strong> – {c.message}
            </div>
            <div style={smallTextStyle}>
              Student: {c.student_id} | Meal: {c.meal_id ?? "-"} | Order:{" "}
              {c.order_id ?? "-"} | Status: {c.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CanteenComplaints;
