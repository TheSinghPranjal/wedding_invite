import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import weddingData from '../../data/weddingData';
import Lantern from '../art/Lantern';

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

/** Scene 2 – rich-blue sky, floating lanterns (each independent), progressive name reveal. */
export default function SceneLanterns() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;

  const lanterns = useMemo(() => {
    const r = rng(42);
    return Array.from({ length: 22 }, (_, i) => {
      const depth = r(); // 0 far .. 1 near
      return {
        id: i,
        x: r() * 100,
        size: 26 + depth * depth * 120,
        blur: depth > 0.85 ? 3 : depth < 0.2 ? 1.5 : 0,
        speed: 0.7 + depth * 1.1,
        offset: r(),
        rot: (r() - 0.5) * 24,
        phase: r() * 3,
        opacity: 0.75 + depth * 0.25,
      };
    });
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(['.n-first', '.n-weds', '.n-second'], { opacity: 0, y: 40, filter: 'blur(14px)' });
        gsap.set('.n-dome', { yPercent: 105 });
        gsap.utils.toArray<HTMLElement>('.lantern').forEach((el) => gsap.set(el, { y: () => window.innerHeight * (1.05 + Number(el.dataset.offset) * 1.1) }));

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=320%', scrub: 0.8, pin: '.pin-stage', anticipatePin: 1, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>('.lantern').forEach((el) => {
          const sp = Number(el.dataset.speed);
          tl.to(el, { y: () => -window.innerHeight * (0.25 + sp * 0.2) - el.offsetHeight, duration: 1 }, 0);
          // independent ambient sway (not scroll bound)
          gsap.to(el, { x: gsap.utils.random(-22, 22), rotation: `+=${gsap.utils.random(-8, 8)}`, duration: gsap.utils.random(2.4, 4.6), yoyo: true, repeat: -1, ease: 'sine.inOut', delay: Number(el.dataset.phase) });
        });
        const reveal = { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.12, ease: 'power2.out' };
        tl.to('.n-first', reveal, 0.14)
          .to('.n-weds', { ...reveal, duration: 0.08 }, 0.3)
          .to('.n-second', reveal, 0.4)
          .to('.n-dome', { yPercent: 0, duration: 0.3, ease: 'power1.out' }, 0.7)
          .to('.n-names', { yPercent: -26, scale: 0.92, opacity: 0, duration: 0.25 }, 0.78);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="scene-02" ref={root} className="scene bg-[#3f78c4]">
      <div className="pin-stage">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3f78c4] via-[#2f66b4] to-[#e59a55]" />
        <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(100deg,transparent_0_38px,rgba(255,255,255,.12)_40px,transparent_44px)]" />
        {lanterns.map((l) => (
          <div key={l.id} className="lantern absolute top-0 will-change-transform" data-speed={l.speed} data-offset={l.offset} data-phase={l.phase} style={{ left: `${l.x}%`, opacity: l.opacity, zIndex: l.size > 90 ? 30 : 5 }}>
            <Lantern size={l.size} blur={l.blur} style={{ transform: `rotate(${l.rot}deg)` }} />
          </div>
        ))}
        <div className="n-names absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 text-ivory pointer-events-none">
          <h2 className="n-first font-display text-[3.2rem] sm:text-7xl md:text-[8rem] leading-none tracking-[0.04em] drop-shadow-[0_6px_24px_rgba(10,30,80,.55)]">{bride.firstName.toUpperCase()}</h2>
          <p className="n-weds my-3 md:my-5 text-sm md:text-xl tracking-[0.9em] pl-[0.9em] text-ivory/90">WEDS</p>
          <h2 className="n-second font-display text-[3.2rem] sm:text-7xl md:text-[8rem] leading-none tracking-[0.04em] drop-shadow-[0_6px_24px_rgba(10,30,80,.55)]">{groom.firstName.toUpperCase()}</h2>
        </div>
        <svg className="n-dome absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] max-w-[620px] z-[6]" viewBox="0 0 400 300" aria-hidden="true">
          <defs>
            <linearGradient id="dm" x1="0" x2="1"><stop offset="0" stopColor="#d9c08a" /><stop offset=".5" stopColor="#fbf0cf" /><stop offset="1" stopColor="#c9a96a" /></linearGradient>
          </defs>
          <rect x="196" y="0" width="8" height="40" fill="#a2561f" />
          <ellipse cx="200" cy="40" rx="9" ry="12" fill="#c8742a" />
          <path d="M80 220 Q80 80 200 56 Q320 80 320 220Z" fill="url(#dm)" />
          <rect x="60" y="214" width="280" height="22" fill="#a2561f" />
          <rect x="70" y="236" width="260" height="64" fill="#f3e4b6" />
          <path d="M165 300 V262 Q200 236 235 262 V300Z" fill="#7b4a22" />
        </svg>
      </div>
    </section>
  );
}
