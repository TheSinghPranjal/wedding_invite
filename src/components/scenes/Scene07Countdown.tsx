import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import weddingData from '../../data/weddingData';
import { brandDate, getWeddingInstant } from '../../lib/dates';
import { useCountdown } from '../../hooks/useCountdown';
import Car from '../art/Car';
import Stars from '../art/Stars';

const target = getWeddingInstant();

/** Scene 7 – vintage car drives with scroll; bg emerald → midnight; live countdown to the wedding instant (Asia/Kolkata). */
export default function SceneCountdown() {
  const root = useRef<HTMLElement>(null);
  const c = useCountdown(target);
  const { bride, groom, countdownNote } = weddingData;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.cd-car', { scale: 0.35, yPercent: 20, opacity: 0.2 });
        gsap.set('.cd-block', { opacity: 0, y: 40 });
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=240%', scrub: 0.7, pin: '.pin-stage', anticipatePin: 1 },
        });
        tl.to('.cd-bg-night', { opacity: 1, duration: 0.6 }, 0.2)
          .to('.cd-car', { scale: 1.05, yPercent: -12, opacity: 1, duration: 0.55, ease: 'power1.out' }, 0)
          .to('.cd-title', { opacity: 0, y: -40, duration: 0.2 }, 0.45)
          .to('.cd-car', { yPercent: -60, scale: 1.25, duration: 0.4, ease: 'power1.in' }, 0.55)
          .to('.cd-block', { opacity: 1, y: 0, duration: 0.3 }, 0.5)
          .to('.cd-stars', { opacity: 1, duration: 0.3 }, 0.45);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const cells: [string, number][] = [['Days', c.days], ['Hours', c.hours], ['Minutes', c.minutes], ['Seconds', c.seconds]];
  return (
    <section id="scene-07" ref={root} className="scene bg-emerald-dark">
      <div className="pin-stage">
        <div className="absolute inset-0 emerald-paper" />
        <div className="cd-bg-night absolute inset-0 opacity-0 bg-gradient-to-b from-[#0d1b4a] to-[#050a22]" />
        <div className="cd-stars absolute inset-0 opacity-0"><Stars count={60} seed={21} /></div>
        <div className="cd-title absolute top-[12%] inset-x-0 text-center px-6">
          <p className="font-display text-4xl md:text-7xl gold-text">The countdown begins</p>
        </div>
        <Car className="cd-car absolute left-1/2 -translate-x-1/2 bottom-[2%] w-[88vw] max-w-[640px] will-change-transform drop-shadow-[0_30px_30px_rgba(0,0,0,.45)]" />
        <div className="cd-block absolute inset-x-0 top-[10%] md:top-[12%] text-center px-4 text-ivory">
          <p className="text-xs md:text-sm tracking-[0.5em] text-gold uppercase">Counting down to</p>
          <p className="font-display text-3xl md:text-5xl mt-3">{bride.firstName} <span className="font-script text-gold">&amp;</span> {groom.firstName}</p>
          <p className="tracking-[0.4em] text-ivory/80 mt-2 text-xs md:text-base">{brandDate()}</p>
          <div className="mt-8 md:mt-10 flex justify-center gap-3 md:gap-8" role="timer" aria-label="Time remaining until the wedding">
            {cells.map(([label, v]) => (
              <div key={label} className="min-w-[4.2rem] md:min-w-28">
                <div className="font-display tabular-nums text-4xl md:text-7xl gold-text">{String(v).padStart(2, '0')}</div>
                <div className="text-[0.6rem] md:text-xs tracking-[0.35em] uppercase text-ivory/70 mt-1">{label}</div>
              </div>
            ))}
          </div>
          {c.isComplete && <p className="mt-6 text-gold tracking-[0.3em] uppercase text-sm">The celebrations have begun</p>}
          <p className="mx-auto max-w-md mt-8 text-sm md:text-base italic text-ivory/70">{countdownNote}</p>
        </div>
      </div>
    </section>
  );
}
