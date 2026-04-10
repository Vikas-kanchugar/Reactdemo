/* ─────────────────────────────────────────────────────────
   HELP PAGE COMPONENT
───────────────────────────────────────────────────────── */
import { FAQ } from "../data/faqData";

function HelpPage() {
  return (
    <div style={{ paddingTop:80 }}>
      <div style={{ position:"relative", height:280, overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80"
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.38 }} alt="Help" />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(150deg,rgba(10,26,18,0.72),rgba(26,61,92,0.42))",
          display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8 }}>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(2rem,6vw,4rem)", color:"#fff", fontWeight:700 }}>
            Help & FAQs
          </h1>
          <p style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", color:"rgba(255,255,255,0.75)", fontSize:"1.05rem" }}>
            Everything you need to know before you dine with Ocean Bites.
          </p>
        </div>
      </div>

      <section className="contact-bg">
        <div className="wrap">
          <div style={{ textAlign:"center", maxWidth:720, margin:"0 auto" }}>
            <div className="eyebrow">Need Help?</div>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.8rem,4vw,3rem)", marginBottom:10 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color:"var(--text-muted)", fontWeight:300, fontSize:"0.95rem", lineHeight:1.8 }}>
              Find answers to the most common questions about ordering, delivery, reservations, and dining at Ocean Bites.
            </p>
          </div>

          <div className="faq-grid" style={{ marginTop:40 }}>
            {FAQ.map((item, index) => (
              <div key={index} className="faq-card" style={{ padding:24, borderRadius:22, background:"var(--surface)", border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)", minHeight:170 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                  <div style={{ width:42, height:42, borderRadius:14, background:"var(--ocean)", display:"grid", placeItems:"center", color:"#fff", fontSize:"1.1rem" }}>?</div>
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize:"1rem", letterSpacing:"0.01em", color:"var(--text-head)", fontWeight:700 }}>
                    {item.q}
                  </div>
                </div>
                <p style={{ color:"var(--text-muted)", lineHeight:1.75, fontSize:"0.92rem", fontWeight:300 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HelpPage;