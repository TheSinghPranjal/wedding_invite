import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Leaf, GoldStar } from './Orbit';
import { Rose } from './Nature';

type P = { className?: string; style?: CSSProperties };

/** Antique-gold diamond-motif border with double inner lines. Sized to its parent in px so GSAP DrawSVG can trace the line work. */
export function DiamondFrame({ strip = 16, className = '' }: { strip?: number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [{ w, h }, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const o = 6, i = o + strip;
  const rect = (m: number) => `M${m} ${m}H${w - m}V${h - m}H${m}Z`;
  return (
    <svg ref={ref} className={className} width={w} height={h} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} fill="none" stroke="url(#epGold)" aria-hidden="true" focusable="false">
      {w > 0 && (<>
        <path d={`${rect(o)} ${rect(i)}`} fill="url(#epDiamond)" fillRule="evenodd" stroke="none" opacity=".95" />
        <path className="ep-draw" d={rect(o)} strokeWidth="1.8" /><path className="ep-draw" d={rect(o + 3)} strokeWidth=".8" />
        <path className="ep-draw" d={rect(i)} strokeWidth="1.8" /><path className="ep-draw" d={rect(i + 4)} strokeWidth=".8" />
      </>)}
    </svg>
  );
}

const Elephant = ({ y }: { y: number }) => (
  <g transform={`translate(15 ${y})`}>
    <path d="M-9 0C-9 -8 -2 -11 5 -9C10 -8 11 -3 9 2L9 8H5V3H-3V8H-7V4C-9 4 -9 2 -9 0Z" fill="url(#epGold)" stroke="#8A6A2A" strokeWidth=".5" />
    <path d="M-9 -3C-14 -2 -14 6 -10 8" stroke="#C6A45D" strokeWidth="2" fill="none" strokeLinecap="round" /><circle cx="-2" cy="-4" r="1.2" fill="#6B4A1A" />
  </g>
);

/** Hanging gold string with elephant charms, beads, bells and a diamond drop. */
export function ElephantString({ className, length = 160, delay = 0, style }: P & { length?: number; delay?: number }) {
  const n = Math.floor(length / 36);
  return (
    <svg viewBox={`0 0 30 ${length + 30}`} className={`ep-hang ${className ?? ''}`} style={{ animationDelay: `${delay}s`, ...style }} aria-hidden="true" focusable="false">
      <line x1="15" y1="0" x2="15" y2={length} stroke="#C6A45D" strokeWidth="1.2" />
      {Array.from({ length: n }, (_, i) => <g key={i}><circle cx="15" cy={10 + i * 36} r="2.6" fill="url(#epGold)" /><Elephant y={26 + i * 36} /></g>)}
      <path d={`M15 ${length - 6}l5 8-5 8-5-8z`} fill="url(#epGold)" /><path d={`M10 ${length + 12}c0-6 3-9 5-9s5 3 5 9z`} fill="url(#epGold)" /><circle cx="15" cy={length + 15} r="1.6" fill="#8A6A2A" />
    </svg>
  );
}

/** Gold paisley & lotus-flower line art for the lower-left corner (draws itself). */
export function GoldFloralLine({ className, style }: P) {
  return (
    <svg viewBox="0 0 180 260" className={className} style={style} fill="none" stroke="url(#epGold)" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path className="ep-draw" d="M6 20C60 10 120 40 150 100C170 140 160 190 120 220C90 242 40 240 6 230" />
      <path className="ep-draw" d="M6 40C50 36 100 60 124 104C140 136 132 176 104 198" />
      {[[56, 150], [100, 120]].map(([x, y], k) => <g key={k} transform={`translate(${x} ${y})`}>{Array.from({ length: 6 }, (_, i) => <path key={i} className="ep-draw" transform={`rotate(${i * 60})`} d="M0 0C-12-10-12-28 0-34C12-28 12-10 0 0Z" />)}<circle className="ep-draw" r="6" /></g>)}
      <path className="ep-draw" d="M30 90C50 80 72 84 80 102C86 118 70 126 60 118C54 112 60 104 68 106" />
      <path className="ep-draw" d="M20 200C44 180 70 190 74 214C76 226 60 232 52 224" />
      {[[40, 60], [120, 70], [140, 150], [30, 130], [80, 210]].map(([x, y], i) => <path key={i} className="ep-draw" d={`M${x} ${y}c8-10 22-6 20 6c-2 10-18 10-20-6z`} />)}
      {Array.from({ length: 14 }, (_, i) => <circle key={`d${i}`} className="ep-draw" cx={20 + i * 10} cy={22 + Math.sin(i) * 8 + i * 5} r="1.6" />)}
    </svg>
  );
}

/** Pink lotus and bell charms on gold chains (dark-heritage scene). */
export function LotusChain({ className, length = 150, delay = 0, bell = false }: P & { length?: number; delay?: number; bell?: boolean }) {
  const n = Math.floor(length / 38);
  return (
    <svg viewBox={`0 0 40 ${length + 30}`} className={`ep-hang ${className ?? ''}`} style={{ animationDelay: `${delay}s` }} aria-hidden="true" focusable="false">
      <line x1="20" y1="0" x2="20" y2={length} stroke="#D5B66A" strokeWidth="1.2" strokeDasharray="2 2" />
      {Array.from({ length: n }, (_, i) => <g key={i} transform={`translate(20 ${20 + i * 38})`}>{i % 2 === 0 ? <><path d="M0 8C-10 2-10-8 0-14C10-8 10 2 0 8Z" fill="url(#epLotus)" stroke="#C97D8C" strokeWidth=".6" /><path d="M-12 6C-12-4-4-6 0 2C4-6 12-4 12 6C6 12-6 12-12 6Z" fill="#E48CA0" /><path d="M-6 10C-6 14 6 14 6 10Z" fill="#4E7A52" /></> : <path d="M0 -6C8-6 8 4 0 10C-8 4-8-6 0 -6Z" fill="url(#epGold)" />}</g>)}
      {bell ? <><path d={`M12 ${length + 10}c0-10 4-16 8-16s8 6 8 16z`} fill="url(#epGold)" /><circle cx="20" cy={length + 14} r="2.4" fill="#8A6A2A" /></> : <path d={`M20 ${length - 4}l7 12-7 12-7-12z`} fill="url(#epGold)" />}
    </svg>
  );
}

/** Minimal Ganesha line-art (head, crown, ears, trunk); `.ep-draw` paths. */
export function GaneshaLine({ className, style, stroke = 'currentColor' }: P & { stroke?: string }) {
  return (
    <svg viewBox="0 0 120 130" className={className} style={style} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path className="ep-draw" d="M60 6l3 8M54 14h12M50 14c0 10 4 14 10 14s10-4 10-14" /><path className="ep-draw" d="M38 38C40 26 80 26 82 38" /><path className="ep-draw" d="M44 30C40 22 44 16 52 18M76 30C80 22 76 16 68 18" />
      <path className="ep-draw" d="M38 40C20 42 10 62 16 80C22 94 36 92 40 82C42 70 40 54 38 40Z" /><path className="ep-draw" d="M82 40C100 42 110 62 104 80C98 94 84 92 80 82C78 70 80 54 82 40Z" />
      <path className="ep-draw" d="M42 40C40 62 46 82 60 86C74 82 80 62 78 40" /><path className="ep-draw" d="M52 56a3 2 0 0 1 6 0M62 56a3 2 0 0 1 6 0" />
      <path className="ep-draw" d="M56 66C54 84 54 100 62 108C72 116 86 108 82 98C78 90 68 94 72 100" /><path className="ep-draw" d="M52 70C42 82 44 98 52 104" />
      <path className="ep-draw" d="M34 96C40 112 50 120 60 122C70 120 80 112 86 96" /><circle className="ep-draw" cx="60" cy="42" r="2" />
    </svg>
  );
}

/** Peaked palace-arch outline in luminous gold (draws itself). */
export function GoldArch({ className, style }: P) {
  return (
    <svg viewBox="0 0 300 560" preserveAspectRatio="none" className={className} style={style} fill="none" stroke="url(#epGold)" aria-hidden="true" focusable="false">
      <path className="ep-draw" d="M10 558V176L150 18L290 176V558" strokeWidth="5" filter="url(#epGlowBlur)" opacity=".5" />
      <path className="ep-draw" d="M10 558V176L150 18L290 176V558" strokeWidth="5" strokeLinejoin="miter" />
      <path className="ep-draw" d="M20 558V180L150 34L280 180V558" strokeWidth=".9" opacity=".8" />
    </svg>
  );
}

/** Four-point gold sparkle. */
export function Sparkle({ className, style }: P) {
  return <svg viewBox="-20 -20 40 40" className={className} style={style} aria-hidden="true" focusable="false"><path d="M0 -18C2 -6 6 -2 18 0C6 2 2 6 0 18C-2 6 -6 2 -18 0C-6 -2 -2 -6 0 -18Z" fill="#fff" opacity=".95" /><circle r="3" fill="#fff" /></svg>;
}

/** Circular floral wedding arch: ring of roses and eucalyptus with soft drapery. */
export function FloralRoundArch({ className, style }: P) {
  const pts = Array.from({ length: 30 }, (_, i) => { const t = i / 29, a = Math.PI * (1 - t) * 1.12 - 0.06; return { x: 150 + 118 * Math.cos(a), y: 150 - 118 * Math.sin(a), i }; });
  return (
    <svg viewBox="0 0 300 300" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M32 280V150C32 84 86 32 150 32C214 32 268 84 268 150V280" stroke="#C9B28A" strokeWidth="8" fill="none" opacity=".7" />
      {pts.map((p) => <Leaf key={`l${p.i}`} x={p.x} y={p.y} len={34} rot={p.i * 41} fill={p.i % 2 ? 'url(#epSage)' : 'url(#epLeaf)'} />)}
      {pts.filter((p) => p.i % 2 === 0).map((p) => <Rose key={p.i} x={p.x} y={p.y} r={13 + (p.i % 3) * 5} fill={p.i % 4 === 0 ? 'url(#epRoseD)' : 'url(#epRose)'} rot={p.i * 30} />)}
      <path d="M150 40C190 36 230 70 236 130C220 100 190 80 150 76Z" fill="#fff" opacity=".78" stroke="#E9E1D2" /><path d="M150 76C180 86 214 120 216 170C200 140 176 118 150 112Z" fill="#F5EFE4" opacity=".7" />
    </svg>
  );
}

export { GoldStar };
