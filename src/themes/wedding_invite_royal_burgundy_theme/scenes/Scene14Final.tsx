import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { brandDate, downloadIcs } from '../lib/dates';
import { MandalaDecoration, SideOrnamentLayer } from '../art/Mandala';
import { Ganesha, ScrollCorner } from '../art/Ornaments';
import { GoldDust } from '../art/Particles';
import GoldBorder from '../art/GoldBorder';
import { Reveal, LinkButton, RsvpForm } from '../ui/ui';

/** Scene 14 - closing invitation; a gold mandala draws itself around the couple's names as it scrolls into view. */
export default function SceneFinal() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom, venue, contact, rsvp } = weddingData;
  const wa = contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` : '';
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const st = { trigger: '.f-names', start: 'top 85%', end: 'center 40%', scrub: 0.8 };
      gsap.fromTo('.f-mandala path, .f-mandala circle', { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none', stagger: { amount: 0.6, from: 'edges' }, scrollTrigger: st });
      gsap.fromTo('.f-mandala', { rotation: -40, scale: 0.8, opacity: 0.2 }, { rotation: 0, scale: 1, opacity: 1, ease: 'none', scrollTrigger: st });
      gsap.fromTo('.f-border .rb-draw', { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none', stagger: 0.2, scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'center center', scrub: true } });
    });
    return () => mm.revert();
  }, { scope: root });
  return (
    <section id="rb-scene-14" ref={root} className="rb-scene rb-grain" style={{ background: 'linear-gradient(180deg,#500A20,#650D25 30%,#350719)', padding: 'clamp(4rem,10svh,7rem) 1.2rem 6rem' }}>
      <SideOrnamentLayer />
      <GoldDust count={26} seed={101} />
      <div className="f-border" style={{ position: 'absolute', inset: 0, zIndex: 3 }}><GoldBorder /></div>
      {[0, 1, 2, 3].map((i) => <ScrollCorner key={i} style={{ position: 'absolute', width: 'clamp(80px,16vw,170px)', zIndex: 3, top: i < 2 ? 24 : undefined, bottom: i >= 2 ? 24 : undefined, left: i % 2 === 0 ? 24 : undefined, right: i % 2 ? 24 : undefined, transform: `scale(${i % 2 ? -1 : 1}, ${i >= 2 ? -1 : 1})` }} />)}
      <div className="rb-content rb-center" style={{ display: 'grid', justifyItems: 'center', gap: '1rem' }}>
        <Reveal><Ganesha style={{ width: 'clamp(70px,14vw,110px)' }} /></Reveal>
        <Reveal delay={0.1}><p className="rb-eyebrow">With love and blessings</p></Reveal>
        <div className="f-names" style={{ position: 'relative', display: 'grid', placeItems: 'center', width: '100%', minHeight: 'min(100vw,540px)' }}>
          <div className="f-mandala" style={{ position: 'absolute', width: 'min(125vw,640px)', aspectRatio: '1', color: '#D5AD55', opacity: 0.6 }}><MandalaDecoration layers={3} speed={0.5} /></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p className="rb-names rb-gold-text" style={{ fontSize: 'clamp(3rem,11vw,5.6rem)', textShadow: '0 2px 14px rgba(53,7,25,.9)' }}>{bride.firstName}</p>
            <p className="rb-script" style={{ fontSize: '2.6rem', color: '#F1D58B', lineHeight: 0.8 }}>&amp;</p>
            <p className="rb-names rb-gold-text" style={{ fontSize: 'clamp(3rem,11vw,5.6rem)', textShadow: '0 2px 14px rgba(53,7,25,.9)' }}>{groom.firstName}</p>
            <p className="rb-cap" style={{ color: '#F1D58B', marginTop: '.8rem', fontSize: 'clamp(.8rem,2.4vw,1.2rem)' }}>{brandDate()}</p>
          </div>
        </div>
        <Reveal><p className="rb-cap" style={{ fontSize: 'clamp(.7rem,2.2vw,1rem)', maxWidth: '26rem', lineHeight: 1.8 }}>We would be delighted to have you with us.</p></Reveal>

        <Reveal><h3 className="rb-title" style={{ fontSize: 'clamp(1.6rem,5vw,2.6rem)', marginTop: '3rem' }}>Please RSVP</h3></Reveal>
        <div style={{ width: '100%', background: 'rgba(53,7,25,.55)', padding: 'clamp(1.2rem,4vw,2rem)', border: '1px solid rgba(213,173,85,.4)', maxWidth: '34rem' }}><RsvpForm /></div>
        {rsvp.deadline && <p style={{ fontSize: '.95rem', opacity: 0.7 }}>Kindly reply by {rsvp.deadline}</p>}
        <Reveal><div style={{ display: 'flex', flexWrap: 'wrap', gap: '.8rem', justifyContent: 'center', marginTop: '1.5rem' }}><LinkButton onClick={downloadIcs}>Add to Calendar</LinkButton><LinkButton href={venue.mapsUrl} disabledLabel="Directions soon">Venue Directions</LinkButton></div></Reveal>
        <div style={{ display: 'grid', gap: '.3rem', marginTop: '1.5rem', color: 'rgba(255,249,237,.85)' }}>
          {contact.phone && <p><a className="rb-link" href={`tel:${contact.phone}`}>{contact.phone}</a></p>}
          {contact.email && <p><a className="rb-link" href={`mailto:${contact.email}`}>{contact.email}</a></p>}
          {wa && <p><a className="rb-link" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp us</a></p>}
        </div>
      </div>
    </section>
  );
}
