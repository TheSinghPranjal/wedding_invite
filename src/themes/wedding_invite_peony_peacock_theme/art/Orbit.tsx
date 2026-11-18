import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { useMedia } from '../hooks/useMedia';

const TAU = Math.PI * 2;
const pt = (r: number, a: number): [number, number] => [r * Math.sin(a), -r * Math.cos(a)];
const spin = (dur: number, dir: 1 | -1): CSSProperties => ({ ['--dur' as string]: `${dur}s`, ['--dir' as string]: dir });

/** Small gold starburst. */
export function GoldStar({ x = 0, y = 0, r = 10, className = '', fill = 'url(#bpGold)' }: { x?: number; y?: number; r?: number; className?: string; fill?: string }) {
  const p = Array.from({ length: 16 }, (_, i) => { const [px, py] = pt(i % 2 ? r * 0.28 : r, (i * TAU) / 16); return `${px + x},${py + y}`; }).join(' ');
  return <polygon className={className} points={p} fill={fill} />;
}

export function Leaf({ x, y, len, rot, fill = 'url(#bpLeaf)' }: { x: number; y: number; len: number; rot: number; fill?: string }) {
  return <path transform={`translate(${x} ${y}) rotate(${rot})`} d={`M0 0C${len * 0.35} ${-len * 0.25} ${len * 0.75} ${-len * 0.2} ${len} 0C${len * 0.75} ${len * 0.2} ${len * 0.35} ${len * 0.25} 0 0Z`} fill={fill} stroke="#5C7048" strokeWidth=".4" />;
}

/** Watercolor-style rose: layered petal rings with a swirl. */
export function Rose({ x, y, r, fill = 'url(#bpRose)', rot = 0 }: { x: number; y: number; r: number; fill?: string; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <circle r={r} fill={fill} stroke="#B9788A" strokeWidth={r * 0.03} />
      {[0.82, 0.62, 0.42].map((k, i) => <path key={i} d={`M${-r * k} 0A${r * k} ${r * k} 0 1 1 ${r * k * 0.2} ${r * k * 0.96}`} fill="none" stroke={i % 2 ? '#FFF4F2' : '#B9788A'} strokeWidth={r * 0.05} strokeLinecap="round" opacity=".8" />)}
      <path d={`M${-r * 0.2} ${-r * 0.1}q${r * 0.25} ${-r * 0.3} ${r * 0.4} ${r * 0.05}`} stroke="#9A4C62" strokeWidth={r * 0.05} fill="none" strokeLinecap="round" />
      <path d={`M${-r * 0.6} ${-r * 0.5}q${r * 0.3} ${-r * 0.4} ${r * 0.7} ${-r * 0.3}`} stroke="#fff" strokeWidth={r * 0.06} fill="none" opacity=".6" strokeLinecap="round" />
    </g>
  );
}

/** Six-petal outline flower (lace motifs). */
const Lace6 = ({ r = 10 }: { r?: number }) => (
  <g>{Array.from({ length: 6 }, (_, i) => <path key={i} transform={`rotate(${i * 60})`} d={`M0 ${-r * 0.2}C${r * 0.5} ${-r * 0.5} ${r * 0.5} ${-r * 0.9} 0 ${-r}C${-r * 0.5} ${-r * 0.9} ${-r * 0.5} ${-r * 0.5} 0 ${-r * 0.2}Z`} />)}<circle r={r * 0.16} /></g>
);

/** Thin antique-gold geometric frame with tiny flowers at its corners. */
export function GeometricFloralFrame({ className = '' }: { className?: string }) {
  const poly = (n: number, r: number, off = 0) => Array.from({ length: n }, (_, i) => pt(r, off + (i * TAU) / n));
  const hex = poly(6, 84);
  return (
    <g className={className} fill="none" stroke="url(#bpGold)" strokeWidth=".9">
      <circle r="98" /><circle r="94" strokeDasharray="1 3" strokeWidth="1.5" />
      <polygon points={hex.map((p) => p.join(',')).join(' ')} /><polygon points={poly(6, 84, Math.PI / 6).map((p) => p.join(',')).join(' ')} opacity=".75" /><polygon points={poly(8, 74).map((p) => p.join(',')).join(' ')} opacity=".6" />
      {hex.map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`} stroke="url(#bpGold)"><Lace6 r={7} /></g>)}
    </g>
  );
}

export function Starburst({ r = 100 }: { r?: number }) {
  return (
    <g stroke="url(#bpGold)" strokeWidth=".7" fill="none">
      {Array.from({ length: 32 }, (_, i) => { const a = (i * TAU) / 32; const [x1, y1] = pt(r * 0.58, a); const [x2, y2] = pt(r * (i % 2 ? 0.8 : 0.98), a); return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />; })}
      <circle r={r * 0.58} />
    </g>
  );
}

export type OrbitKind = 'lace' | 'rose' | 'wreath' | 'peony' | 'gold' | 'medallion' | 'star' | 'henna';

/** Rose wreath ring: roses with leaves in between. */
function WreathRing({ r = 74, n = 10, fill = 'url(#bpRose)', size = 11 }: { r?: number; n?: number; fill?: string; size?: number }) {
  return (
    <g>
      <circle r={r} fill="none" stroke="#7E8E69" strokeWidth=".8" opacity=".7" />
      {Array.from({ length: n }, (_, i) => { const a = (i * TAU) / n; const [x, y] = pt(r, a); const [lx, ly] = pt(r, a + TAU / n / 2); return <g key={i}><Leaf x={lx} y={ly} len={16} rot={(a * 180) / Math.PI} /><Leaf x={lx} y={ly} len={13} rot={(a * 180) / Math.PI + 180} fill="url(#bpSage)" /><Rose x={x} y={y} r={size} fill={fill} rot={i * 31} /></g>; })}
    </g>
  );
}

/**
 * Delicate circular ornament, three counter-rotating layers: thin lace / geometric outer border, repeating floral middle ring,
 * botanical petal inner ring, plus a small rosette at the centre.
 * `lace` / `rose` / `henna` draw in currentColor (white on pink backgrounds); `wreath` / `peony` use filled blooms; `gold` / `star` / `medallion` are geometric line-work.
 */
export function FloralOrbit({ kind = 'lace', className = '', speed = 1, style }: { kind?: OrbitKind; className?: string; speed?: number; style?: CSSProperties }) {
  const tone = kind === 'peony' ? 'url(#bpMari)' : kind === 'wreath' ? 'url(#bpRoseD)' : 'url(#bpRose)';
  const lace = kind === 'lace' || kind === 'rose' || kind === 'henna';
  return (
    <svg viewBox="-110 -110 220 220" className={`bp-orbit ${className}`} style={style} aria-hidden="true" focusable="false">
      <g className="bp-ring" style={spin(140 / speed, 1)}>
        {kind === 'gold' || kind === 'star' || kind === 'medallion' ? (kind === 'star' ? <Starburst /> : <GeometricFloralFrame />) : (
          <g fill="none" stroke="currentColor" strokeWidth=".9">
            <circle r="100" /><circle r="94" strokeDasharray="1.2 3" strokeWidth="1.6" />
            {Array.from({ length: 36 }, (_, i) => <path key={i} transform={`rotate(${i * 10})`} d="M-4 -100A4 4 0 0 1 4 -100" />)}
            {Array.from({ length: 18 }, (_, i) => <path key={`l${i}`} transform={`rotate(${i * 20})`} d="M0 -94C5 -88 5 -82 0 -78C-5 -82 -5 -88 0 -94Z" />)}
          </g>
        )}
      </g>
      {kind !== 'medallion' && (
        <g className="bp-ring" style={spin(90 / speed, -1)}>
          {lace ? (
            <g fill="none" stroke="currentColor" strokeWidth=".9">{Array.from({ length: 12 }, (_, i) => { const [x, y] = pt(68, (i * TAU) / 12); return <g key={i} transform={`translate(${x} ${y}) rotate(${i * 30})`}><Lace6 r={12} /></g>; })}<circle r="80" /><circle r="56" strokeDasharray="1 3" /></g>
          ) : <WreathRing fill={tone} n={kind === 'wreath' ? 12 : 9} size={kind === 'peony' ? 14 : 11} />}
        </g>
      )}
      <g className="bp-ring bp-breathe" style={spin(60 / speed, 1)}>
        <g fill={lace ? 'none' : 'url(#bpBlushR)'} stroke={lace ? 'currentColor' : '#C07F90'} strokeWidth=".8" opacity=".9">
          {Array.from({ length: 12 }, (_, i) => <path key={i} transform={`rotate(${i * 30})`} d="M0 -10C10 -22 10 -34 0 -44C-10 -34 -10 -22 0 -10Z" />)}
        </g>
      </g>
      <g fill="none" stroke={lace ? 'currentColor' : 'url(#bpGold)'} strokeWidth="1"><Lace6 r={13} /><circle r="5" className="bp-pulse" /></g>
      {kind !== 'henna' && [0, 1, 2, 3].map((i) => { const [x, y] = pt(106, (i * TAU) / 4 + 0.4); return <GoldStar key={i} x={x} y={y} r={6} className="bp-twinkle" />; })}
    </svg>
  );
}

/* -------------------------------------------------------------------- orbit system */
export interface OrbitSpec {
  side: 'left' | 'right';
  kind: OrbitKind;
  /** desktop px diameter */
  size: number;
  /** vertical centre, % of the section */
  top: number;
  /** fraction hidden outside the viewport at rest */
  crop: number;
  dir: 1 | -1;
  /** degrees of scroll-driven rotation */
  rotate: number;
  opacity: number;
  /** vertical parallax travel (px) */
  parallax: number;
  /** progress (0-1 of the scene's pass through the viewport) at which the ornament is fully in / starts leaving */
  enter?: number;
  exit?: number;
  scale?: [number, number];
  desktopOnly?: boolean;
}

export const defaultOrbits = (): OrbitSpec[] => [
  { side: 'left', kind: 'lace', size: 520, top: 40, crop: 0.62, dir: 1, rotate: 110, opacity: 0.6, parallax: 120 },
  { side: 'left', kind: 'gold', size: 240, top: 86, crop: 0.5, dir: -1, rotate: 200, opacity: 0.5, parallax: 220, desktopOnly: true },
  { side: 'right', kind: 'wreath', size: 540, top: 64, crop: 0.64, dir: -1, rotate: 100, opacity: 0.6, parallax: 160 },
  { side: 'right', kind: 'star', size: 220, top: 12, crop: 0.5, dir: 1, rotate: 240, opacity: 0.5, parallax: 240, desktopOnly: true },
];

/**
 * Botanical circular ornaments that enter from outside both viewport edges, scale, rotate in opposite directions and
 * fade with the parent section's scroll progress, each layer at its own parallax speed, then exit toward the next scene.
 * Mounted only while near the viewport. Reduced motion: static.
 */
export function SideOrnamentController({ specs, className = '', color }: { specs?: OrbitSpec[]; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const small = useMedia('(max-width: 700px)');
  const list = (specs ?? defaultOrbits()).filter((o) => !(small && o.desktopOnly));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: '60% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(() => {
    if (!live || !ref.current) return;
    const host = ref.current;
    const trigger = host.closest('section') ?? host.parentElement;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.bp-orn', host).forEach((el) => {
        const d = el.dataset;
        const side = d.side === 'left' ? -1 : 1;
        const op = Number(d.op), r = Number(d.rot) * Number(d.dir), par = Number(d.par);
        const enter = Number(d.enter), exit = Number(d.exit);
        const [s0, s1] = (d.scale ?? '0.6,1').split(',').map(Number);
        gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
          .fromTo(el, { xPercent: side * 55, scale: s0, opacity: 0, rotation: 0, y: par }, { xPercent: 0, scale: s1, opacity: op, rotation: r * 0.45, y: 0, duration: enter })
          .to(el, { rotation: r * 0.7, duration: Math.max(0.01, exit - enter) })
          .to(el, { xPercent: side * 40, scale: s1 * 0.85, opacity: op * 0.2, rotation: r, y: -par, duration: Math.max(0.01, 1 - exit) });
      });
    });
    return () => mm.revert();
  }, { scope: ref, dependencies: [live, small] });

  return (
    <div ref={ref} className={`bp-sides ${className}`} style={color ? { color } : undefined} aria-hidden="true">
      {live && list.map((o, i) => (
        <div key={i} className="bp-orn" data-side={o.side} data-op={o.opacity} data-rot={o.rotate} data-dir={o.dir} data-par={o.parallax} data-enter={o.enter ?? 0.4} data-exit={o.exit ?? 0.7} data-scale={(o.scale ?? [0.6, 1]).join(',')}
          style={{ ['--s' as string]: `${o.size}px`, top: `${o.top}%`, [o.side]: `calc(var(--s) * var(--k) * ${-o.crop})`, ['--op' as string]: o.opacity }}>
          <FloralOrbit kind={o.kind} speed={0.8 + i * 0.12} />
        </div>
      ))}
    </div>
  );
}

/** Single decorative ring for in-scene use (e.g. behind monogram / countdown). */
