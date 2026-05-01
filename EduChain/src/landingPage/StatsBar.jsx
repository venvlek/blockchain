import { useIsMobile } from "./useIsMobile";

const STATS = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>,
    value: "120+", label: "Institutions",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    value: "5,430+", label: "Certificates Issued",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    value: "3,250+", label: "Students",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    value: "100%", label: "On-Chain Verified",
  },
];

export default function StatsBar() {
  const isMobile = useIsMobile();

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      background: "rgba(8,6,20,0.88)", backdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(139,92,246,0.13)",
    }}>
      {STATS.map((s, i) => (
        <div key={i} style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: isMobile ? "10px 0" : "16px 0",
          gap: 3,
          borderRight: isMobile
            ? (i % 2 === 0 ? "1px solid rgba(139,92,246,0.1)" : "none")
            : (i < 3 ? "1px solid rgba(139,92,246,0.1)" : "none"),
          borderBottom: isMobile && i < 2 ? "1px solid rgba(139,92,246,0.1)" : "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            {s.icon}
            <span style={{
              fontWeight: 800, fontSize: isMobile ? 17 : 22,
              background: "linear-gradient(135deg, #fff 30%, #A78BFA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {s.value}
            </span>
          </div>
          <span style={{
            color: "rgba(100,116,139,0.85)",
            fontSize: isMobile ? 9.5 : 11,
            fontWeight: 500, textAlign: "center",
          }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
