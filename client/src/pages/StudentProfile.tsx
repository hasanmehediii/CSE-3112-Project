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
  width: "100%",
  maxWidth: "400px",
};

const labelStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#4b5563",
  display: "block",
  marginTop: "6px",
};

const buttonStyle: CSSProperties = {
  padding: "6px 10px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem",
  marginTop: "8px",
};

const smallTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const messageStyle: CSSProperties = {
  fontSize: "0.85rem",
  marginTop: "6px",
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

  return (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <div style={titleStyle}>My Profile</div>
        <div style={smallTextStyle}>
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

      <div style={sectionStyle}>
        {loading && <div style={smallTextStyle}>Loading profile...</div>}
        {!loading && profile && (
          <>
            <div style={smallTextStyle}>
              Email: <strong>{profile.email}</strong>
              {profile.registration_no && (
                <>
                  {" "}
                  • Reg: <strong>{profile.registration_no}</strong>
                </>
              )}
            </div>
            {profile.image_url && (
              <div style={{ marginTop: "8px" }}>
                <img
                  src={profile.image_url}
                  alt="Profile"
                  style={{ width: "80px", height: "80px", borderRadius: "999px", objectFit: "cover" }}
                />
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
              <label style={labelStyle}>Name</label>
              <input
                style={inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label style={labelStyle}>Phone</label>
              <input
                style={inputStyle}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <label style={labelStyle}>Department</label>
              <input
                style={inputStyle}
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              />

              <label style={labelStyle}>Address</label>
              <input
                style={inputStyle}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label style={labelStyle}>Profile Image URL</label>
              <input
                style={inputStyle}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />

              <button style={buttonStyle} type="submit">
                Save Changes
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentProfilePage;
