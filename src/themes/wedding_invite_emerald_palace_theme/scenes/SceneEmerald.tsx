import { useRef } from 'react';
import weddingData from '../../../data/weddingData';
import { useStage } from '../hooks/useStage';
import { useCountdown } from '../hooks/useCountdown';
import { brandDate, getWeddingInstant, downloadIcs, formatLongDate } from '../lib/dates';
import { SideOrnamentLayer, PeacockOrbit } from '../art/Orbit';
import { Lotus, BananaLeaves, Butterfly, PeacockLine } from '../art/Nature';
import { GoldDomeLine, DoorLeaf } from '../art/Palace';
import { DiamondFrame, ElephantString, GoldFloralLine, LotusChain, GoldArch, Sparkle, FloralRoundArch } from '../art/Ornate';
import { WhiteCouple } from '../art/People';
import { FlowerString } from '../art/Flora';
import { GoldDust, Petals } from '../art/Particles';
import { Reveal, LinkButton, RsvpForm } from '../ui/ui';
import { A } from './common';
import { orbitsFor, venueLine, dateWords, timeOf } from './SceneGarden';

const target = getWeddingInstant();
const tealBg = 'radial-gradient(ellipse at 50% 40%, #167A76, #0A5A5C 55%, #063F44)';

/** Gold-blur name reveal: a glowing blurred silhouette sharpens into crisp calligraphy that "writes" in. */
const Name = ({ text, size }: { text: string; size: string }) => (
  <div className="e-name" style={{ position: 'relative', display: 'inline-block' }}>
    <span className="e-ghost ep-names" aria-hidden="true" style={{ fontSize: size, color: '#F0DEAE', filter: 'blur(10px)', opacity: 0, textShadow: '0 0 24px #E5C970', display: 'block' }}>{text}</span>
    <span className="e-ink ep-names" style={{ fontSize: size, color: '#F0DEAE', position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', clipPath: 'inset(0 100% 0 0)' }}>{text}</span>
  </div>
);

/**
 * Scenes 05 and 07 - deep emerald royal invitation. One scene with scroll-controlled text states:
 * heading, Rati (blurred gold -> sharp), AND, Pranjal (blurred -> sharp), date, venue.
 */
export function SceneEmeraldInvite({ id, staged = false }: { id: string; staged?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  const d = dateWords(); const v = venueLine(); const t = timeOf();
  useStage(root, (tl) => {
    tl.fromTo('.e-wave', { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0)
      .fromTo('.e-frame .ep-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, stagger: 0.05 }, 0.02)
      .fromTo('.e-string', { y: -260, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, stagger: 0.04, ease: 'power2.out' }, 0.08)
      .fromTo('.e-floral .ep-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.35, stagger: 0.01 }, 0.12)
      .fromTo('.e-dome .ep-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, stagger: 0.02 }, 0.18)
      .fromTo('.e-peacock .ep-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.2, stagger: 0.03 }, 0.3)
      .fromTo('.e-lotus', { scale: 0, opacity: 0, transformOrigin: '50% 100%' }, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.05, ease: 'back.out(1.5)' }, 0.25)
      .fromTo('.e-head', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.07 }, 0.34)
      .fromTo('.e-n1 .e-ghost', { opacity: 0 }, { opacity: 0.7, duration: 0.07 }, 0.4).to('.e-n1 .e-ink', { clipPath: 'inset(0 0% 0 0)', duration: 0.12 }, 0.45).to('.e-n1 .e-ghost', { opacity: 0, filter: 'blur(0px)', duration: 0.1 }, 0.52)
      .fromTo('.e-and', { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.56)
      .fromTo('.e-n2 .e-ghost', { opacity: 0 }, { opacity: 0.7, duration: 0.07 }, 0.6).to('.e-n2 .e-ink', { clipPath: 'inset(0 0% 0 0)', duration: 0.12 }, 0.65).to('.e-n2 .e-ghost', { opacity: 0, filter: 'blur(0px)', duration: 0.1 }, 0.72)
      .fromTo('.e-join', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.07 }, 0.76)
      .fromTo('.e-date', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.08 }, 0.82)
      .fromTo('.e-venue', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.08 }, 0.9);
  }, { end: staged ? '+=300%' : '+=240%' });
  const ivory = '#F8F1E3';
  return (
    <section id={id} ref={root} className="ep-scene ep-paper">
      <div className="ep-stage" style={{ background: tealBg }}>
        <SideOrnamentLayer specs={orbitsFor('feather', 'medallion', 0.38)} color="#C6A45D" />
        <div className="ep-board" style={{ background: tealBg }}>
          <A className="e-wave" style={{ inset: 0 }}><svg width="100%" height="100%" aria-hidden="true"><rect width="100%" height="100%" fill="url(#epWave)" /></svg></A>
          <GoldDust count={22} seed={staged ? 41 : 31} />
          <div className="e-frame" style={{ position: 'absolute', inset: 0, zIndex: 6 }}><DiamondFrame strip={15} /></div>
          {[[8, 150], [15, 112], [22, 84]].map(([x, l], i) => <A key={x} className="e-string" style={{ left: `${x}%`, top: '2%', width: '6.5cqw', zIndex: 4 }}><ElephantString length={l + 40} delay={i * 0.5} className="ep-fit-w" /></A>)}
          {[[8, 150], [15, 112], [22, 84]].map(([x, l], i) => <A key={`r${x}`} className="e-string" style={{ right: `${x}%`, top: '2%', width: '6.5cqw', zIndex: 4 }}><ElephantString length={l + 40} delay={i * 0.5 + 0.3} className="ep-fit-w" /></A>)}
          <div className="ep-text" style={{ top: '6%', zIndex: 5, color: ivory, display: 'grid', gap: '2cqw', justifyItems: 'center' }}>
            <p className="e-head ep-serif" style={{ fontSize: '4.6cqw', letterSpacing: '.04em', textTransform: 'uppercase', lineHeight: 1.3, maxWidth: '50cqw' }}>Together with our families we</p>
            <div className="e-n1" style={{ marginTop: '2cqw' }}><Name text={bride.firstName} size="21cqw" /></div>
            <p className="e-and ep-serif" style={{ fontSize: '4.8cqw', letterSpacing: '.1em' }}>AND</p>
            <div className="e-n2"><Name text={groom.firstName} size="21cqw" /></div>
            <p className="e-join ep-serif" style={{ fontSize: '4.6cqw', letterSpacing: '.04em', textTransform: 'uppercase', lineHeight: 1.3, maxWidth: '58cqw', marginTop: '3cqw' }}>We invite you to join our wedding on</p>
            <p className="e-date ep-serif" style={{ fontSize: '8cqw', fontStyle: 'italic', color: '#F0DEAE' }}>{d ? d.long : 'Date to be announced'}{staged && t ? ` · ${t}` : ''}</p>
            <p className="e-venue ep-serif" style={{ fontSize: '4.6cqw', lineHeight: 1.4, maxWidth: '64cqw' }}>{staged ? 'AT OUR WEDDING VENUE' : 'At our residence'}<br /><span style={{ fontSize: '.85em', opacity: 0.9 }}>{v.name || 'Venue to be announced'}{v.addr ? `, ${v.addr}` : ''}</span></p>
          </div>
          <A className="e-floral" style={{ left: '4cqw', bottom: '10cqw', width: '40cqw', zIndex: 3 }}><GoldFloralLine className="ep-fit-w" /></A>
          <A className="e-dome" style={{ right: '4cqw', bottom: '10cqw', width: '32cqw', zIndex: 3 }}><GoldDomeLine className="ep-fit-w" /></A>
          <A className="e-peacock" style={{ right: '24cqw', bottom: '24cqw', width: '22cqw', zIndex: 4 }}><PeacockLine className="ep-fit-w" /></A>
          <A style={{ left: '38cqw', bottom: '24cqw', width: '8cqw', zIndex: 5 }}><Butterfly className="ep-fit-w" /></A>
          <A className="e-lotus" style={{ left: '14cqw', bottom: '4cqw', width: '26cqw', zIndex: 5 }}><Lotus className="ep-fit-w" /></A>
          <A className="e-lotus" style={{ left: '40cqw', bottom: '2cqw', width: '30cqw', zIndex: 5 }}><Lotus className="ep-fit-w" /></A>
          <A className="e-lotus" style={{ right: '10cqw', bottom: '3cqw', width: '18cqw', zIndex: 5 }}><Lotus bud className="ep-fit-w" /></A>
        </div>
      </div>
    </section>
  );
}

/** Scene 06 - alternate ivory heritage invitation: lattice damask, marigold strings, banana leaves. */
export function SceneIvoryLattice() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  const d = dateWords(); const v = venueLine();
  useStage(root, (tl) => {
    tl.fromTo('.i-paper', { clipPath: 'inset(50% 0 50% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: 0.3, ease: 'power2.out' }, 0)
      .fromTo('.i-lattice', { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.1)
      .fromTo('.i-frame .ep-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.35, stagger: 0.06 }, 0.15)
      .fromTo('.i-leaf', { scaleY: 0, opacity: 0, transformOrigin: '50% 100%' }, { scaleY: 1, opacity: 1, duration: 0.3, stagger: 0.08 }, 0.2)
      .fromTo('.i-string', { y: -300 }, { y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, 0.2)
      .fromTo('.i-line', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.08, stagger: 0.05 }, 0.3)
      .fromTo('.i-name', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.18, stagger: 0.14 }, 0.36)
      .fromTo('.i-date', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1 }, 0.7);
  }, { end: '+=140%' });
  const ink = '#2F3A2A';
  return (
    <section id="ep-scene-06" ref={root} className="ep-scene ep-paper">
      <div className="ep-stage" style={{ background: '#EDE8DA' }}>
        <SideOrnamentLayer specs={orbitsFor('medallion', 'filigree', 0.4)} color="#C6A45D" />
        <div className="ep-board i-paper" style={{ background: '#E9E4D6' }}>
          <A className="i-lattice" style={{ inset: 0 }}><svg width="100%" height="100%" aria-hidden="true"><rect width="100%" height="100%" fill="url(#epLattice)" /></svg></A>
          <A className="i-panel" style={{ left: '14cqw', right: '14cqw', top: '20cqw', bottom: '20cqw', background: '#EFE8DA', zIndex: 2 }}><div className="i-frame" style={{ position: 'absolute', inset: 0 }}><DiamondFrame strip={9} /></div></A>
          {[3, 9].map((x, i) => <A key={x} className="i-string" style={{ left: `${x}%`, top: 0, width: '7cqw', zIndex: 4 }}><FlowerString length={260 - i * 40} delay={i * 0.4} /></A>)}
          {[3, 9].map((x, i) => <A key={`r${x}`} className="i-string" style={{ right: `${x}%`, top: 0, width: '7cqw', zIndex: 4 }}><FlowerString length={260 - i * 40} delay={i * 0.4 + 0.3} /></A>)}
          <A className="i-leaf" style={{ left: '-12cqw', top: '28%', width: '34cqw', zIndex: 5 }}><BananaLeaves className="ep-fit-w" /></A>
          <A className="i-leaf" style={{ right: '-12cqw', top: '44%', width: '34cqw', zIndex: 5, transform: 'scaleX(-1)' }}><BananaLeaves className="ep-fit-w" /></A>
          <div className="ep-text" style={{ top: '28cqw', zIndex: 5, color: ink, display: 'grid', gap: '2cqw', justifyItems: 'center', padding: '0 22cqw' }}>
            <p className="i-line ep-serif" style={{ fontSize: '4.4cqw', lineHeight: 1.35 }}>Together With our families we</p>
            <p className="i-name ep-names" style={{ fontSize: '19cqw', color: '#25602E', marginTop: '3cqw' }}>{bride.firstName}</p>
            <p className="i-line ep-serif" style={{ fontSize: '4.4cqw' }}>and</p>
            <p className="i-name ep-names" style={{ fontSize: '19cqw', color: '#25602E' }}>{groom.firstName}</p>
            <p className="i-line ep-serif" style={{ fontSize: '4.4cqw', lineHeight: 1.35, marginTop: '4cqw' }}>We invite you to join our wedding on</p>
            <p className="i-date ep-serif" style={{ fontSize: '7.4cqw', fontStyle: 'italic', color: '#25602E' }}>{d ? d.long : 'Date to be announced'}</p>
            <p className="i-line ep-serif" style={{ fontSize: '4.2cqw', marginTop: '3cqw', lineHeight: 1.4 }}>{v.name || 'Venue to be announced'}{v.addr ? <><br />{v.addr}</> : null}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Countdown (Asia/Kolkata) inside a turning peacock-feather ring. Targets the configured ceremony time only. */
export function SceneCountdown() {
  const root = useRef<HTMLElement>(null);
  const c = useCountdown(target);
  const { bride, groom, countdownNote } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.k-ring', { scale: 0.6, opacity: 0, rotation: -40 }, { scale: 1, opacity: 1, rotation: 40, duration: 1 }, 0)
      .fromTo('.k-in', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.18, stagger: 0.08 }, 0.1);
  }, { end: '+=130%' });
  const cells: [string, number][] = [['Days', c.days], ['Hours', c.hours], ['Minutes', c.minutes], ['Seconds', c.seconds]];
  return (
    <section id="ep-countdown" ref={root} className="ep-scene ep-paper">
      <div className="ep-stage" style={{ background: tealBg }}>
        <SideOrnamentLayer specs={orbitsFor('filigree', 'feather', 0.35)} color="#C6A45D" />
        <div className="ep-board" style={{ background: tealBg }}>
          <A style={{ inset: 0, opacity: 0.8 }}><svg width="100%" height="100%" aria-hidden="true"><rect width="100%" height="100%" fill="url(#epWave)" /></svg></A>
          <div style={{ position: 'absolute', inset: 0, zIndex: 6 }}><DiamondFrame strip={12} /></div>
          <A className="k-ring" style={{ left: '50%', top: '50%', width: '124cqw', marginLeft: '-62cqw', marginTop: '-62cqw', zIndex: 1, opacity: 0.26 }}><PeacockOrbit kind="feather" speed={0.3} className="ep-fit" /></A>
          <div className="ep-text" style={{ top: '34%', display: 'grid', gap: '2.4cqw', justifyItems: 'center', color: '#F8F1E3', zIndex: 3 }}>
            <p className="k-in ep-display" style={{ fontSize: '3.4cqw', letterSpacing: '.24em', color: '#E5D1A2' }}>The big day is approaching</p>
            <p className="k-in ep-names" style={{ fontSize: '17cqw', color: '#F0DEAE' }}>{bride.firstName} &amp; {groom.firstName}</p>
            <p className="k-in ep-display" style={{ fontSize: '3.6cqw', color: '#E5D1A2' }}>{brandDate()}</p>
            <div className="k-in" role="timer" aria-label="Time remaining until the wedding" style={{ display: 'flex', gap: '2.2cqw', marginTop: '3cqw' }}>
              {cells.map(([label, v]) => (
                <div key={label} style={{ width: '19cqw', padding: '2.4cqw 0', background: 'rgba(5,59,63,.78)', border: '1px solid rgba(198,164,93,.7)', outline: '1px solid rgba(198,164,93,.3)', outlineOffset: -4 }}>
                  <div className="ep-display" style={{ fontSize: '9cqw', fontVariantNumeric: 'tabular-nums', lineHeight: 1.05, letterSpacing: 0, color: '#F0DEAE' }}>{String(v).padStart(2, '0')}</div>
                  <div className="ep-sans" style={{ fontSize: '2.1cqw', letterSpacing: '.14em', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
            {c.isComplete && <p className="k-in ep-display" style={{ fontSize: '3.2cqw' }}>The celebrations have begun</p>}
            <p className="k-in ep-serif" style={{ maxWidth: '72cqw', fontStyle: 'italic', fontSize: '3.9cqw', lineHeight: 1.5, color: '#E6EADB' }}>{countdownNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Scene 08 - the royal palace door. Scroll pushes the camera in, light seeps along the seam, then both carved leaves swing open onto golden light. */
export function ScenePalaceDoor() {
  const root = useRef<HTMLElement>(null);
  useStage(root, (tl) => {
    tl.fromTo('.d-wrap', { scale: 1 }, { scale: 1.3, duration: 1, ease: 'power1.in' }, 0)
      .fromTo('.d-seam', { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.1)
      .to('.ep-ring-knock', { rotation: 18, duration: 0.15, yoyo: true, repeat: 1 }, 0.25)
      .fromTo('.d-leaf-l', { rotateY: 0 }, { rotateY: -112, duration: 0.5, ease: 'power2.inOut' }, 0.3)
      .fromTo('.d-leaf-r', { rotateY: 0 }, { rotateY: 112, duration: 0.5, ease: 'power2.inOut' }, 0.3)
      .fromTo('.d-light', { opacity: 0.2, scale: 0.5 }, { opacity: 1, scale: 1.5, duration: 0.6 }, 0.3)
      .fromTo('.d-fade', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.82);
  }, { end: '+=240%' });
  return (
    <section id="ep-scene-08" ref={root} className="ep-scene ep-paper">
      <div className="ep-stage" style={{ background: 'linear-gradient(180deg,#EADFCB,#E0CFB4)' }}>
        <div className="ep-board" style={{ background: 'linear-gradient(180deg,#EADFCB,#DCC9AA)', perspective: '1200px', overflow: 'hidden' }}>
          <A style={{ inset: 0, background: 'repeating-linear-gradient(95deg, rgba(150,110,70,.06) 0 2px, transparent 2px 11px)' }}>{null}</A>
          <div className="d-wrap" style={{ position: 'absolute', left: '8cqw', right: '8cqw', top: '7%', bottom: '5%', transformOrigin: '50% 40%', transformStyle: 'preserve-3d' }}>
            <div className="d-arch" style={{ position: 'absolute', inset: 0, borderRadius: '50% 50% 2% 2% / 14% 14% 0 0', overflow: 'hidden', boxShadow: '0 0 0 6px #5E4624, 0 0 0 9px #C6A45D', background: '#2A1A0C' }}>
              <div className="d-light" style={{ position: 'absolute', inset: '-20%', background: 'radial-gradient(circle at 50% 55%, #FFF1B8 0%, #F2C860 24%, #A8742A 52%, #3A2412 80%)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
                <div className="d-leaf-l" style={{ width: '50%', height: '100%', transformOrigin: '0 50%' }}><DoorLeaf className="ep-fit" /></div>
                <div className="d-leaf-r" style={{ width: '50%', height: '100%', transformOrigin: '100% 50%', transform: 'scaleX(1)' }}><DoorLeaf className="ep-fit" style={{ transform: 'scaleX(-1)' }} /></div>
              </div>
              <div className="d-seam" style={{ position: 'absolute', left: '49.4%', width: '1.2%', top: 0, bottom: 0, background: 'linear-gradient(180deg, transparent, #FFF1B8, transparent)', boxShadow: '0 0 24px 6px rgba(255,230,150,.7)', opacity: 0, mixBlendMode: 'screen' }} />
            </div>
          </div>
          <div className="d-fade" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, #4A3626, #271B17)', opacity: 0, zIndex: 8 }} />
        </div>
      </div>
    </section>
  );
}

/** Scene 09 - grand dark heritage invitation: gold arch traces itself, ornaments descend, names write in white-gold, floral arch blooms around the couple. */
export function SceneDarkHeritage() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.x-arch .ep-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.45, stagger: 0.05 }, 0)
      .fromTo('.x-chain', { y: -280, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, 0.1)
      .fromTo('.x-head', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.08 }, 0.3)
      .fromTo('.x-name', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.16, stagger: 0.16 }, 0.35)
      .fromTo('.x-amp', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.08 }, 0.45)
      .fromTo('.x-bloom', { scale: 0.6, opacity: 0, transformOrigin: '50% 100%' }, { scale: 1, opacity: 1, duration: 0.3 }, 0.5)
      .fromTo('.x-drape', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.6)
      .fromTo('.x-couple', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25 }, 0.68)
      .fromTo('.x-spark', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.15, stagger: 0.05 }, 0.8);
  }, { end: '+=220%' });
  const bg = 'radial-gradient(ellipse at 50% 35%, #5C4630, #3A2A1E 55%, #271B17)';
  return (
    <section id="ep-scene-09" ref={root} className="ep-scene ep-paper">
      <div className="ep-stage" style={{ background: bg }}>
        <SideOrnamentLayer specs={orbitsFor('medallion', 'filigree', 0.3)} color="#C6A45D" />
        <div className="ep-board" style={{ background: bg }}>
          <A style={{ inset: 0 }}><svg width="100%" height="100%" aria-hidden="true"><rect width="100%" height="100%" fill="url(#epEspresso)" /></svg></A>
          <GoldDust count={26} seed={61} />
          <A className="x-arch" style={{ left: '9cqw', right: '9cqw', top: '7%', bottom: 0, zIndex: 2 }}><GoldArch className="ep-fit" /></A>
          {[[10, 110, false], [25, 70, true], [75, 70, true], [90, 110, false]].map(([x, l, b], i) => <A key={i} className="x-chain" style={{ left: `${x}%`, top: 0, width: '8cqw', marginLeft: '-4cqw', zIndex: 4 }}><LotusChain length={Number(l)} bell={Boolean(b)} delay={i * 0.4} className="ep-fit-w" /></A>)}
          <div className="ep-text" style={{ top: '19%', zIndex: 5, color: '#fff', display: 'grid', gap: '1.6cqw', justifyItems: 'center' }}>
            <p className="x-head ep-sans" style={{ fontSize: '3.9cqw', lineHeight: 1.5, letterSpacing: '.04em' }}>You Are Invited To<br />The Wedding Of</p>
            <p className="x-name ep-white" style={{ fontSize: '15cqw', marginTop: '4cqw', color: '#FBF3E0' }}>{bride.firstName}</p>
            <p className="x-amp ep-sans" style={{ fontSize: '9cqw', fontWeight: 500 }}>&amp;</p>
            <p className="x-name ep-white" style={{ fontSize: '15cqw', color: '#FBF3E0' }}>{groom.firstName}</p>
          </div>
          <A className="x-bloom" style={{ left: '50%', bottom: '4cqw', width: '82cqw', marginLeft: '-41cqw', zIndex: 3 }}><FloralRoundArch className="ep-fit-w" /></A>
          <A className="x-couple" style={{ left: '50%', bottom: '4cqw', width: '56cqw', marginLeft: '-28cqw', zIndex: 4 }}><WhiteCouple className="ep-fit-w" /></A>
          {[[8, 44], [86, 34], [78, 66]].map(([x, y], i) => <A key={i} className="x-spark" style={{ left: `${x}%`, top: `${y}%`, width: `${i === 0 ? 14 : 9}cqw`, zIndex: 6 }}><Sparkle className="ep-fit-w" /></A>)}
        </div>
      </div>
    </section>
  );
}

/** Final RSVP chapter on the same espresso-and-gold ground: RSVP, add to calendar, directions, event list and contact. */
export function SceneFinalRsvp() {
  const { bride, groom, venue, contact, rsvp, events } = weddingData;
  const wa = contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` : '';
  const rule = <div style={{ width: 'min(60%,14rem)', height: 1, background: 'linear-gradient(90deg,transparent,#C6A45D,transparent)', margin: '.4rem auto' }} />;
  return (
    <section id="ep-final" className="ep-scene ep-paper" style={{ background: 'linear-gradient(180deg,#271B17,#3A2A1E 40%,#271B17)', padding: 'clamp(3.5rem,9svh,6rem) 1rem 6rem', color: '#F8F1E3' }}>
      <SideOrnamentLayer specs={orbitsFor('filigree', 'feather', 0.28)} color="#C6A45D" />
      <Petals count={8} seed={91} colors={['#E6A9B0', '#F8F1E3', '#E5D1A2']} /><GoldDust count={14} seed={92} />
      <div style={{ position: 'relative', zIndex: 5, width: 'min(94vw,520px)', margin: '0 auto', padding: 'clamp(2.4rem,9vw,3.4rem) clamp(1.4rem,6vw,2.6rem)', background: 'rgba(39,27,23,.82)', border: '1px solid rgba(198,164,93,.7)', outline: '1px solid rgba(198,164,93,.3)', outlineOffset: -8, textAlign: 'center', display: 'grid', gap: '.9rem', justifyItems: 'center' }}>
        <Reveal><p className="ep-white" style={{ fontSize: 'clamp(3.4rem,15vw,5.2rem)', color: '#FBF3E0' }}>{bride.firstName} &amp; {groom.firstName}</p></Reveal>
        <Reveal delay={0.1}><p className="ep-display" style={{ fontSize: '.9rem', color: '#E5D1A2' }}>{brandDate()}</p></Reveal>
        {rule}
        <Reveal delay={0.15}><p className="ep-serif" style={{ fontSize: '1.2rem', fontStyle: 'italic', maxWidth: '24em' }}>The honour of your presence is requested. We look forward to celebrating with you.</p></Reveal>
        {events.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '.4rem 0 0', display: 'grid', gap: '.35rem', fontSize: '.9rem' }}>
            {events.map((e) => <li key={e.id} className="ep-sans"><b style={{ color: '#E5D1A2', letterSpacing: '.12em', textTransform: 'uppercase', fontSize: '.72rem', fontWeight: 500 }}>{e.name}</b> · {e.date ? formatLongDate(e.date) : 'Date to be announced'}</li>)}
          </ul>
        )}
        {rule}
        <Reveal><h3 className="ep-names" style={{ fontSize: '2.8rem', color: '#F0DEAE' }}>Kindly RSVP</h3></Reveal>
        <div style={{ width: '100%' }}><RsvpForm /></div>
        {rsvp.deadline && <p style={{ fontSize: '.9rem', opacity: 0.75 }}>Kindly reply by {rsvp.deadline}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.7rem', justifyContent: 'center', marginTop: '.6rem' }}><LinkButton light onClick={downloadIcs}>Add to Calendar</LinkButton><LinkButton light href={venue.mapsUrl} disabledLabel="Directions soon">Venue Directions</LinkButton></div>
        <div className="ep-sans" style={{ display: 'grid', gap: '.3rem', fontSize: '.92rem', marginTop: '.6rem' }}>
          {contact.phone && <p><a className="ep-link" href={`tel:${contact.phone}`}>{contact.phone}</a></p>}
          {contact.email && <p><a className="ep-link" href={`mailto:${contact.email}`}>{contact.email}</a></p>}
          {wa && <p><a className="ep-link" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp us</a></p>}
        </div>
      </div>
    </section>
  );
}
