// src/components/Footer.tsx
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

const footerWrapperStyle: CSSProperties = {
  background:
    "radial-gradient(circle at top left, #1f2933, #020617)",
  color: "#9ca3af",
  padding: "28px 20px 20px",
  marginTop: "auto",
  borderTop: "1px solid rgba(148, 163, 184, 0.35)",
};

const footerInnerStyle: CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "24px",
};

const brandBlockStyle: CSSProperties = {
  minWidth: "220px",
};

const brandRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "6px",
};

const brandLogoStyle: CSSProperties = {
  height: 26,
  width: 26,
  borderRadius: "50%",
  objectFit: "cover",
};

const brandTextStyle: CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 600,
  color: "white",
};

const brandTaglineStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "#9ca3af",
  maxWidth: "260px",
};

const columnsWrapperStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "32px",
};

const columnStyle: CSSProperties = {
  minWidth: "140px",
};

const columnTitleStyle: CSSProperties = {
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "#e5e7eb",
  marginBottom: "8px",
  letterSpacing: "0.03em",
  textTransform: "uppercase",
};

const linkListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  fontSize: "0.9rem",
};

const footerLinkStyle: CSSProperties = {
  color: "#9ca3af",
  textDecoration: "none",
};

const mutedTextStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#6b7280",
};

const bottomRowStyle: CSSProperties = {
  maxWidth: "1100px",
  margin: "18px auto 0",
  borderTop: "1px solid rgba(31, 41, 55, 0.8)",
  paddingTop: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  fontSize: "0.8rem",
};

function Footer() {
  return (
    <footer style={footerWrapperStyle}>
      <div style={footerInnerStyle}>
        {/* Brand + tagline */}
        <div style={brandBlockStyle}>
          <div style={brandRowStyle}>
            <img src="/logo.png" alt="Khaikhai" style={brandLogoStyle} />
            <span style={brandTextStyle}>KhaiKhai</span>
          </div>
          <p style={brandTaglineStyle}>
            Smart campus meal management for students, canteens, and admins —
            organised, transparent, and easy to use.
          </p>
        </div>

        {/* Columns */}
        <div style={columnsWrapperStyle}>
          {/* Product */}
          <div style={columnStyle}>
            <div style={columnTitleStyle}>Product</div>
            <div style={linkListStyle}>
              <Link to="/about" style={footerLinkStyle}>
                About
              </Link>
              <Link to="/faq" style={footerLinkStyle}>
                FAQ
              </Link>
              <Link to="/contact" style={footerLinkStyle}>
                Contact
              </Link>
            </div>
          </div>

          {/* For campus */}
          <div style={columnStyle}>
            <div style={columnTitleStyle}>For Campus</div>
            <div style={linkListStyle}>
              <span style={mutedTextStyle}>Students dashboard</span>
              <span style={mutedTextStyle}>Canteen management</span>
              <span style={mutedTextStyle}>Admin oversight</span>
            </div>
          </div>

          {/* Contact / meta */}
          <div style={columnStyle}>
            <div style={columnTitleStyle}>Support</div>
            <div style={linkListStyle}>
              <span style={mutedTextStyle}>Email: support@khaikhai.app</span>
              <span style={mutedTextStyle}>Helpdesk: 09:00 – 17:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={bottomRowStyle}>
        <span style={mutedTextStyle}>
          © {new Date().getFullYear()} Khaikhai Meal System. All rights reserved.
        </span>
        <span style={mutedTextStyle}>
          Made for campus life 🍽️
        </span>
      </div>
    </footer>
  );
}

export default Footer;
