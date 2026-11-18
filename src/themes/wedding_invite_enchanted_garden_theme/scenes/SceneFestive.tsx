import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { useStage } from '../hooks/useStage';
import { BotanicalOrbitSystem } from '../art/Orbit';
import { FestiveCanopy, KalashDecoration, PalmTree, LotusBorder, Twinkles, Bride, Groom } from '../art/Festive';
import { Flourish, DateLine } from '../ui/ui';
import { A, Letters } from './common';

/** Scene 01 - festive canopy opening. Timed intro after the card opens (canopy drops, kalash scales in, stars appear), then scroll-linked title reveal. */
export function SceneFestiveOpen({ opened }: { opened: boolean }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (!opened) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.f-canopy', { yPercent: -100, opacity: 1 }, { yPercent: 0, duration: 1.8, ease: 'power2.out' }, 0.1)
        .fromTo('.f-kalash', { scale: 0.1, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 1.4, ease: 'back.out(1.7)' }, 1.2)
        .fromTo('.tg-fx', { opacity: 0 }, { opacity: 1, duration: 2 }, 1)
        .fromTo('.f-palm', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.8 }, 0.8)
        .fromTo('.f-lotusb', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.6);
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [opened] });

  useStage(root, (tl) => {
    tl.to('.f-kalash-s', { y: -10, duration: 1 }, 0)
      .to('.f-canopy-s', { yPercent: -2, duration: 1 }, 0)
      .to('.f-palm-l .f-palm-s', { x: -12, scale: 1.05, duration: 1 }, 0).to('.f-palm-r .f-palm-s', { x: 12, scale: 1.05, duration: 1 }, 0)
      .fromTo('.f-title .tg-ch', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.05, stagger: 0.035 }, 0.3)
      .fromTo('.f-hint', { opacity: 0.9 }, { opacity: 0, duration: 0.1 }, 0.1);
  }, { end: '+=140%' });

  return (
    <section id="tg-scene-01" ref={root} className={`tg-scene${opened ? '' : ' is-pre'}`}>
      <div className="tg-stage tg-fest">
        <BotanicalOrbitSystem color="#F7C52D" />
        <div className="tg-board">
          <Twinkles count={16} seed={3} />
          <A className="f-palm f-palm-l g-anim" style={{ left: '-7cqw', bottom: '-6cqw', width: '48cqw', zIndex: 2 }}><div className="f-palm-s"><PalmTree ghost /></div></A>
          <A className="f-palm f-palm-r g-anim" style={{ right: '-7cqw', bottom: '-6cqw', width: '48cqw', zIndex: 2, transform: 'scaleX(-1)' }}><div className="f-palm-s"><PalmTree ghost /></div></A>
          <A className="f-canopy g-anim" style={{ top: 0, left: 0, width: '100%', zIndex: 4 }}><div className="f-canopy-s"><FestiveCanopy className="tg-fit" /></div></A>
          <A className="f-kalash g-anim" style={{ top: '27%', left: '50%', width: '17cqw', marginLeft: '-8.5cqw', zIndex: 3 }}><div className="f-kalash-s tg-float"><KalashDecoration /></div></A>
          <div className="tg-text f-title" style={{ top: '46%' }}><p className="tg-ceremony tg-cream" style={{ fontSize: '8.8cqw', whiteSpace: 'nowrap' }}><Letters text="Wedding Ceremony" /></p></div>
          <A className="f-lotusb g-anim" style={{ bottom: 0, left: 0, width: '100%', height: '8cqw', zIndex: 5 }}><LotusBorder className="tg-fit" /></A>
          <p className="f-hint tg-pop tg-center" style={{ position: 'absolute', bottom: '12%', left: 0, right: 0, fontSize: '.6rem', color: '#F7C52D', zIndex: 6 }}>Scroll</p>
        </div>
      </div>
    </section>
  );
}

/** Scene 02 - Wedding Ceremony Invitation: title, drawn calligraphy, couple walking in from either side. */
export function SceneFestiveCeremony() {
  const root = useRef<HTMLElement>(null);
  useStage(root, (tl) => {
    tl.fromTo('.c-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.15 }, 0)
      .fromTo('.c-script', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3 }, 0.12)
      .fromTo('.c-bride', { x: '-120%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.25)
      .fromTo('.c-groom', { x: '120%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.3)
      .fromTo('.c-lotus', { clipPath: 'inset(0 50% 0 50%)' }, { clipPath: 'inset(0 0% 0 0%)', duration: 0.35 }, 0.5)
      .to('.c-bride', { x: '-6%', duration: 0.3 }, 0.8).to('.c-groom', { x: '6%', duration: 0.3 }, 0.8);
  }, { end: '+=150%' });
  return (
    <section id="tg-scene-02" ref={root} className="tg-scene">
      <div className="tg-stage tg-fest">
        <BotanicalOrbitSystem color="#F7C52D" />
        <div className="tg-board">
          <Twinkles count={14} seed={9} />
          <A style={{ left: '-7cqw', bottom: '-4cqw', width: '46cqw', zIndex: 3 }}><PalmTree className="tg-fit" /></A>
          <A style={{ right: '-7cqw', bottom: '-4cqw', width: '46cqw', zIndex: 3, transform: 'scaleX(-1)' }}><PalmTree className="tg-fit" /></A>
          <A className="c-canopy" style={{ top: 0, left: 0, width: '100%', zIndex: 4 }}><FestiveCanopy className="tg-fit" /></A>
          <A style={{ top: '26%', left: '50%', width: '17cqw', marginLeft: '-8.5cqw', zIndex: 3 }} className="tg-float"><KalashDecoration /></A>
          <div className="tg-text" style={{ top: '40%' }}>
            <p className="c-title tg-ceremony tg-cream" style={{ fontSize: '8.8cqw', whiteSpace: 'nowrap' }}>Wedding Ceremony</p>
            <p className="c-script tg-script tg-cream" style={{ fontSize: '15cqw', marginTop: '1cqw' }}>Invitation</p>
          </div>
          <A className="c-bride" style={{ left: '20cqw', bottom: '9cqw', width: '30cqw', zIndex: 4 }}><Bride className="tg-fit" /></A>
          <A className="c-groom" style={{ right: '20cqw', bottom: '9cqw', width: '30cqw', zIndex: 4 }}><Groom className="tg-fit" /></A>
          <A className="c-lotus" style={{ bottom: 0, left: 0, width: '100%', height: '8cqw', zIndex: 5 }}><LotusBorder className="tg-fit" /></A>
        </div>
      </div>
    </section>
  );
}

/** Scene 03 - invitation details between bride and groom standing at the lower edges. */
export function SceneFestiveDetails() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom, weddingDate, venue } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.d-canopy', { yPercent: -30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.2 }, 0)
      .fromTo('.d-line', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.12, stagger: 0.07 }, 0.1)
      .fromTo('.d-date', { textShadow: '0 0 0 rgba(247,197,45,0)' }, { textShadow: '0 0 18px rgba(247,197,45,.9)', duration: 0.2 }, 0.45)
      .fromTo('.d-bride', { x: '-20%' }, { x: '8%', duration: 0.6 }, 0.1).fromTo('.d-groom', { x: '20%' }, { x: '-8%', duration: 0.6 }, 0.1)
      .fromTo('.d-palm-l', { rotation: -3 }, { rotation: 4, duration: 1, transformOrigin: '50% 100%' }, 0).fromTo('.d-palm-r', { rotation: 3 }, { rotation: -4, duration: 1, transformOrigin: '50% 100%' }, 0);
  }, { end: '+=160%' });
  const place = [venue.address, venue.city].filter(Boolean).join(', ');
  return (
    <section id="tg-scene-03" ref={root} className="tg-scene">
      <div className="tg-stage tg-fest">
        <BotanicalOrbitSystem color="#F7C52D" />
        <div className="tg-board">
          <Twinkles count={18} seed={13} />
          <A className="d-palm-l" style={{ left: '-10cqw', bottom: '14cqw', width: '36cqw', zIndex: 2 }}><PalmTree className="tg-fit" /></A>
          <A className="d-palm-r" style={{ right: '-10cqw', bottom: '14cqw', width: '36cqw', zIndex: 2, transform: 'scaleX(-1)' }}><PalmTree className="tg-fit" /></A>
          <A className="d-canopy" style={{ top: 0, left: 0, width: '100%', zIndex: 4 }}><FestiveCanopy className="tg-fit" /></A>
          <A style={{ top: '19%', left: '50%', width: '15cqw', marginLeft: '-7.5cqw', zIndex: 3 }} className="tg-float"><KalashDecoration /></A>
          <div className="tg-text" style={{ top: '30%', display: 'grid', gap: '1.6cqw', justifyItems: 'center' }}>
            <p className="d-line tg-lato tg-gold" style={{ fontSize: '4.2cqw' }}>We warmly invite you to join the wedding of</p>
            <p className="d-line tg-ceremony tg-cream" style={{ fontSize: '14cqw' }}>{bride.firstName}</p>
            <p className="d-line tg-ceremony tg-cream" style={{ fontSize: '9cqw', lineHeight: 0.8 }}>&amp;</p>
            <p className="d-line tg-ceremony tg-cream" style={{ fontSize: '14cqw' }}>{groom.firstName}</p>
            <p className="d-line tg-lato tg-gold" style={{ fontSize: '4.6cqw' }}>On</p>
            <p className="d-line d-date tg-lato tg-gold" style={{ fontSize: '4.6cqw' }}><DateLine iso={weddingDate} /></p>
            <Flourish className="d-line" color="#FFF1F3" />
            <p className="d-line tg-ceremony tg-cream" style={{ fontSize: '6.4cqw', fontStyle: 'italic' }}>Venue</p>
            <p className="d-line tg-lato tg-gold" style={{ fontSize: '4.2cqw', maxWidth: '78cqw', lineHeight: 1.35 }}>{venue.name || 'To be announced'}{place ? <><br />{place}</> : null}</p>
            <Flourish className="d-line" color="#FFF1F3" />
            <p className="d-line tg-lato tg-gold" style={{ fontSize: '4cqw', maxWidth: '70cqw', lineHeight: 1.35 }}>Your presence will grace us with joy on this blessed day.</p>
          </div>
          <A className="d-bride" style={{ left: 0, bottom: '6cqw', width: '19cqw', zIndex: 4 }}><Bride className="tg-fit" /></A>
          <A className="d-groom" style={{ right: 0, bottom: '6cqw', width: '19cqw', zIndex: 4 }}><Groom className="tg-fit" /></A>
          <A style={{ bottom: 0, left: 0, width: '100%', height: '8cqw', zIndex: 5 }}><LotusBorder className="tg-fit" /></A>
        </div>
      </div>
    </section>
  );
}
