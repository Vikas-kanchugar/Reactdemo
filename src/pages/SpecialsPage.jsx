/* ─────────────────────────────────────────────────────────
   SPECIALS PAGE COMPONENT
───────────────────────────────────────────────────────── */
import { SPECIALS } from "../data/specialsData";
import AddBtn from "../components/AddBtn";
import SpicePips from "../components/SpicePips";

function SpecialsPage({ onAdd }) {
  return (
    <div style={{ paddingTop:80 }}>
      <div style={{ position:"relative", height:280, overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1400&q=80"
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.38 }} alt="Specials" />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(150deg,rgba(10,26,18,0.72),rgba(26,61,92,0.42))",
          display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8 }}>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(2rem,6vw,4rem)", color:"#fff", fontWeight:700 }}>
            Today's Specials
          </h1>
          <p style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", color:"rgba(255,255,255,0.65)", fontSize:"1.1rem" }}>
            Fresh. Limited. Unmissable.
          </p>
        </div>
      </div>

      <section className="specials-bg" style={{ paddingTop:80 }}>
        <div className="wrap">
          <div className="specials-layout">
            {SPECIALS.map((item,i) => (
              <div key={item.id} className={`sp-card${i === 0 ? " hero-sp" : ""}`}>
                <div className="sp-img-wrap">
                  <img src={item.img} alt={item.name} loading="lazy" />
                  <span className="sp-ribbon">{item.ribbon}</span>
                </div>
                <div className="sp-body">
                  <div className="eyebrow" style={{ marginBottom:8 }}>Coastal Special</div>
                  <div className="sp-name">{item.name}</div>
                  <div className="sp-desc">{item.desc}</div>
                  <div className="sp-foot">
                    <div className="sp-price">₹{item.price}</div>
                    <SpicePips level={item.spice} />
                    <AddBtn item={item} onAdd={onAdd} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SpecialsPage;