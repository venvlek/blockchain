import { useIsMobile } from "./useIsMobile";

export default function HeroSection({ onVerify, onDashboard }) {
  const isMobile = useIsMobile();

  return (
    <div style={{
      flex: isMobile ? "none" : "0 0 460px",
      width: isMobile ? "100%" : "auto",
      display: "flex", flexDirection: "column",
      alignItems: isMobile ? "center" : "flex-start",
      textAlign: isMobile ? "center" : "left",
    }}>

      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 14px", borderRadius: 999,
        marginBottom: isMobile ? 20 : 26,
        background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.26)",
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "#4ADE80", display: "inline-block",
          boxShadow: "0 0 8px #4ADE80",
          animation: "blink 1.6s ease-in-out infinite",
        }}/>
        <span style={{ color: "#A78BFA", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.06em" }}>
          BUILT ON SOLANA
        </span>
      </div>

      {/* Headline */}
      <h1 style={{ lineHeight: 1.07, marginBottom: isMobile ? 14 : 18, letterSpacing: "-1.5px" }}>
        <span style={{ display: "block", fontSize: isMobile ? 38 : 56, fontWeight: 900, color: "white" }}>
          Own. Share.
        </span>
        <span style={{
          display: "block", fontSize: isMobile ? 38 : 56, fontWeight: 900,
          background: "linear-gradient(110deg, #A78BFA 20%, #818CF8)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Verify.
        </span>
        <span style={{
          display: "block", fontSize: isMobile ? 22 : 38, fontWeight: 800,
          color: "#CBD5E1", letterSpacing: "-0.5px", marginTop: 4,
        }}>
          Your Academic Journey.
        </span>
      </h1>

      {/* Subtext */}
      <p style={{
        color: "rgba(148,163,184,0.82)",
        fontSize: isMobile ? 14 : 15,
        lineHeight: 1.72,
        marginBottom: isMobile ? 24 : 30,
        maxWidth: isMobile ? "100%" : 410,
      }}>
        EduChain is a decentralized platform that empowers students to own their
        achievements and helps institutions issue verifiable certificates on the
        Solana blockchain.
      </p>

      {/* CTAs */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 12, width: isMobile ? "100%" : "auto",
      }}>
        {/* Verify Certificate — opens verify flow */}
        <button
          onClick={onVerify}
          style={{
            padding: "13px 28px", borderRadius: 12, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #7C3AED, #6366F1)",
            color: "white", fontWeight: 700, fontSize: 14, fontFamily: "inherit",
            boxShadow: "0 0 28px rgba(124,58,237,0.52)",
            transition: "all 0.22s",
            width: isMobile ? "100%" : "auto",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 48px rgba(124,58,237,0.85)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(124,58,237,0.52)"; e.currentTarget.style.transform = "translateY(0)"; }}>
          Verify Certificate
        </button>

        {/* Explore Dashboard — triggers wallet connect */}
        <button
          onClick={onDashboard}
          style={{
            padding: "13px 28px", borderRadius: 12, cursor: "pointer",
            background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.1)",
            color: "#E2E8F0", fontWeight: 600, fontSize: 14, fontFamily: "inherit",
            transition: "all 0.22s",
            width: isMobile ? "100%" : "auto",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
          Explore Dashboard
        </button>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
