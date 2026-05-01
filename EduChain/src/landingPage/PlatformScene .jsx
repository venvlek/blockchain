import CertificateCard from "./CertificateCard";
import { GraduationCap, ShieldVerified, StarBadge, SolanaLogo, ChainLink } from "./OrbitalElements";
import { useIsMobile } from "./useIsMobile";

const ORBITALS = [
  { el: <GraduationCap />, top: "0%",  left: "50%", mt: -34, ml: -34, anim: "bounce0", dur: "3.2s", delay: "0s"   },
  { el: <ShieldVerified/>, top: "28%", left: "90%", mt: -29, ml: -29, anim: "bounce1", dur: "2.8s", delay: "0.5s" },
  { el: <StarBadge    />,  top: "72%", left: "82%", mt: -28, ml: -28, anim: "bounce2", dur: "3.6s", delay: "0.9s" },
  { el: <SolanaLogo  />,  top: "72%", left: "18%", mt: -26, ml: -26, anim: "bounce3", dur: "2.5s", delay: "0.3s" },
  { el: <ChainLink   />,  top: "28%", left: "10%", mt: -25, ml: -25, anim: "bounce4", dur: "3.0s", delay: "0.7s" },
];

export default function PlatformScene() {
  const isMobile = useIsMobile();
  const size = isMobile ? 280 : 460;
  const scale = isMobile ? 0.6 : 1;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>

      {/* Atmospheric glow */}
      <div style={{
        position: "absolute", inset: "-20px", borderRadius: "50%",
        background: "radial-gradient(ellipse at 50% 60%, rgba(124,58,237,0.3) 0%, rgba(99,102,241,0.1) 50%, transparent 75%)",
        filter: "blur(35px)", pointerEvents: "none",
      }}/>

      {/* Dashed orbit ring */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: size * 0.85, height: size * 0.85,
        marginLeft: -(size * 0.85) / 2, marginTop: -(size * 0.85) / 2,
        borderRadius: "50%",
        border: "1.5px dashed rgba(139,92,246,0.18)",
        animation: "orbitSpin 60s linear infinite",
        pointerEvents: "none",
      }}/>

      {/* Inner ring */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: size * 0.65, height: size * 0.65,
        marginLeft: -(size * 0.65) / 2, marginTop: -(size * 0.65) / 2,
        borderRadius: "50%",
        border: "1px solid rgba(139,92,246,0.08)",
        pointerEvents: "none",
      }}/>

      {/* Orbital items — hidden on very small screens, shown scaled on mobile */}
      {ORBITALS.map((item, i) => (
        <div key={i} style={{
          position: "absolute",
          top: item.top, left: item.left,
          marginTop: item.mt * scale, marginLeft: item.ml * scale,
          animation: `${item.anim} ${item.dur} ease-in-out ${item.delay} infinite`,
          filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.55))",
          zIndex: i < 2 ? 6 : 2,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}>
          {item.el}
        </div>
      ))}

      {/* Certificate card */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        marginTop: -96 * scale, marginLeft: -135 * scale,
        zIndex: 5,
        filter: "drop-shadow(0 0 32px rgba(124,58,237,0.65)) drop-shadow(0 22px 44px rgba(0,0,0,0.65))",
        animation: "floatCard 3.8s ease-in-out infinite",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}>
        <CertificateCard />
      </div>

      {/* Platform ellipse */}
      <div style={{
        position: "absolute",
        bottom: "8%", left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? 180 : 290,
        height: isMobile ? 26 : 42,
        zIndex: 4,
      }}>
        <div style={{
          position: "absolute", inset: "-8px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.7) 0%, rgba(99,102,241,0.3) 45%, transparent 75%)",
          filter: "blur(16px)",
          animation: "platGlow 2.8s ease-in-out infinite",
        }}/>
        <svg
          width={isMobile ? 180 : 290}
          height={isMobile ? 26 : 42}
          viewBox="0 0 290 42"
          style={{ display: "block", animation: "platSpin 10s linear infinite" }}
        >
          <defs>
            <linearGradient id="pG" x1="0" y1="0" x2="290" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#7C3AED"/>
              <stop offset="50%"  stopColor="#6366F1"/>
              <stop offset="100%" stopColor="#4C1D95"/>
            </linearGradient>
            <radialGradient id="pShine" cx="50%" cy="25%" r="65%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.28)"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
          <ellipse cx="145" cy="21" rx="143" ry="19" fill="url(#pG)"/>
          <ellipse cx="145" cy="21" rx="143" ry="19" fill="url(#pShine)"/>
          <ellipse cx="145" cy="21" rx="105" ry="12" fill="none" stroke="rgba(167,139,250,0.28)" strokeWidth="1"/>
          <ellipse cx="145" cy="21" rx="65"  ry="8"  fill="none" stroke="rgba(167,139,250,0.2)"  strokeWidth="1"/>
          <ellipse cx="145" cy="21" rx="25"  ry="4"  fill="rgba(167,139,250,0.35)"/>
          <ellipse cx="145" cy="12" rx="143" ry="6"  fill="rgba(255,255,255,0.07)"/>
        </svg>
      </div>

      <style>{`
        @keyframes orbitSpin  { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes floatCard  {
          0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(-1.2deg); }
          50%       { transform: scale(${scale}) translateY(-20px)  rotate(1.2deg);  }
        }
        @keyframes platSpin   { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        @keyframes platGlow   { 0%, 100% { opacity: 0.7; transform: scaleX(1); } 50% { opacity: 1; transform: scaleX(1.1); } }
        @keyframes bounce0 { 0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(-5deg); } 50% { transform: scale(${scale}) translateY(-18px) rotate(5deg);  } }
        @keyframes bounce1 { 0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(4deg);  } 50% { transform: scale(${scale}) translateY(-14px) rotate(-4deg); } }
        @keyframes bounce2 { 0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(-3deg); } 50% { transform: scale(${scale}) translateY(-22px) rotate(3deg);  } }
        @keyframes bounce3 { 0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(6deg);  } 50% { transform: scale(${scale}) translateY(-16px) rotate(-6deg); } }
        @keyframes bounce4 { 0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(-4deg); } 50% { transform: scale(${scale}) translateY(-20px) rotate(4deg);  } }
      `}</style>
    </div>
  );
}
