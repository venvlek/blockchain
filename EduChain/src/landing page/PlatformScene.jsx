import { useEffect, useRef } from "react";
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

      {/* Orbital items — bounce */}
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

      {/* ── ROTATING CARD */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        zIndex: 5,
        // Center the card: half of scaled card size
        marginTop: -(96 * scale),
        marginLeft: -(135 * scale),
        width: 270 * scale,
        height: 192 * scale,
      }}>
        {/* Scale wrapper */}
        <div style={{ transform: `scale(${scale})`, transformOrigin: "0 0", width: 270, height: 192 }}>
          {/* Rotation wrapper — rotates around card's own center */}
          <div style={{
            animation: "cardSpin 10s linear infinite",
            transformOrigin: "135px 96px",
            width: 270, height: 192,
          }}>
            <CertificateCard />
          </div>
        </div>
      </div>

      {/* ── 3D PLATFORM — perspective ellipse stack */}
      <div style={{
        position: "absolute",
        bottom: "8%", left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? 180 : 290,
        zIndex: 4,
        perspective: 600,
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", inset: "-8px", top: "auto", bottom: -8,
          height: 30, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.8) 0%, rgba(99,102,241,0.4) 45%, transparent 75%)",
          filter: "blur(14px)",
          animation: "platGlow 2.8s ease-in-out infinite",
        }}/>

        {/* Platform layers — stacked for 3D depth */}
        <svg
          width={isMobile ? 180 : 290}
          height={isMobile ? 60 : 90}
          viewBox="0 0 290 90"
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="pTop"  x1="0" y1="0" x2="290" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#7C3AED"/>
              <stop offset="50%"  stopColor="#6366F1"/>
              <stop offset="100%" stopColor="#4C1D95"/>
            </linearGradient>
            <linearGradient id="pSide" x1="0" y1="30" x2="0" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#3B1F7A"/>
              <stop offset="100%" stopColor="#1E1050"/>
            </linearGradient>
            <linearGradient id="pRing1" x1="0" y1="0" x2="290" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#9B5CF6"/>
              <stop offset="100%" stopColor="#7366F1"/>
            </linearGradient>
            <radialGradient id="pShine" cx="50%" cy="30%" r="60%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.3)"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>

          {/* Side face — gives 3D depth */}
          <path d="M3 21 Q3 38 145 45 Q287 38 287 21 L287 55 Q287 72 145 78 Q3 72 3 55 Z" fill="url(#pSide)"/>

          {/* Top face */}
          <ellipse cx="145" cy="21" rx="142" ry="19" fill="url(#pTop)"/>
          <ellipse cx="145" cy="21" rx="142" ry="19" fill="url(#pShine)"/>

          {/* Ring lines on top */}
          <ellipse cx="145" cy="21" rx="105" ry="13" fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="1"/>
          <ellipse cx="145" cy="21" rx="68"  ry="9"  fill="none" stroke="rgba(167,139,250,0.22)" strokeWidth="1"/>
          <ellipse cx="145" cy="21" rx="30"  ry="5"  fill="rgba(167,139,250,0.4)"/>

          {/* Top highlight */}
          <ellipse cx="145" cy="12" rx="142" ry="7" fill="rgba(255,255,255,0.08)"/>

          {/* Bottom edge of side */}
          <ellipse cx="145" cy="67" rx="142" ry="11" fill="rgba(30,16,80,0.9)" stroke="rgba(99,70,200,0.4)" strokeWidth="1"/>

          {/* Spinning ring around platform */}
          <ellipse cx="145" cy="21" rx="142" ry="19" fill="none" stroke="url(#pRing1)" strokeWidth="2" strokeDasharray="20 10" opacity="0.5"
            style={{ animation: "platSpin 4s linear infinite" }}/>
        </svg>
      </div>

      <style>{`
        @keyframes orbitSpin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes cardSpin {
          0%          { transform: rotateY(0deg);    filter: drop-shadow(0 0 32px rgba(124,58,237,0.65)) drop-shadow(0 22px 44px rgba(0,0,0,0.65)) brightness(1);   }
          25%         { transform: rotateY(90deg);   filter: drop-shadow(0 0 12px rgba(124,58,237,0.3))  drop-shadow(0 10px 20px rgba(0,0,0,0.4))  brightness(0.6); }
          50%         { transform: rotateY(180deg);  filter: drop-shadow(0 0 32px rgba(124,58,237,0.65)) drop-shadow(0 22px 44px rgba(0,0,0,0.65)) brightness(1);   }
          75%         { transform: rotateY(270deg);  filter: drop-shadow(0 0 12px rgba(124,58,237,0.3))  drop-shadow(0 10px 20px rgba(0,0,0,0.4))  brightness(0.6); }
          100%        { transform: rotateY(360deg);  filter: drop-shadow(0 0 32px rgba(124,58,237,0.65)) drop-shadow(0 22px 44px rgba(0,0,0,0.65)) brightness(1);   }
        }
        @keyframes platSpin {
          from { stroke-dashoffset: 0;   }
          to   { stroke-dashoffset: -90; }
        }
        @keyframes platGlow {
          0%, 100% { opacity: 0.7; transform: scaleX(1);   }
          50%       { opacity: 1;   transform: scaleX(1.1); }
        }
        @keyframes bounce0 {
          0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(-5deg); }
          50%       { transform: scale(${scale}) translateY(-18px) rotate(5deg);  }
        }
        @keyframes bounce1 {
          0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(4deg);  }
          50%       { transform: scale(${scale}) translateY(-14px) rotate(-4deg); }
        }
        @keyframes bounce2 {
          0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(-3deg); }
          50%       { transform: scale(${scale}) translateY(-22px) rotate(3deg);  }
        }
        @keyframes bounce3 {
          0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(6deg);  }
          50%       { transform: scale(${scale}) translateY(-16px) rotate(-6deg); }
        }
        @keyframes bounce4 {
          0%, 100% { transform: scale(${scale}) translateY(0px)   rotate(-4deg); }
          50%       { transform: scale(${scale}) translateY(-20px) rotate(4deg);  }
        }
      `}</style>
    </div>
  );
}
