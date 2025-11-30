// src/pages/StudentProfilePage.tsx
import { type FormEvent, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

type StudentProfile = {
  id: number;
  name: string;
  email: string;
  registration_no?: string;
  phone?: string | null;
  dept?: string | null;
  address?: string | null;
  image_url?: string | null;
};

const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "120px 16px 40px",
  backgroundImage:
    "radial-gradient(circle at top, rgba(34, 197, 94, 0.18), transparent 55%), " +
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
  padding: "20px 22px 18px",
  marginBottom: "16px",
  borderRadius: "20px",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.18)",
  border: "1px solid #e5e7eb",
};

const headerTitleStyle: CSSProperties = {
  fontSize: "1.35rem",
  fontWeight: 700,
  marginBottom: "4px",
  backgroundImage: "linear-gradient(to right, #16a34a, #22c55e)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const headerSubtitleStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "#6b7280",
};

const messageStyle: CSSProperties = {
  fontSize: "0.85rem",
  marginTop: "6px",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

// Layout for profile body
const profileCardStyle: CSSProperties = {
  ...cardStyle,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const profileLayoutStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "28px",
};

const leftColumnStyle: CSSProperties = {
  flex: "0 0 220px",
  minWidth: "200px",
};

const rightColumnStyle: CSSProperties = {
  flex: "1 1 260px",
};

// Avatar / basic info
const avatarWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

const avatarCircleStyle: CSSProperties = {
  width: "130px", // bigger for clearer view
  height: "130px",
  borderRadius: "999px",
  background:
    "radial-gradient(circle at 30% 20%, #bbf7d0, transparent 55%), #e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  boxShadow: "0 14px 30px rgba(15, 23, 42, 0.25)",
};

const avatarImgStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const avatarFallbackInitialStyle: CSSProperties = {
  fontSize: "3rem",
  fontWeight: 700,
  color: "#16a34a",
};

const avatarNameStyle: CSSProperties = {
  marginTop: "10px",
  fontSize: "1.1rem",
  fontWeight: 600,
  color: "#111827",
};

const avatarMetaStyle: CSSProperties = {
  marginTop: "4px",
  fontSize: "0.85rem",
  color: "#6b7280",
};

// Form styles
const labelStyle: CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "#374151",
  display: "block",
  marginBottom: "4px",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "9px 11px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "0.9rem",
  marginBottom: "10px",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "8px 14px",
};

const formFullWidthStyle: CSSProperties = {
  gridColumn: "1 / -1",
};

const buttonRowStyle: CSSProperties = {
  marginTop: "6px",
  display: "flex",
  justifyContent: "flex-end",
};

const buttonStyle: CSSProperties = {
  padding: "9px 16px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#16a34a",
  color: "white",
  fontSize: "0.9rem",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(22, 163, 74, 0.35)",
  transition:
    "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
};

function StudentProfilePage() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const loadProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await apiRequest("/users/me", {}, token);
      setProfile(data);
      setName(data.name || "");
      setPhone(data.phone || "");
      setDept(data.dept || "");
      setAddress(data.address || "");
      setImageUrl(data.image_url || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setMessage(null);
    try {
      const body = {
        name,
        phone,
        dept,
        address,
        image_url: imageUrl || null,
      };
      await apiRequest(
        "/users/me",
        {
          method: "PATCH",
          body: JSON.stringify(body),
        },
        token
      );
      setMessage("Profile updated.");
      await loadProfile();
    } catch (err: any) {
      setMessage(err.message || "Failed to update profile");
    }
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    e.currentTarget.style.borderColor = "#16a34a";
    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(22, 163, 74, 0.35)";
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    e.currentTarget.style.borderColor = "#d1d5db";
    e.currentTarget.style.boxShadow = "none";
  };

  const getInitial = () =>
    (name || profile?.name || "U").trim().charAt(0).toUpperCase();

  return (
    <div style={pageWrapperStyle}>
      <div style={innerStyle}>
        {/* Header card */}
        <div style={cardStyle}>
          <div style={headerTitleStyle}>My Profile</div>
          <div style={headerSubtitleStyle}>
            Update your basic information. Email and registration number are read-only.
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

        {/* Profile content */}
        <div style={profileCardStyle}>
          {loading && <div style={smallTextStyle}>Loading profile...</div>}
          {!loading && profile && (
            <div style={profileLayoutStyle}>
              {/* Left: avatar + fixed info */}
              <div style={leftColumnStyle}>
                <div style={avatarWrapperStyle}>
                  <div style={avatarCircleStyle}>
                    {profile.image_url || imageUrl ? (
                      <img
                        src={imageUrl || profile.image_url!}
                        alt="Profile"
                        style={avatarImgStyle}
                        onError={(e) => {
                          // hide broken and use fallback initial
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <span style={avatarFallbackInitialStyle}>
                        {getInitial()}
                      </span>
                    )}
                  </div>
                  <div style={avatarNameStyle}>{profile.name}</div>
                  <div style={avatarMetaStyle}>{profile.email}</div>
                  {profile.registration_no && (
                    <div style={avatarMetaStyle}>
                      Reg: {profile.registration_no}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: editable form */}
              <div style={rightColumnStyle}>
                <form onSubmit={handleSubmit}>
                  <div style={formGridStyle}>
                    <div>
                      <label style={labelStyle}>Name</label>
                      <input
                        style={inputStyle}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input
                        style={inputStyle}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Department</label>
                      <input
                        style={inputStyle}
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div style={formFullWidthStyle}>
                      <label style={labelStyle}>Address</label>
                      <input
                        style={inputStyle}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div style={formFullWidthStyle}>
                      <label style={labelStyle}>Profile Image URL</label>
                      <input
                        style={inputStyle}
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div style={buttonRowStyle}>
                    <button
                      style={buttonStyle}
                      type="submit"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#15803d";
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow =
                          "0 14px 30px rgba(22, 163, 74, 0.45)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#16a34a";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 25px rgba(22, 163, 74, 0.35)";
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {!loading && !profile && (
            <div style={smallTextStyle}>No profile data available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentProfilePage;
