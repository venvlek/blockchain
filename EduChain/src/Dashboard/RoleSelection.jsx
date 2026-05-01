import { useState } from "react";
import { useWallet } from "../WalletContext";

const INSTITUTIONS = [
  "University of Lagos",
  "University of Ibadan",
  "Obafemi Awolowo University",
  "University of Nigeria, Nsukka",
  "Ahmadu Bello University",
  "University of Benin",
  "Lagos State University",
  "Covenant University",
  "Babcock University",
  "Pan-Atlantic University",
  "American University of Nigeria",
  "African University of Science and Technology",
];

// ── Step 1: Pick role
function RoleCards({ onSelectStudent, onSelectInstitution }) {
  return (
    <>
      <p style={{ color: "rgba(148,163,184,0.7)", fontSize: 14, marginBottom: 28 }}>
        How will you be using EduChain?
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>

        {/* Student */}
        <div onClick={onSelectStudent} style={{
          flex: "1 1 220px", maxWidth: 240,
          padding: "28px 24px", borderRadius: 20, cursor: "pointer",
          background: "rgba(124,58,237,0.08)", border: "1.5px solid rgba(139,92,246,0.2)",
          transition: "all 0.25s", textAlign: "center",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.18)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(124,58,237,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.08)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 20px", background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.2))", border: "1.5px solid rgba(139,92,246,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <defs><linearGradient id="sGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#A78BFA"/><stop offset="1" stopColor="#818CF8"/></linearGradient></defs>
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="url(#sGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="url(#sGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 style={{ color: "white", fontWeight: 800, fontSize: 18, marginBottom: 10 }}>Student</h3>
          <p style={{ color: "rgba(148,163,184,0.72)", fontSize: 13, lineHeight: 1.65 }}>
            View and manage your academic certificates. Share credentials with employers.
          </p>
          <div style={{ marginTop: 20, padding: "10px 0", borderRadius: 10, background: "linear-gradient(135deg, #7C3AED, #6366F1)", color: "white", fontWeight: 700, fontSize: 13, boxShadow: "0 0 18px rgba(124,58,237,0.4)" }}>
            Join as Student
          </div>
        </div>

        {/* Institution */}
        <div onClick={onSelectInstitution} style={{
          flex: "1 1 220px", maxWidth: 240,
          padding: "28px 24px", borderRadius: 20, cursor: "pointer",
          background: "rgba(74,222,128,0.05)", border: "1.5px solid rgba(74,222,128,0.18)",
          transition: "all 0.25s", textAlign: "center",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.12)"; e.currentTarget.style.borderColor = "rgba(74,222,128,0.5)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(74,222,128,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(74,222,128,0.05)"; e.currentTarget.style.borderColor = "rgba(74,222,128,0.18)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 20px", background: "linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,211,238,0.1))", border: "1.5px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <defs><linearGradient id="iGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80"/><stop offset="1" stopColor="#22D3EE"/></linearGradient></defs>
              <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke="url(#iGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 style={{ color: "white", fontWeight: 800, fontSize: 18, marginBottom: 10 }}>Institution</h3>
          <p style={{ color: "rgba(148,163,184,0.72)", fontSize: 13, lineHeight: 1.65 }}>
            Issue and manage verifiable certificates for your students on Solana.
          </p>
          <div style={{ marginTop: 20, padding: "10px 0", borderRadius: 10, background: "linear-gradient(135deg, #059669, #0891B2)", color: "white", fontWeight: 700, fontSize: 13, boxShadow: "0 0 18px rgba(74,222,128,0.25)" }}>
            Join as Institution
          </div>
        </div>
      </div>
    </>
  );
}

// ── Step 2: Pick institution from dropdown
function InstitutionPicker({ onBack, onConfirm }) {
  const { publicKey } = useWallet();
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Check if this wallet is already registered to a different institution
  const walletAlreadyRegistered = localStorage.getItem(`educhain_inst_name_${publicKey}`);

  const filtered = INSTITUTIONS.filter(i =>
    i.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    if (!selected) return;

    // Block if wallet is already linked to a different institution
    if (walletAlreadyRegistered && walletAlreadyRegistered !== selected) {
      setError(`This wallet is already registered as "${walletAlreadyRegistered}". One wallet can only represent one institution.`);
      return;
    }

    setError("");
    onConfirm(selected);
  };

  return (
    <div style={{ width: "100%", maxWidth: 440, textAlign: "left" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.6)", fontSize: 13, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        Back
      </button>

      <h2 style={{ color: "white", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Select your Institution</h2>
      <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13.5, marginBottom: 24, lineHeight: 1.6 }}>
        Your wallet address will be permanently linked to this institution. One wallet, one institution.
      </p>

      {/* Already registered warning */}
      {walletAlreadyRegistered && (
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20,
          padding: "12px 14px", borderRadius: 10,
          background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.22)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <p style={{ color: "#FBBF24", fontSize: 12.5, lineHeight: 1.6 }}>
            This wallet is already registered as <strong>"{walletAlreadyRegistered}"</strong>. You can only select that institution.
          </p>
        </div>
      )}

      {/* Dropdown */}
      <div style={{ position: "relative", marginBottom: 24 }}>
        <button onClick={() => setOpen(p => !p)} style={{
          width: "100%", padding: "13px 16px", borderRadius: 12,
          background: "rgba(124,58,237,0.08)", border: "1.5px solid rgba(139,92,246,0.25)",
          color: selected ? "white" : "rgba(148,163,184,0.5)",
          fontWeight: selected ? 600 : 400, fontSize: 14, fontFamily: "inherit",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
          transition: "border-color 0.2s",
        }}>
          {selected || "Choose institution..."}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.7)" strokeWidth="2.5" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {open && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 50,
            background: "#0D0B2A", border: "1.5px solid rgba(139,92,246,0.25)",
            borderRadius: 12, overflow: "hidden",
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}>
            {/* Search inside dropdown */}
            <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(139,92,246,0.12)" }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search institution..."
                autoFocus
                style={{
                  width: "100%", padding: "8px 12px", borderRadius: 8,
                  background: "rgba(124,58,237,0.08)", border: "1px solid rgba(139,92,246,0.2)",
                  color: "white", fontSize: 13, fontFamily: "inherit", outline: "none",
                }}
              />
            </div>
            {/* List */}
            <div style={{ maxHeight: 220, overflowY: "auto" }}>
              {filtered.length === 0 ? (
                <p style={{ color: "rgba(148,163,184,0.5)", fontSize: 13, padding: "12px 16px", textAlign: "center" }}>No results</p>
              ) : filtered.map((inst, i) => {
                // Check if this institution is already claimed by another wallet
                const claimedBy = localStorage.getItem(`educhain_inst_${inst}`);
                const isClaimed = claimedBy && claimedBy !== ""; // claimed by someone

                return (
                  <button key={i} onClick={() => {
                    // If wallet already registered, only allow selecting their own institution
                    if (walletAlreadyRegistered && walletAlreadyRegistered !== inst) return;
                    setSelected(inst);
                    setOpen(false);
                    setSearch("");
                    setError("");
                  }} style={{
                    width: "100%", padding: "12px 16px", background: "none", border: "none",
                    cursor: (walletAlreadyRegistered && walletAlreadyRegistered !== inst) ? "not-allowed" : "pointer",
                    textAlign: "left", display: "flex",
                    alignItems: "center", justifyContent: "space-between",
                    color: (walletAlreadyRegistered && walletAlreadyRegistered !== inst)
                      ? "rgba(148,163,184,0.3)"
                      : selected === inst ? "#A78BFA" : "rgba(255,255,255,0.85)",
                    fontSize: 13.5, fontFamily: "inherit", fontWeight: selected === inst ? 600 : 400,
                    borderBottom: i < filtered.length - 1 ? "1px solid rgba(139,92,246,0.07)" : "none",
                    transition: "background 0.15s",
                    opacity: (walletAlreadyRegistered && walletAlreadyRegistered !== inst) ? 0.4 : 1,
                  }}
                    onMouseEnter={e => { if (!(walletAlreadyRegistered && walletAlreadyRegistered !== inst)) e.currentTarget.style.background = "rgba(124,58,237,0.1)"; }}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    {inst}
                    {isClaimed && (
                      <span style={{ fontSize: 10, color: "#FBBF24", background: "rgba(251,191,36,0.1)", padding: "2px 8px", borderRadius: 999, border: "1px solid rgba(251,191,36,0.2)", flexShrink: 0 }}>
                        Registered
                      </span>
                    )}
                    {selected === inst && !isClaimed && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16,
          padding: "12px 14px", borderRadius: 10,
          background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <span style={{ color: "#F87171", fontSize: 12.5, lineHeight: 1.6 }}>{error}</span>
        </div>
      )}

      <button
        onClick={handleContinue}
        disabled={!selected}
        style={{
          width: "100%", padding: "13px 0", borderRadius: 12, border: "none",
          cursor: selected ? "pointer" : "not-allowed",
          background: selected ? "linear-gradient(135deg, #059669, #0891B2)" : "rgba(255,255,255,0.05)",
          color: selected ? "white" : "rgba(255,255,255,0.3)",
          fontWeight: 700, fontSize: 14, fontFamily: "inherit",
          boxShadow: selected ? "0 0 24px rgba(5,150,105,0.35)" : "none",
          transition: "all 0.2s",
        }}
      >
        Continue
      </button>
    </div>
  );
}

// ── Step 3: Confirm wallet address (if institution already registered)
function AddressConfirm({ institution, onBack, onConfirmed }) {
  const { publicKey } = useWallet();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    const saved = localStorage.getItem(`educhain_inst_${institution}`);
    if (saved === publicKey) {
      // Same wallet — already the owner, let them in
      onConfirmed();
    } else if (input.trim() === saved) {
      // They typed the correct original address
      onConfirmed();
    } else {
      setError("Wallet address does not match. Access denied.");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 440, textAlign: "left" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.6)", fontSize: 13, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        Back
      </button>

      {/* Lock icon */}
      <div style={{ width: 56, height: 56, borderRadius: 16, marginBottom: 20, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>

      <h2 style={{ color: "white", fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Institution Already Registered</h2>
      <p style={{ color: "rgba(148,163,184,0.7)", fontSize: 13.5, marginBottom: 6, lineHeight: 1.65 }}>
        <span style={{ color: "#FBBF24", fontWeight: 600 }}>{institution}</span> is already linked to a wallet address.
      </p>
      <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13, marginBottom: 24, lineHeight: 1.65 }}>
        To confirm you are the registered representative, enter the original wallet address below.
      </p>

      <label style={{ color: "rgba(148,163,184,0.7)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
        ORIGINAL WALLET ADDRESS
      </label>
      <input
        value={input}
        onChange={e => { setInput(e.target.value); setError(""); }}
        placeholder="Enter wallet address..."
        style={{
          width: "100%", padding: "13px 16px", borderRadius: 12,
          background: "rgba(124,58,237,0.08)",
          border: `1.5px solid ${error ? "rgba(248,113,113,0.5)" : "rgba(139,92,246,0.25)"}`,
          color: "white", fontSize: 13, fontFamily: "monospace", outline: "none",
          marginBottom: error ? 8 : 20, transition: "border-color 0.2s",
        }}
      />

      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "10px 14px", borderRadius: 10, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <span style={{ color: "#F87171", fontSize: 12.5, fontWeight: 500 }}>{error}</span>
        </div>
      )}

      <button onClick={handleVerify} style={{
        width: "100%", padding: "13px 0", borderRadius: 12, border: "none", cursor: "pointer",
        background: "linear-gradient(135deg, #7C3AED, #6366F1)",
        color: "white", fontWeight: 700, fontSize: 14, fontFamily: "inherit",
        boxShadow: "0 0 24px rgba(124,58,237,0.4)",
      }}>
        Verify & Continue
      </button>
    </div>
  );
}

// ── Root RoleSelection
export default function RoleSelection({ onSelectRole }) {
  const { publicKey, disconnect } = useWallet();
  const [step, setStep]               = useState("roles");       // "roles" | "institution-pick" | "institution-confirm"
  const [selectedInst, setSelectedInst] = useState("");

  const handleStudent = () => {
    localStorage.setItem(`educhain_role_${publicKey}`, "student");
    onSelectRole("student");
  };

  const handleInstitutionPick = () => setStep("institution-pick");

  const handleInstitutionConfirm = (inst) => {
    const existing = localStorage.getItem(`educhain_inst_${inst}`);

    if (!existing) {
      // First time — register this institution to this wallet
      localStorage.setItem(`educhain_inst_${inst}`, publicKey);
      localStorage.setItem(`educhain_role_${publicKey}`, "institution");
      localStorage.setItem(`educhain_inst_name_${publicKey}`, inst);
      onSelectRole("institution");
    } else if (existing === publicKey) {
      // Same wallet reconnecting — let them straight in
      localStorage.setItem(`educhain_role_${publicKey}`, "institution");
      localStorage.setItem(`educhain_inst_name_${publicKey}`, inst);
      onSelectRole("institution");
    } else {
      // Different wallet — needs address confirmation
      setSelectedInst(inst);
      setStep("institution-confirm");
    }
  };

  const handleAddressConfirmed = () => {
    localStorage.setItem(`educhain_role_${publicKey}`, "institution");
    localStorage.setItem(`educhain_inst_name_${publicKey}`, selectedInst);
    onSelectRole("institution");
  };

  return (
    <div style={{
      width: "100vw", height: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(140deg, #060410 0%, #0D0826 55%, #07051A 100%)",
      fontFamily: "'Sora', sans-serif",
      padding: "20px", position: "relative", overflow: "hidden",
    }}>
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(139,92,246,0.065) 1px, transparent 1px),linear-gradient(90deg, rgba(139,92,246,0.065) 1px, transparent 1px)", backgroundSize: "56px 56px" }}/>
      <div style={{ position: "absolute", top: "10%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent)", filter: "blur(90px)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent)", filter: "blur(80px)", pointerEvents: "none" }}/>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 560, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Logo — always visible */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #8B5CF6, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(139,92,246,0.6)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ color: "white", fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px" }}>EduChain</span>
        </div>

        {/* Wallet pill — always visible */}
        {step === "roles" && (
          <>
            <h1 style={{ fontSize: 30, fontWeight: 900, color: "white", marginBottom: 10, letterSpacing: "-0.5px" }}>Welcome to EduChain</h1>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, marginBottom: 32, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", display: "inline-block", boxShadow: "0 0 6px #4ADE80" }}/>
              <span style={{ color: "#4ADE80", fontSize: 12, fontWeight: 600, fontFamily: "monospace" }}>{publicKey?.slice(0, 6)}...{publicKey?.slice(-6)}</span>
            </div>
          </>
        )}

        {/* Step content */}
        {step === "roles" && (
          <RoleCards onSelectStudent={handleStudent} onSelectInstitution={handleInstitutionPick} />
        )}
        {step === "institution-pick" && (
          <InstitutionPicker onBack={() => setStep("roles")} onConfirm={handleInstitutionConfirm} />
        )}
        {step === "institution-confirm" && (
          <AddressConfirm institution={selectedInst} onBack={() => setStep("institution-pick")} onConfirmed={handleAddressConfirmed} />
        )}

        {/* Disconnect */}
        {step === "roles" && (
          <button onClick={disconnect} style={{ marginTop: 28, background: "none", border: "none", color: "rgba(148,163,184,0.45)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Disconnect wallet
          </button>
        )}
      </div>
    </div>
  );
}
