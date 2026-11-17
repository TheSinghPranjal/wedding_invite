import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { CircularOrnament } from '../art/Mandala';
import { Peony } from '../art/Flora';
import { Reveal, PhotoSlot } from '../ui/ui';

/** Scene 13 - botanical love story: vertical timeline with turning gold ornaments, plus optional gallery. */
export default function SceneStory() {
  const root = useRef<HTMLElement>(null);
  const { story, gallery, bride, groom } = weddingData;
  const [open, setOpen] = useState<number | null>(null);
  const items = story.length
    ? story
    : [{ date: '', title: 'Our story, soon', description: `The chapters of ${bride.firstName} and ${groom.firstName}'s journey will be told here.`, image: '' }];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.st-line', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: '50% 0', scrollTrigger: { trigger: '.st-list', start: 'top 70%', end: 'bottom 70%', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.st-node', root.current).forEach((n) => gsap.fromTo(n, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, ease: 'back.out(1.6)', scrollTrigger: { trigger: n, start: 'top 80%', end: 'top 60%', scrub: true } }));
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="rb-scene-13" ref={root} className="rb-scene rb-ivory-bg" style={{ padding: 'clamp(5rem,12svh,8rem) 1.2rem', minHeight: '100svh' }}>
      <div style={{ position: 'absolute', left: -30, top: -10, width: 'clamp(110px,22vw,200px)' }}><Peony /></div>
      <div style={{ position: 'absolute', right: -30, top: -10, width: 'clamp(110px,22vw,200px)', transform: 'scaleX(-1)' }}><Peony /></div>
      <div className="rb-content rb-center">
        <Reveal><p className="rb-eyebrow" style={{ color: '#8E1B2E' }}>How it began</p></Reveal>
        <Reveal delay={0.1}><h2 className="rb-title" style={{ color: '#650D25', fontSize: 'clamp(2rem,6vw,4rem)' }}>Our Love Story</h2></Reveal>
      </div>
      <div className="st-list rb-content" style={{ position: 'relative', maxWidth: 900, margin: 'clamp(2.5rem,6svh,4rem) auto 0' }}>
        <div className="st-line" style={{ position: 'absolute', left: 22, top: 0, bottom: 0, width: 2, background: 'linear-gradient(#D5AD55, #A5792C)' }} />
        {items.map((m, i) => (
          <div key={m.title + i} style={{ position: 'relative', paddingLeft: 70, paddingBottom: '3rem' }}>
            <div className="st-node" style={{ position: 'absolute', left: 0, top: 0, width: 46, height: 46, color: '#B68A2C', background: '#FFF9ED', borderRadius: '50%' }}><CircularOrnament variant="floral" speed={0.9} style={{ width: '100%', height: '100%' }} /></div>
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: m.image || !story.length ? 'repeat(auto-fit,minmax(min(100%,220px),1fr))' : '1fr', gap: '1.4rem', alignItems: 'center' }}>
                <div>
                  {m.date && <p className="rb-eyebrow" style={{ color: '#8E1B2E' }}>{m.date}</p>}
                  <h3 className="rb-script" style={{ fontSize: 'clamp(2.2rem,6vw,3.2rem)', color: '#650D25', lineHeight: 1.1 }}>{m.title}</h3>
                  <p className="rb-body" style={{ color: '#30231C', marginTop: '.4rem' }}>{m.description}</p>
                </div>
                {(m.image || !story.length) && <div style={{ width: 'min(60vw,220px)' }}><PhotoSlot src={m.image ?? ''} alt={m.title} label="Our moment" initial="♥" /></div>}
              </div>
            </Reveal>
          </div>
        ))}
      </div>
      {gallery.length > 0 && (
        <div className="rb-content" style={{ maxWidth: 1000, margin: '2rem auto 0', columnCount: 2, columnGap: 10 }}>
          {gallery.map((g, i) => <button key={g.src} onClick={() => setOpen(i)} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 0, border: 0, background: 'none', cursor: 'zoom-in' }}><img src={g.src} alt={g.alt} loading="lazy" decoding="async" style={{ width: '100%' }} /></button>)}
          <AnimatePresence>{open !== null && gallery[open] && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,.9)', display: 'grid', placeItems: 'center', padding: 16 }}>
              <img src={gallery[open].src} alt={gallery[open].alt} style={{ maxHeight: '90svh', maxWidth: '100%', objectFit: 'contain' }} />
            </motion.div>)}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
