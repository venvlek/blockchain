import { useIsMobile } from "./useIsMobile";

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="f1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#A78BFA"/><stop offset="1" stopColor="#6366F1"/></linearGradient></defs>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#f1)"/>
      </svg>
    ),
    title: "On-Chain Verification",
    desc: "Every certificate is stored as an immutable record on Solana. Anyone can verify authenticity in seconds — no central authority needed.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="f2" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80"/><stop offset="1" stopColor="#22D3EE"/></linearGradient></defs>
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="url(#f2)"/>
        <path d="M8 21h8M12 17v4" stroke="url(#f2)"/>
      </svg>
    ),
    title: "Instant Issuance",
    desc: "Institutions issue digital certificates in minutes. Students receive credentials directly to their wallet — no paperwork, no delays.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="f3" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#FBBF24"/><stop offset="1" stopColor="#F59E0B"/></linearGradient></defs>
        <circle cx="12" cy="8" r="6" stroke="url(#f3)"/>
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" stroke="url(#f3)"/>
      </svg>
    ),
    title: "Student Ownership",
    desc: "Your credentials belong to you. Share your academic profile with employers with a single link — full control, always.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="f4" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#C084FC"/><stop offset="1" stopColor="#818CF8"/></linearGradient></defs>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="url(#f4)"/>
      </svg>
    ),
    title: "QR Code Sharing",
    desc: "Each certificate includes a scannable QR code linking to its on-chain record. Perfect for resumes, LinkedIn, or print.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="f5" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#F472B6"/><stop offset="1" stopColor="#A78BFA"/></linearGradient></defs>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="url(#f5)"/>
        <circle cx="9" cy="7" r="4" stroke="url(#f5)"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="url(#f5)"/>
      </svg>
    ),
    title: "Multi-Institution Support",
    desc: "Universities, bootcamps, and professional bodies all issue on EduChain. One wallet — all credentials in one place.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="f6" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#22D3EE"/><stop offset="1" stopColor="#6366F1"/></linearGradient></defs>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="url(#f6)"/>
      </svg>
    ),
    title: "Low-Cost Transactions",
    desc: "Solana's sub-cent fees make certificate issuance affordable for institutions of any size — from startups to universities.",
  },
];

export default function FeaturesPage() {
  const isMobile = useIsMobile();

  return (
    <div style={{ width: "100%", padding: isMobile ? "32px 20px 32px" : "48px 72px 40px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? 32 : 48, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999, marginBottom: 20,
            background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.26)",
          }}>
            <span style={{ color: "#A78BFA", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.06em" }}>
              PLATFORM FEATURES
            </span>
          </div>
          <h2 style={{ fontSize: isMobile ? 28 : 42, fontWeight: 900, color: "white", letterSpacing: "-1px", marginBottom: 12 }}>
            Everything you need to{" "}
            <span style={{ background: "linear-gradient(110deg, #A78BFA, #818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              trust credentials
            </span>
          </h2>
          <p style={{ color: "rgba(148,163,184,0.8)", fontSize: isMobile ? 14 : 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Built for students, institutions, and employers who need fast, tamper-proof academic verification.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? 14 : 20,
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              padding: isMobile ? "20px 18px" : "28px 24px", borderRadius: 16,
              background: "rgba(124,58,237,0.06)", border: "1px solid rgba(139,92,246,0.15)",
              transition: "all 0.25s", cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.12)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.06)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14, marginBottom: 14,
                background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {f.icon}
              </div>
              <h3 style={{ color: "white", fontWeight: 700, fontSize: isMobile ? 14.5 : 15.5, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: "rgba(148,163,184,0.75)", fontSize: isMobile ? 13 : 13.5, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
