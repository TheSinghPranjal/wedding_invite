import type { CSSProperties } from 'react';
import { rng } from '../lib/rng';
import { Leaf } from './Orbit';

type P = { className?: string; style?: CSSProperties };

/** Rosette of overlapping scale-leaves (the dark-green clustered foliage in the palace-garden illustrations). */
export function ScaleCluster({ x, y, r, tone = 'forest' }: { x: number; y: number; r: number; tone?: 'forest' | 'sage' | 'leaf' }) {
  const fill = tone === 'forest' ? 'url(#epForest)' : tone === 'sage' ? 'url(#epSage)' : 'url(#epLeaf)';
  return (
    <g transform={`translate(${x} ${y})`}>
      {[1, 0.7, 0.42].map((k, j) => Array.from({ length: 10 - j * 2 }, (_, i) => <path key={`${j}-${i}`} transform={`rotate(${(i * 360) / (10 - j * 2) + j * 18}) translate(0 ${-r * k * 0.5})`} d={`M0 ${-r * 0.32}C${r * 0.26} ${-r * 0.2} ${r * 0.26} ${r * 0.2} 0 ${r * 0.32}C${-r * 0.26} ${r * 0.2} ${-r * 0.26} ${-r * 0.2} 0 ${-r * 0.32}Z`} fill={fill} stroke={tone === 'forest' ? '#A8C690' : '#244B36'} strokeWidth={r * 0.015} opacity={1} />))}
    </g>
  );
}

/** Overhanging dark-green leaf canopy for the top-left corner. */
export function LeafCanopy({ className, style }: P) {
  const r = rng(12);
  return (
    <svg viewBox="0 0 320 170" className={className} style={style} aria-hidden="true" focusable="false">
      <g className="ep-sway" style={{ transformOrigin: '0 0' }}>
        {[[40, 20, 56], [112, 14, 50], [178, 26, 46], [250, 12, 40], [76, 70, 44], [150, 74, 40], [214, 70, 30], [28, 110, 36], [110, 120, 28]].map(([x, y, s], i) => <ScaleCluster key={i} x={x} y={y} r={s + r() * 6} tone={i % 4 === 3 ? 'leaf' : 'forest'} />)}
      </g>
    </svg>
  );
}

/** Row of dark-green shrubs for the bottom edge. */
export function ShrubRow({ className, style }: P) {
  const r = rng(4);
  return (
    <svg viewBox="0 0 400 110" preserveAspectRatio="xMidYMax slice" className={className} style={style} aria-hidden="true" focusable="false">
      {Array.from({ length: 9 }, (_, i) => <ScaleCluster key={i} x={20 + i * 45} y={78 + (i % 2) * 10} r={34 + r() * 14} tone={i % 3 === 1 ? 'sage' : 'forest'} />)}
      {Array.from({ length: 6 }, (_, i) => <circle key={`f${i}`} cx={30 + r() * 340} cy={70 + r() * 30} r="3" fill="#E6A9B0" />)}
    </svg>
  );
}

/** Coconut/date palm. */
export function Palm({ className, style }: P) {
  return (
    <svg viewBox="0 0 160 260" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M78 250C80 200 82 160 80 110C80 100 84 96 84 90" stroke="#7A5A3A" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g className="ep-sway" style={{ transformOrigin: '84px 96px' }}>
        {[-100, -70, -40, -10, 20, 50, 80, 110].map((a, i) => <g key={a} transform={`translate(84 96) rotate(${a})`}><path d="M0 0C20-26 54-30 84 0" stroke="#4E7A4A" strokeWidth="2" fill="none" />{Array.from({ length: 10 }, (_, k) => <path key={k} d={`M${8 + k * 7} ${-8 - Math.sin(k / 3) * 14}l${2} 18`} stroke={i % 2 ? '#5E8A52' : '#3E6A3E'} strokeWidth="3" strokeLinecap="round" />)}</g>)}
      </g>
    </svg>
  );
}

export function BananaLeaves({ className, style }: P) {
  return (
    <svg viewBox="0 0 160 260" className={className} style={style} aria-hidden="true" focusable="false">
      <g className="ep-sway" style={{ transformOrigin: '20px 260px' }}>
        {[[-30, 1], [0, 1.1], [30, 0.9]].map(([a, k], i) => <g key={i} transform={`translate(30 260) rotate(${a})`}><path d={`M0 0C-22 -${90 * k} -10 -${190 * k} 10 -${230 * k}C40 -${180 * k} 38 -${80 * k} 0 0Z`} fill="url(#epBanana)" stroke="#5C7F4E" strokeWidth="1" /><path d={`M0 0C4 -${90 * k} 8 -${160 * k} 10 -${226 * k}`} stroke="#E6EADB" strokeWidth="1.6" fill="none" opacity=".8" /></g>)}
      </g>
    </svg>
  );
}

/** Pink lotus with leaf. */
export function Lotus({ className, style, bud = false }: P & { bud?: boolean }) {
  return (
    <svg viewBox="0 0 120 110" className={className} style={style} aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="98" rx="58" ry="10" fill="url(#epLeaf)" opacity=".95" />
      {(bud ? [-18, 0, 18] : [-64, -38, -14, 14, 38, 64]).map((a, i) => <path key={i} d={`M60 92C44 74 46 38 60 14C74 38 76 74 60 92Z`} transform={`rotate(${a} 60 92)`} fill="url(#epLotus)" stroke="#C97D8C" strokeWidth=".8" opacity={0.95} />)}
      <circle cx="60" cy="78" r="5" fill="#F0C46A" />
    </svg>
  );
}

/** Brown flowering branch with small leaves; grows from the top-left, mirror for the right. */
export function Branch({ className, style }: P) {
  const r = rng(21);
  const stems = [[0, 14, 150, 70], [40, 38, 180, 130], [90, 52, 250, 30], [130, 60, 200, 120], [160, 64, 270, 80]];
  return (
    <svg viewBox="0 0 300 200" className={className} style={style} aria-hidden="true" focusable="false">
      <g className="ep-sway" style={{ transformOrigin: '0 0' }}>
        <path d="M0 10C60 30 110 40 170 60C220 76 260 70 296 40" stroke="#6B4A3A" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        {stems.map(([x0, y0, x1, y1], i) => <path key={i} d={`M${x0 + 20} ${y0}Q${(x0 + x1) / 2} ${y1 - 30} ${x1} ${y1}`} stroke="#7A5A48" strokeWidth="1.6" fill="none" />)}
        {Array.from({ length: 46 }, (_, i) => <Leaf key={i} x={10 + r() * 280} y={10 + r() * 150} len={14 + r() * 12} rot={r() * 360} fill={i % 3 ? 'url(#epLeaf)' : 'url(#epSage)'} />)}
      </g>
    </svg>
  );
}

/** Hanging leaf strings for the ivory invitation top. */
export function HangingLeaves({ className, style }: P) {
  const r = rng(33);
  return (
    <svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMin slice" className={className} style={style} aria-hidden="true" focusable="false">
      {[40, 100, 160, 240, 300, 360].map((x, i) => (
        <g key={x} className="ep-sway" style={{ transformOrigin: `${x}px 0`, animationDelay: `${i * 0.4}s` }}>
          <line x1={x} y1="0" x2={x} y2={50 + r() * 70} stroke="#8AA070" strokeWidth="1" />
          {Array.from({ length: 6 }, (_, k) => <Leaf key={k} x={x} y={10 + k * 18} len={16} rot={k % 2 ? 60 : 120} fill="url(#epLeaf)" />)}
        </g>
      ))}
    </svg>
  );
}

export function Butterfly({ className, style }: P) {
  return (
    <svg viewBox="0 0 40 30" className={className} style={style} aria-hidden="true" focusable="false">
      <g className="ep-flutter" style={{ transformOrigin: '20px 15px' }}><path d="M20 15C10 2 2 4 4 14C6 20 14 20 20 15ZM20 15C30 2 38 4 36 14C34 20 26 20 20 15Z" fill="#2A1F18" stroke="#C6A45D" strokeWidth=".8" /><path d="M20 15C14 22 10 28 14 28C18 26 20 20 20 15ZM20 15C26 22 30 28 26 28C22 26 20 20 20 15Z" fill="#7A5A28" /></g>
    </svg>
  );
}

/** Watercolor-style rose (final scene arch). */
export function Rose({ x, y, r, fill = 'url(#epRose)', rot = 0 }: { x: number; y: number; r: number; fill?: string; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <circle r={r} fill={fill} stroke="#C99890" strokeWidth={r * 0.03} />
      {[0.8, 0.6, 0.4].map((k, i) => <path key={i} d={`M${-r * k} 0A${r * k} ${r * k} 0 1 1 ${r * k * 0.2} ${r * k * 0.96}`} fill="none" stroke={i % 2 ? '#fff' : '#C99890'} strokeWidth={r * 0.05} strokeLinecap="round" opacity=".8" />)}
    </g>
  );
}

/** Standing peacock facing left with a long jewelled tail. */
export function PeacockStanding({ className, style }: P) {
  const r = rng(6);
  return (
    <svg viewBox="0 0 240 170" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M120 100C150 120 190 140 238 136C196 122 170 100 140 80Z" fill="url(#epPeaGreen)" />
      <path d="M118 104C160 134 200 156 236 156C196 140 164 116 134 88Z" fill="#0B5A4A" opacity=".85" />
      {Array.from({ length: 9 }, (_, i) => <g key={i} transform={`translate(${150 + i * 10} ${128 + (i % 3) * 5 - i * 1.5})`}><ellipse rx="4.6" ry="3.4" fill="#C6A45D" /><ellipse rx="3" ry="2.2" fill="#2A8FB0" /><circle r="1" fill="#0B3C44" /></g>)}
      <ellipse cx="100" cy="94" rx="32" ry="20" transform="rotate(-14 100 94)" fill="url(#epPeaBlue)" /><path d="M86 90c10-6 24-4 34 2" stroke="#6FB8D8" strokeWidth="1.4" fill="none" opacity=".7" />
      {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${96 + (i % 5) * 6} ${96 + Math.floor(i / 5) * 6}a3 2 0 0 1 5 0`} stroke="#7FC8E0" strokeWidth=".8" fill="none" opacity=".7" />)}
      <path d="M78 84C58 70 50 50 56 34" stroke="url(#epPeaBlue)" strokeWidth="11" fill="none" strokeLinecap="round" />
      <circle cx="56" cy="30" r="7" fill="#1D5F98" /><circle cx="53" cy="29" r="1.6" fill="#fff" /><path d="M49 31l-9 3 9 1z" fill="#C6A45D" /><path d="M58 24l-2-12M62 25l3-11M54 22l-4-9" stroke="#1D5F98" strokeWidth="1.2" /><circle cx="56" cy="10" r="1.6" fill="#2A8FB0" /><circle cx="65" cy="13" r="1.6" fill="#2A8FB0" />
      <path d="M96 112l-4 40M108 112l2 40" stroke="#6B5A40" strokeWidth="2.4" />
      {Array.from({ length: 4 }, (_, i) => <circle key={`d${i}`} cx={170 + r() * 50} cy={116 + r() * 30} r="1.4" fill="#F0DEAE" />)}
    </svg>
  );
}

/** Peacock with open fan, seen from the front (decorative foreground). */
export function PeacockFan({ className, style }: P) {
  return (
    <svg viewBox="0 0 240 160" className={className} style={style} aria-hidden="true" focusable="false">
      <g className="ep-fan" style={{ transformOrigin: '120px 150px' }}>
        {Array.from({ length: 19 }, (_, i) => { const a = -85 + i * 9.4; return <g key={i} transform={`translate(120 150) rotate(${a})`}><path d="M0 0C5-30 5-62 0-120C-5-62-5-30 0 0Z" fill={i % 2 ? '#2F7A58' : '#1F6A4E'} /><ellipse cy="-108" rx="8" ry="11" fill="#C6A45D" /><ellipse cy="-108" rx="6" ry="8.4" fill="#2A8FB0" /><ellipse cy="-109" rx="2.6" ry="4" fill="#0B3C44" /></g>; })}
      </g>
      <ellipse cx="120" cy="146" rx="22" ry="14" fill="url(#epPeaBlue)" /><circle cx="120" cy="124" r="9" fill="#1D5F98" /><circle cx="117" cy="122" r="1.5" fill="#fff" /><path d="M120 116v-8M115 117l-4-7M125 117l4-7" stroke="#1D5F98" strokeWidth="1.2" />
    </svg>
  );
}

/** Gold line-art peacock, perched. */
export function PeacockLine({ className, style }: P) {
  return (
    <svg viewBox="0 0 150 170" className={className} style={style} fill="none" stroke="url(#epGold)" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path className="ep-draw" d="M96 22C88 12 76 16 78 28C80 36 88 36 90 44C92 52 84 60 78 66" /><path className="ep-draw" d="M78 66C60 84 56 112 50 160M78 66C70 90 76 120 70 164M78 66C86 92 96 118 100 160" />
      <path className="ep-draw" d="M78 66C100 62 112 76 108 92C104 106 88 108 78 100" />
      {Array.from({ length: 6 }, (_, i) => <circle key={i} className="ep-draw" cx={58 + (i % 2) * 18} cy={100 + i * 10} r="3.4" />)}
      <path className="ep-draw" d="M86 14l-4-10M90 16l2-10M82 18l-6-8" />
    </svg>
  );
}
