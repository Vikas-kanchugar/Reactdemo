/* ─────────────────────────────────────────────────────────
   WAVE UP COMPONENT
───────────────────────────────────────────────────────── */
function WaveUp({ fill, bg }) {
  return (
    <div className="wave-block" style={{ background: bg || "transparent" }}>
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ height:72 }}>
        <path fill={fill} d="M0,36 C360,0 1080,72 1440,36 L1440,0 L0,0 Z" />
      </svg>
    </div>
  );
}

export default WaveUp;