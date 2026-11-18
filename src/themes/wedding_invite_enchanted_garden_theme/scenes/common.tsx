import type { CSSProperties, ReactNode } from 'react';

/** Absolutely positioned child of a board (percent / cqw based). */
export const A = ({ style, children, className = '' }: { style: CSSProperties; children: ReactNode; className?: string }) => <div className={className} style={{ position: 'absolute', ...style }}>{children}</div>;

/** Depth layer: filled box moved by the scene's [data-depth] parallax pass. */
export const L = ({ d, z = 2, children, className = '' }: { d: number; z?: number; children: ReactNode; className?: string }) => (
  <div data-depth={d} className={`tg-layer ${className}`} style={{ position: 'absolute', inset: 0, zIndex: z, pointerEvents: 'none' }}>{children}</div>
);

/** Split a string into per-letter spans for typed / staggered reveals. */
export const Letters = ({ text, className = 'tg-ch' }: { text: string; className?: string }) => <>{Array.from(text).map((c, i) => <span key={i} className={className}>{c}</span>)}</>;
