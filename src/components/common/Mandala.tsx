/** Decorative line-art mandala (pure SVG, inherits currentColor). */
export default function Mandala({ className = '' }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const inner = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg className={className} viewBox="-100 -100 200 200" fill="none" stroke="currentColor" strokeWidth="0.6" aria-hidden="true" focusable="false">
      <circle r="96" /><circle r="90" strokeDasharray="1 3" /><circle r="58" /><circle r="20" /><circle r="6" />
      {petals.map((a) => (<path key={a} transform={`rotate(${a})`} d="M0 -58 C10 -72 10 -84 0 -94 C-10 -84 -10 -72 0 -58Z" />))}
      {inner.map((a) => (<path key={a} transform={`rotate(${a})`} d="M0 -20 C8 -30 8 -42 0 -54 C-8 -42 -8 -30 0 -20Z" />))}
      {petals.map((a) => (<circle key={`d${a}`} transform={`rotate(${a}) translate(0 -76)`} r="1.2" fill="currentColor" />))}
    </svg>
  );
}
