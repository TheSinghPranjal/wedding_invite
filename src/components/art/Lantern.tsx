import type { CSSProperties } from 'react';

export default function Lantern({ size, blur = 0, style, className }: { size: number; blur?: number; style?: CSSProperties; className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size * 1.45,
        borderRadius: size * 0.14,
        background: 'radial-gradient(ellipse at 50% 70%, #fff0a8 0%, #ffbf3d 38%, #f08a14 72%, #c9600a 100%)',
        boxShadow: `0 0 ${size * 0.7}px ${size * 0.18}px rgba(255,160,40,.45), inset 0 -${size * 0.12}px ${size * 0.2}px rgba(150,60,0,.45), inset 0 ${size * 0.08}px ${size * 0.14}px rgba(255,255,220,.5)`,
        filter: blur ? `blur(${blur}px)` : undefined,
        willChange: 'transform',
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
