import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { useMedia } from '../hooks/useMedia';

type P = { className?: string; style?: CSSProperties };
export type MandalaKind = 'lotus' | 'sunburst' | 'paisley' | 'temple' | 'medallion';

const rot = (n: number, i: number, off = 0) => `rotate(${((i + off) * 360) / n})`;
/** Wide-based pointed lotus petal, pointing up from radius r0 to r1 (local coords, centre 0,0). */
const petal = (r0: number, r1: number, w: number) => {
  const h = r1 - r0;
  return `M${-w} ${-r0}C${-w} ${-r0 - h * 0.55} ${-w * 0.25} ${-r0 - h * 0.72} 0 ${-r1}C${w * 0.25} ${-r0 - h * 0.72} ${w} ${-r0 - h * 0.55} ${w} ${-r0}`;
};
/** Slim almond petal. */
const almond = (r0: number, r1: number, w: number) => {
  const h = r1 - r0;
  return `M0 ${-r0}C${w} ${-r0 - h * 0.2} ${w} ${-r0 - h * 0.7} 0 ${-r1}C${-w} ${-r0 - h * 0.7} ${-w} ${-r0 - h * 0.2} 0 ${-r0}Z`;
};
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** Spinning group; CSS keyframes rotate about the SVG centre. dir -1 counter-rotates. */
const Spin = ({ dur, dir = 1, children }: { dur: number; dir?: 1 | -1; children: React.ReactNode }) => (
  <g className="gm-spin" style={{ ['--dur' as string]: `${dur}s`, ['--dir' as string]: dir }}>{children}</g>
);

/** Centre rosette shared by every mandala. */
function Rosette({ r = 30, n = 12 }: { r?: number; n?: number }) {
  return (
    <g>
      {range(40).map((i) => <rect key={i} x="-.9" y={-r - 3.6} width="1.8" height="3.6" fill="currentColor" transform={rot(40, i)} />)}
      <circle r={r - 4.5} fill="none" stroke="currentColor" strokeWidth="1.4" />
      {range(n).map((i) => <path key={i} d={almond(6, r - 7, 4.6)} fill="currentColor" transform={rot(n, i)} />)}
      <circle r="6.5" className="gm-pf" stroke="currentColor" strokeWidth="1.4" /><circle r="2.6" fill="currentColor" />
    </g>
  );
}

/** Large radial lotus mandala (the theme's signature): outer pointed petals with stamens, filled middle petals, beaded rosette.
 *  Outer and middle rings turn in opposite directions. Colour = currentColor; paper fill = var(--paper). */
export function LotusMandala({ className, style, n = 12, speed = 1 }: P & { n?: number; speed?: number }) {
  const s = Math.max(0.05, speed);
  return (
    <svg viewBox="-100 -100 200 200" className={className} style={style} aria-hidden="true" focusable="false" strokeLinejoin="round">
      <Spin dur={160 / s}>
        {range(n).map((i) => (
          <g key={i} transform={rot(n, i)}>
            <path d={petal(54, 97, 21)} className="gm-pf" stroke="currentColor" strokeWidth="2.3" />
            <path d={petal(58, 86, 13)} fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M0 -63C6 -69 6 -76 0 -80C-6 -76 -6 -69 0 -63Z" fill="currentColor" />
          </g>
        ))}
        {range(n).map((i) => (
          <g key={`s${i}`} transform={rot(n, i, 0.5)}><path d="M0 -58V-82" stroke="currentColor" strokeWidth="1.7" /><circle cy="-85.5" r="3.4" fill="currentColor" /></g>
        ))}
      </Spin>
      <Spin dur={110 / s} dir={-1}>
        <circle r="55" className="gm-pf" stroke="currentColor" strokeWidth="2" />
        {range(16).map((i) => (
          <g key={i} transform={rot(16, i)}><path d={almond(33, 54, 8.5)} fill="currentColor" /><path d={almond(37, 49, 3.6)} className="gm-pf" /></g>
        ))}
        <circle r="33.5" className="gm-pf" stroke="currentColor" strokeWidth="1.6" />
      </Spin>
      <Spin dur={80 / s}><Rosette /></Spin>
    </svg>
  );
}

function Sunburst({ s }: { s: number }) {
  return (
    <>
      <Spin dur={200 / s}>{range(72).map((i) => <path key={i} d={i % 2 ? 'M0 -70V-90' : 'M0 -70V-98'} stroke="currentColor" strokeWidth="1" transform={rot(72, i)} />)}</Spin>
      <Spin dur={120 / s} dir={-1}>
        <circle r="68" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="1 4" strokeLinecap="round" />
        {range(24).map((i) => <path key={i} d={petal(44, 66, 8)} className="gm-pf" stroke="currentColor" strokeWidth="1.5" transform={rot(24, i)} />)}
        {range(24).map((i) => <circle key={`d${i}`} cy="-58" r="1.8" fill="currentColor" transform={rot(24, i, 0.5)} />)}
        <circle r="44" className="gm-pf" stroke="currentColor" strokeWidth="1.6" />
      </Spin>
      <Spin dur={90 / s}><Rosette r={36} n={16} /></Spin>
    </>
  );
}

function Paisleys({ s }: { s: number }) {
  return (
    <>
      <Spin dur={170 / s}>
        <circle r="96" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" />
        {range(10).map((i) => (
          <g key={i} transform={rot(10, i)}>
            <path d="M0 -52C20 -54 26 -76 12 -88C2 -96 -12 -88 -6 -79C-2 -73 7 -76 5 -82M-6 -79C-21 -70 -18 -54 0 -52Z" className="gm-pf" stroke="currentColor" strokeWidth="1.8" />
            <path d="M0 -58C10 -60 14 -72 7 -80" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cy="-66" cx="2" r="2.4" fill="currentColor" />
          </g>
        ))}
      </Spin>
      <Spin dur={100 / s} dir={-1}>
        <circle r="48" className="gm-pf" stroke="currentColor" strokeWidth="1.8" />
        {range(32).map((i) => <circle key={i} cy="-44" r="1.6" fill="currentColor" transform={rot(32, i)} />)}
        {range(8).map((i) => <path key={`p${i}`} d="M0 -12C14 -16 16 -34 0 -40C-16 -34 -14 -16 0 -12Z" fill="currentColor" transform={rot(8, i)} />)}
        {range(8).map((i) => <path key={`q${i}`} d="M0 -16C7 -19 8 -29 0 -33C-8 -29 -7 -19 0 -16Z" className="gm-pf" transform={rot(8, i)} />)}
        <circle r="10" className="gm-pf" stroke="currentColor" strokeWidth="1.4" /><circle r="4" fill="currentColor" />
      </Spin>
    </>
  );
}

function Temple({ s }: { s: number }) {
  return (
    <>
      <Spin dur={180 / s}>
        {range(12).map((i) => (
          <g key={i} transform={rot(12, i)}>
            <path d="M-13 -58V-72C-13 -81 -4 -83 0 -93C4 -83 13 -81 13 -72V-58Z" className="gm-pf" stroke="currentColor" strokeWidth="1.8" />
            <path d="M-6 -60V-70C-6 -75 0 -76 0 -80C0 -76 6 -75 6 -70V-60Z" fill="currentColor" /><circle cy="-96" r="2.2" fill="currentColor" />
          </g>
        ))}
        {range(12).map((i) => <path key={`l${i}`} d="M0 -60L-4 -70L0 -80L4 -70Z" fill="none" stroke="currentColor" strokeWidth="1.1" transform={rot(12, i, 0.5)} />)}
      </Spin>
      <Spin dur={120 / s} dir={-1}>
        <circle r="57" className="gm-pf" stroke="currentColor" strokeWidth="2" /><circle r="51" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="2 3" />
        {range(12).map((i) => <path key={i} d={petal(26, 46, 10)} className="gm-pf" stroke="currentColor" strokeWidth="1.5" transform={rot(12, i, 0.5)} />)}
      </Spin>
      <Spin dur={80 / s}><Rosette r={27} n={10} /></Spin>
    </>
  );
}

function Medallion({ s }: { s: number }) {
  return (
    <>
      <Spin dur={150 / s}>
        {range(8).map((i) => (
          <g key={i} transform={rot(8, i)}>
            <path d="M-26 -50C-34 -70 -20 -94 0 -96C20 -94 34 -70 26 -50Z" className="gm-pf" stroke="currentColor" strokeWidth="2" />
            <path d="M-14 -56C-18 -70 -10 -84 0 -86C10 -84 18 -70 14 -56Z" fill="currentColor" />
            <path d="M0 -60C5 -66 5 -74 0 -78C-5 -74 -5 -66 0 -60Z" className="gm-pf" />
          </g>
        ))}
      </Spin>
      <Spin dur={100 / s} dir={-1}>
        <circle r="50" className="gm-pf" stroke="currentColor" strokeWidth="1.8" />
        {range(48).map((i) => <circle key={i} cy="-46" r="1.3" fill="currentColor" transform={rot(48, i)} />)}
        {range(8).map((i) => <path key={`p${i}`} d={petal(18, 40, 11)} className="gm-pf" stroke="currentColor" strokeWidth="1.5" transform={rot(8, i, 0.5)} />)}
      </Spin>
      <Spin dur={70 / s}><Rosette r={20} n={8} /></Spin>
    </>
  );
}

/** Ornament family: lotus | sunburst | paisley | temple | medallion. */
export function GoldenMandala({ kind = 'lotus', className, style, speed = 1 }: P & { kind?: MandalaKind; speed?: number }) {
  if (kind === 'lotus') return <LotusMandala className={className} style={style} speed={speed} />;
  const s = Math.max(0.05, speed);
  return (
    <svg viewBox="-100 -100 200 200" className={className} style={style} aria-hidden="true" focusable="false" strokeLinejoin="round">
      {kind === 'sunburst' ? <Sunburst s={s} /> : kind === 'paisley' ? <Paisleys s={s} /> : kind === 'temple' ? <Temple s={s} /> : <Medallion s={s} />}
    </svg>
  );
}

export interface OrnSpec {
  side: 'left' | 'right';
  kind: MandalaKind;
  /** px at desktop; halved on phones via --k */
  size: number;
  /** % of the section height (may be < 0 or > 100 for corner crops) */
  top: number;
  /** fraction hidden past the viewport edge */
  crop: number;
  dir: 1 | -1;
  rotate: number;
  opacity: number;
  parallax: number;
  enter?: number;
  exit?: number;
  desktopOnly?: boolean;
}

export const ornaments = (a: MandalaKind, b: MandalaKind, op = 0.55): OrnSpec[] => [
  { side: 'left', kind: a, size: 540, top: 34, crop: 0.62, dir: 1, rotate: 90, opacity: op, parallax: 120 },
  { side: 'right', kind: b, size: 560, top: 70, crop: 0.64, dir: -1, rotate: 80, opacity: op, parallax: 170 },
  { side: 'left', kind: 'medallion', size: 230, top: 92, crop: 0.48, dir: -1, rotate: 160, opacity: op * 0.85, parallax: 230, desktopOnly: true },
  { side: 'right', kind: 'paisley', size: 220, top: 8, crop: 0.5, dir: 1, rotate: 180, opacity: op * 0.85, parallax: 260, desktopOnly: true },
];

/**
 * GoldOrnamentLayer — oversized gold mandalas that enter from outside both viewport edges with the parent section's scroll:
 * they slide in, fade up, scale and rotate (the SVG's own rings keep counter-rotating), drift at their own parallax speed,
 * then leave toward the next scene. Mounted only while near the viewport; static under reduced motion.
 */
export function GoldOrnamentLayer({ specs, color = '#C6A052', className = '' }: { specs?: OrnSpec[]; color?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const small = useMedia('(max-width: 700px)');
  const list = (specs ?? ornaments('lotus', 'sunburst')).filter((o) => !(small && o.desktopOnly));

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
      gsap.utils.toArray<HTMLElement>('.gm-orn', host).forEach((el) => {
        const d = el.dataset;
        const side = d.side === 'left' ? -1 : 1;
        const op = Number(d.op), r = Number(d.rot) * Number(d.dir), par = Number(d.par);
        const enter = Number(d.enter), exit = Number(d.exit);
        gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
          .fromTo(el, { xPercent: side * 50, scale: 0.7, opacity: 0, rotation: 0, y: par }, { xPercent: 0, scale: 1, opacity: op, rotation: r * 0.45, y: 0, duration: enter })
          .to(el, { rotation: r * 0.7, scale: 1.04, duration: Math.max(0.01, exit - enter) })
          .to(el, { xPercent: side * 36, scale: 0.9, opacity: op * 0.15, rotation: r, y: -par, duration: Math.max(0.01, 1 - exit) });
      });
    });
    return () => mm.revert();
  }, { scope: ref, dependencies: [live, small] });

  return (
    <div ref={ref} className={`gm-sides ${className}`} style={{ color }} aria-hidden="true">
      {live && list.map((o, i) => (
        <div key={i} className="gm-orn" data-side={o.side} data-op={o.opacity} data-rot={o.rotate} data-dir={o.dir} data-par={o.parallax} data-enter={o.enter ?? 0.4} data-exit={o.exit ?? 0.7}
          style={{ ['--s' as string]: `${o.size}px`, top: `${o.top}%`, [o.side]: `calc(var(--s) * var(--k) * ${-o.crop})`, ['--op' as string]: o.opacity }}>
          <GoldenMandala kind={o.kind} speed={0.7 + i * 0.15} />
        </div>
      ))}
    </div>
  );
}

/**
 * MandalaScrollController — gives every `[data-mandala]` element of its section a slow scrubbed rotation (value = degrees,
 * negative = counter-clockwise) and gentle scale across the section's pass. Targets wrapper elements only, so scene
 * timelines and CSS ring spins never fight over the same property.
 */
export function MandalaScrollController() {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const sec = ref.current?.closest('section');
    if (!sec) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-mandala]', sec).forEach((el) => {
        const deg = Number(el.dataset.mandala) || 40;
        gsap.fromTo(el, { rotation: -deg / 2, scale: 0.94 }, { rotation: deg / 2, scale: 1.04, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
    });
    return () => mm.revert();
  });
  return <span ref={ref} hidden />;
}
