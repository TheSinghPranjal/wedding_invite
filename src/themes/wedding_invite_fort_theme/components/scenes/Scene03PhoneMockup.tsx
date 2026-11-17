import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { useMedia } from '../../hooks/useMedia';
import InviteCopy from '../ui/InviteCopy';
import { Divider } from '../art/Ornament';

/** Scene 3 – the invitation as guests receive it. Desktop: floating phone, scroll-driven tilt and inner scroll. Mobile: native full-screen card. */
export default function ScenePhone() {
  const root = useRef<HTMLElement>(null);
  const desktop = useMedia('(min-width: 768px)');

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=240%', scrub: 0.8, pin: '.pin-stage', anticipatePin: 1 },
        });
        if (!desktop) return;
        {
          gsap.set('.ph-device', { yPercent: 90, rotationX: 28, rotationZ: 10, scale: 0.85, transformPerspective: 1400 });
          gsap.set('.ph-caption', { opacity: 0, y: 30 });
          tl.to('.ph-device', { yPercent: 0, rotationX: 0, rotationZ: -4, scale: 1, duration: 0.32, ease: 'power2.out' }, 0)
            .to('.ph-caption', { opacity: 1, y: 0, duration: 0.15 }, 0.15)
            .to('.ph-device', { rotationZ: 3, rotationY: -8, duration: 0.6 }, 0.35)
            .to('.ph-scroll', { yPercent: -62, duration: 0.6 }, 0.35)
            .to('.ph-shadow', { scaleX: 1.15, opacity: 0.5, duration: 0.6 }, 0.35);
        }
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [desktop] },
  );

  if (!desktop) {
    return (
      <section id="scene-03" ref={root} className="scene bg-gradient-to-b from-[#f0a85a] via-[#9c7a5e] to-[#2b6a5c] py-24 px-6 text-center text-midnight">
        <div className="absolute inset-0 paisley opacity-[.12]" />
        <p className="relative text-xs tracking-[0.5em] uppercase">Your invitation</p>
        <p className="relative font-display text-3xl mt-3 text-ivory drop-shadow">With love, from both our families</p>
        <Divider className="relative text-gold mt-5 !w-28" />
      </section>
    );
  }

  return (
    <section id="scene-03" ref={root} className="scene bg-[#f0a85a]">
      <div className="pin-stage">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0a85a] via-[#9c7a5e] to-[#2b6a5c]" />
        <div className="absolute inset-0 paisley opacity-[.12]" />
        {(
          <div className="ph-stage absolute inset-0 flex items-end justify-center pb-[5vh]" style={{ perspective: 1400 }}>
            <div className="ph-caption absolute top-[6%] text-center px-6 text-midnight">
              <p className="text-xs tracking-[0.5em] uppercase">Your invitation</p>
              <p className="font-display text-3xl md:text-4xl mt-2">This is how it arrives</p>
              <Divider className="text-midnight/70 mt-3 !w-28" />
            </div>
            <div className="ph-shadow absolute bottom-[3vh] left-1/2 -translate-x-1/2 w-[34vh] h-10 rounded-[100%] bg-black/40 blur-2xl opacity-70" />
            <div className="ph-device relative h-[70vh] aspect-[9/19] will-change-transform">
              <div className="absolute inset-0 rounded-[3.2rem] bg-gradient-to-br from-[#e8e4d8] via-[#8a8378] to-[#d8d2c4] p-[7px] shadow-[0_50px_90px_rgba(0,0,0,.5)]">
                <div className="relative h-full w-full rounded-[2.8rem] bg-black p-[6px] overflow-hidden">
                  <div className="relative h-full w-full rounded-[2.4rem] overflow-hidden emerald-paper grain">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[30%] h-6 bg-black rounded-full z-10" />
                    <div className="ph-scroll px-6 pt-14 pb-24 will-change-transform"><InviteCopy compact /></div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-px rounded-[3.3rem] pointer-events-none bg-gradient-to-tr from-white/0 via-white/25 to-white/0" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
