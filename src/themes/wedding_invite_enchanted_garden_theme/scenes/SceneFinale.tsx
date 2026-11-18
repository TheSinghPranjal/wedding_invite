import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { useStage } from '../hooks/useStage';
import { useCountdown } from '../hooks/useCountdown';
import { brandDate, getWeddingInstant, downloadIcs } from '../lib/dates';
import { BotanicalOrbitSystem, BotanicalOrbit, Leaf, type OrbitSpec } from '../art/Orbit';
import { OrganicShapes, HangingFloralArrangement, CoupleMonogram, VintageWeddingCar, WatercolorSky, Wildflowers, HangingVine, FloralCorner } from '../art/Botanical';
import { Petals } from '../art/Particles';
import { Reveal, LinkButton, RsvpForm } from '../ui/ui';
import { A } from './common';

const target = getWeddingInstant();
const orbits: OrbitSpec[] = [
  { side: 'left', kind: 'pink', size: 500, top: 46, crop: 0.66, dir: 1, rotate: 110, opacity: 0.5, parallax: 120 },
  { side: 'right', kind: 'leaf', size: 520, top: 64, crop: 0.66, dir: -1, rotate: 100, opacity: 0.5, parallax: 160 },
];

/** Countdown (Asia/Kolkata) over a slowly turning floral wreath; targets the configured ceremony time. */
export function SceneCountdown() {
  const root = useRef<HTMLElement>(null);
  const c = useCountdown(target);
  const { bride, groom, countdownNote } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.k-ring', { scale: 0.6, opacity: 0, rotation: -40 }, { scale: 1, opacity: 1, rotation: 40, duration: 1 }, 0)
      .fromTo('.k-in', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.18, stagger: 0.08 }, 0.1);
  }, { end: '+=140%' });
  const cells: [string, number][] = [['Days', c.days], ['Hours', c.hours], ['Minutes', c.minutes], ['Seconds', c.seconds]];
  return (
    <section id="tg-countdown" ref={root} className="tg-scene tg-paper">
      <div className="tg-stage" style={{ background: '#ECE6C3' }}>
        <BotanicalOrbitSystem specs={orbits} color="#B9905A" />
        <div className="tg-board">
          <OrganicShapes variant="cream" className="tg-fit" style={{ position: 'absolute', inset: 0 }} />
          <A style={{ top: 0, left: 0, width: '100%', zIndex: 3 }}><HangingFloralArrangement className="tg-fit" /></A>
          <A className="k-ring" style={{ left: '50%', top: '55%', width: '130cqw', marginLeft: '-65cqw', marginTop: '-65cqw', zIndex: 1, opacity: 0.22 }}><BotanicalOrbit kind="pink" speed={0.3} style={{ width: '100%', height: '100%' }} /></A>
          <div className="tg-text" style={{ top: '38%', display: 'grid', gap: '2.4cqw', justifyItems: 'center', color: '#6B3A22' }}>
            <p className="k-in tg-pop" style={{ fontSize: '3.4cqw' }}>The big day is approaching</p>
            <p className="k-in tg-gilda" style={{ fontSize: '12cqw', lineHeight: 1 }}>{bride.firstName} &amp; {groom.firstName}</p>
            <p className="k-in tg-pop" style={{ fontSize: '3.4cqw' }}>{brandDate()}</p>
            <div className="k-in" role="timer" aria-label="Time remaining until the wedding" style={{ display: 'flex', gap: '2.4cqw', marginTop: '3cqw' }}>
              {cells.map(([label, v]) => (
                <div key={label} style={{ width: '19cqw', padding: '2.4cqw 0', borderRadius: '5cqw', background: 'rgba(255,250,235,.72)', border: '1px solid rgba(138,90,52,.35)' }}>
                  <div className="tg-gilda" style={{ fontSize: '9cqw', fontVariantNumeric: 'tabular-nums', lineHeight: 1.05 }}>{String(v).padStart(2, '0')}</div>
                  <div className="tg-pop" style={{ fontSize: '2.2cqw', letterSpacing: '.14em' }}>{label}</div>
                </div>
              ))}
            </div>
            {c.isComplete && <p className="k-in tg-pop" style={{ fontSize: '3.2cqw' }}>The celebrations have begun</p>}
            <p className="k-in" style={{ maxWidth: '72cqw', fontStyle: 'italic', fontSize: '3.6cqw', lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif" }}>{countdownNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Scene 08 - R P monogram: letters slide together, flower blooms, vines draw, gold ornaments enter from both sides. */
export function SceneMonogram() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.tg-mono-r', { x: -90, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.05)
      .fromTo('.tg-mono-p', { x: 90, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.05)
      .fromTo('.tg-mono-flower', { scale: 0, rotation: -60, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.25, ease: 'back.out(1.6)' }, 0.38)
      .fromTo('.m-vine .tg-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.45, stagger: 0.05 }, 0.5)
      .fromTo('.m-leaf', { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.015 }, 0.6)
      .fromTo('.m-ring', { scale: 0.7, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: 30, duration: 0.8 }, 0);
  }, { end: '+=140%' });
  const pts = Array.from({ length: 22 }, (_, i) => { const a = (i / 22) * Math.PI * 2; return { x: 150 + Math.cos(a) * 128, y: 150 + Math.sin(a) * 128, r: (a * 180) / Math.PI + 90 }; });
  return (
    <section id="tg-scene-08" ref={root} className="tg-scene tg-paper">
      <div className="tg-stage" style={{ background: 'linear-gradient(180deg,#F0EBD0,#DDE0BC)' }}>
        <BotanicalOrbitSystem specs={orbits} color="#B9905A" />
        <div className="tg-board">
          <A style={{ top: 0, left: 0, width: '44cqw', zIndex: 1 }}><HangingVine className="tg-fit-w" /></A>
          <A style={{ top: 0, right: 0, width: '44cqw', zIndex: 1, transform: 'scaleX(-1)' }}><HangingVine className="tg-fit-w" /></A>
          <A className="m-ring" style={{ left: '50%', top: '46%', width: '96cqw', marginLeft: '-48cqw', marginTop: '-48cqw', opacity: 0.55, zIndex: 1 }}><BotanicalOrbit kind="leaf" speed={0.4} style={{ width: '100%', height: '100%' }} /></A>
          <A style={{ left: '50%', top: '46%', width: '88cqw', marginLeft: '-44cqw', marginTop: '-44cqw', zIndex: 2 }}>
            <svg viewBox="0 0 300 300" className="tg-fit m-vine" fill="none" stroke="#7FA05A" strokeWidth="1.8" aria-hidden="true">
              <path className="tg-draw" d="M150 22A128 128 0 0 0 22 150" /><path className="tg-draw" d="M278 150A128 128 0 0 0 150 278" />
              {pts.filter((_, i) => i % 2 === 0).map((p, i) => <g key={i} className="m-leaf"><Leaf x={p.x} y={p.y} len={20} rot={p.r} fill="url(#tgSage)" /></g>)}
            </svg>
          </A>
          <A style={{ left: '50%', top: '46%', width: '66cqw', marginLeft: '-33cqw', marginTop: '-31cqw', zIndex: 3 }}><CoupleMonogram letters={[bride.firstName.charAt(0).toUpperCase(), groom.firstName.charAt(0).toUpperCase()]} className="tg-fit-w" /></A>
          <p className="tg-text tg-pop" style={{ top: '72%', fontSize: '3.4cqw', color: '#6B3A22' }}>{bride.firstName} &amp; {groom.firstName}</p>
          <A style={{ left: '-6cqw', bottom: '-6cqw', width: '40cqw', zIndex: 4 }}><FloralCorner className="tg-fit-w" /></A>
          <A style={{ right: '-6cqw', bottom: '-6cqw', width: '40cqw', zIndex: 4, transform: 'scaleX(-1)' }}><FloralCorner className="tg-fit-w" /></A>
        </div>
      </div>
    </section>
  );
}

/** Scene 09 - Just Married: monogram above, vintage car drives in from the distance along an animated road. */
export function SceneJustMarried() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.j-sky', { opacity: 0.2 }, { opacity: 1, duration: 0.25 }, 0)
      .fromTo('.j-mono', { y: 60, scale: 1.25 }, { y: 0, scale: 1, duration: 0.5 }, 0)
      .fromTo('.j-vine', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0.05)
      .fromTo('.tg-wf', { scale: 0 }, { scale: 1, duration: 0.5, stagger: { amount: 0.4, from: 'random' }, ease: 'back.out(1.4)' }, 0.1)
      .fromTo('.j-car', { scale: 0.28, y: '-120%', opacity: 0.2, transformOrigin: '50% 100%' }, { scale: 1, y: '0%', opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.15)
      .fromTo('.j-dash', { strokeDashoffset: 0 }, { strokeDashoffset: -320, duration: 1.2 }, 0)
      .fromTo('.tg-ribbon', { opacity: 0, scaleX: 0.2, transformOrigin: '50% 50%', transformBox: 'fill-box' }, { opacity: 1, scaleX: 1, duration: 0.2 }, 0.78);
  }, { end: '+=230%' });
  return (
    <section id="tg-scene-09" ref={root} className="tg-scene">
      <div className="tg-stage" style={{ background: '#E3EEC4' }}>
        <WatercolorSky className="j-sky" />
        <div className="tg-board tg-paper">
          <A className="j-vine" style={{ top: 0, left: 0, width: '38cqw', zIndex: 2 }}><HangingVine className="tg-fit-w" /></A>
          <A className="j-vine" style={{ top: 0, right: 0, width: '38cqw', zIndex: 2, transform: 'scaleX(-1)' }}><HangingVine className="tg-fit-w" /></A>
          <A className="j-mono" style={{ left: '50%', top: '14%', width: '58cqw', marginLeft: '-29cqw', zIndex: 3 }}><CoupleMonogram letters={[bride.firstName.charAt(0).toUpperCase(), groom.firstName.charAt(0).toUpperCase()]} className="tg-fit-w" /></A>
          <A style={{ left: 0, bottom: '16cqw', width: '48cqw', height: '60cqw', zIndex: 2 }}><Wildflowers className="tg-fit" seed={3} /></A>
          <A style={{ right: 0, bottom: '16cqw', width: '48cqw', height: '60cqw', zIndex: 2, transform: 'scaleX(-1)' }}><Wildflowers className="tg-fit" seed={8} /></A>
          <A style={{ left: 0, right: 0, bottom: 0, height: '34cqw', zIndex: 3 }}>
            <svg viewBox="0 0 400 140" preserveAspectRatio="none" className="tg-fit" aria-hidden="true"><path d="M150 0H250L400 140H0Z" fill="#0B0B0B" /><path d="M150 0L0 140M250 0L400 140" stroke="#fff" strokeWidth="5" /><path className="j-dash" d="M200 0V140" stroke="#fff" strokeWidth="7" strokeDasharray="22 26" /></svg>
          </A>
          <A className="j-car" style={{ left: '50%', bottom: '8cqw', width: '76cqw', marginLeft: '-38cqw', zIndex: 4 }}><VintageWeddingCar className="tg-fit-w" /></A>
        </div>
      </div>
    </section>
  );
}

/** Scene 10 - the honour of your presence: translucent champagne panel in a watercolor garden, followed by RSVP, calendar, directions and contact. */
export function SceneFinalGarden() {
  const root = useRef<HTMLElement>(null);
  const { venue, contact, rsvp } = weddingData;
  const wa = contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` : '';
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.z-panel', { scale: 0.7, opacity: 0, borderRadius: '50%' }, { scale: 1, opacity: 1, borderRadius: '28px', ease: 'none', scrollTrigger: { trigger: '.z-panel', start: 'top 95%', end: 'top 45%', scrub: true } });
      gsap.fromTo('.z-bloom', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'top 20%', scrub: true } });
    });
    return () => mm.revert();
  }, { scope: root });
  const line = (t: string, k: number) => <Reveal key={t} delay={k * 0.12}><p className="tg-lora" style={{ fontSize: 'clamp(1.7rem,7vw,2.6rem)', color: '#4A2E1C', lineHeight: 1.3 }}>{t}</p></Reveal>;
  return (
    <section id="tg-scene-10" ref={root} className="tg-scene tg-paper" style={{ background: '#E3EEC4', padding: 'clamp(4rem,12svh,7rem) 1.2rem 6rem' }}>
      <WatercolorSky />
      <BotanicalOrbitSystem specs={orbits} color="#B9905A" />
      <Petals count={10} seed={77} colors={['#F3A6B8', '#FBE7A3', '#FFFFFF']} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: 'min(40vw,200px)', zIndex: 2 }}><HangingVine className="tg-fit-w" /></div>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 'min(40vw,200px)', zIndex: 2, transform: 'scaleX(-1)' }}><HangingVine className="tg-fit-w" /></div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '36%', zIndex: 1 }}><div style={{ display: 'flex', height: '100%' }}><Wildflowers className="tg-fit" seed={11} /><Wildflowers className="tg-fit" seed={12} /></div></div>
      <div className="z-bloom" style={{ position: 'absolute', left: -20, bottom: -10, width: 'min(40vw,220px)', zIndex: 2 }}><FloralCorner tone="blush" className="tg-fit-w" /></div>
      <div className="z-bloom" style={{ position: 'absolute', right: -20, bottom: -10, width: 'min(40vw,220px)', zIndex: 2, transform: 'scaleX(-1)' }}><FloralCorner tone="blush" className="tg-fit-w" /></div>
      <div style={{ position: 'relative', zIndex: 5, display: 'grid', justifyItems: 'center', gap: '2rem' }}>
        <div className="z-panel" style={{ width: 'min(86vw,420px)', padding: 'clamp(3rem,10vw,4.6rem) 1.4rem', textAlign: 'center', background: 'rgba(214,184,140,.62)', backdropFilter: 'blur(2px)', borderRadius: 28, display: 'grid', gap: '.4rem' }}>
          {['The honour', 'of your', 'presence is', 'requested'].map(line)}
        </div>
        <div style={{ width: 'min(90vw,440px)', padding: 'clamp(1.4rem,5vw,2rem)', background: 'rgba(255,248,230,.82)', borderRadius: 28, color: '#3B2A20', display: 'grid', gap: '1.4rem' }}>
          <Reveal><h3 className="tg-script" style={{ fontSize: '3rem', textAlign: 'center', color: '#6B3A22' }}>Kindly RSVP</h3></Reveal>
          <RsvpForm />
          {rsvp.deadline && <p style={{ textAlign: 'center', fontSize: '.95rem', opacity: 0.75 }}>Kindly reply by {rsvp.deadline}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.7rem', justifyContent: 'center', color: '#6B3A22' }}>
            <LinkButton dark onClick={downloadIcs}>Add to Calendar</LinkButton><LinkButton dark href={venue.mapsUrl} disabledLabel="Directions soon">Venue Directions</LinkButton>
          </div>
          <div style={{ display: 'grid', gap: '.3rem', textAlign: 'center' }}>
            {contact.phone && <p><a className="tg-link" href={`tel:${contact.phone}`}>{contact.phone}</a></p>}
            {contact.email && <p><a className="tg-link" href={`mailto:${contact.email}`}>{contact.email}</a></p>}
            {wa && <p><a className="tg-link" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp us</a></p>}
          </div>
        </div>
      </div>
    </section>
  );
}
