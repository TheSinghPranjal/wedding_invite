import type { CSSProperties } from 'react';
import { rng } from '../lib/rng';
import { Rose, Leaf, GoldStar, GeometricFloralFrame } from './Orbit';

type P = { className?: string; style?: CSSProperties };

/** Scalloped rounded-rectangle outline (lobes on every side) used for invitation panels. */
export function scallopRectPath(w: number, h: number, nx = 5, ny = 8, inset = 14): string {
  const x0 = inset, y0 = inset, x1 = w - inset, y1 = h - inset;
  const sx = (x1 - x0) / nx, sy = (y1 - y0) / ny;
  const rx = sx * 0.62, ry = sy * 0.62;
  let d = `M${x0} ${y0}`;
  for (let i = 0; i < nx; i++) d += ` A${rx} ${rx} 0 0 1 ${x0 + (i + 1) * sx} ${y0}`;
  for (let i = 0; i < ny; i++) d += ` A${ry} ${ry} 0 0 1 ${x1} ${y0 + (i + 1) * sy}`;
  for (let i = 0; i < nx; i++) d += ` A${rx} ${rx} 0 0 1 ${x1 - (i + 1) * sx} ${y1}`;
  for (let i = 0; i < ny; i++) d += ` A${ry} ${ry} 0 0 1 ${x0} ${y1 - (i + 1) * sy}`;
  return d + 'Z';
}

/** Tall raspberry plaque with scalloped crown, lobed sides and pointed top and bottom. */
export function RaspberryPlaque({ className, style }: P) {
  return (
    <svg viewBox="0 0 300 520" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M150 6C160 36 196 58 226 60C264 52 296 82 272 120C262 134 268 144 276 154V366C268 376 262 388 272 400C296 438 264 468 226 460C196 462 160 484 150 514C140 484 104 462 74 460C36 468 4 438 28 400C38 388 32 376 24 366V154C32 144 38 134 28 120C4 82 36 52 74 60C104 58 140 36 150 6Z" fill="url(#bpRasp)" />
      <path d="M150 20C158 44 192 66 224 70M150 20C142 44 108 66 76 70" stroke="#fff" strokeOpacity=".16" fill="none" />
    </svg>
  );
}

/** White line-art flower (draws itself via .bp-draw). */
export function LineFlower({ className, style }: P) {
  return (
    <svg viewBox="0 0 140 130" className={className} style={style} fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <g>
        <path className="bp-draw" d="M70 66C48 52 24 40 8 44C14 58 34 72 56 76" /><path className="bp-draw" d="M70 66C60 40 54 18 62 4C80 14 90 40 78 64" /><path className="bp-draw" d="M72 68C96 52 124 44 134 52C126 70 100 78 76 74" /><path className="bp-draw" d="M70 70C48 82 28 104 36 124C54 122 72 98 74 76" /><path className="bp-draw" d="M72 72C86 90 106 106 122 104C122 88 102 74 78 70" />
        <path className="bp-draw" d="M70 68C68 84 66 96 70 108" /><path className="bp-draw" d="M66 68C60 54 62 40 68 30M74 66C82 54 88 44 94 40" />
      </g>
      <g strokeWidth="1.1"><path className="bp-draw" d="M70 66L60 52M70 66L72 48M70 66L84 54M70 66L58 74" /><circle className="bp-draw" cx="60" cy="52" r="1.6" /><circle className="bp-draw" cx="72" cy="48" r="1.6" /><circle className="bp-draw" cx="84" cy="54" r="1.6" /></g>
    </svg>
  );
}

/** Pink peacock (or teal, for the wedding scene) with a floral tail. Faces right; mirror with scaleX(-1). */
export function Peacock({ className, style, tone = 'pink' }: P & { tone?: 'pink' | 'teal' }) {
  const r = rng(tone === 'pink' ? 5 : 9);
  const body = tone === 'pink' ? 'url(#bpPink)' : 'url(#bpTeal)';
  const dots = Array.from({ length: 26 }, () => ({ x: 22 + r() * 90, y: 160 + r() * 160, s: 4 + r() * 5, c: ['#E8956A', '#D87A9E', '#F2C14E', '#E7A2B8'][Math.floor(r() * 4)] }));
  return (
    <svg viewBox="0 0 200 340" className={className} style={style} aria-hidden="true" focusable="false">
      <g className="bp-sway" style={{ transformOrigin: '90px 150px' }}>
        <path d="M82 150C44 192 18 262 30 332C64 322 100 252 110 172Z" fill="url(#bpPeaGreen)" /><path d="M98 156C72 210 58 280 74 336C104 304 122 240 124 170Z" fill="url(#bpOlive)" />
        {dots.map((d, i) => <g key={i}><circle cx={d.x} cy={d.y} r={d.s} fill={d.c} opacity=".92" /><circle cx={d.x} cy={d.y} r={d.s * 0.35} fill="#fff" opacity=".35" /></g>)}
      </g>
      <ellipse cx="86" cy="164" rx="34" ry="13" fill="#9C9AC4" />
      <ellipse cx="110" cy="122" rx="48" ry="34" transform="rotate(-20 110 122)" fill={body} />
      {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${86 + (i % 6) * 12} ${104 + Math.floor(i / 6) * 14}a6 5 0 0 1 10 0`} stroke="#fff" strokeOpacity=".45" strokeWidth="1.4" fill="none" />)}
      <path d="M124 104C158 88 166 58 152 38C146 28 136 26 130 30" stroke="url(#bpPeaGreen)" strokeWidth="20" fill="none" strokeLinecap="round" />
      <circle cx="128" cy="30" r="11" fill={body} /><circle cx="124" cy="29" r="3" fill="#6EB7D8" /><circle cx="124" cy="29" r="1.2" fill="#123" /><path d="M118 33l-10 4 10 2z" fill="#C3A16C" />
      <path d="M128 20l-4-14M132 19l2-15M136 22l8-12" stroke="#B87D91" strokeWidth="1.4" /><circle cx="123" cy="6" r="2.2" fill="#D87A9E" /><circle cx="134" cy="4" r="2.2" fill="#D87A9E" /><circle cx="144" cy="10" r="2.2" fill="#D87A9E" />
    </svg>
  );
}

/** Magnolia bloom. */
export function Magnolia({ x, y, r, rot = 0 }: { x: number; y: number; r: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {[-62, -32, 0, 32, 62].map((a, i) => <path key={i} transform={`rotate(${a})`} d={`M0 0C${r * 0.3} ${-r * 0.2} ${r * 0.34} ${-r * 0.8} 0 ${-r}C${-r * 0.34} ${-r * 0.8} ${-r * 0.3} ${-r * 0.2} 0 0Z`} fill="url(#bpMag)" stroke="#D58BA8" strokeWidth={r * 0.02} opacity={0.96} />)}
      {[-62, -32, 0, 32, 62].map((a, i) => <path key={`s${i}`} transform={`rotate(${a})`} d={`M0 ${-r * 0.1}C${r * 0.04} ${-r * 0.4} ${r * 0.04} ${-r * 0.7} 0 ${-r * 0.9}`} stroke="#C86A92" strokeWidth={r * 0.04} fill="none" opacity=".75" />)}
      <circle r={r * 0.08} fill="#C98A6B" />
    </g>
  );
}

/** Flowering magnolia branch for the lower sides. Grows from the left edge; mirror for the right. */
export function MagnoliaBranch({ className, style }: P) {
  return (
    <svg viewBox="0 0 200 300" className={className} style={style} aria-hidden="true" focusable="false">
      <g className="bp-sway" style={{ transformOrigin: '0 300px' }}>
        <path d="M0 290C30 240 40 180 70 130C84 106 96 80 110 56M40 210C70 200 96 176 120 170M60 160C40 140 26 120 24 90" stroke="#6B4A44" strokeWidth="3" fill="none" strokeLinecap="round" />
        <Magnolia x={110} y={50} r={26} rot={10} /><Magnolia x={130} y={170} r={34} rot={-20} /><Magnolia x={30} y={92} r={22} rot={-30} /><Magnolia x={62} y={236} r={28} rot={20} />
        <ellipse cx="90" cy="108" rx="8" ry="14" fill="url(#bpMag)" stroke="#D58BA8" transform="rotate(30 90 108)" /><ellipse cx="48" cy="150" rx="7" ry="13" fill="#E4A1BC" transform="rotate(-20 48 150)" />
        <Leaf x={70} y={130} len={26} rot={-30} fill="url(#bpSage)" /><Leaf x={44} y={210} len={24} rot={20} fill="url(#bpSage)" />
      </g>
    </svg>
  );
}

/** Watercolor rose corner arrangement (top-left orientation; flip with transforms). */
export function RoseCorner({ className, style, tone = 'rose' }: P & { tone?: 'rose' | 'coral' }) {
  const fill = tone === 'coral' ? 'url(#bpMari)' : 'url(#bpRose)';
  const r = rng(tone === 'coral' ? 31 : 12);
  return (
    <svg viewBox="0 0 220 220" className={className} style={style} aria-hidden="true" focusable="false">
      {[[150, 40, 30, -60], [118, 96, 36, -100], [66, 128, 30, -140], [40, 176, 26, -160], [176, 100, 24, -70]].map(([x, y, l, a], i) => <Leaf key={i} x={x} y={y} len={l + 26} rot={a} fill={i % 2 ? 'url(#bpOlive)' : 'url(#bpLeaf)'} />)}
      <path d="M20 180C60 150 90 130 120 100M120 100C140 80 160 60 190 52" stroke="#6B7F4A" strokeWidth="2" fill="none" />
      {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={60 + r() * 120} cy={90 + r() * 100} r={2.6} fill={i % 2 ? '#D87962' : '#B84C6C'} />)}
      <Rose x={62} y={64} r={52} fill={fill} rot={12} /><Rose x={150} y={36} r={30} fill={fill} rot={80} /><Rose x={40} y={152} r={30} fill={fill} rot={-30} />
    </svg>
  );
}

/** Pink hanging blossom string. */
export function PinkString({ className, length = 200, delay = 0 }: { className?: string; length?: number; delay?: number }) {
  const n = Math.floor(length / 22);
  return (
    <svg viewBox={`0 0 50 ${length + 20}`} className={`bp-hang ${className ?? ''}`} style={{ animationDelay: `${delay}s` }} aria-hidden="true" focusable="false">
      <line x1="25" y1="0" x2="25" y2={length} stroke="#7E8E69" strokeWidth="1.2" />
      {Array.from({ length: n }, (_, i) => <g key={i}><Leaf x={25} y={16 + i * 22} len={14} rot={i % 2 ? 20 : 160} fill="url(#bpSage)" />{Array.from({ length: 5 }, (_, k) => <ellipse key={k} cx="25" cy={16 + i * 22 - 6} rx="4.4" ry="6" fill="#E7A2B8" stroke="#C77589" strokeWidth=".4" transform={`rotate(${k * 72} 25 ${16 + i * 22})`} />)}<circle cx="25" cy={16 + i * 22} r="2.4" fill="#F2C14E" /></g>)}
    </svg>
  );
}

/** Fine gold line-art couple holding hands. Paths carry .bp-draw (ordered head to toe). `tint` washes the clothing. */
export function LineCouple({ className, style, tint, only, stroke = 'url(#bpGold)' }: P & { tint?: { groom?: string; bride?: string }; only?: 'bride' | 'groom'; stroke?: string }) {
  const hem = Array.from({ length: 10 }, () => 'a5 5 0 0 0 10 0').join(' ');
  const groom = (
    <g>
      <path className="bp-draw" d="M70 62C68 44 84 34 98 40C110 46 112 60 108 72L112 80L106 82L106 90C106 98 98 102 90 100L88 108" />
      <path className="bp-draw" d="M70 62C70 44 90 34 104 44C98 48 80 50 72 62" /><path className="bp-draw" d="M88 106V118M100 100V116" />
      <path className="bp-draw" d="M66 124C76 116 88 116 94 118C100 116 112 116 124 124" />
      <path className="bp-draw" d="M66 124C60 150 62 200 62 250H128C128 200 130 150 124 124" fill={tint?.groom ?? 'none'} fillOpacity=".45" />
      <path className="bp-draw" d="M95 118V250M88 118L95 132L102 118" />{[140, 162, 184, 206, 228].map((y) => <circle key={y} className="bp-draw" cx="95" cy={y} r="1.8" />)}
      <path className="bp-draw" d="M70 126L84 250M118 126L112 250" strokeDasharray="3 3" />
      <path className="bp-draw" d="M124 130C140 150 150 180 156 204M112 134C126 156 134 180 140 208" />
      <path className="bp-draw" d="M64 250L66 384H98L100 270L108 384H128L128 250" /><path className="bp-draw" d="M62 384H100L102 392H58ZM106 384H130L132 392H104Z" />
    </g>
  );
  const bride = (
    <g>
      <path className="bp-draw" d="M200 40C186 40 176 52 178 66L170 74L178 78L178 86C180 94 188 96 196 92" /><path className="bp-draw" d="M196 34C220 34 232 56 230 90L236 190M196 34C186 36 180 44 180 56" />
      <path className="bp-draw" d="M220 52C230 80 228 140 236 196" strokeDasharray="2 3" />
      <path className="bp-draw" d="M176 112C190 106 206 106 218 112L222 170H178Z" />
      <path className="bp-draw" d="M178 120C170 150 164 180 160 204M188 124C180 150 174 180 170 206" />
      <path className="bp-draw" d="M140 208C146 204 156 204 160 210M144 214C150 220 158 218 162 212" />
      <path className="bp-draw" d="M178 170L150 380H250L222 170" fill={tint?.bride ?? 'none'} fillOpacity=".45" />
      <path className="bp-draw" d={`M150 380${hem}`} /><path className="bp-draw" d="M162 300H238M156 340H244" />{Array.from({ length: 8 }, (_, i) => <path key={i} className="bp-draw" d={`M${172 + i * 10} 320c3 4 3 8 0 10-3-2-3-6 0-10z`} />)}
      <path className="bp-draw" d="M222 120C240 160 244 260 252 376" />
    </g>
  );
  const vb = only === 'bride' ? '140 20 120 400' : only === 'groom' ? '40 20 130 400' : '30 20 230 400';
  return (
    <svg viewBox={vb} className={className} style={style} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {only !== 'bride' && groom}{only !== 'groom' && bride}
    </svg>
  );
}

/** Fine-line mandap (pillars, dome, scalloped valance, garland swags). */
export function LineMandap({ className, style }: P) {
  return (
    <svg viewBox="0 0 300 300" className={className} style={style} fill="none" stroke="url(#bpGold)" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path className="bp-draw" d="M20 286H280M34 276H266" />
      <path className="bp-draw" d="M44 276V110M62 276V110M238 276V110M256 276V110M96 276V122M204 276V122" />
      <path className="bp-draw" d="M36 110H70M230 110H264M88 122H104M196 122H212" />
      <path className="bp-draw" d="M40 108C44 60 96 34 150 14C204 34 256 60 260 108Z" />
      {[-60, -36, -12, 12, 36, 60].map((k) => <path key={k} className="bp-draw" d={`M150 14C${150 + k} 44 ${150 + k * 1.5} 80 ${150 + k * 1.9} 108`} />)}
      <path className="bp-draw" d="M146 14V2M154 14V2" />
      <path className="bp-draw" d={`M40 108${Array.from({ length: 11 }, () => 'a10 10 0 0 0 20 0').join(' ')}`} />
      <path className="bp-draw" d="M46 134C80 172 120 172 150 140C180 172 220 172 254 134" strokeDasharray="1 6" strokeWidth="3" />
      {[70, 130, 170, 230].map((x) => <path key={x} className="bp-draw" d={`M${x} 140V${170 + (x % 3) * 8}`} strokeDasharray="1 5" strokeWidth="3" />)}
    </svg>
  );
}

/** Watercolor marigold bloom. */
export function MarigoldBloom({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx="0" cy={-r * 0.55} rx={r * 0.22} ry={r * 0.45} fill={i % 2 ? 'url(#bpMariY)' : 'url(#bpMari)'} stroke="#D98A2A" strokeWidth={r * 0.015} transform={`rotate(${i * 25.7})`} />)}
      <circle r={r * 0.32} fill="url(#bpMari)" stroke="#C7701A" strokeWidth={r * 0.02} /><circle r={r * 0.12} fill="#C7701A" opacity=".7" />
    </g>
  );
}

/** Arch of watercolor roses and leaves (reception). */
export function RoseArch({ className, style }: P) {
  const r = rng(8);
  const pts = Array.from({ length: 34 }, (_, i) => { const t = i / 33, a = Math.PI * (1 - t); const rad = 150 + (r() - 0.5) * 22; return { x: 200 + rad * Math.cos(a), y: 230 - rad * Math.sin(a) * 1.1, s: 14 + r() * 12, k: i % 3 }; });
  return (
    <svg viewBox="0 0 400 260" className={className} style={style} aria-hidden="true" focusable="false">
      {pts.map((p, i) => <Leaf key={`l${i}`} x={p.x} y={p.y} len={34} rot={i * 47} fill={i % 2 ? 'url(#bpSage)' : 'url(#bpLeaf)'} />)}
      {pts.map((p, i) => <Rose key={i} x={p.x} y={p.y} r={p.s} fill={p.k === 0 ? 'url(#bpBlushR)' : p.k === 1 ? 'url(#bpRose)' : 'url(#bpRoseD)'} rot={i * 33} />)}
    </svg>
  );
}

/** Overlapping R + P monogram with a small watercolor flower at the intersection. */
export function CoupleMonogram({ className, style, letters = ['R', 'P'] }: P & { letters?: [string, string] }) {
  return (
    <svg viewBox="0 0 320 300" className={className} style={style} role="img" aria-label={`${letters[0]} and ${letters[1]} monogram`}>
      <g className="bp-mono-r"><text x="40" y="236" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="400" fontSize="240" fill="#C0657E">{letters[0]}</text></g>
      <g className="bp-mono-p"><text x="142" y="236" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="400" fontSize="240" fill="#7E8E69" opacity=".95">{letters[1]}</text></g>
      <g className="bp-mono-flower" style={{ transformOrigin: '160px 150px', transformBox: 'view-box' }}>
        <Rose x={160} y={152} r={26} fill="url(#bpBlushR)" rot={20} /><Leaf x={168} y={174} len={26} rot={70} fill="url(#bpSage)" /><Leaf x={152} y={174} len={22} rot={110} fill="url(#bpSage)" />
      </g>
    </svg>
  );
}

export { GoldStar, GeometricFloralFrame };
