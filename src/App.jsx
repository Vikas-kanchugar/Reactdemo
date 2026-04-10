import { useState, useEffect, useCallback } from "react";
import "./styles/App.css";

// Import components
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

// Import pages
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import SpecialsPage from "./pages/SpecialsPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HelpPage from "./pages/HelpPage";

// Import data
import { NAV } from "./data/constants";

/* ─────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────── */
export default function App() {
  const [active,    setActive]    = useState("Home");
  const [dark,      setDark]      = useState(false);
  const [cart,      setCart]      = useState([]);
  const [cartOpen,  setCartOpen]  = useState(false);

  /* Apply dark class */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  /* Cart logic */
  const addToCart = useCallback(item => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === item.id);
      if (idx >= 0) {
        return prev.map((i, index) => index === idx ? { ...i, qty: i.qty + 1 } : i);
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((id, all = false) => {
    setCart(prev => {
      if (all) {
        return prev.filter(i => i.id !== id);
      } else {
        return prev.map(i => i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0);
      }
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleDark = useCallback(() => setDark(v => !v), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const navigate = useCallback(page => {
    setActive(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const PAGES = { Home, Menu:MenuPage, Specials:SpecialsPage, Gallery:GalleryPage, About:AboutPage, Contact:ContactPage, Help:HelpPage };
  const Page = PAGES[active] || Home;

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", transition:"background 0.45s ease, color 0.45s ease" }}>
      <Navbar
        active={active}
        setActive={navigate}
        dark={dark}
        toggleDark={toggleDark}
        cartCount={cartCount}
        openCart={openCart}
      />
      <Page setActive={navigate} onAdd={addToCart} dark={dark} />
      <Footer setActive={navigate} />
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={closeCart}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      )}
    </div>
  );
}
