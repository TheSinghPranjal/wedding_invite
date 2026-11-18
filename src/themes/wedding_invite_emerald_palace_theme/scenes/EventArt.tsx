import type { ReactNode } from 'react';
import { Petals, GoldDust } from '../art/Particles';
import { SideOrnamentLayer, PeacockOrbit, type OrbitSpec } from '../art/Orbit';
import { MarigoldTorana, FlowerString } from '../art/Flora';
import { Henna, Dholak, Sitar, Thali, Diya } from '../art/Props';
import { Lotus, BananaLeaves, ShrubRow, PeacockFan, PeacockLine, HangingLeaves, Palm } from '../art/Nature';
import { GoldPavilion } from '../art/Palace';
import { ElephantString, GoldArch, FloralRoundArch, Sparkle } from '../art/Ornate';
import { GardenCouple, DanceCouple, WhiteCouple } from '../art/People';
import { A, L } from './common';

const orbits = (a: OrbitSpec['kind'], b: OrbitSpec['kind'], op = 0.45): OrbitSpec[] => [
  { side: 'left', kind: a, size: 520, top: 44, crop: 0.64, dir: 1, rotate: 120, opacity: op, parallax: 120 },
  { side: 'right', kind: b, size: 540, top: 62, crop: 0.64, dir: -1, rotate: 110, opacity: op, parallax: 160 },
  { side: 'left', kind: 'eye', size: 210, top: 90, crop: 0.5, dir: -1, rotate: 220, opacity: 0.4, parallax: 240, desktopOnly: true },
  { side: 'right', kind: 'medallion', size: 200, top: 12, crop: 0.5, dir: 1, rotate: 240, opacity: 0.4, parallax: 260, desktopOnly: true },
];

/** Central art area between the title block and the details; `--db` is the details block's bottom offset. */
const Box = ({ children, z = 3, top = '25%' }: { children: ReactNode; z?: number; top?: string }) => (
  <A className="ep-ev-hero" style={{ left: 0, right: 0, top, bottom: 'calc(var(--db, 4cqw) + 44cqw)', zIndex: z, display: 'grid', placeItems: 'end center' }}>{children}</A>
);
const low = 'calc(var(--db, 4cqw) + 38cqw)';

export function HaldiArt() {
  return (<>
    <SideOrnamentLayer specs={orbits('medallion', 'eye')} color="#C98A1E" />
    <Petals count={20} seed={4} colors={['#F8D45A', '#F4B63C', '#FFF3B8', '#E5A92A']} /><GoldDust count={16} seed={5} />
    <L d={0.1} z={1}><MarigoldTorana className="ep-torana" /></L>
    <L d={0.2} z={2}>{[4, 15].map((x, i) => <A key={x} style={{ left: `${x}%`, top: 0, width: '8cqw' }}><FlowerString length={190 - i * 70} delay={i * 0.5} /></A>)}{[4, 15].map((x, i) => <A key={`r${x}`} style={{ right: `${x}%`, top: 0, width: '8cqw' }}><FlowerString length={190 - i * 70} delay={i * 0.5 + 0.3} /></A>)}</L>
    <Box><div style={{ width: '58cqw' }}><GardenCouple palette="haldi" className="ep-fit-w" /></div></Box>
    <L d={0.5} z={4}><A style={{ left: '-3cqw', bottom: low, width: '24cqw' }}><BananaLeaves className="ep-fit-w" /></A><A style={{ right: '-3cqw', bottom: low, width: '24cqw', transform: 'scaleX(-1)' }}><BananaLeaves className="ep-fit-w" /></A><A style={{ left: '8cqw', bottom: low, width: '28cqw' }}><Thali /></A><A style={{ right: '8cqw', bottom: low, width: '28cqw' }}><Thali /></A></L>
  </>);
}

export function MehendiArt() {
  return (<>
    <SideOrnamentLayer specs={orbits('feather', 'botanical')} color="#C6A45D" />
    <Petals count={12} seed={8} colors={['#E6A9B0', '#CFE3C8', '#E5D1A2']} />
    <L d={0.15} z={1}><A style={{ left: 0, top: 0, width: '100%' }}><HangingLeaves className="ep-fit-w" /></A></L>
    <L d={0.3} z={1}><A className="ep-henna" style={{ left: '1cqw', top: '27%', width: '28cqw', color: '#E5D1A2' }}><Henna /></A><A className="ep-henna" style={{ right: '1cqw', top: '27%', width: '28cqw', color: '#E5D1A2', transform: 'scaleX(-1)' }}><Henna /></A></L>
    <Box><div style={{ position: 'relative', height: '96%', maxHeight: '104cqw', aspectRatio: '3 / 4' }}>
      <svg viewBox="0 0 300 400" className="ep-fit" fill="none" stroke="#E5D1A2" strokeWidth="2.4"><path className="ep-draw" d="M70 0V150M230 0V150" /><rect className="ep-draw" x="50" y="150" width="200" height="14" rx="7" fill="rgba(229,209,162,.25)" /></svg>
      <A style={{ left: '16%', bottom: 0, width: '68%' }}><GardenCouple palette="mehendi" className="ep-fit-w" /></A>
    </div></Box>
    <L d={0.55} z={4}><A style={{ left: '2cqw', bottom: low, width: '16cqw' }}><Lotus className="ep-fit-w" /></A><A style={{ right: '2cqw', bottom: low, width: '16cqw' }}><Lotus bud className="ep-fit-w" /></A><A style={{ left: '22cqw', bottom: low, width: '9cqw' }}><Diya /></A><A style={{ right: '22cqw', bottom: low, width: '9cqw' }}><Diya /></A></L>
  </>);
}

export function SangeetArt() {
  return (<>
    <SideOrnamentLayer specs={orbits('filigree', 'medallion', 0.5)} color="#E5D1A2" />
    <GoldDust count={32} seed={12} />
    <L d={0.05} z={1}><div className="ep-spot" /></L>
    <L d={0.2} z={2}>{[5, 12, 19].map((x, i) => <A key={x} style={{ left: `${x}%`, top: 0, width: '6.5cqw' }}><ElephantString length={90 + i * 30} delay={i * 0.4} className="ep-fit-w" /></A>)}{[5, 12, 19].map((x, i) => <A key={`r${x}`} style={{ right: `${x}%`, top: 0, width: '6.5cqw' }}><ElephantString length={90 + i * 30} delay={i * 0.4 + 0.2} className="ep-fit-w" /></A>)}</L>
    <Box><div style={{ position: 'relative', height: '96%', maxHeight: '104cqw', aspectRatio: '4 / 5' }}>
      <svg viewBox="0 0 300 380" className="ep-fit" fill="none" stroke="#E5D1A2" strokeWidth="2"><path d="M10 380V150C10 80 80 48 150 16c70 32 140 64 140 134v230" /><path d="M36 380V156C36 96 96 70 150 44c54 26 114 52 114 112v224" opacity=".6" /><ellipse cx="150" cy="372" rx="140" ry="14" fill="rgba(229,209,162,.22)" stroke="none" /></svg>
      <A className="ep-dance" style={{ left: '10%', bottom: 0, width: '80%' }}><DanceCouple palette="sangeet" className="ep-fit-w" /></A>
    </div></Box>
    <L d={0.5} z={4}><A style={{ left: '3cqw', bottom: low, width: '28cqw' }}><Dholak /></A><A style={{ right: '5cqw', bottom: low, width: '9cqw' }}><Sitar /></A></L>
  </>);
}

export function WeddingArt() {
  return (<>
    <SideOrnamentLayer specs={orbits('feather', 'filigree')} color="#C6A45D" />
    <Petals count={18} seed={6} colors={['#E6A9B0', '#F8F1E3', '#F4B63C']} /><GoldDust count={18} seed={7} />
    <L d={0.1} z={1}><A style={{ left: '-6cqw', bottom: low, width: '26cqw' }}><Palm className="ep-fit-w" /></A><A style={{ right: '-6cqw', bottom: low, width: '26cqw', transform: 'scaleX(-1)' }}><Palm className="ep-fit-w" /></A></L>
    <Box><div className="ep-mandap" style={{ position: 'relative', height: '100%', maxHeight: '100cqw', aspectRatio: '220 / 240' }}><GoldPavilion className="ep-fit" /><A style={{ left: '34%', bottom: '4%', width: '32%' }}><GardenCouple palette="wedding" className="ep-fit-w" /></A></div></Box>
    <L d={0.5} z={4}><A style={{ left: '-2cqw', bottom: low, width: '34cqw' }}><PeacockFan className="ep-fit-w" /></A><A style={{ right: '-2cqw', bottom: low, width: '34cqw', transform: 'scaleX(-1)' }}><PeacockFan className="ep-fit-w" /></A><A style={{ left: '30cqw', bottom: low, width: '14cqw' }}><Lotus className="ep-fit-w" /></A><A style={{ right: '30cqw', bottom: low, width: '14cqw' }}><Lotus bud className="ep-fit-w" /></A><A style={{ left: '40cqw', bottom: low, width: '8cqw' }}><Diya /></A><A style={{ right: '40cqw', bottom: low, width: '8cqw' }}><Diya /></A></L>
  </>);
}

export function ReceptionArt() {
  return (<>
    <SideOrnamentLayer specs={orbits('medallion', 'filigree', 0.35)} color="#C6A45D" />
    <GoldDust count={26} seed={13} /><Petals count={8} seed={14} colors={['#F8F1E3', '#E5D1A2', '#E6A9B0']} />
    <L d={0.1} z={1}><A style={{ left: '14cqw', right: '14cqw', top: '10%', bottom: 'calc(var(--db, 4cqw) + 40cqw)' }}><GoldArch className="ep-fit" /></A></L>
    <Box top="34%"><div style={{ position: 'relative', width: '84cqw', aspectRatio: '1' }}><FloralRoundArch className="ep-fit" /><A style={{ left: '20%', bottom: '2%', width: '60%' }}><WhiteCouple className="ep-fit-w" /></A></div></Box>
    <L d={0.4} z={4}>{[10, 88, 80].map((x, i) => <A key={x} style={{ left: `${x}%`, top: `${40 + i * 8}%`, width: '9cqw' }}><Sparkle className="ep-fit-w" /></A>)}</L>
  </>);
}

export function GenericArt() {
  return (<>
    <SideOrnamentLayer specs={orbits('feather', 'filigree')} color="#C6A45D" />
    <GoldDust count={22} seed={21} />
    <Box><div style={{ position: 'relative', width: '76cqw', aspectRatio: '1' }}><PeacockOrbit kind="feather" speed={0.4} className="ep-fit" /><A style={{ left: '28%', top: '16%', width: '44%' }}><GardenCouple palette="reception" className="ep-fit-w" /></A></div></Box>
    <L d={0.4} z={2}><A style={{ left: '2cqw', bottom: low, width: '28cqw' }}><PeacockLine className="ep-fit-w" /></A><A style={{ right: '2cqw', bottom: low, width: '28cqw' }}><ShrubRow className="ep-fit-w" /></A></L>
  </>);
}
