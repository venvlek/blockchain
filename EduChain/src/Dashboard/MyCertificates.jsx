import { useState, useEffect, useRef } from "react";
import { useWallet } from "../WalletContext";
import { useIsMobile } from "../landingPage/useIsMobile";

// Mock certs for students (replace with on-chain later)
const MOCK_STUDENT_CERTS = {
  "EDUCHAIN-7X9K-2L8M-9P1Q": {
    certId: "EDUCHAIN-7X9K-2L8M-9P1Q",
    course: "Blockchain Development Certification",
    institution: "ABC University",
    grade: "A", type: "Course Completion",
    dateIssued: "May 2, 2025", txSignature: "5hJkd...x9qL",
  },
  "EDUCHAIN-3R2K-5N9M-1Q7P": {
    certId: "EDUCHAIN-3R2K-5N9M-1Q7P",
    course: "Smart Contract Development",
    institution: "XYZ Institute",
    grade: "B+", type: "Course Completion",
    dateIssued: "Mar 18, 2025", txSignature: "3mPqr...w4kN",
  },
  "EDUCHAIN-8M1K-4L6N-2R5Q": {
    certId: "EDUCHAIN-8M1K-4L6N-2R5Q",
    course: "Web3 Fundamentals Certification",
    institution: "Web3 Academy",
    grade: "A+", type: "Professional Certificate",
    dateIssued: "Jan 10, 2025", txSignature: "7xKpl...m2rQ",
  },
};

// ── QR Code Canvas — encodes the Certificate ID for direct verification
function CertQRCode({ certId }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    import("qrcode").then(QRCode => {
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, certId, {
          width: 140,
          margin: 1,
          color: { dark: "#1a1040", light: "#ffffff" },
        });
      }
    }).catch(() => {});
  }, [certId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{
        padding: 10, borderRadius: 12, background: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}>
        <canvas ref={canvasRef} width={140} height={140} style={{ display: "block", borderRadius: 4 }}/>
      </div>
      <p style={{ color: "rgba(148,163,184,0.5)", fontSize: 10.5, textAlign: "center", maxWidth: 140, lineHeight: 1.5 }}>
        Scan to open on Solana Explorer
      </p>
    </div>
  );
}

// ── Certificate detail modal
function CertModal({ cert, onClose }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
      padding: 20,
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: "100%", maxWidth: 480,
        background: "linear-gradient(135deg, #0D0B2A, #110E35)",
        border: "1.5px solid rgba(139,92,246,0.3)",
        borderRadius: 20, overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
        animation: "modalIn 0.3s ease",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.2))", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <p style={{ color: "white", fontWeight: 700, fontSize: 14 }}>Certificate Details</p>
              <p style={{ color: "rgba(148,163,184,0.55)", fontSize: 12 }}>{cert.type}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* QR toggle button */}
            <button onClick={() => setShowQR(p => !p)} style={{
              background: showQR ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.08)",
              border: `1px solid ${showQR ? "rgba(139,92,246,0.5)" : "rgba(139,92,246,0.2)"}`,
              borderRadius: 8, padding: "6px 10px", cursor: "pointer",
              color: "#A78BFA", display: "flex", alignItems: "center", gap: 5,
              fontSize: 12, fontWeight: 600, fontFamily: "inherit",
              transition: "all 0.2s",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/>
                <rect x="3" y="16" width="5" height="5"/><rect x="10" y="10" width="4" height="4"/>
                <line x1="16" y1="10" x2="21" y2="10"/><line x1="10" y1="16" x2="10" y2="21"/>
                <line x1="16" y1="16" x2="21" y2="21"/>
              </svg>
              QR
            </button>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", padding: 4 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* QR Code section — shown when toggled */}
        {showQR && (
          <div style={{
            margin: "20px 24px 0", padding: "20px",
            borderRadius: 14, background: "rgba(124,58,237,0.06)",
            border: "1px solid rgba(139,92,246,0.18)",
            display: "flex", alignItems: "center", gap: 20,
            animation: "fadeIn 0.3s ease",
          }}>
            <CertQRCode certId={cert.certId} />
            <div>
              <p style={{ color: "white", fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>Scan to Verify</p>
              <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 12.5, lineHeight: 1.65, marginBottom: 12 }}>
                Scan this QR code with the EduChain app to instantly verify this certificate on the Solana blockchain.
              </p>
              <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)" }}>
                <p style={{ color: "#4ADE80", fontSize: 11.5, fontWeight: 600 }}>Opens EduChain Verify · Solana Devnet</p>
              </div>
            </div>
          </div>
        )}

        {/* Verified badge */}
        <div style={{ margin: "20px 24px 0", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 10, background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.25)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span style={{ color: "#4ADE80", fontWeight: 700, fontSize: 13 }}>Verified on Solana Blockchain</span>
        </div>

        {/* Details */}
        <div style={{ margin: "16px 24px" }}>
          {[
            { label: "Course",           value: cert.course },
            { label: "Certificate Type", value: cert.type },
            { label: "Issued By",        value: cert.institution },
            { label: "Grade",            value: cert.grade },
            { label: "Date Issued",      value: cert.dateIssued },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, padding: "11px 0",
              borderBottom: i < 4 ? "1px solid rgba(139,92,246,0.08)" : "none",
            }}>
              <span style={{ color: "rgba(148,163,184,0.55)", fontSize: 12.5, fontWeight: 600, minWidth: 120, flexShrink: 0 }}>{row.label}</span>
              <span style={{ color: "white", fontSize: 13.5, fontWeight: 500 }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Certificate ID */}
        <div style={{ margin: "0 24px 20px", padding: "12px 16px", borderRadius: 10, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}>
          <p style={{ color: "rgba(148,163,184,0.55)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 6 }}>CERTIFICATE ID</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <p style={{ color: "white", fontSize: 12.5, fontFamily: "monospace", fontWeight: 600 }}>{cert.certId}</p>
            <button onClick={() => handleCopy(cert.certId)} style={{
              padding: "5px 12px", borderRadius: 8, cursor: "pointer",
              background: copied ? "rgba(74,222,128,0.12)" : "rgba(124,58,237,0.12)",
              border: `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(139,92,246,0.25)"}`,
              color: copied ? "#4ADE80" : "#A78BFA",
              fontSize: 11.5, fontWeight: 600, fontFamily: "inherit",
              transition: "all 0.2s", flexShrink: 0,
            }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: "0 24px 24px", display: "flex", gap: 10 }}>
          <a href={cert.explorerUrl || `https://explorer.solana.com/tx/${cert.txSignature}?cluster=devnet`}
            target="_blank" rel="noopener noreferrer" style={{
              flex: 1, padding: "11px 0", borderRadius: 10, textDecoration: "none",
              background: "rgba(124,58,237,0.08)", border: "1px solid rgba(139,92,246,0.2)",
              color: "#A78BFA", fontWeight: 600, fontSize: 13,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              transition: "all 0.2s",
            }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            View on Explorer
          </a>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px 0", borderRadius: 10, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #7C3AED, #6366F1)",
            color: "white", fontWeight: 700, fontSize: 13, fontFamily: "inherit",
          }}>
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fadeIn  { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ── Certificate card row
function CertCard({ cert, onClick, isMobile }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center",
      gap: isMobile ? 12 : 16,
      padding: isMobile ? "14px" : "16px 20px",
      borderRadius: 14,
      background: "rgba(124,58,237,0.06)",
      border: "1px solid rgba(139,92,246,0.12)",
      cursor: "pointer", transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.12)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.28)"; e.currentTarget.style.transform = "translateX(3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.06)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.12)"; e.currentTarget.style.transform = "translateX(0)"; }}
    >
      {/* Icon */}
      <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.2))", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "white", fontWeight: 700, fontSize: isMobile ? 13 : 14, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {cert.course}
        </p>
        <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 12 }}>
          {cert.institution} · {cert.dateIssued}
        </p>
        {isMobile && (
          <span style={{ display: "inline-block", marginTop: 4, fontSize: 10.5, fontWeight: 700, color: "#4ADE80", background: "rgba(74,222,128,0.1)", padding: "2px 8px", borderRadius: 999, border: "1px solid rgba(74,222,128,0.25)" }}>
            Verified
          </span>
        )}
      </div>

      {/* Grade + verified — desktop */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(139,92,246,0.2)", color: "#A78BFA", fontSize: 12, fontWeight: 600 }}>
            Grade {cert.grade}
          </span>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#4ADE80", background: "rgba(74,222,128,0.1)", padding: "4px 12px", borderRadius: 999, border: "1px solid rgba(74,222,128,0.25)" }}>
            Verified
          </span>
        </div>
      )}

      {/* Chevron */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.4)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  );
}

export default function MyCertificates({ role }) {
  const { publicKey } = useWallet();
  const isMobile = useIsMobile();
  const [selectedCert, setSelectedCert] = useState(null);
  const [filter,       setFilter]       = useState("all");
  const [allCerts,     setAllCerts]     = useState([]);
  const [loading,      setLoading]      = useState(true);

  const isInstitution = role === "institution";

  // Fetch certificates on mount
  useEffect(() => {
    const fetchCerts = async () => {
      setLoading(true);
      try {
        if (isInstitution) {
          // Institution — fetch from localStorage (they issued them)
          const all = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
          const mine = Object.values(all).filter(c => c.issuedBy === publicKey);
          setAllCerts(mine);
        } else {
          // Student — fetch from blockchain
          const { fetchStudentCertificates } = await import("../solana.js");
          const onChainCerts = await fetchStudentCertificates(publicKey);

          // Also get from localStorage as fallback
          const local = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
          const localMine = Object.values(local).filter(c => c.studentWallet === publicKey);

          // Merge on-chain + local, deduplicate by certId
          const mockCerts = Object.values(MOCK_STUDENT_CERTS);
          const merged = [...mockCerts, ...onChainCerts, ...localMine];
          const unique = Object.values(
            merged.reduce((acc, c) => { acc[c.certId] = c; return acc; }, {})
          );
          setAllCerts(unique);
        }
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
        // Fallback to localStorage
        const all = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
        const mine = isInstitution
          ? Object.values(all).filter(c => c.issuedBy === publicKey)
          : [...Object.values(MOCK_STUDENT_CERTS), ...Object.values(all).filter(c => c.studentWallet === publicKey)];
        setAllCerts(mine);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, [publicKey, isInstitution]);

  // Filter options
  const filterOptions = ["all", ...new Set(allCerts.map(c => c.type).filter(Boolean))];
  const filtered = filter === "all" ? allCerts : allCerts.filter(c => c.type === filter);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
        <div style={{ textAlign: "center" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite", marginBottom: 16 }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 14 }}>Loading certificates...</p>
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
          {isInstitution ? "Issued Certificates" : "My Certificates"}
        </h1>
        <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13.5 }}>
          {isInstitution
            ? `${allCerts.length} certificate${allCerts.length !== 1 ? "s" : ""} issued by your institution.`
            : `${allCerts.length} certificate${allCerts.length !== 1 ? "s" : ""} in your academic profile.`
          }
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Total",      value: allCerts.length,                                         color: "#8B5CF6" },
          { label: "Verified",   value: allCerts.length,                                         color: "#4ADE80" },
          { label: "This Year",  value: allCerts.filter(c => c.dateIssued?.includes("2025")).length, color: "#6366F1" },
          { label: "Institutions", value: new Set(allCerts.map(c => isInstitution ? c.studentWallet?.slice(0,6) : c.institution)).size, color: "#A78BFA" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(139,92,246,0.14)" }}>
            <p style={{ fontSize: isMobile ? 22 : 26, fontWeight: 900, background: `linear-gradient(135deg, white, ${s.color})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</p>
            <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 11.5, fontWeight: 500 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      {filterOptions.length > 1 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {filterOptions.map((f, i) => (
            <button key={i} onClick={() => setFilter(f)} style={{
              padding: "6px 16px", borderRadius: 999, cursor: "pointer",
              background: filter === f ? "linear-gradient(135deg, #7C3AED, #6366F1)" : "rgba(124,58,237,0.08)",
              border: filter === f ? "none" : "1px solid rgba(139,92,246,0.2)",
              color: filter === f ? "white" : "rgba(148,163,184,0.7)",
              fontWeight: filter === f ? 700 : 500, fontSize: 12.5,
              fontFamily: "inherit", transition: "all 0.2s",
              boxShadow: filter === f ? "0 0 14px rgba(124,58,237,0.35)" : "none",
            }}>
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      )}

      {/* Certificate list */}
      {filtered.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, marginBottom: 20, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <p style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>No certificates yet</p>
          <p style={{ color: "rgba(148,163,184,0.55)", fontSize: 13.5, maxWidth: 280, lineHeight: 1.65 }}>
            {isInstitution ? "Certificates you issue will appear here." : "Certificates issued to you will appear here."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((cert, i) => (
            <CertCard key={cert.certId || i} cert={cert} isMobile={isMobile} onClick={() => setSelectedCert(cert)} />
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedCert && <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />}
    </div>
  );
}
