// src/pages/StudentDashboard.tsx
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

const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "120px 16px 40px",
  backgroundImage:
    "radial-gradient(circle at top, rgba(251, 146, 60, 0.18), transparent 55%), " +
    "linear-gradient(#e5e7eb 1px, transparent 1px), " +
    "linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
  backgroundSize: "cover, 32px 32px, 32px 32px",
  backgroundPosition: "center, 0 0, 0 0",
};

const innerStyle: CSSProperties = {
  maxWidth: "1000px",
  margin: "0 auto",
};

const cardStyle: CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  padding: "18px 20px 16px",
  marginBottom: "16px",
  borderRadius: "20px",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.18)",
  border: "1px solid #e5e7eb",
};

const headerTitleStyle: CSSProperties = {
  fontSize: "1.2rem",
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

const sectionTitleStyle: CSSProperties = {
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "6px",
  color: "#111827",
};

const messageStyle: CSSProperties = {
  marginTop: "8px",
  fontSize: "0.85rem",
  color: "#15803d",
};

// === Tile grid styles (same flavor as canteen dashboard) ===
const mealsSectionCardStyle: CSSProperties = {
  ...cardStyle,
  paddingTop: "16px",
};

const scrollWrapperStyle: CSSProperties = {
  marginTop: "6px",
  maxHeight: "420px", // ~2 rows visible; will scroll if more
  overflowY: "auto",
  paddingRight: "4px",
};

const mealsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "16px",
};

const mealCardStyle: CSSProperties = {
  borderRadius: "20px",
  backgroundColor: "white",
  boxShadow: "0 20px 45px rgba(15, 23, 42, 0.22)",
  border: "1px solid #e5e7eb",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  minHeight: "260px",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
};

const cardImageWrapperStyle: CSSProperties = {
  width: "100%",
  paddingTop: "60%", // top part ~60% for image
  position: "relative",
  backgroundColor: "#f3f4f6",
};

const cardImageStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const cardImagePlaceholderStyle: CSSProperties = {
  ...cardImageWrapperStyle,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9ca3af",
  fontSize: "0.8rem",
};

const mealBodyStyle: CSSProperties = {
  padding: "10px 12px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  flexGrow: 1,
};

const mealNameStyle: CSSProperties = {
  fontSize: "1rem",
  fontWeight: 650,
  color: "#111827",
};

const mealMetaTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const bottomRowStyle: CSSProperties = {
  marginTop: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
};

const priceStyle: CSSProperties = {
  fontWeight: 700,
  fontSize: "1.05rem",
  color: "#111827",
};

const quickButtonStyle: CSSProperties = {
  padding: "7px 11px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: 500,
  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)",
  whiteSpace: "nowrap",
  transition:
    "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
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
    <div style={pageWrapperStyle}>
      <div style={innerStyle}>
        {/* Header card */}
        <div style={cardStyle}>
          <div style={headerTitleStyle}>Student Dashboard</div>
          <div style={headerSubtitleStyle}>
            View today’s meals, explore budget deals, and place quick pickup orders.
          </div>
          {message && <div style={messageStyle}>{message}</div>}
        </div>

        {/* Today's Available Meals */}
        <div style={mealsSectionCardStyle}>
          <div style={sectionTitleStyle}>Today&apos;s Available Meals</div>
          <div style={smallTextStyle}>
            Fresh meals listed by your campus canteens. Tap Quick Order to place an instant pickup.
          </div>

          <div style={scrollWrapperStyle}>
            {availableMeals.length === 0 && (
              <div style={{ ...smallTextStyle, marginTop: "6px" }}>
                No meals available.
              </div>
            )}

            <div style={mealsGridStyle}>
              {availableMeals.map((m) => (
                <div
                  key={m.id}
                  style={mealCardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 26px 60px rgba(15, 23, 42, 0.28)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 45px rgba(15, 23, 42, 0.22)";
                  }}
                >
                  {m.image_url ? (
                    <div style={cardImageWrapperStyle}>
                      <img
                        src={m.image_url}
                        alt={m.name}
                        style={cardImageStyle}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div style={cardImagePlaceholderStyle}>No image</div>
                  )}

                  <div style={mealBodyStyle}>
                    <div>
                      <div style={mealNameStyle}>{m.name}</div>
                      <div style={mealMetaTextStyle}>
                        Canteen #{m.canteen_id}
                      </div>
                    </div>
                    <div style={bottomRowStyle}>
                      <div style={priceStyle}>৳ {m.price}</div>
                      <button
                        style={quickButtonStyle}
                        type="button"
                        onClick={() => handleQuickOrder(m)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#1d4ed8";
                          e.currentTarget.style.transform = "translateY(-1px)";
                          e.currentTarget.style.boxShadow =
                            "0 12px 26px rgba(37, 99, 235, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#2563eb";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 20px rgba(37, 99, 235, 0.3)";
                        }}
                      >
                        Quick Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Deals */}
        <div style={mealsSectionCardStyle}>
          <div style={sectionTitleStyle}>Budget Deals (Low → High)</div>
          <div style={smallTextStyle}>
            Wallet-friendly meals sorted by price so you can eat well on a budget.
          </div>

          <div style={scrollWrapperStyle}>
            {budgetDeals.length === 0 && (
              <div style={{ ...smallTextStyle, marginTop: "6px" }}>
                No meals found.
              </div>
            )}

            <div style={mealsGridStyle}>
              {budgetDeals.map((m) => (
                <div
                  key={m.id}
                  style={mealCardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 26px 60px rgba(15, 23, 42, 0.28)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 45px rgba(15, 23, 42, 0.22)";
                  }}
                >
                  {m.image_url ? (
                    <div style={cardImageWrapperStyle}>
                      <img
                        src={m.image_url}
                        alt={m.name}
                        style={cardImageStyle}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div style={cardImagePlaceholderStyle}>No image</div>
                  )}

                  <div style={mealBodyStyle}>
                    <div>
                      <div style={mealNameStyle}>{m.name}</div>
                      <div style={mealMetaTextStyle}>
                        Canteen #{m.canteen_id}
                      </div>
                    </div>
                    <div style={bottomRowStyle}>
                      <div style={priceStyle}>৳ {m.price}</div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#16a34a",
                          fontWeight: 500,
                        }}
                      >
                        Budget pick
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
