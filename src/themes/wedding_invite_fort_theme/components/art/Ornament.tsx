import type { CSSProperties } from 'react';

/** Mandala-style gold emblem; optional centre glyph. */
export function Mandala({ size = 160, glyph, className, style }: { size?: number; glyph?: string; className?: string; style?: CSSProperties }) {
  const petals = Array.from({ length: 16 });
  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" className={className} style={style} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        {petals.map((_, i) => (
          <path key={i} transform={`rotate(${(360 / 16) * i})`} d="M0 -92 Q10 -70 0 -52 Q-10 -70 0 -92Z" />
        ))}
        {petals.map((_, i) => (
          <circle key={`d${i}`} transform={`rotate(${(360 / 16) * i + 11.25})`} cx="0" cy="-60" r="2.2" fill="currentColor" />
        ))}
        <circle r="44" />
        <circle r="40" strokeDasharray="2 4" />
        <circle r="96" strokeOpacity=".5" />
      </g>
      {glyph && (
        <text textAnchor="middle" dominantBaseline="central" fontSize="44" fill="currentColor" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>{glyph}</text>
      )}
    </svg>
  );
}

export function Divider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 20" className={`w-40 mx-auto ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 10 H96 M144 10 H240" />
      <path d="M120 2 L128 10 L120 18 L112 10Z" fill="currentColor" />
      <circle cx="102" cy="10" r="2" fill="currentColor" />
      <circle cx="138" cy="10" r="2" fill="currentColor" />
    </svg>
  );
}

/** Decorative corner flourish for the invitation border. */
export function Corner({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" className={className} style={style} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 78 V10 Q2 2 10 2 H78" />
      <path d="M12 78 V20 Q12 12 20 12 H78" strokeOpacity=".5" />
      <circle cx="22" cy="22" r="4" fill="currentColor" />
      <path d="M22 30 Q36 36 30 50 M30 22 Q36 36 50 30" />
    </svg>
  );
}

export function Marigold({ size = 120, className, style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" className={className} style={style} aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <ellipse key={i} transform={`rotate(${i * 20})`} cx="0" cy="-30" rx="9" ry="18" fill={i % 2 ? '#f0a41e' : '#e8861a'} opacity=".92" />
      ))}
      <circle r="14" fill="#c4630f" />
    </svg>
  );
}
