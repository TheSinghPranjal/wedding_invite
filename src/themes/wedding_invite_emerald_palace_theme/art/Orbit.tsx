import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { useMedia } from '../hooks/useMedia';

const TAU = Math.PI * 2;
const pt = (r: number, a: number): [number, number] => [r * Math.sin(a), -r * Math.cos(a)];
const spin = (dur: number, dir: 1 | -1): CSSProperties => ({ ['--dur' as string]: `${dur}s`, ['--dir' as string]: dir });

export function GoldStar({ x = 0, y = 0, r = 10, className = '', fill = 'url(#epGold)' }: { x?: number; y?: number; r?: number; className?: string; fill?: string }) {
  const p = Array.from({ length: 16 }, (_, i) => { const [px, py] = pt(i % 2 ? r * 0.28 : r, (i * TAU) / 16); return `${px + x},${py + y}`; }).join(' ');
  return <polygon className={className} points={p} fill={fill} />;
}

export function Leaf({ x, y, len, rot, fill = 'url(#epLeaf)' }: { x: number; y: number; len: number; rot: number; fill?: string }) {
  return <path transform={`translate(${x} ${y}) rotate(${rot})`} d={`M0 0C${len * 0.35} ${-len * 0.25} ${len * 0.75} ${-len * 0.2} ${len} 0C${len * 0.75} ${len * 0.2} ${len * 0.35} ${len * 0.25} 0 0Z`} fill={fill} stroke="#244B36" strokeWidth=".4" />;
}

/** Single peacock-feather eye (emerald plume, gold ring, turquoise iris). Grows upward from its own origin. */
export function FeatherEye({ x = 0, y = 0, s = 1, rot = 0, className = '' }: { x?: number; y?: number; s?: number; rot?: number; className?: string }) {
  return (
    <g className={className} transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0C8-8 9-24 0-38C-9-24-8-8 0 0Z" fill="url(#epEmerald)" stroke="#C6A45D" strokeWidth=".9" />
      <path d="M0-4C-3-12-3-22 0-30M0-4C3-12 3-22 0-30" stroke="#E5D1A2" strokeWidth=".5" fill="none" opacity=".7" />
      <ellipse cy="-26" rx="5.2" ry="7" fill="#C6A45D" /><ellipse cy="-26" rx="3.8" ry="5.4" fill="url(#epTurq)" /><ellipse cy="-27" rx="1.7" ry="2.6" fill="#0B3C44" />
    </g>
  );
}

/** Ring of feather eyes fanning outward along a circular path. */
export function FeatherCircle({ r = 64, n = 16, s = 1 }: { r?: number; n?: number; s?: number }) {
  return <g>{Array.from({ length: n }, (_, i) => { const a = (i * 360) / n; const [x, y] = pt(r, (a * Math.PI) / 180); return <FeatherEye key={i} x={x} y={y} s={s} rot={a} className="ep-shimmer" />; })}</g>;
}

/** Gold concentric geometric ring (interlaced polygons + beads). */
export function GoldMedallion({ r = 92 }: { r?: number }) {
  const poly = (n: number, rr: number, off = 0) => Array.from({ length: n }, (_, i) => pt(rr, off + (i * TAU) / n).join(',')).join(' ');
  return (
    <g fill="none" stroke="url(#epGold)" strokeWidth=".9">
      <circle r={r} /><circle r={r - 5} strokeDasharray="1 3" strokeWidth="1.6" /><circle r={r * 0.78} />
      <polygon points={poly(8, r * 0.9)} /><polygon points={poly(8, r * 0.9, Math.PI / 8)} opacity=".7" /><polygon points={poly(12, r * 0.66)} opacity=".6" />
      {Array.from({ length: 24 }, (_, i) => { const [x, y] = pt(r, (i * TAU) / 24); return <circle key={i} cx={x} cy={y} r="1.6" fill="url(#epGold)" stroke="none" />; })}
    </g>
  );
}

/** Filigree ring: scalloped arcs and teardrops (traditional Indian jali). */
export function RoyalCircularFrame({ r = 90 }: { r?: number }) {
  return (
    <g fill="none" stroke="url(#epGold)" strokeWidth=".9">
      <circle r={r} /><circle r={r - 7} />
      {Array.from({ length: 24 }, (_, i) => <path key={i} transform={`rotate(${i * 15})`} d={`M-6 ${-r + 7}A6 6 0 0 1 6 ${-r + 7}`} />)}
      {Array.from({ length: 12 }, (_, i) => <path key={`t${i}`} transform={`rotate(${i * 30 + 15})`} d={`M0 ${-r + 8}C6 ${-r + 16} 6 ${-r + 26} 0 ${-r + 32}C-6 ${-r + 26} -6 ${-r + 16} 0 ${-r + 8}Z`} />)}
    </g>
  );
}

/** Lotus-petal ring (pink / champagne). */
export function LotusRing({ r = 44, n = 12, fill = 'url(#epLotus)' }: { r?: number; n?: number; fill?: string }) {
  return <g>{Array.from({ length: n }, (_, i) => <path key={i} transform={`rotate(${(i * 360) / n})`} d={`M0 0C${r * 0.3} ${-r * 0.3} ${r * 0.28} ${-r * 0.8} 0 ${-r}C${-r * 0.28} ${-r * 0.8} ${-r * 0.3} ${-r * 0.3} 0 0Z`} fill={fill} stroke="#C6A45D" strokeWidth=".5" opacity=".85" />)}</g>;
}

export type OrbitKind = 'feather' | 'gold' | 'lotus' | 'medallion' | 'filigree' | 'eye' | 'botanical';

/**
 * Peacock-feather circular ornament. Outer ring turns clockwise (feather eyes, geometric gold or filigree), the middle ring turns
 * anticlockwise (smaller feather eyes / botanical leaves), the inner lotus petals breathe, and a gold medallion sits at the centre.
 */
export function PeacockOrbit({ kind = 'feather', className = '', speed = 1, style }: { kind?: OrbitKind; className?: string; speed?: number; style?: CSSProperties }) {
  return (
    <svg viewBox="-120 -120 240 240" className={`ep-orbit ${className}`} style={style} aria-hidden="true" focusable="false">
      <g className="ep-ring" style={spin(150 / speed, 1)}>
        {kind === 'feather' || kind === 'eye' ? <FeatherCircle r={70} n={kind === 'eye' ? 12 : 18} s={1.15} /> : kind === 'filigree' ? <RoyalCircularFrame r={108} /> : <GoldMedallion r={108} />}
      </g>
      <g className="ep-ring" style={spin(95 / speed, -1)}>
        {kind === 'botanical' ? Array.from({ length: 16 }, (_, i) => { const a = (i * 360) / 16; const [x, y] = pt(66, (a * Math.PI) / 180); return <Leaf key={i} x={x} y={y} len={22} rot={a - 90} fill="url(#epSage)" />; })
          : kind === 'medallion' || kind === 'lotus' ? <LotusRing r={62} n={16} />
          : <g>{Array.from({ length: 12 }, (_, i) => { const a = (i * 360) / 12; const [x, y] = pt(46, (a * Math.PI) / 180); return <FeatherEye key={i} x={x} y={y} s={0.62} rot={a} />; })}</g>}
      </g>
      <g className="ep-ring ep-breathe" style={spin(70 / speed, 1)}><LotusRing r={32} n={10} fill={kind === 'feather' ? 'url(#epEmerald)' : 'url(#epLotus)'} /></g>
      <circle r="12" fill="url(#epGlow)" className="ep-pulse" /><GoldStar r={10} className="ep-twinkle" />
      {[0, 1, 2, 3].map((i) => { const [x, y] = pt(116, (i * TAU) / 4 + 0.4); return <GoldStar key={i} x={x} y={y} r={6} className="ep-twinkle" />; })}
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
  { side: 'left', kind: 'feather', size: 520, top: 40, crop: 0.62, dir: 1, rotate: 110, opacity: 0.6, parallax: 120 },
  { side: 'left', kind: 'medallion', size: 240, top: 86, crop: 0.5, dir: -1, rotate: 200, opacity: 0.5, parallax: 220, desktopOnly: true },
  { side: 'right', kind: 'filigree', size: 540, top: 64, crop: 0.64, dir: -1, rotate: 100, opacity: 0.6, parallax: 160 },
  { side: 'right', kind: 'eye', size: 220, top: 12, crop: 0.5, dir: 1, rotate: 240, opacity: 0.5, parallax: 240, desktopOnly: true },
];

/**
 * Botanical circular ornaments that enter from outside both viewport edges, scale, rotate in opposite directions and
 * fade with the parent section's scroll progress, each layer at its own parallax speed, then exit toward the next scene.
 * Mounted only while near the viewport. Reduced motion: static.
 */
export function SideOrnamentLayer({ specs, className = '', color }: { specs?: OrbitSpec[]; className?: string; color?: string }) {
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
      gsap.utils.toArray<HTMLElement>('.ep-orn', host).forEach((el) => {
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
    <div ref={ref} className={`ep-sides ${className}`} style={color ? { color } : undefined} aria-hidden="true">
      {live && list.map((o, i) => (
        <div key={i} className="ep-orn" data-side={o.side} data-op={o.opacity} data-rot={o.rotate} data-dir={o.dir} data-par={o.parallax} data-enter={o.enter ?? 0.4} data-exit={o.exit ?? 0.7} data-scale={(o.scale ?? [0.6, 1]).join(',')}
          style={{ ['--s' as string]: `${o.size}px`, top: `${o.top}%`, [o.side]: `calc(var(--s) * var(--k) * ${-o.crop})`, ['--op' as string]: o.opacity }}>
          <PeacockOrbit kind={o.kind} speed={0.8 + i * 0.12} />
        </div>
      ))}
    </div>
  );
}

/** Single decorative ring for in-scene use (e.g. behind monogram / countdown). */
