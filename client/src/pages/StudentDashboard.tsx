import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

type Meal = {
  id: number;
  name: string;
  price: number;
  canteen_id: number;
  quantity: number;
  image_url?: string | null;
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

const mealRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6px 0",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "0.9rem",
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

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const thumbStyle: CSSProperties = {
  width: "50px",
  height: "50px",
  objectFit: "cover",
  borderRadius: "6px",
  marginRight: "8px",
};

const leftBlockStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
};

function StudentDashboard() {
  const { token } = useAuth();
  const [availableMeals, setAvailableMeals] = useState<Meal[]>([]);
  const [budgetDeals, setBudgetDeals] = useState<Meal[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const meals = await apiRequest("/meals/available", {}, token);
        setAvailableMeals(meals);
        const budget = await apiRequest("/meals/budget", {}, token);
        setBudgetDeals(budget);
      } catch (err: any) {
        console.error(err);
      }
    })();
  }, [token]);

  const handleQuickOrder = async (meal: Meal) => {
    if (!token) return;
    setMessage(null);
    try {
      const body = {
        canteen_id: meal.canteen_id,
        mode: "pickup",
        delivery_address: null,
        items: [
          {
            meal_id: meal.id,
            quantity: 1,
          },
        ],
      };
      const res = await apiRequest(
        "/orders/",
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        token
      );
      setMessage(`Order #${res.id} placed for ${meal.name}`);
    } catch (err: any) {
      setMessage(err.message || "Could not place order");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <div style={titleStyle}>Student Dashboard</div>
        <div style={smallTextStyle}>
          View today’s meals, budget deals, and place quick pickup orders.
        </div>
        {message && (
          <div style={{ marginTop: "8px", fontSize: "0.85rem", color: "#15803d" }}>
            {message}
          </div>
        )}
      </div>

      <div style={sectionStyle}>
        <div style={titleStyle}>Today&apos;s Available Meals</div>
        {availableMeals.map((m) => (
          <div key={m.id} style={mealRowStyle}>
            <div style={leftBlockStyle}>
              {m.image_url && (
                <img
                  src={m.image_url}
                  alt={m.name}
                  style={thumbStyle}
                  onError={(e) => {
                    // hide broken image
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div>
                <div>{m.name}</div>
                <div style={smallTextStyle}>Canteen #{m.canteen_id}</div>
              </div>
            </div>
            <div>
              <span style={{ marginRight: "8px" }}>৳ {m.price}</span>
              <button style={buttonStyle} onClick={() => handleQuickOrder(m)}>
                Quick Order
              </button>
            </div>
          </div>
        ))}
        {availableMeals.length === 0 && (
          <div style={smallTextStyle}>No meals available.</div>
        )}
      </div>

      <div style={sectionStyle}>
        <div style={titleStyle}>Budget Deals (Low → High)</div>
        {budgetDeals.map((m) => (
          <div key={m.id} style={mealRowStyle}>
            <div style={leftBlockStyle}>
              {m.image_url && (
                <img
                  src={m.image_url}
                  alt={m.name}
                  style={thumbStyle}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div>
                <div>{m.name}</div>
                <div style={smallTextStyle}>Canteen #{m.canteen_id}</div>
              </div>
            </div>
            <div>৳ {m.price}</div>
          </div>
        ))}
        {budgetDeals.length === 0 && (
          <div style={smallTextStyle}>No meals found.</div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
