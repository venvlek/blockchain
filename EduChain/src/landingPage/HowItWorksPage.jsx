import { useIsMobile } from "./useIsMobile";

const ADMIN_STEPS = [
  { num: "01", title: "Connect Your Institution Wallet", desc: "Institutions connect their Phantom wallet to authenticate on EduChain. No account signup — your wallet is your identity." },
  { num: "02", title: "Fill the Certificate Form", desc: "Enter the student's wallet address, full name, course, grade, and certificate type. A live preview updates as you type." },
  { num: "03", title: "Issue to the Blockchain", desc: "Hit Issue Certificate. EduChain generates a unique hash, stores it on Solana, and the student receives it instantly." },
];

const STUDENT_STEPS = [
  { num: "01", title: "Connect Your Student Wallet", desc: "Students use Phantom or any Solana-compatible wallet to log in. Your wallet address becomes your academic identity." },
  { num: "02", title: "View Your Dashboard", desc: "All issued certificates appear automatically — with institution name, date, grade, and on-chain verification status." },
  { num: "03", title: "Share with Anyone", desc: "Share your certificate ID or QR code with employers. They verify it on-chain in seconds — no email needed." },
];

function StepCard({ num, title, desc, last }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "linear-gradient(135deg, #7C3AED, #6366F1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 12, color: "white",
          boxShadow: "0 0 18px rgba(124,58,237,0.45)", flexShrink: 0,
        }}>{num}</div>
        {!last && <div style={{ width: 1, flex: 1, minHeight: 28, background: "rgba(139,92,246,0.25)", margin: "6px 0" }}/>}
      </div>
      <div style={{ paddingBottom: last ? 0 : 24 }}>
        <h4 style={{ color: "white", fontWeight: 700, fontSize: 14.5, marginBottom: 5 }}>{title}</h4>
        <p style={{ color: "rgba(148,163,184,0.75)", fontSize: 13.5, lineHeight: 1.65 }}>{desc}</p>
      </div>
    </div>
  );
}

function SectionBadge({ label, color, iconPath }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "5px 12px", borderRadius: 8, marginBottom: 24,
      background: `rgba(${color},0.08)`, border: `1px solid rgba(${color},0.25)`,
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={`rgba(${color},1)`} strokeWidth="2">
        {iconPath}
      </svg>
      <span style={{ color: `rgba(${color},1)`, fontSize: 12, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

export default function HowItWorksPage({ onVerify }) {
  const isMobile = useIsMobile();

  return (
    <div style={{ width: "100%", padding: isMobile ? "32px 20px 32px" : "48px 72px 40px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 52 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999, marginBottom: 20,
            background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.26)",
          }}>
            <span style={{ color: "#A78BFA", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.06em" }}>HOW IT WORKS</span>
          </div>
          <h2 style={{ fontSize: isMobile ? 28 : 42, fontWeight: 900, color: "white", letterSpacing: "-1px", marginBottom: 12 }}>
            Simple for{" "}
            <span style={{ background: "linear-gradient(110deg, #A78BFA, #818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              everyone
            </span>
          </h2>
          <p style={{ color: "rgba(148,163,184,0.8)", fontSize: isMobile ? 14 : 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Whether you're issuing or receiving, the process takes minutes — not days.
          </p>
        </div>

        {/* Steps layout */}
        {isMobile ? (
          // Mobile: stacked
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <div>
              <SectionBadge label="For Institutions" color="124,58,237"
                iconPath={<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11"/>}/>
              {ADMIN_STEPS.map((s, i) => <StepCard key={i} {...s} last={i === ADMIN_STEPS.length - 1}/>)}
            </div>
            <div style={{ height: 1, background: "rgba(139,92,246,0.15)" }}/>
            <div>
              <SectionBadge label="For Students" color="74,222,128"
                iconPath={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>}/>
              {STUDENT_STEPS.map((s, i) => <StepCard key={i} {...s} last={i === STUDENT_STEPS.length - 1}/>)}
            </div>
          </div>
        ) : (
          // Desktop: side by side
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr" }}>
            <div style={{ paddingRight: 56 }}>
              <SectionBadge label="For Institutions" color="124,58,237"
                iconPath={<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11"/>}/>
              {ADMIN_STEPS.map((s, i) => <StepCard key={i} {...s} last={i === ADMIN_STEPS.length - 1}/>)}
            </div>
            <div style={{ background: "rgba(139,92,246,0.15)" }}/>
            <div style={{ paddingLeft: 56 }}>
              <SectionBadge label="For Students" color="74,222,128"
                iconPath={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>}/>
              {STUDENT_STEPS.map((s, i) => <StepCard key={i} {...s} last={i === STUDENT_STEPS.length - 1}/>)}
            </div>
          </div>
        )}

        {/* Public verifier callout */}
        <div style={{
          marginTop: 40, padding: isMobile ? "20px 18px" : "24px 32px", borderRadius: 16,
          background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)",
          display: "flex", flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center", gap: 16,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: "white", fontWeight: 700, fontSize: 14.5, marginBottom: 4 }}>Public Verification</h4>
            <p style={{ color: "rgba(148,163,184,0.75)", fontSize: 13.5, lineHeight: 1.6 }}>
              Anyone can verify a certificate by entering its ID or scanning the QR code. No wallet required.
            </p>
          </div>
          <button onClick={onVerify} style={{
            flexShrink: 0, padding: "10px 22px", borderRadius: 10, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #7C3AED, #6366F1)",
            color: "white", fontWeight: 700, fontSize: 13, fontFamily: "inherit",
            boxShadow: "0 0 18px rgba(124,58,237,0.4)",
            width: isMobile ? "100%" : "auto",
          }}>
            Try Verify
          </button>
        </div>
      </div>
    </div>
  );
}
