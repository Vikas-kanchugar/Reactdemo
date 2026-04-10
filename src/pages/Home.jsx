import { useState, useEffect, useRef } from "react";
import Stars from "../components/Stars";
import SpicePips from "../components/SpicePips";
import WaveDown from "../components/WaveDown";
import WaveUp from "../components/WaveUp";
import AddBtn from "../components/AddBtn";
import { WHY } from "../data/constants";
import { CATCH } from "../data/catchData";
import { SPECIALS } from "../data/specialsData";
import { REVIEWS } from "../data/reviewsData";

function Home({ setActive, onAdd, dark }) {
  const bgRef = useRef(null);

  /* subtle parallax on hero image */
  useEffect(() => {
    const h = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`;
    };
    window.addEventListener("scroll", h, { passive:true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const bgAlt = dark ? "#111f17" : "#f5ede0";
  const bgMain= dark ? "#0d1a12" : "#fdfaf5";

  return (
    <>
      {/* ── HERO ────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg">
          <video ref={bgRef} src="seafood.mp4.mp4"  autoPlay loop muted playsInline style={{ width:"100%", height:"100%", objectFit:"cover" }}
          />
        </div>
        <div className="hero-content">
          <div className="hero-pill">
            <span>🌊</span>
            <span>Udupi & Mangalore · Est. 2006</span>
          </div>
          <h1 className="hero-title">OCEAN<br />BITES</h1>
          <span className="hero-title-sub">Sea to Plate</span>
          <p className="hero-tagline">
            Authentic Coastal Karnataka seafood —<br />
            every dish a memory of the Tulu Nadu shore.
          </p>
          <div className="hero-cta">
            <button className="btn btn-ocean" onClick={() => setActive("Menu")}>
              🍽️ Order Now
            </button>
            <button className="btn btn-ghost-white" onClick={() => setActive("Specials")}>
              View Specials →
            </button>
          </div>
        </div>

        {/* Ambient floating elements */}
        {["🐠","🌊","🐚","🦞"].map((e,i) => (
          <span key={i} style={{
            position:"absolute", opacity:0.13,
            fontSize:`${1.2 + i * 0.4}rem`,
            top:`${18 + i * 16}%`, right:`${8 + i * 7}%`,
            animation:`floatY ${3 + i * 0.8}s ease-in-out infinite`,
            animationDelay:`${i * 0.7}s`,
            pointerEvents:"none",
            filter:"blur(0.5px)",
          }}>{e}</span>
        ))}

        {/* Side stats */}
        <div className="hero-side-stats">
          {[["500+","Daily Dishes"],["18","Yrs of Tradition"],["4.9★","Rating"]].map(([n,l]) => (
            <div key={l} className="hero-stat">
              <div className="hero-stat-n">{n}</div>
              <div className="hero-stat-l">{l}</div>
            </div>
          ))}
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Wave into fresh catch */}
      <WaveDown fill={bgAlt} />

      {/* ── FRESH CATCH ─────────────────────────────────── */}
      <section className="catch-bg">
        <div className="wrap">
          <div className="eyebrow">Fresh Every Morning</div>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.8rem,4vw,3rem)", marginBottom:4 }}>
            Today's Catch
          </h2>
          <p style={{ color:"var(--text-muted)", fontWeight:300, fontSize:"0.95rem", maxWidth:520 }}>
            Sourced daily from Malpe & Mangalore harbours. Scroll to explore — add to your order with one tap.
          </p>
        </div>
        <div className="catch-row" style={{ marginTop:40 }}>
          {CATCH.map(item => (
            <div key={item.id} className="catch-card">
              <div className="catch-img-wrap">
                <img src={item.img} alt={item.name} loading="lazy" />
                <span className="catch-lozenge">{item.tag}</span>
              </div>
              <div className="catch-body">
                <div className="catch-name">{item.name}</div>
                <div className="catch-desc">{item.desc}</div>
                <div className="catch-foot">
                  <div>
                    <div className="catch-price">₹{item.price}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
                      <span className="catch-stars">{"★".repeat(Math.floor(item.rating))}</span>
                      <span className="catch-reviews">({item.reviews})</span>
                    </div>
                  </div>
                  <AddBtn item={item} onAdd={onAdd} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wave into specials */}
      <WaveUp fill={bgMain} bg={bgAlt} />

      {/* ── COASTAL SPECIALS ─────────────────────────────── */}
      <section className="specials-bg">
        <div className="wrap">
          <div className="eyebrow">Udupi & Mangalore Classics</div>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.8rem,4vw,3rem)", marginBottom:4 }}>
            Coastal Specials
          </h2>
          <p style={{ color:"var(--text-muted)", fontWeight:300, fontSize:"0.95rem", maxWidth:500 }}>
            Signature dishes that define the culinary identity of the Karnataka coast.
          </p>
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

      {/* Wave into why */}
      <WaveDown fill={bgAlt} />

      {/* ── WHY OCEAN BITES ─────────────────────────────────── */}
      <section className="why-bg">
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:0 }}>
            <div className="eyebrow" style={{ justifyContent:"center" }}>Our Promise</div>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>
              Why Choose Ocean Bites?
            </h2>
          </div>
          <div className="why-tiles">
            {WHY.map((w,i) => (
              <div key={i} className="w-card">
                <div className="w-ico">{w.ico}</div>
                <div className="w-title">{w.title}</div>
                <div className="w-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave into chef */}
      <WaveUp fill={bgMain} bg={bgAlt} />

      {/* ── CHEF BANNER ──────────────────────────────────── */}
      <section className="chef-bg">
        <div className="wrap">
          <div className="chef-panel">
            <div className="chef-photo">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85"
                alt="Chef Suresh Shetty"
              />
              <div className="chef-photo-fade" />
            </div>
            <div className="chef-words">
              <div className="eyebrow">Behind the Fire</div>
              <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.6rem,3vw,2.6rem)" }}>
                Chef Suresh<br /><em style={{ fontWeight:300 }}>Shetty</em>
              </h2>
              <blockquote className="chef-quote">
                "I did not learn to cook in a culinary school. I learned standing next to my grandmother, watching her crack open a coconut and knowing — by smell alone — when the masala was perfect."
              </blockquote>
              <p style={{ fontSize:"0.88rem", color:"var(--text-muted)", fontWeight:300, lineHeight:1.7 }}>
                Third-generation fisherman's son from Udupi, Chef Suresh opened Ocean Bites in 2006 with one obsession: coastal Karnataka flavours cooked without compromise. Today, Ocean Bites serves over 500 plates daily.
              </p>
              <div className="chef-metrics">
                {[["18+","Years"],["500+","Daily Plates"],["4.9★","Rating"]].map(([n,l]) => (
                  <div key={l}>
                    <div className="cm-n">{n}</div>
                    <div className="cm-l">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave into reviews */}
      <WaveDown fill={bgAlt} />

      {/* ── REVIEWS ──────────────────────────────────────── */}
      <section className="reviews-bg">
        <div className="wrap" style={{ marginBottom:40 }}>
          <div className="eyebrow">Guest Reviews</div>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.8rem,4vw,2.8rem)" }}>
            What Our Diners Say
          </h2>
        </div>
        <div className="reviews-scroller">
          {REVIEWS.map((r,i) => (
            <div key={i} className="rev-card">
              <div className="rev-bg-quote">"</div>
              <div className="rev-stars">{Stars({n: r.stars})}</div>
              <p className="rev-text">"{r.text}"</p>
              <div className="rev-person">
                <img className="rev-avatar" src={r.img} alt={r.name} />
                <div>
                  <div className="rev-name">{r.name}</div>
                  <div className="rev-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WaveUp fill={bgMain} bg={bgAlt} />
    </>
  );
}

export default Home;