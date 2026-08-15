import { Link } from "react-router-dom";

const roles = [
  { icon: "🎓", title: "Students", text: "Browse live menus, order ahead, track meals, and raise complaints from web or Android." },
  { icon: "🍳", title: "Canteen teams", text: "Publish inventory, manage incoming orders, and keep students updated throughout service." },
  { icon: "🏛️", title: "University admins", text: "Provision trusted canteens, manage users, and resolve issues from one operational view." },
];

const previews = [
  { src: "/product/student-dashboard.png", alt: "KhaiKhai student dashboard", label: "Student ordering" },
  { src: "/product/canteen-menu.png", alt: "KhaiKhai canteen menu management", label: "Canteen operations" },
  { src: "/product/complaints.png", alt: "KhaiKhai complaint management", label: "Accountability" },
];

export default function HomePage() {
  return (
    <main className="landing">
      <section className="landing__hero" aria-labelledby="hero-title">
        <div className="landing__hero-copy">
          <span className="eyebrow">University of Dhaka · campus pilot</span>
          <h1 id="hero-title">Campus meals without the queue or guesswork.</h1>
          <p>One reliable place for students to order, canteens to operate, and university teams to keep service accountable.</p>
          <div className="landing__actions">
            <Link className="button button--primary" to="/register">Create student account</Link>
            <Link className="button button--secondary" to="/login">Sign in to your portal</Link>
          </div>
          <div className="landing__trust" aria-label="Product highlights">
            <span>Live availability</span><span>Role-secured portals</span><span>Shared web + app API</span>
          </div>
        </div>
        <div className="landing__visual" aria-hidden="true">
          <img src="/product/student-dashboard.png" alt="" />
        </div>
      </section>

      <section className="section" aria-labelledby="roles-title">
        <span className="eyebrow">Built for the whole campus</span>
        <h2 id="roles-title">A focused workspace for every role</h2>
        <div className="card-grid">
          {roles.map((role) => (
            <article className="feature-card" key={role.title}>
              <span className="feature-card__icon" aria-hidden="true">{role.icon}</span>
              <h3>{role.title}</h3>
              <p>{role.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="preview-title">
        <span className="eyebrow">The real product</span>
        <h2 id="preview-title">Simple workflows, visible progress</h2>
        <p className="section__lead">These are current KhaiKhai screens—not generic mockups.</p>
        <div className="preview-grid">
          {previews.map((preview) => (
            <figure className="preview-card" key={preview.label}>
              <img src={preview.src} alt={preview.alt} loading="lazy" />
              <figcaption>{preview.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="landing__cta">
        <div><span className="eyebrow">Ready for lunch?</span><h2>See what campus canteens are serving.</h2></div>
        <Link className="button button--primary" to="/register">Get started</Link>
      </section>
    </main>
  );
}
