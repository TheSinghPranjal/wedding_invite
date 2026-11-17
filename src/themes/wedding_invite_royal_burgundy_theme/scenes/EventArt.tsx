import type { ReactNode } from 'react';
import { Petals, GoldDust } from '../art/Particles';
import { SideOrnamentLayer, type OrnamentSpec } from '../art/Mandala';
import { MarigoldTorana, FlowerString, BananaLeaf, HangingGreens, FloralArch, FlowerBall, Peony, Lotus } from '../art/Flora';
import { Umbrella, Thali, MarigoldPot, Henna, Dholak, Sitar, Drape, Chandelier, PalaceSkyline, Diya, Peacock, Chhatri } from '../art/Decor';
import { Lantern, Ganesha } from '../art/Ornaments';
import Couple from '../art/Couple';
import Mandap from '../art/Mandap';
import { MandalaDecoration } from '../art/Mandala';

/** Absolutely-positioned depth layer (moved by parallax via data-depth). */
const L = ({ d, z = 2, children, className = '' }: { d: number; z?: number; children: ReactNode; className?: string }) => (
  <div data-depth={d} className={`rb-layer ${className}`} style={{ position: 'absolute', inset: 0, zIndex: z, pointerEvents: 'none' }}>{children}</div>
);
const A = ({ style, children, className = '' }: { style: React.CSSProperties; children: ReactNode; className?: string }) => <div className={className} style={{ position: 'absolute', ...style }}>{children}</div>;

const sides = (kind: 'rangoli' | 'henna' | 'gold'): OrnamentSpec[] => {
  const base: OrnamentSpec[] = [
    { side: 'left', kind: 'mandala', size: 600, top: 42, crop: 0.62, dir: 1, rotate: 120, opacity: 0.38, parallax: 120, layers: 4 },
    { side: 'left', kind: kind === 'rangoli' ? 'sun' : 'floral', size: 280, top: 86, crop: 0.5, dir: -1, rotate: 220, opacity: 0.34, parallax: 220, desktopOnly: true },
    { side: 'left', kind: 'dots', size: 140, top: 10, crop: 0.4, dir: 1, rotate: 320, opacity: 0.32, parallax: 300, desktopOnly: true },
    { side: 'right', kind: 'mandala', size: 680, top: 62, crop: 0.64, dir: -1, rotate: 100, opacity: 0.38, parallax: 160, layers: 4 },
    { side: 'right', kind: 'floral', size: 300, top: 12, crop: 0.5, dir: 1, rotate: 240, opacity: 0.34, parallax: 260, desktopOnly: true },
    { side: 'right', kind: kind === 'rangoli' ? 'sun' : 'dots', size: 140, top: 92, crop: 0.4, dir: -1, rotate: 340, opacity: 0.32, parallax: 320, desktopOnly: true },
  ];
  return base;
};

/* Each art takes the event and returns background FX + layered artwork. */
export function HaldiArt() {
  return (<>
    <SideOrnamentLayer specs={sides('rangoli')} color="#C8561A" />
    <Petals count={22} seed={4} colors={['#F59A1E', '#FFD84F', '#E2552B', '#FFE27A']} />
    <GoldDust count={20} seed={5} />
    <L d={0.1} z={1}><MarigoldTorana className="rb-torana" /></L>
    <L d={0.25}>
      <A style={{ left: '6%', top: 0, width: 34, height: '38%' }}><FlowerString length={230} /></A>
      <A style={{ left: '13%', top: 0, width: 34, height: '30%' }}><FlowerString length={160} /></A>
      <A style={{ right: '6%', top: 0, width: 34, height: '38%' }}><FlowerString length={230} delay={0.6} /></A>
      <A style={{ right: '13%', top: 0, width: 34, height: '30%' }}><FlowerString length={160} delay={1} /></A>
    </L>
    <L d={0.4} z={2}>
      <A style={{ left: '3%', top: '26%', width: 'min(24vw,150px)' }}><Umbrella a="#E8408A" b="#F7B52D" /></A>
      <A style={{ right: '3%', top: '24%', width: 'min(24vw,150px)' }}><Umbrella a="#F7B52D" b="#E8408A" /></A>
    </L>
    <L d={0.2} z={3}><A style={{ left: '50%', top: '27%', bottom: '17%', transform: 'translateX(-50%)', width: 'min(100%,520px)' }} className="rb-ev-hero"><Couple variant="haldi" className="rb-fit" /></A></L>
    <L d={0.6} z={4}>
      <A style={{ left: '-2%', bottom: '14%', width: 'min(22vw,150px)' }}><BananaLeaf /></A><A style={{ right: '-2%', bottom: '14%', width: 'min(22vw,150px)', transform: 'scaleX(-1)' }}><BananaLeaf /></A>
      <A style={{ left: '16%', bottom: '19%', width: 'min(24vw,170px)' }}><Thali /></A><A style={{ right: '16%', bottom: '19%', width: 'min(24vw,170px)' }}><Thali /></A>
      <A style={{ left: '1%', bottom: '19%', width: 'min(12vw,70px)' }}><MarigoldPot /></A><A style={{ right: '1%', bottom: '19%', width: 'min(12vw,70px)' }}><MarigoldPot /></A>
    </L>
  </>);
}

export function MehendiArt() {
  return (<>
    <SideOrnamentLayer specs={sides('henna')} color="#D5AD55" />
    <Petals count={16} seed={8} colors={['#F4A6C0', '#FFE2A8', '#9FD58A']} />
    <L d={0.1} z={1}><HangingGreens className="rb-torana" /></L>
    <L d={0.3} z={1}>
      <A style={{ left: '2%', top: '8%', width: 'min(26vw,170px)', color: '#D5AD55' }} className="rb-henna"><Henna /></A>
      <A style={{ right: '2%', top: '8%', width: 'min(26vw,170px)', color: '#D5AD55', transform: 'scaleX(-1)' }} className="rb-henna"><Henna /></A>
    </L>
    <L d={0.25}>
      <A style={{ left: '9%', top: 0, width: 'min(18vw,60px)' }}><Lantern chain={90} className="rb-swing" /></A>
      <A style={{ right: '9%', top: 0, width: 'min(18vw,60px)' }}><Lantern chain={130} className="rb-swing" /></A>
    </L>
    <L d={0.15} z={2}>
      <A style={{ left: '50%', top: '28%', bottom: '21%', transform: 'translateX(-50%)', aspectRatio: '4 / 5' }} className="rb-ev-hero">
        <svg viewBox="0 0 300 380" className="rb-fit" fill="none" stroke="#D5AD55" strokeWidth="3"><path className="rb-draw" d="M20 380V150a130 130 0 0 1 260 0v230M40 380V152a110 110 0 0 1 220 0v228" /><path className="rb-draw" d="M150 18c8 16 8 30 0 44-8-14-8-28 0-44z" /></svg>
        <div style={{ position: 'absolute', inset: '12% 12% 0' }}><Couple variant="mehendi" only="bride" henna className="rb-fit" /></div>
      </A>
    </L>
    <L d={0.6} z={4}>
      <A style={{ left: '-3%', bottom: '14%', width: 'min(24vw,160px)' }}><BananaLeaf /></A><A style={{ right: '-3%', bottom: '14%', width: 'min(24vw,160px)', transform: 'scaleX(-1)' }}><BananaLeaf /></A>
      <A style={{ left: '20%', bottom: '17%', width: 'min(14vw,60px)' }}><Diya /></A><A style={{ right: '20%', bottom: '17%', width: 'min(14vw,60px)' }}><Diya /></A>
    </L>
  </>);
}

export function SangeetArt() {
  return (<>
    <SideOrnamentLayer specs={sides('gold')} color="#D5AD55" />
    <GoldDust count={34} seed={12} />
    <L d={0.05} z={1}><div className="rb-spot" /></L>
    <L d={0.2} z={1}>
      <A style={{ left: 0, top: 0, width: 'min(22vw,170px)', height: '70%' }}><Drape className="rb-fit" /></A>
      <A style={{ right: 0, top: 0, width: 'min(22vw,170px)', height: '70%', transform: 'scaleX(-1)' }}><Drape className="rb-fit" /></A>
    </L>
    <L d={0.3} z={2}>
      <A style={{ left: '18%', top: 0, width: 'min(14vw,56px)' }}><Lantern chain={60} className="rb-swing" /></A><A style={{ right: '18%', top: 0, width: 'min(14vw,56px)' }}><Lantern chain={90} className="rb-swing" /></A>
    </L>
    <L d={0.15} z={2}>
      <A style={{ left: '50%', top: '26%', bottom: '21%', transform: 'translateX(-50%)', aspectRatio: '1 / 1' }}>
        <svg viewBox="0 0 300 300" className="rb-fit" fill="none" stroke="#D5AD55" strokeWidth="2.4"><path d="M20 300V140C20 70 90 40 150 14c60 26 130 56 130 126v160" /><path d="M42 300V146C42 84 100 58 150 38c50 20 108 46 108 108v154" opacity=".6" /></svg>
      </A>
    </L>
    <L d={0.25} z={3}><A style={{ left: '50%', top: '30%', bottom: '21%', transform: 'translateX(-50%)', width: 'min(100%,520px)' }} className="rb-ev-hero"><Couple variant="sangeet" className="rb-fit rb-dance" /></A></L>
    <L d={0.5} z={4}>
      <A style={{ left: '8%', bottom: '17%', width: 'min(24vw,150px)' }}><Dholak /></A><A style={{ right: '9%', bottom: '14%', width: 'min(9vw,54px)' }}><Sitar /></A>
      <A style={{ left: '24%', bottom: '17%', width: 'min(12vw,50px)' }}><Diya /></A><A style={{ right: '24%', bottom: '17%', width: 'min(12vw,50px)' }}><Diya /></A>
    </L>
  </>);
}

export function WeddingArt() {
  return (<>
    <SideOrnamentLayer specs={sides('gold')} color="#D5AD55" />
    <Petals count={22} seed={6} colors={['#F59A1E', '#FFD84F', '#E2552B', '#C23A4A']} />
    <GoldDust count={30} seed={7} />
    <L d={0.05} z={1}><A style={{ left: 0, right: 0, bottom: '16%', height: '36%', color: 'rgba(213,173,85,.22)', ['--win' as string]: '#350719' }}><PalaceSkyline className="rb-fit" /></A></L>
    <L d={0.15} z={1}><MarigoldTorana className="rb-torana" /></L>
    <L d={0.25} z={2}>
      <A style={{ left: '4%', top: 0, width: 34, height: '34%' }}><FlowerString length={210} /></A><A style={{ right: '4%', top: 0, width: 34, height: '34%' }}><FlowerString length={210} delay={0.7} /></A>
    </L>
    <L d={0.2} z={3}><A style={{ left: '50%', top: '25%', bottom: '19%', transform: 'translateX(-50%)', aspectRatio: '1 / 1' }} className="rb-ev-hero rb-mandap"><Mandap className="rb-fit" /></A></L>
    <L d={0.55} z={4}>
      <A style={{ left: '8%', bottom: '14%', width: 'min(10vw,50px)' }}><Diya /></A><A style={{ right: '8%', bottom: '14%', width: 'min(10vw,50px)' }}><Diya /></A>
      <A style={{ left: '1%', bottom: '14%', width: 'min(14vw,90px)' }}><Peacock /></A><A style={{ right: '1%', bottom: '14%', width: 'min(14vw,90px)', transform: 'scaleX(-1)' }}><Peacock /></A>
    </L>
  </>);
}

export function ReceptionArt() {
  return (<>
    <SideOrnamentLayer specs={sides('gold')} color="#C9A24C" />
    <Petals count={14} seed={13} colors={['#F3DDB8', '#EDA99E', '#FFFDF6']} />
    <GoldDust count={22} seed={14} />
    <L d={0.05} z={1}><A style={{ left: 0, right: 0, bottom: '16%', height: '38%', color: 'rgba(201,162,76,.16)', ['--win' as string]: '#F6EBDD' }}><PalaceSkyline className="rb-fit" /></A></L>
    <L d={0.25} z={2}>
      <A style={{ left: '10%', top: 0, width: 'min(18vw,90px)' }}><Chandelier /></A><A style={{ right: '10%', top: 0, width: 'min(18vw,90px)' }}><Chandelier /></A>
      <A style={{ left: '1%', top: 0, width: 'min(18vw,90px)' }}><FlowerBall drop={30} /></A><A style={{ right: '1%', top: 0, width: 'min(18vw,90px)' }}><FlowerBall drop={60} /></A>
    </L>
    <L d={0.2} z={2}><A style={{ left: '50%', bottom: '17%', transform: 'translateX(-50%)', width: 'min(98vw, 600px, 78svh)', aspectRatio: '400 / 260' }} className="rb-ev-hero"><FloralArch className="rb-fit" /><div style={{ position: 'absolute', inset: '14% 24% 0' }}><Couple variant="reception" className="rb-fit" /></div></A></L>
    <L d={0.55} z={4}>
      <A style={{ left: 0, bottom: '14%', width: 'min(24vw,150px)' }}><Peony tone="rose" /></A><A style={{ right: 0, bottom: '14%', width: 'min(24vw,150px)', transform: 'scaleX(-1)' }}><Peony tone="rose" /></A>
      <A style={{ left: '24%', bottom: '14%', width: 'min(14vw,80px)' }}><Lotus /></A><A style={{ right: '24%', bottom: '14%', width: 'min(14vw,80px)' }}><Lotus /></A>
    </L>
  </>);
}

/** Engagement + custom events share a flexible royal composition. */
export function GenericArt({ engagement = false }: { engagement?: boolean }) {
  return (<>
    <SideOrnamentLayer specs={sides('gold')} color="#D5AD55" />
    <GoldDust count={26} seed={21} />
    <Petals count={12} seed={22} colors={engagement ? ['#F4C9C0', '#E9A8A4'] : ['#C23A4A', '#F59A1E']} />
    <L d={0.1} z={1}><A style={{ left: '50%', top: '30%', bottom: '20%', transform: 'translateX(-50%)', aspectRatio: '1 / 1', color: '#D5AD55', opacity: 0.55 }}><MandalaDecoration className="rb-fit" /></A></L>
    <L d={0.25} z={2}><A style={{ left: '50%', top: '31%', bottom: '19%', transform: 'translateX(-50%)', width: 'min(100%,420px)' }} className="rb-ev-hero">{engagement ? <Couple variant="engagement" className="rb-fit" /> : <Ganesha className="rb-fit" />}</A></L>
    <L d={0.4} z={1}><A style={{ left: '3%', top: '26%', width: 'min(18vw,110px)' }}><Chhatri tone="#F4ECDD" /></A><A style={{ right: '3%', top: '26%', width: 'min(18vw,110px)' }}><Chhatri tone="#F4ECDD" /></A></L>
  </>);
}
