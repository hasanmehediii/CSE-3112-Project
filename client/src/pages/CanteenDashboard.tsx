// src/pages/CanteenDashboard.tsx
import { type FormEvent, useEffect, useState } from "react";
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

const messageStyle: CSSProperties = {
  marginTop: "8px",
  fontSize: "0.85rem",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "10px",
  color: "#111827",
};

const formRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "10px 14px",
  marginBottom: "8px",
};

const fullWidthRowStyle: CSSProperties = {
  gridColumn: "1 / -1",
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

const buttonStyle: CSSProperties = {
  padding: "9px 16px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem",
  fontWeight: 500,
  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
  transition:
    "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
};

const smallButtonStyle: CSSProperties = {
  padding: "7px 11px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: 500,
  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)",
  transition:
    "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
};

const deleteButtonStyle: CSSProperties = {
  ...smallButtonStyle,
  backgroundColor: "#b91c1c",
  boxShadow: "0 8px 20px rgba(185, 28, 28, 0.3)",
};

const mealsListCardStyle: CSSProperties = {
  ...cardStyle,
  paddingTop: "16px",
};

// === Tile grid styles ===
const mealsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "18px",
  marginTop: "10px",
};

const mealCardStyle: CSSProperties = {
  borderRadius: "20px",
  backgroundColor: "white",
  boxShadow: "0 20px 45px rgba(15, 23, 42, 0.22)",
  border: "1px solid #e5e7eb",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  minHeight: "280px",
  cursor: "default",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
};

const cardImageWrapperStyle: CSSProperties = {
  width: "100%",
  paddingTop: "65%", // ~65% height for image
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
  padding: "12px 14px 14px",
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

const mealBodyBottomRowStyle: CSSProperties = {
  marginTop: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
};

const mealPriceStyle: CSSProperties = {
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#111827",
};

const mealActionsRowStyle: CSSProperties = {
  display: "flex",
  gap: "6px",
};

// === Modal styles for Edit ===
const modalOverlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

const modalCardStyle: CSSProperties = {
  width: "100%",
  maxWidth: "460px",
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "18px 20px 16px",
  boxShadow: "0 30px 70px rgba(15, 23, 42, 0.6)",
  border: "1px solid #e5e7eb",
};

const modalHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
};

const modalTitleStyle: CSSProperties = {
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#111827",
};

const modalCloseStyle: CSSProperties = {
  border: "none",
  background: "transparent",
  fontSize: "1.3rem",
  cursor: "pointer",
  color: "#6b7280",
};

const modalButtonsRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
  marginTop: "6px",
};

const modalInputRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "10px",
  marginBottom: "8px",
};

const modalFullWidthRowStyle: CSSProperties = {
  gridColumn: "1 / -1",
};

function CanteenDashboard() {
  const { token } = useAuth();
  const [canteenId, setCanteenId] = useState<number | null>(null);
  const [canteenName, setCanteenName] = useState<string>("");
  const [myMeals, setMyMeals] = useState<Meal[]>([]);

  // Create form
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("100");
  const [quantity, setQuantity] = useState<string>("10");
  const [imageUrl, setImageUrl] = useState<string>("");

  // Edit form (modal)
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<string>("");
  const [editQuantity, setEditQuantity] = useState<string>("");
  const [editImageUrl, setEditImageUrl] = useState<string>("");

  const [message, setMessage] = useState<string | null>(null);

  const loadCanteenAndMeals = async () => {
    if (!token) return;
    try {
      const profile = await apiRequest("/canteens/me", {}, token);
      const cid = profile.canteen.id as number;
      setCanteenId(cid);
      setCanteenName(profile.canteen.name);

      const meals = await apiRequest(`/meals/canteen/${cid}`, {}, token);
      setMyMeals(meals);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCanteenAndMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleCreateMeal = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setMessage(null);
    try {
      const body = {
        name,
        price: Number(price),
        quantity: Number(quantity),
        image_url: imageUrl || null,
      };
      await apiRequest(
        "/meals/",
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        token
      );
      setName("");
      setPrice("100");
      setQuantity("10");
      setImageUrl("");
      setMessage("Meal created.");
      await loadCanteenAndMeals();
    } catch (err: any) {
      setMessage(err.message || "Failed to create meal");
    }
  };

  const startEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setEditName(meal.name);
    setEditPrice(String(meal.price));
    setEditQuantity(String(meal.quantity));
    setEditImageUrl(meal.image_url || "");
    setMessage(null);
  };

  const handleUpdateMeal = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !editingMeal) return;
    setMessage(null);

    try {
      const body: any = {
        name: editName,
        price: Number(editPrice),
        quantity: Number(editQuantity),
        image_url: editImageUrl || null,
      };

      await apiRequest(
        `/meals/${editingMeal.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
        },
        token
      );

      setMessage("Meal updated.");
      setEditingMeal(null);
      await loadCanteenAndMeals();
    } catch (err: any) {
      setMessage(err.message || "Failed to update meal");
    }
  };

  const handleDeleteMeal = async (mealId: number) => {
    if (!token) return;
    const sure = window.confirm("Are you sure you want to delete this meal?");
    if (!sure) return;

    setMessage(null);
    try {
      await apiRequest(
        `/meals/${mealId}`,
        {
          method: "DELETE",
        },
        token
      );
      setMessage("Meal deleted.");
      if (editingMeal && editingMeal.id === mealId) {
        setEditingMeal(null);
      }
      await loadCanteenAndMeals();
    } catch (err: any) {
      setMessage(err.message || "Failed to delete meal");
    }
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={innerStyle}>
        {/* Header card */}
        <div style={cardStyle}>
          <div style={headerTitleStyle}>Canteen Dashboard</div>
          <div style={headerSubtitleStyle}>
            {canteenName
              ? `Managing menu for "${canteenName}".`
              : "Loading your canteen information..."}
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

        {/* Add meal card */}
        <div style={cardStyle}>
          <div style={sectionTitleStyle}>Add Meal</div>
          <form onSubmit={handleCreateMeal}>
            <div style={formRowStyle}>
              <div>
                <input
                  style={inputStyle}
                  placeholder="Meal name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  style={inputStyle}
                  placeholder="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <input
                  style={inputStyle}
                  placeholder="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div style={fullWidthRowStyle}>
                <input
                  style={inputStyle}
                  placeholder="Image URL (optional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>

            <button
              style={buttonStyle}
              type="submit"
              disabled={!canteenId}
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
              Save
            </button>
            <div style={{ ...smallTextStyle, marginTop: "6px" }}>
              Tip: Use an image URL to make your menu more visual for students.
            </div>
          </form>
        </div>

        {/* Meals list as tile grid */}
        <div style={mealsListCardStyle}>
          <div style={sectionTitleStyle}>My Meals</div>
          {myMeals.length === 0 && (
            <div style={smallTextStyle}>No meals created yet.</div>
          )}

          <div style={mealsGridStyle}>
            {myMeals.map((m) => (
              <div
                key={m.id}
                style={mealCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 26px 60px rgba(15, 23, 42, 0.28)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 45px rgba(15, 23, 42, 0.22)";
                }}
              >
                {/* Image area */}
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

                {/* Text + actions */}
                <div style={mealBodyStyle}>
                  <div>
                    <div style={mealNameStyle}>{m.name}</div>
                    <div style={mealMetaTextStyle}>Qty: {m.quantity}</div>
                  </div>

                  <div style={mealBodyBottomRowStyle}>
                    <div style={mealPriceStyle}>৳ {m.price}</div>
                    <div style={mealActionsRowStyle}>
                      <button
                        style={smallButtonStyle}
                        type="button"
                        onClick={() => startEditMeal(m)}
                      >
                        Edit
                      </button>
                      <button
                        style={deleteButtonStyle}
                        type="button"
                        onClick={() => handleDeleteMeal(m.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit modal */}
        {editingMeal && (
          <div style={modalOverlayStyle}>
            <div style={modalCardStyle}>
              <div style={modalHeaderStyle}>
                <div style={modalTitleStyle}>
                  Edit Meal <span style={smallTextStyle}>#{editingMeal.id}</span>
                </div>
                <button
                  style={modalCloseStyle}
                  type="button"
                  onClick={() => setEditingMeal(null)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUpdateMeal}>
                <div style={modalInputRowStyle}>
                  <div>
                    <input
                      style={inputStyle}
                      placeholder="Meal name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      style={inputStyle}
                      placeholder="Price"
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      style={inputStyle}
                      placeholder="Quantity"
                      type="number"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                    />
                  </div>
                  <div style={modalFullWidthRowStyle}>
                    <input
                      style={inputStyle}
                      placeholder="Image URL"
                      value={editImageUrl}
                      onChange={(e) => setEditImageUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div style={modalButtonsRowStyle}>
                  <button
                    type="button"
                    style={smallButtonStyle}
                    onClick={() => setEditingMeal(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" style={smallButtonStyle}>
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CanteenDashboard;
