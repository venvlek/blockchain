import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useIsMobile } from "../landingPage/useIsMobile";

const MOCK_DB = {
  "EDUCHAIN-7X9K-2L8M-9P1Q": {
    studentName: "Victor Olatunji",
    course:      "Blockchain Development Certification",
    institution: "ABC University",
    grade:       "A",
    dateIssued:  "May 2, 2025",
    txSignature: "5hJkd...x9qL",
    type:        "Course Completion",
  },
  "EDUCHAIN-3R2K-5N9M-1Q7P": {
    studentName: "Amara Osei",
    course:      "Smart Contract Development",
    institution: "XYZ Institute",
    grade:       "B+",
    dateIssued:  "Mar 18, 2025",
    txSignature: "3mPqr...w4kN",
    type:        "Course Completion",
  },
  "EDUCHAIN-8M1K-4L6N-2R5Q": {
    studentName: "Nita Adeyemi",
    course:      "Web3 Fundamentals Certification",
    institution: "Web3 Academy",
    grade:       "A+",
    dateIssued:  "Jan 10, 2025",
    txSignature: "7xKpl...m2rQ",
    type:        "Professional Certificate",
  },
};

// ── Valid result card
function ValidResult({ cert, certId }) {
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(certId);
    setCopied(true);
    setToastVisible(true);
    setTimeout(() => {
      setCopied(false);
      setToastVisible(false);
    }, 2000);
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease", position: "relative" }}>

      {/* Toast notification */}
      {toastVisible && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 999,
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 18px", borderRadius: 12,
          background: "rgba(8,6,20,0.95)", border: "1px solid rgba(74,222,128,0.4)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          animation: "slideIn 0.3s ease",
        }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(74,222,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span style={{ color: "white", fontSize: 13.5, fontWeight: 600 }}>Certificate ID copied!</span>
        </div>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "14px 20px", borderRadius: 14, marginBottom: 20,
        background: "rgba(74,222,128,0.08)", border: "1.5px solid rgba(74,222,128,0.3)",
      }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(74,222,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <p style={{ color: "#4ADE80", fontWeight: 800, fontSize: 15 }}>Certificate is Valid</p>
          <p style={{ color: "rgba(74,222,128,0.65)", fontSize: 12.5 }}>This certificate exists on the Solana blockchain.</p>
        </div>
      </div>

      <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(139,92,246,0.15)" }}>
        {[
          { label: "Student Name",     value: cert.studentName },
          { label: "Course",           value: cert.course },
          { label: "Certificate Type", value: cert.type },
          { label: "Issued By",        value: cert.institution },
          { label: "Grade",            value: cert.grade },
          { label: "Date Issued",      value: cert.dateIssued },
          { label: "Certificate ID",   value: certId },
        ].map((row, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", padding: "13px 20px",
            background: i % 2 === 0 ? "rgba(124,58,237,0.04)" : "rgba(124,58,237,0.08)",
            borderBottom: i < 6 ? "1px solid rgba(139,92,246,0.08)" : "none",
            gap: 12, flexWrap: "wrap",
          }}>
            <span style={{ color: "rgba(148,163,184,0.6)", fontSize: 12.5, fontWeight: 600, minWidth: 130, flexShrink: 0 }}>{row.label}</span>
            <span style={{ color: "white", fontSize: row.label === "Certificate ID" ? 12 : 13.5, fontWeight: 500, flex: 1, fontFamily: row.label === "Certificate ID" ? "monospace" : "inherit" }}>{row.value}</span>
          </div>
        ))}

        {/* Transaction signature */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px", background: "rgba(124,58,237,0.04)", gap: 12 }}>
          <span style={{ color: "rgba(148,163,184,0.6)", fontSize: 12.5, fontWeight: 600, minWidth: 130, flexShrink: 0 }}>Transaction Sig</span>
          <span style={{ color: "white", fontSize: 12, fontFamily: "monospace", flex: 1 }}>{cert.txSignature}</span>
          <button onClick={handleCopy} style={{
            background: copied ? "rgba(74,222,128,0.12)" : "rgba(124,58,237,0.12)",
            border: `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(139,92,246,0.25)"}`,
            borderRadius: 8, padding: "5px 12px", cursor: "pointer",
            color: copied ? "#4ADE80" : "#A78BFA", fontSize: 11.5, fontWeight: 600,
            fontFamily: "inherit", flexShrink: 0, transition: "all 0.2s",
          }}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <a href={`https://explorer.solana.com/tx/${cert.txSignature}?cluster=devnet`}
        target="_blank" rel="noopener noreferrer" style={{
          marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "13px 0", borderRadius: 12, textDecoration: "none",
          background: "rgba(124,58,237,0.08)", border: "1px solid rgba(139,92,246,0.2)",
          color: "#A78BFA", fontWeight: 600, fontSize: 13.5, transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.16)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.08)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)"; }}
      >
        View on Solana Explorer
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </div>
  );
}

// ── Invalid result card
function InvalidResult() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "32px 20px", borderRadius: 16, textAlign: "center",
      background: "rgba(248,113,113,0.06)", border: "1.5px solid rgba(248,113,113,0.25)",
      animation: "fadeIn 0.4s ease",
    }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", marginBottom: 16, background: "rgba(248,113,113,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <p style={{ color: "#F87171", fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Certificate Not Found</p>
      <p style={{ color: "rgba(248,113,113,0.65)", fontSize: 13.5, lineHeight: 1.65, maxWidth: 320 }}>
        This certificate ID does not exist on the Solana blockchain. It may be invalid or entered incorrectly.
      </p>
    </div>
  );
}

// ── QR Scanner using html5-qrcode
function QRScanner({ onScanSuccess }) {
  const scannerRef  = useRef(null);
  const html5QrRef  = useRef(null);
  const [scanning,  setScanning]  = useState(false);
  const [camError,  setCamError]  = useState("");
  const [scanned,   setScanned]   = useState("");

  const startScanner = async () => {
    setCamError("");
    setScanned("");
    setScanning(true);

    try {
      const cameras = await Html5Qrcode.getCameras();
      if (!cameras || cameras.length === 0) {
        setCamError("No camera found on this device.");
        setScanning(false);
        return;
      }

      const cameraId = cameras[cameras.length - 1].id; // prefer rear camera on mobile

      html5QrRef.current = new Html5Qrcode("qr-reader");
      await html5QrRef.current.start(
        cameraId,
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          // QR scanned successfully
          setScanned(decodedText);
          stopScanner();
          onScanSuccess(decodedText);
        },
        () => {} // ignore frame errors
      );
    } catch (err) {
      setCamError("Could not access camera. Please allow camera permission and try again.");
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    try {
      if (html5QrRef.current) {
        await html5QrRef.current.stop();
        html5QrRef.current.clear();
        html5QrRef.current = null;
      }
    } catch (_) {}
    setScanning(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => { stopScanner(); };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* Camera viewport */}
      <div style={{
        width: "100%", maxWidth: 360,
        borderRadius: 20, overflow: "hidden",
        border: "1.5px solid rgba(139,92,246,0.25)",
        background: "rgba(8,6,20,0.8)",
        marginBottom: 20, position: "relative",
        minHeight: scanning ? 300 : 0,
      }}>
        {/* html5-qrcode renders into this div */}
        <div id="qr-reader" style={{ width: "100%" }}/>

        {/* Overlay corners when scanning */}
        {scanning && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {/* Top-left */}
            <div style={{ position: "absolute", top: 40, left: 40, width: 32, height: 32, borderTop: "3px solid #8B5CF6", borderLeft: "3px solid #8B5CF6", borderRadius: "4px 0 0 0" }}/>
            {/* Top-right */}
            <div style={{ position: "absolute", top: 40, right: 40, width: 32, height: 32, borderTop: "3px solid #8B5CF6", borderRight: "3px solid #8B5CF6", borderRadius: "0 4px 0 0" }}/>
            {/* Bottom-left */}
            <div style={{ position: "absolute", bottom: 40, left: 40, width: 32, height: 32, borderBottom: "3px solid #8B5CF6", borderLeft: "3px solid #8B5CF6", borderRadius: "0 0 0 4px" }}/>
            {/* Bottom-right */}
            <div style={{ position: "absolute", bottom: 40, right: 40, width: 32, height: 32, borderBottom: "3px solid #8B5CF6", borderRight: "3px solid #8B5CF6", borderRadius: "0 0 4px 0" }}/>
          </div>
        )}
      </div>

      {/* Idle state — not scanning yet */}
      {!scanning && !scanned && (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, margin: "0 auto 16px", background: "rgba(124,58,237,0.1)", border: "1.5px dashed rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.7)" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/>
              <rect x="3" y="16" width="5" height="5"/><rect x="10" y="10" width="4" height="4"/>
              <line x1="16" y1="10" x2="21" y2="10"/><line x1="10" y1="16" x2="10" y2="21"/>
              <line x1="16" y1="16" x2="21" y2="21"/>
            </svg>
          </div>
          <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 14, lineHeight: 1.65, maxWidth: 280, margin: "0 auto 20px" }}>
            Point your camera at a certificate QR code to verify it instantly.
          </p>
        </div>
      )}

      {/* Scanned ID preview */}
      {scanned && (
        <div style={{
          padding: "10px 16px", borderRadius: 10, marginBottom: 16,
          background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span style={{ color: "#4ADE80", fontSize: 12.5, fontFamily: "monospace" }}>Scanned: {scanned}</span>
        </div>
      )}

      {/* Error */}
      {camError && (
        <div style={{
          padding: "12px 16px", borderRadius: 10, marginBottom: 16, width: "100%", maxWidth: 360,
          background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)",
        }}>
          <p style={{ color: "#F87171", fontSize: 13, lineHeight: 1.6 }}>{camError}</p>
        </div>
      )}

      {/* Button */}
      {!scanning ? (
        <button onClick={startScanner} style={{
          padding: "12px 32px", borderRadius: 12, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, #7C3AED, #6366F1)",
          color: "white", fontWeight: 700, fontSize: 14, fontFamily: "inherit",
          boxShadow: "0 0 20px rgba(124,58,237,0.4)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          Open Camera
        </button>
      ) : (
        <button onClick={stopScanner} style={{
          padding: "12px 32px", borderRadius: 12, border: "1px solid rgba(248,113,113,0.3)", cursor: "pointer",
          background: "rgba(248,113,113,0.08)",
          color: "#F87171", fontWeight: 700, fontSize: 14, fontFamily: "inherit",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
          </svg>
          Stop Camera
        </button>
      )}

      <style>{`
        /* Override html5-qrcode default styles */
        #qr-reader { border: none !important; }
        #qr-reader video { border-radius: 18px !important; }
        #qr-reader__scan_region { border: none !important; background: transparent !important; }
        #qr-reader__dashboard { display: none !important; }
      `}</style>
    </div>
  );
}

// ── Main
export default function VerifyCertificate() {
  const isMobile  = useIsMobile();
  const [activeTab, setActiveTab] = useState("id");
  const [inputId,   setInputId]   = useState("");
  const [result,    setResult]    = useState(null);
  const [certData,  setCertData]  = useState(null);
  const [loading,   setLoading]   = useState(false);

  const runVerify = async (id) => {
    if (!id.trim()) return;
    setLoading(true);
    setResult(null);

    const key = id.trim().toUpperCase();

    try {
      // Check blockchain first — works on any device, no login needed
      const { fetchCertificate } = await import("../solana.js");
      const onChain = await fetchCertificate(key);
      console.log("On-chain result:", onChain);

      if (onChain.success) {
        setCertData(onChain);
        setResult("valid");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error("Blockchain verify error:", err);
    }

    // Fallback: check mock DB and localStorage
    const local = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
    const found = MOCK_DB[key] || local[key];

    if (found) {
      setCertData(found);
      setResult("valid");
    } else {
      setCertData(null);
      setResult("invalid");
    }
    setLoading(false);
  };

  const handleVerify = () => runVerify(inputId);

  const handleQrSuccess = (scannedId) => {
    setInputId(scannedId);
    setActiveTab("id"); // switch to ID tab to show result
    runVerify(scannedId);
  };

  const handleClear = () => {
    setInputId("");
    setResult(null);
    setCertData(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    handleClear();
  };

  return (
    <div style={{ padding: isMobile ? "24px 16px" : "32px 36px", minHeight: "100%" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "white", fontSize: isMobile ? 22 : 26, fontWeight: 900, letterSpacing: "-0.5px", marginBottom: 6 }}>
          Verify Certificate
        </h1>
        <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13.5 }}>
          Enter a certificate ID or scan a QR code to verify it on-chain.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 28,
        background: "rgba(124,58,237,0.06)", border: "1px solid rgba(139,92,246,0.15)",
        borderRadius: 12, padding: 4, width: "fit-content",
      }}>
        {[{ id: "id", label: "Enter ID" }, { id: "qr", label: "Scan QR Code" }].map(tab => (
          <button key={tab.id} onClick={() => handleTabChange(tab.id)} style={{
            padding: "9px 22px", borderRadius: 9, border: "none", cursor: "pointer",
            background: activeTab === tab.id ? "linear-gradient(135deg, #7C3AED, #6366F1)" : "transparent",
            color: activeTab === tab.id ? "white" : "rgba(148,163,184,0.65)",
            fontWeight: activeTab === tab.id ? 700 : 500, fontSize: 13.5,
            fontFamily: "inherit", transition: "all 0.2s",
            boxShadow: activeTab === tab.id ? "0 0 14px rgba(124,58,237,0.4)" : "none",
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ID Tab */}
      {activeTab === "id" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexDirection: isMobile ? "column" : "row" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                value={inputId}
                onChange={e => { setInputId(e.target.value); setResult(null); }}
                onKeyDown={e => e.key === "Enter" && handleVerify()}
                placeholder="e.g. EDUCHAIN-7X9K-2L8M-9P1Q"
                style={{
                  width: "100%", padding: "13px 16px",
                  paddingRight: inputId ? 40 : 16, borderRadius: 12,
                  background: "rgba(124,58,237,0.08)",
                  border: `1.5px solid ${result === "invalid" ? "rgba(248,113,113,0.4)" : result === "valid" ? "rgba(74,222,128,0.4)" : "rgba(139,92,246,0.25)"}`,
                  color: "white", fontSize: 14, fontFamily: "monospace",
                  outline: "none", transition: "border-color 0.2s",
                }}
              />
              {inputId && (
                <button onClick={handleClear} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", padding: 2 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
            <button onClick={handleVerify} disabled={!inputId.trim() || loading} style={{
              padding: "13px 28px", borderRadius: 12, border: "none",
              cursor: !inputId.trim() || loading ? "not-allowed" : "pointer",
              background: !inputId.trim() ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #7C3AED, #6366F1)",
              color: !inputId.trim() ? "rgba(255,255,255,0.3)" : "white",
              fontWeight: 700, fontSize: 14, fontFamily: "inherit",
              boxShadow: inputId.trim() ? "0 0 22px rgba(124,58,237,0.45)" : "none",
              transition: "all 0.2s", flexShrink: 0,
              display: "flex", alignItems: "center", gap: 8,
              width: isMobile ? "100%" : "auto", justifyContent: "center",
            }}>
              {loading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Verifying...
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Verify
                </>
              )}
            </button>
          </div>

          {/* Hint */}
          {!result && !loading && (
            <div style={{ padding: "12px 16px", borderRadius: 10, marginBottom: 16, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 12.5, lineHeight: 1.6 }}>
                Try: <span style={{ color: "#A78BFA", fontFamily: "monospace" }}>EDUCHAIN-7X9K-2L8M-9P1Q</span> to see a valid result.
              </p>
            </div>
          )}

          {result === "valid"   && <ValidResult cert={certData} certId={inputId.trim().toUpperCase()} />}
          {result === "invalid" && <InvalidResult />}
        </div>
      )}

      {/* QR Tab */}
      {activeTab === "qr" && (
        <QRScanner onScanSuccess={handleQrSuccess} />
      )}

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeIn  { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}
