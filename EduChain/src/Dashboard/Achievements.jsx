import { useState, useEffect } from "react";
import { useWallet } from "../WalletContext";
import { useIsMobile } from "../landingPage/useIsMobile";

// Category colors
const CATEGORY_COLORS = {
  "Sports & Athletics":      "#F59E0B",
  "Community Service":       "#4ADE80",
  "Volunteering":            "#22D3EE",
  "Leadership":              "#8B5CF6",
  "Competition & Awards":    "#FBBF24",
  "Cultural & Arts":         "#F472B6",
  "Research & Innovation":   "#6366F1",
  "Entrepreneurship":        "#FB923C",
  "Environmental Impact":    "#34D399",
  "Humanitarian Work":       "#A78BFA",
  "Other":                   "#94A3B8",
};

function categoryColor(cat) {
  return CATEGORY_COLORS[cat] || "#8B5CF6";
}

function categoryIcon(cat) {
  const icons = {
    "Sports & Athletics":    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
    "Community Service":     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    "Volunteering":          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    "Leadership":            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    "Competition & Awards":  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>,
    "Cultural & Arts":       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
    "Research & Innovation": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    "Entrepreneurship":      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    "Environmental Impact":  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22a10 10 0 0 1 0-20 10 10 0 0 1 0 20z"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    "Humanitarian Work":     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    "Other":                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  };
  return icons[cat] || icons["Other"];
}

// ── Achievement detail modal
function AchievementModal({ achievement, onClose }) {
  const color = categoryColor(achievement.achievementCategory);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: "100%", maxWidth: 420, background: "linear-gradient(135deg, #0D0B2A, #110E35)", border: `1.5px solid ${color}35`, borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.7)", animation: "modalIn 0.3s ease" }}>

        {/* Header */}
        <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid rgba(139,92,246,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}20`, border: `1.5px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
              {categoryIcon(achievement.achievementCategory)}
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", padding: 4 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <h3 style={{ color: "white", fontWeight: 800, fontSize: 17, marginBottom: 6 }}>{achievement.achievementTitle || achievement.course}</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 600, background: `${color}18`, border: `1px solid ${color}35`, color }}>
              {achievement.achievementCategory}
            </span>
            <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 600, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ADE80" }}>
              Verified on-chain
            </span>
          </div>
        </div>

        {/* Details */}
        <div style={{ padding: "20px 24px" }}>
          {achievement.achievementDesc && (
            <div style={{ marginBottom: 16, padding: "14px 16px", borderRadius: 10, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
              <p style={{ color: "rgba(148,163,184,0.55)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 6 }}>DESCRIPTION</p>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13.5, lineHeight: 1.65 }}>{achievement.achievementDesc}</p>
            </div>
          )}
          {[
            { label: "Issued By",   value: achievement.institution },
            { label: "Date",        value: achievement.dateIssued },
            { label: "Certificate ID", value: achievement.certId },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(139,92,246,0.08)" : "none" }}>
              <span style={{ color: "rgba(148,163,184,0.55)", fontSize: 12.5, fontWeight: 600, minWidth: 110, flexShrink: 0 }}>{row.label}</span>
              <span style={{ color: "white", fontSize: row.label === "Certificate ID" ? 11.5 : 13.5, fontFamily: row.label === "Certificate ID" ? "monospace" : "inherit", fontWeight: 500 }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "0 24px 24px", display: "flex", gap: 10 }}>
          <a href={achievement.explorerUrl || `https://explorer.solana.com/tx/${achievement.txSignature}?cluster=devnet`} target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, padding: "11px 0", borderRadius: 10, textDecoration: "none", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "#A78BFA", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Explorer
          </a>
          <button onClick={onClose} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #7C3AED, #6366F1)", color: "white", fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>
            Close
          </button>
        </div>
      </div>
      <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
    </div>
  );
}

// ── Achievement card
function AchievementCard({ achievement, isMobile, onClick }) {
  const color = categoryColor(achievement.achievementCategory);
  return (
    <div onClick={onClick} style={{
      padding: isMobile ? "16px" : "20px", borderRadius: 16, cursor: "pointer",
      background: `${color}0D`, border: `1.5px solid ${color}30`,
      transition: "all 0.25s", position: "relative", overflow: "hidden",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; e.currentTarget.style.borderColor = `${color}55`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = `${color}30`; }}
    >
      {/* Glow */}
      <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `${color}18`, filter: "blur(20px)", pointerEvents: "none" }}/>

      {/* Icon + category */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}20`, border: `1.5px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
          {categoryIcon(achievement.achievementCategory)}
        </div>
        <span style={{ fontSize: 10.5, fontWeight: 600, color, background: `${color}15`, padding: "3px 8px", borderRadius: 999, border: `1px solid ${color}30` }}>
          {achievement.achievementCategory}
        </span>
      </div>

      {/* Title */}
      <p style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 5, lineHeight: 1.3 }}>
        {achievement.achievementTitle || achievement.course}
      </p>

      {/* Desc */}
      {achievement.achievementDesc && (
        <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 12.5, lineHeight: 1.55, marginBottom: 10,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {achievement.achievementDesc}
        </p>
      )}

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          <span style={{ color: "#4ADE80", fontSize: 11.5, fontWeight: 600 }}>{achievement.dateIssued}</span>
        </div>
        <span style={{ color: "rgba(148,163,184,0.4)", fontSize: 11.5 }}>{achievement.institution}</span>
      </div>
    </div>
  );
}

export default function Achievements() {
  const { publicKey } = useWallet();
  const isMobile = useIsMobile();
  const [selected,     setSelected]     = useState(null);
  const [filter,       setFilter]       = useState("All");
  const [achievements, setAchievements] = useState([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        // Fetch from blockchain
        const { fetchStudentCertificates } = await import("../solana.js");
        const onChain = await fetchStudentCertificates(publicKey);
        const onChainAchievements = onChain.filter(c => c.mode === "Achievement");

        // Also check localStorage
        const local = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
        const localAchievements = Object.values(local).filter(c =>
          c.mode === "Achievement" && c.studentWallet === publicKey
        );

        // Merge and deduplicate
        const merged = [...onChainAchievements, ...localAchievements];
        const unique = Object.values(
          merged.reduce((acc, c) => { acc[c.certId] = c; return acc; }, {})
        );
        setAchievements(unique);
      } catch {
        // Fallback to localStorage
        const local = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
        const localAchievements = Object.values(local).filter(c =>
          c.mode === "Achievement" && c.studentWallet === publicKey
        );
        setAchievements(localAchievements);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, [publicKey]);

  // Get unique categories from data
  const categories = ["All", ...new Set(achievements.map(a => a.achievementCategory).filter(Boolean))];
  const filtered = filter === "All" ? achievements : achievements.filter(a => a.achievementCategory === filter);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
        <div style={{ textAlign: "center" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite", marginBottom: 16 }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 14 }}>Loading achievements...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: isMobile ? "24px 16px" : "32px 36px", minHeight: "100%" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "white", fontSize: isMobile ? 22 : 26, fontWeight: 900, letterSpacing: "-0.5px", marginBottom: 6 }}>
          Achievements
        </h1>
        <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13.5 }}>
          Non-academic achievements certified on the Solana blockchain.
        </p>
      </div>

      {achievements.length === 0 ? (
        /* Empty state */
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, marginBottom: 20, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
          </div>
          <h2 style={{ color: "white", fontWeight: 800, fontSize: 18, marginBottom: 8 }}>No achievements yet</h2>
          <p style={{ color: "rgba(148,163,184,0.55)", fontSize: 14, maxWidth: 340, lineHeight: 1.7 }}>
            Achievements are issued by registered institutions for sports, competitions, volunteering, and other non-academic activities. Ask your institution to certify your achievement on EduChain.
          </p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Total",       value: achievements.length,           color: "#8B5CF6" },
              { label: "Categories",  value: categories.length - 1,         color: "#6366F1" },
              { label: "Institutions", value: new Set(achievements.map(a => a.institution)).size, color: "#4ADE80" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(139,92,246,0.14)" }}>
                <p style={{ fontSize: isMobile ? 22 : 26, fontWeight: 900, background: `linear-gradient(135deg, white, ${s.color})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</p>
                <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 11.5, fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Category filter */}
          {categories.length > 1 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {categories.map((cat, i) => (
                <button key={i} onClick={() => setFilter(cat)} style={{
                  padding: "5px 14px", borderRadius: 999, cursor: "pointer",
                  background: filter === cat ? "linear-gradient(135deg, #7C3AED, #6366F1)" : "rgba(124,58,237,0.08)",
                  border: filter === cat ? "none" : "1px solid rgba(139,92,246,0.2)",
                  color: filter === cat ? "white" : "rgba(148,163,184,0.7)",
                  fontWeight: filter === cat ? 700 : 500, fontSize: 12.5,
                  fontFamily: "inherit", transition: "all 0.2s",
                  boxShadow: filter === cat ? "0 0 14px rgba(124,58,237,0.35)" : "none",
                }}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: isMobile ? 12 : 16 }}>
            {filtered.map((a, i) => (
              <AchievementCard key={a.certId || i} achievement={a} isMobile={isMobile} onClick={() => setSelected(a)} />
            ))}
          </div>
        </>
      )}

      {selected && <AchievementModal achievement={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
