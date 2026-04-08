import { useState, useEffect, useRef } from "react";

/* ─── GOOGLE FONTS INJECTION ────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap";
document.head.appendChild(fontLink);

/* ─── GLOBAL STYLES ─────────────────────────────────────── */
const globalStyle = document.createElement("style");
globalStyle.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #080706; color: #F0E8D8; font-family: 'DM Sans', sans-serif; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #080706; }
  ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }

  .font-display { font-family: 'Playfair Display', serif; }
  .font-body { font-family: 'DM Sans', sans-serif; }
  .font-editorial { font-family: 'Cormorant Garamond', serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes scrollPulse {
    0%, 100% { transform: translateY(0) scaleY(1); opacity: 1; }
    50%       { transform: translateY(8px) scaleY(0.6); opacity: 0.4; }
  }
  @keyframes menuSlide {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin360 {
    to { transform: rotate(360deg); }
  }

  .anim-fade-up  { animation: fadeUp  0.7s cubic-bezier(.22,1,.36,1) both; }
  .anim-fade-in  { animation: fadeIn  0.5s ease both; }
  .anim-menu     { animation: menuSlide 0.35s cubic-bezier(.22,1,.36,1) both; }

  .gold-shimmer {
    background: linear-gradient(90deg, #C9A84C 0%, #F2D98A 40%, #C9A84C 60%, #9C7A2E 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .btn-primary {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%);
    background-size: 200% auto;
    color: #080706;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 14px 32px;
    border: none;
    cursor: pointer;
    transition: background-position 0.4s ease, transform 0.25s ease, box-shadow 0.25s ease;
    border-radius: 2px;
  }
  .btn-primary:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(201,168,76,0.35);
  }
  .btn-primary:active { transform: translateY(0); }

  .btn-outline {
    position: relative; overflow: hidden;
    background: transparent;
    color: #C9A84C;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 13px 32px;
    border: 1px solid rgba(201,168,76,0.5);
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 2px;
  }
  .btn-outline:hover {
    background: rgba(201,168,76,0.08);
    border-color: #C9A84C;
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(201,168,76,0.15);
  }

  .glass-card {
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(201,168,76,0.12);
    border-radius: 8px;
  }
  .glass-card:hover {
    background: rgba(255,255,255,0.055);
    border-color: rgba(201,168,76,0.3);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.08);
  }
  .glass-card { transition: all 0.4s cubic-bezier(.22,1,.36,1); }

  .nav-link {
    position: relative;
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 400;
    color: #9C8A6A;
    background: none; border: none; cursor: pointer;
    padding: 4px 0;
    transition: color 0.3s ease;
    font-family: 'DM Sans', sans-serif;
  }
  .nav-link::after {
    content: '';
    position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: linear-gradient(90deg, #C9A84C, #E8C97A);
    transition: width 0.35s cubic-bezier(.22,1,.36,1);
  }
  .nav-link:hover { color: #F0E8D8; }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active { color: #C9A84C; }
  .nav-link.active::after { width: 100%; }

  .img-zoom { transition: transform 0.7s cubic-bezier(.22,1,.36,1); }
  .img-zoom:hover { transform: scale(1.07); }

  .section-divider {
    display: flex; align-items: center; justify-content: center; gap: 12px;
    margin: 16px 0;
  }
  .section-divider span { display: block; height: 1px; width: 64px;
    background: linear-gradient(90deg, transparent, #C9A84C); }
  .section-divider span:last-child { transform: scaleX(-1); }
  .section-divider i { width: 5px; height: 5px; border-radius: 50%;
    background: #C9A84C; display: block; }

  .input-line {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(201,168,76,0.2);
    padding: 12px 0;
    color: #F0E8D8;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    outline: none;
    transition: border-color 0.3s ease;
  }
  .input-line::placeholder { color: rgba(156,138,106,0.45); }
  .input-line:focus { border-color: #C9A84C; }

  .tag-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.58rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 4px 10px;
    background: linear-gradient(135deg, #C9A84C, #E8C97A);
    color: #080706;
    border-radius: 2px;
  }

  /* Testimonial transition */
  .testimonial-enter { animation: fadeUp 0.5s ease both; }

  /* Timeline line */
  .timeline-track { position: relative; }
  .timeline-track::before {
    content: '';
    position: absolute; left: 50%; top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.3) 15%, rgba(201,168,76,0.3) 85%, transparent);
    transform: translateX(-50%);
  }

  /* Portfolio hover overlay */
  .portfolio-item .overlay {
    opacity: 0;
    transition: opacity 0.35s ease;
  }
  .portfolio-item:hover .overlay { opacity: 1; }
  .portfolio-item:hover .img-zoom { transform: scale(1.07); }

  /* Success banner */
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); max-height: 0; }
    to   { opacity: 1; transform: translateY(0); max-height: 80px; }
  }
  .success-banner { animation: slideDown 0.4s ease both; }

  /* Award card glow */
  .award-card:hover {
    box-shadow: 0 0 40px rgba(201,168,76,0.12), inset 0 0 40px rgba(201,168,76,0.03);
  }
`;
document.head.appendChild(globalStyle);

/* ─── DATA ─────────────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Contact"];

const DISHES = [
  { name: "Saffron Lobster Bisque", desc: "House-smoked cream, micro herbs, caviar pearls", tag: "Chef's Signature", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80" },
  { name: "Wagyu Tenderloin A5",    desc: "Truffle jus, pomme purée, seasonal greens",      tag: "Most Loved",      img: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80" },
  { name: "Black Truffle Risotto",  desc: "Aged parmesan, wild mushrooms, gold leaf",        tag: "Vegetarian",      img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80" },
  { name: "Miso Glazed Sea Bass",   desc: "Dashi broth, pickled radish, yuzu foam",          tag: "Seasonal",        img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80" },
];

const USPS = [
  { icon: "🌿", title: "Farm-to-Table",       desc: "Every ingredient is sourced fresh daily from certified organic farms and local artisan producers." },
  { icon: "🏆", title: "Award-Winning Chefs", desc: "Our team holds 3 Michelin stars and has been recognised by the World's 50 Best Restaurants." },
  { icon: "✨", title: "Unmatched Ambience",  desc: "Every corner of Aurum is designed to transport you — from the lighting to the table linens." },
  { icon: "🍷", title: "Curated Wine Cellar", desc: "Over 800 labels selected by our resident sommelier from the finest vineyards worldwide." },
];

const TESTIMONIALS = [
  { name: "Priya Mehta",      role: "Food Critic, Condé Nast",   quote: "Aurum doesn't just serve food — it orchestrates an entire sensory performance. A transcendent evening every single time.", stars: 5 },
  { name: "James Whitfield",  role: "CEO, Whitfield Group",      quote: "We've hosted board dinners at Aurum for three years. The consistency of excellence is simply unmatched anywhere in the city.", stars: 5 },
  { name: "Aisha Kapoor",     role: "Travel Blogger",            quote: "If I could only eat at one restaurant for the rest of my life, it would be Aurum. Bold claim — absolutely meant.", stars: 5 },
];

const SERVICES = [
  { icon: "🍽️", title: "Fine Dining Experience",  desc: "An intimate à la carte journey through seasonal tasting menus, crafted fresh each evening by Chef Laurent and his brigade." },
  { icon: "🥂", title: "Private Events & Dining",  desc: "Exclusive private rooms for up to 40 guests. Perfect for anniversaries, proposals, corporate celebrations, and bespoke occasions." },
  { icon: "🚐", title: "Luxury Catering",          desc: "Bring the Aurum experience to your venue. Our catering team delivers the same Michelin-starred quality, wherever you are." },
  { icon: "📅", title: "Online Reservations",      desc: "Secure your table instantly via our seamless booking system. Personalise your visit with dietary notes and special requests." },
];

const PORTFOLIO_ITEMS = [
  { category: "Food",     img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",  title: "Wagyu Elegance" },
  { category: "Interior", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",    title: "The Main Hall" },
  { category: "Food",     img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",  title: "Dessert Architecture" },
  { category: "Events",   img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80", title: "Private Gala Evening" },
  { category: "Interior", img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80", title: "Wine Cellar" },
  { category: "Food",     img: "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=600&q=80",  title: "Garden Harvest" },
  { category: "Events",   img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80", title: "Corporate Dinner" },
  { category: "Interior", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", title: "The Lounge Bar" },
  { category: "Food",     img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",  title: "Seasonal Plating" },
];

const TIMELINE = [
  { year: "2008", title: "The Beginning",       desc: "Chef Laurent Moreau opens Aurum as a 30-seat bistro in South Mumbai with a single vision: honest luxury." },
  { year: "2012", title: "First Michelin Star", desc: "Four years of relentless refinement earns Aurum its first Michelin star — the first in Maharashtra." },
  { year: "2017", title: "The Grand Expansion", desc: "A full renovation transforms Aurum into a 120-seat temple of fine dining, with a private event wing." },
  { year: "2022", title: "Third Star Awarded",  desc: "Aurum joins a rarefied group of three-star establishments in Asia, cementing its global reputation." },
];

/* ─── SHARED COMPONENTS ─────────────────────────────────── */
function Divider() {
  return (
    <div className="section-divider">
      <span /><i /><span />
    </div>
  );
}

function Label({ text }) {
  return (
    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.62rem",
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color: "#C9A84C",
      fontWeight: 500,
      marginBottom: "10px",
    }}>
      {text}
    </p>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: scrolled ? "14px 48px" : "24px 48px",
    background: scrolled
      ? "rgba(8,7,6,0.82)"
      : "linear-gradient(to bottom, rgba(8,7,6,0.7), transparent)",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "none",
    transition: "padding 0.4s ease, background 0.4s ease, border 0.4s ease",
  };

  const logoStyle = {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.35rem",
    fontWeight: 700,
    letterSpacing: "0.18em",
    color: "#C9A84C",
    background: "none", border: "none", cursor: "pointer",
    display: "flex", alignItems: "baseline", gap: "2px",
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <button onClick={() => setActivePage("Home")} style={logoStyle}>
        AURUM
        <span style={{ fontStyle: "italic", fontWeight: 300, color: "#F0E8D8", fontSize: "1.45rem" }}>.</span>
      </button>

      {/* Desktop nav */}
      <ul style={{ display: "flex", alignItems: "center", gap: "40px", listStyle: "none" }}
        className="hidden-mobile">
        {NAV_LINKS.map(p => (
          <li key={p}>
            <button
              onClick={() => setActivePage(p)}
              className={`nav-link${activePage === p ? " active" : ""}`}>
              {p}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => setActivePage("Contact")}
        className="btn-outline hidden-mobile"
        style={{ padding: "10px 24px" }}>
        Reserve a Table
      </button>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(v => !v)}
        className="show-mobile"
        style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", gap: "5px", padding: "4px",
        }}
        aria-label="Menu">
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: "block", width: 22, height: "1.5px",
            background: "#C9A84C",
            transformOrigin: "center",
            transition: "all 0.3s ease",
            transform: menuOpen
              ? i === 0 ? "rotate(45deg) translate(4.5px,4.5px)"
              : i === 2 ? "rotate(-45deg) translate(4.5px,-4.5px)"
              : "scaleX(0)"
              : "none",
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="anim-menu" style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(8,7,6,0.97)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          padding: "32px 24px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "28px",
        }}>
          {NAV_LINKS.map(p => (
            <button key={p}
              onClick={() => { setActivePage(p); setMenuOpen(false); }}
              className={`nav-link${activePage === p ? " active" : ""}`}
              style={{ fontSize: "0.75rem" }}>
              {p}
            </button>
          ))}
          <button
            onClick={() => { setActivePage("Contact"); setMenuOpen(false); }}
            className="btn-primary" style={{ marginTop: "8px", padding: "12px 36px" }}>
            Reserve a Table
          </button>
        </div>
      )}

      {/* Responsive styles injected once */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

/* ─── HOME PAGE ──────────────────────────────────────────── */
function Home({ setActivePage }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length);
      setKey(k => k + 1);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#080706" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=85"
            alt="Fine dining" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} loading="lazy" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,7,6,0.55) 0%, rgba(8,7,6,0.1) 40%, rgba(8,7,6,0.8) 100%)" }} />
          {/* Subtle radial glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        </div>

        <div className="anim-fade-up" style={{ position: "relative", textAlign: "center", padding: "0 24px", maxWidth: "860px" }}>
          <Label text="Established 2008 · Malabar Hill, Mumbai" />
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            fontWeight: 700, lineHeight: 1.05,
            color: "#F0E8D8", marginBottom: "8px",
          }}>
            Where Taste
          </h1>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.05, marginBottom: "32px",
          }}>
            <span className="gold-shimmer">Meets Luxury</span>
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            fontWeight: 300, color: "#9C8A6A",
            maxWidth: "480px", margin: "0 auto 48px",
            lineHeight: 1.8, letterSpacing: "0.02em",
          }}>
            Three Michelin stars. One unforgettable evening.<br />
            Mumbai's temple of fine dining since 2008.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
            <button className="btn-primary" onClick={() => setActivePage("Contact")}>
              Reserve a Table
            </button>
            <button className="btn-outline" onClick={() => setActivePage("Services")}>
              Explore Menu
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)" }}>Scroll</p>
        </div>
      </section>

      {/* ── FEATURED DISHES ──────────────────────────────── */}
      <section style={{ padding: "120px 24px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <Label text="The Kitchen's Pride" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600, color: "#F0E8D8" }}>
            Featured Dishes
          </h2>
          <Divider />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          {DISHES.map((dish, i) => (
            <div key={i} style={{
              position: "relative", borderRadius: "8px", overflow: "hidden",
              cursor: "pointer", border: "1px solid rgba(201,168,76,0.1)",
              transition: "all 0.45s cubic-bezier(.22,1,.36,1)",
              animationDelay: `${i * 0.08}s`,
            }}
              className="anim-fade-up"
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
                e.currentTarget.style.boxShadow = "0 24px 64px rgba(0,0,0,0.55), 0 0 30px rgba(201,168,76,0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <div style={{ overflow: "hidden", height: "300px" }}>
                <img src={dish.img} alt={dish.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(.22,1,.36,1)" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  loading="lazy" />
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,7,6,0.95) 0%, rgba(8,7,6,0.2) 55%, transparent 100%)" }} />
              <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                <span className="tag-badge">{dish.tag}</span>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#F0E8D8", marginBottom: "6px" }}>{dish.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#9C8A6A", fontWeight: 300 }}>{dish.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── USPs ─────────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <Label text="The Aurum Promise" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600, color: "#F0E8D8" }}>
              Why Choose Us
            </h2>
            <Divider />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {USPS.map((u, i) => (
              <div key={i} className="glass-card" style={{ padding: "40px 32px", textAlign: "center" }}>
                <div style={{ fontSize: "2.4rem", marginBottom: "20px", filter: "drop-shadow(0 0 12px rgba(201,168,76,0.3))" }}>{u.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#E8C97A", marginBottom: "12px", fontWeight: 600 }}>{u.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "#9C8A6A", lineHeight: 1.75, fontWeight: 300 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHEF HIGHLIGHT ───────────────────────────────── */}
      <section style={{ padding: "120px 24px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "80px", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85"
              alt="Chef Laurent" style={{ width: "100%", height: "580px", objectFit: "cover", borderRadius: "6px", display: "block" }} loading="lazy" />
            {/* Decorative borders */}
            <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "120px", height: "120px", border: "1px solid rgba(201,168,76,0.35)", borderRadius: "4px", zIndex: -1 }} />
            <div style={{ position: "absolute", top: "-20px", left: "-20px", width: "120px", height: "120px", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "4px", zIndex: -1 }} />
            {/* Gold corner tag */}
            <div style={{
              position: "absolute", bottom: "28px", left: "-12px",
              background: "linear-gradient(135deg, #C9A84C, #9C7A2E)",
              padding: "16px 24px", borderRadius: "4px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#080706", fontWeight: 700, lineHeight: 1 }}>3★</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#080706", marginTop: "4px", opacity: 0.7 }}>Michelin</p>
            </div>
          </div>

          <div>
            <Label text="Meet the Maestro" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600, color: "#F0E8D8", lineHeight: 1.15, marginBottom: "6px" }}>
              Chef Laurent
            </h2>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 400, fontStyle: "italic", color: "#C9A84C", marginBottom: "0" }}>
              Moreau
            </h2>
            <Divider />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#9C8A6A", lineHeight: 1.8, fontWeight: 300, margin: "24px 0 20px" }}>
              With over 18 years of mastery across Paris, Tokyo, and New York, Chef Laurent brings a philosophy that food is emotion — plated. His menus are seasonal, instinctive, and deeply personal.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(156,138,106,0.75)", lineHeight: 1.8, fontStyle: "italic", fontWeight: 300, marginBottom: "40px", borderLeft: "2px solid rgba(201,168,76,0.3)", paddingLeft: "20px" }}>
              "Cooking is not a profession — it is a conversation between the earth and the soul. Every dish I create is a sentence in that story."
            </p>
            <div style={{ display: "flex", gap: "48px" }}>
              {[["18+", "Years of Mastery"], ["3", "Michelin Stars"], ["12", "Global Awards"]].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", color: "#C9A84C", lineHeight: 1 }}>{num}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9C8A6A", marginTop: "6px" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <Label text="Guest Voices" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#F0E8D8" }}>
            What They Say
          </h2>
          <Divider />
          <div key={key} className="testimonial-enter" style={{ marginTop: "56px", minHeight: "200px" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
              fontStyle: "italic", fontWeight: 300,
              color: "#F0E8D8", lineHeight: 1.7, marginBottom: "32px",
            }}>
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div style={{ color: "#C9A84C", fontSize: "1rem", letterSpacing: "4px", marginBottom: "16px" }}>
              {"★".repeat(TESTIMONIALS[activeTestimonial].stars)}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "#F0E8D8", letterSpacing: "0.05em" }}>{TESTIMONIALS[activeTestimonial].name}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9C8A6A", marginTop: "6px" }}>{TESTIMONIALS[activeTestimonial].role}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "48px" }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => { setActiveTestimonial(i); setKey(k => k + 1); }}
                style={{
                  height: "2px", width: i === activeTestimonial ? "40px" : "20px",
                  background: i === activeTestimonial ? "#C9A84C" : "rgba(156,138,106,0.3)",
                  border: "none", cursor: "pointer", borderRadius: "2px",
                  transition: "all 0.4s ease",
                }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ──────────────────────────────── */}
      <section style={{ padding: "120px 24px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <Label text="The Aurum World" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600, color: "#F0E8D8" }}>
            Gallery Preview
          </h2>
          <Divider />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {PORTFOLIO_ITEMS.slice(0, 6).map((item, i) => (
            <div key={i} className="portfolio-item" style={{ position: "relative", aspectRatio: "1", overflow: "hidden", borderRadius: "6px", cursor: "pointer" }}>
              <img src={item.img} alt={item.title}
                className="img-zoom"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              <div className="overlay" style={{
                position: "absolute", inset: 0,
                background: "rgba(8,7,6,0.65)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px",
              }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C" }}>{item.category}</span>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#F0E8D8", fontSize: "0.95rem" }}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <button className="btn-outline" onClick={() => setActivePage("Portfolio")}>
            View Full Portfolio
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── ABOUT PAGE ─────────────────────────────────────────── */
function About() {
  return (
    <div style={{ background: "#080706", paddingTop: "96px" }}>

      {/* Story */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "80px", alignItems: "center" }}>
        <div>
          <Label text="Our Story" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 600, color: "#F0E8D8", lineHeight: 1.15, marginBottom: "6px" }}>
            Born from Passion.
          </h2>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 400, fontStyle: "italic", color: "#C9A84C", marginBottom: "0" }}>
            Refined by Time.
          </h2>
          <Divider />
          <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
            {["Aurum was never meant to be just a restaurant. When Chef Laurent Moreau arrived in Mumbai in 2008 with nothing but two suitcases and an obsession with honest flavour, he found a city hungry for something different — something that honoured tradition while embracing the bold.",
              "What began as a 30-seat bistro in Colaba has grown into one of Asia's most celebrated dining destinations. Three Michelin stars, countless memories, and an unwavering commitment to the idea that dining is theatre — and every guest deserves a front-row seat."].map((p, i) => (
              <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#9C8A6A", lineHeight: 1.8, fontWeight: 300 }}>{p}</p>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=85"
            alt="Aurum interior" style={{ width: "100%", height: "520px", objectFit: "cover", borderRadius: "6px", display: "block" }} loading="lazy" />
          <div style={{ position: "absolute", bottom: "-16px", left: "-16px", background: "linear-gradient(135deg, #C9A84C, #9C7A2E)", padding: "20px 28px", borderRadius: "4px" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "#080706", fontWeight: 700, lineHeight: 1 }}>2008</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#080706", opacity: 0.7, marginTop: "4px" }}>Est. Mumbai</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)", padding: "100px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <Label text="Our Journey" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#F0E8D8" }}>Milestones</h2>
            <Divider />
          </div>
          <div className="timeline-track" style={{ position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
              {TIMELINE.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "40px", alignItems: "flex-start", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end" }}>
                  <div style={{ maxWidth: "340px", textAlign: i % 2 === 0 ? "right" : "left", order: i % 2 === 0 ? 0 : 2 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontStyle: "italic", color: "#C9A84C", display: "block", marginBottom: "8px", fontWeight: 400 }}>{item.year}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#F0E8D8", marginBottom: "8px", fontWeight: 600 }}>{item.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#9C8A6A", lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
                  </div>
                  <div style={{ position: "relative", zIndex: 1, flexShrink: 0, marginTop: "10px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#C9A84C", boxShadow: "0 0 20px rgba(201,168,76,0.5)", outline: "4px solid rgba(201,168,76,0.15)" }} />
                  </div>
                  <div style={{ maxWidth: "340px", order: i % 2 === 0 ? 2 : 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section style={{ padding: "100px 24px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <Label text="Recognition" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#F0E8D8" }}>Awards & Acclaim</h2>
          <Divider />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {[
            ["⭐⭐⭐", "Michelin Stars",       "2022–Present"],
            ["🥇",    "Asia's Best Restaurant","World's 50 Best, 2023"],
            ["🍷",    "Best Wine Programme",   "James Beard, 2021"],
            ["🏛️",   "Luxury Dining Award",   "Condé Nast, 2024"],
          ].map(([icon, award, org]) => (
            <div key={award} className="glass-card award-card" style={{ padding: "40px 28px", textAlign: "center", transition: "all 0.4s ease" }}>
              <div style={{ fontSize: "2.2rem", marginBottom: "18px", filter: "drop-shadow(0 0 10px rgba(201,168,76,0.25))" }}>{icon}</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#E8C97A", marginBottom: "8px", fontWeight: 600 }}>{award}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.12em", color: "#9C8A6A", textTransform: "uppercase" }}>{org}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ambience collage */}
      <section style={{ padding: "0 24px 100px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", height: "500px" }}>
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=85" alt="Ambience" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} loading="lazy" />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=85" alt="Lounge" style={{ width: "100%", flex: 1, objectFit: "cover", borderRadius: "8px" }} loading="lazy" />
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=85" alt="Dish" style={{ width: "100%", flex: 1, objectFit: "cover", borderRadius: "8px" }} loading="lazy" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── SERVICES PAGE ──────────────────────────────────────── */
function Services({ setActivePage }) {
  return (
    <div style={{ background: "#080706", paddingTop: "96px" }}>
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 24px 64px", textAlign: "center" }}>
        <Label text="What We Offer" />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 600, color: "#F0E8D8", lineHeight: 1.1 }}>
          Our <em style={{ fontStyle: "italic", color: "#C9A84C", fontWeight: 400 }}>Services</em>
        </h2>
        <Divider />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#9C8A6A", lineHeight: 1.8, fontWeight: 300, marginTop: "24px" }}>
          Every service at Aurum is curated with the same exacting standard — an obsessive attention to detail that transforms any occasion into an extraordinary memory.
        </p>
      </section>

      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 100px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {SERVICES.map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: "48px 40px", position: "relative", overflow: "hidden" }}>
            {/* Top accent line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)", opacity: 0, transition: "opacity 0.4s ease" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0"} />
            <div style={{ fontSize: "2.8rem", marginBottom: "24px", filter: "drop-shadow(0 0 14px rgba(201,168,76,0.25))" }}>{s.icon}</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#F0E8D8", marginBottom: "12px", fontWeight: 600 }}>{s.title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#9C8A6A", lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
            <button onClick={() => setActivePage("Contact")}
              style={{
                marginTop: "28px", background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#C9A84C",
                borderBottom: "1px solid rgba(201,168,76,0.3)", paddingBottom: "3px",
                transition: "border-color 0.3s ease, color 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A84C"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; }}>
              Enquire Now →
            </button>
          </div>
        ))}
      </section>

      {/* Private dining CTA banner */}
      <section style={{ position: "relative", height: "360px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1800&q=80"
          alt="Private dining" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }} loading="lazy" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,7,6,0.8), rgba(8,7,6,0.4), rgba(8,7,6,0.8))" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 3rem)", color: "#F0E8D8", fontStyle: "italic", fontWeight: 400, marginBottom: "28px" }}>
            Planning something special?
          </p>
          <button className="btn-primary" onClick={() => setActivePage("Contact")}>
            Talk to Our Events Team
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── PORTFOLIO PAGE ─────────────────────────────────────── */
function Portfolio() {
  const [filter, setFilter]   = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const FILTERS = ["All", "Food", "Interior", "Events"];
  const filtered = filter === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(i => i.category === filter);

  return (
    <div style={{ background: "#080706", paddingTop: "96px" }}>
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 24px 48px", textAlign: "center" }}>
        <Label text="Visual Story" />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 600, color: "#F0E8D8" }}>
          Our <em style={{ fontStyle: "italic", color: "#C9A84C", fontWeight: 400 }}>Portfolio</em>
        </h2>
        <Divider />
      </section>

      {/* Filter tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "56px", padding: "0 24px", flexWrap: "wrap" }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em",
            textTransform: "uppercase", fontWeight: 400,
            padding: "10px 24px", border: "1px solid",
            borderColor: filter === f ? "#C9A84C" : "rgba(201,168,76,0.2)",
            color: filter === f ? "#C9A84C" : "#9C8A6A",
            background: filter === f ? "rgba(201,168,76,0.08)" : "transparent",
            cursor: "pointer", borderRadius: "40px",
            transition: "all 0.3s ease",
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ columns: "3 280px", columnGap: "12px" }}>
          {filtered.map((item, i) => (
            <div key={`${filter}-${i}`} className="portfolio-item"
              onClick={() => setLightbox(item)}
              style={{ position: "relative", overflow: "hidden", cursor: "zoom-in", breakInside: "avoid", marginBottom: "12px", borderRadius: "6px" }}>
              <img src={item.img} alt={item.title}
                className="img-zoom"
                style={{ width: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
              <div className="overlay" style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(8,7,6,0.75) 0%, rgba(8,7,6,0.1) 50%, transparent 100%)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "24px", gap: "6px",
              }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C" }}>{item.category}</span>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#F0E8D8", fontSize: "0.95rem" }}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(8,7,6,0.93)", backdropFilter: "blur(24px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
        }} className="anim-fade-in">
          <button onClick={() => setLightbox(null)} style={{
            position: "absolute", top: "24px", right: "32px",
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: "1.2rem", color: "#C9A84C",
            transition: "color 0.2s ease",
          }}>✕</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "860px", width: "100%" }}>
            <img src={lightbox.img} alt={lightbox.title} style={{ width: "100%", maxHeight: "78vh", objectFit: "contain", borderRadius: "6px", display: "block" }} />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C" }}>{lightbox.category}</span>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#F0E8D8", marginTop: "8px" }}>{lightbox.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── CONTACT PAGE ───────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [sent, setSent]  = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", phone: "", date: "", message: "" });
  };

  const fieldLabel = (text) => (
    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#9C8A6A", display: "block", marginBottom: "8px" }}>
      {text}
    </label>
  );

  return (
    <div style={{ background: "#080706", paddingTop: "96px" }}>
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 24px 64px", textAlign: "center" }}>
        <Label text="Get In Touch" />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 600, color: "#F0E8D8" }}>
          Make a <em style={{ fontStyle: "italic", color: "#C9A84C", fontWeight: 400 }}>Reservation</em>
        </h2>
        <Divider />
      </section>

      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 100px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "64px" }}>

        {/* Form */}
        <div className="glass-card" style={{ padding: "48px 40px" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#F0E8D8", marginBottom: "36px", fontWeight: 600 }}>Reserve Your Table</h3>

          {sent && (
            <div className="success-banner" style={{
              marginBottom: "28px", padding: "16px 20px",
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "6px",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <span style={{ color: "#C9A84C", fontSize: "1rem" }}>✓</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#C9A84C" }}>
                Reservation request received. We'll confirm within 24 hours.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                {fieldLabel("Full Name")}
                <input type="text" required placeholder="Priya Mehta" className="input-line"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                {fieldLabel("Email")}
                <input type="email" required placeholder="hello@example.com" className="input-line"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                {fieldLabel("Phone")}
                <input type="tel" placeholder="+91 98765 43210" className="input-line"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                {fieldLabel("Preferred Date")}
                <input type="date" className="input-line"
                  style={{ colorScheme: "dark" }}
                  value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>
            <div>
              {fieldLabel("Special Requests")}
              <textarea rows={4} placeholder="Dietary requirements, occasion details, seating preferences..." className="input-line"
                style={{ resize: "none" }}
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%", padding: "16px", fontSize: "0.72rem" }}>
              Confirm Reservation
            </button>
          </form>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Map placeholder */}
          <div className="glass-card" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ height: "200px", background: "linear-gradient(135deg, rgba(201,168,76,0.06), rgba(201,168,76,0.02))", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
              <div style={{ fontSize: "2rem", filter: "drop-shadow(0 0 12px rgba(201,168,76,0.4))" }}>📍</div>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#F0E8D8", fontSize: "1.1rem" }}>Aurum Fine Dining</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#9C8A6A" }}>12, Napean Sea Road, Malabar Hill</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#9C8A6A" }}>Mumbai, Maharashtra 400 006</p>
            </div>
            <div style={{ padding: "16px 24px", textAlign: "center" }}>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", textDecoration: "none", borderBottom: "1px solid rgba(201,168,76,0.3)", paddingBottom: "2px" }}>
                Open in Maps →
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="glass-card" style={{ padding: "32px 36px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#E8C97A", marginBottom: "24px", fontWeight: 600 }}>Opening Hours</h3>
            {[["Monday – Friday", "12:00 PM – 11:00 PM"], ["Saturday", "11:00 AM – 11:30 PM"], ["Sunday", "11:00 AM – 10:00 PM"]].map(([day, time]) => (
              <div key={day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(201,168,76,0.07)" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#9C8A6A" }}>{day}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#F0E8D8", fontWeight: 400 }}>{time}</span>
              </div>
            ))}
          </div>

          {/* Contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[["📞", "Reservations", "+91 22 4001 9999"], ["✉️", "Email", "reserve@aurum.in"], ["📸", "Instagram", "@aurum.mumbai"]].map(([icon, label, val]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="glass-card" style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, borderRadius: "8px" }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9C8A6A" }}>{label}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#F0E8D8", marginTop: "4px" }}>{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer({ setActivePage }) {
  return (
    <footer style={{ background: "#050403", borderTop: "1px solid rgba(201,168,76,0.08)", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "56px", marginBottom: "64px" }}>
          {/* Brand */}
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.18em", marginBottom: "16px" }}>
              AURUM<span style={{ fontStyle: "italic", fontWeight: 300, color: "#F0E8D8", fontSize: "1.5rem" }}>.</span>
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#9C8A6A", lineHeight: 1.8, fontWeight: 300, maxWidth: "260px" }}>
              Three Michelin stars. One unforgettable evening. Mumbai's temple of fine dining since 2008.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              {["𝕏", "IG", "FB"].map(s => (
                <div key={s} style={{
                  width: "36px", height: "36px", border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#9C8A6A", cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.color = "#C9A84C"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; e.currentTarget.style.color = "#9C8A6A"; }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "24px", fontWeight: 500 }}>Navigation</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              {NAV_LINKS.map(p => (
                <li key={p}>
                  <button onClick={() => setActivePage(p)}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#9C8A6A", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s ease", fontWeight: 300 }}
                    onMouseEnter={e => e.currentTarget.style.color = "#F0E8D8"}
                    onMouseLeave={e => e.currentTarget.style.color = "#9C8A6A"}>
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "24px", fontWeight: 500 }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["12, Napean Sea Road, Malabar Hill", "Mumbai, Maharashtra 400 006", "", "+91 22 4001 9999", "reserve@aurum.in"].map((line, i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#9C8A6A", fontWeight: 300, minHeight: line ? "auto" : "8px" }}>{line}</p>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "24px", fontWeight: 500 }}>Stay in Touch</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#9C8A6A", lineHeight: 1.7, fontWeight: 300, marginBottom: "20px" }}>
              Seasonal menus, exclusive events, and reservations — direct to your inbox.
            </p>
            <div style={{ display: "flex", gap: "0" }}>
              <input type="email" placeholder="your@email.com"
                style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", borderRight: "none", padding: "10px 14px", color: "#F0E8D8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", outline: "none", borderRadius: "2px 0 0 2px" }} />
              <button className="btn-primary" style={{ padding: "10px 18px", borderRadius: "0 2px 2px 0", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                Join
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,168,76,0.08)", paddingTop: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(156,138,106,0.5)", letterSpacing: "0.08em" }}>
            © 2025 Aurum Fine Dining. All rights reserved.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(156,138,106,0.5)", letterSpacing: "0.08em" }}>
            Crafted with passion in Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ROOT ───────────────────────────────────────────── */
export default function App() {
  const [activePage, setActivePage] = useState("Home");

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PAGE = { Home, About, Services, Portfolio, Contact };
  const PageComponent = PAGE[activePage];

  return (
    <div style={{ minHeight: "100vh", background: "#080706" }}>
      <Navbar activePage={activePage} setActivePage={navigate} />
      <main>
        <PageComponent setActivePage={navigate} />
      </main>
      <Footer setActivePage={navigate} />
    </div>
  );
}