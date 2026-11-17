/** Shared gradients/patterns referenced by id (rbGold, rbMari ...) from every SVG in the theme. Render once. */
export default function Defs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="rbGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F7E3A6" /><stop offset=".5" stopColor="#D5AD55" /><stop offset="1" stopColor="#9C7228" /></linearGradient>
        <linearGradient id="rbGoldV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F1D58B" /><stop offset=".55" stopColor="#D5AD55" /><stop offset="1" stopColor="#A57B30" /></linearGradient>
        <radialGradient id="rbGlow"><stop offset="0" stopColor="#F1D58B" stopOpacity=".75" /><stop offset=".5" stopColor="#D5AD55" stopOpacity=".25" /><stop offset="1" stopColor="#D5AD55" stopOpacity="0" /></radialGradient>
        <radialGradient id="rbMari"><stop offset="0" stopColor="#FFD84F" /><stop offset=".6" stopColor="#F59A1E" /><stop offset="1" stopColor="#D9661A" /></radialGradient>
        <radialGradient id="rbMariY"><stop offset="0" stopColor="#FFF0A0" /><stop offset=".6" stopColor="#F7C52D" /><stop offset="1" stopColor="#E09A12" /></radialGradient>
        <radialGradient id="rbPeony"><stop offset="0" stopColor="#FFF6E2" /><stop offset=".7" stopColor="#F3DDB8" /><stop offset="1" stopColor="#D9B88E" /></radialGradient>
        <radialGradient id="rbRose"><stop offset="0" stopColor="#F9D9CF" /><stop offset=".7" stopColor="#EDA99E" /><stop offset="1" stopColor="#CF7C75" /></radialGradient>
        <linearGradient id="rbLeaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7DB84A" /><stop offset="1" stopColor="#2F6B2E" /></linearGradient>
        <linearGradient id="rbBurg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#650D25" /><stop offset="1" stopColor="#350719" /></linearGradient>
        <radialGradient id="rbLamp"><stop offset="0" stopColor="#FFF4C8" /><stop offset=".5" stopColor="#F8C968" /><stop offset="1" stopColor="#B9812A" /></radialGradient>
        <pattern id="rbScal" width="60" height="38" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#D5AD55" strokeWidth="1.2">
            <path d="M0 38A30 30 0 0 1 60 38" /><path d="M9 38A21 21 0 0 1 51 38" /><path d="M18 38A12 12 0 0 1 42 38" />
            <path d="M30 4l5 7-5 7-5-7z" /><path d="M0 38A30 30 0 0 1 0 38" />
          </g>
        </pattern>
      </defs>
    </svg>
  );
}
