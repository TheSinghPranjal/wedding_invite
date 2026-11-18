import type { CSSProperties } from 'react';

type P = { className?: string; style?: CSSProperties };
const SKIN = '#E0A982', HAIR = '#241512';

export interface CouplePalette { groom: string; groomTrim: string; bride: string; dupatta: string; embroidery: string }
export const palettes: Record<string, CouplePalette> = {
  garden: { groom: '#1C1F24', groomTrim: '#3A3F48', bride: '#F4DFC8', dupatta: '#F3B9C4', embroidery: '#E0A0A0' },
  dance: { groom: '#1D2F5E', groomTrim: '#C8A96A', bride: '#F2C7A8', dupatta: '#F6DCC4', embroidery: '#D79A78' },
  haldi: { groom: '#F6D24A', groomTrim: '#E39A12', bride: '#F4C22C', dupatta: '#FFF2B8', embroidery: '#C77A12' },
  mehendi: { groom: '#E8E0C8', groomTrim: '#7FA58A', bride: '#2E7D5A', dupatta: '#A8D2B0', embroidery: '#E5D1A2' },
  sangeet: { groom: '#0F3F5E', groomTrim: '#C6A45D', bride: '#1D6B78', dupatta: '#5AA7B2', embroidery: '#E5D1A2' },
  wedding: { groom: '#F4E9D0', groomTrim: '#C6A45D', bride: '#C93E5A', dupatta: '#F0C4A0', embroidery: '#E5D1A2' },
  reception: { groom: '#2B1A15', groomTrim: '#C6A45D', bride: '#EBD9B4', dupatta: '#F8F1E3', embroidery: '#C6A45D' },
};

/** Faceless illustrated couple standing close (groom behind-left, bride front-right). Palette switches per event; shared proportions everywhere. */
export function GardenCouple({ className, style, palette = 'garden' }: P & { palette?: keyof typeof palettes | string }) {
  const c = palettes[palette] ?? palettes.garden;
  const gown = Array.from({ length: 26 }, (_, i) => ({ x: 120 + ((i * 37) % 130), y: 262 + Math.floor((i * 53) % 130) }));
  return (
    <svg viewBox="0 0 280 440" className={className} style={style} aria-hidden="true" focusable="false">
      {/* groom */}
      <path d="M74 300h58l-6 130h-22l-4-84-6 84H70Z" fill={c.groom} />
      <path d="M58 140C58 118 150 118 150 140L156 316H52Z" fill={c.groom} /><path d="M104 130v186" stroke={c.groomTrim} strokeWidth="2" />
      {[160, 190, 220, 250].map((y) => <circle key={y} cx="104" cy={y} r="2.4" fill={c.groomTrim} />)}
      <rect x="92" y="108" width="24" height="26" fill={SKIN} /><ellipse cx="104" cy="88" rx="24" ry="30" fill={SKIN} />
      <path d="M80 82C78 54 128 54 128 82C122 70 90 70 80 82Z" fill={HAIR} /><path d="M82 96C84 122 94 128 104 128C114 128 124 122 126 96C120 108 90 108 82 96Z" fill={HAIR} />
      <path d="M58 142C48 180 52 240 60 292l16-2C70 240 72 190 80 150Z" fill={c.groom} /><path d="M150 142C162 180 160 230 150 262l-16-6C144 226 144 184 136 150Z" fill={c.groom} />
      {/* bride */}
      <path d="M164 262C150 330 126 400 112 432H268C252 396 232 330 220 262Z" fill={c.bride} />
      {gown.map((g, i) => <circle key={i} cx={g.x + 40} cy={g.y + 6} r="2.4" fill={c.embroidery} opacity=".7" />)}
      <path d="M118 424H262V440H118Z" fill={c.embroidery} opacity=".55" />
      <path d="M160 168C160 150 226 150 226 168L222 270H164Z" fill={c.bride} /><path d="M158 258H228V272H158Z" fill={c.embroidery} opacity=".6" />
      <rect x="182" y="130" width="20" height="26" fill={SKIN} /><ellipse cx="192" cy="112" rx="22" ry="27" fill={SKIN} />
      <path d="M170 108C166 84 216 80 216 108C212 94 180 94 170 108Z" fill={HAIR} /><path d="M170 108C160 160 164 210 174 250C186 220 184 170 178 120Z" fill={HAIR} />
      <path d="M160 168C140 220 128 300 132 420l10 2C148 320 158 240 176 190Z" fill={c.dupatta} opacity=".8" />
      <path d="M164 174C150 200 142 214 150 226" stroke={SKIN} strokeWidth="13" fill="none" strokeLinecap="round" /><circle cx="150" cy="228" r="8" fill={SKIN} />
    </svg>
  );
}

/** Dancing couple: groom raises his hand, bride's skirt swirls. */
export function DanceCouple({ className, style, palette = 'dance' }: P & { palette?: keyof typeof palettes | string }) {
  const c = palettes[palette] ?? palettes.dance;
  return (
    <svg viewBox="0 0 340 440" className={className} style={style} aria-hidden="true" focusable="false">
      <g className="ep-sway-soft">
        <path d="M168 300h50l-8 130h-22l-6-80-8 80h-22Z" fill={c.groom} />
        <path d="M152 148C152 126 232 126 232 148L238 316H148Z" fill={c.groom} /><path d="M192 138v178" stroke={c.groomTrim} strokeWidth="2" />{[170, 200, 230, 260].map((y) => <circle key={y} cx="192" cy={y} r="2.6" fill={c.groomTrim} />)}
        <path d="M152 150C140 190 150 250 158 292l16-4C170 250 164 200 170 160Z" fill={c.groom} />
        <path className="ep-hand" d="M230 150C250 130 256 96 250 60l-16-4C238 90 232 112 220 128Z" fill={c.groom} /><circle cx="244" cy="52" r="9" fill={SKIN} />
        <rect x="180" y="118" width="24" height="26" fill={SKIN} /><ellipse cx="192" cy="98" rx="23" ry="29" fill={SKIN} /><path d="M168 92C166 64 218 64 218 92C212 80 178 80 168 92Z" fill={HAIR} />
      </g>
      <path d="M86 252C60 300 20 384 6 434H206C196 380 160 300 128 252Z" fill={c.bride} />
      <path d="M86 252C70 320 80 390 96 434M128 252C132 330 140 390 150 434" stroke={c.embroidery} strokeWidth="3" opacity=".5" fill="none" />
      <path d="M6 424H206V440H6Z" fill={c.embroidery} opacity=".5" />
      <path d="M80 170C80 150 150 150 150 170L146 258H84Z" fill={c.bride} /><path d="M82 244H148V258H82Z" fill={c.embroidery} opacity=".6" />
      <rect x="104" y="132" width="20" height="26" fill={SKIN} /><ellipse cx="114" cy="114" rx="22" ry="27" fill={SKIN} /><path d="M92 110C88 86 138 84 138 110C132 96 100 96 92 110Z" fill={HAIR} /><circle cx="94" cy="92" r="10" fill={HAIR} />
      <path d="M150 176C170 180 186 186 190 196" stroke={SKIN} strokeWidth="12" fill="none" strokeLinecap="round" /><path d="M80 176C60 196 52 220 56 246" stroke={SKIN} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M84 168C50 210 20 280 10 380L40 340C50 290 70 220 96 180Z" fill={c.dupatta} opacity=".75" />
    </svg>
  );
}

/** Watercolor-style wedding portrait: bride and groom in ivory, facing each other (final scene). */
export function WhiteCouple({ className, style }: P) {
  return (
    <svg viewBox="0 0 320 260" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M20 260C24 200 70 176 100 172L130 190L150 260Z" fill="#F7F4EC" stroke="#DAD3C2" strokeWidth="1.4" /><path d="M86 176L110 232L130 180Z" fill="#fff" opacity=".7" />
      <path d="M110 176l22 16-22 12z" fill="#1E1A1E" /><path d="M132 176l-22 16 22 12z" fill="#1E1A1E" /><circle cx="121" cy="190" r="4" fill="#2A242A" />
      <rect x="104" y="148" width="26" height="28" fill="#F2C9A8" /><ellipse cx="124" cy="116" rx="40" ry="46" fill="#F6D0B0" /><path d="M86 108C84 66 154 56 166 98C150 82 112 84 86 108Z" fill="#6B3E2A" />
      <path d="M104 120q8 6 16 0" stroke="#5A3A2A" strokeWidth="2" fill="none" /><path d="M146 122q-8 6-16 0" stroke="#5A3A2A" strokeWidth="2" fill="none" /><path d="M110 142q14 12 30 0" stroke="#B5524A" strokeWidth="2.4" fill="none" /><ellipse cx="104" cy="134" rx="6" ry="3" fill="#F0A8A0" opacity=".6" /><ellipse cx="146" cy="134" rx="6" ry="3" fill="#F0A8A0" opacity=".6" />
      <path d="M300 260C296 208 266 184 238 178C214 184 196 198 182 260Z" fill="#FFFFFF" stroke="#DAD3C2" strokeWidth="1.4" /><path d="M236 178C250 196 280 196 300 192" stroke="#F0E6D8" strokeWidth="14" fill="none" />
      <rect x="208" y="150" width="22" height="30" fill="#F6D0B0" /><ellipse cx="204" cy="118" rx="38" ry="44" fill="#F8D6B8" />
      <path d="M170 110C166 70 238 66 244 112C246 140 240 160 224 170C240 140 232 100 196 94C184 96 174 100 170 110Z" fill="#B8604A" /><circle cx="236" cy="100" r="22" fill="#B8604A" /><circle cx="236" cy="100" r="14" fill="#C8705A" />
      <path d="M186 122q8 6 16 0" stroke="#5A3A2A" strokeWidth="2" fill="none" /><path d="M222 122q-8 6-16 0" stroke="#5A3A2A" strokeWidth="2" fill="none" /><path d="M188 142q14 12 30 0" stroke="#C0504A" strokeWidth="2.4" fill="none" /><ellipse cx="184" cy="134" rx="6" ry="3" fill="#F0A8A0" opacity=".6" />
    </svg>
  );
}
