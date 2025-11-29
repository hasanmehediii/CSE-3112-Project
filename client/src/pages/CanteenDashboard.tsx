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
};

const buttonStyle: CSSProperties = {
  padding: "6px 10px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const mealRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6px 0",
  borderBottom: "1px solid #e5e7eb",
};

const messageStyle: CSSProperties = {
  marginTop: "6px",
  fontSize: "0.85rem",
};

function CanteenDashboard() {
  const { token } = useAuth();
  const [canteenId, setCanteenId] = useState<number | null>(null);
  const [canteenName, setCanteenName] = useState<string>("");
  const [myMeals, setMyMeals] = useState<Meal[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("100");
  const [quantity, setQuantity] = useState<string>("10");
  const [imageUrl, setImageUrl] = useState<string>("");

  const [message, setMessage] = useState<string | null>(null);

  const loadCanteenAndMeals = async () => {
    if (!token) return;
    try {
      // Get my canteen info
      const profile = await apiRequest("/canteens/me", {}, token);
      const cid = profile.canteen.id as number;
      setCanteenId(cid);
      setCanteenName(profile.canteen.name);

      // Load meals for this canteen
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

  return (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <div style={titleStyle}>Canteen Dashboard</div>
        <div style={smallTextStyle}>
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

      <div style={sectionStyle}>
        <div style={titleStyle}>Add Meal</div>
        <form onSubmit={handleCreateMeal}>
          <input
            style={inputStyle}
            placeholder="Meal name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button style={buttonStyle} type="submit" disabled={!canteenId}>
            Save
          </button>
        </form>
      </div>

      <div style={sectionStyle}>
        <div style={titleStyle}>My Meals</div>
        {myMeals.map((m) => (
          <div key={m.id} style={mealRowStyle}>
            <div>
              <div>{m.name}</div>
              <div style={smallTextStyle}>Qty: {m.quantity}</div>
            </div>
            <div>৳ {m.price}</div>
          </div>
        ))}
        {myMeals.length === 0 && (
          <div style={smallTextStyle}>No meals created yet.</div>
        )}
      </div>
    </div>
  );
}

export default CanteenDashboard;
