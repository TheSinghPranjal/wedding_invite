import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import weddingData from '../../data/weddingData';
import Palace from '../art/Palace';
import Stars from '../art/Stars';
import Reveal from '../ui/Reveal';
import LinkButton from '../ui/LinkButton';

/** Scene 8 – palace returns under golden light; venue details from weddingData.venue */
export default function SceneVenue() {
  const root = useRef<HTMLElement>(null);
  const { venue } = weddingData;
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.v-palace', { scale: 1.5, yPercent: 10 }, { scale: 1, yPercent: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: true } });
        gsap.fromTo('.v-glow', { opacity: 0.2 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'center center', scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  const place = [venue.address, venue.city].filter(Boolean).join(', ');
  return (
    <section id="scene-08" ref={root} className="scene min-h-svh bg-gradient-to-b from-[#050a22] via-[#0d1b4a] to-[#2a2a55] flex flex-col justify-between text-ivory">
      <Stars count={60} seed={3} />
      <div className="v-glow absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,170,50,.55),transparent_65%)]" />
      <div className="relative z-10 text-center px-6 pt-24">
        <Reveal><p className="text-xs tracking-[0.5em] uppercase text-gold">The Venue</p></Reveal>
        <Reveal delay={0.1}><h2 className="font-display text-4xl md:text-7xl mt-4">{venue.name || 'Venue to be announced'}</h2></Reveal>
        {place && <Reveal delay={0.2}><p className="italic text-ivory/80 mt-4 text-lg md:text-xl">{place}</p></Reveal>}
        <Reveal delay={0.3} className="mt-9 flex flex-wrap justify-center gap-4">
          <LinkButton href={venue.mapsUrl} disabledLabel="View Venue">View Venue</LinkButton>
          <LinkButton href={venue.mapsUrl} tone="ivory" disabledLabel="Get Directions">Get Directions</LinkButton>
        </Reveal>
      </div>
      <div className="v-palace relative h-[50vh] md:h-[60vh] mt-12 will-change-transform">
        <Palace className="absolute bottom-0 w-full h-full" position="50% 70%" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#1a1326]" />
      </div>
    </section>
  );
}
