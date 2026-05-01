export default function CertificateCard() {
  return (
    <svg width="270" height="192" viewBox="0 0 270 192" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cBg"     x1="0" y1="0" x2="270" y2="192" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#1E1045"/><stop offset="100%" stopColor="#0D0B2A"/></linearGradient>
        <linearGradient id="cHeader" x1="0" y1="0" x2="270" y2="54"  gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#4C1D95"/><stop offset="100%" stopColor="#312E81"/></linearGradient>
        <linearGradient id="cBorder" x1="0" y1="0" x2="270" y2="192" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#8B5CF6"/><stop offset="50%" stopColor="#6366F1"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient>
        <linearGradient id="cLogoG"  x1="14" y1="12" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#A78BFA"/><stop offset="1" stopColor="#6366F1"/></linearGradient>
        <linearGradient id="cGrade"  x1="78" y1="118" x2="116" y2="136" gradientUnits="userSpaceOnUse"><stop stopColor="#7C3AED"/><stop offset="1" stopColor="#6366F1"/></linearGradient>
        <linearGradient id="cBottom" x1="0" y1="175" x2="270" y2="192" gradientUnits="userSpaceOnUse"><stop stopColor="#4C1D95"/><stop offset="1" stopColor="#312E81"/></linearGradient>
        <linearGradient id="cSeal"   x1="155" y1="72" x2="185" y2="118" gradientUnits="userSpaceOnUse"><stop stopColor="#8B5CF6" stopOpacity="0.25"/><stop offset="1" stopColor="#6366F1" stopOpacity="0.1"/></linearGradient>
        <linearGradient id="cShimmer" x1="0" y1="0" x2="270" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="transparent"/><stop offset="40%" stopColor="white"/><stop offset="60%" stopColor="white"/><stop offset="100%" stopColor="transparent"/></linearGradient>
        <filter id="cGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      {/* Card body */}
      <rect width="270" height="192" rx="16" fill="url(#cBg)"/>
      <rect x="0.75" y="0.75" width="268.5" height="190.5" rx="15.5" stroke="url(#cBorder)" strokeWidth="1.5"/>

      {/* Header band */}
      <path d="M0 16 Q0 0 16 0 H254 Q270 0 270 16 V54 H0 Z" fill="url(#cHeader)"/>
      <path d="M0 16 Q0 0 16 0 H254 Q270 0 270 16 V38 H0 Z" fill="url(#cShimmer)" opacity="0.08"/>

      {/* Logo */}
      <circle cx="27" cy="27" r="15" fill="url(#cLogoG)" filter="url(#cGlow)"/>
      <path d="M21 27l5 5 9-9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>

      {/* EduChain wordmark */}
      <text x="48" y="23" fontFamily="'Sora',sans-serif" fontSize="11" fontWeight="800" fill="white">EduChain</text>
      <text x="48" y="36" fontFamily="'Sora',sans-serif" fontSize="7.5" fill="rgba(196,181,253,0.8)">Academic Certificate</text>

      {/* Verified pill */}
      <rect x="196" y="14" width="60" height="20" rx="10" fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.45)" strokeWidth="1"/>
      <circle cx="209" cy="24" r="3.5" fill="#4ADE80"/>
      <text x="215" y="27.5" fontFamily="'Sora',sans-serif" fontSize="7.5" fontWeight="700" fill="#4ADE80">VERIFIED</text>

      {/* Separator */}
      <line x1="20" y1="62" x2="250" y2="62" stroke="rgba(139,92,246,0.25)" strokeWidth="1"/>

      {/* Avatar placeholder circle */}
      <circle cx="46" cy="96" r="23" fill="rgba(124,58,237,0.2)" stroke="rgba(139,92,246,0.35)" strokeWidth="1.5"/>
      <circle cx="46" cy="89" r="9"  fill="rgba(167,139,250,0.35)"/>
      <ellipse cx="46" cy="109" rx="14" ry="8" fill="rgba(167,139,250,0.25)"/>

      {/* Name — John Doe */}
      <text x="80" y="82" fontFamily="'Sora',sans-serif" fontSize="13" fontWeight="800" fill="white">John Doe</text>

      {/* Placeholder lines for course / institution */}
      <rect x="80" y="88"  width="110" height="7" rx="3.5" fill="rgba(167,139,250,0.3)"/>
      <rect x="80" y="100" width="80"  height="6" rx="3"   fill="rgba(167,139,250,0.18)"/>

      {/* Grade badge */}
      <rect x="80" y="112" width="38" height="15" rx="7.5" fill="url(#cGrade)"/>
      <text x="99" y="123" fontFamily="'Sora',sans-serif" fontSize="7.5" fontWeight="700" fill="white" textAnchor="middle">Grade A</text>

      {/* Seal */}
      <circle cx="200" cy="96" r="34" fill="none" stroke="rgba(139,92,246,0.2)"  strokeWidth="1.5" strokeDasharray="4 3"/>
      <circle cx="200" cy="96" r="26" fill="url(#cSeal)"                          stroke="rgba(139,92,246,0.35)" strokeWidth="1"/>
      <text x="200" y="91"  fontFamily="'Sora',sans-serif" fontSize="7" fontWeight="700" fill="rgba(167,139,250,0.95)" textAnchor="middle">OFFICIAL</text>
      <text x="200" y="102" fontFamily="'Sora',sans-serif" fontSize="7" fontWeight="700" fill="rgba(167,139,250,0.95)" textAnchor="middle">SEAL</text>
      <circle cx="200" cy="96" r="5" fill="rgba(139,92,246,0.6)"/>

      {/* Separator */}
      <line x1="20" y1="138" x2="250" y2="138" stroke="rgba(139,92,246,0.2)" strokeWidth="1"/>

      {/* Placeholder lines bottom */}
      <rect x="20" y="148" width="140" height="6" rx="3" fill="rgba(167,139,250,0.15)"/>
      <rect x="20" y="159" width="90"  height="5" rx="2.5" fill="rgba(167,139,250,0.1)"/>

      {/* Mini QR */}
      <g transform="translate(220,143)">
        {[[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]].map((row, r) =>
          row.map((cell, c) => cell
            ? <rect key={`${r}-${c}`} x={c * 4} y={r * 4} width="3.2" height="3.2" rx="0.6" fill="rgba(167,139,250,0.75)"/>
            : null
          )
        )}
      </g>

      {/* Bottom bar */}
      <path d="M0 176 H270 V184 Q270 192 262 192 H8 Q0 192 0 184 Z" fill="url(#cBottom)" opacity="0.6"/>
      <text x="135" y="186" fontFamily="'Sora',sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.35)" textAnchor="middle">
        Secured on Solana Blockchain · 2025
      </text>
    </svg>
  );
}
