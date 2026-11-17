import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { useMedia } from '../hooks/useMedia';

const pt = (r: number, a: number): [number, number] => [r * Math.sin(a), -r * Math.cos(a)];
const rot = (i: number, n: number) => `rotate(${(i * 360) / n})`;
const spin = (dur: number, dir: 1 | -1): CSSProperties => ({ ['--dur' as string]: `${dur}s`, ['--dir' as string]: dir });

/** Layer 1 - outer decorative floral ring: lotus petals + beaded rims. */
export function FloralRing({ petals = 24, r = 76, s = 12 }: { petals?: number; r?: number; s?: number }) {
  return (
    <g>
      <circle r={r + s * 2.4} className="rb-glow" /><circle r={r + s * 2.4} strokeDasharray="1 3.2" /><circle r={r} />
      {Array.from({ length: petals }, (_, i) => (
        <g key={i} transform={rot(i, petals)}>
          <path d={`M0 ${-r} C ${s} ${-r - s * 0.5} ${s} ${-r - s * 1.7} 0 ${-r - s * 2.2} C ${-s} ${-r - s * 1.7} ${-s} ${-r - s * 0.5} 0 ${-r}Z`} />
          <path d={`M0 ${-r - s * 0.5} V ${-r - s * 1.7}`} opacity=".7" />
          <circle cy={-r - s * 2.75} r="1.1" fill="currentColor" />
        </g>
      ))}
    </g>
  );
}

/** Layer 2 - intricate geometric patterns: interlaced star polygon and beaded rings. */
export function GoldPattern({ r = 62, n = 16, k = 5 }: { r?: number; n?: number; k?: number }) {
  const pts = Array.from({ length: n }, (_, i) => pt(r, (i * 2 * Math.PI) / n));
  return (
    <g>
      <circle r={r} /><circle r={r * 0.72} strokeDasharray="2 2.4" />
      {pts.map(([x, y], i) => { const [x2, y2] = pts[(i + k) % n]; return <line key={i} x1={x} y1={y} x2={x2} y2={y2} opacity=".75" />; })}
      {pts.map(([x, y], i) => <circle key={`c${i}`} cx={x} cy={y} r="1.8" fill="currentColor" />)}
    </g>
  );
}

/** Layer 3 - traditional paisley (ambi) motifs. */
export function PaisleyRing({ r = 44, n = 12 }: { r?: number; n?: number }) {
  return (
    <g>
      <circle r={r} />
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={rot(i, n)}>
          <path d={`M0 ${-r} C 9 ${-r - 3} 12 ${-r - 15} 3 ${-r - 24} C 7 ${-r - 13} -2 ${-r - 8} -9 ${-r - 5} C -5 ${-r - 2} -2 ${-r} 0 ${-r}Z`} />
          <path d={`M1 ${-r - 6} C 4 ${-r - 10} 5 ${-r - 14} 2 ${-r - 18}`} opacity=".7" />
          <circle cx="-1" cy={-r - 9} r="1.3" fill="currentColor" />
        </g>
      ))}
    </g>
  );
}

/** Layer 4 - inner lotus geometry. */
export function LotusCore({ r = 28 }: { r?: number }) {
  return (
    <g>
      {[1, 0.72, 0.46].map((k, j) => (
        <g key={j} transform={`rotate(${j * 11})`}>
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} transform={rot(i, 8)} d={`M0 0 C ${r * 0.34 * k} ${-r * 0.35 * k} ${r * 0.3 * k} ${-r * 0.8 * k} 0 ${-r * k} C ${-r * 0.3 * k} ${-r * 0.8 * k} ${-r * 0.34 * k} ${-r * 0.35 * k} 0 0Z`} />
          ))}
        </g>
      ))}
      <circle r="3.5" fill="currentColor" /><circle r="6" />
    </g>
  );
}

interface MandalaProps { className?: string; layers?: 1 | 2 | 3 | 4; speed?: number; style?: CSSProperties }

/** Large multi-ring mandala: each ring spins independently (alternating direction) in pure CSS. */
export function MandalaDecoration({ className = '', layers = 4, speed = 1, style }: MandalaProps) {
  return (
    <svg viewBox="-100 -100 200 200" className={`rb-mandala ${className}`} style={style} fill="none" stroke="currentColor" strokeWidth=".7" aria-hidden="true" focusable="false">
      <g className="rb-ring" style={spin(120 / speed, 1)}><FloralRing /></g>
      {layers >= 2 && <g className="rb-ring" style={spin(80 / speed, -1)}><GoldPattern /></g>}
      {layers >= 3 && <g className="rb-ring" style={spin(95 / speed, 1)}><PaisleyRing /></g>}
      {layers >= 4 && <g className="rb-ring" style={spin(55 / speed, -1)}><LotusCore /></g>}
    </svg>
  );
}

/** Medium / small circular ornaments. */
export function CircularOrnament({ variant = 'floral', className = '', speed = 1, style }: MandalaProps & { variant?: 'floral' | 'dots' | 'sun' }) {
  return (
    <svg viewBox="-100 -100 200 200" className={`rb-mandala ${className}`} style={style} fill="none" stroke="currentColor" strokeWidth=".9" aria-hidden="true" focusable="false">
      {variant === 'floral' && (<>
        <g className="rb-ring" style={spin(70 / speed, 1)}><FloralRing petals={16} r={64} s={14} /></g>
        <g className="rb-ring" style={spin(45 / speed, -1)}><LotusCore r={46} /></g>
      </>)}
      {variant === 'dots' && (<>
        {[88, 70, 52, 34].map((r, i) => (
          <g key={r} className="rb-ring" style={spin((40 + i * 12) / speed, i % 2 ? -1 : 1)}>
            <circle r={r} strokeDasharray={`1 ${3 + i}`} strokeWidth="2" />
            {Array.from({ length: 12 + i * 4 }, (_, j) => { const [x, y] = pt(r, (j * 2 * Math.PI) / (12 + i * 4)); return <circle key={j} cx={x} cy={y} r="2.2" fill="currentColor" />; })}
          </g>
        ))}
      </>)}
      {variant === 'sun' && (
        <g className="rb-ring" style={spin(50 / speed, 1)}>
          <circle r="30" /><circle r="22" />
          {Array.from({ length: 24 }, (_, i) => <path key={i} transform={rot(i, 24)} d={`M0 -34 L ${i % 2 ? 4 : 6} -${i % 2 ? 56 : 80} L -${i % 2 ? 4 : 6} -${i % 2 ? 56 : 80}Z`} />)}
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ side layer */
export interface OrnamentSpec {
  side: 'left' | 'right';
  kind: 'mandala' | 'floral' | 'dots' | 'sun';
  /** desktop px diameter */
  size: number;
  /** vertical centre, % of section */
  top: number;
  /** fraction of the circle hidden off-screen at rest (0 – 0.7) */
  crop: number;
  dir: 1 | -1;
  /** total degrees of scroll-driven rotation */
  rotate: number;
  opacity: number;
  /** vertical parallax travel in px */
  parallax: number;
  layers?: 1 | 2 | 3 | 4;
  /** hide on small screens */
  desktopOnly?: boolean;
}

/** Default six: large + medium + small on each side, different speeds and parallax. */
export const defaultOrnaments = (): OrnamentSpec[] => [
  { side: 'left', kind: 'mandala', size: 620, top: 38, crop: 0.62, dir: 1, rotate: 110, opacity: 0.4, parallax: 120, layers: 4 },
  { side: 'left', kind: 'floral', size: 300, top: 82, crop: 0.5, dir: -1, rotate: 200, opacity: 0.38, parallax: 220, desktopOnly: true },
  { side: 'left', kind: 'dots', size: 150, top: 8, crop: 0.4, dir: 1, rotate: 320, opacity: 0.35, parallax: 300, desktopOnly: true },
  { side: 'right', kind: 'mandala', size: 700, top: 66, crop: 0.64, dir: -1, rotate: 90, opacity: 0.4, parallax: 160, layers: 4 },
  { side: 'right', kind: 'floral', size: 320, top: 14, crop: 0.5, dir: 1, rotate: 220, opacity: 0.36, parallax: 260, desktopOnly: true },
  { side: 'right', kind: 'sun', size: 150, top: 90, crop: 0.4, dir: -1, rotate: 340, opacity: 0.35, parallax: 320, desktopOnly: true },
];

/**
 * Independent circular ornaments that emerge from both viewport edges, rotate, scale, fade and drift at different
 * parallax speeds in sync with the parent <section>'s scroll progress. Mounted only while near the viewport.
 */
export function SideOrnamentLayer({ specs, className = '', color }: { specs?: OrnamentSpec[]; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const small = useMedia('(max-width: 700px)');
  const list = (specs ?? defaultOrnaments()).filter((o) => !(small && o.desktopOnly));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: '60% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!live || !ref.current) return;
      const host = ref.current;
      const trigger = host.closest('section') ?? host.parentElement;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.rb-orn', host).forEach((el) => {
          const side = el.dataset.side === 'left' ? -1 : 1;
          const op = Number(el.dataset.op);
          const r = Number(el.dataset.rot) * Number(el.dataset.dir);
          const par = Number(el.dataset.par);
          gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
            .fromTo(el, { xPercent: side * 55, scale: 0.55, opacity: 0, rotation: 0, y: par }, { xPercent: 0, scale: 1, opacity: op, rotation: r * 0.4, y: 0, duration: 0.4 })
            .to(el, { rotation: r * 0.7, duration: 0.3 })
            .to(el, { xPercent: side * 35, scale: 0.85, opacity: op * 0.25, rotation: r, y: -par, duration: 0.3 });
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [live, small] },
  );

  return (
    <div ref={ref} className={`rb-sides ${className}`} style={color ? { color } : undefined} aria-hidden="true">
      {live && list.map((o, i) => (
        <div
          key={i}
          className="rb-orn"
          data-side={o.side} data-op={o.opacity} data-rot={o.rotate} data-dir={o.dir} data-par={o.parallax}
          style={{ ['--s' as string]: `${o.size}px`, top: `${o.top}%`, [o.side]: `calc(var(--s) * var(--k) * ${-o.crop})`, ['--op' as string]: o.opacity }}
        >
          {o.kind === 'mandala' ? <MandalaDecoration layers={o.layers ?? 4} speed={0.8 + i * 0.1} /> : <CircularOrnament variant={o.kind === 'floral' ? 'floral' : o.kind} speed={1 + i * 0.15} />}
        </div>
      ))}
    </div>
  );
}
