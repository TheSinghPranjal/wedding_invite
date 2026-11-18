import type { CSSProperties } from 'react';
import { rng } from '../lib/rng';
import { Bloom, Leaf, GoldStar } from './Orbit';

/** Organic layered watercolor shapes for the botanical chapter (full-bleed, stretches to its box). */
export function OrganicShapes({ variant = 'dark', className = '', style }: { variant?: 'dark' | 'cream' | 'frame'; className?: string; style?: CSSProperties }) {
  const pal = variant === 'cream' ? { bg: '#ECE6C3', a: '#747658', b: '#BFBB96', c: '#F4EFD2' } : variant === 'frame' ? { bg: '#6F7059', a: '#7D7E62', b: '#A7A582', c: '#B9B590' } : { bg: '#6F705A', a: '#BDB895', b: '#D8D4AE', c: '#E8E4BE' };
  return (
    <svg viewBox="0 0 450 800" preserveAspectRatio="none" className={className} style={style} aria-hidden="true" focusable="false">
      <rect width="450" height="800" fill={pal.bg} />
      {variant === 'dark' && (<>
        <path d="M0 240C60 210 110 170 170 190C230 210 250 250 330 220C400 195 430 230 450 250V800H0Z" fill={pal.a} />
        <path d="M0 330C30 300 90 290 130 330C170 372 200 470 300 520C380 560 430 640 450 760V800H0Z" fill={pal.b} />
        <path d="M110 160C140 110 220 130 250 170C290 120 400 130 410 200C420 260 360 300 300 290C230 330 150 300 120 260C80 240 90 190 110 160Z" fill={pal.c} opacity=".6" />
        <path d="M0 330C20 320 50 330 70 360C110 420 130 500 230 560C330 620 400 700 450 800H300C260 700 200 640 120 600C40 560 0 480 0 400Z" fill="#E6E2BE" opacity=".35" />
      </>)}
      {variant === 'cream' && (<>
        <path d="M0 0H450V190C440 200 430 160 400 170C360 184 340 150 300 180C250 218 200 176 150 190C90 206 60 250 0 220Z" fill={pal.a} />
        <path d="M0 180C50 230 120 190 170 200C230 214 270 180 320 190V210C260 200 220 240 160 232C90 224 40 270 0 240Z" fill="#8A8C6B" opacity=".5" />
      </>)}
      {variant === 'frame' && (<>
        <path d="M0 300C40 270 140 250 240 280C330 308 420 280 450 300V800H0Z" fill={pal.a} />
        <path d="M0 340C20 330 50 380 80 440C130 540 230 520 300 580C350 622 430 600 450 640V800H0Z" fill={pal.b} />
        <path d="M60 200C130 120 330 130 420 210C450 240 440 330 380 360C300 410 150 390 80 340C30 300 30 240 60 200Z" fill={pal.c} opacity=".5" />
      </>)}
    </svg>
  );
}

/** Cascading pink peonies, leaves and wisteria hanging from the top edge. */
export function HangingFloralArrangement({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const r = rng(17);
  const blooms = [[200, 20, 40], [128, 14, 32], [276, 16, 34], [58, 36, 38], [346, 34, 40], [96, 66, 26], [310, 60, 28], [20, 12, 26], [384, 12, 26], [200, 62, 24]] as const;
  const strands = [[160, 58], [190, 62], [220, 60], [250, 54], [130, 54]];
  return (
    <svg viewBox="0 0 400 270" preserveAspectRatio="xMidYMin meet" className={className} style={style} aria-hidden="true" focusable="false">
      {Array.from({ length: 22 }, (_, i) => <Leaf key={`l${i}`} x={20 + r() * 360} y={12 + r() * 60} len={30 + r() * 24} rot={30 + r() * 120} fill={i % 3 ? 'url(#tgSage)' : '#9FB6AE'} />)}
      {strands.map(([x, y], i) => (
        <g key={i} className="tg-sway" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.3}s` }}>
          <path d={`M${x} ${y}C${x - 6} ${y + 50} ${x + 6} ${y + 110} ${x} ${y + 150 + (i % 3) * 20}`} stroke="#9FB27A" strokeWidth="1" fill="none" />
          {Array.from({ length: 10 }, (_, k) => <ellipse key={k} cx={x + (k % 2 ? 5 : -5) + Math.sin(k) * 2} cy={y + 12 + k * 9} rx={7 - k * 0.3} ry={4.6 - k * 0.2} fill="#F2B9CB" stroke="#D98AA6" strokeWidth=".5" opacity=".95" />)}
        </g>
      ))}
      {blooms.map(([x, y, s], i) => <Bloom key={i} x={x} y={y} r={s} rot={i * 20} fill={i % 3 === 2 ? 'url(#tgPeony)' : 'url(#tgPink)'} petals={7} />)}
      {Array.from({ length: 14 }, (_, i) => <circle key={`b${i}`} cx={30 + r() * 340} cy={30 + r() * 60} r={3 + r() * 3} fill={i % 2 ? '#3E6F7A' : '#7A2A4A'} />)}
    </svg>
  );
}

/** Pink flowers and leaves for lower corners. */
export function FloralCorner({ className = '', style, tone = 'pink' }: { className?: string; style?: CSSProperties; tone?: 'pink' | 'blush' }) {
  const r = rng(29);
  return (
    <svg viewBox="0 0 220 160" preserveAspectRatio="xMinYMax meet" className={className} style={style} aria-hidden="true" focusable="false">
      {Array.from({ length: 12 }, (_, i) => <Leaf key={i} x={10 + r() * 150} y={150 - r() * 70} len={34 + r() * 26} rot={-170 + r() * 160} fill={i % 3 ? 'url(#tgSage)' : '#A9BDB2'} />)}
      {[[40, 128, 30], [92, 134, 24], [150, 140, 28], [24, 100, 20], [116, 112, 18]].map(([x, y, s], i) => <Bloom key={i} x={x} y={y} r={s} rot={i * 25} fill={tone === 'pink' ? (i % 2 ? 'url(#tgPink)' : 'url(#tgRose)') : 'url(#tgPeony)'} petals={7} />)}
      {Array.from({ length: 6 }, (_, i) => <circle key={`b${i}`} cx={20 + r() * 160} cy={110 + r() * 40} r={3.4} fill={i % 2 ? '#3E6F7A' : '#7A2A4A'} />)}
    </svg>
  );
}

/** Fine gold strings, each ending in a swinging star. */
export function HangingStars({ strings = [[10, 150], [22, 330], [84, 120], [90, 250]], className = '' }: { strings?: number[][]; className?: string }) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
      {strings.map(([x, len], i) => (
        <div key={i} className="tg-swing" style={{ position: 'absolute', left: `${x}%`, top: 0, height: len, width: 0, transformOrigin: '50% 0', animationDelay: `${i * 0.5}s` }}>
          <div style={{ position: 'absolute', left: -1, top: 0, bottom: 14, width: 2, background: 'repeating-linear-gradient(#E9CC7E 0 3px, #B88F3E 3px 5px)' }} />
          <svg viewBox="-24 -24 48 48" style={{ position: 'absolute', left: -15, bottom: -16, width: 30, height: 30 }}><GoldStar r={22} fill="url(#tgBronze)" /></svg>
        </div>
      ))}
    </div>
  );
}

/** Two champagne glasses; `.tg-glass-l` / `.tg-glass-r` are tilted together by the scene timeline. */
export function ChampagneGlasses({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const glass = (cls: string, x: number, rot: number) => (
    <g className={cls} transform={`translate(${x} 30) rotate(${rot})`} style={{ transformOrigin: `${x}px 100px`, transformBox: 'view-box' }}>
      <path d="M-18 0H18C18 34 8 50 0 52C-8 50-18 34-18 0Z" fill="#E6E2D0" opacity=".55" stroke="#B5B39B" strokeWidth="1.2" />
      <path d="M-16 6H16C16 32 8 44 0 46C-8 44-16 32-16 6Z" fill="#B3274F" />
      <path d="M0 52V92M-14 94H14" stroke="#B5B39B" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
  return <svg viewBox="0 0 160 110" className={className} style={style} aria-hidden="true" focusable="false">{glass('tg-glass-l', 50, -14)}{glass('tg-glass-r', 110, 14)}</svg>;
}

/** Red & gold royal parasol (own pole). */
export function RoyalUmbrella({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 150" className={className} style={style} aria-hidden="true" focusable="false">
      <line x1="60" y1="40" x2="60" y2="150" stroke="#5B3A2A" strokeWidth="3" />
      <path d="M8 62C10 30 34 12 60 12s50 18 52 50z" fill="#B3274F" />
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M60 12C${44 - i * 6} 28 ${34 - i * 8} 46 ${12 + i * 22} 62`} stroke="#E9B73A" strokeWidth="1.2" fill="none" opacity=".7" />)}
      <path d="M6 62H114V76H6Z" fill="#E9A93A" /><path d="M6 76H114" stroke="#B5801C" />
      {Array.from({ length: 20 }, (_, i) => <path key={i} d={`M${10 + i * 5.4} 76v8`} stroke="#E9A93A" strokeWidth="1.6" />)}
      <path d="M60 4l4 8H56z" fill="#E9B73A" />
    </svg>
  );
}

/** Decorated elephant, teal body with red-pink gold-embroidered cover and parasol. Faces right; mirror with scaleX(-1). */
export function WeddingElephant({ className = '', style, parasol = true }: { className?: string; style?: CSSProperties; parasol?: boolean }) {
  return (
    <svg viewBox="0 -100 300 370" className={className} style={style} aria-hidden="true" focusable="false">
      {parasol && <g className="tg-umb-g"><line x1="132" y1="-30" x2="132" y2="52" stroke="#5B3A2A" strokeWidth="3" /><path d="M70 -50C74 -86 104 -98 132 -98s58 12 62 48z" fill="#B3274F" /><path d="M68 -50H196V-36H68Z" fill="#E9A93A" />{Array.from({ length: 24 }, (_, i) => <path key={i} d={`M${72 + i * 5.2} -36v8`} stroke="#E9A93A" strokeWidth="1.6" />)}</g>}
      <ellipse cx="150" cy="262" rx="130" ry="8" fill="rgba(40,50,40,.22)" />
      <rect x="64" y="190" width="38" height="70" rx="12" fill="#2F6468" /><rect x="190" y="190" width="38" height="70" rx="12" fill="#2F6468" /><rect x="104" y="196" width="36" height="64" rx="12" fill="url(#tgTeal)" /><rect x="146" y="196" width="36" height="64" rx="12" fill="url(#tgTeal)" />
      {[64, 104, 146, 190].map((x) => <rect key={x} x={x + 4} y="246" width="30" height="8" rx="4" fill="#E9B73A" opacity=".85" />)}
      <path d="M40 128C40 84 90 64 142 64S234 90 232 146L228 212H56Z" fill="url(#tgTeal)" />
      <path d="M96 54Q100 26 126 24L168 28Q178 30 176 54Z" fill="#3B2147" /><path d="M96 54H176" stroke="#E9B73A" strokeWidth="2" />
      <path d="M54 86H218L226 190L212 208L198 188L184 210L170 188L156 210L142 188L128 210L114 188L100 210L86 188L72 208L58 190Z" fill="#B3274F" stroke="#E9B73A" strokeWidth="3" />
      {Array.from({ length: 20 }, (_, i) => <path key={i} d={`M${70 + (i % 10) * 15} ${106 + Math.floor(i / 10) * 40}l5 8-5 8-5-8z`} fill="#E9B73A" opacity=".85" />)}
      <path d="M62 98H210" stroke="#E9B73A" strokeWidth="2" strokeDasharray="3 4" />
      <g className="tg-trunk" style={{ transformOrigin: '250px 150px' }}>
        <path d="M258 150C282 186 276 224 246 220C232 218 228 202 240 200" stroke="url(#tgTeal)" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path d="M252 190C262 204 258 214 248 212" stroke="#E9A0B0" strokeWidth="3" fill="none" opacity=".7" />
      </g>
      <path d="M204 106C238 72 282 100 278 146C276 174 262 192 244 196C226 196 212 176 208 150Z" fill="url(#tgTeal)" />
      <ellipse cx="216" cy="134" rx="22" ry="34" fill="#4A8486" stroke="#2F6468" strokeWidth="1.6" /><ellipse cx="218" cy="136" rx="12" ry="22" fill="#E7A8B4" opacity=".55" />
      <path d="M232 92C240 80 262 80 270 96C264 106 244 108 232 100Z" fill="#F0E2B0" stroke="#B3274F" strokeWidth="2" /><path d="M236 98q16 6 28 -2" stroke="#E9B73A" strokeWidth="2" fill="none" />
      <circle cx="254" cy="126" r="3.4" fill="#1E1A1A" /><circle cx="255" cy="125" r="1" fill="#fff" />
      <path d="M244 182C256 188 262 176 258 168" stroke="#F4EBD0" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Irregular gold geometric couple frame (multiple offset polygons) - paths carry `.tg-draw` for DrawSVG. */
export function GeometricFrame({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 400 500" className={className} style={style} fill="none" stroke="url(#tgGold)" aria-hidden="true" focusable="false">
      <polygon className="tg-draw" points="200,20 360,110 370,300 250,470 90,420 40,230 80,90" strokeWidth="2.4" />
      <polygon className="tg-draw" points="210,40 340,130 350,290 240,440 110,400 60,240 100,100" strokeWidth="1" opacity=".7" />
      <polygon className="tg-draw" points="180,30 330,80 380,270 270,460 70,390 30,200" strokeWidth=".8" opacity=".5" />
    </svg>
  );
}

/** R + P monogram: forest-green R, terracotta P, pale flower at the intersection. */
export function CoupleMonogram({ className = '', style, letters = ['R', 'P'] }: { className?: string; style?: CSSProperties; letters?: [string, string] }) {
  return (
    <svg viewBox="0 0 320 300" className={className} style={style} role="img" aria-label={`${letters[0]} and ${letters[1]} monogram`}>
      <g className="tg-mono-r"><text x="48" y="238" fontFamily="'Playfair Display', Georgia, serif" fontSize="230" fill="#5F8F6B">{letters[0]}</text></g>
      <g className="tg-mono-p"><text x="140" y="238" fontFamily="'Playfair Display', Georgia, serif" fontSize="230" fill="#D9967E" opacity=".95">{letters[1]}</text></g>
      <g className="tg-mono-flower" style={{ transformOrigin: '160px 150px', transformBox: 'view-box' }}>
        <Bloom x={160} y={152} r={34} fill="url(#tgPeony)" petals={6} rot={10} />
        <Bloom x={160} y={152} r={22} fill="url(#tgPink)" petals={6} rot={40} />
        <circle cx="160" cy="152" r="4" fill="#E8B96A" />
        <Leaf x={164} y={176} len={26} rot={70} /><Leaf x={152} y={176} len={22} rot={110} />
      </g>
    </svg>
  );
}

/** Cream vintage wedding car seen from behind, with dark-green window, ribbon, roses and gold script. */
export function VintageWeddingCar({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const rose = (x: number, y: number) => (<g><circle cx={x} cy={y} r="13" fill="#E39B72" /><circle cx={x} cy={y} r="8" fill="none" stroke="#B8603A" strokeWidth="1.4" /><path d={`M${x - 4} ${y + 2}q4-8 8 0`} stroke="#B8603A" strokeWidth="1.2" fill="none" /></g>);
  return (
    <svg viewBox="0 0 400 380" className={className} style={style} role="img" aria-label="Just Married vintage car">
      <rect x="86" y="318" width="44" height="58" rx="6" fill="#123A2E" /><rect x="270" y="318" width="44" height="58" rx="6" fill="#123A2E" />
      <path d="M62 330V160C62 96 112 56 200 56s138 40 138 104V330Z" fill="#F4EBDD" /><path d="M40 330V232Q40 204 68 204H332Q360 204 360 232V330Z" fill="#F4EBDD" />
      <path d="M62 330V160C62 96 112 56 200 56" stroke="#E6A47E" strokeWidth="1.4" fill="none" opacity=".8" />
      <path d="M98 100Q200 80 302 100L296 172Q200 184 104 172Z" fill="#0F2A22" /><path d="M120 108Q200 96 280 108" stroke="#fff" strokeOpacity=".12" strokeWidth="6" fill="none" />
      <rect x="106" y="184" width="188" height="16" fill="none" stroke="#E6A47E" strokeWidth="1.2" /><path d="M112 184v16M122 184v16M132 184v16M142 184v16M152 184v16M162 184v16M172 184v16M182 184v16M192 184v16M202 184v16M212 184v16M222 184v16M232 184v16M242 184v16M252 184v16M262 184v16M272 184v16M282 184v16" stroke="#E6A47E" strokeWidth="1" />
      <rect x="116" y="212" width="66" height="12" fill="#E39B72" /><rect x="218" y="212" width="66" height="12" fill="#E39B72" />
      <path d="M48 262V232a12 12 0 0 1 24 0v30" fill="none" stroke="#E39B72" strokeWidth="5" /><path d="M328 262V232a12 12 0 0 1 24 0v30" fill="none" stroke="#E39B72" strokeWidth="5" />
      <g className="tg-ribbon"><path d="M62 258L42 282L96 278Z" fill="#1F5444" /><path d="M338 258L358 282L304 278Z" fill="#1F5444" /><rect x="76" y="236" width="248" height="46" fill="#1F5444" />
        <text x="200" y="268" textAnchor="middle" fontFamily="'Sacramento', cursive" fontSize="34" fill="#E8D08A">Just Married</text><path d="M268 246q4-6 8 0q4-6 8 0q0 6-8 10q-8-4-8-10z" fill="#E8D08A" transform="translate(10 -8) scale(.7)" /></g>
      {rose(310, 238)}{rose(332, 232)}{rose(124, 284)}{rose(144, 280)}
      <rect x="60" y="296" width="280" height="12" rx="6" fill="none" stroke="#3E4A44" strokeWidth="1.6" /><rect x="60" y="312" width="280" height="12" rx="6" fill="none" stroke="#3E4A44" strokeWidth="1.6" />
      <circle cx="150" cy="334" r="9" fill="#123A2E" /><circle cx="250" cy="334" r="9" fill="#123A2E" />
    </svg>
  );
}

/** Watercolor meadow layers: sky wash, clouds, trees and soft ground. Pure CSS/SVG, no raster assets. */
export function WatercolorSky({ className = '' }: { className?: string }) {
  return (
    <div className={`tg-sky ${className}`} aria-hidden="true">
      <div className="tg-sky__wash" />
      <svg viewBox="0 0 450 800" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} focusable="false">
        <g filter="url(#tgWater)" opacity=".92">
          <ellipse cx="90" cy="130" rx="110" ry="36" fill="#CFE0EE" opacity=".7" /><ellipse cx="360" cy="70" rx="100" ry="30" fill="#D9E8F2" opacity=".6" />
          <ellipse cx="370" cy="290" rx="170" ry="200" fill="#A9C578" opacity=".8" /><ellipse cx="420" cy="170" rx="110" ry="150" fill="#B9D18A" opacity=".75" /><ellipse cx="330" cy="400" rx="120" ry="120" fill="#8DB360" opacity=".7" />
          <ellipse cx="60" cy="470" rx="120" ry="80" fill="#9DBB6E" opacity=".75" /><ellipse cx="190" cy="500" rx="130" ry="70" fill="#B2CB88" opacity=".7" />
          <ellipse cx="225" cy="650" rx="330" ry="130" fill="#C5DB9A" opacity=".9" />
        </g>
      </svg>
    </div>
  );
}

export function Wildflowers({ className = '', seed = 3, count = 150 }: { className?: string; seed?: number; count?: number }) {
  const r = rng(seed);
  const cols = ['#F3A6B8', '#F7D96A', '#FFFFFF', '#C9B6E4', '#F28B94', '#FBE7A3'];
  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true" focusable="false">
      {Array.from({ length: count }, (_, i) => { const y = 260 - r() * 240; const sz = 1.8 + (y / 260) * 4; return <circle key={i} className="tg-wf" cx={r() * 200} cy={y} r={sz} fill={cols[i % cols.length]} opacity={0.85} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />; })}
      {Array.from({ length: 40 }, (_, i) => <path key={`s${i}`} d={`M${r() * 200} 260q${r() * 6 - 3} -${14 + r() * 24} ${r() * 8 - 4} -${30 + r() * 30}`} stroke="#7FA05A" strokeWidth="1" fill="none" opacity=".6" />)}
    </svg>
  );
}

/** Hanging willow vine for upper corners. */
export function HangingVine({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 160 220" className={className} style={style} aria-hidden="true" focusable="false">
      {[0, 1, 2].map((k) => (
        <g key={k} className="tg-sway" style={{ transformOrigin: '0 0', animationDelay: `${k * 0.6}s` }}>
          <path d={`M${k * 18} 0C${60 + k * 14} ${20 + k * 8} ${96 + k * 10} ${60 + k * 14} ${120 - k * 6} ${150 + k * 20}`} stroke="#7FA05A" strokeWidth="1.6" fill="none" />
          {Array.from({ length: 9 }, (_, i) => { const t = (i + 1) / 10; return <Leaf key={i} x={t * (110 - k * 4) + k * 16} y={t * t * (150 + k * 20) + 8} len={22} rot={i % 2 ? 60 : 130} fill="#8FB066" />; })}
        </g>
      ))}
    </svg>
  );
}
