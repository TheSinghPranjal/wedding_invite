import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import weddingData from '../../../../data/weddingData';
import { brandDate } from '../../lib/dates';
import { music } from '../../lib/music';
import Stars from '../art/Stars';
import { Corner, Divider } from '../art/Ornament';

/** Envelope-style opening screen. The tap is the user gesture that lets music start. */
export default function IntroOverlay({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const { bride, groom } = weddingData;
  const go = (withMusic: boolean) => {
    setOpen(true);
    if (withMusic) void music.play();
    onOpen();
  };
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-midnight text-ivory grid place-items-center px-6"
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Stars count={80} seed={5} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(201,168,76,.18),transparent_60%)]" />
          <motion.div
            className="relative w-full max-w-md border border-gold/60 px-8 py-12 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {[0, 1, 2, 3].map((i) => (
              <Corner key={i} className="absolute text-gold" style={{ top: i < 2 ? 4 : undefined, bottom: i >= 2 ? 4 : undefined, left: i % 2 === 0 ? 4 : undefined, right: i % 2 ? 4 : undefined, transform: `rotate(${[0, 90, 270, 180][i]}deg)`, width: 40, height: 40 }} />
            ))}
            <p className="text-[0.65rem] tracking-[0.5em] uppercase text-gold">You are invited to the wedding of</p>
            <h1 className="font-display text-4xl md:text-5xl mt-5 leading-tight">{bride.firstName} <span className="font-script text-gold">&amp;</span> {groom.firstName}</h1>
            <Divider className="text-gold my-5" />
            <p className="tracking-[0.4em] text-sm text-ivory/85">{brandDate()}</p>
            <button id="open-invite" onClick={() => go(true)} className="mt-9 w-full min-h-12 bg-gold text-midnight tracking-[0.35em] uppercase text-xs hover:bg-bright-gold transition-colors">
              Open invitation
            </button>
            <button onClick={() => go(false)} className="mt-3 text-[0.65rem] tracking-[0.3em] uppercase text-ivory/55 hover:text-ivory min-h-11">
              Open without music
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
