/* ─────────────────────────────────────────────────────────
   FOOTER COMPONENT
───────────────────────────────────────────────────────── */
import { NAV } from "../data/constants";

function Footer({ setActive }) {
  return (
    <footer className="footer">
      <div className="foot-inner">
        <div className="foot-grid">
          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:40, height:40, background:"linear-gradient(135deg,var(--ocean),var(--sea))", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", boxShadow:"0 4px 14px rgba(26,61,92,0.28)" }}>🐟</div>
              <div className="foot-brand">OCEAN BITES</div>
            </div>
            <div className="foot-tagline">
              Authentic coastal Karnataka seafood. Fresh daily from Malpe & Mangalore. Taste of Tulu Nadu since 2006.
            </div>
            <div className="socials">
              {["𝕏","📸","👍","▶️"].map((s,i) => (
                <a key={i} href="#" className="soc-btn" title="Social">{s}</a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <div className="foot-col-ttl">Navigate</div>
            <div className="foot-links">
              {NAV.map(p => (
                <button key={p} className="foot-lnk" onClick={() => { setActive(p); window.scrollTo({top:0,behavior:"smooth"}); }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <div className="foot-col-ttl">Our Dishes</div>
            <div className="foot-links">
              {["Mangalore Fish Fry","Prawn Ghee Roast","Crab Sukka","Neer Dosa Set","Seafood Thali","Anjal Tawa Fry"].map(d => (
                <span key={d} style={{ fontSize:"0.84rem", color:"var(--text-muted)", fontWeight:300 }}>{d}</span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div className="foot-col-ttl">Stay Updated</div>
            <p style={{ fontSize:"0.84rem", color:"var(--text-muted)", fontWeight:300, lineHeight:1.7, marginBottom:16 }}>
              Daily specials, coastal recipes & table offers — straight to your inbox.
            </p>
            <div className="news-row">
              <input type="email" className="news-input" placeholder="your@email.com" />
              <button className="news-sub">Join 🌊</button>
            </div>
            <p style={{ fontSize:"0.7rem", color:"var(--text-faint)", marginTop:8 }}>No spam, unsubscribe anytime.</p>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="foot-copy">© 2025 Ocean Bites. All rights reserved. Crafted with 🌊 in Udupi, Karnataka.</div>
          <div className="foot-copy">FSSAI Reg. No. 11224999000XXXX</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;