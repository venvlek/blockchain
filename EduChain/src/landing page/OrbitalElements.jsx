export function GraduationCap() {
  return (
    <svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="capG" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C084FC"/><stop offset="1" stopColor="#818CF8"/>
        </linearGradient>
        <filter id="capF">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g filter="url(#capF)">
        <polygon points="40,13 74,28 40,43 6,28" fill="url(#capG)"/>
        <polygon points="40,13 74,28 40,43 6,28" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        <path d="M6 28 L40 43 L74 28 L74 33 Q40 50 6 33 Z" fill="#4C1D95" opacity="0.85"/>
        <line x1="74" y1="28" x2="74" y2="54" stroke="rgba(196,181,253,0.7)" strokeWidth="2.2"/>
        <circle cx="74" cy="57" r="5.5" fill="url(#capG)" opacity="0.95"/>
        <line x1="71" y1="61" x2="68" y2="69" stroke="rgba(196,181,253,0.6)" strokeWidth="1.8"/>
        <line x1="74" y1="62" x2="74" y2="70" stroke="rgba(196,181,253,0.6)" strokeWidth="1.8"/>
        <line x1="77" y1="61" x2="80" y2="69" stroke="rgba(196,181,253,0.6)" strokeWidth="1.8"/>
        <line x1="40" y1="43" x2="40" y2="62" stroke="rgba(196,181,253,0.45)" strokeWidth="2.5"/>
        <ellipse cx="40" cy="62" rx="15" ry="5.5" fill="#4C1D95" stroke="rgba(139,92,246,0.5)" strokeWidth="1"/>
      </g>
    </svg>
  );
}

export function ShieldVerified() {
  return (
    <svg width="58" height="58" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shG" x1="0" y1="0" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ADE80"/><stop offset="1" stopColor="#22D3EE"/>
        </linearGradient>
        <filter id="shF">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g filter="url(#shF)">
        <path d="M35 8 L60 19 L60 38 Q60 56 35 65 Q10 56 10 38 L10 19 Z"
          fill="rgba(74,222,128,0.1)" stroke="url(#shG)" strokeWidth="2"/>
        <path d="M35 14 L54 23 L54 38 Q54 52 35 59 Q16 52 16 38 L16 23 Z"
          fill="rgba(74,222,128,0.07)"/>
        <path d="M24 37 L32 45 L48 27"
          stroke="url(#shG)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}

export function StarBadge() {
  return (
    <svg width="56" height="56" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stG" x1="0" y1="0" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A"/><stop offset="1" stopColor="#F59E0B"/>
        </linearGradient>
        <filter id="stF">
          <feGaussianBlur stdDeviation="4.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g filter="url(#stF)">
        <polygon
          points="35,7 41.5,26.5 63,26.5 46,39 52.5,59 35,47 17.5,59 24,39 7,26.5 28.5,26.5"
          fill="url(#stG)" stroke="rgba(251,191,36,0.35)" strokeWidth="1"/>
      </g>
    </svg>
  );
}

export function SolanaLogo() {
  return (
    <svg width="52" height="52" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="soG" x1="0" y1="0" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9945FF"/><stop offset="1" stopColor="#14F195"/>
        </linearGradient>
        <filter id="soF">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g filter="url(#soF)">
        <rect width="70" height="70" rx="18" fill="rgba(153,69,255,0.08)" stroke="url(#soG)" strokeWidth="1.5"/>
        <path d="M14 50 L48 50 Q53 50 55 46 L56 44 L22 44 Q17 44 15 48 Z" fill="url(#soG)"/>
        <path d="M14 37 L48 37 Q53 37 55 33 L56 31 L22 31 Q17 31 15 35 Z" fill="url(#soG)"/>
        <path d="M14 24 L48 24 Q53 24 55 28 L56 30 L22 30 Q17 30 15 26 Z" fill="url(#soG)" opacity="0.75"/>
      </g>
    </svg>
  );
}

export function ChainLink() {
  return (
    <svg width="50" height="50" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clG" x1="0" y1="0" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818CF8"/><stop offset="1" stopColor="#C084FC"/>
        </linearGradient>
        <filter id="clF">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g filter="url(#clF)">
        <path d="M20 30 Q20 16 32 16 Q44 16 44 30"
          stroke="url(#clG)" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <path d="M50 40 Q50 54 38 54 Q26 54 26 40"
          stroke="url(#clG)" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <line x1="28" y1="30" x2="42" y2="40"
          stroke="url(#clG)" strokeWidth="6" strokeLinecap="round"/>
      </g>
    </svg>
  );
}
