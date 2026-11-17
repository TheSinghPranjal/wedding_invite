import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import weddingData from '../../data/weddingData';
import Reveal from '../ui/Reveal';
import Portrait from '../ui/Portrait';

/** Scene 10 – vertical timeline driven by weddingData.story */
export default function SceneLoveStory() {
  const root = useRef<HTMLElement>(null);
  const { story } = weddingData;
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.st-line', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '.st-list', start: 'top 70%', end: 'bottom 60%', scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section id="scene-10" ref={root} className="scene bg-gradient-to-b from-[#e8bdd0] via-[#f3e3dc] to-[#faf3e0] py-24 md:py-40 px-6 text-midnight">
      <Reveal><h2 className="text-center font-display text-5xl md:text-8xl">OUR STORY</h2></Reveal>
      {story.length === 0 ? (
        <Reveal delay={0.2}><p className="text-center italic mt-10 text-midnight/60 text-lg">Our story is being written…</p></Reveal>
      ) : (
        <div className="st-list relative max-w-4xl mx-auto mt-20">
          <div className="st-line absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-antique-gold/70" />
          {story.map((m, i) => (
            <div key={m.title + i} className={`relative grid md:grid-cols-2 gap-6 md:gap-16 mb-20 pl-10 md:pl-0 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <span className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 rounded-full bg-antique-gold ring-4 ring-[#f3e3dc]" />
              <div className={i % 2 ? 'md:text-left' : 'md:text-right'}>
                {m.date && <Reveal><p className="text-xs tracking-[0.4em] uppercase text-antique-gold">{m.date}</p></Reveal>}
                <Reveal delay={0.1}><h3 className="font-display text-3xl md:text-4xl mt-2">{m.title}</h3></Reveal>
                <Reveal delay={0.2}><p className="mt-3 text-lg leading-relaxed text-midnight/80">{m.description}</p></Reveal>
              </div>
              <div>{m.image && <Portrait src={m.image} alt={m.title} label={m.title} aspect="aspect-[4/3]" />}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
