import React, { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

// ====== Types ======
type Complaint = {
  id: number;
  student_id: number;
  canteen_id?: number | null;
  meal_id?: number | null;
  order_id?: number | null;
  message: string;
  status: string;
};

type Student = {
  id: number;
  name: string;
  email?: string;
};

type Canteen = {
  id: number;
  name: string;
  location?: string | null;
};

type Order = {
  id: number;
  student_id: number;
  canteen_id: number;
  total_price?: number;
  status: string;
  created_at?: string;
};

type Meal = {
  id: number;
  name: string;
  canteen_id: number;
  price?: number;
  meal_type?: string; // breakfast/lunch/dinner etc.
};

// ====== Styles ======
const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: "100px 16px 24px", // top padding so it clears the fixed navbar
  backgroundColor: "#f3f4f6",
};

const contentStyle: React.CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "16px",
  marginBottom: "16px",
  borderRadius: "12px",
  boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: "8px",
};

const smallTextStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "#6b7280",
};

const complaintRowStyle: React.CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  padding: "6px 0",
  fontSize: "0.9rem",
};

const tabBarStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  marginTop: "12px",
  marginBottom: "4px",
  flexWrap: "wrap",
};

const tabButtonStyle: React.CSSProperties = {
  padding: "6px 10px",
  fontSize: "0.85rem",
  borderRadius: "999px",
  border: "1px solid #d1d5db",
  backgroundColor: "#f9fafb",
  cursor: "pointer",
};

const tabButtonActiveStyle: React.CSSProperties = {
  ...tabButtonStyle,
  backgroundColor: "#2563eb",
  color: "white",
  borderColor: "#2563eb",
};

const formRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginBottom: "8px",
};

const inputStyle: React.CSSProperties = {
  padding: "6px 8px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "0.85rem",
  flex: "1 1 150px",
};

const buttonStyle: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#16a34a",
  color: "white",
  fontSize: "0.85rem",
  cursor: "pointer",
};

const dangerButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#dc2626",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.85rem",
};

const thTdStyle: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  padding: "6px 8px",
  verticalAlign: "top",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "2px 6px",
  borderRadius: "999px",
  fontSize: "0.7rem",
  backgroundColor: "#e5e7eb",
};

const statsRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "10px",
  marginTop: "14px",
};

const statCardStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: "10px",
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
};

type TabKey = "complaints" | "students" | "canteens" | "orders" | "menus";

function AdminDashboard() {
  const { token } = useAuth();

  const [activeTab, setActiveTab] = useState<TabKey>("complaints");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [canteens, setCanteens] = useState<Canteen[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [todayMenus, setTodayMenus] = useState<Meal[]>([]);

  // form states
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentPassword, setNewStudentPassword] = useState("");

  const [newCanteenName, setNewCanteenName] = useState("");
  const [newCanteenEmail, setNewCanteenEmail] = useState("");
  const [newCanteenPassword, setNewCanteenPassword] = useState("");
  const [newCanteenLocation, setNewCanteenLocation] = useState("");

  // ====== Load data ======
  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      // Complaints (this one already exists)
      try {
        const complaintsData = await apiRequest("/complaints/all", {}, token);
        setComplaints(complaintsData || []);
      } catch (err) {
        console.error("Error loading complaints", err);
        setError("Failed to load complaints.");
      }

      // Students (via /users?role=student)
      try {
        const studentsData = await apiRequest(
          "/users?role=student",
          {},
          token
        );
        setStudents((studentsData || []) as Student[]);
      } catch (err) {
        console.warn("Students endpoint error", err);
      }

      // Canteens (via /users?role=canteen) → map to {id, name, location}
      try {
        const canteenUsers = await apiRequest(
          "/users?role=canteen",
          {},
          token
        );
        const mapped: Canteen[] = (canteenUsers || []).map((u: any) => ({
          id: u.id,
          name: u.canteen_name || u.name,
          location: u.location ?? null,
        }));
        setCanteens(mapped);
      } catch (err) {
        console.warn("Canteens endpoint error", err);
      }

      // Orders
      try {
        const ordersData = await apiRequest("/orders/all", {}, token);
        setOrders((ordersData || []) as Order[]);
      } catch (err) {
        console.warn("Orders endpoint error", err);
      }

      // Today’s menus
      try {
        const todayMenusData = await apiRequest("/meals/today", {}, token);
        setTodayMenus((todayMenusData || []) as Meal[]);
      } catch (err) {
        console.warn("Meals endpoint error", err);
      }

      setLoading(false);
    };

    loadData();
  }, [token]);

  // ====== Helpers for name lookups ======
  const canteenNameById = useMemo(() => {
    const map: Record<number, string> = {};
    for (const c of canteens) map[c.id] = c.name;
    return map;
  }, [canteens]);

  const studentNameById = useMemo(() => {
    const map: Record<number, string> = {};
    for (const s of students) map[s.id] = s.name;
    return map;
  }, [students]);

  const getCanteenName = (id?: number | null) =>
    id ? canteenNameById[id] || `Canteen #${id}` : "-";

  const getStudentName = (id?: number | null) =>
    id ? studentNameById[id] || `Student #${id}` : "-";

  // ====== Sorted views ======
  const complaintsSortedByCanteen = useMemo(() => {
    return [...complaints].sort((a, b) => {
      const an = getCanteenName(a.canteen_id);
      const bn = getCanteenName(b.canteen_id);
      return an.localeCompare(bn);
    });
  }, [complaints, canteens]);

  const ordersSortedByStudent = useMemo(() => {
    return [...orders].sort((a, b) => {
      const an = getStudentName(a.student_id);
      const bn = getStudentName(b.student_id);
      return an.localeCompare(bn);
    });
  }, [orders, students]);

  // ====== Actions: Students ======
  const handleAddStudent = async () => {
    if (!token) return;
    if (!newStudentName.trim() || !newStudentEmail.trim() || !newStudentPassword) {
      alert("Name, email and password are required.");
      return;
    }

    try {
      const payload = {
        name: newStudentName.trim(),
        email: newStudentEmail.trim(),
        password: newStudentPassword,
        role: "student",
      };

      // Admin-creating a student user
      await apiRequest(
        "/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        token
      );

      // Reload students
      const studentsData = await apiRequest("/users?role=student", {}, token);
      setStudents((studentsData || []) as Student[]);

      setNewStudentName("");
      setNewStudentEmail("");
      setNewStudentPassword("");
    } catch (err) {
      console.error(err);
      alert("Failed to create student.");
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!token) return;
    if (!window.confirm("Remove this student?")) return;

    try {
      await apiRequest(
        `/users/${id}`,
        {
          method: "DELETE",
        },
        token
      );
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete student.");
    }
  };

  // ====== Actions: Canteens ======
  const handleAddCanteen = async () => {
    if (!token) return;
    if (
      !newCanteenName.trim() ||
      !newCanteenEmail.trim() ||
      !newCanteenPassword
    ) {
      alert("Canteen name, email and password are required.");
      return;
    }

    try {
      const payload = {
        name: newCanteenName.trim(),
        email: newCanteenEmail.trim(),
        password: newCanteenPassword,
        role: "canteen",
        canteen_name: newCanteenName.trim(),
        location: newCanteenLocation.trim() || undefined,
      };

      await apiRequest(
        "/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        token
      );

      // Reload canteens from users
      const canteenUsers = await apiRequest("/users?role=canteen", {}, token);
      const mapped: Canteen[] = (canteenUsers || []).map((u: any) => ({
        id: u.id,
        name: u.canteen_name || u.name,
        location: u.location ?? null,
      }));
      setCanteens(mapped);

      setNewCanteenName("");
      setNewCanteenEmail("");
      setNewCanteenPassword("");
      setNewCanteenLocation("");
    } catch (err) {
      console.error(err);
      alert("Failed to create canteen.");
    }
  };

  const handleDeleteCanteen = async (id: number) => {
    if (!token) return;
    if (!window.confirm("Remove this canteen user?")) return;

    try {
      await apiRequest(
        `/users/${id}`,
        {
          method: "DELETE",
        },
        token
      );
      setCanteens((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete canteen user.");
    }
  };

  // ====== Render helpers ======
  const renderComplaints = () => (
    <div style={sectionStyle}>
      <div style={titleStyle}>Complaints (sorted by canteen)</div>
      <div style={smallTextStyle}>
        All complaints from students, ordered by canteen name.
      </div>
      <div style={{ marginTop: "8px" }}>
        {complaintsSortedByCanteen.length === 0 ? (
          <div style={smallTextStyle}>No complaints yet.</div>
        ) : (
          complaintsSortedByCanteen.map((c) => (
            <div key={c.id} style={complaintRowStyle}>
              <div>
                <strong>#{c.id}</strong> – {c.message}
              </div>
              <div style={smallTextStyle}>
                Student: {getStudentName(c.student_id)} ({c.student_id}) |{" "}
                Canteen: {getCanteenName(c.canteen_id)} | Meal:{" "}
                {c.meal_id ?? "-"} | Order: {c.order_id ?? "-"}
              </div>
              <div style={smallTextStyle}>Status: {c.status}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderStudents = () => (
    <div style={sectionStyle}>
      <div style={titleStyle}>Students</div>
      <div style={smallTextStyle}>Add / remove student users.</div>

      {/* Add form */}
      <div style={{ marginTop: "10px" }}>
        <div style={formRowStyle}>
          <input
            style={inputStyle}
            placeholder="Student name"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Student email"
            value={newStudentEmail}
            onChange={(e) => setNewStudentEmail(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Temporary password"
            type="password"
            value={newStudentPassword}
            onChange={(e) => setNewStudentPassword(e.target.value)}
          />
          <button style={buttonStyle} onClick={handleAddStudent}>
            Add student
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ marginTop: "10px", overflowX: "auto" }}>
        {students.length === 0 ? (
          <div style={smallTextStyle}>No students yet.</div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>ID</th>
                <th style={thTdStyle}>Name</th>
                <th style={thTdStyle}>Email</th>
                <th style={thTdStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td style={thTdStyle}>{s.id}</td>
                  <td style={thTdStyle}>{s.name}</td>
                  <td style={thTdStyle}>{s.email || "-"}</td>
                  <td style={thTdStyle}>
                    <button
                      style={dangerButtonStyle}
                      onClick={() => handleDeleteStudent(s.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const renderCanteens = () => (
    <div style={sectionStyle}>
      <div style={titleStyle}>Canteen Users</div>
      <div style={smallTextStyle}>
        Add / remove canteen-owner users (linked to canteens).
      </div>

      {/* Add form */}
      <div style={{ marginTop: "10px" }}>
        <div style={formRowStyle}>
          <input
            style={inputStyle}
            placeholder="Canteen name"
            value={newCanteenName}
            onChange={(e) => setNewCanteenName(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Canteen email"
            value={newCanteenEmail}
            onChange={(e) => setNewCanteenEmail(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Temporary password"
            type="password"
            value={newCanteenPassword}
            onChange={(e) => setNewCanteenPassword(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Location (optional)"
            value={newCanteenLocation}
            onChange={(e) => setNewCanteenLocation(e.target.value)}
          />
          <button style={buttonStyle} onClick={handleAddCanteen}>
            Add canteen user
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ marginTop: "10px", overflowX: "auto" }}>
        {canteens.length === 0 ? (
          <div style={smallTextStyle}>No canteen users yet.</div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>User ID</th>
                <th style={thTdStyle}>Canteen Name</th>
                <th style={thTdStyle}>Location</th>
                <th style={thTdStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {canteens.map((c) => (
                <tr key={c.id}>
                  <td style={thTdStyle}>{c.id}</td>
                  <td style={thTdStyle}>{c.name}</td>
                  <td style={thTdStyle}>{c.location || "-"}</td>
                  <td style={thTdStyle}>
                    <button
                      style={dangerButtonStyle}
                      onClick={() => handleDeleteCanteen(c.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div style={sectionStyle}>
      <div style={titleStyle}>Orders (sorted by student)</div>
      <div style={smallTextStyle}>
        All orders, ordered by student name. Adjust columns to match your schema.
      </div>

      <div style={{ marginTop: "10px", overflowX: "auto" }}>
        {ordersSortedByStudent.length === 0 ? (
          <div style={smallTextStyle}>No orders yet.</div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>ID</th>
                <th style={thTdStyle}>Student</th>
                <th style={thTdStyle}>Canteen</th>
                <th style={thTdStyle}>Total</th>
                <th style={thTdStyle}>Status</th>
                <th style={thTdStyle}>Time</th>
              </tr>
            </thead>
            <tbody>
              {ordersSortedByStudent.map((o) => (
                <tr key={o.id}>
                  <td style={thTdStyle}>{o.id}</td>
                  <td style={thTdStyle}>
                    {getStudentName(o.student_id)} ({o.student_id})
                  </td>
                  <td style={thTdStyle}>{getCanteenName(o.canteen_id)}</td>
                  <td style={thTdStyle}>
                    {o.total_price != null ? `${o.total_price} ৳` : "-"}
                  </td>
                  <td style={thTdStyle}>
                    <span style={badgeStyle}>{o.status}</span>
                  </td>
                  <td style={thTdStyle}>
                    {o.created_at
                      ? new Date(o.created_at).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const renderMenus = () => (
    <div style={sectionStyle}>
      <div style={titleStyle}>Today&apos;s Menus</div>
      <div style={smallTextStyle}>
        All meals available today, grouped by canteen.
      </div>

      {todayMenus.length === 0 ? (
        <div style={{ marginTop: "10px", ...smallTextStyle }}>
          No menus found for today.
        </div>
      ) : (
        <div style={{ marginTop: "10px" }}>
          {canteens.map((c) => {
            const mealsForCanteen = todayMenus.filter(
              (m) => m.canteen_id === c.id
            );
            if (mealsForCanteen.length === 0) return null;

            return (
              <div
                key={c.id}
                style={{
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#f9fafb",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                  {c.name}
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "18px",
                    fontSize: "0.85rem",
                  }}
                >
                  {mealsForCanteen.map((m) => (
                    <li key={m.id}>
                      {m.name}{" "}
                      {m.meal_type && (
                        <span style={badgeStyle}>{m.meal_type}</span>
                      )}{" "}
                      {m.price != null && <span>– {m.price} ৳</span>}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ====== Main render ======
  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <div style={sectionStyle}>
          <div style={titleStyle}>Admin Dashboard</div>
          <div style={smallTextStyle}>
            Manage students, canteen users, orders, complaints, and today&apos;s
            menus.
          </div>

          <div style={tabBarStyle}>
            <button
              style={
                activeTab === "complaints"
                  ? tabButtonActiveStyle
                  : tabButtonStyle
              }
              onClick={() => setActiveTab("complaints")}
            >
              Complaints
            </button>
            <button
              style={
                activeTab === "students"
                  ? tabButtonActiveStyle
                  : tabButtonStyle
              }
              onClick={() => setActiveTab("students")}
            >
              Students
            </button>
            <button
              style={
                activeTab === "canteens"
                  ? tabButtonActiveStyle
                  : tabButtonStyle
              }
              onClick={() => setActiveTab("canteens")}
            >
              Canteen Users
            </button>
            <button
              style={
                activeTab === "orders" ? tabButtonActiveStyle : tabButtonStyle
              }
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              style={
                activeTab === "menus" ? tabButtonActiveStyle : tabButtonStyle
              }
              onClick={() => setActiveTab("menus")}
            >
              Today&apos;s Menus
            </button>
          </div>

          {loading && (
            <div style={{ ...smallTextStyle, marginTop: "6px" }}>
              Loading data...
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: "6px",
                fontSize: "0.8rem",
                color: "#b91c1c",
              }}
            >
              {error}
            </div>
          )}

          {/* Summary stats */}
          <div style={statsRowStyle}>
            <div style={statCardStyle}>
              <div style={{ ...smallTextStyle, marginBottom: "4px" }}>
                Complaints
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                {complaints.length}
              </div>
            </div>
            <div style={statCardStyle}>
              <div style={{ ...smallTextStyle, marginBottom: "4px" }}>
                Students
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                {students.length}
              </div>
            </div>
            <div style={statCardStyle}>
              <div style={{ ...smallTextStyle, marginBottom: "4px" }}>
                Canteen Users
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                {canteens.length}
              </div>
            </div>
            <div style={statCardStyle}>
              <div style={{ ...smallTextStyle, marginBottom: "4px" }}>
                Orders
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                {orders.length}
              </div>
            </div>
          </div>
        </div>

        {activeTab === "complaints" && renderComplaints()}
        {activeTab === "students" && renderStudents()}
        {activeTab === "canteens" && renderCanteens()}
        {activeTab === "orders" && renderOrders()}
        {activeTab === "menus" && renderMenus()}
      </div>
    </div>
  );
}

export default AdminDashboard;
