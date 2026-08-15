// src/components/Footer.tsx
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

const footerWrapperStyle: CSSProperties = {
  background: "#080b12",
  color: "#94a3b8",
  padding: "36px 24px 24px",
  marginTop: "auto",
  borderTop: "1px solid rgba(148,163,184,.08)",
};

const footerInnerStyle: CSSProperties = {
  maxWidth: "1140px",
  margin: "0 auto",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "28px",
};

const brandBlockStyle: CSSProperties = {
  minWidth: "220px",
};

const brandRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "8px",
};

const brandLogoStyle: CSSProperties = {
  height: 28,
  width: 28,
  borderRadius: "50%",
  objectFit: "cover",
};

const brandTextStyle: CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "white",
};

const brandTaglineStyle: CSSProperties = {
  fontSize: ".88rem",
  color: "#64748b",
  maxWidth: "280px",
  lineHeight: 1.6,
};

const columnsWrapperStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "36px",
};

const columnStyle: CSSProperties = {
  minWidth: "140px",
};

const columnTitleStyle: CSSProperties = {
  fontSize: ".76rem",
  fontWeight: 700,
  color: "#94a3b8",
  marginBottom: "10px",
  letterSpacing: ".1em",
  textTransform: "uppercase",
};

const linkListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontSize: ".88rem",
};

const footerLinkStyle: CSSProperties = {
  color: "#64748b",
  textDecoration: "none",
  transition: "color .2s",
};

const mutedTextStyle: CSSProperties = {
  fontSize: ".84rem",
  color: "#475569",
};

const bottomRowStyle: CSSProperties = {
  maxWidth: "1140px",
  margin: "20px auto 0",
  borderTop: "1px solid rgba(148,163,184,.06)",
  paddingTop: "14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  fontSize: ".78rem",
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
        <span style={{ ...mutedTextStyle, color: "#475569" }}>
          © {new Date().getFullYear()} Khaikhai Meal System. All rights reserved.
        </span>
        <span style={{ ...mutedTextStyle, color: "#475569" }}>
          Made for campus life 🍽️
        </span>
      </div>
    </footer>
  );
}

export default Footer;
