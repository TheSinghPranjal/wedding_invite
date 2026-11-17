import { useMemo } from 'react';

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

export default function Stars({ count = 70, seed = 7, className = '' }: { count?: number; seed?: number; className?: string }) {
  const stars = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: count }, () => ({ x: r() * 100, y: r() * 100, s: 1 + r() * 2.2, d: r() * 4, o: 0.35 + r() * 0.65 }));
  }, [count, seed]);
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: s.o, animationDelay: `${s.d}s` }} />
      ))}
    </div>
  );
}
