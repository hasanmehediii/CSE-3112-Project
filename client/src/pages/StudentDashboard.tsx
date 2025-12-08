// src/pages/StudentDashboard.tsx
import { useEffect, useState, type CSSProperties } from "react";
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

// ===================== Layout & Base Styles =====================
const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "110px 16px 40px",
  backgroundImage:
    "radial-gradient(circle at top, rgba(59, 130, 246, 0.12), transparent 55%), " +
    "radial-gradient(circle at bottom, rgba(251, 146, 60, 0.12), transparent 60%), " +
    "linear-gradient(#e5e7eb 1px, transparent 1px), " +
    "linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
  backgroundSize: "cover, cover, 32px 32px, 32px 32px",
  backgroundPosition: "center, center, 0 0, 0 0",
};

const innerStyle: CSSProperties = {
  maxWidth: "1120px",
  margin: "0 auto",
};

// A bit more glassy/soft card
const cardBase: CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "18px 20px 16px",
  marginBottom: "16px",
  borderRadius: "22px",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.18)",
  border: "1px solid rgba(229, 231, 235, 0.9)",
  backdropFilter: "blur(8px)",
};

// Header styles
const headerTopRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "12px",
};

const headerTitleStyle: CSSProperties = {
  fontSize: "1.35rem",
  fontWeight: 700,
  marginBottom: "6px",
  color: "#0f172a",
};

const headerSubtitleStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "#6b7280",
  maxWidth: "480px",
};

const headerChipRowStyle: CSSProperties = {
  marginTop: "8px",
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
};

const chipStyle: CSSProperties = {
  fontSize: "0.75rem",
  padding: "4px 9px",
  borderRadius: "999px",
  border: "1px solid rgba(148, 163, 184, 0.5)",
  color: "#475569",
  backgroundColor: "rgba(248, 250, 252, 0.9)",
};

const highlightChipStyle: CSSProperties = {
  ...chipStyle,
  background:
    "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(59,130,246,0.2))",
  borderColor: "rgba(59,130,246,0.4)",
  color: "#1d4ed8",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

// Two-column main layout (stacks on small screens)
const mainLayoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
  gap: "18px",
};

const fullWidthOnMobile: CSSProperties = {
  // We rely on CSS grid auto-fit on small width, but in case of inline styles
  // this is more about giving each card room to breathe.
};

// Section titles
const sectionTitleStyle: CSSProperties = {
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "6px",
  color: "#111827",
};

// Message
const messageStyle: CSSProperties = {
  marginTop: "10px",
  fontSize: "0.85rem",
  color: "#15803d",
  padding: "6px 10px",
  borderRadius: "999px",
  backgroundColor: "rgba(22, 163, 74, 0.07)",
  border: "1px solid rgba(22, 163, 74, 0.18)",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
};

// ===================== Meals Grid & Cards =====================
const mealsSectionCardStyle: CSSProperties = {
  ...cardBase,
  paddingTop: "16px",
};

const scrollWrapperStyle: CSSProperties = {
  marginTop: "6px",
  maxHeight: "430px",
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
  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.18)",
  border: "1px solid #e5e7eb",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  minHeight: "260px",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
};

const cardImageWrapperStyle: CSSProperties = {
  width: "100%",
  paddingTop: "58%",
  position: "relative",
  background:
    "radial-gradient(circle at top, #e5f0ff, #f9fafb 55%)",
};

const cardImageStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const cardImageOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to top, rgba(15,23,42,0.12), rgba(15,23,42,0.0))",
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

const mealMetaRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "6px",
};

const mealMetaTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const quantityTextStyle: CSSProperties = {
  fontSize: "0.75rem",
  color: "#16a34a",
};

const lowStockBadgeStyle: CSSProperties = {
  fontSize: "0.7rem",
  padding: "2px 7px",
  borderRadius: "999px",
  backgroundColor: "rgba(220, 38, 38, 0.08)",
  color: "#b91c1c",
  fontWeight: 500,
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
  padding: "7px 12px",
  borderRadius: "999px",
  border: "none",
  background:
    "linear-gradient(135deg, #2563eb, #1d4ed8)",
  color: "white",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: 500,
  boxShadow: "0 9px 22px rgba(37, 99, 235, 0.35)",
  whiteSpace: "nowrap",
  transition:
    "background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
};

const budgetRibbonStyle: CSSProperties = {
  fontSize: "0.75rem",
  padding: "4px 10px",
  borderRadius: "999px",
  background:
    "linear-gradient(135deg, rgba(22,163,74,0.12), rgba(22,163,74,0.25))",
  color: "#166534",
  fontWeight: 500,
};

// ===================== Small Stat Card =====================
const statCardStyle: CSSProperties = {
  ...cardBase,
  padding: "16px 16px 14px",
};

const statTitleStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#6b7280",
  marginBottom: "4px",
};

const statValueStyle: CSSProperties = {
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#111827",
};

const statRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  marginTop: "8px",
};

const statPillStyle: CSSProperties = {
  flex: 1,
  backgroundColor: "#f9fafb",
  borderRadius: "16px",
  padding: "8px 9px",
  border: "1px solid #e5e7eb",
};

const statPillLabelStyle: CSSProperties = {
  fontSize: "0.75rem",
  color: "#6b7280",
};

const statPillValueStyle: CSSProperties = {
  marginTop: "2px",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#0f172a",
};

// ===================== Reusable Meal Card =====================
type MealCardProps = {
  meal: Meal;
  variant: "default" | "budget";
  onQuickOrder?: (meal: Meal) => void;
};

const MealCard = ({ meal, variant, onQuickOrder }: MealCardProps) => {
  const isLowStock = meal.quantity !== undefined && meal.quantity > 0 && meal.quantity <= 5;

  return (
    <div
      style={mealCardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow =
          "0 24px 60px rgba(15, 23, 42, 0.26)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 16px 40px rgba(15, 23, 42, 0.18)";
      }}
    >
      {meal.image_url ? (
        <div style={cardImageWrapperStyle}>
          <img
            src={meal.image_url}
            alt={meal.name}
            style={cardImageStyle}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div style={cardImageOverlayStyle} />
        </div>
      ) : (
        <div style={cardImagePlaceholderStyle}>No image</div>
      )}

      <div style={mealBodyStyle}>
        <div>
          <div style={mealNameStyle}>{meal.name}</div>
          <div style={mealMetaRowStyle}>
            <div style={mealMetaTextStyle}>Canteen #{meal.canteen_id}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {meal.quantity !== undefined && meal.quantity >= 0 && (
                <span style={quantityTextStyle}>
                  {meal.quantity === 0
                    ? "Sold out"
                    : `${meal.quantity} left`}
                </span>
              )}
              {isLowStock && meal.quantity > 0 && (
                <span style={lowStockBadgeStyle}>Low stock</span>
              )}
            </div>
          </div>
        </div>

        <div style={bottomRowStyle}>
          <div style={priceStyle}>৳ {meal.price}</div>

          {variant === "default" && onQuickOrder && (
            <button
              style={quickButtonStyle}
              type="button"
              onClick={() => onQuickOrder(meal)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 28px rgba(37, 99, 235, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 9px 22px rgba(37, 99, 235, 0.35)";
              }}
            >
              Quick Order
            </button>
          )}

          {variant === "budget" && (
            <div style={budgetRibbonStyle}>Budget pick</div>
          )}
        </div>
      </div>
    </div>
  );
};

// ===================== Main Component =====================
function StudentDashboard() {
  const { token } = useAuth();
  const [availableMeals, setAvailableMeals] = useState<Meal[]>([]);
  const [budgetDeals, setBudgetDeals] = useState<Meal[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const todayLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

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

  const cheapest =
    budgetDeals.length > 0
      ? budgetDeals[0].price
      : availableMeals.length > 0
      ? Math.min(...availableMeals.map((m) => m.price))
      : null;

  return (
    <div style={pageWrapperStyle}>
      <div style={innerStyle}>
        {/* Header / Hero */}
        <div style={{ ...cardBase, marginBottom: "18px" }}>
          <div style={headerTopRowStyle}>
            <div>
              <div style={headerTitleStyle}>Student Dashboard</div>
              <div style={headerSubtitleStyle}>
                See what’s cooking on campus, grab budget-friendly meals, and
                place quick pickup orders—without standing in long queues.
              </div>
              <div style={headerChipRowStyle}>
                <span style={highlightChipStyle}>
                  Today · {todayLabel}
                </span>
                <span style={chipStyle}>
                  {availableMeals.length} meal
                  {availableMeals.length !== 1 ? "s" : ""} available
                </span>
                {cheapest !== null && (
                  <span style={chipStyle}>Starting from ৳ {cheapest}</span>
                )}
              </div>
            </div>

            <div
              style={{
                textAlign: "right",
                fontSize: "0.8rem",
                color: "#6b7280",
              }}
            >
              <div>Hungry?</div>
              <div>Just tap Quick Order 🍽️</div>
            </div>
          </div>

          {message && (
            <div style={messageStyle}>
              <span>✅</span>
              <span>{message}</span>
            </div>
          )}
        </div>

        {/* Main Layout: Left = meals, Right = summary */}
        <div style={mainLayoutStyle}>
          {/* Left: Today’s Meals */}
          <div style={fullWidthOnMobile}>
            <div style={mealsSectionCardStyle}>
              <div style={sectionTitleStyle}>Today&apos;s Available Meals</div>
              <div style={smallTextStyle}>
                Fresh meals listed by your campus canteens. Tap{" "}
                <strong>Quick Order</strong> to place an instant pickup (1
                item).
              </div>

              <div style={scrollWrapperStyle}>
                {availableMeals.length === 0 && (
                  <div style={{ ...smallTextStyle, marginTop: "6px" }}>
                    No meals available at the moment. Check back in a bit!
                  </div>
                )}

                <div style={mealsGridStyle}>
                  {availableMeals.map((m) => (
                    <MealCard
                      key={m.id}
                      meal={m}
                      variant="default"
                      onQuickOrder={handleQuickOrder}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stats + Budget Deals */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Small stats card */}
            <div style={statCardStyle}>
              <div style={statTitleStyle}>Today&apos;s Snapshot</div>
              <div style={statValueStyle}>
                {availableMeals.length > 0
                  ? "Canteens are serving!"
                  : "Quiet right now"}
              </div>
              <div style={statRowStyle}>
                <div style={statPillStyle}>
                  <div style={statPillLabelStyle}>Total meals</div>
                  <div style={statPillValueStyle}>
                    {availableMeals.length || "—"}
                  </div>
                </div>
                <div style={statPillStyle}>
                  <div style={statPillLabelStyle}>Budget starts at</div>
                  <div style={statPillValueStyle}>
                    {cheapest !== null ? `৳ ${cheapest}` : "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* Budget deals card */}
            <div style={mealsSectionCardStyle}>
              <div style={sectionTitleStyle}>Budget Deals (Low → High)</div>
              <div style={smallTextStyle}>
                Wallet-friendly meals sorted by price so you can eat well on a
                budget.
              </div>

              <div style={scrollWrapperStyle}>
                {budgetDeals.length === 0 && (
                  <div style={{ ...smallTextStyle, marginTop: "6px" }}>
                    No special budget deals listed yet.
                  </div>
                )}

                <div style={mealsGridStyle}>
                  {budgetDeals.map((m) => (
                    <MealCard key={m.id} meal={m} variant="budget" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
