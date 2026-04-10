import { useState, useEffect } from "react";

function Navbar({ active, setActive, dark, toggleDark, cartCount, openCart }) {
  const [solid,  setSolid]  = useState(false);
  const [burger, setBurger] = useState(false);

  useEffect(() => {
    const h = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = p => { setActive(p); setBurger(false); window.scrollTo({ top:0, behavior:"smooth" }); };

  return (
    <nav className={`navbar${solid ? " solid" : ""}`}>
      {/* Logo */}
      <button className="nav-logo" onClick={() => go("Home")}>
        <div className="nav-logo-mark">🐟</div>
        <span className="nav-logo-text">OCEAN BITES</span>
      </button>

      {/* Desktop links */}
      <ul className="nav-links">
        {["Home", "Menu", "Specials", "Gallery", "About", "Contact", "Help"].map(p => (
          <li key={p}>
            <button
              className={`nav-link${active === p ? " active" : ""}`}
              onClick={() => go(p)}>
              {p}
            </button>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="nav-actions">
        <button className="btn-icon-sq" onClick={toggleDark} title="Toggle theme" aria-label="Toggle theme">
          {dark ? "☀️" : "🌙"}
        </button>
        <div className="cart-btn-wrap">
          <button className="btn-icon-sq" onClick={openCart} aria-label="Open cart">🛒</button>
          {cartCount > 0 && (
            <span key={cartCount} className="cart-badge">{cartCount}</span>
          )}
        </div>
        {/* Hamburger */}
        <button
          className={`hamburger${burger ? " open" : ""}`}
          onClick={() => setBurger(v => !v)}
          style={{ color: solid ? "var(--text-body)" : "#fff" }}
          aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${burger ? " open" : ""}`}>
        {["Home", "Menu", "Specials", "Gallery", "About", "Contact", "Help"].map(p => (
          <button key={p}
            className={`nav-link${active === p ? " active" : ""}`}
            onClick={() => go(p)}
            style={{ fontSize:"0.9rem" }}>
            {p}
          </button>
        ))}
        <button className="btn btn-ocean" style={{ marginTop:8 }} onClick={() => go("Contact")}>
          Reserve Table
        </button>
      </div>
    </nav>
  );
}

export default Navbar;