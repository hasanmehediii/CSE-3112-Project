import { useEffect, useState, type FormEvent } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

type CanteenProfileResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    image_url?: string | null;
    canteen_name?: string | null;
    location?: string | null;
  };
  canteen: {
    id: number;
    name: string;
    image_url?: string | null;
    location?: string | null;
    category?: string | null;
  };
};

const pageStyle: React.CSSProperties = {
  maxWidth: "700px",
  margin: "20px auto",
  padding: "10px",
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: "8px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 500,
  marginBottom: "4px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: "4px",
  border: "1px solid #d1d5db",
  fontSize: "0.9rem",
  marginBottom: "10px",
};

const buttonRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
};

const buttonStyle: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem",
};

const smallTextStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const errorStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#b91c1c",
  marginBottom: "6px",
};

const successStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#15803d",
  marginBottom: "6px",
};

function CanteenProfile() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<CanteenProfileResponse | null>(null);

  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [canteenName, setCanteenName] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const data = (await apiRequest("/canteens/me", {}, token)) as CanteenProfileResponse;
        setProfile(data);
        setOwnerName(data.user.name || "");
        setPhone(data.user.phone || "");
        setCanteenName(data.user.canteen_name || data.canteen.name || "");
        setLocation(data.user.location || data.canteen.location || "");
        setImageUrl(data.canteen.image_url || data.user.image_url || "");
        setCategory(data.canteen.category || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSuccess(null);

    try {
      const body: any = {
        name: ownerName,
        phone,
        canteen_name: canteenName,
        location,
        image_url: imageUrl,
        category,
      };
      if (password.trim().length > 0) {
        body.password = password;
      }

      const updated = (await apiRequest(
        "/canteens/me",
        {
          method: "PATCH",
          body: JSON.stringify(body),
        },
        token
      )) as CanteenProfileResponse;

      setProfile(updated);
      setPassword("");
      setSuccess("Profile updated successfully.");
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>No profile data available.</div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <div style={titleStyle}>Canteen Profile</div>
        <div style={smallTextStyle}>
          Update your owner details and canteen info. Email is fixed and cannot be changed.
        </div>
        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}
      </div>

      <div style={sectionStyle}>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Email (read-only)</label>
          <input
            style={{ ...inputStyle, backgroundColor: "#f9fafb" }}
            type="email"
            value={profile.user.email}
            disabled
          />

          <label style={labelStyle}>Owner Name</label>
          <input
            style={inputStyle}
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />

          <label style={labelStyle}>Phone</label>
          <input
            style={inputStyle}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label style={labelStyle}>Canteen Name</label>
          <input
            style={inputStyle}
            value={canteenName}
            onChange={(e) => setCanteenName(e.target.value)}
          />

          <label style={labelStyle}>Location</label>
          <input
            style={inputStyle}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label style={labelStyle}>Image URL</label>
          <input
            style={inputStyle}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <label style={labelStyle}>Category</label>
          <input
            style={inputStyle}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label style={labelStyle}>
            New Password{" "}
            <span style={smallTextStyle}>(leave blank to keep current)</span>
          </label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={buttonRowStyle}>
            <button style={buttonStyle} type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CanteenProfile;
