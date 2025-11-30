import { type FormEvent, useEffect, useState } from "react";
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

const inputStyle: CSSProperties = {
  padding: "6px 8px",
  borderRadius: "4px",
  border: "1px solid #d1d5db",
  fontSize: "0.9rem",
  marginRight: "6px",
  marginBottom: "6px",
  width: "100%",
  maxWidth: "400px",
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: "70px",
};

const buttonStyle: CSSProperties = {
  padding: "6px 10px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem",
  marginTop: "8px",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const rowStyle: CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  padding: "6px 0",
  fontSize: "0.9rem",
};

const messageStyle: CSSProperties = {
  fontSize: "0.85rem",
  marginTop: "6px",
};

function StudentComplaintsPage() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [canteenId, setCanteenId] = useState("");
  const [mealId, setMealId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [complainText, setComplainText] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const loadComplaints = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await apiRequest("/complaints/me", {}, token);
      setComplaints(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setMessage(null);

    if (!canteenId || !complainText.trim()) {
      setMessage("Canteen ID and message are required.");
      return;
    }

    try {
      const body = {
        canteen_id: Number(canteenId),
        meal_id: mealId ? Number(mealId) : null,
        order_id: orderId ? Number(orderId) : null,
        message: complainText.trim(),
      };
      await apiRequest(
        "/complaints/",
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        token
      );
      setMessage("Complaint submitted.");
      setCanteenId("");
      setMealId("");
      setOrderId("");
      setComplainText("");
      await loadComplaints();
    } catch (err: any) {
      setMessage(err.message || "Failed to submit complaint");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <div style={titleStyle}>My Complaints</div>
        <div style={smallTextStyle}>
          You can submit complaints about a canteen or a specific meal/order.
        </div>
        {message && (
          <div
            style={{
              ...messageStyle,
              color: message.includes("Failed") ? "#b91c1c" : "#15803d",
            }}
          >
            {message}
          </div>
        )}
      </div>

      <div style={sectionStyle}>
        <div style={titleStyle}>Submit a Complaint</div>
        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            placeholder="Canteen ID (required)"
            value={canteenId}
            onChange={(e) => setCanteenId(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Meal ID (optional)"
            value={mealId}
            onChange={(e) => setMealId(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Order ID (optional)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <textarea
            style={textareaStyle}
            placeholder="Write your complaint..."
            value={complainText}
            onChange={(e) => setComplainText(e.target.value)}
          />
          <button style={buttonStyle} type="submit">
            Submit
          </button>
        </form>
      </div>

      <div style={sectionStyle}>
        <div style={titleStyle}>Complaint History</div>
        {loading && <div style={smallTextStyle}>Loading complaints...</div>}
        {!loading && complaints.length === 0 && (
          <div style={smallTextStyle}>You have not submitted any complaints yet.</div>
        )}
        {complaints.map((c) => (
          <div key={c.id} style={rowStyle}>
            <div>
              <strong>#{c.id}</strong> – {c.message}
            </div>
            <div style={smallTextStyle}>
              Canteen: {c.canteen_id ?? "-"} • Meal: {c.meal_id ?? "-"} • Order:{" "}
              {c.order_id ?? "-"} • Status: {c.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentComplaintsPage;
