import type { CSSProperties } from 'react';
import { Garland, Marigold, FlowerString } from './Flora';

export const Umbrella = ({ className = '', a = '#E8408A', b = '#F7B52D', pole = true }: { className?: string; a?: string; b?: string; pole?: boolean }) => (
  <svg viewBox="0 0 120 150" className={className} aria-hidden="true" focusable="false">
    {pole && <line x1="60" y1="46" x2="60" y2="150" stroke="#7A4A22" strokeWidth="3" />}
    <path d="M60 4l4 12H56z" fill="url(#epGold)" />
    <path d="M6 54C10 26 36 14 60 14s50 12 54 40z" fill={a} />
    {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M60 14C${50 - i * 8} 30 ${46 - i * 9} 44 ${i * 22 - 2} 54L${i * 22 + 22} 54C${i * 22 + 10} 44 ${66 + i * 2 - 8} 30 60 14z`} fill={i % 2 ? b : a} opacity=".95" />)}
    <path d="M4 54h112" stroke="url(#epGold)" strokeWidth="4" />
    {Array.from({ length: 12 }, (_, i) => <g key={i}><line x1={10 + i * 9.4} y1="56" x2={10 + i * 9.4} y2="64" stroke="#D5AD55" /><circle cx={10 + i * 9.4} cy="66" r="2.6" fill={i % 2 ? '#E8408A' : '#2FA29A'} /></g>)}
  </svg>
);

export const Peacock = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 160 220" className={className} aria-hidden="true" focusable="false">
    <g className="ep-sway" style={{ transformOrigin: '70px 150px' }}>
      {Array.from({ length: 11 }, (_, i) => { const a = -75 + i * 15; return <g key={i} transform={`rotate(${a} 70 150)`}><path d="M70 150C60 100 62 50 70 10c8 40 10 90 0 140z" fill="#1F8F7A" /><ellipse cx="70" cy="30" rx="9" ry="14" fill="#2B5FA8" /><ellipse cx="70" cy="30" rx="4.5" ry="8" fill="#3FB8A8" /><circle cx="70" cy="28" r="2.4" fill="#D5AD55" /></g>; })}
    </g>
    <ellipse cx="70" cy="170" rx="22" ry="34" fill="#1C5FA8" /><ellipse cx="70" cy="170" rx="12" ry="24" fill="#2BA3B5" />
    <circle cx="94" cy="124" r="11" fill="#1C5FA8" /><path d="M102 122l14 4-14 4z" fill="#D5AD55" /><path d="M92 114l-3-12M96 113l2-12" stroke="#1C5FA8" strokeWidth="2" /><circle cx="97" cy="122" r="2" fill="#fff" />
    <path d="M62 200l-4 20M78 200l2 20" stroke="#7A5A30" strokeWidth="3" />
  </svg>
);

export const Chhatri = ({ className = '', tone = '#F4ECDD' }: { className?: string; tone?: string }) => (
  <svg viewBox="0 0 120 150" className={className} aria-hidden="true" focusable="false">
    <path d="M60 4v14M52 24c0-10 16-10 16 0" stroke={tone} strokeWidth="3" fill="none" />
    <path d="M14 70C14 34 36 22 60 22s46 12 46 48z" fill={tone} stroke="#C9B58A" strokeWidth="1.5" />
    <path d="M10 70h100v8H10z" fill={tone} stroke="#C9B58A" strokeWidth="1.5" />
    {[22, 50, 78, 98].map((x) => <rect key={x} x={x} y="78" width="7" height="58" fill={tone} stroke="#C9B58A" strokeWidth="1" />)}
    <path d="M26 136V96a12 12 0 0 1 24 0v40M54 136V96a12 12 0 0 1 24 0v40" fill="#F3E1C7" opacity=".35" /><rect x="6" y="136" width="108" height="10" fill={tone} stroke="#C9B58A" />
  </svg>
);

export const Diya = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 60 60" className={className} aria-hidden="true" focusable="false">
    <ellipse cx="30" cy="30" rx="26" ry="14" fill="url(#epGlow)" className="ep-pulse" />
    <path className="ep-flame" d="M30 8c8 8 10 16 0 24-10-8-8-16 0-24z" fill="#FFB31F" /><path className="ep-flame" d="M30 16c4 5 5 9 0 14-5-5-4-9 0-14z" fill="#FFF0A0" />
    <path d="M8 36c0 10 10 16 22 16s22-6 22-16z" fill="url(#epGold)" stroke="#8A5E1E" strokeWidth="1.5" />
  </svg>
);

export const Kalash = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 120" className={className} aria-hidden="true" focusable="false">
    <path d="M40 2c10 8 12 20 0 28-12-8-10-20 0-28z" fill="url(#epMari)" /><ellipse cx="40" cy="28" rx="22" ry="8" fill="#2F6B2E" />
    {[-14, 0, 14].map((x) => <ellipse key={x} cx={40 + x} cy="26" rx="6" ry="14" fill="url(#epLeaf)" transform={`rotate(${x * 1.6} ${40 + x} 34)`} />)}
    <ellipse cx="40" cy="34" rx="22" ry="8" fill="url(#epGold)" />
    <path d="M22 38c-12 12-12 48 4 66h28c16-18 16-54 4-66z" fill="url(#epGold)" stroke="#8A5E1E" strokeWidth="1.4" />
    <path d="M26 56q14 8 28 0M24 74q16 10 32 0" stroke="#8E1B2E" strokeWidth="2" fill="none" /><ellipse cx="40" cy="108" rx="22" ry="8" fill="url(#epGold)" />
  </svg>
);

export const Thali = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 160 90" className={className} aria-hidden="true" focusable="false">
    <ellipse cx="80" cy="64" rx="76" ry="20" fill="url(#epGold)" stroke="#8A5E1E" strokeWidth="1.5" /><ellipse cx="80" cy="60" rx="60" ry="14" fill="#B58A32" opacity=".5" />
    <path d="M52 56c0-22 56-22 56 0z" fill="#F7C52D" /><path d="M52 56c4 10 52 10 56 0z" fill="url(#epGold)" />
    {[0, 1, 2, 3, 4].map((i) => <Marigold key={i} x={30 + i * 25} y={60 + (i % 2) * 5} r={9} yellow={i % 2 === 0} />)}
  </svg>
);

export const MarigoldPot = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 90 220" className={className} aria-hidden="true" focusable="false">
    <ellipse cx="45" cy="42" rx="40" ry="36" fill="#E2552B" stroke="#B83A1B" strokeWidth="2" /><ellipse cx="45" cy="42" rx="26" ry="22" fill="#8E1B2E" />
    {Array.from({ length: 9 }, (_, i) => <Marigold key={i} x={45} y={34 + i * 17} r={9} yellow={i % 2 === 1} />)}
    <path d="M18 70l-6 150M72 70l6 150" stroke="#4A2A18" strokeWidth="4" />
  </svg>
);

/** Henna-style line motif; `.ep-draw` paths are drawn on scroll. */
export const Henna = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 200 320" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" focusable="false">
    <g className="ep-draw">
      <path d="M100 8v300" />
      <path d="M100 40c30-8 52 8 44 30-6 16-30 14-30-2 0-12 16-14 18-4" /><path d="M100 40c-30-8-52 8-44 30 6 16 30 14 30-2 0-12-16-14-18-4" />
      <path d="M100 110c40-10 66 14 56 42-8 20-38 16-36-4 2-12 18-14 20-4" /><path d="M100 110c-40-10-66 14-56 42 8 20 38 16 36-4-2-12-18-14-20-4" />
      <path d="M100 190c26-4 46 12 38 30-6 14-26 10-26-2" /><path d="M100 190c-26-4-46 12-38 30 6 14 26 10 26-2" />
      <path d="M100 250c14 0 24 10 20 22M100 250c-14 0-24 10-20 22" />
      {[56, 84, 130, 168, 206, 236, 280].map((y, i) => <circle key={y} cx={i % 2 ? 112 : 88} cy={y} r="2.4" />)}
      <path d="M60 130c-10 8-14 20-6 30M140 130c10 8 14 20 6 30" /><path d="M72 90q-14 10-8 24M128 90q14 10 8 24" />
    </g>
  </svg>
);

export const Dholak = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 170 90" className={className} aria-hidden="true" focusable="false">
    <path d="M14 20c0-8 30-12 70-12s70 4 70 12v50c0 8-30 12-70 12S14 78 14 70z" fill="#A04A1E" stroke="#5E2A10" strokeWidth="2" />
    <ellipse cx="14" cy="45" rx="10" ry="30" fill="#F1DFC0" stroke="#5E2A10" strokeWidth="2" /><ellipse cx="156" cy="45" rx="10" ry="30" fill="#F1DFC0" stroke="#5E2A10" strokeWidth="2" />
    <path d="M26 12L50 78M54 10L74 80M84 8L96 82M114 10L120 80M142 12L140 78" stroke="#D5AD55" strokeWidth="2" />
  </svg>
);

export const Sitar = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 70 260" className={className} aria-hidden="true" focusable="false">
    <ellipse cx="35" cy="210" rx="30" ry="40" fill="#A04A1E" stroke="#5E2A10" strokeWidth="2" /><ellipse cx="35" cy="214" rx="16" ry="22" fill="#F1DFC0" opacity=".4" />
    <rect x="29" y="30" width="12" height="150" fill="#6E3416" /><path d="M30 8h10v26H30z" fill="#6E3416" /><circle cx="28" cy="14" r="3" fill="#D5AD55" /><circle cx="42" cy="22" r="3" fill="#D5AD55" />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1="29" y1={50 + i * 14} x2="41" y2={50 + i * 14} stroke="#D5AD55" strokeWidth="1.5" />)}
    <path d="M33 34v140M37 34v140" stroke="#F1DFC0" strokeWidth=".8" />
  </svg>
);

export const Drape = ({ className = '', a = '#650D25', b = '#350719' }: { className?: string; a?: string; b?: string }) => (
  <svg viewBox="0 0 200 400" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false">
    <defs><linearGradient id="epDr" x1="0" x2="1"><stop offset="0" stopColor={b} /><stop offset=".3" stopColor={a} /><stop offset=".55" stopColor={b} /><stop offset=".8" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
    <path d="M0 0h200v300C170 340 150 400 100 400S30 340 0 300z" fill="url(#epDr)" /><path d="M0 0h200v24H0z" fill="url(#epGold)" />
    {[30, 66, 100, 134, 170].map((x) => <path key={x} d={`M${x} 24C${x - 8} 150 ${x + 8} 250 ${x} 360`} stroke="#000" opacity=".18" fill="none" strokeWidth="3" />)}
  </svg>
);

export const Chandelier = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 120 220" className={className} aria-hidden="true" focusable="false">
    <line x1="60" y1="0" x2="60" y2="60" stroke="#D5AD55" strokeWidth="2" />
    <path d="M60 58c-34 0-56 20-56 50h112c0-30-22-50-56-50z" fill="url(#epGold)" opacity=".9" />
    {[14, 30, 46, 60, 74, 90, 106].map((x, i) => <g key={x}><line x1={x} y1="108" x2={x} y2={140 + (i % 3) * 24} stroke="#F1D58B" /><path d={`M${x} ${140 + (i % 3) * 24}l-5 10 5 10 5-10z`} fill="#FFF6DC" stroke="#D5AD55" /></g>)}
    <circle cx="60" cy="120" r="26" fill="url(#epGlow)" className="ep-pulse" />
  </svg>
);

/** Layered palace skyline (domes, chhatris, arched windows). Fill follows currentColor. */
export const PalaceSkyline = ({ className = '', style }: { className?: string; style?: CSSProperties }) => (
  <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax meet" className={className} style={style} aria-hidden="true" focusable="false">
    <g fill="currentColor">
      <path d="M420 120c0-50 40-76 80-100 40 24 80 50 80 100z" /><path d="M496 0h8v26h-8z" /><rect x="410" y="120" width="180" height="180" />
      {[60, 170, 700, 800, 890].map((x) => <g key={x}><path d={`M${x} 190c0-26 22-40 44-50 22 10 44 24 44 50z`} /><rect x={x - 6} y="190" width="100" height="110" /></g>)}
      <rect x="0" y="236" width="1000" height="64" />
      {[250, 330, 640, 720].map((x) => <g key={x}><path d={`M${x} 168c0-18 14-30 28-38 14 8 28 20 28 38z`} /><rect x={x - 4} y="168" width="64" height="132" /></g>)}
    </g>
    <g fill="var(--win, #350719)" opacity=".85">
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${440 + i * 30} 300v-70a12 12 0 0 1 24 0v70z`} />)}
      {[76, 186, 716, 816, 906].map((x) => <path key={x} d={`M${x} 300v-60a10 10 0 0 1 20 0v60zM${x + 36} 300v-60a10 10 0 0 1 20 0v60z`} />)}
    </g>
  </svg>
);

/** Row of chain-hung golden bells (for mandap valance). */
export const Bells = ({ className = '', n = 7 }: { className?: string; n?: number }) => (
  <svg viewBox={`0 0 ${n * 40} 70`} className={className} aria-hidden="true" focusable="false">
    {Array.from({ length: n }, (_, i) => <g key={i} className="ep-sway" style={{ transformOrigin: `${i * 40 + 20}px 0`, animationDelay: `${i * 0.25}s` }}><line x1={i * 40 + 20} y1="0" x2={i * 40 + 20} y2="26" stroke="#D5AD55" /><path d={`M${i * 40 + 10} 52c0-14 4-26 10-26s10 12 10 26z`} fill="url(#epGold)" stroke="#8A5E1E" /><circle cx={i * 40 + 20} cy="56" r="3" fill="#8A5E1E" /></g>)}
  </svg>
);

export { Garland, FlowerString };
