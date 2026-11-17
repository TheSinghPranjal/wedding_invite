import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const st = ScrollTrigger.create({ start: 0, end: () => ScrollTrigger.maxScroll(window), onUpdate: (s) => gsap.set(bar.current, { scaleX: s.progress }) });
    return () => st.kill();
  }, []);
  return <div ref={bar} className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left scale-x-0 bg-gradient-to-r from-antique-gold via-bright-gold to-antique-gold" aria-hidden="true" />;
}
