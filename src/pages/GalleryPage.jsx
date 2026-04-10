/* ─────────────────────────────────────────────────────────
   GALLERY PAGE COMPONENT
───────────────────────────────────────────────────────── */
import { useState } from "react";
import { GALLERY } from "../data/galleryData";

function GalleryPage() {
  const [lb, setLb] = useState(null);

  return (
    <div style={{ paddingTop:80 }}>
      <div style={{ position:"relative", height:240, overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1400&q=80"
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.38 }} alt="Gallery" />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(150deg,rgba(10,26,18,0.72),rgba(26,61,92,0.42))",
          display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8 }}>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(2rem,6vw,4rem)", color:"#fff", fontWeight:700 }}>
            Gallery
          </h1>
          <p style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", color:"rgba(255,255,255,0.65)" }}>
            A glimpse of coastal flavours
          </p>
        </div>
      </div>

      <section className="gallery-bg">
        <div className="wrap">
          <div className="eyebrow">Visual Feast</div>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", marginBottom:4 }}>
            Straight from the Kitchen
          </h2>
          <div className="masonry">
            {GALLERY.map((g,i) => (
              <div key={i} className="masonry-item" onClick={() => setLb(g)}>
                <img src={g.img} alt={g.lbl} loading="lazy" />
                <div className="gallery-hover">
                  <span className="gallery-lbl">{g.lbl}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lb && (
        <div className="lightbox-veil" onClick={() => setLb(null)}>
          <button className="lb-close" onClick={() => setLb(null)}>✕</button>
          <img className="lb-img" src={lb.img} alt={lb.lbl} onClick={e => e.stopPropagation()} />
          <div className="lb-cap">{lb.lbl}</div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;