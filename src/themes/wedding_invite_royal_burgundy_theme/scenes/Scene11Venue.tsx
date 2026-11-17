import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import palaceUrl from '../assets/palace.jpg';
import { CircularOrnament, SideOrnamentLayer } from '../art/Mandala';
import { GoldDust } from '../art/Particles';
import { Reveal, LinkButton } from '../ui/ui';

/** Scene 11 - venue reveal: palace image opens through a radial mask, ringed by turning floral ornaments. */
export default function SceneVenue() {
  const root = useRef<HTMLElement>(null);
  const { venue } = weddingData;
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.v-photo', { clipPath: 'circle(0% at 50% 60%)' }, { clipPath: 'circle(80% at 50% 60%)', ease: 'none', scrollTrigger: { trigger: '.v-photo-wrap', start: 'top 90%', end: 'top 25%', scrub: true } });
      gsap.fromTo('.v-img', { scale: 1.4 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.v-photo-wrap', start: 'top bottom', end: 'bottom 30%', scrub: true } });
      gsap.fromTo('.v-ring', { scale: 0.7, opacity: 0, rotation: 0 }, { scale: 1, opacity: 1, rotation: 90, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: '.v-photo-wrap', start: 'top 85%', end: 'center 45%', scrub: true } });
    });
    return () => mm.revert();
  }, { scope: root });
  const place = [venue.address, venue.city].filter(Boolean).join(', ');
  return (
    <section id="rb-scene-11" ref={root} className="rb-scene rb-grain" style={{ background: 'linear-gradient(180deg,#2A0414,#350719 40%,#1D0615)', padding: 'clamp(4rem,10svh,7rem) 1.2rem clamp(3rem,8svh,5rem)', minHeight: '100svh' }}>
      <SideOrnamentLayer />
      <GoldDust count={24} seed={81} />
      <div className="rb-content rb-center" style={{ display: 'grid', gap: '.8rem', justifyItems: 'center' }}>
        <Reveal><p className="rb-eyebrow">The wedding destination</p></Reveal>
        <Reveal delay={0.1}><h2 className="rb-title rb-gold-text" style={{ fontSize: 'clamp(1.8rem,6vw,4rem)' }}>{venue.name || 'Venue to be announced'}</h2></Reveal>
        {place && <Reveal delay={0.2}><p className="rb-body" style={{ fontStyle: 'italic', color: 'rgba(255,249,237,.85)' }}>{place}</p></Reveal>}
        <Reveal delay={0.3}><div style={{ display: 'flex', flexWrap: 'wrap', gap: '.8rem', justifyContent: 'center', marginTop: '.5rem' }}><LinkButton href={venue.mapsUrl} disabledLabel="View Venue">View Venue</LinkButton><LinkButton href={venue.mapsUrl} disabledLabel="Get Directions">Get Directions</LinkButton></div></Reveal>
      </div>
      <div className="v-photo-wrap" style={{ position: 'relative', margin: 'clamp(2rem,6svh,4rem) auto 0', width: 'min(92vw,820px)', aspectRatio: '4 / 3' }}>
        <div className="v-ring" style={{ position: 'absolute', left: '-12%', top: '-18%', width: '34%', color: '#D5AD55', opacity: 0, zIndex: 3 }}><CircularOrnament variant="floral" speed={0.8} /></div>
        <div className="v-ring" style={{ position: 'absolute', right: '-12%', top: '-10%', width: '30%', color: '#D5AD55', opacity: 0, zIndex: 3 }}><CircularOrnament variant="dots" speed={0.8} /></div>
        <div className="v-ring" style={{ position: 'absolute', right: '-8%', bottom: '-16%', width: '34%', color: '#D5AD55', opacity: 0, zIndex: 3 }}><CircularOrnament variant="floral" speed={1} /></div>
        <div className="v-ring" style={{ position: 'absolute', left: '-8%', bottom: '-12%', width: '28%', color: '#D5AD55', opacity: 0, zIndex: 3 }}><CircularOrnament variant="sun" speed={1} /></div>
        <div className="v-photo" style={{ position: 'absolute', inset: 0, overflow: 'hidden', border: '3px solid #D5AD55', boxShadow: '0 0 0 8px #350719, 0 0 0 9px #D5AD55, 0 40px 80px -30px #000', zIndex: 2 }}>
          <img className="v-img" src={venue.photo || palaceUrl} alt={venue.name ? `${venue.name}` : 'Illuminated royal palace'} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 70%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(53,7,25,.35), transparent 30%, transparent 70%, rgba(53,7,25,.5))' }} />
        </div>
      </div>
    </section>
  );
}
