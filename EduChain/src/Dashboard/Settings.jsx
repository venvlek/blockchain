import { useState } from "react";
import { useWallet } from "../WalletContext";
import { useIsMobile } from "../landing page/useIsMobile";

function SettingSection({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 14 }}>
        {title}
      </h3>
      <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(139,92,246,0.15)" }}>
        {children}
      </div>
    </div>
  );
}

function SettingRow({ label, desc, children, last }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 16, padding: "16px 20px",
      background: "rgba(124,58,237,0.05)",
      borderBottom: last ? "none" : "1px solid rgba(139,92,246,0.08)",
      flexWrap: "wrap",
    }}>
      <div style={{ flex: 1, minWidth: 160 }}>
        <p style={{ color: "white", fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{label}</p>
        {desc && <p style={{ color: "rgba(148,163,184,0.55)", fontSize: 12.5 }}>{desc}</p>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

export default function Settings({ role, onSwitchRole, onLogout }) {
  const { publicKey, disconnect } = useWallet();
  const isMobile = useIsMobile();

  const nameKey       = `educhain_name_${publicKey}`;
  const savedName     = localStorage.getItem(nameKey) || "";
  const institutionName = localStorage.getItem(`educhain_inst_name_${publicKey}`) || "";
  const isInstitution = role === "institution";

  const [name,        setName]        = useState(savedName);
  const [editingName, setEditingName] = useState(false);
  const [nameInput,   setNameInput]   = useState(savedName);
  const [nameSaved,   setNameSaved]   = useState(false);
  const [copied,      setCopied]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    localStorage.setItem(nameKey, nameInput.trim());
    setName(nameInput.trim());
    setEditingName(false);
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2000);
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    disconnect();
    onLogout();
  };

  // Stats summary
  const allCerts   = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
  const myCerts    = Object.values(allCerts).filter(c => c.issuedBy === publicKey);
  const totalCerts = isInstitution ? myCerts.length : 3; // 3 mock for students

  return (
    <div style={{ padding: isMobile ? "24px 16px" : "32px 36px", minHeight: "100%" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: "white", fontSize: isMobile ? 22 : 26, fontWeight: 900, letterSpacing: "-0.5px", marginBottom: 6 }}>
          Settings
        </h1>
        <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13.5 }}>
          Manage your account, wallet, and preferences.
        </p>
      </div>

      {/* Profile card */}
      <div style={{
        padding: "24px", borderRadius: 18, marginBottom: 32,
        background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(99,102,241,0.06))",
        border: "1.5px solid rgba(139,92,246,0.25)",
        display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
      }}>
        {/* Avatar */}
        <div style={{
          width: 60, height: 60, borderRadius: "50%", flexShrink: 0,
          background: isInstitution
            ? "linear-gradient(135deg, #059669, #0891B2)"
            : "linear-gradient(135deg, #7C3AED, #6366F1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 20, color: "white",
          boxShadow: isInstitution
            ? "0 0 20px rgba(5,150,105,0.4)"
            : "0 0 20px rgba(124,58,237,0.5)",
        }}>
          {isInstitution
            ? institutionName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
            : (name || "?")[0].toUpperCase()
          }
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: "white", fontWeight: 800, fontSize: 17, marginBottom: 3 }}>
            {isInstitution ? `Admin — ${institutionName}` : name || "Student"}
          </p>
          <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 12.5, fontFamily: "monospace" }}>
            {publicKey?.slice(0, 12)}...{publicKey?.slice(-8)}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <span style={{
              padding: "3px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 600,
              background: isInstitution ? "rgba(74,222,128,0.1)" : "rgba(124,58,237,0.15)",
              border: isInstitution ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(139,92,246,0.3)",
              color: isInstitution ? "#4ADE80" : "#A78BFA",
            }}>
              {isInstitution ? "Institution" : "Student"}
            </span>
            <span style={{ color: "rgba(148,163,184,0.45)", fontSize: 12 }}>
              {totalCerts} certificate{totalCerts !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* PROFILE SETTINGS */}
      <SettingSection title="PROFILE">
        {/* Display name — students only */}
        {!isInstitution && (
          <SettingRow label="Display Name" desc="How you appear across EduChain">
            {editingName ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSaveName()}
                  autoFocus
                  style={{
                    padding: "8px 12px", borderRadius: 8, width: 160,
                    background: "rgba(124,58,237,0.1)", border: "1.5px solid rgba(139,92,246,0.3)",
                    color: "white", fontSize: 13, fontFamily: "inherit", outline: "none",
                  }}
                />
                <button onClick={handleSaveName} style={{
                  padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #7C3AED, #6366F1)",
                  color: "white", fontWeight: 700, fontSize: 12, fontFamily: "inherit",
                }}>Save</button>
                <button onClick={() => { setEditingName(false); setNameInput(savedName); }} style={{
                  padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(148,163,184,0.7)", fontSize: 12, fontFamily: "inherit",
                }}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {nameSaved && <span style={{ color: "#4ADE80", fontSize: 12, fontWeight: 600 }}>Saved!</span>}
                <span style={{ color: "rgba(148,163,184,0.7)", fontSize: 13, marginRight: 8 }}>{name || "Not set"}</span>
                <button onClick={() => setEditingName(true)} style={{
                  padding: "7px 16px", borderRadius: 8, cursor: "pointer",
                  background: "rgba(124,58,237,0.1)", border: "1px solid rgba(139,92,246,0.25)",
                  color: "#A78BFA", fontSize: 12.5, fontWeight: 600, fontFamily: "inherit",
                }}>Edit</button>
              </div>
            )}
          </SettingRow>
        )}

        {/* Institution — read only */}
        {isInstitution && (
          <SettingRow label="Institution" desc="Your registered institution on EduChain">
            <span style={{ color: "rgba(148,163,184,0.7)", fontSize: 13 }}>{institutionName}</span>
          </SettingRow>
        )}

        {/* Role */}
        <SettingRow label="Role" desc="Your current role on EduChain" last>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600,
              background: isInstitution ? "rgba(74,222,128,0.1)" : "rgba(124,58,237,0.12)",
              border: isInstitution ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(139,92,246,0.25)",
              color: isInstitution ? "#4ADE80" : "#A78BFA",
            }}>
              {isInstitution ? "Institution" : "Student"}
            </span>
            <button onClick={onSwitchRole} style={{
              padding: "5px 12px", borderRadius: 8, cursor: "pointer",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(148,163,184,0.6)", fontSize: 12, fontFamily: "inherit",
            }}>Switch</button>
          </div>
        </SettingRow>
      </SettingSection>

      {/* WALLET */}
      <SettingSection title="WALLET">
        <SettingRow label="Wallet Address" desc="Your connected Solana wallet">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "rgba(148,163,184,0.65)", fontSize: 12, fontFamily: "monospace" }}>
              {publicKey?.slice(0, 8)}...{publicKey?.slice(-6)}
            </span>
            <button onClick={handleCopyWallet} style={{
              padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
              background: copied ? "rgba(74,222,128,0.12)" : "rgba(124,58,237,0.1)",
              border: `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(139,92,246,0.25)"}`,
              color: copied ? "#4ADE80" : "#A78BFA",
              fontSize: 12, fontWeight: 600, fontFamily: "inherit", transition: "all 0.2s",
            }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </SettingRow>

        <SettingRow label="Network" desc="Currently connected network">
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", display: "inline-block", boxShadow: "0 0 6px #4ADE80" }}/>
            <span style={{ color: "#4ADE80", fontSize: 13, fontWeight: 600 }}>Solana Devnet</span>
          </div>
        </SettingRow>

        <SettingRow label="PIN Security" desc="EduChain session PIN is active" last>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span style={{ color: "#4ADE80", fontSize: 13, fontWeight: 600 }}>Active</span>
          </div>
        </SettingRow>
      </SettingSection>

      {/* ABOUT */}
      <SettingSection title="ABOUT">
        <SettingRow label="Version" desc="EduChain app version">
          <span style={{ color: "rgba(148,163,184,0.5)", fontSize: 13 }}>v1.0.0 · Devnet</span>
        </SettingRow>
        <SettingRow label="Built on" desc="Blockchain network">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 70 70" fill="none">
              <defs><linearGradient id="solS" x1="0" y1="0" x2="70" y2="70" gradientUnits="userSpaceOnUse"><stop stopColor="#9945FF"/><stop offset="1" stopColor="#14F195"/></linearGradient></defs>
              <path d="M14 50 L48 50 Q53 50 55 46 L56 44 L22 44 Q17 44 15 48 Z" fill="url(#solS)"/>
              <path d="M14 37 L48 37 Q53 37 55 33 L56 31 L22 31 Q17 31 15 35 Z" fill="url(#solS)"/>
              <path d="M14 24 L48 24 Q53 24 55 28 L56 30 L22 30 Q17 30 15 26 Z" fill="url(#solS)" opacity="0.75"/>
            </svg>
            <span style={{ color: "rgba(148,163,184,0.6)", fontSize: 13 }}>Solana</span>
          </div>
        </SettingRow>
        <SettingRow label="Hackathon" desc="Project submitted to" last>
          <span style={{ color: "rgba(148,163,184,0.5)", fontSize: 13 }}>Squad Hackathon 3.0</span>
        </SettingRow>
      </SettingSection>

      {/* DANGER ZONE */}
      <SettingSection title="ACCOUNT">
        <SettingRow label="Switch Role" desc="Change between Student and Institution">
          <button onClick={onSwitchRole} style={{
            padding: "8px 18px", borderRadius: 10, border: "1px solid rgba(139,92,246,0.3)",
            background: "rgba(124,58,237,0.08)", color: "#A78BFA",
            fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
          }}>
            Switch Role
          </button>
        </SettingRow>
        <SettingRow label="Disconnect Wallet" desc="Log out and return to landing page" last>
          <button onClick={() => setShowConfirm(true)} style={{
            padding: "8px 18px", borderRadius: 10, border: "1px solid rgba(248,113,113,0.3)",
            background: "rgba(248,113,113,0.07)", color: "#F87171",
            fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.14)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(248,113,113,0.07)"; }}
          >
            Disconnect
          </button>
        </SettingRow>
      </SettingSection>

      {/* Logout confirm modal */}
      {showConfirm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", padding: 20,
        }} onClick={e => { if (e.target === e.currentTarget) setShowConfirm(false); }}>
          <div style={{
            width: "100%", maxWidth: 380,
            background: "linear-gradient(135deg, #0D0B2A, #110E35)",
            border: "1.5px solid rgba(248,113,113,0.25)",
            borderRadius: 20, padding: "28px 24px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
            animation: "modalIn 0.3s ease",
          }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, marginBottom: 18, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <h3 style={{ color: "white", fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Disconnect Wallet?</h3>
            <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13.5, lineHeight: 1.65, marginBottom: 24 }}>
              You'll be returned to the landing page and will need to reconnect and enter your PIN to access your dashboard again.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowConfirm(false)} style={{
                flex: 1, padding: "12px 0", borderRadius: 12,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(148,163,184,0.7)", fontWeight: 600, fontSize: 14,
                cursor: "pointer", fontFamily: "inherit",
              }}>Cancel</button>
              <button onClick={handleLogout} style={{
                flex: 1, padding: "12px 0", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                color: "white", fontWeight: 700, fontSize: 14,
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 0 20px rgba(220,38,38,0.35)",
              }}>Disconnect</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
    </div>
  );
}
