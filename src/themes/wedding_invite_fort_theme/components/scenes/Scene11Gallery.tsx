import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import weddingData from '../../data/weddingData';
import Reveal from '../ui/Reveal';

/** Scene 11 – filterable gallery from weddingData.gallery (category filter, lightbox). */
export default function SceneGallery() {
  const { gallery } = weddingData;
  const cats = useMemo(() => ['All', ...Array.from(new Set(gallery.map((g) => g.category)))], [gallery]);
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState<number | null>(null);
  const items = gallery.filter((g) => cat === 'All' || g.category === cat);

  return (
    <section id="scene-11" className="scene bg-[#faf3e0] py-24 md:py-36 px-5 text-midnight">
      <Reveal><h2 className="text-center font-display text-4xl md:text-7xl">Moments</h2></Reveal>
      {gallery.length === 0 ? (
        <div className="max-w-5xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Engagement', 'Pre-wedding', 'Portraits', 'Family'].map((l, i) => (
            <Reveal key={l} delay={i * 0.08}>
              <div className={`grid place-items-center text-center text-[0.65rem] tracking-[0.35em] uppercase text-midnight/40 border border-antique-gold/40 bg-white/40 ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>{l}<br />photos soon</div>
            </Reveal>
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`min-h-11 px-5 text-xs tracking-[0.3em] uppercase border ${cat === c ? 'bg-midnight text-ivory border-midnight' : 'border-midnight/30'}`}>{c}</button>
            ))}
          </div>
          <motion.div layout className="max-w-6xl mx-auto mt-10 columns-2 md:columns-3 gap-3 [&>*]:mb-3">
            {items.map((g, i) => (
              <motion.button layout key={g.src} onClick={() => setOpen(i)} className="block w-full overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <img src={g.src} alt={g.alt} loading="lazy" decoding="async" className="w-full hover:scale-105 transition-transform duration-700" />
              </motion.button>
            ))}
          </motion.div>
          <AnimatePresence>
            {open !== null && items[open] && (
              <motion.div className="fixed inset-0 z-[60] bg-black/90 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
                <img src={items[open].src} alt={items[open].alt} className="max-h-[90svh] max-w-full object-contain" />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}
