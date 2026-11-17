import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

/** Image slot with mask reveal + parallax. Shows an elegant placeholder until a real photo path is supplied. */
export default function Portrait({ src, alt, label, aspect = 'aspect-[3/4]' }: { src: string; alt: string; label: string; aspect?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(ref.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'top 45%', scrub: true } });
        gsap.fromTo('.pt-img', { yPercent: -8, scale: 1.15 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={`relative overflow-hidden ${aspect} w-full`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" className="pt-img absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="pt-img absolute inset-0 grid place-items-center bg-gradient-to-br from-white/50 to-[#c98aa8]/50 border border-white/60 text-midnight/50 text-xs tracking-[0.4em] uppercase text-center p-4">
          {label}<br />photo
        </div>
      )}
    </div>
  );
}
