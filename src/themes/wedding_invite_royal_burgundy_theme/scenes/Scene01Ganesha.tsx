import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { useStage } from '../hooks/useStage';
import { MandalaDecoration } from '../art/Mandala';
import { Ganesha, Lantern, ScrollCorner } from '../art/Ornaments';
import { GoldDust } from '../art/Particles';
import GoldBorder from '../art/GoldBorder';

const corner = (i: number): React.CSSProperties => ({ position: 'absolute', width: 'clamp(90px,19vw,190px)', zIndex: 4, top: i < 2 ? 18 : undefined, bottom: i >= 2 ? 18 : undefined, left: i % 2 === 0 ? 18 : undefined, right: i % 2 ? 18 : undefined, transform: `scale(${i % 2 ? -1 : 1}, ${i >= 2 ? -1 : 1})` });

/** Scene 01 - sacred Ganesha opening. Timed intro sequence after the card is opened, then a scroll-driven mandala burst into scene 02. */
export default function SceneGanesha({ opened }: { opened: boolean }) {
  const root = useRef<HTMLElement>(null);
  const { blessings } = weddingData;

  useGSAP(
    () => {
      if (!opened) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.timeline({ defaults: { ease: 'power2.out' } })
          .fromTo('.g-bg', { opacity: 0 }, { opacity: 1, duration: 1 })
          .fromTo('.g-border .rb-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.4, ease: 'power1.inOut', stagger: 0.25 }, 0.3)
          .fromTo('.g-corner', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.2, stagger: 0.15 }, 0.9)
          .fromTo('.rb-fx', { opacity: 0 }, { opacity: 1, duration: 1.6 }, 1)
          .fromTo('.g-glow', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.8 }, 1.4)
          .fromTo('.g-ganesha', { opacity: 0, filter: 'blur(14px) brightness(2.2)', scale: 0.92 }, { opacity: 1, filter: 'blur(0px) brightness(1)', scale: 1, duration: 2.2 }, 1.6)
          .fromTo('.g-mandala', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 2.2 }, 1.8)
          .fromTo('.g-lantern', { opacity: 0, y: -140 }, { opacity: 1, y: 0, duration: 1.6, stagger: 0.25, ease: 'power3.out' }, 2)
          .fromTo('.g-word', { opacity: 0, y: 26, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.16 }, 3.1)
          .fromTo('.g-hint', { opacity: 0 }, { opacity: 0.8, duration: 1 }, 4.2);
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [opened] },
  );

  // scroll: ganesha recedes while a golden mandala expands over the stage into scene 02
  useStage(root, (tl) => {
    tl.to('.g-wrap', { scale: 1.18, opacity: 0, duration: 0.7 }, 0.1)
      .to('.g-text', { opacity: 0, y: -40, duration: 0.4 }, 0.05)
      .fromTo('.g-burst', { scale: 0.15, opacity: 0, rotation: 0 }, { scale: 9, opacity: 1, rotation: 60, duration: 0.8, ease: 'power1.in' }, 0.1)
      .to('.g-burst', { opacity: 0, duration: 0.25 }, 0.8);
  }, { end: '+=130%' });

  const words = (s: string) => s.split(' ').map((w, i) => <span key={i} className="rb-word g-word g-anim">{w}&nbsp;</span>);
  return (
    <section id="rb-scene-01" ref={root} className={`rb-scene${opened ? '' : ' is-pre'}`}>
      <div className="rb-stage rb-rose-bg">
        <div className="rb-fill g-bg g-anim" />
        <div className="rb-vignette" />
        <div className="g-border" style={{ position: 'absolute', inset: 0, zIndex: 3 }}><GoldBorder inset={12} /></div>
        {[0, 1, 2, 3].map((i) => <ScrollCorner key={i} className="g-corner g-anim" style={corner(i)} />)}
        <GoldDust count={44} seed={31} />
        <div className="g-anim g-mandala" style={{ position: 'absolute', left: '50%', top: 0, width: 'min(80vw,600px)', transform: 'translate(-50%,-66%)', color: '#D5AD55', opacity: 0.32, zIndex: 1 }}><MandalaDecoration speed={0.7} /></div>
        <div className="g-anim g-mandala" style={{ position: 'absolute', left: '50%', bottom: 0, width: 'min(86vw,660px)', transform: 'translate(-50%,62%)', color: '#D5AD55', opacity: 0.5, zIndex: 1 }}><MandalaDecoration speed={0.7} /></div>
        <div className="g-lantern g-anim" style={{ position: 'absolute', left: 'clamp(14px,8vw,110px)', top: 0, width: 'clamp(40px,8vw,70px)', zIndex: 3 }}><Lantern chain={230} className="rb-swing" /></div>
        <div className="g-lantern g-anim" style={{ position: 'absolute', right: 'clamp(14px,8vw,110px)', top: 0, width: 'clamp(40px,8vw,70px)', zIndex: 3 }}><Lantern chain={110} className="rb-swing" /></div>
        <div className="rb-content" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 1.5rem 14svh' }}>
          <div className="g-wrap" style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
            <div className="g-glow g-anim" style={{ position: 'absolute', width: 'min(110vw,640px)', aspectRatio: '1', background: 'radial-gradient(circle, rgba(241,213,139,.45), rgba(213,173,85,.12) 40%, transparent 68%)' }} />
            <Ganesha className="g-ganesha g-anim" style={{ position: 'relative', width: 'min(52vw,300px,38svh)', filter: 'drop-shadow(0 0 22px rgba(241,213,139,.45))' }} />
          </div>
          <div className="g-text rb-center" style={{ marginTop: 'clamp(1rem,3svh,2rem)' }}>
            <p className="rb-hi rb-gold-text" lang="sa" style={{ fontSize: 'clamp(1.6rem,6vw,3rem)', lineHeight: 1.4 }}>{words(blessings.line1)}</p>
            <p className="rb-script g-word g-anim" style={{ fontSize: 'clamp(1.5rem,4.6vw,2.6rem)', color: '#F1D58B', marginTop: '.3rem' }}>Om Shree Ganeshay Namah</p>
          </div>
        </div>
        <p className="g-hint g-anim rb-cap rb-center" style={{ position: 'absolute', bottom: '3.2svh', left: 0, right: 0, zIndex: 5, fontSize: '.62rem', color: '#F1D58B' }}>Scroll to begin</p>
        <div className="g-burst" style={{ position: 'absolute', left: '50%', top: '50%', width: '50vmin', margin: '-25vmin 0 0 -25vmin', color: '#F1D58B', opacity: 0, zIndex: 6, pointerEvents: 'none' }}><MandalaDecoration speed={2} /></div>
      </div>
    </section>
  );
}
