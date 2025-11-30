// src/pages/CanteenOrders.tsx
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

type Order = {
  id: number;
  student_id: number;
  canteen_id: number;
  total_price: number;
  status: string;
  mode: string;
  address?: string | null;
  created_at: string;
};

// Page wrapper with subtle grid background
const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "120px 16px 40px", // space for navbar
  // Layered background: radial highlight + grid
  backgroundImage:
    "radial-gradient(circle at top, rgba(251, 146, 60, 0.16), transparent 55%), " +
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
  padding: "16px 18px 14px",
  marginBottom: "14px",
  borderRadius: "18px",
  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.12)",
  border: "1px solid #e5e7eb",
};

const headerTitleStyle: CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 650,
  marginBottom: "4px",
  color: "#111827",
};

const headerSubtitleStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#6b7280",
};

const messageStyle: CSSProperties = {
  fontSize: "0.85rem",
  marginTop: "8px",
};

const listCardStyle: CSSProperties = {
  ...cardStyle,
  paddingTop: "14px",
};

const rowStyle: CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  padding: "10px 0",
  fontSize: "0.9rem",
};

const rowTopStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const labelStyle: CSSProperties = {
  fontSize: "0.78rem",
  color: "#4b5563",
  marginRight: "4px",
};

const selectStyle: CSSProperties = {
  padding: "6px 8px",
  borderRadius: "999px",
  border: "1px solid #d1d5db",
  fontSize: "0.8rem",
  marginRight: "6px",
  outline: "none",
  backgroundColor: "white",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const buttonStyle: CSSProperties = {
  padding: "6px 10px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: 500,
  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
  transition:
    "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
};

const footerRowStyle: CSSProperties = {
  marginTop: "6px",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "6px",
};

const statusBadgeStyle = (status: string): CSSProperties => {
  let bg = "#e5e7eb";
  let color = "#374151";
  if (status === "pending") {
    bg = "#fef3c7";
    color = "#92400e";
  } else if (status === "accepted") {
    bg = "#dcfce7";
    color = "#166534";
  } else if (status === "rejected") {
    bg = "#fee2e2";
    color = "#991b1b";
  } else if (status === "completed") {
    bg = "#e0e7ff";
    color = "#3730a3";
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

function CanteenOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [statusMap, setStatusMap] = useState<Record<number, string>>({});

  const loadOrders = async () => {
    if (!token) return;
    setLoading(true);
    setMessage(null);
    try {
      const data = (await apiRequest("/orders/canteen", {}, token)) as Order[];
      setOrders(data);
      const map: Record<number, string> = {};
      data.forEach((o) => {
        map[o.id] = o.status;
      });
      setStatusMap(map);
    } catch (err: any) {
      console.error("Error loading /orders/canteen:", err);
      setMessage(err.message || "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleStatusChange = (orderId: number, value: string) => {
    setStatusMap((prev) => ({ ...prev, [orderId]: value }));
  };

  const handleUpdateStatus = async (orderId: number) => {
    if (!token) return;
    const newStatus = statusMap[orderId];
    if (!newStatus) return;

    setMessage(null);
    try {
      await apiRequest(
        `/orders/${orderId}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        },
        token
      );
      setMessage(`Order #${orderId} status updated.`);
      await loadOrders();
    } catch (err: any) {
      setMessage(err.message || "Failed to update order");
    }
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={innerStyle}>
        {/* Header Card */}
        <div style={cardStyle}>
          <div style={headerTitleStyle}>Orders for My Canteen</div>
          <div style={headerSubtitleStyle}>
            View and manage orders placed by students. Update statuses as you
            process them.
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

        {/* Orders List Card */}
        <div style={listCardStyle}>
          {loading && <div style={smallTextStyle}>Loading orders...</div>}

          {!loading && orders.length === 0 && !message && (
            <div style={smallTextStyle}>No orders found for your canteen.</div>
          )}

          {!loading && orders.length === 0 && message && (
            <div style={smallTextStyle}>
              Couldn&apos;t load orders: {message}
            </div>
          )}

          {!loading &&
            orders.map((o) => (
              <div key={o.id} style={rowStyle}>
                <div style={rowTopStyle}>
                  <div>
                    <div>
                      <strong>Order #{o.id}</strong>{" "}
                      <span style={statusBadgeStyle(o.status)}>{o.status}</span>
                    </div>
                    <div style={smallTextStyle}>
                      Student: {o.student_id} • Mode: {o.mode}
                      {o.address && ` • Address: ${o.address}`}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div>
                      <strong>৳ {o.total_price}</strong>
                    </div>
                    <div style={smallTextStyle}>
                      {new Date(o.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div style={footerRowStyle}>
                  <span style={labelStyle}>Update status:</span>
                  <select
                    style={selectStyle}
                    value={statusMap[o.id] || o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#2563eb";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 1px rgba(37, 99, 235, 0.35)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="pending">pending</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                    <option value="completed">completed</option>
                  </select>
                  <button
                    style={buttonStyle}
                    type="button"
                    onClick={() => handleUpdateStatus(o.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#1d4ed8";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 26px rgba(37, 99, 235, 0.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#2563eb";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(37, 99, 235, 0.35)";
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CanteenOrders;
