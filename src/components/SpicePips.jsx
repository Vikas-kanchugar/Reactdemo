/* ─────────────────────────────────────────────────────────
   SPICE PIPS COMPONENT
───────────────────────────────────────────────────────── */
const SpicePips = ({ level }) => (
  <div className="spice-row">
    {[1,2,3,4].map(i => (
      <span key={i} className={`spice-pip${i <= level ? " on" : ""}`} />
    ))}
  </div>
);

export default SpicePips;