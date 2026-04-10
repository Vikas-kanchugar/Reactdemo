function AboutPage() {
  return (
    <div style={{ paddingTop:80 }}>
      {/* Header strip */}
      <div style={{ position:"relative", height:260, overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=1400&q=80"
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.38 }} alt="About" />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(150deg,rgba(10,26,18,0.7) 0%,rgba(26,61,92,0.4) 100%)",
          display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:10 }}>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(2rem,6vw,4rem)", color:"#fff", fontWeight:700 }}>
            About Ocean Bites
          </h1>
          <p style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", fontSize:"1.1rem", color:"rgba(255,255,255,0.65)" }}>
            Our Story, Our Passion
          </p>
        </div>
      </div>

      <div className="menu-bg">
        <div className="wrap">
          <div className="eyebrow">Our Journey</div>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.6rem,3.5vw,2.5rem)", marginBottom:4 }}>
            Born from the Sea
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center", marginTop:40 }}>
            <div>
              <p style={{ fontSize:"1.1rem", lineHeight:1.6, marginBottom:20 }}>
                Ocean Bites was founded in 2018 by Chef Maria Rodriguez, a coastal native with a passion for bringing
                the freshest seafood from the ocean to your table. What started as a small family restaurant has grown
                into a beloved destination for seafood lovers across the region.
              </p>
              <p style={{ fontSize:"1.1rem", lineHeight:1.6, marginBottom:20 }}>
                Our commitment to sustainability means we work directly with local fishermen to ensure every dish
                features the highest quality, sustainably caught seafood. We believe in supporting our coastal
                communities while preserving the ocean for future generations.
              </p>
              <p style={{ fontSize:"1.1rem", lineHeight:1.6 }}>
                Every dish is prepared with traditional coastal recipes passed down through generations, combined
                with modern culinary techniques to create unforgettable dining experiences.
              </p>
            </div>
            <div style={{ position:"relative" }}>
              <img src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80"
                style={{ width:"100%", borderRadius:12, boxShadow:"0 8px 32px rgba(0,0,0,0.1)" }} alt="Restaurant" />
            </div>
          </div>

          {/* Chef section */}
          <div style={{ marginTop:80, textAlign:"center" }}>
            <div className="eyebrow">Meet Our Chef</div>
            <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(1.4rem,3vw,2rem)", marginBottom:20 }}>
              Chef Maria Rodriguez
            </h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center", marginTop:40 }}>
              <div style={{ position:"relative" }}>
                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80"
                  style={{ width:"100%", borderRadius:12, boxShadow:"0 8px 32px rgba(0,0,0,0.1)" }} alt="Chef Maria" />
              </div>
              <div>
                <p style={{ fontSize:"1.1rem", lineHeight:1.6, marginBottom:20 }}>
                  With over 15 years of experience in coastal cuisine, Chef Maria brings authentic flavors from
                  her family's traditional recipes to every dish. Her innovative approach combines time-honored
                  techniques with contemporary presentation.
                </p>
                <p style={{ fontSize:"1.1rem", lineHeight:1.6 }}>
                  "Food is about connection - connecting people to the ocean, to our heritage, and to each other.
                  Every meal at Ocean Bites tells a story of our coastal culture."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;