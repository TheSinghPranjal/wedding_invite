import Couple, { type OutfitKey } from './Couple';
import { Garland, Marigold } from './Flora';
import { Umbrella, Diya, Kalash } from './Decor';

/** Grand ornamental mandap with pillars, scalloped valance, dome, bells, garlands, diyas and kalash. Couple sits at its centre. */
export default function Mandap({ className = '', variant = 'wedding', withCouple = true }: { className?: string; variant?: OutfitKey; withCouple?: boolean }) {
  const pillar = (x: number, w: number, y0: number, op = 1) => (
    <g opacity={op}>
      <rect x={x - w / 2} y={y0} width={w} height={372 - y0} fill="url(#rbGold)" stroke="#8A5E1E" strokeWidth="1.2" />
      {[-0.28, 0, 0.28].map((k) => <line key={k} x1={x + k * w} y1={y0 + 12} x2={x + k * w} y2={366} stroke="#8A5E1E" strokeWidth=".8" opacity=".6" />)}
      <path d={`M${x - w * 0.9} ${y0} h${w * 1.8} l-${w * 0.2} -12 h-${w * 1.4}z`} fill="url(#rbGold)" stroke="#8A5E1E" /><circle cx={x - w * 0.8} cy={y0 - 6} r="5" fill="#8E1B2E" stroke="#D5AD55" /><circle cx={x + w * 0.8} cy={y0 - 6} r="5" fill="#8E1B2E" stroke="#D5AD55" />
      <rect x={x - w * 0.85} y="356" width={w * 1.7} height="16" fill="url(#rbGold)" stroke="#8A5E1E" />
    </g>
  );
  const scallops = Array.from({ length: 16 }, (_, i) => 52 + i * 19.6);
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="200" cy="380" rx="200" ry="20" fill="rgba(0,0,0,.25)" />
      {/* steps */}
      <rect x="14" y="372" width="372" height="28" fill="url(#rbBurg)" stroke="#D5AD55" /><rect x="40" y="360" width="320" height="14" fill="#8E1B2E" stroke="#D5AD55" />
      {pillar(116, 14, 112, 0.65)}{pillar(284, 14, 112, 0.65)}
      {/* dome */}
      <g className="rb-dome">
        <path d="M70 100C74 50 136 28 200 12c64 16 126 38 130 88z" fill="url(#rbBurg)" stroke="#D5AD55" strokeWidth="2" />
        {[-52, -26, 0, 26, 52].map((k) => <path key={k} d={`M200 12C${200 + k * 1.4} 40 ${200 + k * 2} 70 ${200 + k * 2.4} 100`} stroke="#D5AD55" strokeWidth="1.2" fill="none" opacity=".8" />)}
        <path d="M196 12v-10M204 12v-10" stroke="#D5AD55" strokeWidth="3" /><circle cx="200" cy="2" r="5" fill="url(#rbGold)" />
      </g>
      <rect x="44" y="98" width="312" height="26" fill="url(#rbMari)" stroke="#D5AD55" strokeWidth="1.5" /><rect x="44" y="98" width="312" height="6" fill="url(#rbGold)" />
      {scallops.map((x, i) => <path key={i} d={`M${x - 9.8} 124a9.8 9.8 0 0 0 19.6 0z`} fill={i % 2 ? '#8E1B2E' : 'url(#rbGold)'} stroke="#8A5E1E" strokeWidth=".6" />)}
      {scallops.filter((_, i) => i % 2 === 0).map((x, i) => <g key={i} className="rb-sway" style={{ transformOrigin: `${x}px 134px`, animationDelay: `${i * 0.3}s` }}><line x1={x} y1="134" x2={x} y2="146" stroke="#D5AD55" /><path d={`M${x - 5} 158c0-8 2-12 5-12s5 4 5 12z`} fill="url(#rbGold)" stroke="#8A5E1E" strokeWidth=".6" /></g>)}
      <Garland x1={50} y1={136} x2={190} y2={140} sag={34} n={11} r={7} seed={3} /><Garland x1={210} y1={140} x2={350} y2={136} sag={34} n={11} r={7} seed={4} />
      {pillar(60, 20, 120)}{pillar(340, 20, 120)}
      {[84, 316].map((x, i) => <g key={x} className="rb-sway" style={{ transformOrigin: `${x}px 124px`, animationDelay: `${i * 0.5}s` }}>{Array.from({ length: 11 }, (_, j) => <Marigold key={j} x={x} y={132 + j * 11} r={5.4} yellow={j % 3 === 1} />)}</g>)}
      {withCouple && <svg x="132" y="186" width="136" height="190" viewBox="40 40 270 400"><Couple variant={variant} /></svg>}
      <svg x="-2" y="316" width="44" height="64" viewBox="0 0 80 120"><Kalash /></svg><svg x="358" y="316" width="44" height="64" viewBox="0 0 80 120"><Kalash /></svg>
      <svg x="86" y="342" width="34" height="34" viewBox="0 0 60 60"><Diya /></svg><svg x="280" y="342" width="34" height="34" viewBox="0 0 60 60"><Diya /></svg>
      <svg x="-16" y="150" width="60" height="75" viewBox="0 0 120 150"><Umbrella /></svg><svg x="356" y="150" width="60" height="75" viewBox="0 0 120 150"><Umbrella a="#2B5FA8" b="#E8408A" /></svg>
    </svg>
  );
}
