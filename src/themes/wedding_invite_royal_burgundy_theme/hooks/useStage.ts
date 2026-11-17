import { type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

export interface Approach { trigger: Element | null; start: string; end: string; scrub: number }
interface Opts { end?: string; pin?: boolean; scrub?: number; /** runs before the pin: scroll vars covering the approach (section top 85% -> top) */ entrance?: (approach: Approach) => void }

/**
 * Scroll-driven stage: builds one scrubbed (optionally pinned) timeline for a scene and a depth-parallax pass for every
 * `[data-depth]` layer. Skipped (content stays visible, static) under prefers-reduced-motion. Reverts on unmount.
 */
export function useStage(root: RefObject<HTMLElement | null>, build: (tl: gsap.core.Timeline) => void, { end = '+=170%', pin = true, scrub = 0.7, entrance }: Opts = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end, scrub, ...(pin ? { pin: '.rb-stage', anticipatePin: 1 } : {}) },
        });
        build(tl);
        entrance?.({ trigger: root.current, start: 'top 85%', end: 'top top', scrub: 0.7 });
        gsap.utils.toArray<HTMLElement>('[data-depth]', root.current).forEach((el) => {
          const d = Number(el.dataset.depth);
          gsap.fromTo(el, { yPercent: d * 5 }, { yPercent: -d * 5, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
}
