import { useState } from "react";
import { useWallet } from "../WalletContext";
import { useIsMobile } from "../landing page/useIsMobile";

// Nav items per role
const STUDENT_NAV = [
  { id: "dashboard",    label: "Dashboard",           icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id: "certificates", label: "My Certificates",     icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { id: "achievements", label: "Achievements",        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> },
  { id: "verify",       label: "Verify Certificate",  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { id: "institutions", label: "Institutions",        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg> },
  { id: "settings",     label: "Settings",            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
];

const INSTITUTION_NAV = [
  { id: "dashboard",    label: "Dashboard",           icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id: "certificates", label: "My Certificates",     icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { id: "issue",        label: "Issue Certificate",   icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
  { id: "verify",       label: "Verify Certificate",  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { id: "institutions", label: "Institutions",        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg> },
  { id: "settings",     label: "Settings",            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
];

// Mobile bottom nav — STUDENT (no Issue, has Achievements)
const STUDENT_MOBILE_NAV = [
  { id: "dashboard",    label: "Home",         icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: "certificates", label: "Certificates", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { id: "achievements", label: "Achievements", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> },
  { id: "verify",       label: "Verify",       icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { id: "settings",     label: "Profile",      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

// Mobile bottom nav — INSTITUTION (has Issue, no Achievements)
const INSTITUTION_MOBILE_NAV = [
  { id: "dashboard",    label: "Home",         icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: "certificates", label: "Certificates", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { id: "issue",        label: "Issue",        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
  { id: "verify",       label: "Verify",       icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { id: "settings",     label: "Profile",      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

export default function DashboardLayout({ role, activePage, onNavigate, onLogout, onSwitchRole, children }) {
  const { publicKey } = useWallet();
  const isMobile = useIsMobile();
  const navItems       = role === "institution" ? INSTITUTION_NAV : STUDENT_NAV;
  const mobileNavItems = role === "institution" ? INSTITUTION_MOBILE_NAV : STUDENT_MOBILE_NAV;

  return (
    <div style={{
      width: "100vw", height: "100vh", display: "flex",
      background: "linear-gradient(140deg, #060410 0%, #0D0826 55%, #07051A 100%)",
      fontFamily: "'Sora', sans-serif", overflow: "hidden",
    }}>

      {/* ── Desktop Sidebar */}
      {!isMobile && (
        <aside style={{
          width: 220, flexShrink: 0, height: "100vh",
          display: "flex", flexDirection: "column",
          background: "rgba(8,6,20,0.8)", backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(139,92,246,0.13)",
          padding: "24px 0",
        }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 20px", marginBottom: 32 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 14px rgba(139,92,246,0.5)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ color: "white", fontWeight: 800, fontSize: 16, letterSpacing: "-0.3px" }}>EduChain</span>
          </div>

          {/* Role badge */}
          <div style={{ padding: "0 20px", marginBottom: 24 }}>
            <div style={{
              padding: "8px 12px", borderRadius: 10,
              background: role === "institution" ? "rgba(74,222,128,0.08)" : "rgba(124,58,237,0.1)",
              border: `1px solid ${role === "institution" ? "rgba(74,222,128,0.2)" : "rgba(139,92,246,0.2)"}`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: role === "institution" ? "rgba(74,222,128,0.15)" : "rgba(124,58,237,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke={role === "institution" ? "#4ADE80" : "#A78BFA"} strokeWidth="2" strokeLinecap="round">
                  {role === "institution"
                    ? <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11"/>
                    : <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>
                  }
                </svg>
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {role === "institution" ? "Institution" : "Student"}
                </p>
                <p style={{ color: "white", fontSize: 11, fontWeight: 600, fontFamily: "monospace" }}>
                  {publicKey?.slice(0, 6)}...{publicKey?.slice(-4)}
                </p>
              </div>
            </div>
          </div>

          {/* Nav items */}
          <nav style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems.map(item => {
              const isActive = activePage === item.id;
              return (
                <button key={item.id} onClick={() => onNavigate(item.id)} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 12px", borderRadius: 10, border: "none",
                  cursor: "pointer", width: "100%", textAlign: "left",
                  background: isActive ? "rgba(124,58,237,0.18)" : "transparent",
                  color: isActive ? "#A78BFA" : "rgba(148,163,184,0.7)",
                  fontWeight: isActive ? 600 : 500, fontSize: 13.5,
                  fontFamily: "inherit", transition: "all 0.2s",
                  borderLeft: isActive ? "2px solid #8B5CF6" : "2px solid transparent",
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(124,58,237,0.08)"; e.currentTarget.style.color = "rgba(167,139,250,0.9)"; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(148,163,184,0.7)"; }}}
                >
                  <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Switch Role */}
          <div style={{ padding: "0 12px", marginBottom: 4 }}>
            <button onClick={onSwitchRole} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 12px", borderRadius: 10, border: "none",
              cursor: "pointer", width: "100%", textAlign: "left",
              background: "transparent", color: "rgba(148,163,184,0.6)",
              fontWeight: 500, fontSize: 13.5, fontFamily: "inherit", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#A78BFA"; e.currentTarget.style.background = "rgba(124,58,237,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(148,163,184,0.6)"; e.currentTarget.style.background = "transparent"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              </svg>
              Switch Role
            </button>
          </div>

          {/* Logout */}
          <div style={{ padding: "16px 12px 0", borderTop: "1px solid rgba(139,92,246,0.1)", margin: "0 12px" }}>
            <button onClick={onLogout} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 12px", borderRadius: 10, border: "none",
              cursor: "pointer", width: "100%", textAlign: "left",
              background: "transparent", color: "rgba(148,163,184,0.6)",
              fontWeight: 500, fontSize: 13.5, fontFamily: "inherit", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#F87171"; e.currentTarget.style.background = "rgba(248,113,113,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(148,163,184,0.6)"; e.currentTarget.style.background = "transparent"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </aside>
      )}

      {/* ── Main content */}
      <main style={{
        flex: 1, height: "100vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* Content area */}
        <div style={{
          flex: 1,
          overflowY: "auto", overflowX: "hidden",
          paddingBottom: isMobile ? 70 : 0,
        }}>
          {children}
        </div>
      </main>

      {/* ── Mobile bottom nav */}
      {isMobile && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
          height: 64, display: "flex", alignItems: "center",
          background: "rgba(8,6,20,0.95)", backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(139,92,246,0.15)",
          padding: "0 8px",
        }}>
          {mobileNavItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button key={item.id} onClick={() => onNavigate(item.id)} style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 4,
                background: "none", border: "none", cursor: "pointer",
                color: isActive ? "#A78BFA" : "rgba(148,163,184,0.5)",
                fontFamily: "inherit", padding: "8px 0",
                transition: "color 0.2s",
              }}>
                <span style={{ opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
                {isActive && (
                  <div style={{ position: "absolute", bottom: 0, width: 24, height: 2, borderRadius: 1, background: "#8B5CF6" }}/>
                )}
              </button>
            );
          })}
        </nav>
      )}

      <style>{`
        main::-webkit-scrollbar { width: 4px; }
        main::-webkit-scrollbar-track { background: transparent; }
        main::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 4px; }
      `}</style>
    </div>
  );
}
