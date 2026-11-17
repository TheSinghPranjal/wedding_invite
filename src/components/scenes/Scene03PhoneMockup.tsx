import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { useMedia } from '../../hooks/useMedia';
import InviteCopy from '../ui/InviteCopy';

function Hand() {
  return (
    <svg viewBox="0 0 300 520" className="absolute -right-24 bottom-[-9%] h-[62%] pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a8693f" /><stop offset="1" stopColor="#6f3f22" /></linearGradient>
      </defs>
      <path d="M0 140 Q40 90 120 110 Q150 70 190 100 Q250 80 280 190 L300 520 H40 Q10 380 0 140Z" fill="url(#skin)" />
      <path d="M0 140 Q-20 170 10 210 Q60 205 90 170Z" fill="#8d5330" />
    </svg>
  );
}

/** Scene 3 – phone preview of the invitation. Desktop: mock-up in hand. Mobile: native full-screen composition. */
export default function ScenePhone() {
  const root = useRef<HTMLElement>(null);
  const desktop = useMedia('(min-width: 768px)');

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.ph-caption', { opacity: 0, y: 30 });
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=260%', scrub: 0.8, pin: '.pin-stage', anticipatePin: 1 },
        });
        if (desktop) {
          gsap.set('.ph-device', { yPercent: 110, rotation: 14, scale: 0.9 });
          tl.to('.ph-device', { yPercent: 0, rotation: -6, scale: 1, duration: 0.35, ease: 'power2.out' }, 0)
            .to('.ph-caption', { opacity: 1, y: 0, duration: 0.2 }, 0.2)
            .to('.ph-device', { rotation: 4, yPercent: -3, duration: 0.55 }, 0.4)
            .to('.ph-scroll', { yPercent: -62, duration: 0.55 }, 0.4)
            .to('.ph-stage', { opacity: 0, duration: 0.1 }, 0.92);
        } else {
          gsap.set('.ph-full', { yPercent: 100 });
          tl.to('.ph-full', { yPercent: 0, duration: 0.3, ease: 'power2.out' }, 0)
            .to('.ph-scroll', { yPercent: -58, duration: 0.7 }, 0.25);
        }
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [desktop] },
  );

  return (
    <section id="scene-03" ref={root} className="scene bg-[#e59a55]">
      <div className="pin-stage">
        <div className="absolute inset-0 bg-gradient-to-b from-[#e59a55] via-[#c9885c] to-[#8a8f8c]" />
        {desktop ? (
          <div className="ph-stage absolute inset-0 flex items-end justify-center pb-[4vh]">
            <p className="ph-caption absolute top-[5%] font-display text-2xl md:text-4xl text-midnight text-center px-6">This is how our guests<br />will open the invitation</p>
            <div className="ph-device relative h-[70vh] aspect-[9/19] will-change-transform">
              <div className="absolute inset-0 rounded-[3.2rem] bg-gradient-to-br from-[#d4d6d8] via-[#6b6e72] to-[#bfc2c5] p-[7px] shadow-[0_40px_80px_rgba(0,0,0,.45)]">
                <div className="relative h-full w-full rounded-[2.8rem] bg-black p-[6px] overflow-hidden">
                  <div className="relative h-full w-full rounded-[2.4rem] overflow-hidden emerald-paper grain">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[30%] h-6 bg-black rounded-full z-10" />
                    <div className="ph-scroll px-6 pt-14 pb-24 will-change-transform"><InviteCopy compact /></div>
                  </div>
                </div>
              </div>
              <Hand />
            </div>
          </div>
        ) : (
          <div className="ph-full absolute inset-0 emerald-paper grain overflow-hidden">
            <div className="ph-scroll px-7 pt-20 pb-24 will-change-transform"><InviteCopy /></div>
          </div>
        )}
      </div>
    </section>
  );
}
