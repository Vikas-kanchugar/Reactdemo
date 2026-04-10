import { useState } from "react";
import AddBtn from "../components/AddBtn";
import { MENU_ALL } from "../data/menuData";

function MenuPage({ onAdd }) {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? MENU_ALL : MENU_ALL.filter(i => i.cat === cat);

  const BADGE_MAP = { bseller:"mb-gold", new:"mb-sea", spicy:"mb-coral" };
  const BADGE_LBL = { bseller:"Best Seller", new:"New", spicy:"🌶 Spicy" };

  return (
    <div style={{ paddingTop:80 }}>
      {/* Header strip */}
      <div style={{ position:"relative", height:260, overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1626711934535-9749ea30bfce?w=1400&q=80"
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.38 }} alt="Menu" />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(150deg,rgba(10,26,18,0.7) 0%,rgba(26,61,92,0.4) 100%)",
          display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:10 }}>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(2rem,6vw,4rem)", color:"#fff", fontWeight:700 }}>
            Our Menu
          </h1>
          <p style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", fontSize:"1.1rem", color:"rgba(255,255,255,0.65)" }}>
            Fresh. Authentic. Coastal.
          </p>
        </div>
      </div>

      <div className="menu-bg">
        <div className="wrap">
          <div className="eyebrow">Explore Flavours</div>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.6rem,3.5vw,2.5rem)", marginBottom:4 }}>
            Every Dish, Hand-Crafted
          </h2>
          <div className="filter-bar">
            {["All","Fish","Prawns","Crab","Curry","Fry","Meals"].map(c => (
              <button key={c}
                className={`fpill${cat === c ? " active" : ""}`}
                onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="menu-tiles">
            {filtered.map(item => (
              <div key={item.id} className="m-card">
                <div className="m-img-wrap">
                  <img src={item.img} alt={item.name} loading="lazy" />
                  {item.badge && (
                    <span className={`m-badge ${BADGE_MAP[item.badge]}`}>{BADGE_LBL[item.badge]}</span>
                  )}
                  <span className={`veg-mark ${item.type}`}>{item.type === "v" ? "V" : "N"}</span>
                </div>
                <div className="m-body">
                  <div className="m-name">{item.name}</div>
                  <div className="m-desc">{item.desc}</div>
                  <div className="m-foot">
                    <div>
                      <div className="m-price">₹{item.price}</div>
                      <div className="m-rating" style={{ marginTop:3 }}>
                        <span className="m-stars">{"★".repeat(Math.floor(item.rating))}</span>
                        <span className="m-rcount">({item.reviews || 0})</span>
                      </div>
                    </div>
                    <AddBtn item={item} onAdd={onAdd} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;