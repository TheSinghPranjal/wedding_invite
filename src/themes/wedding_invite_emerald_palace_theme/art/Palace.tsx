import type { CSSProperties } from 'react';

type P = { className?: string; style?: CSSProperties };

/** Faint white palace domes in atmospheric haze. */
export function PalaceDomes({ className, style }: P) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax meet" className={className} style={style} aria-hidden="true" focusable="false">
      <g fill="#fff" opacity=".55" stroke="#E6DFC8" strokeWidth="1">
        <path d="M-20 260V170C-20 120 20 90 60 90C100 90 140 120 140 170V260Z" /><rect x="-30" y="170" width="180" height="14" /><rect x="40" y="62" width="4" height="30" />
        <path d="M150 260V200C150 150 200 120 250 120C300 120 350 150 350 200V260Z" /><rect x="140" y="200" width="220" height="12" /><rect x="248" y="86" width="4" height="36" />
        <path d="M330 260V220C330 190 360 170 390 170C420 170 450 190 450 220V260Z" />
      </g>
      <g stroke="#E6DFC8" strokeWidth="1" opacity=".5" fill="none">{[170, 250, 320].map((x) => <path key={x} d={`M${x - 40} 260V220a20 20 0 0 1 40 0v40`} />)}</g>
    </svg>
  );
}

/** Grey stone chhatri (domed pavilion on a terrace). */
export function Chhatri({ className, style }: P) {
  return (
    <svg viewBox="0 0 160 200" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M80 6l4 14H76z" fill="#B8B4AA" />
      <path d="M22 78C22 40 50 24 80 24S138 40 138 78Z" fill="#9C9A98" stroke="#6E6C6A" strokeWidth="1.4" /><path d="M16 78H144V90H16Z" fill="#CFC8B8" stroke="#8A8472" />
      <path d="M24 96H136V190H24Z" fill="#E4D2B8" stroke="#A89878" />
      {[0, 1, 2].map((i) => <path key={i} d={`M${34 + i * 36} 190V122a14 14 0 0 1 28 0v68z`} fill="#8E7A62" opacity=".85" />)}
      <rect x="18" y="188" width="124" height="10" fill="#CFC8B8" stroke="#A89878" />
    </svg>
  );
}

/** Golden-domed palace pavilion with pillars; optional tiny couple placeholder via children slot. */
export function GoldPavilion({ className, style }: P) {
  return (
    <svg viewBox="0 0 220 240" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M110 4l5 20h-10z" fill="#C6A45D" /><path d="M110 24v10" stroke="#C6A45D" strokeWidth="3" />
      <path d="M28 120C28 70 66 36 110 36S192 70 192 120Z" fill="#E8D6A2" stroke="#B8923F" strokeWidth="2" />
      {[-44, -22, 0, 22, 44].map((k) => <path key={k} d={`M110 36C${110 + k * 0.9} 62 ${110 + k * 1.5} 92 ${110 + k * 1.9} 120`} stroke="#B8923F" strokeWidth="1.2" fill="none" />)}
      <path d="M20 120H200V136H20Z" fill="#F4E8C8" stroke="#B8923F" strokeWidth="1.4" />{Array.from({ length: 20 }, (_, i) => <path key={i} d={`M${28 + i * 8.6} 128l3-4 3 4z`} fill="#D98A5A" />)}
      <rect x="34" y="136" width="152" height="84" fill="#F6EBD0" stroke="#B8923F" /><path d="M46 220V160a22 22 0 0 1 44 0v60zM130 220V160a22 22 0 0 1 44 0v60z" fill="#EBD4A0" stroke="#B8923F" /><path d="M100 220V164a10 10 0 0 1 20 0v56z" fill="#D9B870" opacity=".7" />
      <rect x="14" y="218" width="192" height="16" fill="#F4E8C8" stroke="#B8923F" />
      <g><circle cx="94" cy="190" r="5" fill="#E9A24A" /><rect x="90" y="196" width="8" height="22" fill="#E9A24A" /><circle cx="126" cy="190" r="5" fill="#E48A8A" /><rect x="122" y="196" width="8" height="22" fill="#4E9A8A" /></g>
    </svg>
  );
}

/** Gold line-art domed pavilion (draws itself). */
export function GoldDomeLine({ className, style }: P) {
  return (
    <svg viewBox="0 0 180 260" className={className} style={style} fill="none" stroke="url(#epGold)" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path className="ep-draw" d="M90 4V30M86 30H94" /><path className="ep-draw" d="M90 30C60 30 28 60 24 110H156C152 60 120 30 90 30Z" />
      {[-48, -32, -16, 0, 16, 32, 48].map((k) => <path key={k} className="ep-draw" d={`M90 30C${90 + k * 0.7} 56 ${90 + k * 1.3} 84 ${90 + k * 1.6} 110`} />)}
      <path className="ep-draw" d="M16 110H164M20 120H160M16 128H164" /><path className="ep-draw" d="M30 128V240M60 128V240M120 128V240M150 128V240M16 240H164M10 250H170" />
      <path className="ep-draw" d="M30 150a15 15 0 0 1 30 0M60 150a30 30 0 0 1 60 0M120 150a15 15 0 0 1 30 0" />
    </svg>
  );
}

/** Stone balustrade. */
export function Balustrade({ className, style }: P) {
  return (
    <svg viewBox="0 0 400 60" preserveAspectRatio="none" className={className} style={style} aria-hidden="true" focusable="false">
      <rect y="0" width="400" height="8" fill="#D8CDB4" stroke="#B5A88C" /><rect y="52" width="400" height="8" fill="#D8CDB4" stroke="#B5A88C" />
      {Array.from({ length: 28 }, (_, i) => <path key={i} d={`M${6 + i * 14.4} 8c-4 6-4 14 0 18c4 6 4 14 0 20c-2 3 -2 4 0 6h6c2-2 2-3 0-6c-4-6-4-14 0-20c4-4 4-12 0-18z`} fill="#E6DCC4" stroke="#B5A88C" strokeWidth=".6" />)}
    </svg>
  );
}

/** Small palace waterfall with shimmering water. */
export function Waterfall({ className, style }: P) {
  return (
    <svg viewBox="0 0 180 120" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M10 120L30 30C60 10 130 12 160 40L176 120Z" fill="#8F8C80" /><path d="M40 28C60 20 120 22 144 40L150 120H60Z" fill="#B6D6E0" />
      {Array.from({ length: 9 }, (_, i) => <path key={i} className="ep-water" style={{ animationDelay: `${i * 0.25}s` }} d={`M${58 + i * 10} 30V${100 - (i % 3) * 8}`} stroke="#fff" strokeWidth="2.2" opacity=".75" strokeLinecap="round" />)}
      <ellipse cx="100" cy="114" rx="80" ry="12" fill="#5FA6B8" /><path className="ep-water" d="M40 114q10-4 20 0t20 0 20 0 20 0 20 0" stroke="#fff" fill="none" opacity=".6" />
    </svg>
  );
}

/** Cream carved column. */
export function Pillar({ className, style }: P) {
  return (
    <svg viewBox="0 0 60 420" preserveAspectRatio="none" className={className} style={style} aria-hidden="true" focusable="false">
      <rect x="6" y="0" width="48" height="26" fill="#E6D3A8" stroke="#C6A45D" /><path d="M0 26H60L52 44H8Z" fill="#D9C48E" stroke="#C6A45D" />
      <rect x="10" y="44" width="40" height="360" fill="#E8D9B6" stroke="#CDB77E" />
      {Array.from({ length: 36 }, (_, i) => <path key={i} d={`M${14 + (i % 4) * 10} ${50 + Math.floor(i / 4) * 40}l5 10 5-10`} stroke="#B9A672" fill="none" strokeWidth="1.3" />)}
      <rect x="4" y="404" width="52" height="16" fill="#D9C48E" stroke="#C6A45D" />
    </svg>
  );
}

/** Scalloped palace arch with teal vine-pattern spandrels and orange outline (formal invitation top). */
export function ScallopArchTop({ className, style }: P) {
  return (
    <svg viewBox="0 0 400 230" preserveAspectRatio="none" className={className} style={style} aria-hidden="true" focusable="false">
      <rect width="400" height="230" fill="#7FB0B8" />
      <g fill="none" stroke="#1E5A52" strokeWidth="1.4" opacity=".85">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${-10 + i * 32} 24c14 8 14 24 0 32c-14 8-14 24 0 32c14 8 14 24 0 32c-14 8-14 24 0 32`} />)}</g>
      {[[70, 54], [330, 54]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>{Array.from({ length: 10 }, (_, k) => <ellipse key={k} cy="-18" rx="9" ry="18" fill="#EBA9A8" stroke="#fff" strokeWidth=".8" transform={`rotate(${k * 36})`} />)}<circle r="10" fill="#E2A640" /></g>)}
      <path d="M0 230V120C20 110 40 90 56 60C70 40 96 40 110 30C124 14 134 8 150 12C168 -2 184 -4 200 -6C216 -4 232 -2 250 12C266 8 276 14 290 30C304 40 330 40 344 60C360 90 380 110 400 120V230Z" fill="#F0F2E4" stroke="#E4A33C" strokeWidth="3" />
    </svg>
  );
}

/** Garden fence / lattice. */
export function Fence({ className, style }: P) {
  return (
    <svg viewBox="0 0 400 70" preserveAspectRatio="none" className={className} style={style} aria-hidden="true" focusable="false">
      <rect y="14" width="400" height="6" fill="#D5BE92" /><rect y="62" width="400" height="6" fill="#D5BE92" />
      {[0, 130, 270, 390].map((x) => <g key={x}><rect x={x} y="0" width="10" height="70" fill="#D5BE92" /><rect x={x - 2} y="0" width="14" height="6" fill="#C9AE7C" /></g>)}
      <g fill="none" stroke="#C9C2A8" strokeWidth="1.4">{Array.from({ length: 26 }, (_, i) => <path key={i} d={`M${10 + i * 15} 20q7 14 0 22q-7 14 0 20`} />)}</g>
    </svg>
  );
}

/** One leaf of the carved palace door (brass panels, studs, relief motifs, ring handle). Hinge on the left; mirror for the right. */
export function DoorLeaf({ className, style, ring = true }: P & { ring?: boolean }) {
  const rows = 6;
  return (
    <svg viewBox="0 0 200 520" preserveAspectRatio="none" className={className} style={style} aria-hidden="true" focusable="false">
      <rect width="200" height="520" fill="url(#epDoor)" />
      {Array.from({ length: rows }, (_, r) => [0, 1].map((c) => (
        <g key={`${r}${c}`} transform={`translate(${14 + c * 90} ${60 + r * 74})`}><rect width="82" height="62" fill="url(#epDoorD)" stroke="#E5D1A2" strokeOpacity=".5" /><rect x="6" y="6" width="70" height="50" fill="none" stroke="#C6A45D" strokeOpacity=".7" />
          <path d="M41 10C54 22 56 40 41 52C26 40 28 22 41 10Z" fill="#B08E40" stroke="#E5D1A2" strokeWidth=".8" /><path d="M41 18V46M33 30q8 6 16 0" stroke="#E5D1A2" strokeWidth=".8" fill="none" /></g>
      )))}
      {Array.from({ length: 14 }, (_, i) => <g key={i}><circle cx="8" cy={20 + i * 36} r="4" fill="#6E5320" stroke="#E5D1A2" strokeWidth=".6" /><circle cx="192" cy={20 + i * 36} r="4" fill="#6E5320" stroke="#E5D1A2" strokeWidth=".6" /></g>)}
      <path d="M0 24C40 6 120 6 200 24V50H0Z" fill="url(#epDoorD)" opacity=".7" />
      {ring && <g className="ep-ring-knock" style={{ transformOrigin: '170px 232px' }}><circle cx="170" cy="232" r="16" fill="none" stroke="#E5D1A2" strokeWidth="4" /><path d="M156 214l14-12 14 12" fill="#B08E40" stroke="#E5D1A2" /></g>}
      <rect width="200" height="520" fill="none" stroke="#3E2C0E" strokeWidth="4" />
    </svg>
  );
}
