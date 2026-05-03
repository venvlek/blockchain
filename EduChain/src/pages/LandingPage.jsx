import { useState, useRef } from "react";
import { WalletProvider }  from "../WalletContext";
import { useWallet }       from "../WalletContext";
import { useIsMobile }     from "../landingPage/useIsMobile";
import Navbar              from "../landingPage/Navbar";
import HeroSection         from "../landingPage/HeroSection";
import PlatformScene       from "../landingPage/PlatformScene";
import StatsBar            from "../landingPage/StatsBar";
import FeaturesPage        from "../landingPage/FeaturesPage";
import HowItWorksPage      from "../landingPage/HowItWorksPage";
import AboutPage           from "../landingPage/AboutPage";
import Dashboard           from "../dashboard/Dashboard";

// Mock DB + localStorage lookup
const MOCK_DB = {
  "EDUCHAIN-7X9K-2L8M-9P1Q": { studentName: "Victor Olatunji", course: "Blockchain Development Certification", institution: "ABC University",  grade: "A",  dateIssued: "May 2, 2025",  txSignature: "5hJkd...x9qL", type: "Course Completion" },
  "EDUCHAIN-3R2K-5N9M-1Q7P": { studentName: "Amara Osei",      course: "Smart Contract Development",          institution: "XYZ Institute",   grade: "B+", dateIssued: "Mar 18, 2025", txSignature: "3mPqr...w4kN", type: "Course Completion" },
  "EDUCHAIN-8M1K-4L6N-2R5Q": { studentName: "Nita Adeyemi",    course: "Web3 Fundamentals Certification",     institution: "Web3 Academy",    grade: "A+", dateIssued: "Jan 10, 2025", txSignature: "7xKpl...m2rQ", type: "Professional Certificate" },
};

// ── Public Verify Modal
function PublicVerifyModal({ onClose }) {
  const [inputId, setInputId] = useState("");
  const [result,  setResult]  = useState(null);
  const [cert,    setCert]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied,  setCopied]  = useState(false);

  const handleVerify = async () => {
    if (!inputId.trim()) return;
    setLoading(true); setResult(null);
    const key = inputId.trim().toUpperCase();

    try {
      // Check blockchain first — works without login on any device
      const { fetchCertificate } = await import("../solana.js");
      const onChain = await fetchCertificate(key);
      if (onChain.success) {
        setCert(onChain);
        setResult("valid");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error("Blockchain verify error:", err);
    }

    // Fallback to mock DB and localStorage
    const local = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
    const found = MOCK_DB[key] || local[key];
    if (found) { setCert(found); setResult("valid"); }
    else        { setCert(null);  setResult("invalid"); }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputId.trim().toUpperCase());
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: "100%", maxWidth: 500, background: "linear-gradient(135deg, #0D0B2A, #110E35)", border: "1.5px solid rgba(139,92,246,0.3)", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.7)", animation: "modalIn 0.3s ease" }}>

        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #8B5CF6, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <p style={{ color: "white", fontWeight: 800, fontSize: 15 }}>Verify Certificate</p>
              <p style={{ color: "rgba(148,163,184,0.55)", fontSize: 12 }}>No login required</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", padding: 4 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px" }}>
          <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13.5, marginBottom: 16 }}>
            Enter a certificate ID to verify it on the Solana blockchain.
          </p>

          {/* Input row */}
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <input value={inputId} onChange={e => { setInputId(e.target.value); setResult(null); }} onKeyDown={e => e.key === "Enter" && handleVerify()}
              placeholder="e.g. EDUCHAIN-7X9K-2L8M-9P1Q" autoFocus
              style={{ flex: 1, padding: "12px 14px", borderRadius: 10, background: "rgba(124,58,237,0.08)", border: `1.5px solid ${result === "invalid" ? "rgba(248,113,113,0.4)" : result === "valid" ? "rgba(74,222,128,0.4)" : "rgba(139,92,246,0.25)"}`, color: "white", fontSize: 13.5, fontFamily: "monospace", outline: "none" }}
            />
            <button onClick={handleVerify} disabled={!inputId.trim() || loading} style={{
              padding: "12px 20px", borderRadius: 10, border: "none",
              cursor: !inputId.trim() || loading ? "not-allowed" : "pointer",
              background: inputId.trim() ? "linear-gradient(135deg, #7C3AED, #6366F1)" : "rgba(255,255,255,0.05)",
              color: inputId.trim() ? "white" : "rgba(255,255,255,0.3)",
              fontWeight: 700, fontSize: 14, fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
            }}>
              {loading
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                : "Verify"
              }
            </button>
          </div>

          {!result && <p style={{ color: "rgba(148,163,184,0.45)", fontSize: 12, marginBottom: 4 }}>Try: <span style={{ color: "#A78BFA", fontFamily: "monospace" }}>EDUCHAIN-7X9K-2L8M-9P1Q</span></p>}

          {/* Valid */}
          {result === "valid" && cert && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 10, marginBottom: 14, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.3)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <div>
                  <p style={{ color: "#4ADE80", fontWeight: 700, fontSize: 13.5 }}>Certificate is Valid</p>
                  <p style={{ color: "rgba(74,222,128,0.6)", fontSize: 12 }}>Exists on Solana blockchain</p>
                </div>
              </div>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(139,92,246,0.15)", marginBottom: 12 }}>
                {[
                  { label: "Student",   value: cert.studentName },
                  { label: "Course",    value: cert.course },
                  { label: "Issued By", value: cert.institution },
                  { label: "Grade",     value: cert.grade },
                  { label: "Date",      value: cert.dateIssued },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "10px 16px", background: i % 2 === 0 ? "rgba(124,58,237,0.04)" : "rgba(124,58,237,0.08)", borderBottom: i < 4 ? "1px solid rgba(139,92,246,0.07)" : "none" }}>
                    <span style={{ color: "rgba(148,163,184,0.55)", fontSize: 12, fontWeight: 600, minWidth: 80, flexShrink: 0 }}>{row.label}</span>
                    <span style={{ color: "white", fontSize: 13, fontWeight: 500 }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={handleCopy} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", background: copied ? "rgba(74,222,128,0.12)" : "rgba(124,58,237,0.1)", border: `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(139,92,246,0.2)"}`, color: copied ? "#4ADE80" : "#A78BFA", fontWeight: 600, fontSize: 13, fontFamily: "inherit", transition: "all 0.2s" }}>
                  {copied ? "Copied!" : "Copy ID"}
                </button>
                <a href={`https://explorer.solana.com/tx/${cert.txSignature}?cluster=devnet`} target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, padding: "10px 0", borderRadius: 10, textDecoration: "none", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "#A78BFA", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Explorer
                </a>
              </div>
            </div>
          )}

          {/* Invalid */}
          {result === "invalid" && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 10, background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.25)", animation: "fadeIn 0.3s ease" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              <div>
                <p style={{ color: "#F87171", fontWeight: 700, fontSize: 13.5 }}>Certificate Not Found</p>
                <p style={{ color: "rgba(248,113,113,0.6)", fontSize: 12.5 }}>This ID does not exist on the Solana blockchain.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fadeIn  { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin    { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function AppContent() {
  const [activePage,  setActivePage]  = useState("home");
  const [showVerify,  setShowVerify]  = useState(false);
  const { connected } = useWallet();
  const isMobile = useIsMobile();
  const statsH = isMobile ? 88 : 68;

  // Ref that Navbar will attach its openModal function to
  const openConnectRef = useRef(null);

  const handleVerifyClick  = () => setShowVerify(true);
  const handleDashboardClick = () => {
    if (openConnectRef.current) openConnectRef.current();
  };

  if (connected) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { width: 100%; height: 100%; overflow: hidden; }
        `}</style>
        <Dashboard onLogout={() => {}} />
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; overflow: hidden; }
        .page-scroll::-webkit-scrollbar { width: 4px; }
        .page-scroll::-webkit-scrollbar-track { background: transparent; }
        .page-scroll::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.35); border-radius: 4px; }
      `}</style>

      <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", background: "linear-gradient(140deg, #060410 0%, #0D0826 55%, #07051A 100%)", fontFamily: "'Sora', sans-serif" }}>

        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(139,92,246,0.065) 1px, transparent 1px),linear-gradient(90deg, rgba(139,92,246,0.065) 1px, transparent 1px)", backgroundSize: "56px 56px" }}/>

        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "15%", left: "5%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.16), transparent)", filter: "blur(100px)", pointerEvents: "none", zIndex: 0 }}/>
        <div style={{ position: "absolute", bottom: "5%", right: "5%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.13), transparent)", filter: "blur(90px)", pointerEvents: "none", zIndex: 0 }}/>

        {/* Navbar — pass ref so we can trigger its modal */}
        <Navbar
          activePage={activePage}
          onNavigate={setActivePage}
          onOpenConnect={openConnectRef}
        />

        {/* HOME */}
        {activePage === "home" && (
          <div className="page-scroll" style={{
            position: "absolute", top: 66, bottom: statsH, left: 0, right: 0,
            overflowY: "auto", overflowX: "hidden",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "center",
            padding: isMobile ? "32px 20px 24px" : "24px 72px",
            gap: isMobile ? 40 : 32, zIndex: 1,
          }}>
            <HeroSection
              onVerify={handleVerifyClick}
              onDashboard={handleDashboardClick}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: isMobile ? "100%" : "auto", flex: isMobile ? "none" : 1 }}>
              <PlatformScene />
            </div>
          </div>
        )}

        {/* INNER PAGES */}
        {activePage !== "home" && (
          <div className="page-scroll" style={{ position: "absolute", top: 66, bottom: statsH, left: 0, right: 0, overflowY: "auto", overflowX: "hidden", zIndex: 1 }}>
            {activePage === "features"     && <FeaturesPage />}
            {activePage === "how-it-works" && <HowItWorksPage onVerify={handleVerifyClick} />}
            {activePage === "about"        && <AboutPage />}
          </div>
        )}

        <StatsBar />

        {/* Public verify modal */}
        {showVerify && <PublicVerifyModal onClose={() => setShowVerify(false)} />}
      </div>
    </>
  );
}

export default function LandingPage() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}
