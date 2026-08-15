import { Link } from "react-router-dom";

const roles = [
  {
    icon: "🎓",
    title: "Students",
    text: "Browse live menus, order ahead, track meals, and raise complaints from web or Android.",
  },
  {
    icon: "🍳",
    title: "Canteen Teams",
    text: "Publish inventory, manage incoming orders, and keep students updated throughout service.",
  },
  {
    icon: "🏛️",
    title: "University Admins",
    text: "Provision trusted canteens, manage users, and resolve issues from one operational view.",
  },
];

const stats = [
  { value: "3", label: "Role-based portals" },
  { value: "Live", label: "Real-time menus" },
  { value: "100%", label: "Transparent ops" },
  { value: "24/7", label: "Always available" },
];

const previews = [
  { src: "/background4.jpg", alt: "KhaiKhai student dashboard", label: "Student ordering" },
  { src: "/background2.jpg", alt: "KhaiKhai canteen menu management", label: "Canteen operations" },
  { src: "/background5.jpg", alt: "KhaiKhai complaint management", label: "Accountability" },
];

export default function HomePage() {
  return (
    <main className="landing">
      {/* ── Hero ── */}
      <section className="landing__hero" aria-labelledby="hero-title">
        <div className="landing__hero-copy">
          <span className="eyebrow">University of Dhaka · campus pilot</span>
          <h1 id="hero-title">
            Campus meals{" "}
            <span className="gradient-text">without the queue</span>{" "}
            or guesswork.
          </h1>
          <p>
            One reliable place for students to order, canteens to operate, and
            university teams to keep service accountable — all in real time.
          </p>
          <div className="landing__actions">
            <Link className="button button--primary" to="/register">
              Create student account
            </Link>
            <Link className="button button--secondary" to="/login">
              Sign in to your portal
            </Link>
          </div>
          <div className="landing__trust" aria-label="Product highlights">
            <span>Live availability</span>
            <span>Role-secured portals</span>
            <span>Shared web + app API</span>
          </div>
        </div>
        <div className="landing__visual" aria-hidden="true">
          <img src="background1.jpg" alt="" />
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section className="section section--alt" aria-label="Key metrics">
        <div className="stats-row">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Roles ── */}
      <section className="section" aria-labelledby="roles-title">
        <span className="eyebrow">Built for the whole campus</span>
        <h2 id="roles-title">A focused workspace for every role</h2>
        <p className="section__lead">
          Each user gets a tailored experience — students browse and order, canteens
          manage inventory, and admins keep everything running smoothly.
        </p>
        <div className="card-grid">
          {roles.map((role) => (
            <article className="feature-card" key={role.title}>
              <span className="feature-card__icon" aria-hidden="true">
                {role.icon}
              </span>
              <h3>{role.title}</h3>
              <p>{role.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Product Previews ── */}
      <section className="section section--alt" aria-labelledby="preview-title">
        <span className="eyebrow">The real product</span>
        <h2 id="preview-title">Simple workflows, visible progress</h2>
        <p className="section__lead">
          These are current KhaiKhai screens — not generic mockups. Real
          functionality, real data.
        </p>
        <div className="preview-grid">
          {previews.map((preview) => (
            <figure className="preview-card" key={preview.label}>
              <img src={preview.src} alt={preview.alt} loading="lazy" />
              <figcaption>{preview.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="landing__cta">
        <div>
          <span className="eyebrow">Ready for lunch?</span>
          <h2>See what campus canteens are serving.</h2>
        </div>
        <Link className="button button--primary" to="/register">
          Get started
        </Link>
      </section>
    </main>
  );
}
