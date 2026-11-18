/** Shared gradients, patterns and filters (bpGold, bpLattice ...) referenced by id from every SVG in the theme. Render once. */
export default function Defs() {
  const g = (id: string, a: string, b: string, c?: string, v = false) => (
    <linearGradient id={id} x1="0" y1="0" x2={v ? 0 : 1} y2={v ? 1 : 1}><stop offset="0" stopColor={a} />{c && <stop offset=".55" stopColor={c} />}<stop offset="1" stopColor={b} /></linearGradient>
  );
  const r = (id: string, a: string, b: string, c: string) => <radialGradient id={id}><stop offset="0" stopColor={a} /><stop offset=".62" stopColor={b} /><stop offset="1" stopColor={c} /></radialGradient>;
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {g('bpGold', '#E8D2A0', '#9C7A3E', '#C3A16C')}{g('bpGoldV', '#E8D2A0', '#9C7A3E', '#C3A16C', true)}
        {g('bpRasp', '#B83A5F', '#8F2442', '#AF3155', true)}
        {r('bpRose', '#F3D3D8', '#DDA9B4', '#C07F90')}{r('bpRoseD', '#E6A8B8', '#C77589', '#9A4C62')}{r('bpBlushR', '#FFF4F2', '#F6D9DC', '#E6B8C2')}
        {r('bpMag', '#FFFFFF', '#F7DCE6', '#E4A1BC')}{r('bpMari', '#FFE08A', '#F4B63C', '#D98A2A')}{r('bpMariY', '#FFF3B8', '#F8D45A', '#E5A92A')}
        {g('bpLeaf', '#9DB27E', '#5C7048')}{g('bpSage', '#B7C4A3', '#7E8E69')}{g('bpOlive', '#8E9468', '#5C6240')}{g('bpTeal', '#5B9A92', '#2F6460')}
        {g('bpPink', '#E2A0C0', '#A8567F')}{g('bpPeaGreen', '#B7C47A', '#6C7E3A')}
        <filter id="bpSoft"><feGaussianBlur stdDeviation="8" /></filter>
        <pattern id="bpLattice" width="84" height="84" patternUnits="userSpaceOnUse">
          <g stroke="#fff" strokeWidth="1.1" fill="none" opacity=".9">
            <path d="M42 0L84 42L42 84L0 42Z" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} transform={`translate(42 42) rotate(${i * 45})`} d="M0 -6C7 -12 7 -22 0 -28C-7 -22 -7 -12 0 -6Z" />)}
            <circle cx="42" cy="42" r="4" /><circle cx="42" cy="42" r="30" strokeDasharray="1 3" />
            {[[0, 0], [84, 0], [0, 84], [84, 84]].map(([x, y], k) => <g key={k} transform={`translate(${x} ${y})`}>{[0, 1, 2, 3, 4, 5].map((i) => <path key={i} transform={`rotate(${i * 60})`} d="M0 -3C5 -8 5 -15 0 -19C-5 -15 -5 -8 0 -3Z" />)}</g>)}
          </g>
        </pattern>
        <pattern id="bpMandalaLine" width="150" height="150" patternUnits="userSpaceOnUse">
          <g stroke="#E3B0B8" strokeWidth="1.1" fill="none" opacity=".85" transform="translate(75 75)">
            <circle r="60" />{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => <path key={i} transform={`rotate(${i * 30})`} d="M0 0C14 -14 14 -40 0 -62C-14 -40 -14 -14 0 0Z" />)}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={`b${i}`} transform={`rotate(${i * 45 + 22})`} d="M0 -20C8 -26 8 -34 0 -40C-8 -34 -8 -26 0 -20Z" />)}
          </g>
        </pattern>
      </defs>
    </svg>
  );
}
