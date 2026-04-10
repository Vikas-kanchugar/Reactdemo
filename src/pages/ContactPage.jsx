import { useState } from "react";

function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setForm({ name:"", email:"", message:"" });
  };

  return (
    <div style={{ paddingTop:80 }}>
      {/* Header strip */}
      <div style={{ position:"relative", height:260, overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=1400&q=80"
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.38 }} alt="Contact" />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(150deg,rgba(10,26,18,0.7) 0%,rgba(26,61,92,0.4) 100%)",
          display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:10 }}>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(2rem,6vw,4rem)", color:"#fff", fontWeight:700 }}>
            Contact Us
          </h1>
          <p style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", fontSize:"1.1rem", color:"rgba(255,255,255,0.65)" }}>
            We'd Love to Hear From You
          </p>
        </div>
      </div>

      <div className="menu-bg">
        <div className="wrap">
          <div className="eyebrow">Get In Touch</div>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.6rem,3.5vw,2.5rem)", marginBottom:4 }}>
            Visit Us or Say Hello
          </h2>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, marginTop:40 }}>
            {/* Contact Info */}
            <div>
              <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:"1.4rem", marginBottom:20 }}>
                Find Us Here
              </h3>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:15 }}>
                  <div style={{ width:40, height:40, backgroundColor:"#1a3d5c", borderRadius:"50%",
                    display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"1.2rem" }}>
                    📍
                  </div>
                  <div>
                    <div style={{ fontWeight:600, marginBottom:4 }}>Address</div>
                    <div style={{ color:"#666" }}>123 Coastal Drive<br />Marina Bay, CA 94123</div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:15 }}>
                  <div style={{ width:40, height:40, backgroundColor:"#1a3d5c", borderRadius:"50%",
                    display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"1.2rem" }}>
                    📞
                  </div>
                  <div>
                    <div style={{ fontWeight:600, marginBottom:4 }}>Phone</div>
                    <div style={{ color:"#666" }}>(555) 123-4567</div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:15 }}>
                  <div style={{ width:40, height:40, backgroundColor:"#1a3d5c", borderRadius:"50%",
                    display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"1.2rem" }}>
                    ✉️
                  </div>
                  <div>
                    <div style={{ fontWeight:600, marginBottom:4 }}>Email</div>
                    <div style={{ color:"#666" }}>hello@oceanbites.com</div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:15 }}>
                  <div style={{ width:40, height:40, backgroundColor:"#1a3d5c", borderRadius:"50%",
                    display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"1.2rem" }}>
                    🕒
                  </div>
                  <div>
                    <div style={{ fontWeight:600, marginBottom:4 }}>Hours</div>
                    <div style={{ color:"#666" }}>
                      Mon-Thu: 11am-10pm<br />
                      Fri-Sat: 11am-11pm<br />
                      Sun: 12pm-9pm
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:"1.4rem", marginBottom:20 }}>
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({...form, name:e.target.value})}
                  style={{ padding:12, border:"1px solid #ddd", borderRadius:6, fontSize:"1rem" }}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email:e.target.value})}
                  style={{ padding:12, border:"1px solid #ddd", borderRadius:6, fontSize:"1rem" }}
                  required
                />
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({...form, message:e.target.value})}
                  rows={6}
                  style={{ padding:12, border:"1px solid #ddd", borderRadius:6, fontSize:"1rem", resize:"vertical" }}
                  required
                />
                <button type="submit" style={{
                  padding:"12px 24px",
                  backgroundColor:"#1a3d5c",
                  color:"#fff",
                  border:"none",
                  borderRadius:6,
                  fontSize:"1rem",
                  fontWeight:600,
                  cursor:"pointer",
                  transition:"background-color 0.3s"
                }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;