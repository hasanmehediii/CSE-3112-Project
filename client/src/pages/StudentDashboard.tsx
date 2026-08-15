// src/pages/StudentDashboard.tsx
import { useEffect, useState, useCallback, type CSSProperties } from "react";
import { apiRequest, getErrorMessage } from "../api";
import { useAuth } from "../context/auth";

/* ───────────────────────── Types ───────────────────────── */
type Meal = {
  id: number;
  name: string;
  price: number;
  canteen_id: number;
  quantity: number;
  image_url?: string | null;
};

/* ─────────────────── Inject keyframes once ─────────────── */
const STYLE_ID = "sd-keyframes";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const sheet = document.createElement("style");
  sheet.id = STYLE_ID;
  sheet.textContent = `
    @keyframes sd-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes sd-pulse   { 0%,100%{opacity:.6} 50%{opacity:1} }
    @keyframes sd-fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes sd-shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    @keyframes sd-gradient { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    .sd-meal-card:hover { transform:translateY(-6px) scale(1.015) !important; box-shadow:0 28px 64px rgba(23,32,51,.22) !important; }
    .sd-quick-btn:hover { transform:translateY(-2px) !important; box-shadow:0 14px 32px rgba(234,88,12,.45) !important; background:linear-gradient(135deg,#c2410c,#ea580c) !important; }
    .sd-stat:hover { transform:translateY(-3px) !important; box-shadow:0 20px 48px rgba(23,32,51,.16) !important; }
    .sd-budget-card:hover { transform:translateY(-4px) !important; box-shadow:0 20px 48px rgba(23,32,51,.18) !important; }
    @media (max-width:860px) {
      .sd-main-grid { grid-template-columns:1fr !important; }
    }
    @media (max-width:560px) {
      .sd-meals-grid { grid-template-columns:1fr !important; }
      .sd-stats-row  { grid-template-columns:1fr 1fr !important; }
    }
  `;
  document.head.appendChild(sheet);
}

/* ────────────────────── Design Tokens ──────────────────── */
const brand    = "#ea580c";
const brandDk  = "#c2410c";
const ink      = "#172033";
const muted    = "#667085";
const surface  = "#ffffff";
const line     = "#e4e7ec";
const bg       = "#f7f8f4";
const radius   = 20;

/* ──────────────────────── SVG Icons ────────────────────── */
const IconMeals = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
  </svg>
);
const IconTag = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H2v10l9.29 9.29a1 1 0 001.42 0l6.58-6.58a1 1 0 000-1.42L12 6V2z"/><circle cx="7.5" cy="7.5" r="1.5"/>
  </svg>
);
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconTrend = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

/* ───────────────── Reusable Meal Card ──────────────────── */
type MealCardProps = {
  meal: Meal;
  variant: "default" | "budget";
  onQuickOrder?: (meal: Meal) => void;
  delay?: number;
};

const MealCard = ({ meal, variant, onQuickOrder, delay = 0 }: MealCardProps) => {
  const isLowStock = meal.quantity > 0 && meal.quantity <= 5;
  const soldOut = meal.quantity === 0;

  const cardStyle: CSSProperties = {
    borderRadius: radius,
    backgroundColor: surface,
    boxShadow: "0 12px 32px rgba(23,32,51,.10)",
    border: `1px solid ${line}`,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s cubic-bezier(.4,0,.2,1)",
    animation: `sd-fadeUp .5s ${delay * 60}ms both cubic-bezier(.4,0,.2,1)`,
    cursor: variant === "default" ? "default" : undefined,
  };

  const imgWrap: CSSProperties = {
    width: "100%",
    paddingTop: "56%",
    position: "relative",
    background: meal.image_url ? undefined : `linear-gradient(135deg, #fff7ed, #fef3c7)`,
    overflow: "hidden",
  };

  return (
    <div className={variant === "default" ? "sd-meal-card" : "sd-budget-card"} style={cardStyle}>
      {/* Image */}
      <div style={imgWrap}>
        {meal.image_url ? (
          <>
            <img
              src={meal.image_url}
              alt={meal.name}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(23,32,51,.18), transparent 60%)" }} />
          </>
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#d4a574", fontSize: "2rem" }}>
            🍽️
          </div>
        )}
        {/* Price badge on image */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)",
          padding: "4px 10px", borderRadius: 999,
          fontWeight: 750, fontSize: ".82rem", color: ink,
          boxShadow: "0 4px 12px rgba(23,32,51,.12)",
        }}>
          ৳ {meal.price}
        </div>
        {/* Stock badges */}
        {soldOut && (
          <div style={{
            position: "absolute", top: 10, left: 10,
            background: "rgba(220,38,38,.9)", color: "white",
            padding: "3px 9px", borderRadius: 999,
            fontSize: ".7rem", fontWeight: 700, letterSpacing: ".03em",
          }}>
            SOLD OUT
          </div>
        )}
        {isLowStock && !soldOut && (
          <div style={{
            position: "absolute", top: 10, left: 10,
            background: "rgba(234,88,12,.9)", color: "white",
            padding: "3px 9px", borderRadius: 999,
            fontSize: ".7rem", fontWeight: 700,
          }}>
            {meal.quantity} left
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 8, flexGrow: 1 }}>
        <div>
          <div style={{ fontSize: "1.02rem", fontWeight: 700, color: ink, lineHeight: 1.3 }}>{meal.name}</div>
          <div style={{ fontSize: ".78rem", color: muted, marginTop: 2 }}>
            Canteen #{meal.canteen_id}
            {meal.quantity > 5 && <span style={{ marginLeft: 8, color: "#16a34a" }}>• {meal.quantity} available</span>}
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          {variant === "default" && onQuickOrder && (
            <button
              className="sd-quick-btn"
              type="button"
              disabled={soldOut}
              onClick={() => onQuickOrder(meal)}
              style={{
                flex: 1,
                padding: "9px 14px",
                borderRadius: 999, border: "none",
                background: soldOut ? "#d1d5db" : `linear-gradient(135deg, ${brand}, ${brandDk})`,
                color: "white", cursor: soldOut ? "not-allowed" : "pointer",
                fontSize: ".82rem", fontWeight: 650,
                boxShadow: soldOut ? "none" : `0 10px 24px ${brand}44`,
                transition: "all .2s cubic-bezier(.4,0,.2,1)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
              {soldOut ? "Unavailable" : "Quick Order"}
            </button>
          )}
          {variant === "budget" && (
            <div style={{
              padding: "5px 12px", borderRadius: 999,
              background: "linear-gradient(135deg, rgba(22,163,74,.08), rgba(22,163,74,.16))",
              color: "#166534", fontSize: ".76rem", fontWeight: 650,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <IconTrend /> Budget pick
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────── Stat Card Sub-component ───────────────── */
type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent?: string;
  delay?: number;
};

const StatCard = ({ icon, label, value, accent, delay = 0 }: StatCardProps) => (
  <div
    className="sd-stat"
    style={{
      backgroundColor: surface,
      borderRadius: radius,
      padding: "18px 20px",
      boxShadow: "0 10px 28px rgba(23,32,51,.08)",
      border: `1px solid ${line}`,
      display: "flex", alignItems: "center", gap: 14,
      transition: "transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s cubic-bezier(.4,0,.2,1)",
      animation: `sd-fadeUp .5s ${delay}ms both cubic-bezier(.4,0,.2,1)`,
    }}
  >
    <div style={{
      width: 46, height: 46, borderRadius: 14,
      background: accent ?? "#fff7ed",
      display: "grid", placeItems: "center", flexShrink: 0,
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: ".78rem", color: muted, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: "1.3rem", fontWeight: 750, color: ink, marginTop: 1 }}>{value}</div>
    </div>
  </div>
);

/* ═══════════════════ Main Component ════════════════════ */
function StudentDashboard() {
  const { token } = useAuth();
  const [availableMeals, setAvailableMeals] = useState<Meal[]>([]);
  const [budgetDeals, setBudgetDeals] = useState<Meal[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const greeting = (() => {
    const h = time.getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const todayLabel = time.toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long",
  });

  const timeLabel = time.toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true,
  });

  // Fetch meals
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        setLoading(true);
        const [meals, budget] = await Promise.all([
          apiRequest<Meal[]>("/meals/available", {}, token),
          apiRequest<Meal[]>("/meals/available?sort=price", {}, token),
        ]);
        setAvailableMeals(meals);
        setBudgetDeals(budget);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const handleQuickOrder = useCallback(async (meal: Meal) => {
    if (!token) return;
    setMessage(null);
    try {
      const res = await apiRequest<{ id: number }>(
        "/orders/",
        {
          method: "POST",
          body: JSON.stringify({
            canteen_id: meal.canteen_id,
            mode: "pickup",
            delivery_address: null,
            items: [{ meal_id: meal.id, quantity: 1 }],
          }),
        },
        token,
      );
      setMessage(`Order #${res.id} placed for ${meal.name}`);
      // Refresh meal list to update quantities
      const meals = await apiRequest<Meal[]>("/meals/available", {}, token);
      setAvailableMeals(meals);
    } catch (err: unknown) {
      setMessage(getErrorMessage(err, "Could not place order"));
    }
  }, [token]);

  const cheapest =
    budgetDeals.length > 0
      ? budgetDeals[0].price
      : availableMeals.length > 0
        ? Math.min(...availableMeals.map((m) => m.price))
        : null;

  const uniqueCanteens = new Set(availableMeals.map((m) => m.canteen_id)).size;

  /* ─────────── Shimmer placeholder while loading ────────── */
  const ShimmerCard = () => (
    <div style={{
      borderRadius: radius, overflow: "hidden",
      backgroundColor: "#f3f4f6", border: `1px solid ${line}`,
    }}>
      <div style={{
        height: 140,
        background: "linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)",
        backgroundSize: "800px 100%",
        animation: "sd-shimmer 1.8s infinite linear",
      }} />
      <div style={{ padding: 16 }}>
        <div style={{ height: 14, width: "70%", borderRadius: 6, background: "#e5e7eb", marginBottom: 10 }} />
        <div style={{ height: 12, width: "50%", borderRadius: 6, background: "#e5e7eb" }} />
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh", padding: "100px 20px 48px", background: bg,
    }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* ────────── Hero Section ────────── */}
        <div style={{
          borderRadius: radius + 4,
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e1b4b 100%)",
          backgroundSize: "200% 200%",
          animation: "sd-gradient 8s ease infinite",
          padding: "36px 32px 32px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 24px 56px rgba(15,23,42,.35)",
        }}>
          {/* Decorative orbs */}
          <div style={{
            position: "absolute", top: -40, right: -20,
            width: 200, height: 200, borderRadius: "50%",
            background: `radial-gradient(circle, ${brand}30, transparent 70%)`,
            animation: "sd-float 6s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: -30, left: "30%",
            width: 160, height: 160, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,.2), transparent 70%)",
            animation: "sd-float 8s ease-in-out infinite 1s",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" as const, marginBottom: 6 }}>
                  Student Dashboard
                </div>
                <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 800, color: "white", lineHeight: 1.2 }}>
                  {greeting} 👋
                </h1>
                <p style={{ margin: "8px 0 0", fontSize: ".92rem", color: "rgba(255,255,255,.6)", maxWidth: 480, lineHeight: 1.6 }}>
                  Explore today's meals from campus canteens. Find budget-friendly options or place a quick pickup order.
                </p>
              </div>
              <div style={{ textAlign: "right" as const }}>
                <div style={{ fontSize: ".82rem", color: "rgba(255,255,255,.45)" }}>{todayLabel}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", fontVariantNumeric: "tabular-nums" }}>{timeLabel}</div>
              </div>
            </div>

            {/* Quick stat chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
              {[
                { label: `${availableMeals.length} meal${availableMeals.length !== 1 ? "s" : ""} available`, accent: brand },
                ...(cheapest !== null ? [{ label: `From ৳ ${cheapest}`, accent: "#16a34a" }] : []),
                ...(uniqueCanteens > 0 ? [{ label: `${uniqueCanteens} canteen${uniqueCanteens !== 1 ? "s" : ""} open`, accent: "#6366f1" }] : []),
              ].map((chip, i) => (
                <span key={i} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "5px 14px", borderRadius: 999,
                  background: "rgba(255,255,255,.08)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,.12)",
                  color: "rgba(255,255,255,.85)",
                  fontSize: ".78rem", fontWeight: 600,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: chip.accent }} />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ────────── Toast Message ────────── */}
        {message && (
          <div style={{
            marginBottom: 18, padding: "12px 18px",
            borderRadius: 14,
            background: message.startsWith("Order #")
              ? "linear-gradient(135deg, rgba(22,163,74,.08), rgba(22,163,74,.04))"
              : "linear-gradient(135deg, rgba(220,38,38,.08), rgba(220,38,38,.04))",
            border: `1px solid ${message.startsWith("Order #") ? "rgba(22,163,74,.2)" : "rgba(220,38,38,.2)"}`,
            color: message.startsWith("Order #") ? "#166534" : "#b91c1c",
            fontSize: ".88rem", fontWeight: 550,
            display: "flex", alignItems: "center", gap: 10,
            animation: "sd-fadeUp .3s both",
          }}>
            <span style={{ fontSize: "1.1rem" }}>{message.startsWith("Order #") ? "✅" : "⚠️"}</span>
            {message}
            <button
              onClick={() => setMessage(null)}
              style={{
                marginLeft: "auto", background: "none", border: "none",
                color: "inherit", cursor: "pointer", fontSize: ".9rem", padding: "2px 6px",
                borderRadius: 6, opacity: .6,
              }}
            >✕</button>
          </div>
        )}

        {/* ────────── Stats Row ────────── */}
        <div className="sd-stats-row" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14, marginBottom: 24,
        }}>
          <StatCard icon={<IconMeals />} label="Available Meals" value={availableMeals.length || "—"} delay={100} />
          <StatCard icon={<IconTag />} label="Lowest Price" value={cheapest !== null ? `৳ ${cheapest}` : "—"} delay={160} />
          <StatCard icon={<IconClock />} label="Open Canteens" value={uniqueCanteens || "—"} accent="#eff6ff" delay={220} />
          <StatCard
            icon={<IconTrend />}
            label="Budget Picks"
            value={budgetDeals.length || "—"}
            accent="rgba(22,163,74,.08)"
            delay={280}
          />
        </div>

        {/* ────────── Main Grid ────────── */}
        <div className="sd-main-grid" style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 5fr) minmax(0, 2fr)",
          gap: 20,
        }}>
          {/* ──── Left: Available Meals ──── */}
          <div style={{
            backgroundColor: surface, borderRadius: radius,
            padding: "22px 24px 24px",
            boxShadow: "0 10px 28px rgba(23,32,51,.06)",
            border: `1px solid ${line}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: ink }}>
                🍜 Today's Available Meals
              </h2>
              <span style={{ fontSize: ".78rem", color: muted }}>
                {availableMeals.length} item{availableMeals.length !== 1 ? "s" : ""}
              </span>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: ".82rem", color: muted, lineHeight: 1.5 }}>
              Fresh meals from campus canteens. Tap <strong>Quick Order</strong> for instant pickup.
            </p>

            <div style={{ maxHeight: 660, overflowY: "auto", paddingRight: 4 }}>
              {loading ? (
                <div className="sd-meals-grid" style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: 16,
                }}>
                  {[...Array(4)].map((_, i) => <ShimmerCard key={i} />)}
                </div>
              ) : availableMeals.length === 0 ? (
                <div style={{
                  padding: "48px 20px", textAlign: "center", color: muted,
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🍃</div>
                  <div style={{ fontWeight: 600, color: ink, marginBottom: 4 }}>No meals right now</div>
                  <div style={{ fontSize: ".85rem" }}>Campus canteens haven't posted any meals yet. Check back later!</div>
                </div>
              ) : (
                <div className="sd-meals-grid" style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: 16,
                }}>
                  {availableMeals.map((m, i) => (
                    <MealCard key={m.id} meal={m} variant="default" onQuickOrder={handleQuickOrder} delay={i} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ──── Right: Budget Picks ──── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              backgroundColor: surface, borderRadius: radius,
              padding: "20px",
              boxShadow: "0 10px 28px rgba(23,32,51,.06)",
              border: `1px solid ${line}`,
              animation: "sd-fadeUp .5s 200ms both",
            }}>
              <h2 style={{ margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 700, color: ink }}>
                💰 Budget Picks
              </h2>
              <p style={{ margin: "0 0 14px", fontSize: ".78rem", color: muted, lineHeight: 1.5 }}>
                Wallet-friendly meals, sorted low → high.
              </p>

              <div style={{ maxHeight: 540, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} style={{
                      height: 72, borderRadius: 14,
                      background: "linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)",
                      backgroundSize: "800px 100%",
                      animation: "sd-shimmer 1.8s infinite linear",
                    }} />
                  ))
                ) : budgetDeals.length === 0 ? (
                  <div style={{ padding: "28px 12px", textAlign: "center", color: muted, fontSize: ".85rem" }}>
                    No budget meals available yet.
                  </div>
                ) : (
                  budgetDeals.slice(0, 8).map((m, i) => (
                    <div
                      key={m.id}
                      className="sd-budget-card"
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: 12, borderRadius: 14,
                        border: `1px solid ${line}`,
                        backgroundColor: i === 0 ? "#fffbf5" : surface,
                        boxShadow: "0 4px 12px rgba(23,32,51,.04)",
                        transition: "transform .2s, box-shadow .2s",
                        animation: `sd-fadeUp .4s ${200 + i * 60}ms both`,
                      }}
                    >
                      {/* Thumbnail */}
                      <div style={{
                        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                        background: m.image_url ? undefined : "linear-gradient(135deg, #fff7ed, #fef3c7)",
                        overflow: "hidden",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {m.image_url ? (
                          <img src={m.image_url} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                          />
                        ) : (
                          <span style={{ fontSize: "1.2rem" }}>🍽️</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: ".85rem", fontWeight: 650, color: ink,
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>{m.name}</div>
                        <div style={{ fontSize: ".72rem", color: muted }}>Canteen #{m.canteen_id}</div>
                      </div>
                      <div style={{
                        fontWeight: 750, fontSize: ".9rem", color: brand,
                        whiteSpace: "nowrap",
                      }}>
                        ৳ {m.price}
                      </div>
                      {i === 0 && (
                        <div style={{
                          position: "absolute" as const, top: -1, right: 12,
                          background: `linear-gradient(135deg, ${brand}, ${brandDk})`,
                          color: "white", fontSize: ".6rem", fontWeight: 700,
                          padding: "2px 8px 3px", borderRadius: "0 0 6px 6px",
                          letterSpacing: ".04em",
                        }}>
                          CHEAPEST
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Tips Card */}
            <div style={{
              background: "linear-gradient(135deg, #fff7ed, #fffbeb)",
              borderRadius: radius,
              padding: "20px",
              border: `1px solid #fed7aa`,
              animation: "sd-fadeUp .5s 400ms both",
            }}>
              <div style={{ fontSize: ".92rem", fontWeight: 700, color: ink, marginBottom: 10 }}>
                💡 Quick Tips
              </div>
              {[
                "Tap Quick Order for 1-item instant pickup",
                "Budget picks show the cheapest meals first",
                "Check back often — menus update daily",
              ].map((tip, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 8,
                  marginBottom: i < 2 ? 8 : 0,
                  fontSize: ".78rem", color: muted, lineHeight: 1.5,
                }}>
                  <span style={{
                    flexShrink: 0, width: 18, height: 18, borderRadius: "50%",
                    background: `${brand}14`, color: brand,
                    display: "grid", placeItems: "center",
                    fontSize: ".65rem", fontWeight: 700, marginTop: 1,
                  }}>{i + 1}</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
