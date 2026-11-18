import type { CSSProperties } from 'react';
import { rng } from '../lib/rng';

/** Orange/red/yellow lotus ornament (festive canopy & borders). */
export function LotusMotif({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  const outer = [-72, -48, -24, 0, 24, 48, 72];
  const inner = [-48, -24, 0, 24, 48];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {outer.map((a) => <path key={a} transform={`rotate(${a})`} d="M0 0C-11-8-13-28 0-44C13-28 11-8 0 0Z" fill="#EE8A1D" stroke="#F8C93B" strokeWidth="2" />)}
      {inner.map((a) => <path key={a} transform={`rotate(${a})`} d="M0 0C-7-6-8-20 0-32C8-20 7-6 0 0Z" fill="#C9302C" stroke="#F8C93B" strokeWidth="1.4" />)}
      {inner.map((a) => <path key={`l${a}`} transform={`rotate(${a})`} d="M0-8C-2-14-2-20 0-26" stroke="#F8C93B" strokeWidth="1.2" fill="none" />)}
      <path d="M-14 4C-6 12 6 12 14 4C8 16-8 16-14 4Z" fill="#4C8A2A" />
    </g>
  );
}

export function HangingBell({ className = '', x = 0, y = 0, s = 1 }: { className?: string; x?: number; y?: number; s?: number }) {
  return (
    <g className={`tg-swing ${className}`} style={{ transformOrigin: `${x}px ${y}px` }} transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="2" r="2.6" fill="#D5AD55" /><path d="M0 4v6" stroke="#B9861F" strokeWidth="1.4" />
      <path d="M-4 12c0-6 3-10 4-10s4 4 4 10l5 12h-18z" fill="url(#tgGold)" stroke="#A87F34" strokeWidth=".8" transform="translate(0 0)" />
      <ellipse cx="0" cy="25" rx="9" ry="2.2" fill="#B9861F" /><circle cx="0" cy="28" r="2.2" fill="#8A5E1E" />
    </g>
  );
}

const Mari = ({ x, y, r = 6.5, k = 0 }: { x: number; y: number; r?: number; k?: number }) => (<g><circle cx={x} cy={y} r={r} fill={k % 2 ? 'url(#tgMariY)' : 'url(#tgMari)'} stroke="#C7581A" strokeWidth=".7" /><circle cx={x} cy={y} r={r * 0.5} fill="none" stroke="#C7581A" strokeWidth=".6" opacity=".7" /></g>);

/** Green festive canopy with lotus row, three pendants (strings + bells) and marigold side columns. */
export function FestiveCanopy({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const string = (x: number, y0: number, y1: number) => Array.from({ length: Math.floor((y1 - y0) / 12.5) }, (_, i) => <Mari key={i} x={x} y={y0 + i * 12.5} r={6.4} k={i} />);
  const wing = (x: number, y: number, flip: number) => (
    <g transform={`translate(${x} ${y}) scale(${flip} 1)`} fill="none" stroke="#F3B227" strokeWidth="3.2" strokeLinecap="round">
      <path d="M-4 6C-30 8-46 -4-70 -2-86 0-92 12-82 18-74 22-66 14-72 10" fill="#E9831B" stroke="#F8C93B" strokeWidth="2.4" />
      <path d="M-20 12C-40 18-56 12-66 24" strokeWidth="2" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 240" className={className} style={style} preserveAspectRatio="xMidYMin meet" aria-hidden="true" focusable="false">
      <path d="M0 0H400V58H0Z" fill="#5E8A2E" /><path d="M0 0H400V12H0Z" fill="#4C7523" opacity=".6" />
      {[26, 92, 160, 240, 308, 374].map((x) => <LotusMotif key={x} x={x} y={42} s={0.5} />)}
      {string(60, 74, 150)}{string(340, 74, 150)}{string(200, 68, 112)}
      {wing(156, 62, 1)}{wing(244, 62, -1)}{wing(46, 78, 1)}{wing(354, 78, -1)}
      <LotusMotif x={200} y={62} s={1.1} /><LotusMotif x={60} y={92} s={0.78} /><LotusMotif x={340} y={92} s={0.78} />
      <path d="M186 64l14 14 14-14" fill="#4C8A2A" />
      <HangingBell x={200} y={118} s={0.9} className="tg-b1" /><HangingBell x={60} y={156} s={0.9} className="tg-b2" /><HangingBell x={340} y={156} s={0.9} className="tg-b3" />
      {Array.from({ length: 11 }, (_, i) => <Mari key={`a${i}`} x={9} y={76 + i * 15.5} r={8.4} k={i} />)}
      {Array.from({ length: 11 }, (_, i) => <Mari key={`b${i}`} x={391} y={76 + i * 15.5} r={8.4} k={i} />)}
    </svg>
  );
}

/** Decorated kalash with mango leaves and coconut. */
export function KalashDecoration({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 80 100" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M40 2c10 8 12 16 12 24H28c0-8 2-16 12-24z" fill="#E2552B" stroke="#F3B227" strokeWidth="1.6" /><path d="M40 8c4 5 5 9 5 14h-10c0-5 1-9 5-14z" fill="#F3B227" />
      {[-52, -26, 0, 26, 52].map((a) => <path key={a} transform={`rotate(${a} 40 44)`} d="M40 44C32 36 32 22 40 16c8 6 8 20 0 28z" fill="#4C8A2A" stroke="#2F6B2E" strokeWidth=".8" />)}
      <ellipse cx="40" cy="34" rx="17" ry="6" fill="#C9302C" stroke="#F3B227" strokeWidth="1.2" />
      <path d="M22 44h36l6 8c2 20-14 38-24 38S14 72 16 52z" fill="#D63B2E" stroke="#F3B227" strokeWidth="1.8" />
      <path d="M18 58h44M20 70h40" stroke="#F3B227" strokeWidth="2" /><path d="M24 64h32" stroke="#4C8A2A" strokeWidth="3" strokeDasharray="2 4" strokeLinecap="round" />
      <path d="M30 90h20l4 8H26z" fill="#E9A93A" stroke="#F3B227" strokeWidth="1.2" />
    </svg>
  );
}

/** Coconut palm: `ghost` gives the translucent silhouette used on the opening scene. */
export function PalmTree({ className = '', ghost = false, style }: { className?: string; ghost?: boolean; style?: CSSProperties }) {
  const fronds = [-96, -66, -36, -8, 22, 52, 82, 112, 140];
  return (
    <svg viewBox="0 0 220 540" className={className} style={style} aria-hidden="true" focusable="false">
      <g opacity={ghost ? 0.3 : 1}>
        <path d="M96 196C100 300 92 420 84 540H132C124 420 112 300 114 196Z" fill={ghost ? '#7A2A3A' : '#4F3226'} />
        {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${94 - i * 0.3} ${214 + i * 21}q12 6 24 0`} stroke={ghost ? '#8D3C4A' : '#C69A3E'} strokeWidth="2.6" fill="none" strokeLinecap="round" />)}
        <g className="tg-sway" style={{ transformOrigin: '106px 196px' }}>
          {fronds.map((a, i) => (
            <g key={a} transform={`translate(106 190) rotate(${a})`}>
              <path d="M0 0C30-34 82-40 120 6C80-6 38-6 0 0Z" fill={ghost ? '#8A3345' : i % 2 ? '#587F32' : '#4C7A2B'} stroke={ghost ? 'none' : '#3C6420'} strokeWidth="1" />
              {!ghost && <path d="M0 0C40-12 80-10 118 6" stroke="#8DB660" strokeWidth="1.4" fill="none" />}
            </g>
          ))}
        </g>
        <circle cx="100" cy="206" r="6" fill={ghost ? '#8A3345' : '#6B4A2A'} /><circle cx="114" cy="208" r="6" fill={ghost ? '#8A3345' : '#6B4A2A'} />
      </g>
    </svg>
  );
}

/** Row of yellow-orange lotuses for the bottom edge (stretches across the board). */
export function LotusBorder({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 400 50" preserveAspectRatio="xMidYMax slice" className={className} style={style} aria-hidden="true" focusable="false">
      <rect y="40" width="400" height="10" fill="#8F1A33" />
      {Array.from({ length: 9 }, (_, i) => <g key={i} className="tg-bloom" style={{ animationDelay: `${i * 0.1}s` }}><LotusMotif x={22 + i * 44.5} y={46} s={0.62} /></g>)}
    </svg>
  );
}

/** Falling twinkle stars (pure CSS). */
export function Twinkles({ count = 18, seed = 4, className = '' }: { count?: number; seed?: number; className?: string }) {
  const r = rng(seed);
  return (
    <div className={`tg-fx ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => <span key={i} className="tg-spark" style={{ left: `${r() * 100}%`, top: `${r() * 80}%`, animationDelay: `${-r() * 4}s`, ['--sz' as string]: `${6 + r() * 8}px` }} />)}
    </div>
  );
}

/* --------------------------------------------------------------- bride & groom */
export type Attire = 'festive' | 'haldi' | 'sangeet' | 'wedding' | 'mehendi';
const attire: Record<Attire, { sari: string; sariB: string; trim: string; blouse: string; kurta: string; dhoti: string; border: string }> = {
  festive: { sari: '#E9A93A', sariB: '#C9852A', trim: '#F7E9B0', blouse: '#F6E7A8', kurta: '#FBF4DE', dhoti: '#FBF4DE', border: '#F2B8A0' },
  haldi: { sari: '#F6C62C', sariB: '#E39A12', trim: '#FFF2B8', blouse: '#FFF3C4', kurta: '#FFF6CC', dhoti: '#FFF6CC', border: '#F2B34A' },
  mehendi: { sari: '#3E8E5A', sariB: '#2A6A40', trim: '#E9D58A', blouse: '#F4D77A', kurta: '#F1ECD0', dhoti: '#F1ECD0', border: '#9CC48A' },
  sangeet: { sari: '#B8264F', sariB: '#8A1738', trim: '#F3D68A', blouse: '#E8B24A', kurta: '#3A1B3F', dhoti: '#3A1B3F', border: '#D5AD55' },
  wedding: { sari: '#E9A93A', sariB: '#C9852A', trim: '#F7E9B0', blouse: '#F6E7A8', kurta: '#FBF4DE', dhoti: '#FBF4DE', border: '#F2B8A0' },
};
const SKIN = '#D99A6C', SKIN_D = '#C4845A';
const Garland = ({ pts }: { pts: [number, number][] }) => <>{pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6.6" fill={i % 2 ? 'url(#tgMariY)' : 'url(#tgMari)'} stroke="#C7581A" strokeWidth=".6" />)}</>;

/** Bride facing right. Own viewBox so it can stand alone along the board edge. */
export function Bride({ className = '', style, variant = 'festive' }: { className?: string; style?: CSSProperties; variant?: Attire }) {
  const a = attire[variant];
  return (
    <svg viewBox="30 40 200 460" className={className} style={style} aria-hidden="true" focusable="false">
      <ellipse cx="124" cy="494" rx="86" ry="9" fill="rgba(60,10,25,.28)" />
      <path d="M72 250H150L180 490H44Z" fill={a.sari} /><path d="M72 250L44 490H78L96 250Z" fill={a.trim} /><path d="M150 250L180 490H146L128 250Z" fill={a.trim} /><path d="M96 250H128L146 490H78Z" fill={a.sariB} opacity=".35" />
      {Array.from({ length: 20 }, (_, i) => <path key={i} d={`M${86 + (i % 5) * 14} ${300 + Math.floor(i / 5) * 42}c4 6 4 12 0 14-4-2-4-8 0-14z`} fill="#F4D77A" opacity=".85" />)}
      <path d="M44 480H180V494H44Z" fill={a.trim} />
      <path d="M80 152Q110 140 140 152L148 258H72Z" fill={a.blouse} /><path d="M72 238H148V256H72Z" fill={a.sariB} />
      <path d="M96 118h30v36H96z" fill={SKIN} />
      <path d="M78 156C60 190 66 240 84 262L102 258C90 224 92 186 100 160Z" fill={a.trim} stroke={a.sariB} strokeWidth="1" />
      <path d="M148 154c26 6 40 30 36 56l-12 2c2-20-10-34-30-40z" fill={a.sari} />
      <path d="M142 176c24 8 40 22 44 42" stroke={SKIN} strokeWidth="14" fill="none" strokeLinecap="round" />
      <circle cx="190" cy="226" r="9" fill={SKIN} /><path d="M176 196q4 6 4 16M170 190q4 6 4 16" stroke="#E9B73A" strokeWidth="3" fill="none" />
      <path d="M126 168c-6 24-12 42-14 66" stroke={SKIN} strokeWidth="13" fill="none" strokeLinecap="round" /><circle cx="110" cy="240" r="8" fill={SKIN} />
      <Garland pts={[[100, 160], [96, 174], [96, 190], [98, 206], [102, 222], [108, 236], [138, 160], [140, 176], [138, 192], [134, 208]]} />
      <ellipse cx="112" cy="94" rx="21" ry="25" fill={SKIN} /><path d="M131 92l8 6-8 4z" fill={SKIN_D} />
      <path d="M90 90C84 62 112 58 128 74C118 70 100 72 96 88z" fill="#1E1210" /><path d="M92 92c-4 14 0 26 8 34l-14-4c-6-16-2-30 6-30z" fill="#1E1210" /><circle cx="84" cy="100" r="13" fill="#1E1210" />
      <circle cx="120" cy="88" r="2" fill="#1E1210" /><path d="M116 82l8-2" stroke="#1E1210" strokeWidth="1.6" /><circle cx="128" cy="78" r="2.2" fill="#C9302C" />
      <path d="M126 106q6 4 10 0" stroke="#9A3A3A" strokeWidth="1.6" fill="none" /><circle cx="108" cy="104" r="3" fill="#E9B73A" />
    </svg>
  );
}

/** Groom facing left. */
export function Groom({ className = '', style, variant = 'festive' }: { className?: string; style?: CSSProperties; variant?: Attire }) {
  const a = attire[variant];
  return (
    <svg viewBox="170 40 200 460" className={className} style={style} aria-hidden="true" focusable="false">
      <ellipse cx="270" cy="494" rx="70" ry="8" fill="rgba(60,10,25,.28)" />
      <path d="M222 330H316L306 488H274L270 380L266 488H232Z" fill={a.dhoti} /><path d="M268 330l4 150" stroke={a.border} strokeWidth="6" /><path d="M232 470H306" stroke={a.border} strokeWidth="5" />
      <ellipse cx="248" cy="492" rx="14" ry="5" fill={SKIN_D} /><ellipse cx="292" cy="492" rx="14" ry="5" fill={SKIN_D} />
      <path d="M222 156Q268 140 316 156L324 336H212Z" fill={a.kurta} /><path d="M268 150V336" stroke={a.border} strokeWidth="9" opacity=".8" /><path d="M214 320H322V336H214Z" fill="#000" opacity=".06" />
      {[170, 196, 222, 248, 274].map((y) => <circle key={y} cx="268" cy={y} r="2.2" fill="#D5AD55" />)}
      <path d="M254 122h30v36h-30z" fill={SKIN} />
      <path d="M222 168C196 190 176 214 168 236L182 246C196 228 216 212 238 204Z" fill={a.kurta} stroke="#E4DCC0" strokeWidth="1" />
      <path d="M176 238c-6 6-6 16 2 18 8 0 12-8 8-14z" fill={SKIN} /><path d="M318 170c14 20 12 56 2 84l-16 4c4-26 4-52-6-76z" fill={a.kurta} stroke="#E4DCC0" strokeWidth="1" /><circle cx="312" cy="262" r="9" fill={SKIN} />
      <Garland pts={[[250, 160], [246, 176], [246, 194], [248, 212], [252, 228], [256, 244], [286, 160], [290, 176], [292, 194], [290, 212]]} />
      <ellipse cx="266" cy="96" rx="22" ry="27" fill={SKIN} /><path d="M245 96l-9 6 9 4z" fill={SKIN_D} />
      <path d="M244 90C240 60 270 54 290 70C294 80 290 90 288 94C284 78 262 72 250 86z" fill="#1E1210" /><path d="M244 108c4 18 16 28 28 28 8-2 14-8 18-18-8 6-20 6-30 2z" fill="#1E1210" opacity=".9" />
      <circle cx="256" cy="92" r="2" fill="#1E1210" /><path d="M252 85l9-2" stroke="#1E1210" strokeWidth="1.8" /><path d="M244 112q10-4 20 2" stroke="#1E1210" strokeWidth="3" fill="none" />
    </svg>
  );
}

/** Bride and groom facing each other (kept identical wherever the festive couple appears). */
export function IllustratedWeddingCouple({ className = '', variant = 'festive' }: { className?: string; variant?: Attire }) {
  return (
    <div className={className} style={{ position: 'relative', aspectRatio: '1 / 1.12' }}>
      <Bride variant={variant} className="tg-sway-soft" style={{ position: 'absolute', left: '0%', bottom: 0, height: '100%', width: 'auto' }} />
      <Groom variant={variant} className="tg-sway-soft" style={{ position: 'absolute', right: '0%', bottom: 0, height: '100%', width: 'auto' }} />
    </div>
  );
}
