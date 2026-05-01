import { useIsMobile } from "./useIsMobile";

const TEAM = [
  { name: "Amara Osei",      role: "Founder & Blockchain Lead", initials: "AO", color: "#7C3AED" },
  { name: "Adebiyi Olamilekan", role: "Frontend Engineer",         initials: "AO", color: "#6366F1" },
  { name: "Adebiyi Olamilekan",    role: "Product & Design",          initials: "AO", color: "#4ADE80" },
];

const VALUES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: "Trust by Default",
    desc: "Every credential is immutable and publicly verifiable. No middlemen, no forgeries.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
    title: "Speed Over Bureaucracy",
    desc: "Credentials should be instant — issued and verified in seconds, not weeks.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "Student First",
    desc: "You earned it, you own it. EduChain puts credential ownership in the student's hands.",
  },
];

export default function AboutPage() {
  const isMobile = useIsMobile();

  return (
    <div style={{ width: "100%", padding: isMobile ? "32px 20px 32px" : "48px 72px 40px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? 32 : 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999, marginBottom: 20,
            background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.26)",
          }}>
            <span style={{ color: "#A78BFA", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.06em" }}>ABOUT EDUCHAIN</span>
          </div>
          <h2 style={{ fontSize: isMobile ? 28 : 42, fontWeight: 900, color: "white", letterSpacing: "-1px", marginBottom: 16 }}>
            Rethinking how the world{" "}
            <span style={{ background: "linear-gradient(110deg, #A78BFA, #818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              trusts credentials
            </span>
          </h2>
          <p style={{ color: "rgba(148,163,184,0.82)", fontSize: isMobile ? 14 : 15.5, lineHeight: 1.75, maxWidth: 640 }}>
            EduChain was born from a simple frustration: verifying academic credentials is slow, expensive, and easily faked.
            We built a decentralized alternative on Solana — fast, cheap, and impossible to forge.
          </p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <h3 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 18 }}>OUR VALUES</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 12 : 16,
          }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{
                padding: isMobile ? "18px 16px" : "22px 20px", borderRadius: 14,
                background: "rgba(124,58,237,0.06)", border: "1px solid rgba(139,92,246,0.14)",
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, marginBottom: 12,
                  background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {v.icon}
                </div>
                <h4 style={{ color: "white", fontWeight: 700, fontSize: 14.5, marginBottom: 6 }}>{v.title}</h4>
                <p style={{ color: "rgba(148,163,184,0.72)", fontSize: 13, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: isMobile ? 36 : 48 }}>
          <h3 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 18 }}>THE TEAM</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 12 : 16,
          }}>
            {TEAM.map((t, i) => (
              <div key={i} style={{
                padding: "22px 20px", borderRadius: 14,
                background: "rgba(124,58,237,0.06)", border: "1px solid rgba(139,92,246,0.14)",
                display: "flex", flexDirection: isMobile ? "row" : "column",
                alignItems: "center", gap: isMobile ? 16 : 0,
                textAlign: isMobile ? "left" : "center",
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: "50%",
                  flexShrink: 0,
                  margin: isMobile ? 0 : "0 auto 14px",
                  background: t.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 16, color: "white",
                  boxShadow: `0 0 18px ${t.color}60`,
                }}>
                  {t.initials}
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: 700, fontSize: 14.5, marginBottom: 4 }}>{t.name}</p>
                  <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 12.5 }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solana badge */}
        <div style={{
          padding: isMobile ? "16px 18px" : "20px 28px", borderRadius: 14,
          background: "rgba(153,69,255,0.07)", border: "1px solid rgba(153,69,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          <div>
            <p style={{ color: "white", fontWeight: 700, fontSize: 14.5, marginBottom: 4 }}>Built on Solana</p>
            <p style={{ color: "rgba(148,163,184,0.7)", fontSize: isMobile ? 12 : 13 }}>Sub-cent fees · 65,000 TPS · Carbon neutral</p>
          </div>
          <svg width="38" height="38" viewBox="0 0 70 70" fill="none" style={{ flexShrink: 0 }}>
            <defs>
              <linearGradient id="solA" x1="0" y1="0" x2="70" y2="70" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9945FF"/><stop offset="1" stopColor="#14F195"/>
              </linearGradient>
            </defs>
            <rect width="70" height="70" rx="18" fill="rgba(153,69,255,0.1)" stroke="url(#solA)" strokeWidth="1.5"/>
            <path d="M14 50 L48 50 Q53 50 55 46 L56 44 L22 44 Q17 44 15 48 Z" fill="url(#solA)"/>
            <path d="M14 37 L48 37 Q53 37 55 33 L56 31 L22 31 Q17 31 15 35 Z" fill="url(#solA)"/>
            <path d="M14 24 L48 24 Q53 24 55 28 L56 30 L22 30 Q17 30 15 26 Z" fill="url(#solA)" opacity="0.75"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
