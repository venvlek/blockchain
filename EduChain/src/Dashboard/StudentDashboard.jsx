import { useState } from "react";
import { useWallet } from "../WalletContext";
import { useIsMobile } from "../landingPage/useIsMobile";

// Student mock certs only — institution sees real data
const MOCK_STUDENT_CERTS = [
  { certId: "EDUCHAIN-7X9K-2L8M-9P1Q", course: "Blockchain Development Certification", institution: "ABC University",   dateIssued: "May 2, 2025"  },
  { certId: "EDUCHAIN-3R2K-5N9M-1Q7P", course: "Smart Contract Development",           institution: "XYZ Institute",    dateIssued: "Mar 18, 2025" },
  { certId: "EDUCHAIN-8M1K-4L6N-2R5Q", course: "Web3 Fundamentals Certification",      institution: "Web3 Academy",     dateIssued: "Jan 10, 2025" },
];

// ── Name Setup Screen
function NameSetup({ onSave }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (name.trim().length < 2) { setError("Name must be at least 2 characters."); return; }
    onSave(name.trim());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100%", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: 20, marginBottom: 24, background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.2))", border: "1.5px solid rgba(139,92,246,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <defs><linearGradient id="nameG" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#A78BFA"/><stop offset="1" stopColor="#818CF8"/></linearGradient></defs>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="url(#nameG)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="7" r="4" stroke="url(#nameG)" strokeWidth="2"/>
        </svg>
      </div>
      <h2 style={{ color: "white", fontWeight: 800, fontSize: 22, marginBottom: 8, letterSpacing: "-0.3px" }}>What's your name?</h2>
      <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 14, lineHeight: 1.6, marginBottom: 28, maxWidth: 320 }}>
        We'll use this to personalise your EduChain experience. You can change it later in settings.
      </p>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <input
          value={name}
          onChange={e => { setName(e.target.value); setError(""); }}
          onKeyDown={e => e.key === "Enter" && handleSave()}
          placeholder="Enter your full name"
          autoFocus
          style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: "rgba(124,58,237,0.08)", border: `1.5px solid ${error ? "rgba(248,113,113,0.5)" : "rgba(139,92,246,0.25)"}`, color: "white", fontSize: 15, fontFamily: "inherit", outline: "none", marginBottom: error ? 8 : 16 }}
        />
        {error && <p style={{ color: "#F87171", fontSize: 12.5, marginBottom: 14, textAlign: "left" }}>{error}</p>}
        <button onClick={handleSave} style={{ width: "100%", padding: "13px 0", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #7C3AED, #6366F1)", color: "white", fontWeight: 700, fontSize: 14, fontFamily: "inherit", boxShadow: "0 0 24px rgba(124,58,237,0.45)" }}>
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}

// ── Main Dashboard
export default function StudentDashboard({ onNavigate, role }) {
  const { publicKey } = useWallet();
  const isMobile = useIsMobile();

  const nameKey    = `educhain_name_${publicKey}`;
  const savedName  = localStorage.getItem(nameKey);
  const [name, setName] = useState(savedName || "");

  const institutionName = localStorage.getItem(`educhain_inst_name_${publicKey}`) || "";
  const isInstitution   = role === "institution";

  const handleSaveName = (n) => {
    localStorage.setItem(nameKey, n);
    setName(n);
  };

  // Student with no name — show setup
  if (!isInstitution && !name) {
    return <NameSetup onSave={handleSaveName} />;
  }

  // ── Dynamic data
  const allStored    = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
  const issuedByMe   = Object.values(allStored).filter(c => c.issuedBy === publicKey);
  const uniqueStudents = new Set(issuedByMe.map(c => c.studentWallet)).size;

  // Stats — different for institution vs student
  const STATS = isInstitution ? [
    { label: "Issued",    value: issuedByMe.length, color: "#8B5CF6",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
    { label: "Students",  value: uniqueStudents,    color: "#6366F1",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { label: "This Year", value: issuedByMe.filter(c => c.dateIssued?.includes("2025")).length, color: "#A78BFA",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { label: "Verified",  value: issuedByMe.length > 0 ? "100%" : "0%", color: "#4ADE80",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  ] : [
    { label: "Certificates", value: "8",    color: "#8B5CF6",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
    { label: "Achievements", value: "12",   color: "#6366F1",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> },
    { label: "Institutions", value: "3",    color: "#8B5CF6",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg> },
    { label: "Verified",     value: "100%", color: "#4ADE80",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  ];

  // Certs to display — institution: real issued ones; student: mock
  const displayCerts = isInstitution
    ? [...issuedByMe].reverse().slice(0, 3)
    : MOCK_STUDENT_CERTS;

  const displayName = isInstitution ? `Admin (${institutionName})` : name;

  return (
    <div style={{ padding: isMobile ? "24px 16px" : "32px 36px", minHeight: "100%" }}>

      {/* Welcome header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "rgba(148,163,184,0.7)", fontSize: 13, marginBottom: 4 }}>Welcome back,</p>
        <h1 style={{
          fontSize: isMobile ? 22 : 28, fontWeight: 900,
          letterSpacing: "-0.5px", marginBottom: 6, lineHeight: 1.2,
          color: isInstitution ? undefined : "white",
          background: isInstitution ? "linear-gradient(110deg, #A78BFA, #818CF8)" : undefined,
          WebkitBackgroundClip: isInstitution ? "text" : undefined,
          WebkitTextFillColor: isInstitution ? "transparent" : undefined,
        }}>
          {displayName}
        </h1>
        <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 13 }}>
          {isInstitution
            ? "Here's an overview of your institution's certificate activity."
            : "Here's an overview of your academic achievements."}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 12 : 16, marginBottom: 32 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ padding: isMobile ? "16px 14px" : "20px 18px", borderRadius: 16, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(139,92,246,0.15)", display: "flex", flexDirection: "column", gap: 8, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.13)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.07)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.15)"; }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}18`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                {s.icon}
              </div>
              {i === 3 && isInstitution && issuedByMe.length > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, color: "#4ADE80", background: "rgba(74,222,128,0.12)", padding: "2px 8px", borderRadius: 999, border: "1px solid rgba(74,222,128,0.25)" }}>VERIFIED</span>
              )}
            </div>
            <div>
              <p style={{ fontSize: isMobile ? 24 : 28, fontWeight: 900, background: i === 3 ? "linear-gradient(135deg, #4ADE80, #22D3EE)" : `linear-gradient(135deg, white, ${s.color})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.value}
              </p>
              <p style={{ fontSize: 11.5, color: "rgba(148,163,184,0.65)", fontWeight: 500 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cert list */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ color: "white", fontWeight: 800, fontSize: isMobile ? 16 : 18 }}>
            {isInstitution ? "Recently Issued" : "My Certificates"}
          </h2>
          <button onClick={() => onNavigate("certificates")} style={{ background: "none", border: "none", cursor: "pointer", color: "#A78BFA", fontSize: 13, fontWeight: 600, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Empty state for institution */}
        {isInstitution && displayCerts.length === 0 ? (
          <div style={{ padding: "40px 0", textAlign: "center" }}>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: 14, marginBottom: 16 }}>No certificates issued yet.</p>
            <button onClick={() => onNavigate("issue")} style={{ padding: "11px 24px", borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #7C3AED, #6366F1)", color: "white", fontWeight: 600, fontSize: 13, fontFamily: "inherit", boxShadow: "0 0 18px rgba(124,58,237,0.4)" }}>
              Issue your first certificate
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {displayCerts.map((cert, i) => (
              <div key={cert.certId || i} style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 16, padding: isMobile ? "14px" : "16px 20px", borderRadius: 14, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(139,92,246,0.12)", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.12)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.28)"; e.currentTarget.style.transform = "translateX(3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.06)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.12)"; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.2))", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "white", fontWeight: 700, fontSize: isMobile ? 13 : 14, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {cert.course}
                  </p>
                  <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 12 }}>
                    {isInstitution
                      ? `${cert.studentName} · ${cert.dateIssued}`
                      : `${cert.institution} · ${cert.dateIssued}`
                    }
                  </p>
                </div>
                {!isMobile && (
                  <span style={{ flexShrink: 0, fontSize: 11.5, fontWeight: 700, color: "#4ADE80", background: "rgba(74,222,128,0.1)", padding: "4px 12px", borderRadius: 999, border: "1px solid rgba(74,222,128,0.25)" }}>
                    Verified
                  </span>
                )}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.4)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
