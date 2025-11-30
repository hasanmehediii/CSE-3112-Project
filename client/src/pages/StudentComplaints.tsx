// src/pages/StudentComplaintsPage.tsx
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

const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "120px 16px 40px",
  backgroundImage:
    "radial-gradient(circle at top, rgba(59, 130, 246, 0.16), transparent 55%), " +
    "linear-gradient(#e5e7eb 1px, transparent 1px), " +
    "linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
  backgroundSize: "cover, 32px 32px, 32px 32px",
  backgroundPosition: "center, 0 0, 0 0",
};

const innerStyle: CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
};

const cardStyle: CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  padding: "20px 22px 18px",
  marginBottom: "16px",
  borderRadius: "20px",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.18)",
  border: "1px solid #e5e7eb",
};

const headerTitleStyle: CSSProperties = {
  fontSize: "1.35rem",
  fontWeight: 700,
  marginBottom: "4px",
  backgroundImage: "linear-gradient(to right, #2563eb, #4f46e5)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const headerSubtitleStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "#6b7280",
};

const messageStyle: CSSProperties = {
  fontSize: "0.85rem",
  marginTop: "6px",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

// Form styles
const formCardStyle: CSSProperties = {
  ...cardStyle,
  paddingTop: "18px",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "6px",
  color: "#111827",
};

const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "10px 16px",
  marginTop: "8px",
};

const labelStyle: CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "4px",
  display: "block",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "9px 11px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: "90px",
  resize: "vertical",
};

const formFullWidthStyle: CSSProperties = {
  gridColumn: "1 / -1",
};

const buttonRowStyle: CSSProperties = {
  marginTop: "8px",
  display: "flex",
  justifyContent: "flex-end",
};

const buttonStyle: CSSProperties = {
  padding: "9px 16px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  fontWeight: 600,
  fontSize: "0.9rem",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
  transition:
    "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
};

// History styles
const historyCardStyle: CSSProperties = {
  ...cardStyle,
  paddingTop: "18px",
};

const complaintsListStyle: CSSProperties = {
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const complaintCardStyle: CSSProperties = {
  borderRadius: "16px",
  padding: "10px 12px",
  background:
    "linear-gradient(to right, rgba(249, 250, 251, 1), rgba(239, 246, 255, 1))",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 20px rgba(15, 23, 42, 0.12)",
  fontSize: "0.9rem",
};

const complaintHeaderRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "4px",
};

const complaintIdStyle: CSSProperties = {
  fontWeight: 600,
  color: "#111827",
};

const statusBadgeStyle = (status: string): CSSProperties => {
  let bg = "#e5e7eb";
  let color = "#374151";
  if (status === "open" || status === "pending") {
    bg = "#fef3c7";
    color = "#92400e";
  } else if (status === "resolved" || status === "completed") {
    bg = "#dcfce7";
    color = "#166534";
  } else if (status === "in_progress") {
    bg = "#e0f2fe";
    color = "#075985";
  } else if (status === "rejected") {
    bg = "#fee2e2";
    color = "#991b1b";
  }
  return {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 500,
    backgroundColor: bg,
    color,
    textTransform: "capitalize",
  };
};

const complaintMessageStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "#111827",
  marginBottom: "4px",
};

const complaintMetaStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
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

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.currentTarget.style.borderColor = "#2563eb";
    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(37, 99, 235, 0.35)";
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.currentTarget.style.borderColor = "#d1d5db";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={innerStyle}>
        {/* Header card */}
        <div style={cardStyle}>
          <div style={headerTitleStyle}>My Complaints</div>
          <div style={headerSubtitleStyle}>
            Submit issues about canteens, meals, or specific orders. Track how they’re being handled over time.
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

        {/* Submit complaint */}
        <div style={formCardStyle}>
          <div style={sectionTitleStyle}>Submit a Complaint</div>
          <div style={smallTextStyle}>
            Provide the canteen ID and optionally link a meal or order so admins and canteen owners
            can resolve it faster.
          </div>

          <form onSubmit={handleSubmit}>
            <div style={formGridStyle}>
              <div>
                <label style={labelStyle}>Canteen ID (required)</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. 1"
                  value={canteenId}
                  onChange={(e) => setCanteenId(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Meal ID (optional)</label>
                <input
                  style={inputStyle}
                  placeholder="Meal ID"
                  value={mealId}
                  onChange={(e) => setMealId(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Order ID (optional)</label>
                <input
                  style={inputStyle}
                  placeholder="Order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div style={formFullWidthStyle}>
                <label style={labelStyle}>Complaint message</label>
                <textarea
                  style={textareaStyle}
                  placeholder="Describe what went wrong, including time, meal, and any other details..."
                  value={complainText}
                  onChange={(e) => setComplainText(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div style={buttonRowStyle}>
              <button
                style={buttonStyle}
                type="submit"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1d4ed8";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 30px rgba(37, 99, 235, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2563eb";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(37, 99, 235, 0.35)";
                }}
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>

        {/* Complaint history */}
        <div style={historyCardStyle}>
          <div style={sectionTitleStyle}>Complaint History</div>
          {loading && <div style={smallTextStyle}>Loading complaints...</div>}
          {!loading && complaints.length === 0 && (
            <div style={{ ...smallTextStyle, marginTop: "6px" }}>
              You have not submitted any complaints yet.
            </div>
          )}

          {!loading && complaints.length > 0 && (
            <div style={complaintsListStyle}>
              {complaints.map((c) => (
                <div
                  key={c.id}
                  style={complaintCardStyle}
                >
                  <div style={complaintHeaderRowStyle}>
                    <div style={complaintIdStyle}>Complaint #{c.id}</div>
                    <span style={statusBadgeStyle(c.status)}>{c.status}</span>
                  </div>
                  <div style={complaintMessageStyle}>{c.message}</div>
                  <div style={complaintMetaStyle}>
                    Canteen: {c.canteen_id ?? "-"} • Meal: {c.meal_id ?? "-"} •
                    {" "}Order: {c.order_id ?? "-"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentComplaintsPage;
