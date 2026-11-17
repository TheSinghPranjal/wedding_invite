import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import weddingData from '../../data/weddingData';
import { brandDate } from '../../lib/dates';
import { Corner, Divider, Mandala } from '../art/Ornament';
import Reveal from '../ui/Reveal';

/** Scene 4 – full emerald invitation page with ornamental border; staggered text reveals. */
export default function SceneInvitation() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom, blessings } = weddingData;
  const fam = (f: typeof bride.family) => f.map((m) => `${m.relation} ${m.name}`.trim());
  const sides = [fam(bride.family), fam(groom.family)].filter((s) => s.length);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // paper rises in over the preceding scene, border draws in
        gsap.from('.inv-frame', { clipPath: 'inset(12% 12% 12% 12%)', opacity: 0.4, scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'top 20%', scrub: true } });
        gsap.to('.inv-mandala', { rotation: 90, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="scene-04" ref={root} className="scene emerald-paper grain py-24 md:py-40 px-5">
      <div className="inv-frame relative max-w-3xl mx-auto border border-gold/60 p-8 md:p-16 text-center text-ivory" style={{ clipPath: 'inset(0)' }}>
        <div className="absolute inset-2 border border-gold/30 pointer-events-none" />
        {[0, 1, 2, 3].map((i) => (
          <Corner key={i} className="absolute text-gold" style={{ top: i < 2 ? 6 : undefined, bottom: i >= 2 ? 6 : undefined, left: i % 2 === 0 ? 6 : undefined, right: i % 2 ? 6 : undefined, transform: `rotate(${[0, 90, 270, 180][i]}deg)` }} />
        ))}
        <Reveal><Mandala size={150} glyph="ॐ" className="inv-mandala text-gold mx-auto" /></Reveal>
        <Reveal delay={0.1}><p className="font-hindi text-2xl md:text-4xl gold-text mt-6">{blessings.line1}</p></Reveal>
        <Reveal delay={0.2}><p className="italic text-lg md:text-2xl text-ivory/90 mt-4">{blessings.line2}</p></Reveal>
        {sides.map((lines, i) => (
          <Reveal key={i} delay={0.1} className="mt-6">
            {i > 0 && <p className="italic text-gold text-xl mb-4">and</p>}
            {lines.map((l) => <p key={l} className="text-lg md:text-2xl">{l}</p>)}
          </Reveal>
        ))}
        <Reveal><Divider className="text-gold my-10" /></Reveal>
        <Reveal><p className="tracking-[0.35em] text-xs md:text-sm text-gold uppercase">Request the pleasure of your company</p></Reveal>
        <Reveal delay={0.1}><p className="tracking-[0.35em] text-xs md:text-sm text-ivory/80 uppercase mt-3">as we celebrate the wedding of</p></Reveal>
        <Reveal delay={0.15}><h2 className="font-display text-6xl md:text-8xl mt-8 leading-none">{bride.firstName}</h2></Reveal>
        <Reveal delay={0.2}><p className="font-script text-gold text-5xl md:text-6xl my-1">&amp;</p></Reveal>
        <Reveal delay={0.25}><h2 className="font-display text-6xl md:text-8xl leading-none">{groom.firstName}</h2></Reveal>
        <Reveal delay={0.3}><p className="tracking-[0.5em] text-gold mt-10 text-sm md:text-lg">{brandDate()}</p></Reveal>
      </div>
    </section>
  );
}
