/* ─────────────────────────────────────────────────────────
   WAVE DOWN COMPONENT
───────────────────────────────────────────────────────── */
function WaveDown({ fill, bg }) {
  return (
    <div className="wave-block" style={{ background: bg || "transparent" }}>
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ height:72 }}>
        <path fill={fill} d="M0,36 C360,72 1080,0 1440,36 L1440,72 L0,72 Z" />
      </svg>
    </div>
  );
}

export default WaveDown;