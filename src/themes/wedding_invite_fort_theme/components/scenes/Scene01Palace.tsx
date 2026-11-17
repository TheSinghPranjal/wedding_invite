import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import weddingData from '../../data/weddingData';
import { brandDate } from '../../lib/dates';
import Palace from '../art/Palace';
import Lantern from '../art/Lantern';

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

const FIRST = [8, 22, 37, 55, 68, 81, 92, 46];

/** Scene 1 – palace poster. Scroll pushes into the palace while the first lanterns lift off, handing straight into Scene 2. */
export default function ScenePalace() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  const lanterns = useMemo(() => FIRST.map((x, i) => ({ x, size: 30 + ((i * 37) % 50), delay: (i * 0.37) % 1 })), []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.p-title > *', { opacity: 0, y: 30 });
        gsap.to('.p-title > *', { opacity: 1, y: 0, duration: 1.6, stagger: 0.22, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo('.p-img', { scale: 1.02 }, { scale: 1.07, duration: 14, ease: 'sine.inOut', yoyo: true, repeat: -1 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=170%', scrub: 0.6, pin: '.pin-stage', anticipatePin: 1, invalidateOnRefresh: true },
        });
        tl.to('.p-zoom', { scale: 1.6, yPercent: 6, transformOrigin: '50% 72%' }, 0)
          .to('.p-title', { opacity: 0, y: -90, duration: 0.3 }, 0)
          .to('.p-cue', { opacity: 0, duration: 0.1 }, 0)
          .to('.p-dusk', { opacity: 1, duration: 0.5 }, 0.5)
          .fromTo('.p-lantern', { y: () => window.innerHeight * 1.1 }, { y: () => -window.innerHeight * 0.9, duration: 0.65, stagger: 0.035 }, 0.33);
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
        <div className="p-dusk absolute inset-0 opacity-0 bg-gradient-to-b from-[#2b5fae] via-[#3a70bd]/85 to-[#3a70bd]/0" />
        {lanterns.map((l, i) => (
          <div key={i} className="p-lantern absolute top-0" style={{ left: `${l.x}%`, zIndex: 5 }}>
            <Lantern size={l.size} flickerDelay={l.delay} />
          </div>
        ))}
        <div className="p-title absolute inset-x-0 top-[5%] flex flex-col items-center text-center px-6 text-ivory">
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
          <svg viewBox="0 0 20 10" className="w-4 mx-auto mt-1 text-gold animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2 L10 8 L18 2" /></svg>
        </div>
      </div>
    </section>
  );
}
