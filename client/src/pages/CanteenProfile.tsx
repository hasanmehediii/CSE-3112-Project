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

// ====== Layout / Page styles ======
const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "120px 16px 40px",
  backgroundColor: "#f3f4f6",
};

const innerStyle: CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
};

const headingStyle: CSSProperties = {
  marginBottom: "12px",
  fontSize: "1.4rem",
  fontWeight: 650,
  color: "#111827",
};

const headingSubStyle: CSSProperties = {
  marginBottom: "18px",
  fontSize: "0.9rem",
  color: "#6b7280",
};

// Main card that holds left + right sections
const mainCardStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "18px",
  boxShadow: "0 16px 35px rgba(15, 23, 42, 0.12)",
  border: "1px solid #e5e7eb",
  padding: "18px 18px 16px",
};

// Two-column layout
const layoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "280px minmax(0, 1fr)",
  gap: "18px",
};

// ====== Left side: profile summary ======
const leftPanelStyle: CSSProperties = {
  borderRight: "1px solid #e5e7eb",
  paddingRight: "16px",
};

const avatarWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "16px",
};

const avatarStyle: CSSProperties = {
  width: "96px",
  height: "96px",
  borderRadius: "999px",
  backgroundColor: "#f97316",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: "2rem",
  overflow: "hidden",
  border: "3px solid #fed7aa",
  boxShadow: "0 10px 22px rgba(15, 23, 42, 0.25)",
};

const avatarImgStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const nameTextStyle: CSSProperties = {
  marginTop: "10px",
  fontSize: "1rem",
  fontWeight: 600,
  color: "#111827",
};

const roleTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const emailTextStyle: CSSProperties = {
  marginTop: "4px",
  fontSize: "0.8rem",
  color: "#6b7280",
};

const pillRowStyle: CSSProperties = {
  marginTop: "14px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const pillStyle: CSSProperties = {
  padding: "8px 10px",
  borderRadius: "10px",
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  fontSize: "0.8rem",
  color: "#4b5563",
};

const pillLabelStyle: CSSProperties = {
  fontSize: "0.75rem",
  color: "#9ca3af",
};

const pillValueStyle: CSSProperties = {
  marginTop: "2px",
  fontSize: "0.85rem",
  color: "#111827",
};

// ====== Right side: form ======
const rightPanelStyle: CSSProperties = {
  paddingLeft: "4px",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#111827",
  marginBottom: "4px",
};

const sectionSubTitleStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#9ca3af",
  marginBottom: "12px",
};

const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "10px 14px",
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
  borderRadius: "9px",
  border: "1px solid #d1d5db",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const readOnlyInputStyle: CSSProperties = {
  ...inputStyle,
  backgroundColor: "#f9fafb",
};

const dividerStyle: CSSProperties = {
  margin: "16px 0 10px",
  height: "1px",
  backgroundColor: "#e5e7eb",
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
  backgroundColor: "#f97316",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem",
  fontWeight: 500,
  boxShadow: "0 10px 24px rgba(249, 115, 22, 0.35)",
  transition:
    "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
};

const errorStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#b91c1c",
  marginTop: "8px",
  padding: "8px 10px",
  borderRadius: "8px",
  backgroundColor: "#fee2e2",
  border: "1px solid #fecaca",
};

const successStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#15803d",
  marginTop: "8px",
  padding: "8px 10px",
  borderRadius: "8px",
  backgroundColor: "#dcfce7",
  border: "1px solid #bbf7d0",
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
          <div style={mainCardStyle}>Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={pageWrapperStyle}>
        <div style={innerStyle}>
          <div style={mainCardStyle}>No profile data available.</div>
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
        {/* Page heading (outside card) */}
        <h1 style={headingStyle}>Canteen Profile</h1>
        <p style={headingSubStyle}>
          Manage how your canteen appears to students and admins.
        </p>

        <div style={mainCardStyle}>
          <div style={layoutStyle}>
            {/* Left: summary */}
            <div style={leftPanelStyle}>
              <div style={avatarWrapperStyle}>
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
                <div style={nameTextStyle}>
                  {profile.canteen.name || "Canteen"}
                </div>
                <div style={roleTextStyle}>Canteen Owner</div>
                <div style={emailTextStyle}>{profile.user.email}</div>
              </div>

              <div style={pillRowStyle}>
                <div style={pillStyle}>
                  <div style={pillLabelStyle}>Location</div>
                  <div style={pillValueStyle}>
                    {profile.canteen.location || "Not set"}
                  </div>
                </div>
                <div style={pillStyle}>
                  <div style={pillLabelStyle}>Category</div>
                  <div style={pillValueStyle}>
                    {category || "Not specified"}
                  </div>
                </div>
                <div style={pillStyle}>
                  <div style={pillLabelStyle}>Phone</div>
                  <div style={pillValueStyle}>{phone || "No phone added"}</div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div style={rightPanelStyle}>
              <div style={sectionTitleStyle}>General information</div>
              <div style={sectionSubTitleStyle}>
                Update owner details and basic canteen information.
              </div>

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

                  {/* Owner name */}
                  <div style={fieldWrapperStyle}>
                    <label style={labelStyle}>Owner Name</label>
                    <input
                      style={inputStyle}
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#f97316";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 1px rgba(249, 115, 22, 0.35)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }}
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
                        e.currentTarget.style.borderColor = "#f97316";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 1px rgba(249, 115, 22, 0.35)";
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
                        e.currentTarget.style.borderColor = "#f97316";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 1px rgba(249, 115, 22, 0.35)";
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
                        e.currentTarget.style.borderColor = "#f97316";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 1px rgba(249, 115, 22, 0.35)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  {/* Location */}
                  <div style={fullWidthFieldWrapperStyle}>
                    <label style={labelStyle}>Location</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. Ground floor, Admin building"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#f97316";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 1px rgba(249, 115, 22, 0.35)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div style={dividerStyle} />

                <div style={sectionTitleStyle}>Branding & security</div>
                <div style={sectionSubTitleStyle}>
                  Set your canteen image and update password if needed.
                </div>

                <div style={formGridStyle}>
                  {/* Image URL */}
                  <div style={fullWidthFieldWrapperStyle}>
                    <label style={labelStyle}>Image URL</label>
                    <input
                      style={inputStyle}
                      placeholder="Paste a direct image link to show your canteen"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#f97316";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 1px rgba(249, 115, 22, 0.35)";
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
                      <span
                        style={{ fontSize: "0.75rem", color: "#9ca3af" }}
                      >
                        (leave blank to keep current)
                      </span>
                    </label>
                    <input
                      style={inputStyle}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#f97316";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 1px rgba(249, 115, 22, 0.35)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {error && <div style={errorStyle}>{error}</div>}
                {success && <div style={successStyle}>{success}</div>}

                <div style={buttonRowStyle}>
                  <button
                    style={buttonStyle}
                    type="submit"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ea580c";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow =
                        "0 14px 30px rgba(249, 115, 22, 0.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f97316";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 24px rgba(249, 115, 22, 0.35)";
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanteenProfile;
