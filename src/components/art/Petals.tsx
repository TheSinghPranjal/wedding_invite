import { useMemo } from 'react';

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

/** CSS-animated falling petals. Pure CSS keyframes, paused under prefers-reduced-motion. */
export default function Petals({ count = 18, seed = 3, colors = ['#e5718f', '#f2a0b4', '#c94d6d'], className = '' }: { count?: number; seed?: number; colors?: string[]; className?: string }) {
  const items = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: count }, (_, i) => ({ x: r() * 100, d: 9 + r() * 9, delay: -r() * 18, s: 10 + r() * 12, c: colors[i % colors.length], sway: 20 + r() * 40 }));
  }, [count, seed, colors]);
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} className="petal" style={{ left: `${p.x}%`, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s`, ['--sway' as string]: `${p.sway}px` }}>
          <svg width={p.s} height={p.s * 1.3} viewBox="0 0 20 26"><path d="M10 0 C18 6 20 16 10 26 C0 16 2 6 10 0Z" fill={p.c} opacity=".85" /></svg>
        </span>
      ))}
    </div>
  );
}
