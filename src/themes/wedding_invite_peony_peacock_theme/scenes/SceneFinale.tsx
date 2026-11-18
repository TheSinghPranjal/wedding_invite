import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { useStage } from '../hooks/useStage';
import { useCountdown } from '../hooks/useCountdown';
import { brandDate, getWeddingInstant, downloadIcs, formatLongDate } from '../lib/dates';
import { SideOrnamentController, FloralOrbit, Leaf, GoldStar, type OrbitSpec } from '../art/Orbit';
import { RoseCorner, CoupleMonogram, MagnoliaBranch } from '../art/Heritage';
import { Petals, GoldDust } from '../art/Particles';
import { Reveal, LinkButton, RsvpForm } from '../ui/ui';
import { A } from './common';

const target = getWeddingInstant();
const orbits: OrbitSpec[] = [
  { side: 'left', kind: 'lace', size: 500, top: 42, crop: 0.66, dir: 1, rotate: 110, opacity: 0.55, parallax: 120 },
  { side: 'right', kind: 'wreath', size: 520, top: 66, crop: 0.66, dir: -1, rotate: 100, opacity: 0.55, parallax: 160 },
  { side: 'left', kind: 'gold', size: 210, top: 90, crop: 0.5, dir: -1, rotate: 220, opacity: 0.45, parallax: 240, desktopOnly: true },
  { side: 'right', kind: 'star', size: 200, top: 10, crop: 0.5, dir: 1, rotate: 240, opacity: 0.45, parallax: 260, desktopOnly: true },
];

/** Countdown (Asia/Kolkata) inside a slowly turning lace mandala. Targets the configured ceremony time, never an invented one. */
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
    <section id="bp-countdown" ref={root} className="bp-scene bp-paper">
      <div className="bp-stage" style={{ background: '#F6E5E5' }}>
        <SideOrnamentController specs={orbits} color="#E3B0B8" />
        <div className="bp-board" style={{ background: 'linear-gradient(180deg,#F8E9E8,#F2D3D8)' }}>
          <A style={{ left: '4cqw', top: '4cqw', width: '38cqw', zIndex: 1 }}><RoseCorner className="bp-fit-w" /></A>
          <A style={{ right: '4cqw', bottom: '4cqw', width: '38cqw', zIndex: 1, transform: 'scale(-1,-1)' }}><RoseCorner className="bp-fit-w" /></A>
          <A className="k-ring" style={{ left: '50%', top: '50%', width: '122cqw', marginLeft: '-61cqw', marginTop: '-61cqw', zIndex: 1, color: '#fff', opacity: 0.8 }}><FloralOrbit kind="lace" speed={0.3} className="bp-fit" /></A>
          <div className="bp-text" style={{ top: '34%', display: 'grid', gap: '2.4cqw', justifyItems: 'center', color: '#874052', zIndex: 3 }}>
            <p className="k-in bp-display" style={{ fontSize: '3.4cqw', letterSpacing: '.24em' }}>The big day is approaching</p>
            <p className="k-in bp-names" style={{ fontSize: '17cqw', color: '#AF3155' }}>{bride.firstName} &amp; {groom.firstName}</p>
            <p className="k-in bp-display" style={{ fontSize: '3.6cqw' }}>{brandDate()}</p>
            <div className="k-in" role="timer" aria-label="Time remaining until the wedding" style={{ display: 'flex', gap: '2.2cqw', marginTop: '3cqw' }}>
              {cells.map(([label, v]) => (
                <div key={label} style={{ width: '19cqw', padding: '2.4cqw 0', borderRadius: '4cqw', background: 'rgba(255,249,239,.85)', border: '1px solid rgba(135,64,82,.3)' }}>
                  <div className="bp-display" style={{ fontSize: '9cqw', fontVariantNumeric: 'tabular-nums', lineHeight: 1.05, letterSpacing: 0 }}>{String(v).padStart(2, '0')}</div>
                  <div className="bp-sans" style={{ fontSize: '2.1cqw', letterSpacing: '.14em', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
            {c.isComplete && <p className="k-in bp-display" style={{ fontSize: '3.2cqw' }}>The celebrations have begun</p>}
            <p className="k-in bp-serif" style={{ maxWidth: '72cqw', fontStyle: 'italic', fontSize: '3.8cqw', lineHeight: 1.5 }}>{countdownNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Monogram: initials slide together from opposite sides, the flower blooms, the geometric floral frame draws, branches reveal. */
export function SceneMonogram() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.m-frame .bp-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, stagger: 0.06 }, 0)
      .fromTo('.bp-mono-r', { x: -90, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.1)
      .fromTo('.bp-mono-p', { x: 90, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.1)
      .fromTo('.bp-mono-flower', { scale: 0, rotation: -60, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.25, ease: 'back.out(1.6)' }, 0.4)
      .fromTo('.m-branch', { xPercent: -30, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, 0.5)
      .fromTo('.m-leaf', { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.02 }, 0.55);
  }, { end: '+=130%' });
  const pts = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return { x: Math.cos(a) * 96, y: Math.sin(a) * 96, r: (a * 180) / Math.PI + 90 }; });
  return (
    <section id="bp-scene-10" ref={root} className="bp-scene bp-paper">
      <div className="bp-stage" style={{ background: '#FFF9EF' }}>
        <SideOrnamentController specs={orbits} color="#E3B0B8" />
        <div className="bp-board" style={{ background: 'radial-gradient(ellipse at 50% 45%, #FFFDF8, #FBEDEA)' }}>
          <A style={{ left: '50%', top: '46%', width: '88cqw', marginLeft: '-44cqw', marginTop: '-44cqw', zIndex: 1 }}>
            <svg viewBox="-110 -110 220 220" className="bp-fit m-frame" fill="none" stroke="url(#bpGold)" strokeWidth="1.1" aria-hidden="true">
              <circle className="bp-draw" r="104" /><circle className="bp-draw" r="98" strokeDasharray="1 4" /><polygon className="bp-draw" points="0,-88 76,-44 76,44 0,88 -76,44 -76,-44" /><polygon className="bp-draw" points="0,-88 76,-44 76,44 0,88 -76,44 -76,-44" transform="rotate(30)" opacity=".7" />
              {pts.filter((_, i) => i % 2 === 0).map((p, i) => <g key={i} className="m-leaf"><Leaf x={p.x} y={p.y} len={16} rot={p.r} fill="url(#bpSage)" /><GoldStar x={p.x * 1.08} y={p.y * 1.08} r={3} /></g>)}
            </svg>
          </A>
          <A style={{ left: '50%', top: '46%', width: '62cqw', marginLeft: '-31cqw', marginTop: '-29cqw', zIndex: 3 }}><CoupleMonogram letters={[bride.firstName.charAt(0).toUpperCase(), groom.firstName.charAt(0).toUpperCase()]} className="bp-fit-w" /></A>
          <A className="m-branch" style={{ left: '-4cqw', bottom: '6cqw', width: '38cqw', zIndex: 2 }}><MagnoliaBranch className="bp-fit-w" /></A>
          <A className="m-branch" style={{ right: '-4cqw', bottom: '6cqw', width: '38cqw', zIndex: 2, transform: 'scaleX(-1)' }}><MagnoliaBranch className="bp-fit-w" /></A>
          <p className="bp-text bp-display" style={{ top: '75%', fontSize: '3.6cqw', color: '#874052' }}>{bride.firstName} &amp; {groom.firstName}</p>
        </div>
      </div>
    </section>
  );
}

/** Final invitation + RSVP: roses in all four corners, mandala border, gold dividers; calendar, maps and contact. */
export function SceneFinalInvite() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom, venue, contact, rsvp, events } = weddingData;
  const wa = contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` : '';
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.z-corner', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top 20%', scrub: true } });
    });
    return () => mm.revert();
  }, { scope: root });
  const rule = <div style={{ width: 'min(60%,14rem)', height: 1, background: 'linear-gradient(90deg,transparent,#C3A16C,transparent)', margin: '.4rem auto' }} />;
  return (
    <section id="bp-scene-11" ref={root} className="bp-scene bp-paper" style={{ background: 'linear-gradient(180deg,#FFF9EF,#F6E5E5)', padding: 'clamp(3rem,8svh,5rem) 1rem 5rem' }}>
      <SideOrnamentController specs={orbits} color="#E3B0B8" />
      <Petals count={10} seed={77} colors={['#F6D9DC', '#E7A2B8', '#FFFDF6']} /><GoldDust count={14} seed={78} />
      <div style={{ position: 'relative', zIndex: 5, width: 'min(94vw,520px)', margin: '0 auto', padding: 'clamp(4rem,14vw,6rem) clamp(1.6rem,7vw,3rem)', background: 'rgba(255,252,246,.86)', border: '1px solid rgba(195,161,108,.7)', outline: '1px solid rgba(195,161,108,.35)', outlineOffset: -8, textAlign: 'center', color: '#4A2A33' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'150\' height=\'150\'><g stroke=\'%23E8C4CB\' stroke-width=\'1\' fill=\'none\' transform=\'translate(75 75)\'><circle r=\'60\'/></g></svg>")', opacity: 0.3, pointerEvents: 'none' }} />
        {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => <div key={i} className="z-corner" style={{ position: 'absolute', left: x ? undefined : -24, right: x ? -24 : undefined, top: y ? undefined : -24, bottom: y ? -24 : undefined, width: 'min(38%,180px)', transform: `scale(${x ? -1 : 1}, ${y ? -1 : 1})`, zIndex: 2 }}><RoseCorner className="bp-fit-w" /></div>)}
        <div style={{ position: 'relative', zIndex: 3, display: 'grid', gap: '.9rem', justifyItems: 'center' }}>
          <Reveal><p className="bp-names" style={{ fontSize: 'clamp(3.4rem,15vw,5.4rem)', color: '#AF3155' }}>{bride.firstName} &amp; {groom.firstName}</p></Reveal>
          <Reveal delay={0.1}><p className="bp-display" style={{ fontSize: '.95rem', color: '#874052' }}>{brandDate()}</p></Reveal>
          {rule}
          <Reveal delay={0.15}><p className="bp-display" style={{ fontSize: 'clamp(1.05rem,4.4vw,1.5rem)', lineHeight: 1.5, color: '#874052' }}>The honour of your presence<br />is requested.</p></Reveal>
          <Reveal delay={0.2}><p className="bp-serif" style={{ fontSize: '1.2rem', fontStyle: 'italic', maxWidth: '24em' }}>We look forward to celebrating this beautiful occasion with you.</p></Reveal>
          {rule}
          {events.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '.35rem', fontSize: '.88rem' }}>
              {events.map((e) => <li key={e.id} className="bp-sans"><b style={{ color: '#874052', letterSpacing: '.12em', textTransform: 'uppercase', fontSize: '.72rem' }}>{e.name}</b> · {e.date ? formatLongDate(e.date) : 'Date to be announced'}</li>)}
            </ul>
          )}
          {rule}
          <Reveal><h3 className="bp-names" style={{ fontSize: '2.8rem', color: '#874052' }}>Kindly RSVP</h3></Reveal>
          <div style={{ width: '100%', marginTop: '.4rem' }}><RsvpForm /></div>
          {rsvp.deadline && <p style={{ fontSize: '.9rem', opacity: 0.75 }}>Kindly reply by {rsvp.deadline}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.7rem', justifyContent: 'center', marginTop: '.8rem' }}><LinkButton onClick={downloadIcs}>Add to Calendar</LinkButton><LinkButton href={venue.mapsUrl} disabledLabel="Google Maps soon">Google Maps</LinkButton></div>
          <div className="bp-sans" style={{ display: 'grid', gap: '.3rem', fontSize: '.92rem', marginTop: '.6rem' }}>
            {contact.phone && <p><a className="bp-link" href={`tel:${contact.phone}`}>{contact.phone}</a></p>}
            {contact.email && <p><a className="bp-link" href={`mailto:${contact.email}`}>{contact.email}</a></p>}
            {wa && <p><a className="bp-link" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp us</a></p>}
          </div>
        </div>
      </div>
    </section>
  );
}
