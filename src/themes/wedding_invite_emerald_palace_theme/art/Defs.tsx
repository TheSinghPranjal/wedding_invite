/** Shared gradients, patterns and filters (epGold, epWave, epLattice ...) referenced by id from every SVG in the theme. Render once. */
export default function Defs() {
  const g = (id: string, a: string, b: string, c?: string, v = false) => (
    <linearGradient id={id} x1="0" y1="0" x2={v ? 0 : 1} y2="1"><stop offset="0" stopColor={a} />{c && <stop offset=".55" stopColor={c} />}<stop offset="1" stopColor={b} /></linearGradient>
  );
  const r = (id: string, a: string, b: string, c: string) => <radialGradient id={id}><stop offset="0" stopColor={a} /><stop offset=".62" stopColor={b} /><stop offset="1" stopColor={c} /></radialGradient>;
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {g('epGold', '#F0DEAE', '#9C7A3E', '#C6A45D')}{g('epGoldV', '#F0DEAE', '#9C7A3E', '#C6A45D', true)}
        {g('epEmerald', '#2F9A8A', '#0B4F4D', '#126B67')}{g('epTurq', '#6FD0D0', '#2A7FA0', '#3FB0B8')}{g('epLotus', '#FBE0E2', '#D98A98', '#E6A9B0')}
        <radialGradient id="epGlow"><stop offset="0" stopColor="#FFF2C0" stopOpacity=".85" /><stop offset=".5" stopColor="#E5D1A2" stopOpacity=".3" /><stop offset="1" stopColor="#E5D1A2" stopOpacity="0" /></radialGradient>
        {r('epMari', '#FFE08A', '#F4B63C', '#D98A2A')}{r('epMariY', '#FFF3B8', '#F8D45A', '#E5A92A')}
        {g('epLeaf', '#7FA564', '#244B36')}{g('epSage', '#B7C4A3', '#6F8A62')}{g('epForest', '#3F7A4C', '#173A28')}{g('epBanana', '#A9C28A', '#5C7F4E')}
        {r('epRose', '#FFF4F0', '#F3D4CF', '#D9A39C')}{r('epRoseD', '#F6C9C9', '#E39FA0', '#B9686D')}
        {g('epDoor', '#D9BE72', '#6E5320', '#B08E40', true)}{g('epDoorD', '#8C6D2E', '#3E2C0E', '#6B5020', true)}
        {g('epPeaBlue', '#2B7FA8', '#0F3F73', '#1D5F98')}{g('epPeaGreen', '#2F9A6A', '#0B4F3E', '#1B7A58')}
        <pattern id="epWave" width="40" height="20" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#2E8F8A" strokeWidth=".9" opacity=".5">{[0, 1, 2].map((k) => <path key={k} d={`M${-20 + k * 20} 20A20 20 0 0 1 ${k * 20 + 20} 20M${-14 + k * 20} 20A14 14 0 0 1 ${k * 20 + 14} 20M${-8 + k * 20} 20A8 8 0 0 1 ${k * 20 + 8} 20`} />)}</g>
        </pattern>
        <pattern id="epDiamond" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M7 1L13 7L7 13L1 7Z M7 4L10 7L7 10L4 7Z" fill="none" stroke="#C6A45D" strokeWidth=".9" /></pattern>
        <pattern id="epLattice" width="90" height="90" patternUnits="userSpaceOnUse">
          <g fill="none"><path d="M0 0L90 90M90 0L0 90" stroke="#D5C48A" strokeWidth=".8" /><circle cx="45" cy="45" r="2" fill="#D5C48A" />
            <g fill="#fff" opacity=".35" transform="translate(45 0)"><path d="M0 8C10 8 14 18 10 28C6 38 -6 38 -10 28C-14 18 -10 8 0 8Z" /></g><g fill="#fff" opacity=".35" transform="translate(45 90)"><path d="M0 -8C10 -8 14 -18 10 -28C6 -38 -6 -38 -10 -28C-14 -18 -10 -8 0 -8Z" /></g>
            <g fill="#fff" opacity=".35" transform="translate(0 45)"><path d="M8 0C8 10 18 14 28 10C38 6 38 -6 28 -10C18 -14 8 -10 8 0Z" /></g><g fill="#fff" opacity=".35" transform="translate(90 45)"><path d="M-8 0C-8 10 -18 14 -28 10C-38 6 -38 -6 -28 -10C-18 -14 -8 -10 -8 0Z" /></g></g>
        </pattern>
        <pattern id="epEspresso" width="90" height="90" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#6B5236" strokeWidth=".9" opacity=".55"><path d="M45 0L90 45L45 90L0 45Z" />{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} transform={`translate(45 45) rotate(${i * 45})`} d="M0 -6C7 -12 7 -22 0 -28C-7 -22 -7 -12 0 -6Z" />)}<circle cx="45" cy="45" r="3" /></g>
        </pattern>
        <filter id="epSoft"><feGaussianBlur stdDeviation="7" /></filter>
        <filter id="epGlowBlur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
    </svg>
  );
}
