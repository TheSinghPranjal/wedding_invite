import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import weddingData from '../../data/weddingData';
import { brandDate } from '../../lib/dates';
import Palace from '../art/Palace';

function Lotus({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 22 H34 M86 22 H120" strokeOpacity=".8" />
      <path d="M60 4 Q70 16 60 28 Q50 16 60 4Z M60 28 Q46 26 40 14 Q54 14 60 28Z M60 28 Q74 26 80 14 Q66 14 60 28Z M60 28 Q40 30 30 22 Q46 20 60 28Z M60 28 Q80 30 90 22 Q74 20 60 28Z" fill="currentColor" fillOpacity=".25" />
      <circle cx="40" cy="22" r="1.6" fill="currentColor" />
      <circle cx="80" cy="22" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Scene 1 – illuminated palace poster; slow scroll-driven push-in, title lifts away. */
export default function ScenePalace() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.p-title > *', { opacity: 0, y: 30 });
        gsap.to('.p-title > *', { opacity: 1, y: 0, duration: 1.6, stagger: 0.25, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo('.p-img', { scale: 1.02 }, { scale: 1.08, duration: 14, ease: 'sine.inOut', yoyo: true, repeat: -1 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=220%', scrub: 0.6, pin: '.pin-stage', anticipatePin: 1 },
        });
        tl.to('.p-zoom', { scale: 2.1, transformOrigin: '50% 62%' }, 0)
          .to('.p-title', { opacity: 0, y: -90 }, 0.04)
          .to('.p-cue', { opacity: 0 }, 0)
          .to('.p-out', { opacity: 1 }, 0.65);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="scene-01" ref={root} className="scene bg-[#050a22]">
      <div className="pin-stage">
        <div className="p-zoom absolute inset-0 will-change-transform">
          <Palace className="p-img absolute inset-0 w-full h-full" position="50% 78%" />
        </div>
        <div className="p-title absolute inset-x-0 top-[5%] md:top-[5%] flex flex-col items-center text-center px-6 text-ivory">
          <Lotus className="w-20 md:w-28 text-gold" />
          <p className="text-[0.62rem] md:text-sm tracking-[0.5em] text-gold uppercase mt-1">A Celebration of Love</p>
          <h1 className="font-display text-[2.3rem] sm:text-6xl md:text-8xl mt-3 leading-none tracking-[0.05em] drop-shadow-[0_4px_30px_rgba(0,0,0,.7)]">
            {bride.firstName.toUpperCase()} <span className="text-gold font-script normal-case">&amp;</span> {groom.firstName.toUpperCase()}
          </h1>
          <Lotus className="w-32 md:w-48 text-gold mt-2" />
          <p className="mt-1 text-[0.65rem] md:text-base tracking-[0.45em] text-ivory/90">{brandDate()}</p>
        </div>
        <div className="p-cue absolute bottom-5 inset-x-0 text-center text-[0.62rem] tracking-[0.5em] text-ivory/80 uppercase">
          Scroll
          <svg viewBox="0 0 20 10" className="w-4 mx-auto mt-1 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2 L10 8 L18 2" /></svg>
        </div>
        <div className="p-out absolute inset-0 opacity-0 bg-gradient-to-b from-[#3f78c4]/0 to-[#3f78c4]" />
      </div>
    </section>
  );
}
