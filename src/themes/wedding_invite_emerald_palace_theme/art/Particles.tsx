import { useMemo } from 'react';
import { rng } from '../lib/rng';
import { useMedia } from '../hooks/useMedia';

/** Falling petals (CSS keyframes). Count halves on small screens. */
export function Petals({ count = 16, seed = 3, colors = ['#F59A1E', '#FFD84F', '#E2552B'], className = '' }: { count?: number; seed?: number; colors?: string[]; className?: string }) {
  const small = useMedia('(max-width: 700px)');
  const n = small ? Math.ceil(count / 2) : count;
  const items = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: n }, (_, i) => ({ x: r() * 100, d: 9 + r() * 9, delay: -r() * 18, s: 9 + r() * 11, c: colors[i % colors.length], sway: 20 + r() * 50 }));
  }, [n, seed, colors]);
  return (
    <div className={`ep-fx ${className}`} aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} className="ep-petal" style={{ left: `${p.x}%`, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s`, ['--sway' as string]: `${p.sway}px` }}>
          <svg width={p.s} height={p.s * 1.3} viewBox="0 0 20 26"><path d="M10 0C18 6 20 16 10 26 0 16 2 6 10 0z" fill={p.c} opacity=".88" /></svg>
        </span>
      ))}
    </div>
  );
}

/** Drifting gold dust. */
export function GoldDust({ count = 28, seed = 9, className = '' }: { count?: number; seed?: number; className?: string }) {
  const small = useMedia('(max-width: 700px)');
  const n = small ? Math.ceil(count / 2.5) : count;
  const items = useMemo(() => { const r = rng(seed); return Array.from({ length: n }, () => ({ x: r() * 100, y: r() * 100, s: 1.5 + r() * 3, d: 5 + r() * 8, delay: -r() * 10 })); }, [n, seed]);
  return (
    <div className={`ep-fx ${className}`} aria-hidden="true">
      {items.map((p, i) => <span key={i} className="ep-dust" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }} />)}
    </div>
  );
}
