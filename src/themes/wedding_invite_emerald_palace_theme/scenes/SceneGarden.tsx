import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { useStage } from '../hooks/useStage';
import { SideOrnamentLayer, type OrbitSpec } from '../art/Orbit';
import { LeafCanopy, ShrubRow, Palm, BananaLeaves, Lotus, Branch, HangingLeaves, PeacockStanding, PeacockFan } from '../art/Nature';
import { PalaceDomes, Chhatri, GoldPavilion, Balustrade, Waterfall, Pillar, ScallopArchTop, Fence } from '../art/Palace';
import { GaneshaLine } from '../art/Ornate';
import { GardenCouple, DanceCouple } from '../art/People';
import { GoldDust } from '../art/Particles';
import GoldBorder from '../art/GoldBorder';
import { dateParts, formatTime } from '../lib/dates';
import { A, L } from './common';

export const orbitsFor = (a: OrbitSpec['kind'], b: OrbitSpec['kind'], op = 0.5): OrbitSpec[] => [
  { side: 'left', kind: a, size: 520, top: 38, crop: 0.64, dir: 1, rotate: 110, opacity: op, parallax: 120 },
  { side: 'right', kind: b, size: 540, top: 66, crop: 0.64, dir: -1, rotate: 100, opacity: op, parallax: 160 },
  { side: 'left', kind: 'medallion', size: 220, top: 90, crop: 0.5, dir: -1, rotate: 220, opacity: 0.45, parallax: 240, desktopOnly: true },
  { side: 'right', kind: 'eye', size: 210, top: 10, crop: 0.5, dir: 1, rotate: 240, opacity: 0.45, parallax: 260, desktopOnly: true },
];

export const venueLine = () => { const { venue } = weddingData; return { name: venue.name, addr: [venue.address, venue.city].filter(Boolean).join(', ') }; };
export const timeOf = () => (/^\d{2}:\d{2}$/.test(weddingData.ceremonyTime) ? formatTime(weddingData.ceremonyTime) : '');
export const dateWords = () => { const p = dateParts(weddingData.weddingDate); return p ? { ...p, long: `${Number(p.day)} ${p.month.charAt(0)}${p.month.slice(1).toLowerCase()}, ${p.year}`, caps: `${p.day} ${p.month} ${p.year}` } : null; };

const PinIcon = ({ c }: { c: string }) => <svg viewBox="0 0 24 30" width="26" height="32" fill="none" stroke={c} strokeWidth="1.6" aria-hidden="true"><path d="M12 28C5 18 3 14 3 10a9 9 0 0 1 18 0c0 4-2 8-9 18Z" /><circle cx="12" cy="10" r="3.4" /></svg>;

/** Scene 01 - golden palace garden opening. Timed reveal when the card opens; sky, palace, foliage, peacock and couple then drift at different depths on scroll. */
export function SceneGoldenGarden({ opened }: { opened: boolean }) {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  useGSAP(() => {
    if (!opened) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power2.out' } })
        .fromTo('.g-sky', { opacity: 0 }, { opacity: 1, duration: 2 }, 0)
        .fromTo('.g-domes', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 2.2 }, 0.5)
        .fromTo('.g-canopy', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8 }, 0.4)
        .fromTo('.g-ganesha .ep-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.4, stagger: 0.12, ease: 'power1.inOut' }, 1)
        .fromTo('.g-shubh', { opacity: 0, y: 14, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4 }, 2.4)
        .fromTo('.g-line', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.25 }, 3.1)
        .fromTo('.g-grow', { scaleY: 0, opacity: 0, transformOrigin: '50% 100%' }, { scaleY: 1, opacity: 1, duration: 1.8, stagger: 0.18, ease: 'power3.out' }, 1.2)
        .fromTo('.g-peacock', { opacity: 0, scale: 0.8, transformOrigin: '50% 100%' }, { opacity: 1, scale: 1, duration: 1.6 }, 1.8)
        .fromTo('.g-couple', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 2 }, 2.2);
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [opened] });
  useStage(root, (tl) => {
    tl.to('.g-sky-s', { yPercent: 4, duration: 1 }, 0).to('.g-couple-s', { y: -14, duration: 1 }, 0);
  }, { end: '+=120%' });
  return (
    <section id="ep-scene-01" ref={root} className={`ep-scene${opened ? '' : ' is-pre'}`}>
      <div className="ep-stage" style={{ background: 'linear-gradient(180deg,#F4D7A3,#E9EEF2 45%,#E4EBD8)' }}>
        <SideOrnamentLayer specs={orbitsFor('feather', 'filigree', 0.32)} color="#C6A45D" />
        <div className="ep-board ep-paper" style={{ background: 'linear-gradient(180deg,#F4D7A3 0%,#F7E8CB 16%,#DDE8EF 38%,#F1F5F6 64%,#DDE8CE 100%)' }}>
          <A className="g-sky g-anim" style={{ inset: 0 }}><div className="g-sky-s ep-fit" style={{ position: 'absolute', inset: '-4% 0', background: 'radial-gradient(ellipse at 80% 12%, rgba(255,255,255,.85), transparent 18%), radial-gradient(ellipse at 20% 6%, rgba(244,205,140,.9), transparent 45%), radial-gradient(ellipse at 70% 30%, rgba(255,226,170,.7), transparent 40%)' }} /></A>
          <GoldDust count={26} seed={3} />
          <L d={0.15} z={1}><A className="g-domes g-anim" style={{ left: 0, right: 0, bottom: '16cqw', height: '74cqw' }}><PalaceDomes className="ep-fit" /></A></L>
          <A className="g-canopy g-anim" style={{ left: '-4cqw', top: '-2cqw', width: '70cqw', zIndex: 4 }}><LeafCanopy className="ep-fit-w" /></A>
          <A className="g-ganesha g-anim" style={{ left: '50%', top: '6%', width: '17cqw', marginLeft: '-8.5cqw', zIndex: 4, color: '#0E5C60' }}><GaneshaLine className="ep-fit-w" stroke="#0E5C60" /></A>
          <div className="ep-text" style={{ top: '14.5%', zIndex: 5, color: '#0E4C52' }}>
            <p className="g-shubh ep-hi" lang="hi" style={{ fontSize: '7.4cqw', fontWeight: 600 }}>॥ शुभ विवाह ॥</p>
            <p className="g-line ep-serif" style={{ fontSize: '4.2cqw', marginTop: '3cqw', letterSpacing: '.04em' }}>Together with their families</p>
            <p className="g-line ep-names" style={{ fontSize: '11cqw', marginTop: '1cqw', color: '#0E5C60' }}>{bride.firstName} &amp; {groom.firstName}</p>
          </div>
          <L d={0.3} z={3}>
            <A className="g-grow" style={{ left: '-6cqw', bottom: '26cqw', width: '46cqw' }}><Palm className="ep-fit-w" /></A>
            <A className="g-peacock" style={{ left: '-2cqw', bottom: '50cqw', width: '28cqw' }}><PeacockStanding className="ep-fit-w" /></A>
            <A className="g-grow" style={{ left: '34cqw', bottom: '12cqw', width: '30cqw' }}><BananaLeaves className="ep-fit-w" /></A>
          </L>
          <L d={0.5} z={4}>
            <A className="g-peacock" style={{ left: '6cqw', bottom: '3cqw', width: '40cqw' }}><PeacockFan className="ep-fit-w" /></A>
            <A className="g-grow" style={{ left: '40cqw', bottom: '6cqw', width: '16cqw' }}><Lotus className="ep-fit-w" /></A>
            <A className="g-grow" style={{ right: '2cqw', bottom: '30cqw', width: '14cqw' }}><Lotus bud className="ep-fit-w" /></A>
            <A className="g-grow" style={{ left: 0, right: 0, bottom: '-6cqw', height: '30cqw' }}><ShrubRow className="ep-fit" /></A>
          </L>
          <L d={0.7} z={5}><A className="g-couple" style={{ right: '-2cqw', bottom: '-2cqw', width: '56cqw' }}><div className="g-couple-s"><GardenCouple className="ep-fit-w" /></div></A></L>
        </div>
      </div>
    </section>
  );
}

/** Scene 02 - heritage terrace love story: branches, balustrade, chhatri, waterfall, peacock and a dancing couple. */
export function SceneTerrace() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.t-branch', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.06, ease: 'power2.out' }, 0)
      .fromTo('.t-line', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.05 }, 0.15)
      .fromTo('.t-name', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.18, stagger: 0.14 }, 0.22)
      .fromTo('.t-couple', { x: '-40%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.35, ease: 'power2.out' }, 0.2)
      .fromTo('.t-peacock', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 }, 0.35)
      .fromTo('.t-flower', { scale: 0, opacity: 0, transformOrigin: '50% 100%' }, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.05 }, 0.45);
  }, { end: '+=140%' });
  return (
    <section id="ep-scene-02" ref={root} className="ep-scene ep-paper">
      <div className="ep-stage" style={{ background: 'linear-gradient(180deg,#C9CBC8,#E8DEC6 55%,#EFD9AC)' }}>
        <SideOrnamentLayer specs={orbitsFor('filigree', 'feather', 0.3)} color="#B9975A" />
        <div className="ep-board" style={{ background: 'linear-gradient(180deg,#C9CBC8 0%,#DAD6C6 30%,#EDDFC0 60%,#F0D8A8 100%)' }}>
          <A className="t-branch" style={{ left: '4cqw', top: '-4cqw', width: '70cqw', zIndex: 3 }}><Branch className="ep-fit-w" /></A>
          <A className="t-branch" style={{ right: '-4cqw', top: '30%', width: '34cqw', zIndex: 3, transform: 'scaleX(-1) rotate(-12deg)' }}><Branch className="ep-fit-w" /></A>
          <A className="t-branch" style={{ left: '-10cqw', top: '34%', width: '38cqw', zIndex: 3, transform: 'rotate(20deg)' }}><Branch className="ep-fit-w" /></A>
          <div className="ep-text" style={{ top: '27%', zIndex: 5, color: '#264E2C' }}>
            <p className="t-line ep-serif" style={{ fontSize: '3.8cqw', lineHeight: 1.4, maxWidth: '66cqw', marginInline: 'auto' }}>Together with their families, we request the honor of your presence at joyous wedding ceremony of</p>
            <p className="t-name ep-names" style={{ fontSize: '15cqw', marginTop: '4cqw', color: '#1F5A2A' }}>{bride.firstName}</p>
            <p className="t-line ep-serif" style={{ fontSize: '7cqw' }}>&amp;</p>
            <p className="t-name ep-names" style={{ fontSize: '15cqw', color: '#1F5A2A' }}>{groom.firstName}</p>
          </div>
          <A className="t-chh" style={{ right: '-2cqw', bottom: '38cqw', width: '34cqw', zIndex: 2 }}><Chhatri className="ep-fit-w" /></A>
          <A style={{ left: '14cqw', bottom: '44cqw', width: '14cqw', zIndex: 2 }}><Palm className="ep-fit-w" /></A>
          <A style={{ left: 0, right: 0, bottom: '33cqw', height: '14cqw', zIndex: 3 }}><Balustrade className="ep-fit" /></A>
          <A className="t-peacock" style={{ right: '16cqw', bottom: '30cqw', width: '38cqw', zIndex: 4, transform: 'scaleX(-1)' }}><PeacockStanding className="ep-fit-w" /></A>
          <A style={{ right: '4cqw', bottom: '-2cqw', width: '56cqw', zIndex: 4 }}><Waterfall className="ep-fit-w" /></A>
          <A className="t-couple" style={{ left: '-6cqw', bottom: '-6cqw', width: '70cqw', zIndex: 5 }}><DanceCouple className="ep-fit-w" /></A>
          <A className="t-flower" style={{ right: 0, bottom: '14cqw', width: '22cqw', zIndex: 6 }}><ShrubRow className="ep-fit-w" /></A>
        </div>
      </div>
    </section>
  );
}

/** Scene 03 - sacred Ganesha invitation on warm ivory; pavilion, peacock and lotus below. */
export function SceneGaneshaInvite() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  const d = dateWords(); const t = timeOf(); const v = venueLine();
  useStage(root, (tl) => {
    tl.fromTo('.n-top', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, 0)
      .fromTo('.n-ganesha .ep-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, stagger: 0.015 }, 0.1)
      .fromTo('.n-om', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.3)
      .fromTo('.n-name', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.2 }, 0.36)
      .fromTo('.n-line', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.06 }, 0.48)
      .fromTo('.n-pav', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.35 }, 0.45)
      .fromTo('.n-peacock', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3 }, 0.55)
      .fromTo('.n-lotus', { scale: 0, opacity: 0, transformOrigin: '50% 100%' }, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.06, ease: 'back.out(1.5)' }, 0.65);
  }, { end: '+=150%' });
  const ink = '#1F5A2A';
  return (
    <section id="ep-scene-03" ref={root} className="ep-scene ep-paper">
      <div className="ep-stage" style={{ background: 'linear-gradient(180deg,#FBF4E6,#F6E3D0)' }}>
        <SideOrnamentLayer specs={orbitsFor('medallion', 'filigree', 0.3)} color="#C9A86A" />
        <div className="ep-board" style={{ background: 'radial-gradient(ellipse at 30% 55%, #F8DCC8, transparent 60%), linear-gradient(180deg,#FBF5E8,#F9EBD9 60%,#F3DAC4)' }}>
          <A className="n-top" style={{ left: 0, top: 0, width: '100%', zIndex: 2 }}><HangingLeaves className="ep-fit-w" /></A>
          <A className="n-top" style={{ left: '-6cqw', top: '-3cqw', width: '40cqw', zIndex: 3 }}><Branch className="ep-fit-w" /></A>
          <A className="n-top" style={{ right: '-6cqw', top: '-3cqw', width: '40cqw', zIndex: 3, transform: 'scaleX(-1)' }}><Branch className="ep-fit-w" /></A>
          <A className="n-ganesha" style={{ left: '50%', top: '8%', width: '20cqw', marginLeft: '-10cqw', zIndex: 4 }}><GaneshaLine className="ep-fit-w" stroke={ink} /></A>
          <div className="ep-text" style={{ top: '20%', zIndex: 5, color: ink, display: 'grid', gap: '2.4cqw', justifyItems: 'center' }}>
            <p className="n-om ep-hi" lang="sa" style={{ fontSize: '7cqw', fontWeight: 600 }}>ॐ श्री गणेशाय नमः</p>
            <p className="n-name ep-names" style={{ fontSize: '12.5cqw', marginTop: '4cqw', whiteSpace: 'nowrap' }}>{bride.firstName} &amp; {groom.firstName}</p>
            <p className="n-line ep-sans" style={{ fontSize: '3.8cqw', lineHeight: 1.5, maxWidth: '60cqw', color: '#3E7A55', marginTop: '2cqw' }}>are inviting you to their wedding ceremony</p>
            <p className="n-line ep-sans" style={{ fontSize: '5cqw', fontWeight: 500, letterSpacing: '.2em', marginTop: '3cqw' }}>{d ? d.caps : 'DATE TO BE ANNOUNCED'}</p>
            <p className="n-line ep-sans" style={{ fontSize: '3.8cqw', color: '#3E7A55' }}>{d ? d.weekday.charAt(0) + d.weekday.slice(1).toLowerCase() : ''}{t ? `, At ${t}` : ''}</p>
            <div className="n-line" style={{ marginTop: '4cqw' }}><PinIcon c="#3E7A55" /></div>
            <p className="n-line ep-sans" style={{ fontSize: '3.8cqw', lineHeight: 1.5, maxWidth: '64cqw', color: '#3E7A55' }}>{v.name || 'Venue to be announced'}{v.addr ? <><br />{v.addr}</> : null}</p>
          </div>
          <A style={{ left: '-4cqw', bottom: '26cqw', width: '30cqw', zIndex: 3 }}><BananaLeaves className="ep-fit-w" /></A>
          <A style={{ left: '14cqw', bottom: '10cqw', width: '26cqw', zIndex: 3 }}><Palm className="ep-fit-w" /></A>
          <A className="n-peacock" style={{ left: '6cqw', bottom: '2cqw', width: '40cqw', zIndex: 4 }}><PeacockStanding className="ep-fit-w" /></A>
          <A className="n-pav" style={{ right: '-4cqw', bottom: '2cqw', width: '52cqw', zIndex: 3 }}><GoldPavilion className="ep-fit-w" /></A>
          <A className="n-lotus" style={{ right: '2cqw', bottom: '1cqw', width: '14cqw', zIndex: 5 }}><Lotus bud className="ep-fit-w" /></A>
          <A className="n-lotus" style={{ left: '40cqw', bottom: '0cqw', width: '16cqw', zIndex: 5 }}><Lotus className="ep-fit-w" /></A>
          <A style={{ left: 0, right: 0, bottom: '-8cqw', height: '24cqw', zIndex: 4 }}><ShrubRow className="ep-fit" /></A>
        </div>
      </div>
    </section>
  );
}

/** Scene 04 - formal heritage invitation: scalloped palace arch, columns, garden fence, peacocks. */
export function SceneFormalHeritage() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  const d = dateWords(); const v = venueLine();
  useStage(root, (tl) => {
    tl.fromTo('.h-frame .ep-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, stagger: 0.08 }, 0)
      .fromTo('.h-arch', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.3 }, 0.05)
      .fromTo('.h-hang', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, stagger: 0.05 }, 0.2)
      .fromTo('.h-line', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.05 }, 0.25)
      .fromTo('.h-name', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.2, stagger: 0.16 }, 0.3)
      .fromTo('.h-pea-l', { x: '-60%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.3 }, 0.45).fromTo('.h-pea-r', { x: '60%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.3 }, 0.45);
  }, { end: '+=150%' });
  const ink = '#2A5A33';
  return (
    <section id="ep-scene-04" ref={root} className="ep-scene ep-paper">
      <div className="ep-stage" style={{ background: '#E4EADB' }}>
        <SideOrnamentLayer specs={orbitsFor('medallion', 'medallion', 0.5)} color="#C6A45D" />
        <div className="ep-board" style={{ background: 'linear-gradient(180deg,#E6ECDC,#EEF1E2 40%,#E4EADB)' }}>
          <A className="h-frame" style={{ inset: '3cqw', zIndex: 6 }}><GoldBorder inset={2} /></A>
          <A className="h-arch" style={{ left: '2cqw', right: '2cqw', top: 0, height: '36cqw', zIndex: 2 }}><ScallopArchTop className="ep-fit" /></A>
          <A style={{ left: 0, top: '30cqw', width: '14cqw', bottom: '36cqw', zIndex: 2 }}><Pillar className="ep-fit" /></A>
          <A style={{ right: 0, top: '30cqw', width: '14cqw', bottom: '36cqw', zIndex: 2 }}><Pillar className="ep-fit" /></A>
          <A className="h-hang" style={{ left: '22cqw', top: '14cqw', width: '56cqw', zIndex: 3 }}><HangingLeaves className="ep-fit-w" /></A>
          <div className="ep-text" style={{ top: '32cqw', zIndex: 5, color: ink, display: 'grid', gap: '2cqw', justifyItems: 'center' }}>
            <p className="h-line ep-serif" style={{ fontSize: '4.4cqw', letterSpacing: '.06em', textTransform: 'uppercase', lineHeight: 1.35, maxWidth: '56cqw' }}>Together with our families we</p>
            <p className="h-name ep-names" style={{ fontSize: '21cqw', marginTop: '2cqw', color: '#25602E' }}>{bride.firstName}</p>
            <p className="h-line ep-serif" style={{ fontSize: '4.6cqw', letterSpacing: '.1em' }}>AND</p>
            <p className="h-name ep-names" style={{ fontSize: '21cqw', color: '#25602E' }}>{groom.firstName}</p>
            <p className="h-line ep-serif" style={{ fontSize: '4.4cqw', letterSpacing: '.05em', textTransform: 'uppercase', lineHeight: 1.35, maxWidth: '58cqw', marginTop: '3cqw' }}>We invite you to join our wedding on</p>
            <p className="h-line ep-serif" style={{ fontSize: '8cqw', fontStyle: 'italic', color: '#25602E' }}>{d ? d.long : 'Date to be announced'}</p>
            <p className="h-line ep-serif" style={{ fontSize: '4.4cqw', letterSpacing: '.06em', textTransform: 'uppercase', maxWidth: '64cqw', lineHeight: 1.4 }}>{v.name || 'Venue to be announced'}{v.addr ? <><br />{v.addr}</> : null}</p>
          </div>
          <A style={{ left: 0, right: 0, bottom: '14cqw', height: '16cqw', zIndex: 3 }}><Fence className="ep-fit" /></A>
          <A className="h-pea-l" style={{ left: '-2cqw', bottom: '24cqw', width: '34cqw', zIndex: 4 }}><PeacockStanding className="ep-fit-w" /></A>
          <A className="h-pea-r" style={{ right: '-2cqw', bottom: '24cqw', width: '34cqw', zIndex: 4, transform: 'scaleX(-1)' }}><PeacockStanding className="ep-fit-w" /></A>
          <A style={{ left: 0, right: 0, bottom: '-6cqw', height: '26cqw', zIndex: 5 }}><ShrubRow className="ep-fit" /></A>
        </div>
      </div>
    </section>
  );
}
