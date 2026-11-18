import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { useMedia } from '../hooks/useMedia';

const TAU = Math.PI * 2;
const pt = (r: number, a: number): [number, number] => [r * Math.sin(a), -r * Math.cos(a)];
const spin = (dur: number, dir: 1 | -1): CSSProperties => ({ ['--dur' as string]: `${dur}s`, ['--dir' as string]: dir });

/** Eight-point gold star. */
export function GoldStar({ x = 0, y = 0, r = 10, className = '', fill = 'url(#tgGold)' }: { x?: number; y?: number; r?: number; className?: string; fill?: string }) {
  const p = Array.from({ length: 16 }, (_, i) => { const [px, py] = pt(i % 2 ? r * 0.28 : r, (i * TAU) / 16); return `${px + x},${py + y}`; }).join(' ');
  return <polygon className={className} points={p} fill={fill} />;
}

/** Pink peony-style bloom. */
export function Bloom({ x, y, r, fill = 'url(#tgPink)', rot = 0, petals = 6 }: { x: number; y: number; r: number; fill?: string; rot?: number; petals?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {Array.from({ length: petals }, (_, i) => <ellipse key={i} cx="0" cy={-r * 0.5} rx={r * 0.42} ry={r * 0.55} fill={fill} stroke="#C25A7C" strokeWidth=".5" opacity=".95" transform={`rotate(${(i * 360) / petals})`} />)}
      {Array.from({ length: petals }, (_, i) => <ellipse key={`b${i}`} cx="0" cy={-r * 0.3} rx={r * 0.26} ry={r * 0.34} fill={fill} stroke="#C25A7C" strokeWidth=".4" transform={`rotate(${(i * 360) / petals + 30})`} />)}
      <circle r={r * 0.12} fill="#E8B96A" />
    </g>
  );
}

export function Leaf({ x, y, len, rot, fill = 'url(#tgSage)' }: { x: number; y: number; len: number; rot: number; fill?: string }) {
  return <path transform={`translate(${x} ${y}) rotate(${rot})`} d={`M0 0C${len * 0.35} ${-len * 0.25} ${len * 0.75} ${-len * 0.2} ${len} 0C${len * 0.75} ${len * 0.2} ${len * 0.35} ${len * 0.25} 0 0Z`} fill={fill} stroke="#4E6B3E" strokeWidth=".4" />;
}

/** Thin gold geometric circular frame (interlaced polygons + beaded rims). */
export function GeoFrame() {
  const poly = (n: number, r: number, off = 0) => Array.from({ length: n }, (_, i) => pt(r, off + (i * TAU) / n).join(',')).join(' ');
  return (
    <g fill="none" stroke="url(#tgGold)" strokeWidth=".8">
      <circle r="96" /><circle r="92" strokeDasharray="1 3" strokeWidth="1.6" />
      <polygon points={poly(6, 86)} /><polygon points={poly(6, 86, Math.PI / 6)} /><polygon points={poly(8, 80)} opacity=".7" />
      {Array.from({ length: 12 }, (_, i) => { const [x, y] = pt(96, (i * TAU) / 12); return <circle key={i} cx={x} cy={y} r="1.8" fill="url(#tgGold)" stroke="none" />; })}
    </g>
  );
}

function LeafyRing({ r = 80, n = 18, berries = true }: { r?: number; n?: number; berries?: boolean }) {
  return (
    <g>
      <circle r={r} fill="none" stroke="#6F8A5A" strokeWidth=".8" opacity=".7" />
      {Array.from({ length: n }, (_, i) => { const a = (i * 360) / n; const [x, y] = pt(r, (a * Math.PI) / 180); return <g key={i}><Leaf x={x} y={y} len={20} rot={a - 60} /><Leaf x={x} y={y} len={16} rot={a - 120} fill={i % 3 ? 'url(#tgSage)' : 'url(#tgLeaf)'} />{berries && i % 3 === 0 && <circle cx={x} cy={y} r="2.6" fill="#8A2A4A" />}</g>; })}
    </g>
  );
}

function FlowerRing({ r = 66, n = 10, fill = 'url(#tgPink)', size = 9 }: { r?: number; n?: number; fill?: string; size?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => { const a = (i * TAU) / n; const [x, y] = pt(r, a); const [lx, ly] = pt(r, a + TAU / n / 2); return <g key={i}><Leaf x={lx} y={ly} len={14} rot={(a * 180) / Math.PI} /><Bloom x={x} y={y} r={size} fill={fill} rot={i * 30} /></g>; })}
    </g>
  );
}

function PetalRing({ r = 40, n = 12, fill = 'url(#tgPink)' }: { r?: number; n?: number; fill?: string }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => <path key={i} transform={`rotate(${(i * 360) / n})`} d={`M0 0C${r * 0.3} ${-r * 0.3} ${r * 0.28} ${-r * 0.8} 0 ${-r}C${-r * 0.28} ${-r * 0.8} ${-r * 0.3} ${-r * 0.3} 0 0Z`} fill={fill} opacity=".72" stroke="#C25A7C" strokeWidth=".4" />)}
    </g>
  );
}

export function Starburst({ r = 100 }: { r?: number }) {
  return (
    <g stroke="url(#tgGold)" strokeWidth=".7" fill="none">
      {Array.from({ length: 32 }, (_, i) => { const a = (i * TAU) / 32; const [x1, y1] = pt(r * 0.58, a); const [x2, y2] = pt(r * (i % 2 ? 0.8 : 0.98), a); return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />; })}
      <circle r={r * 0.58} />
    </g>
  );
}

export type OrbitKind = 'pink' | 'gold' | 'leaf' | 'festive' | 'starburst' | 'medallion' | 'henna' | 'concentric';

/** One concentric botanical ornament: outer ring clockwise, floral middle ring anticlockwise, breathing petals, glowing centre. */
export function BotanicalOrbit({ kind = 'concentric', className = '', speed = 1, style }: { kind?: OrbitKind; className?: string; speed?: number; style?: CSSProperties }) {
  const mid = kind === 'festive' ? 'url(#tgMari)' : kind === 'leaf' ? 'url(#tgPeony)' : 'url(#tgPink)';
  const inner = kind === 'festive' ? 'url(#tgMariY)' : 'url(#tgPink)';
  return (
    <svg viewBox="-110 -110 220 220" className={`tg-orbit ${className}`} style={style} aria-hidden="true" focusable="false">
      <g className="tg-ring" style={spin(130 / speed, 1)}>
        {kind === 'leaf' ? <LeafyRing r={92} n={22} /> : kind === 'starburst' ? <Starburst /> : <GeoFrame />}
      </g>
      {kind !== 'medallion' && <g className="tg-ring" style={spin(85 / speed, -1)}>
        {kind === 'henna' ? <g fill="none" stroke="url(#tgGold)" strokeWidth="1.2">{Array.from({ length: 12 }, (_, i) => <path key={i} transform={`rotate(${i * 30})`} d="M0 -46c10 6 12 18 0 30-12-12-10-24 0-30zM0 -62v-12" />)}</g> : <FlowerRing fill={mid} n={kind === 'pink' ? 12 : 10} />}
      </g>}
      <g className="tg-ring tg-breathe" style={spin(60 / speed, 1)}><PetalRing fill={inner} r={kind === 'medallion' ? 70 : 42} n={kind === 'medallion' ? 16 : 12} /></g>
      <circle r="16" fill="url(#tgGlow)" className="tg-pulse" /><GoldStar r={13} className="tg-twinkle" />
      {kind !== 'henna' && [0, 1, 2, 3].map((i) => { const [x, y] = pt(104, (i * TAU) / 4 + 0.4); return <GoldStar key={i} x={x} y={y} r={7} className="tg-twinkle" />; })}
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
  { side: 'left', kind: 'concentric', size: 520, top: 40, crop: 0.62, dir: 1, rotate: 110, opacity: 0.55, parallax: 120 },
  { side: 'left', kind: 'leaf', size: 250, top: 86, crop: 0.5, dir: -1, rotate: 200, opacity: 0.5, parallax: 220, desktopOnly: true },
  { side: 'right', kind: 'pink', size: 560, top: 64, crop: 0.64, dir: -1, rotate: 100, opacity: 0.55, parallax: 160 },
  { side: 'right', kind: 'starburst', size: 230, top: 12, crop: 0.5, dir: 1, rotate: 240, opacity: 0.45, parallax: 240, desktopOnly: true },
];

/**
 * Botanical circular ornaments that enter from outside both viewport edges, scale, rotate in opposite directions and
 * fade with the parent section's scroll progress, each layer at its own parallax speed, then exit toward the next scene.
 * Mounted only while near the viewport. Reduced motion: static.
 */
export function BotanicalOrbitSystem({ specs, className = '', color }: { specs?: OrbitSpec[]; className?: string; color?: string }) {
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
      gsap.utils.toArray<HTMLElement>('.tg-orn', host).forEach((el) => {
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
    <div ref={ref} className={`tg-sides ${className}`} style={color ? { color } : undefined} aria-hidden="true">
      {live && list.map((o, i) => (
        <div key={i} className="tg-orn" data-side={o.side} data-op={o.opacity} data-rot={o.rotate} data-dir={o.dir} data-par={o.parallax} data-enter={o.enter ?? 0.4} data-exit={o.exit ?? 0.7} data-scale={(o.scale ?? [0.6, 1]).join(',')}
          style={{ ['--s' as string]: `${o.size}px`, top: `${o.top}%`, [o.side]: `calc(var(--s) * var(--k) * ${-o.crop})`, ['--op' as string]: o.opacity }}>
          <BotanicalOrbit kind={o.kind} speed={0.8 + i * 0.12} />
        </div>
      ))}
    </div>
  );
}

/** Single decorative ring for in-scene use (e.g. behind monogram / countdown). */
export const CircularFloralFrame = ({ kind = 'pink', className = '', speed = 1, style }: { kind?: OrbitKind; className?: string; speed?: number; style?: CSSProperties }) => <BotanicalOrbit kind={kind} className={className} speed={speed} style={style} />;
