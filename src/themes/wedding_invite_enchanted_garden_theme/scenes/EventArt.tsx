import { Petals, GoldDust } from '../art/Particles';
import { BotanicalOrbitSystem, type OrbitSpec } from '../art/Orbit';
import { MarigoldTorana, FlowerString, BananaLeaf, FloralArch, Garland } from '../art/Flora';
import { Umbrella, Thali, MarigoldPot, Henna, Dholak, Sitar, Drape, Diya } from '../art/Props';
import { FestiveCanopy, PalmTree, LotusBorder, LotusMotif, HangingBell, IllustratedWeddingCouple, Bride, Twinkles } from '../art/Festive';
import { HangingFloralArrangement, FloralCorner, HangingStars, OrganicShapes, HangingVine } from '../art/Botanical';
import { Bloom, Leaf } from '../art/Orbit';
import { A, L } from './common';

const orbits = (a: OrbitSpec['kind'], b: OrbitSpec['kind']): OrbitSpec[] => [
  { side: 'left', kind: a, size: 520, top: 44, crop: 0.64, dir: 1, rotate: 120, opacity: 0.5, parallax: 120 },
  { side: 'right', kind: b, size: 540, top: 62, crop: 0.64, dir: -1, rotate: 110, opacity: 0.5, parallax: 160 },
  { side: 'left', kind: 'starburst', size: 220, top: 90, crop: 0.5, dir: -1, rotate: 220, opacity: 0.4, parallax: 240, desktopOnly: true },
  { side: 'right', kind: 'medallion', size: 210, top: 12, crop: 0.5, dir: 1, rotate: 240, opacity: 0.4, parallax: 260, desktopOnly: true },
];

/** The central art area (between title block and details). */
const Box = ({ children, z = 3, top = '25%' }: { children: React.ReactNode; z?: number; top?: string }) => <A className="tg-ev-hero" style={{ left: 0, right: 0, top, bottom: 'calc(var(--db, 4cqw) + 42cqw)', zIndex: z, display: 'grid', placeItems: 'end center' }}>{children}</A>;

export function HaldiArt() {
  return (<>
    <BotanicalOrbitSystem specs={orbits('festive', 'festive')} color="#C8561A" />
    <Petals count={22} seed={4} colors={['#F59A1E', '#FFD84F', '#E2552B', '#FFE27A']} /><GoldDust count={18} seed={5} />
    <L d={0.1} z={1}><MarigoldTorana className="tg-torana" /></L>
    <L d={0.25}>
      <A style={{ left: '6%', top: 0, width: '8cqw' }}><FlowerString length={210} /></A><A style={{ left: '16%', top: 0, width: '8cqw' }}><FlowerString length={140} delay={0.5} /></A>
      <A style={{ right: '6%', top: 0, width: '8cqw' }}><FlowerString length={210} delay={0.8} /></A><A style={{ right: '16%', top: 0, width: '8cqw' }}><FlowerString length={140} delay={1.2} /></A>
    </L>
    <L d={0.4} z={2}>
      <A className="tg-umb" style={{ left: '4%', top: '28%', width: '26cqw' }}><Umbrella a="#E8408A" b="#F7B52D" /></A>
      <A className="tg-umb" style={{ right: '4%', top: '26%', width: '26cqw' }}><Umbrella a="#F7B52D" b="#E8408A" /></A>
    </L>
    <Box><div style={{ width: '66cqw' }}><IllustratedWeddingCouple variant="haldi" className="tg-fit-w" /></div></Box>
    <L d={0.6} z={4}>
      <A style={{ left: '-3cqw', bottom: '34cqw', width: '24cqw' }}><BananaLeaf /></A><A style={{ right: '-3cqw', bottom: '34cqw', width: '24cqw', transform: 'scaleX(-1)' }}><BananaLeaf /></A>
      <A style={{ left: '12cqw', bottom: '38cqw', width: '28cqw' }}><Thali /></A><A style={{ right: '12cqw', bottom: '38cqw', width: '28cqw' }}><Thali /></A>
      <A style={{ left: '2cqw', bottom: '38cqw', width: '12cqw' }}><MarigoldPot /></A><A style={{ right: '2cqw', bottom: '38cqw', width: '12cqw' }}><MarigoldPot /></A>
    </L>
  </>);
}

export function MehendiArt() {
  return (<>
    <BotanicalOrbitSystem specs={orbits('henna', 'leaf')} color="#E9D58A" />
    <Petals count={16} seed={8} colors={['#F4A6C0', '#FFE2A8', '#C7E6B0']} />
    <L d={0.1} z={1}><A style={{ top: 0, left: 0, right: 0 }}><HangingVine className="tg-fit" style={{ width: '45cqw' }} /></A><A style={{ top: 0, right: 0, transform: 'scaleX(-1)' }}><HangingVine style={{ width: '45cqw' }} /></A></L>
    <L d={0.3} z={1}>
      <A className="tg-henna" style={{ left: '1cqw', top: '24%', width: '30cqw', color: '#E9D58A' }}><Henna /></A>
      <A className="tg-henna" style={{ right: '1cqw', top: '24%', width: '30cqw', color: '#E9D58A', transform: 'scaleX(-1)' }}><Henna /></A>
    </L>
    <Box>
      <div style={{ position: 'relative', height: '96%', maxHeight: '110cqw', aspectRatio: '3 / 4' }}>
        <svg viewBox="0 0 300 400" className="tg-fit" fill="none" stroke="#E9D58A" strokeWidth="3"><path className="tg-draw" d="M20 400V160a130 130 0 0 1 260 0v240" /><path className="tg-draw" d="M70 20C60 90 64 160 70 230M230 20C240 90 236 160 230 230" strokeWidth="2" /><rect className="tg-draw" x="60" y="228" width="180" height="14" rx="7" fill="#C7E6B0" fillOpacity=".3" /></svg>
        {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: 'absolute', left: `${25 + i * 12.5}%`, top: '56%', width: '9%', aspectRatio: '1' }}><svg viewBox="-20 -20 40 40" className="tg-fit"><Bloom x={0} y={0} r={16} petals={6} rot={i * 30} /></svg></div>)}
        <A style={{ left: '22%', bottom: 0, width: '56%', height: '84%' }}><Bride variant="mehendi" className="tg-fit" /></A>
      </div>
    </Box>
    <L d={0.6} z={4}>
      <A style={{ left: '-4cqw', bottom: '34cqw', width: '26cqw' }}><FloralCorner tone="pink" className="tg-fit" /></A><A style={{ right: '-4cqw', bottom: '34cqw', width: '26cqw', transform: 'scaleX(-1)' }}><FloralCorner tone="pink" className="tg-fit" /></A>
      <A style={{ left: '22cqw', bottom: '38cqw', width: '10cqw' }}><Diya /></A><A style={{ right: '22cqw', bottom: '38cqw', width: '10cqw' }}><Diya /></A>
    </L>
  </>);
}

const Lantern = ({ len = 60 }: { len?: number }) => (
  <svg viewBox={`0 0 40 ${len + 80}`} className="tg-swing tg-fit-w" aria-hidden="true" focusable="false">
    <line x1="20" y1="0" x2="20" y2={len} stroke="#E8C86A" strokeDasharray="3 3" /><g transform={`translate(0 ${len})`}><circle cx="20" cy="30" r="30" fill="url(#tgGlow)" className="tg-pulse" /><path d="M10 4h20l4 8v38l-4 8H10l-4-8V12z" fill="url(#tgLamp)" stroke="#D5AD55" strokeWidth="2" /></g>
  </svg>
);

export function SangeetArt() {
  return (<>
    <BotanicalOrbitSystem specs={orbits('pink', 'concentric')} color="#E8C86A" />
    <GoldDust count={34} seed={12} /><Twinkles count={14} seed={15} />
    <L d={0.05} z={1}><div className="tg-spot" /></L>
    <L d={0.2} z={1}>
      <A style={{ left: 0, top: 0, width: '22cqw', height: '62%' }}><Drape className="tg-fit" a="#8F1A5A" b="#4A0A36" /></A>
      <A style={{ right: 0, top: 0, width: '22cqw', height: '62%', transform: 'scaleX(-1)' }}><Drape className="tg-fit" a="#8F1A5A" b="#4A0A36" /></A>
    </L>
    <L d={0.3} z={2}>
      <A style={{ left: '24cqw', top: 0, width: '9cqw' }}><Lantern len={50} /></A><A style={{ left: '46cqw', top: 0, width: '9cqw' }}><Lantern len={20} /></A><A style={{ right: '24cqw', top: 0, width: '9cqw' }}><Lantern len={80} /></A>
      <A style={{ left: '14cqw', top: '4%', width: '14cqw' }}><svg viewBox="0 0 60 60" className="tg-fit"><Bloom x={30} y={30} r={24} rot={10} /></svg></A>
    </L>
    <Box>
      <div style={{ position: 'relative', height: '96%', maxHeight: '105cqw', aspectRatio: '4 / 5' }}>
        <svg viewBox="0 0 300 380" className="tg-fit" fill="none" stroke="#E8C86A" strokeWidth="2.4"><path d="M10 380V150C10 80 80 48 150 16c70 32 140 64 140 134v230" /><path d="M36 380V156C36 96 96 70 150 44c54 26 114 52 114 112v224" opacity=".6" /><ellipse cx="150" cy="372" rx="140" ry="14" fill="rgba(247,197,45,.25)" stroke="none" /></svg>
        <A className="tg-dance" style={{ left: '8%', bottom: 0, width: '84%' }}><IllustratedWeddingCouple variant="sangeet" className="tg-fit-w" /></A>
      </div>
    </Box>
    <L d={0.5} z={4}>
      <A style={{ left: '4cqw', bottom: '40cqw', width: '26cqw' }}><Dholak /></A><A style={{ right: '5cqw', bottom: '38cqw', width: '9cqw' }}><Sitar /></A>
      <A style={{ left: '34cqw', bottom: '38cqw', width: '9cqw' }}><Diya /></A><A style={{ right: '34cqw', bottom: '38cqw', width: '9cqw' }}><Diya /></A>
    </L>
  </>);
}

/** Festive wedding mandap: orange-green pillars, magenta lotus dome, bells, garlands, kalash, couple. */
function FestiveMandap() {
  const pillar = (x: number, w: number, y: number, o = 1) => <g opacity={o}><rect x={x - w / 2} y={y} width={w} height={300 - y} fill="#E9831B" stroke="#F8C93B" strokeWidth="2" />{[0.3, 0.55, 0.8].map((k) => <rect key={k} x={x - w / 2 - 2} y={y + (300 - y) * k} width={w + 4} height="5" fill="#F8C93B" />)}<rect x={x - w * 0.8} y={y - 8} width={w * 1.6} height="10" fill="#4C8A2A" stroke="#F8C93B" /></g>;
  return (
    <svg viewBox="0 0 300 320" className="tg-fit" aria-hidden="true" focusable="false">
      <ellipse cx="150" cy="306" rx="150" ry="12" fill="rgba(0,0,0,.25)" />
      <rect x="10" y="290" width="280" height="22" fill="#8F1A33" stroke="#F8C93B" strokeWidth="2" /><rect x="30" y="278" width="240" height="14" fill="#B3254F" stroke="#F8C93B" />
      {pillar(88, 14, 120, 0.7)}{pillar(212, 14, 120, 0.7)}
      <path d="M50 116C52 70 100 40 150 18c50 22 98 52 100 98z" fill="#B3254F" stroke="#F8C93B" strokeWidth="2.4" />
      {[-44, -22, 0, 22, 44].map((k) => <path key={k} d={`M150 18C${150 + k} 50 ${150 + k * 1.6} 84 ${150 + k * 2} 116`} stroke="#F8C93B" strokeWidth="1.4" fill="none" />)}
      <LotusMotif x={150} y={22} s={0.6} />
      <rect x="40" y="112" width="220" height="20" fill="#5E8A2E" stroke="#F8C93B" strokeWidth="2" />
      {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={52 + i * 15.4} cy={142} r="7" fill={i % 2 ? 'url(#tgMariY)' : 'url(#tgMari)'} stroke="#C7581A" strokeWidth=".6" />)}
      <g><HangingBell x={90} y={150} s={0.55} /><HangingBell x={150} y={152} s={0.55} /><HangingBell x={210} y={150} s={0.55} /></g>
      <Garland x1={44} y1={136} x2={146} y2={140} sag={26} n={9} r={6} seed={3} /><Garland x1={154} y1={140} x2={256} y2={136} sag={26} n={9} r={6} seed={4} />
      {pillar(44, 18, 128)}{pillar(256, 18, 128)}
    </svg>
  );
}

export function WeddingArt() {
  return (<>
    <BotanicalOrbitSystem specs={orbits('festive', 'pink')} color="#F7C52D" />
    <Petals count={22} seed={6} colors={['#F59A1E', '#FFD84F', '#E2552B', '#F2A2B8']} /><GoldDust count={24} seed={7} /><Twinkles count={14} seed={19} />
    <L d={0.15} z={1}><A style={{ left: '-7cqw', bottom: '12cqw', width: '44cqw' }}><PalmTree className="tg-fit" /></A><A style={{ right: '-7cqw', bottom: '12cqw', width: '44cqw', transform: 'scaleX(-1)' }}><PalmTree className="tg-fit" /></A></L>
    <L d={0.05} z={4}><A className="tg-canopy-ev" style={{ top: 0, left: 0, width: '100%' }}><FestiveCanopy className="tg-fit" /></A></L>
    <Box top="36%"><div className="tg-mandap" style={{ height: '100%', maxHeight: '96cqw', aspectRatio: '1 / 1.05', position: 'relative' }}><FestiveMandap /><A style={{ left: '28%', bottom: '4%', width: '44%' }}><IllustratedWeddingCouple className="tg-fit-w" /></A></div></Box>
    <L d={0.55} z={5}><A style={{ bottom: 0, left: 0, width: '100%', height: '8cqw' }}><LotusBorder className="tg-fit" /></A></L>
  </>);
}

export function ReceptionArt() {
  return (<>
    <A style={{ inset: 0, zIndex: 0 }}><OrganicShapes variant="cream" className="tg-fit" /></A>
    <BotanicalOrbitSystem specs={orbits('leaf', 'pink')} color="#C9A24C" />
    <Petals count={12} seed={13} colors={['#F3D3DC', '#F2A2B8', '#FFFDF6']} />
    <L d={0.1} z={3}><A style={{ top: 0, left: 0, width: '100%' }}><HangingFloralArrangement className="tg-fit" /></A></L>
    <HangingStars strings={[[8, 240], [18, 160], [82, 160], [92, 240]]} />
    <Box top="40%"><div style={{ position: 'relative', width: '90cqw', aspectRatio: '400 / 260' }}><FloralArch className="tg-fit" /><A style={{ left: '27%', bottom: 0, width: '46%' }}><IllustratedWeddingCouple variant="wedding" className="tg-fit-w" /></A></div></Box>
    <L d={0.55} z={4}><A style={{ left: '-4cqw', bottom: '32cqw', width: '34cqw' }}><FloralCorner className="tg-fit" /></A><A style={{ right: '-4cqw', bottom: '32cqw', width: '34cqw', transform: 'scaleX(-1)' }}><FloralCorner className="tg-fit" /></A></L>
  </>);
}

export function GenericArt() {
  return (<>
    <A style={{ inset: 0, zIndex: 0 }}><OrganicShapes variant="frame" className="tg-fit" /></A>
    <BotanicalOrbitSystem specs={orbits('concentric', 'leaf')} color="#D5AD55" />
    <L d={0.1} z={3}><A style={{ top: 0, left: 0, width: '100%' }}><HangingFloralArrangement className="tg-fit" /></A></L>
    <L d={0.4} z={4}><A style={{ left: '-4cqw', bottom: '32cqw', width: '34cqw' }}><FloralCorner className="tg-fit" /></A><A style={{ right: '-4cqw', bottom: '32cqw', width: '34cqw', transform: 'scaleX(-1)' }}><FloralCorner className="tg-fit" /></A></L>
    <Box><A style={{ left: '20%', right: '20%', top: '8%', bottom: '8%' }}><svg viewBox="-110 -110 220 220" className="tg-fit" fill="none" stroke="url(#tgGold)"><circle r="100" strokeWidth="1.4" /><circle r="92" strokeWidth=".6" strokeDasharray="2 4" /><g fill="#D9967E"><Leaf x={0} y={0} len={0} rot={0} /></g></svg></A></Box>
  </>);
}
