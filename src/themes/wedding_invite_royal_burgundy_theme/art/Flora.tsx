import { rng } from '../lib/rng';

/** Marigold bloom (layered petals). */
export function Marigold({ x, y, r, yellow = false }: { x: number; y: number; r: number; yellow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={`url(#${yellow ? 'rbMariY' : 'rbMari'})`} stroke="#B8561A" strokeWidth=".6" />
      <circle r={r * 0.62} fill="none" stroke="#B8561A" strokeWidth=".6" opacity=".6" strokeDasharray="2 2" />
      <circle r={r * 0.22} fill="#C25A12" opacity=".8" />
    </g>
  );
}

/** Garland swag between two points: marigolds along a quadratic curve with leaf accents. */
export function Garland({ x1, y1, x2, y2, sag = 24, n = 14, r = 7, seed = 1 }: { x1: number; y1: number; x2: number; y2: number; sag?: number; n?: number; r?: number; seed?: number }) {
  const rnd = rng(seed);
  const cx = (x1 + x2) / 2, cy = Math.max(y1, y2) + sag;
  return (
    <g className="rb-sway">
      <path d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`} fill="none" stroke="#2F6B2E" strokeWidth="2" />
      {Array.from({ length: n + 1 }, (_, i) => {
        const t = i / n, u = 1 - t;
        const x = u * u * x1 + 2 * u * t * cx + t * t * x2, y = u * u * y1 + 2 * u * t * cy + t * t * y2;
        return <g key={i}><ellipse cx={x} cy={y + r * 0.7} rx={r * 0.5} ry={r * 0.9} fill="url(#rbLeaf)" transform={`rotate(${(rnd() - 0.5) * 60} ${x} ${y})`} /><Marigold x={x} y={y} r={r * (0.9 + rnd() * 0.2)} yellow={i % 3 === 1} /></g>;
      })}
    </g>
  );
}

/** Vertical hanging flower string with tassel. */
export function FlowerString({ className = '', length = 260, white = false, delay = 0 }: { className?: string; length?: number; white?: boolean; delay?: number }) {
  const n = Math.floor(length / 15);
  return (
    <svg viewBox={`0 0 40 ${length + 54}`} className={`rb-hang ${className}`} style={{ animationDelay: `${delay}s` }} aria-hidden="true" focusable="false">
      <line x1="20" y1="0" x2="20" y2={length} stroke="#2F6B2E" strokeWidth="1.6" />
      {Array.from({ length: n }, (_, i) => white
        ? <g key={i}><circle cx="20" cy={10 + i * 15} r="8" fill="#FFF6E2" stroke="#D9B88E" strokeWidth=".7" /><circle cx="20" cy={10 + i * 15} r="2.6" fill="#D9A93C" /></g>
        : <Marigold key={i} x={20} y={10 + i * 15} r={7.5} yellow={i % 3 === 1} />)}
      <path d={`M20 ${length} l-9 34 h18z`} fill="url(#rbGold)" opacity=".9" />
      <path d={`M14 ${length + 34} v14M20 ${length + 34} v18M26 ${length + 34} v14`} stroke="#D95A8A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Marigold torana running across the top of a section (stretches to width). */
export function MarigoldTorana({ className = '' }: { className?: string }) {
  const rnd = rng(7);
  return (
    <svg viewBox="0 0 1000 96" preserveAspectRatio="xMidYMin slice" className={className} aria-hidden="true" focusable="false">
      <path d="M0 22Q125 54 250 22T500 22T750 22T1000 22" fill="none" stroke="#2F6B2E" strokeWidth="3" />
      {Array.from({ length: 56 }, (_, i) => { const x = i * 18 + 4; const y = 22 + Math.sin((x / 250) * Math.PI * 2 - Math.PI / 2) * 16 + 16; return <g key={i}><ellipse cx={x} cy={y + 10} rx="5" ry="10" fill="url(#rbLeaf)" transform={`rotate(${(rnd() - 0.5) * 70} ${x} ${y})`} /><Marigold x={x} y={y} r={9 + rnd() * 2} yellow={i % 3 === 0} /></g>; })}
      {[80, 250, 420, 590, 760, 930].map((x, i) => <g key={x} className="rb-sway" style={{ animationDelay: `${i * 0.4}s` }}>{Array.from({ length: 4 }, (_, j) => <Marigold key={j} x={x} y={52 + j * 11 + (i % 2) * 4} r={5} yellow={j % 2 === 1} />)}</g>)}
    </svg>
  );
}

/** Banana leaf. */
export function BananaLeaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 260" className={className} aria-hidden="true" focusable="false">
      <path d="M60 256C52 180 6 120 22 8c40 28 84 90 38 248z" fill="url(#rbLeaf)" />
      <path d="M60 256C58 180 52 90 22 8" stroke="#E9F6C9" strokeWidth="2.4" fill="none" opacity=".8" />
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${57 - i * 2.4} ${240 - i * 19}L${12 + i * 3.2} ${230 - i * 19}`} stroke="#E9F6C9" strokeWidth="1" opacity=".5" />)}
    </svg>
  );
}

/** Cream peony / jasmine bloom cluster for corners (after reference 6). */
export function Peony({ className = '', tone = 'cream' }: { className?: string; tone?: 'cream' | 'rose' }) {
  const f = tone === 'cream' ? 'url(#rbPeony)' : 'url(#rbRose)';
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden="true" focusable="false">
      <path d="M70 200C50 150 10 130 4 100c40-4 70 24 66 100zM150 210c10-50 50-76 66-86-40-12-72 20-66 86z" fill="#7B3F63" opacity=".85" />
      {[[110, 100, 70], [52, 62, 44], [170, 66, 40], [58, 150, 36], [166, 150, 38]].map(([x, y, r], k) => (
        <g key={k} transform={`translate(${x} ${y})`}>
          {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="0" cy={-r * 0.45} rx={r * 0.38} ry={r * 0.55} fill={f} stroke="#CFA97A" strokeWidth=".8" transform={`rotate(${i * 45})`} />)}
          {Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx="0" cy={-r * 0.25} rx={r * 0.26} ry={r * 0.36} fill={f} stroke="#CFA97A" strokeWidth=".6" transform={`rotate(${i * 60 + 20})`} />)}
          <circle r={r * 0.12} fill="#E8B96A" />
        </g>
      ))}
    </svg>
  );
}

/** Hanging greenery curtain with tiny blossoms (after reference 3). */
export function HangingGreens({ className = '' }: { className?: string }) {
  const rnd = rng(11);
  const strands = Array.from({ length: 26 }, (_, i) => ({ x: 20 + i * 38 + rnd() * 16, len: 60 + rnd() * 190, i }));
  return (
    <svg viewBox="0 0 1000 280" preserveAspectRatio="xMidYMin slice" className={className} aria-hidden="true" focusable="false">
      {strands.map((s) => (
        <g key={s.i} className="rb-sway" style={{ animationDelay: `${s.i * 0.2}s`, transformOrigin: `${s.x}px 0px` }}>
          <line x1={s.x} y1="0" x2={s.x} y2={s.len} stroke="#5E8F3E" strokeWidth="1.4" />
          {Array.from({ length: Math.floor(s.len / 11) }, (_, k) => {
            const y = 8 + k * 11, side = k % 2 ? 1 : -1;
            return k % 3 === 0 ? <circle key={k} cx={s.x + side * 4} cy={y} r="4.4" fill="#FFF8EA" stroke="#D9D2B0" strokeWidth=".5" /> : <ellipse key={k} cx={s.x + side * 5} cy={y} rx="6" ry="2.6" fill="#7DB84A" transform={`rotate(${side * 25} ${s.x} ${y})`} />;
          })}
        </g>
      ))}
    </svg>
  );
}

/** Hanging white-rose ball on a ribbon (after reference 3). */
export function FlowerBall({ className = '', drop = 120 }: { className?: string; drop?: number }) {
  const rnd = rng(23);
  return (
    <svg viewBox={`0 0 120 ${drop + 120}`} className={`rb-hang ${className}`} aria-hidden="true" focusable="false">
      <path d={`M60 0V${drop}`} stroke="#E4DCC4" strokeWidth="3" />
      <g transform={`translate(60 ${drop + 50})`}>
        <circle r="52" fill="#E8F0D8" />
        {Array.from({ length: 22 }, (_, i) => { const a = rnd() * 6.28, d = rnd() * 38; return <g key={i} transform={`translate(${Math.cos(a) * d} ${Math.sin(a) * d})`}><circle r="13" fill="#FFFDF6" stroke="#D8D2BE" strokeWidth=".7" /><circle r="7" fill="#F4EEDC" /><circle r="2.2" fill="#E0B94E" /></g>; })}
        {Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx={Math.cos(i * 1.05) * 50} cy={Math.sin(i * 1.05) * 50} rx="10" ry="4" fill="#6FA146" transform={`rotate(${i * 60} ${Math.cos(i * 1.05) * 50} ${Math.sin(i * 1.05) * 50})`} />)}
      </g>
    </svg>
  );
}

/** Floral arch of roses, blooms and leaves (after reference 3). */
export function FloralArch({ className = '' }: { className?: string }) {
  const rnd = rng(5);
  const blooms = Array.from({ length: 70 }, (_, i) => {
    const t = i / 69, a = Math.PI * (1 - t);
    const r = 150 + (rnd() - 0.5) * 26;
    const isLeg = t < 0.12 || t > 0.88;
    return { x: 200 + r * Math.cos(a), y: 190 - r * Math.sin(a) * 1.05 + (isLeg ? 0 : 0), s: 9 + rnd() * 9, k: i % 5 };
  });
  const cols = ['url(#rbRose)', 'url(#rbPeony)', '#FFFDF6', 'url(#rbPeony)', 'url(#rbRose)'];
  return (
    <svg viewBox="0 0 400 260" className={className} aria-hidden="true" focusable="false">
      {blooms.map((b, i) => <ellipse key={`l${i}`} cx={b.x + (i % 2 ? 9 : -9)} cy={b.y + 4} rx="14" ry="6" fill={i % 2 ? '#4C7F36' : '#7DB84A'} transform={`rotate(${i * 37} ${b.x} ${b.y})`} />)}
      {blooms.map((b, i) => <g key={i}><circle cx={b.x} cy={b.y} r={b.s} fill={cols[b.k]} stroke="#C99A78" strokeWidth=".6" /><circle cx={b.x} cy={b.y} r={b.s * 0.55} fill="none" stroke="#C99A78" strokeWidth=".6" opacity=".7" /></g>)}
    </svg>
  );
}

/** Lotus flower for foregrounds. */
export function Lotus({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="80" rx="58" ry="10" fill="url(#rbLeaf)" opacity=".9" />
      {[-60, -32, 0, 32, 60].map((r, i) => <path key={i} d="M60 74C44 56 46 24 60 8c14 16 16 48 0 66z" fill="url(#rbRose)" stroke="#C0707A" strokeWidth=".8" transform={`rotate(${r} 60 74)`} opacity={i === 2 ? 1 : 0.92} />)}
    </svg>
  );
}
