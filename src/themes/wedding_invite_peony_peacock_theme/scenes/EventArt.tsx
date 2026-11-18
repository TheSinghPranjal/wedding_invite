import type { ReactNode } from 'react';
import { Petals, GoldDust } from '../art/Particles';
import { SideOrnamentController, FloralOrbit, type OrbitSpec, Rose, GoldStar } from '../art/Orbit';
import { Garland, FlowerString } from '../art/Flora';
import { Henna, Dholak, Sitar, Thali, Diya } from '../art/Props';
import { RoseCorner, PinkString, LineCouple, LineMandap, Peacock, Magnolia, MagnoliaBranch, MarigoldBloom, RoseArch } from '../art/Heritage';
import { A, L } from './common';

const orbits = (a: OrbitSpec['kind'], b: OrbitSpec['kind'], op = 0.55): OrbitSpec[] => [
  { side: 'left', kind: a, size: 520, top: 44, crop: 0.64, dir: 1, rotate: 120, opacity: op, parallax: 120 },
  { side: 'right', kind: b, size: 540, top: 62, crop: 0.64, dir: -1, rotate: 110, opacity: op, parallax: 160 },
  { side: 'left', kind: 'star', size: 210, top: 90, crop: 0.5, dir: -1, rotate: 220, opacity: 0.45, parallax: 240, desktopOnly: true },
  { side: 'right', kind: 'medallion', size: 200, top: 12, crop: 0.5, dir: 1, rotate: 240, opacity: 0.45, parallax: 260, desktopOnly: true },
];

/** Central art area between the title block and the details. `--db` is the details block's bottom offset. */
const Box = ({ children, z = 3, top = '25%' }: { children: ReactNode; z?: number; top?: string }) => (
  <A className="bp-ev-hero" style={{ left: 0, right: 0, top, bottom: 'calc(var(--db, 4cqw) + 44cqw)', zIndex: z, display: 'grid', placeItems: 'end center' }}>{children}</A>
);
const Corner = ({ x, y, tone = 'rose', w = 34 }: { x: 0 | 1; y: 0 | 1; tone?: 'rose' | 'coral'; w?: number }) => (
  <A style={{ left: x ? undefined : '-5cqw', right: x ? '-5cqw' : undefined, top: y ? undefined : '-5cqw', bottom: y ? '-5cqw' : undefined, width: `${w}cqw`, transform: `scale(${x ? -1 : 1}, ${y ? -1 : 1})` }}><RoseCorner tone={tone} className="bp-fit-w" /></A>
);

export function HaldiArt() {
  return (<>
    <SideOrnamentController specs={orbits('peony', 'gold')} color="#D98A2A" />
    <Petals count={20} seed={4} colors={['#F8D45A', '#F4B63C', '#FFF3B8', '#E5A92A']} /><GoldDust count={16} seed={5} />
    <L d={0.1} z={1}><A style={{ left: '50%', top: '30%', width: '92cqw', marginLeft: '-46cqw', opacity: 0.55 }}><FloralOrbit kind="peony" speed={0.4} className="bp-fit-w" /></A></L>
    <L d={0.2} z={2}>
      <A style={{ left: '4%', top: 0, width: '8cqw' }}><FlowerString length={190} /></A><A style={{ left: '15%', top: 0, width: '8cqw' }}><FlowerString length={120} delay={0.5} /></A>
      <A style={{ right: '4%', top: 0, width: '8cqw' }}><FlowerString length={190} delay={0.8} /></A><A style={{ right: '15%', top: 0, width: '8cqw' }}><FlowerString length={120} delay={1.2} /></A>
    </L>
    <L d={0.1} z={1}><A style={{ left: '-6cqw', top: '-6cqw', width: '40cqw' }}><svg viewBox="0 0 120 120"><MarigoldBloom x={40} y={40} r={36} /><MarigoldBloom x={92} y={22} r={20} /><MarigoldBloom x={22} y={94} r={22} /></svg></A><A style={{ right: '-6cqw', top: '-6cqw', width: '40cqw', transform: 'scaleX(-1)' }}><svg viewBox="0 0 120 120"><MarigoldBloom x={40} y={40} r={36} /><MarigoldBloom x={92} y={22} r={20} /><MarigoldBloom x={22} y={94} r={22} /></svg></A></L>
    <Box><div style={{ height: '100%', maxHeight: '104cqw', aspectRatio: '230 / 400' }}><LineCouple tint={{ groom: '#F6D56A', bride: '#F4B63C' }} stroke="#A87A2E" className="bp-fit" /></div></Box>
    <L d={0.5} z={4}><A style={{ left: '4cqw', bottom: 'calc(var(--db, 4cqw) + 38cqw)', width: '28cqw' }}><Thali /></A><A style={{ right: '4cqw', bottom: 'calc(var(--db, 4cqw) + 38cqw)', width: '28cqw' }}><Thali /></A></L>
  </>);
}

export function MehendiArt() {
  return (<>
    <SideOrnamentController specs={orbits('rose', 'henna')} color="#fff" />
    <Petals count={14} seed={8} colors={['#E7A2B8', '#F6E5E5', '#CFDABB']} />
    <L d={0.15} z={1}>{[8, 20, 34, 66, 80, 92].map((x, i) => <A key={x} style={{ left: `${x}%`, top: 0, width: '6cqw' }}><PinkString length={60 + (i % 3) * 36} delay={i * 0.3} /></A>)}</L>
    <L d={0.3} z={1}>
      <A className="bp-henna" style={{ left: '1cqw', top: '26%', width: '28cqw', color: '#F6E5E5' }}><Henna /></A>
      <A className="bp-henna" style={{ right: '1cqw', top: '26%', width: '28cqw', color: '#F6E5E5', transform: 'scaleX(-1)' }}><Henna /></A>
    </L>
    <Box><div style={{ position: 'relative', height: '96%', maxHeight: '104cqw', aspectRatio: '3 / 4' }}>
      <svg viewBox="0 0 300 400" className="bp-fit" fill="none" stroke="#F1E3B8" strokeWidth="2.6"><path className="bp-draw" d="M20 400V160a130 130 0 0 1 260 0v240" /><path className="bp-draw" d="M40 400V164a110 110 0 0 1 220 0v236" strokeWidth="1" /></svg>
      <A style={{ left: '30%', bottom: 0, height: '88%', aspectRatio: '120 / 400' }}><LineCouple only="bride" tint={{ bride: '#CFDABB' }} stroke="#F1E3B8" className="bp-fit" /></A>
    </div></Box>
    <L d={0.55} z={4}><Corner x={0} y={1} w={34} /><Corner x={1} y={1} w={34} /><A style={{ left: '24cqw', bottom: 'calc(var(--db, 4cqw) + 38cqw)', width: '9cqw' }}><Diya /></A><A style={{ right: '24cqw', bottom: 'calc(var(--db, 4cqw) + 38cqw)', width: '9cqw' }}><Diya /></A></L>
  </>);
}

export function SangeetArt() {
  return (<>
    <SideOrnamentController specs={orbits('gold', 'rose', 0.5)} color="#F1D8A8" />
    <GoldDust count={32} seed={12} />
    <L d={0.05} z={1}><div className="bp-spot" /></L>
    <L d={0.2} z={2}>{[10, 24, 38, 62, 76, 90].map((x, i) => <A key={x} style={{ left: `${x}%`, top: 0, width: '6cqw' }}><PinkString length={70 + (i % 3) * 40} delay={i * 0.35} /></A>)}</L>
    <Box><div style={{ position: 'relative', height: '96%', maxHeight: '104cqw', aspectRatio: '4 / 5' }}>
      <svg viewBox="0 0 300 380" className="bp-fit" fill="none" stroke="#F1D8A8" strokeWidth="2"><path d="M10 380V150C10 80 80 48 150 16c70 32 140 64 140 134v230" /><path d="M36 380V156C36 96 96 70 150 44c54 26 114 52 114 112v224" opacity=".6" /><ellipse cx="150" cy="372" rx="140" ry="14" fill="rgba(241,216,168,.25)" stroke="none" /></svg>
      <A className="bp-dance" style={{ left: '18%', bottom: 0, height: '86%', aspectRatio: '230 / 400' }}><LineCouple tint={{ groom: '#B87D91', bride: '#AF3155' }} stroke="#F1D8A8" className="bp-fit" /></A>
    </div></Box>
    <L d={0.5} z={4}><A style={{ left: '3cqw', bottom: 'calc(var(--db, 4cqw) + 40cqw)', width: '28cqw' }}><Dholak /></A><A style={{ right: '5cqw', bottom: 'calc(var(--db, 4cqw) + 38cqw)', width: '9cqw' }}><Sitar /></A><Corner x={0} y={0} w={30} /><Corner x={1} y={0} w={30} /></L>
  </>);
}

export function WeddingArt() {
  return (<>
    <SideOrnamentController specs={orbits('lace', 'wreath')} color="#E3B0B8" />
    <Petals count={18} seed={6} colors={['#F6D9DC', '#E7A2B8', '#FFF3F0']} /><GoldDust count={18} seed={7} />
    <L d={0.1} z={1}><Corner x={0} y={0} w={36} /><Corner x={1} y={0} w={36} /></L>
    <Box><div className="bp-mandap" style={{ position: 'relative', height: '100%', maxHeight: '96cqw', aspectRatio: '1 / 1' }}><LineMandap className="bp-fit" /><A style={{ left: '34%', bottom: '4%', width: '32%' }}><LineCouple className="bp-fit-w" /></A></div></Box>
    <L d={0.5} z={4}><A style={{ left: '-1cqw', bottom: 'calc(var(--db, 4cqw) + 38cqw)', width: '24cqw' }}><Peacock tone="teal" className="bp-fit-w" /></A><A style={{ right: '-1cqw', bottom: 'calc(var(--db, 4cqw) + 38cqw)', width: '24cqw', transform: 'scaleX(-1)' }}><Peacock tone="teal" className="bp-fit-w" /></A></L>
    <L d={0.6} z={5}><Corner x={0} y={1} w={32} /><Corner x={1} y={1} w={32} /></L>
  </>);
}

export function ReceptionArt() {
  return (<>
    <SideOrnamentController specs={orbits('gold', 'rose')} color="#C3A16C" />
    <Petals count={12} seed={13} colors={['#F6D9DC', '#E7A2B8', '#FFFDF6']} />
    <L d={0.1} z={1}><A style={{ left: '50%', top: '24%', width: '96cqw', marginLeft: '-48cqw', opacity: 0.6 }}><FloralOrbit kind="gold" speed={0.35} className="bp-fit-w" /></A></L>
    <Box top="36%"><div style={{ position: 'relative', width: '94cqw', aspectRatio: '400 / 260' }}><RoseArch className="bp-fit" /><A style={{ left: '34%', bottom: 0, height: '78%', aspectRatio: '230 / 400' }}><LineCouple stroke="#B58C4A" tint={{ groom: '#E6CFA8', bride: '#F6D9DC' }} className="bp-fit" /></A></div></Box>
    <L d={0.5} z={4}><A style={{ left: '-4cqw', bottom: 'calc(var(--db, 4cqw) + 36cqw)', width: '36cqw' }}><MagnoliaBranch className="bp-fit-w" /></A><A style={{ right: '-4cqw', bottom: 'calc(var(--db, 4cqw) + 36cqw)', width: '36cqw', transform: 'scaleX(-1)' }}><MagnoliaBranch className="bp-fit-w" /></A></L>
    <L d={0.2} z={2}><Corner x={0} y={0} w={32} /><Corner x={1} y={0} w={32} /></L>
  </>);
}

export function GenericArt() {
  return (<>
    <SideOrnamentController specs={orbits('wreath', 'lace')} color="#E3B0B8" />
    <GoldDust count={20} seed={21} />
    <L d={0.1} z={1}><Corner x={0} y={0} w={34} /><Corner x={1} y={0} w={34} /><Corner x={0} y={1} w={34} /><Corner x={1} y={1} w={34} /></L>
    <Box><div style={{ position: 'relative', width: '70cqw', aspectRatio: '1' }}><FloralOrbit kind="wreath" speed={0.4} className="bp-fit" /><A style={{ left: '28%', top: '14%', width: '44%' }}><LineCouple className="bp-fit-w" /></A></div></Box>
    <L d={0.4} z={2}><A style={{ left: '3cqw', top: '24%', width: '10cqw' }}><svg viewBox="-20 -20 40 40" className="bp-fit-w"><Magnolia x={0} y={0} r={16} /></svg></A><A style={{ right: '3cqw', top: '24%', width: '10cqw' }}><svg viewBox="-20 -20 40 40" className="bp-fit-w"><Rose x={0} y={0} r={14} /></svg></A><A style={{ left: '48%', top: '8%', width: '6cqw' }}><svg viewBox="-24 -24 48 48"><GoldStar r={22} /></svg></A></L>
  </>);
}

export { Garland };
