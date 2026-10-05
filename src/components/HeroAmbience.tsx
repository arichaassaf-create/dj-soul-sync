// Decorative "living photo" layer over the hero image: sweeping stage beams, drifting haze
// and chandelier sparkles. Pure CSS transforms/opacity (GPU), disabled by prefers-reduced-motion.

// Beams stay clear of the face (roughly 28%-48% of the panel width).
const beams = [
  { left: "6%", delay: "0s", duration: "9s", rotate: "-10deg" },
  { left: "20%", delay: "-3s", duration: "11s", rotate: "7deg" },
  { left: "68%", delay: "-6s", duration: "10s", rotate: "-7deg" },
  { left: "88%", delay: "-1.5s", duration: "12s", rotate: "10deg" },
];

// Positions over the chandelier area (top center of the photo), spread wide enough
// to land on it across desktop and mobile crops.
const sparkles = [
  { left: "26%", top: "4%", delay: "0s" },
  { left: "31%", top: "9%", delay: "-1.1s" },
  { left: "36%", top: "3%", delay: "-2.3s" },
  { left: "40%", top: "11%", delay: "-0.6s" },
  { left: "44%", top: "6%", delay: "-1.8s" },
  { left: "48%", top: "2%", delay: "-2.9s" },
  { left: "52%", top: "8%", delay: "-0.3s" },
  { left: "56%", top: "4%", delay: "-1.5s" },
  { left: "29%", top: "13%", delay: "-2.6s" },
  { left: "50%", top: "13%", delay: "-0.9s" },
];

export function HeroAmbience() {
  return (
    <div className="hero-ambience" aria-hidden="true">
      <div className="hero-haze" />
      {beams.map((b, i) => (
        <span
          key={i}
          className="hero-beam"
          style={
            {
              left: b.left,
              "--beam-rotate": b.rotate,
              animationDelay: b.delay,
              animationDuration: b.duration,
            } as React.CSSProperties
          }
        />
      ))}
      {sparkles.map((s, i) => (
        <span key={i} className="hero-sparkle" style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
      ))}
    </div>
  );
}
