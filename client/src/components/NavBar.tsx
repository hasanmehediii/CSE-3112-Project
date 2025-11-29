import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#1f2933",
    color: "white",
};

const linkContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
};

const linkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
    fontSize: "0.9rem",
    padding: "6px 10px",
    borderRadius: "4px",
};

const brandStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: "1rem",
};

const buttonStyle: React.CSSProperties = {
    padding: "6px 10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#f97316",
    color: "white",
    cursor: "pointer",
    fontSize: "0.9rem",
};

function NavBar() {
    const { token, userRole, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={navStyle}>
            <div style={brandStyle}>🍛 Meal System</div>
            <div style={linkContainerStyle}>
                {!token && (
                    <>
                        <Link style={linkStyle} to="/login">
                            Login
                        </Link>
                        <Link style={linkStyle} to="/register">
                            Register
                        </Link>
                    </>
                )}
                {token && userRole === "student" && (
                    <Link style={linkStyle} to="/student">
                        Student Dashboard
                    </Link>
                )}
                {token && userRole === "canteen" && (
                    <>
                        <Link style={linkStyle} to="/canteen">
                            Canteen Dashboard
                        </Link>
                        <Link style={linkStyle} to="/canteen/profile">
                            Profile
                        </Link>
                        <Link style={linkStyle} to="/canteen/complaints">
                            Complaints
                        </Link>
                    </>
                )}

                {token && userRole === "admin" && (
                    <Link style={linkStyle} to="/admin">
                        Admin Dashboard
                    </Link>
                )}
                {token && (
                    <button style={buttonStyle} onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
