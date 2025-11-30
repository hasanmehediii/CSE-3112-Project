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

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const rowStyle: CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  padding: "6px 0",
  fontSize: "0.9rem",
};

const labelStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#4b5563",
};

const selectStyle: CSSProperties = {
  padding: "4px 6px",
  borderRadius: "4px",
  border: "1px solid #d1d5db",
  fontSize: "0.8rem",
  marginRight: "6px",
};

const buttonStyle: CSSProperties = {
  padding: "4px 8px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "0.8rem",
};

const messageStyle: CSSProperties = {
  fontSize: "0.85rem",
  marginTop: "6px",
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
    padding: "2px 6px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    backgroundColor: bg,
    color,
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
      console.log("Orders from /orders/canteen:", data); // 🔍 debug
      setOrders(data);
      const map: Record<number, string> = {};
      data.forEach((o) => {
        map[o.id] = o.status;
      });
      setStatusMap(map);
    } catch (err: any) {
      console.error("Error loading /orders/canteen:", err);
      setMessage(err.message || "Failed to load orders");
      setOrders([]); // ensure it's empty on error
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
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <div style={titleStyle}>Orders for My Canteen</div>
        <div style={smallTextStyle}>
          View and manage orders placed by students for your canteen.
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
        {loading && <div style={smallTextStyle}>Loading orders...</div>}
        {!loading && orders.length === 0 && !message && (
          <div style={smallTextStyle}>No orders found for your canteen.</div>
        )}
        {!loading && orders.length === 0 && message && (
          <div style={smallTextStyle}>
            Couldn&apos;t load orders: {message}
          </div>
        )}
        {orders.map((o) => (
          <div key={o.id} style={rowStyle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              <div>
                <div>
                  <strong>৳ {o.total_price}</strong>
                </div>
                <div style={smallTextStyle}>
                  {new Date(o.created_at).toLocaleString()}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "6px" }}>
              <span style={labelStyle}>Update status: </span>
              <select
                style={selectStyle}
                value={statusMap[o.id] || o.status}
                onChange={(e) => handleStatusChange(o.id, e.target.value)}
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
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CanteenOrders;
