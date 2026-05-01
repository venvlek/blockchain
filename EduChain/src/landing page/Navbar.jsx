import { useState } from "react";
import { useWallet } from "../WalletContext";
import { useIsMobile } from "./useIsMobile";

const NAV_LINKS = [
  { label: "Home",         page: "home"         },
  { label: "Features",     page: "features"     },
  { label: "How It Works", page: "how-it-works" },
  { label: "About",        page: "about"        },
];

function shortAddress(address) {
  return address.slice(0, 4) + "..." + address.slice(-4);
}

// ── Connect Modal with PIN gate
function ConnectModal({ onClose, onSuccess }) {
  const { connect, connecting } = useWallet();
  const [step,     setStep]     = useState("wallet");  // "wallet" | "pin"
  const [pin,      setPin]      = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [error,    setError]    = useState("");
  const [detectedKey, setDetectedKey] = useState(null);

  const PIN_STORAGE = "educhain_session_pin";

  const handleConnectPhantom = async () => {
    setError("");
    try {
      const phantom = window?.solana;
      if (!phantom?.isPhantom) {
        window.open("https://phantom.app", "_blank");
        return;
      }
      // Get the wallet address (Phantom may or may not show popup)
      const resp = await phantom.connect({ onlyIfTrusted: false });
      setDetectedKey(resp.publicKey.toString());

      // Check if this wallet has a PIN already set
      const savedPin = localStorage.getItem(`${PIN_STORAGE}_${resp.publicKey.toString()}`);
      if (savedPin) {
        setStep("enter-pin");
      } else {
        setStep("set-pin");
      }
    } catch (err) {
      setError("Could not connect to Phantom. Make sure it's installed and unlocked.");
    }
  };

  const handleSetPin = () => {
    if (pin.length < 4) { setError("PIN must be at least 4 digits."); return; }
    if (pin !== confirm) { setError("PINs do not match."); return; }
    localStorage.setItem(`${PIN_STORAGE}_${detectedKey}`, pin);
    onSuccess(detectedKey);
  };

  const handleEnterPin = () => {
    const savedPin = localStorage.getItem(`${PIN_STORAGE}_${detectedKey}`);
    if (pin === savedPin) {
      onSuccess(detectedKey);
    } else {
      setError("Incorrect PIN. Please try again.");
      setPin("");
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)",
      padding: 20,
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: "100%", maxWidth: 400,
        background: "linear-gradient(135deg, #0D0B2A, #110E35)",
        border: "1.5px solid rgba(139,92,246,0.3)",
        borderRadius: 20, padding: "32px 28px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
      }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #8B5CF6, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(139,92,246,0.5)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ color: "white", fontWeight: 800, fontSize: 15 }}>EduChain</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", padding: 4 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* ── STEP 1: Connect Phantom */}
        {step === "wallet" && (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, margin: "0 auto 16px", background: "linear-gradient(135deg, #AB9FF2, #6B5ECD)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(171,159,242,0.4)" }}>
                <svg width="32" height="32" viewBox="0 0 128 128" fill="white">
                  <path d="M64 4C30.9 4 4 30.9 4 64s26.9 60 60 60c8.3 0 16.2-1.7 23.4-4.7C98.1 115 107 104.3 107 92V64C107 30.9 80.1 4 64 4zm-18 72a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm36 0a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/>
                </svg>
              </div>
              <h3 style={{ color: "white", fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Connect Wallet</h3>
              <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13.5, lineHeight: 1.65 }}>
                Connect your Phantom wallet to access EduChain. You'll set a PIN to secure your session.
              </p>
            </div>

            {error && (
              <div style={{ padding: "10px 14px", borderRadius: 10, marginBottom: 16, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}>
                <p style={{ color: "#F87171", fontSize: 12.5 }}>{error}</p>
              </div>
            )}

            <button onClick={handleConnectPhantom} disabled={connecting} style={{
              width: "100%", padding: "13px 0", borderRadius: 12, border: "none",
              cursor: connecting ? "wait" : "pointer",
              background: "linear-gradient(135deg, #7C3AED, #6366F1)",
              color: "white", fontWeight: 700, fontSize: 14, fontFamily: "inherit",
              boxShadow: "0 0 24px rgba(124,58,237,0.45)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              {connecting ? "Connecting..." : "Connect with Phantom"}
            </button>
            <button onClick={onClose} style={{ width: "100%", marginTop: 10, padding: "12px 0", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(148,163,184,0.6)", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              Cancel
            </button>
          </>
        )}

        {/* ── STEP 2a: Set PIN (first time) */}
        {step === "set-pin" && (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, margin: "0 auto 14px", background: "rgba(124,58,237,0.15)", border: "1.5px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 style={{ color: "white", fontWeight: 800, fontSize: 17, marginBottom: 6 }}>Set Your PIN</h3>
              <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 13, lineHeight: 1.6 }}>
                Create a PIN to secure your EduChain session. You'll need this every time you log in.
              </p>
              {detectedKey && (
                <div style={{ marginTop: 12, padding: "6px 14px", borderRadius: 999, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }}/>
                  <span style={{ color: "#4ADE80", fontSize: 11, fontFamily: "monospace", fontWeight: 600 }}>{detectedKey.slice(0,8)}...{detectedKey.slice(-6)}</span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ color: "rgba(148,163,184,0.6)", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>CREATE PIN</label>
              <input
                type="password" value={pin}
                onChange={e => { setPin(e.target.value); setError(""); }}
                placeholder="Enter PIN (min 4 digits)"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(124,58,237,0.08)", border: "1.5px solid rgba(139,92,246,0.2)", color: "white", fontSize: 14, fontFamily: "inherit", outline: "none" }}
              />
            </div>
            <div style={{ marginBottom: error ? 8 : 20 }}>
              <label style={{ color: "rgba(148,163,184,0.6)", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>CONFIRM PIN</label>
              <input
                type="password" value={confirm}
                onChange={e => { setConfirm(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleSetPin()}
                placeholder="Re-enter PIN"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(124,58,237,0.08)", border: `1.5px solid ${error ? "rgba(248,113,113,0.5)" : "rgba(139,92,246,0.2)"}`, color: "white", fontSize: 14, fontFamily: "inherit", outline: "none" }}
              />
            </div>

            {error && <p style={{ color: "#F87171", fontSize: 12.5, marginBottom: 14 }}>{error}</p>}

            <button onClick={handleSetPin} style={{ width: "100%", padding: "13px 0", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #7C3AED, #6366F1)", color: "white", fontWeight: 700, fontSize: 14, fontFamily: "inherit", boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}>
              Set PIN & Enter
            </button>
          </>
        )}

        {/* ── STEP 2b: Enter PIN (returning user) */}
        {step === "enter-pin" && (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, margin: "0 auto 14px", background: "rgba(124,58,237,0.15)", border: "1.5px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 style={{ color: "white", fontWeight: 800, fontSize: 17, marginBottom: 6 }}>Enter Your PIN</h3>
              <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 13, lineHeight: 1.6 }}>
                Enter your EduChain PIN to continue.
              </p>
              {detectedKey && (
                <div style={{ marginTop: 12, padding: "6px 14px", borderRadius: 999, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }}/>
                  <span style={{ color: "#4ADE80", fontSize: 11, fontFamily: "monospace", fontWeight: 600 }}>{detectedKey.slice(0,8)}...{detectedKey.slice(-6)}</span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: error ? 8 : 20 }}>
              <input
                type="password" value={pin}
                onChange={e => { setPin(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleEnterPin()}
                placeholder="Enter your PIN"
                autoFocus
                style={{ width: "100%", padding: "13px 14px", borderRadius: 10, background: "rgba(124,58,237,0.08)", border: `1.5px solid ${error ? "rgba(248,113,113,0.5)" : "rgba(139,92,246,0.2)"}`, color: "white", fontSize: 15, fontFamily: "inherit", outline: "none", letterSpacing: "0.2em", textAlign: "center" }}
              />
            </div>

            {error && (
              <div style={{ padding: "10px 14px", borderRadius: 10, marginBottom: 14, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}>
                <p style={{ color: "#F87171", fontSize: 12.5 }}>{error}</p>
              </div>
            )}

            <button onClick={handleEnterPin} style={{ width: "100%", padding: "13px 0", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #7C3AED, #6366F1)", color: "white", fontWeight: 700, fontSize: 14, fontFamily: "inherit", boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}>
              Unlock
            </button>
            <button onClick={() => { setStep("wallet"); setPin(""); setError(""); }} style={{ width: "100%", marginTop: 10, padding: "11px 0", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "none", color: "rgba(148,163,184,0.55)", fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              Use a different wallet
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Navbar({ activePage, onNavigate, onOpenConnect }) {
  const { connected, publicKey, connect, disconnect } = useWallet();
  const isMobile = useIsMobile();
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Allow external trigger (e.g. Explore Dashboard button)
  const openModal = () => setShowModal(true);
  if (onOpenConnect) onOpenConnect.current = openModal;

  const handleConnectClick = () => {
    if (connected) {
      disconnect();
    } else {
      setShowModal(true);
    }
    setMenuOpen(false);
  };

  // Called when PIN is verified — now actually log in
  const handleSuccess = async (key) => {
    await connect(key);
    setShowModal(false);
  };

  const handleNavigate = (page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 66, padding: isMobile ? "0 20px" : "0 52px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(8,6,20,0.85)", backdropFilter: "blur(22px)",
        borderBottom: "1px solid rgba(139,92,246,0.13)",
      }}>
        {/* Logo */}
        <div onClick={() => handleNavigate("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #8B5CF6, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 18px rgba(139,92,246,0.55)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ color: "white", fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>EduChain</span>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 42 }}>
            {NAV_LINKS.map(({ label, page }) => {
              const isActive = activePage === page;
              return (
                <button key={page} onClick={() => handleNavigate(page)} style={{
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  color: isActive ? "#A78BFA" : "rgba(148,163,184,0.75)",
                  fontSize: 13.5, fontWeight: isActive ? 600 : 500, fontFamily: "inherit",
                  borderBottom: isActive ? "1.5px solid #8B5CF6" : "1.5px solid transparent",
                  paddingBottom: 2, transition: "color 0.2s",
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "rgba(167,139,250,0.9)"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "rgba(148,163,184,0.75)"; }}>
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Desktop wallet button */}
        {!isMobile && (
          <button onClick={handleConnectClick} style={{
            padding: "10px 22px", borderRadius: 12, border: "none", cursor: "pointer",
            background: connected ? "rgba(74,222,128,0.15)" : "linear-gradient(135deg, #7C3AED, #6366F1)",
            color: connected ? "#4ADE80" : "white",
            outline: connected ? "1px solid rgba(74,222,128,0.4)" : "none",
            fontWeight: 700, fontSize: 13.5, fontFamily: "inherit",
            boxShadow: connected ? "none" : "0 0 26px rgba(124,58,237,0.48)",
            display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {connected ? <polyline points="20 6 9 17 4 12"/> : <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></>}
            </svg>
            {connected && publicKey ? shortAddress(publicKey) : "Connect Wallet"}
          </button>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(p => !p)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", alignItems: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        )}
      </nav>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{ position: "fixed", top: 66, left: 0, right: 0, zIndex: 99, background: "rgba(8,6,20,0.97)", backdropFilter: "blur(22px)", borderBottom: "1px solid rgba(139,92,246,0.15)", padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_LINKS.map(({ label, page }) => {
            const isActive = activePage === page;
            return (
              <button key={page} onClick={() => handleNavigate(page)} style={{ background: isActive ? "rgba(124,58,237,0.12)" : "none", border: "none", cursor: "pointer", padding: "12px 16px", borderRadius: 10, textAlign: "left", color: isActive ? "#A78BFA" : "rgba(148,163,184,0.85)", fontSize: 15, fontWeight: isActive ? 600 : 500, fontFamily: "inherit" }}>
                {label}
              </button>
            );
          })}
          <button onClick={handleConnectClick} style={{ marginTop: 12, padding: "13px 20px", borderRadius: 12, border: "none", cursor: "pointer", background: connected ? "rgba(74,222,128,0.15)" : "linear-gradient(135deg, #7C3AED, #6366F1)", color: connected ? "#4ADE80" : "white", outline: connected ? "1px solid rgba(74,222,128,0.4)" : "none", fontWeight: 700, fontSize: 14, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {connected ? <polyline points="20 6 9 17 4 12"/> : <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></>}
            </svg>
            {connected && publicKey ? shortAddress(publicKey) : "Connect Wallet"}
          </button>
        </div>
      )}

      {/* Connect modal */}
      {showModal && (
        <ConnectModal onClose={() => setShowModal(false)} onSuccess={handleSuccess} />
      )}
    </>
  );
}
