/** Shared gradients, patterns and filters (gmGold, gmScale, gmChain ...) referenced by id from every SVG in Theme 06. Render once. */
export default function Defs() {
  const g = (id: string, a: string, b: string, c?: string, v = false) => (
    <linearGradient id={id} x1="0" y1="0" x2={v ? 0 : 1} y2="1"><stop offset="0" stopColor={a} />{c && <stop offset=".5" stopColor={c} />}<stop offset="1" stopColor={b} /></linearGradient>
  );
  const r = (id: string, a: string, b: string, c: string) => <radialGradient id={id}><stop offset="0" stopColor={a} /><stop offset=".6" stopColor={b} /><stop offset="1" stopColor={c} /></radialGradient>;
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {g('gmGold', '#F3DA97', '#A97C2E', '#D2A548')}{g('gmGoldV', '#F7E2A6', '#9A6F26', '#D2A548', true)}
        {g('gmFoil', '#FBEBB5', '#B3842F', '#E2B95A')}
        {g('gmMetal', '#FFF0BE', '#8C6420', '#D7A845', true)}
        {g('gmMaroon', '#8C1A3F', '#5A0B26', '#790B32', true)}
        {g('gmSaffron', '#F6B04A', '#E2851A', '#EE9B2A', true)}
        {g('gmLeaf', '#7E9A62', '#3E5A2E')}{g('gmLeafD', '#5C7A44', '#2C4423')}{g('gmLeafL', '#B6C79A', '#7C9466')}
        {g('gmDrape', '#FBF1E2', '#E3CDB4', '#F3E2CE')}{g('gmDrapeD', '#EAD5BE', '#C9AE92')}
        {g('gmPink', '#F6DCD8', '#DDA9AE')}{g('gmCoral', '#F2C2B6', '#E39C8C')}
        {g('gmFloor', '#E9C9A2', '#D2A77C', undefined, true)}
        {r('gmBloom', '#FFFFFF', '#F4F1E6', '#D9D6C4')}{r('gmRose', '#FBEAE4', '#F0CFC8', '#D6A49E')}
        {r('gmMari', '#FFE08A', '#F4B63C', '#D98A2A')}{r('gmMariO', '#FFC870', '#EE8E22', '#C8621A')}
        <radialGradient id="gmGlow"><stop offset="0" stopColor="#FFF6CF" stopOpacity="1" /><stop offset=".35" stopColor="#FFD76A" stopOpacity=".75" /><stop offset="1" stopColor="#F5B841" stopOpacity="0" /></radialGradient>
        <radialGradient id="gmFlame"><stop offset="0" stopColor="#FFFBEA" /><stop offset=".45" stopColor="#FFE39A" /><stop offset="1" stopColor="#E7A93C" /></radialGradient>
        {/* fish-scale wave used across the ivory cards */}
        <pattern id="gmScale" width="36" height="18" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#E9D3A6" strokeWidth="1.1">{[0, 1, 2].map((k) => <path key={k} d={`M${-18 + k * 18} 18A18 18 0 0 1 ${k * 18 + 18} 18M${-12 + k * 18} 18A12 12 0 0 1 ${k * 18 + 12} 18M${-6 + k * 18} 18A6 6 0 0 1 ${k * 18 + 6} 18`} />)}</g>
        </pattern>
        <pattern id="gmScaleW" width="36" height="18" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#FFF6E8" strokeWidth="1.1" opacity=".55">{[0, 1, 2].map((k) => <path key={k} d={`M${-18 + k * 18} 18A18 18 0 0 1 ${k * 18 + 18} 18M${-12 + k * 18} 18A12 12 0 0 1 ${k * 18 + 12} 18`} />)}</g>
        </pattern>
        {/* embossed white swirls (final card) */}
        <pattern id="gmSwirl" width="160" height="120" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity=".9">
            <path d="M10 60C30 20 70 20 80 50C88 74 60 84 52 66C46 52 64 46 68 58" /><path d="M90 110C110 80 150 84 150 110" /><path d="M100 20C120 0 150 10 150 30C150 46 130 48 128 36" />
          </g>
          <g fill="none" stroke="#D9D3C2" strokeWidth="1.2" opacity=".55">
            <path d="M12 63C32 23 72 23 82 53C90 77 62 87 54 69" /><path d="M92 113C112 83 152 87 152 113" /><path d="M102 23C122 3 152 13 152 33" />
          </g>
        </pattern>
        {/* pale pink vine pattern for the palace arch */}
        <pattern id="gmVine" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#F3C9BC" />
          <g fill="none" stroke="#F9E1D8" strokeWidth="1.6" strokeLinecap="round"><path d="M4 30C10 20 18 22 20 14C22 8 30 8 34 4" /><path d="M10 6c4 2 4 6 1 8M26 30c4-2 8 0 8 4M2 14c3-1 6 1 6 4" /></g>
        </pattern>
        {/* chain links for hanging lanterns */}
        <pattern id="gmChain" width="6" height="12" patternUnits="userSpaceOnUse">
          <ellipse cx="3" cy="3.5" rx="1.9" ry="3.1" fill="none" stroke="#C9A04E" strokeWidth=".9" /><path d="M3 7.5V12" stroke="#D9B566" strokeWidth="1" />
        </pattern>
        <filter id="gmSoft"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="gmBlur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>
    </svg>
  );
}
