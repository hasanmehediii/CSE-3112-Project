// src/pages/CanteenProfile.tsx
import { useEffect, useState, type FormEvent } from "react";
import type { CSSProperties } from "react";
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

const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "120px 16px 40px", // room for navbar
  backgroundImage:
    "radial-gradient(circle at top, rgba(251, 146, 60, 0.16), transparent 55%), " +
    "linear-gradient(#e5e7eb 1px, transparent 1px), " +
    "linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
  backgroundSize: "cover, 32px 32px, 32px 32px",
  backgroundPosition: "center, 0 0, 0 0",
};

const innerStyle: CSSProperties = {
  maxWidth: "780px",
  margin: "0 auto",
};

const cardStyle: CSSProperties = {
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "20px 20px 18px",
  boxShadow: "0 18px 45px rgba(15, 23, 42, 0.10)",
  border: "1px solid #e5e7eb",
  marginBottom: "16px",
};

const headerRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  marginBottom: "6px",
};

const avatarStyle: CSSProperties = {
  width: "52px",
  height: "52px",
  borderRadius: "999px",
  background:
    "linear-gradient(135deg, #f97316, #fb923c)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: "1.3rem",
  flexShrink: 0,
  overflow: "hidden",
};

const avatarImgStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const titleBlockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const mainTitleStyle: CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 650,
  color: "#111827",
};

const subTitleStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "#6b7280",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
  marginTop: "4px",
};

const errorStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#b91c1c",
  marginTop: "6px",
  padding: "6px 8px",
  borderRadius: "8px",
  backgroundColor: "#fee2e2",
  border: "1px solid #fecaca",
};

const successStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#15803d",
  marginTop: "6px",
  padding: "6px 8px",
  borderRadius: "8px",
  backgroundColor: "#dcfce7",
  border: "1px solid #bbf7d0",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 600,
  marginBottom: "10px",
  color: "#111827",
};

const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "10px 16px",
};

const fieldWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const fullWidthFieldWrapperStyle: CSSProperties = {
  ...fieldWrapperStyle,
  gridColumn: "1 / -1",
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 500,
  marginBottom: "4px",
  color: "#374151",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const readOnlyInputStyle: CSSProperties = {
  ...inputStyle,
  backgroundColor: "#f9fafb",
};

const buttonRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "14px",
};

const buttonStyle: CSSProperties = {
  padding: "8px 16px",
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
        const data = (await apiRequest(
          "/canteens/me",
          {},
          token
        )) as CanteenProfileResponse;
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
      <div style={pageWrapperStyle}>
        <div style={innerStyle}>
          <div style={cardStyle}>Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={pageWrapperStyle}>
        <div style={innerStyle}>
          <div style={cardStyle}>No profile data available.</div>
        </div>
      </div>
    );
  }

  const firstLetter = (profile.canteen.name || profile.user.name || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div style={pageWrapperStyle}>
      <div style={innerStyle}>
        {/* Header card */}
        <div style={cardStyle}>
          <div style={headerRowStyle}>
            <div style={avatarStyle}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={profile.canteen.name}
                  style={avatarImgStyle}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              ) : (
                <span>{firstLetter}</span>
              )}
            </div>
            <div style={titleBlockStyle}>
              <div style={mainTitleStyle}>
                {profile.canteen.name || "Canteen"}
              </div>
              <div style={subTitleStyle}>
                Owner: {profile.user.name} • {profile.user.email}
              </div>
              <div style={smallTextStyle}>
                {profile.canteen.location || "No location set yet"}
              </div>
            </div>
          </div>

          <div style={smallTextStyle}>
            Keep your canteen info up to date so students and admins see the
            right details.
          </div>

          {error && <div style={errorStyle}>{error}</div>}
          {success && <div style={successStyle}>{success}</div>}
        </div>

        {/* Form card */}
        <div style={cardStyle}>
          <div style={sectionTitleStyle}>Profile details</div>
          <form onSubmit={handleSubmit}>
            <div style={formGridStyle}>
              {/* Email */}
              <div style={fieldWrapperStyle}>
                <label style={labelStyle}>Email (read-only)</label>
                <input
                  style={readOnlyInputStyle}
                  type="email"
                  value={profile.user.email}
                  disabled
                />
              </div>

              {/* Phone */}
              <div style={fieldWrapperStyle}>
                <label style={labelStyle}>Phone</label>
                <input
                  style={inputStyle}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#2563eb";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(37, 99, 235, 0.35)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Owner name */}
              <div style={fieldWrapperStyle}>
                <label style={labelStyle}>Owner Name</label>
                <input
                  style={inputStyle}
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#2563eb";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(37, 99, 235, 0.35)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Category */}
              <div style={fieldWrapperStyle}>
                <label style={labelStyle}>Category</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. Cafeteria, Snacks, Full meals"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#2563eb";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(37, 99, 235, 0.35)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Canteen name */}
              <div style={fieldWrapperStyle}>
                <label style={labelStyle}>Canteen Name</label>
                <input
                  style={inputStyle}
                  value={canteenName}
                  onChange={(e) => setCanteenName(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#2563eb";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(37, 99, 235, 0.35)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Location */}
              <div style={fieldWrapperStyle}>
                <label style={labelStyle}>Location</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. Ground floor, Admin building"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#2563eb";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(37, 99, 235, 0.35)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Image URL */}
              <div style={fullWidthFieldWrapperStyle}>
                <label style={labelStyle}>Image URL</label>
                <input
                  style={inputStyle}
                  placeholder="Paste a direct image link to show your canteen"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#2563eb";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(37, 99, 235, 0.35)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Password */}
              <div style={fullWidthFieldWrapperStyle}>
                <label style={labelStyle}>
                  New Password{" "}
                  <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                    (leave blank to keep current)
                  </span>
                </label>
                <input
                  style={inputStyle}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#2563eb";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(37, 99, 235, 0.35)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                  }}
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CanteenProfile;
