import type { CSSProperties } from 'react';

/** Vintage blue automobile, front view, illustrated in SVG (transparent background). */
export default function Car({ className, style }: { className?: string; style?: CSSProperties }) {
  const slats = Array.from({ length: 14 });
  return (
    <svg viewBox="0 0 600 420" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="car-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc3d4" />
          <stop offset="1" stopColor="#2f7f98" />
        </linearGradient>
        <linearGradient id="car-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c5e6ee" />
          <stop offset="1" stopColor="#5f9eb2" />
        </linearGradient>
        <radialGradient id="car-h" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#fff6c8" />
          <stop offset="0.6" stopColor="#e5c15c" />
          <stop offset="1" stopColor="#8a6a1c" />
        </radialGradient>
      </defs>
      {/* wheels */}
      <rect x="70" y="330" width="70" height="80" rx="14" fill="#14181c" />
      <rect x="460" y="330" width="70" height="80" rx="14" fill="#14181c" />
      {/* windscreen frame + glass */}
      <path d="M150 30 H450 L470 150 H130 Z" fill="#3a7d94" />
      <path d="M166 44 H294 V140 H148 Z M306 44 H434 L452 140 H306 Z" fill="url(#car-g)" opacity=".85" />
      <rect x="292" y="40" width="16" height="110" fill="#2f7f98" />
      {/* body */}
      <path d="M95 150 H505 Q560 190 556 290 Q550 350 500 350 H100 Q50 350 44 290 Q40 190 95 150Z" fill="url(#car-b)" />
      {/* fenders */}
      <path d="M40 270 Q40 170 130 160 Q150 230 150 330 Q70 350 40 270Z" fill="#5fb0c4" opacity=".9" />
      <path d="M560 270 Q560 170 470 160 Q450 230 450 330 Q530 350 560 270Z" fill="#5fb0c4" opacity=".9" />
      {/* grille */}
      <rect x="208" y="180" width="184" height="140" rx="12" fill="#27414a" />
      {slats.map((_, i) => (
        <rect key={i} x={216 + i * 12.6} y="186" width="5" height="128" fill="#a9c9d2" />
      ))}
      <rect x="296" y="180" width="8" height="140" fill="#27414a" />
      {/* headlights */}
      {[148, 452].map((x) => (
        <g key={x}>
          <circle cx={x} cy="225" r="40" fill="#6b5a2a" />
          <circle cx={x} cy="225" r="34" fill="url(#car-h)" />
        </g>
      ))}
      {/* bumper */}
      <rect x="40" y="340" width="520" height="16" rx="8" fill="#d9e4e6" />
      <rect x="40" y="352" width="520" height="5" rx="2.5" fill="#7a8d93" />
      <rect x="283" y="356" width="34" height="14" fill="#c9d5d8" />
    </svg>
  );
}
