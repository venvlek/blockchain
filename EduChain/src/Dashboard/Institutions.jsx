import { useState } from "react";
import { useWallet } from "../WalletContext";
import { useIsMobile } from "../landingPage/useIsMobile";

// Full list of institutions (same as RoleSelection)
const ALL_INSTITUTIONS = [
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

// Institution icons cycle through these colors
const COLORS = ["#8B5CF6", "#6366F1", "#4ADE80", "#F59E0B", "#22D3EE", "#F472B6", "#A78BFA", "#34D399", "#FB923C", "#818CF8", "#4ADE80", "#C084FC"];

export default function Institutions() {
  const { publicKey } = useWallet();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // Check which institutions are registered (have a wallet linked)
  const getInstitutionData = (name) => {
    const walletKey = localStorage.getItem(`educhain_inst_${name}`);
    const allCerts  = JSON.parse(localStorage.getItem("educhain_certificates") || "{}");
    const issued    = Object.values(allCerts).filter(c =>
      localStorage.getItem(`educhain_inst_name_${c.issuedBy}`) === name
    );
    return {
      name,
      registered: !!walletKey,
      walletKey:  walletKey ? walletKey.slice(0, 6) + "..." + walletKey.slice(-4) : null,
      isYours:    walletKey === publicKey,
      certsIssued: issued.length,
    };
  };

  const institutions = ALL_INSTITUTIONS.map(getInstitutionData);
  const filtered = institutions.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const registeredCount = institutions.filter(i => i.registered).length;

  return (
    <div style={{ padding: isMobile ? "24px 16px" : "32px 36px", minHeight: "100%" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "white", fontSize: isMobile ? 22 : 26, fontWeight: 900, letterSpacing: "-0.5px", marginBottom: 6 }}>
          Institutions
        </h1>
        <p style={{ color: "rgba(148,163,184,0.65)", fontSize: 13.5 }}>
          {registeredCount} of {ALL_INSTITUTIONS.length} institutions registered on EduChain.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Total Institutions", value: ALL_INSTITUTIONS.length, color: "#8B5CF6" },
          { label: "Registered",         value: registeredCount,         color: "#4ADE80" },
          { label: "Available Slots",    value: ALL_INSTITUTIONS.length - registeredCount, color: "#6366F1" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "16px 18px", borderRadius: 14, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}>
            <p style={{ fontSize: isMobile ? 24 : 28, fontWeight: 900, background: `linear-gradient(135deg, white, ${s.color})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {s.value}
            </p>
            <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 11.5, fontWeight: 500 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="2" strokeLinecap="round"
          style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search institutions..."
          style={{
            width: "100%", padding: "11px 14px 11px 40px", borderRadius: 12,
            background: "rgba(124,58,237,0.08)", border: "1.5px solid rgba(139,92,246,0.22)",
            color: "white", fontSize: 13.5, fontFamily: "inherit", outline: "none",
          }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", padding: 2 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["All", "Registered", "Available"].map((f, i) => {
          const isActive = f === "All" && !search;
          return (
            <button key={i} onClick={() => {
              if (f === "Registered") setSearch("");
            }} style={{
              padding: "5px 14px", borderRadius: 999, cursor: "pointer", fontFamily: "inherit",
              border: isActive ? "none" : "1px solid rgba(139,92,246,0.2)",
              background: isActive ? "linear-gradient(135deg, #7C3AED, #6366F1)" : "rgba(124,58,237,0.07)",
              color: isActive ? "white" : "rgba(148,163,184,0.7)",
              fontSize: 12, fontWeight: isActive ? 700 : 500,
              boxShadow: isActive ? "0 0 14px rgba(124,58,237,0.35)" : "none",
            }}>
              {f}
              <span style={{ marginLeft: 6, color: "#A78BFA", fontWeight: 700 }}>
                {f === "All" ? institutions.length : f === "Registered" ? registeredCount : institutions.length - registeredCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Institution grid */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 12 }}>
        {filtered.map((inst, i) => (
          <div key={i}
            onClick={() => setSelected(inst)}
            style={{
              padding: "18px 20px", borderRadius: 14, cursor: "pointer",
              background: inst.isYours
                ? "rgba(124,58,237,0.14)"
                : inst.registered
                  ? "rgba(74,222,128,0.05)"
                  : "rgba(124,58,237,0.06)",
              border: inst.isYours
                ? "1.5px solid rgba(139,92,246,0.45)"
                : inst.registered
                  ? "1px solid rgba(74,222,128,0.2)"
                  : "1px solid rgba(139,92,246,0.12)",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 14,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            {/* Avatar */}
            <div style={{
              width: 46, height: 46, borderRadius: 12, flexShrink: 0,
              background: `${COLORS[i % COLORS.length]}22`,
              border: `1.5px solid ${COLORS[i % COLORS.length]}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 800, color: COLORS[i % COLORS.length],
            }}>
              {inst.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <p style={{ color: "white", fontWeight: 700, fontSize: 13.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {inst.name}
                </p>
                {inst.isYours && (
                  <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, color: "#A78BFA", background: "rgba(139,92,246,0.15)", padding: "1px 7px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.3)" }}>
                    YOU
                  </span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {inst.registered ? (
                  <>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block", boxShadow: "0 0 6px #4ADE80" }}/>
                    <span style={{ color: "rgba(74,222,128,0.8)", fontSize: 12, fontWeight: 500 }}>Registered</span>
                    {inst.certsIssued > 0 && (
                      <span style={{ color: "rgba(148,163,184,0.5)", fontSize: 12 }}>· {inst.certsIssued} cert{inst.certsIssued !== 1 ? "s" : ""}</span>
                    )}
                  </>
                ) : (
                  <>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(148,163,184,0.3)", display: "inline-block" }}/>
                    <span style={{ color: "rgba(148,163,184,0.45)", fontSize: 12 }}>Not registered</span>
                  </>
                )}
              </div>
            </div>

            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.35)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <p style={{ color: "rgba(148,163,184,0.5)", fontSize: 14 }}>No institutions match your search.</p>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", padding: 20,
        }} onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div style={{
            width: "100%", maxWidth: 420,
            background: "linear-gradient(135deg, #0D0B2A, #110E35)",
            border: "1.5px solid rgba(139,92,246,0.3)",
            borderRadius: 20, overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
            animation: "modalIn 0.3s ease",
          }}>
            {/* Header */}
            <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid rgba(139,92,246,0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${COLORS[ALL_INSTITUTIONS.indexOf(selected.name) % COLORS.length]}22`,
                  border: `1.5px solid ${COLORS[ALL_INSTITUTIONS.indexOf(selected.name) % COLORS.length]}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 800,
                  color: COLORS[ALL_INSTITUTIONS.indexOf(selected.name) % COLORS.length],
                }}>
                  {selected.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", padding: 4 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <h3 style={{ color: "white", fontWeight: 800, fontSize: 17, marginBottom: 6 }}>{selected.name}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {selected.registered ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }}/>
                    <span style={{ color: "#4ADE80", fontSize: 12, fontWeight: 600 }}>Registered on EduChain</span>
                  </span>
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: "rgba(148,163,184,0.06)", border: "1px solid rgba(148,163,184,0.15)" }}>
                    <span style={{ color: "rgba(148,163,184,0.5)", fontSize: 12, fontWeight: 500 }}>Not yet registered</span>
                  </span>
                )}
                {selected.isYours && (
                  <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#A78BFA", fontSize: 12, fontWeight: 700 }}>Your Institution</span>
                )}
              </div>
            </div>

            {/* Details */}
            <div style={{ padding: "20px 24px" }}>
              {[
                { label: "Institution",       value: selected.name },
                { label: "Status",            value: selected.registered ? "Active" : "Unregistered" },
                { label: "Certificates Issued", value: selected.certsIssued || 0 },
                { label: "Wallet",            value: selected.walletKey || "—" },
                { label: "Network",           value: "Solana Devnet" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(139,92,246,0.08)" : "none" }}>
                  <span style={{ color: "rgba(148,163,184,0.55)", fontSize: 12.5, fontWeight: 600, minWidth: 140, flexShrink: 0 }}>{row.label}</span>
                  <span style={{ color: row.label === "Status" ? (selected.registered ? "#4ADE80" : "rgba(148,163,184,0.5)") : "white", fontSize: 13, fontWeight: 500, fontFamily: row.label === "Wallet" ? "monospace" : "inherit" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ padding: "0 24px 24px" }}>
              <button onClick={() => setSelected(null)} style={{ width: "100%", padding: "12px 0", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #7C3AED, #6366F1)", color: "white", fontWeight: 700, fontSize: 14, fontFamily: "inherit" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
    </div>
  );
}
