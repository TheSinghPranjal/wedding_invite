/** Shared gradients/filters (tgGold, tgPink ...) referenced by id from every SVG in the theme. Render once. */
export default function Defs() {
  const stops = (a: string, b: string, c?: string) => (<><stop offset="0" stopColor={a} />{c && <stop offset=".55" stopColor={c} />}<stop offset="1" stopColor={b} /></>);
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="tgGold" x1="0" y1="0" x2="1" y2="1">{stops('#F4DC95', '#A87F34', '#D4AC58')}</linearGradient>
        <linearGradient id="tgGoldV" x1="0" y1="0" x2="0" y2="1">{stops('#F1D58B', '#A57B30', '#D5AD55')}</linearGradient>
        <linearGradient id="tgBronze" x1="0" y1="0" x2="1" y2="1">{stops('#C9976A', '#7A4A24', '#A8744A')}</linearGradient>
        <radialGradient id="tgGlow"><stop offset="0" stopColor="#FFF0B0" stopOpacity=".8" /><stop offset=".5" stopColor="#F4C95A" stopOpacity=".25" /><stop offset="1" stopColor="#F4C95A" stopOpacity="0" /></radialGradient>
        <radialGradient id="tgMari"><stop offset="0" stopColor="#FFD84F" /><stop offset=".6" stopColor="#F59A1E" /><stop offset="1" stopColor="#D9661A" /></radialGradient>
        <radialGradient id="tgMariY"><stop offset="0" stopColor="#FFF0A0" /><stop offset=".6" stopColor="#F7C52D" /><stop offset="1" stopColor="#E09A12" /></radialGradient>
        <radialGradient id="tgPeony"><stop offset="0" stopColor="#FFF6E2" /><stop offset=".7" stopColor="#F3DDB8" /><stop offset="1" stopColor="#D9B88E" /></radialGradient>
        <radialGradient id="tgRose"><stop offset="0" stopColor="#F9D9CF" /><stop offset=".7" stopColor="#EDA99E" /><stop offset="1" stopColor="#CF7C75" /></radialGradient>
        <radialGradient id="tgPink"><stop offset="0" stopColor="#FBD3DC" /><stop offset=".6" stopColor="#F2A2B8" /><stop offset="1" stopColor="#D9708F" /></radialGradient>
        <linearGradient id="tgLeaf" x1="0" y1="0" x2="1" y2="1">{stops('#8FBF55', '#2F6B2E')}</linearGradient>
        <linearGradient id="tgSage" x1="0" y1="0" x2="1" y2="1">{stops('#A9BC8A', '#6F8A5A')}</linearGradient>
        <linearGradient id="tgBurg" x1="0" y1="0" x2="0" y2="1">{stops('#650D25', '#350719')}</linearGradient>
        <radialGradient id="tgLamp"><stop offset="0" stopColor="#FFF4C8" /><stop offset=".5" stopColor="#F8C968" /><stop offset="1" stopColor="#B9812A" /></radialGradient>
        <linearGradient id="tgTeal" x1="0" y1="0" x2="1" y2="1">{stops('#5E9A98', '#2F6468')}</linearGradient>
        <linearGradient id="tgSari" x1="0" y1="0" x2="0" y2="1">{stops('#B8264F', '#8A1738')}</linearGradient>
        <filter id="tgWater" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".012 .02" numOctaves="3" seed="3" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="26" /><feGaussianBlur stdDeviation="2.2" /></filter>
        <filter id="tgSoft"><feGaussianBlur stdDeviation="9" /></filter>
      </defs>
    </svg>
  );
}
