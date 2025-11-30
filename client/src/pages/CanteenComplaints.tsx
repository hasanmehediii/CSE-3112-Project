// src/pages/CanteenComplaints.tsx
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

const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "120px 16px 40px",
  backgroundImage:
    "radial-gradient(circle at top, rgba(52, 211, 153, 0.18), transparent 55%), " +
    "linear-gradient(#e5e7eb 1px, transparent 1px), " +
    "linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
  backgroundSize: "cover, 32px 32px, 32px 32px",
  backgroundPosition: "center, 0 0, 0 0",
};

const innerStyle: CSSProperties = {
  maxWidth: "900px",
  margin: "0 auto",
};

const cardStyle: CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  padding: "18px 20px 16px",
  marginBottom: "14px",
  borderRadius: "18px",
  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.10)",
  border: "1px solid #e5e7eb",
};

const headerTitleStyle: CSSProperties = {
  fontSize: "1.15rem",
  fontWeight: 650,
  marginBottom: "4px",
  color: "#111827",
};

const headerSubtitleStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#6b7280",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const listCardStyle: CSSProperties = {
  ...cardStyle,
  paddingTop: "16px",
};

const complaintRowStyle: CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  padding: "10px 0",
  fontSize: "0.9rem",
};

const rowTopStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
};

const messageTextStyle: CSSProperties = {
  fontSize: "0.92rem",
  color: "#111827",
};

const metaTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
  marginTop: "4px",
};

const idPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: "999px",
  fontSize: "0.75rem",
  backgroundColor: "#eff6ff",
  color: "#1d4ed8",
  fontWeight: 500,
};

const statusBadgeStyle = (status: string): CSSProperties => {
  let bg = "#e5e7eb";
  let color = "#374151";
  if (status === "open") {
    bg = "#fef3c7";
    color = "#92400e";
  } else if (status === "in_progress") {
    bg = "#e0f2fe";
    color = "#075985";
  } else if (status === "resolved") {
    bg = "#dcfce7";
    color = "#166534";
  } else if (status === "closed") {
    bg = "#e5e7eb";
    color = "#374151";
  }
  return {
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 500,
    backgroundColor: bg,
    color,
    textTransform: "capitalize",
  };
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
        const data = (await apiRequest(
          "/complaints/canteen",
          {},
          token
        )) as Complaint[];
        setComplaints(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <div style={pageWrapperStyle}>
      <div style={innerStyle}>
        {/* Header Card */}
        <div style={cardStyle}>
          <div style={headerTitleStyle}>Complaints About My Canteen</div>
          <div style={headerSubtitleStyle}>
            These complaints were submitted by students and are linked to your
            canteen&apos;s meals and orders.
          </div>
        </div>

        {/* Complaints List */}
        <div style={listCardStyle}>
          {loading && <div style={smallTextStyle}>Loading complaints...</div>}

          {!loading && complaints.length === 0 && (
            <div style={smallTextStyle}>
              No complaints found for your canteen. 🎉
            </div>
          )}

          {!loading &&
            complaints.map((c) => (
              <div key={c.id} style={complaintRowStyle}>
                <div style={rowTopStyle}>
                  <div>
                    <div style={{ marginBottom: "4px" }}>
                      <span style={idPillStyle}>Complaint #{c.id}</span>{" "}
                      <span style={{ marginLeft: "8px" }}>
                        <span style={statusBadgeStyle(c.status)}>
                          {c.status}
                        </span>
                      </span>
                    </div>
                    <div style={messageTextStyle}>{c.message}</div>
                    <div style={metaTextStyle}>
                      Student: {c.student_id} • Meal: {c.meal_id ?? "-"} •
                      Order: {c.order_id ?? "-"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CanteenComplaints;
