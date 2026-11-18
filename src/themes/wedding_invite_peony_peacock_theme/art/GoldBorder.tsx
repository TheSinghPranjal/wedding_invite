import { useEffect, useRef, useState } from 'react';

/** Double gold frame sized to its parent in px (so GSAP DrawSVG can trace it). `.bp-draw` paths are animated by scenes. */
export default function GoldBorder({ inset = 14, className = '' }: { inset?: number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [{ w, h }, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const box = (i: number, c: number) => `M${i + c} ${i}H${w - i - c}L${w - i} ${i + c}V${h - i - c}L${w - i - c} ${h - i}H${i + c}L${i} ${h - i - c}V${i + c}Z`;
  return (
    <svg ref={ref} className={className} width={w} height={h} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} fill="none" stroke="url(#bpGold)" aria-hidden="true" focusable="false">
      {w > 0 && (<>
        <path className="bp-draw" d={box(inset, 12)} strokeWidth="2" />
        <path className="bp-draw" d={box(inset + 9, 8)} strokeWidth="1" opacity=".7" />
      </>)}
    </svg>
  );
}
