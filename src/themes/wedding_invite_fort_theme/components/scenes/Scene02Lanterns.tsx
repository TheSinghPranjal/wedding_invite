import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import weddingData from '../../../../data/weddingData';
import { useMedia } from '../../hooks/useMedia';
import Lantern from '../art/Lantern';
import Palace from '../art/Palace';
import Stars from '../art/Stars';

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

/** Scene 2 – lantern sky. Names reveal immediately on pin; the lanterns drift up through the whole scene; the palace rises back at the end. */
export default function SceneLanterns() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  const desktop = useMedia('(min-width: 768px)');

  const lanterns = useMemo(() => {
    const r = rng(42);
    return Array.from({ length: desktop ? 28 : 16 }, (_, i) => {
      const depth = r();
      return {
        id: i,
        x: 2 + r() * 92,
        size: 24 + depth * depth * 120,
        blur: depth > 0.86 ? 3 : depth < 0.18 ? 1.5 : 0,
        speed: 0.6 + depth * 1.2,
        rot: (r() - 0.5) * 22,
        offset: r(),
        phase: r() * 3,
        opacity: 0.8 + depth * 0.2,
      };
    });
  }, [desktop]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(['.n-first', '.n-weds', '.n-second'], { opacity: 0, y: 40, filter: 'blur(14px)' });
        gsap.set('.n-palace', { yPercent: 100 });
        gsap.set('.n-rule', { scaleX: 0 });
        gsap.utils.toArray<HTMLElement>('.lantern').forEach((el) =>
          gsap.set(el, { y: () => window.innerHeight * (0.1 + Number(el.dataset.offset) * 2.1) }),
        );

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=260%', scrub: 0.8, pin: '.pin-stage', anticipatePin: 1, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>('.lantern').forEach((el) => {
          const sp = Number(el.dataset.speed);
          tl.to(el, { y: () => -window.innerHeight * (0.3 + sp * 0.3) - el.offsetHeight, duration: 1 }, 0);
          gsap.to(el, { x: gsap.utils.random(-24, 24), rotation: `+=${gsap.utils.random(-7, 7)}`, duration: gsap.utils.random(2.6, 4.8), yoyo: true, repeat: -1, ease: 'sine.inOut', delay: Number(el.dataset.phase) });
        });
        const reveal = { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.1, ease: 'power2.out' };
        tl.to('.n-first', reveal, 0.02)
          .to('.n-rule', { scaleX: 1, duration: 0.08 }, 0.08)
          .to('.n-weds', { ...reveal, duration: 0.07 }, 0.1)
          .to('.n-second', reveal, 0.15)
          .to('.n-sunset', { opacity: 1, duration: 0.3 }, 0.55)
          .to('.n-names', { yPercent: -30, scale: 0.9, opacity: 0, duration: 0.2 }, 0.72)
          .to('.n-palace', { yPercent: 0, duration: 0.3, ease: 'power1.out' }, 0.7);
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [desktop] },
  );

  const Name = ({ cls, text }: { cls: string; text: string }) => (
    <h2 className={`${cls} font-display text-[3rem] sm:text-7xl md:text-[7.5rem] leading-none tracking-[0.05em] drop-shadow-[0_6px_28px_rgba(10,30,80,.6)]`}>{text}</h2>
  );

  return (
    <section id="scene-02" ref={root} className="scene bg-[#2b5fae]">
      <div className="pin-stage">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b5fae] via-[#3a74c2] to-[#8ea2cf]" />
        <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(100deg,transparent_0_38px,rgba(255,255,255,.14)_40px,transparent_44px)]" />
        <div className="absolute inset-x-0 top-0 h-1/2 opacity-60"><Stars count={50} seed={9} /></div>
        <div className="n-sunset absolute inset-0 opacity-0 bg-gradient-to-b from-[#2b5fae]/0 via-[#c97b5a]/40 to-[#f0a85a]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,200,120,.5),transparent_70%)]" />
        {lanterns.map((l) => (
          <div key={l.id} className="lantern absolute top-0 will-change-transform" data-speed={l.speed} data-offset={l.offset} data-phase={l.phase} style={{ left: `${l.x}%`, opacity: l.opacity, zIndex: l.size > 90 ? 30 : 5 }}>
            <Lantern size={l.size} blur={l.blur} flickerDelay={l.phase} style={{ transform: `rotate(${l.rot}deg)` }} />
          </div>
        ))}
        <div className="n-names absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 text-ivory pointer-events-none">
          <Name cls="n-first" text={bride.firstName.toUpperCase()} />
          <div className="flex items-center gap-4 my-3 md:my-5">
            <span className="n-rule block h-px w-12 md:w-24 bg-gold origin-right" />
            <p className="n-weds text-sm md:text-xl tracking-[0.9em] pl-[0.9em] text-gold">WEDS</p>
            <span className="n-rule block h-px w-12 md:w-24 bg-gold origin-left" />
          </div>
          <Name cls="n-second" text={groom.firstName.toUpperCase()} />
        </div>
        <div className="n-palace absolute inset-x-0 bottom-0 h-[62%] z-[6] will-change-transform">
          <Palace className="absolute inset-0 w-full h-full" position="50% 58%" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f0a85a] to-transparent" />
        </div>
      </div>
    </section>
  );
}
