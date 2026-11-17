import type { CSSProperties } from 'react';

interface Props { size: number; blur?: number; style?: CSSProperties; className?: string; flickerDelay?: number }

/** Sky lantern: tapered paper body, bamboo rim, flame cup, warm inner glow with a flicker. */
export default function Lantern({ size, blur = 0, style, className, flickerDelay = 0 }: Props) {
  const glow = blur ? `blur(${blur}px)` : `drop-shadow(0 0 ${Math.round(size * 0.35)}px rgba(255,170,60,.6))`;
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 100 150"
      className={className}
      style={{ filter: glow, ['--fd' as string]: `${flickerDelay}s`, willChange: 'transform', ...style }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ln-body" x1="0" x2="1">
          <stop offset="0" stopColor="#d2661a" />
          <stop offset=".3" stopColor="#ffb13b" />
          <stop offset=".52" stopColor="#ffd98a" />
          <stop offset=".78" stopColor="#f59a2a" />
          <stop offset="1" stopColor="#bd5a0a" />
        </linearGradient>
        <radialGradient id="ln-glow" cx=".5" cy=".62" r=".5">
          <stop offset="0" stopColor="#fff8d6" stopOpacity=".95" />
          <stop offset="1" stopColor="#ffd37a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M20 26 Q50 6 80 26 L88 116 Q50 132 12 116 Z" fill="url(#ln-body)" />
      {[28, 39, 50, 61, 72].map((x) => (
        <path key={x} d={`M${x} 20 L${x + (x - 50) * 0.16} 124`} stroke="#9c4a0a" strokeOpacity=".22" strokeWidth="1.3" />
      ))}
      <ellipse cx="50" cy="84" rx="28" ry="36" fill="url(#ln-glow)" className="lantern-flame" />
      <path d="M20 26 Q50 6 80 26 Q50 34 20 26Z" fill="#8f4a10" opacity=".75" />
      <path d="M12 116 Q50 132 88 116 L86 122 Q50 138 14 122Z" fill="#6e360a" />
      <rect x="44" y="122" width="12" height="9" fill="#4d2404" />
      <ellipse cx="50" cy="126" rx="5" ry="7" fill="#ffe59a" className="lantern-flame" />
    </svg>
  );
}
