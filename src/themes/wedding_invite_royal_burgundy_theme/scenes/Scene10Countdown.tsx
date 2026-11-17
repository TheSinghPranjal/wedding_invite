import { useRef } from 'react';
import weddingData from '../../../data/weddingData';
import { useStage } from '../hooks/useStage';
import { useCountdown } from '../hooks/useCountdown';
import { brandDate, getWeddingInstant } from '../lib/dates';
import { MandalaDecoration, SideOrnamentLayer } from '../art/Mandala';
import { Petals, GoldDust } from '../art/Particles';
import GoldBorder from '../art/GoldBorder';

const target = getWeddingInstant();

/** Scene 10 - live countdown (Asia/Kolkata) over a slowly rotating mandala. */
export default function SceneCountdown() {
  const root = useRef<HTMLElement>(null);
  const c = useCountdown(target);
  const { bride, groom, countdownNote } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.c-mandala', { scale: 0.6, opacity: 0, rotation: -30 }, { scale: 1.05, opacity: 1, rotation: 30, duration: 1 }, 0)
      .fromTo('.c-border .rb-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5 }, 0)
      .fromTo('.c-in', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.18, stagger: 0.08, ease: 'power2.out' }, 0.1);
  }, { end: '+=140%' });
  const cells: [string, number][] = [['Days', c.days], ['Hours', c.hours], ['Minutes', c.minutes], ['Seconds', c.seconds]];
  return (
    <section id="rb-scene-10" ref={root} className="rb-scene rb-grain">
      <div className="rb-stage rb-burg-bg">
        <SideOrnamentLayer />
        <div className="c-mandala" style={{ position: 'absolute', left: '50%', top: '50%', width: 'min(130vw,980px)', transform: 'translate(-50%,-50%)', color: '#D5AD55', opacity: 0.26 }}><MandalaDecoration speed={0.35} /></div>
        <div className="c-border" style={{ position: 'absolute', inset: 0, zIndex: 6 }}><GoldBorder /></div>
        <Petals count={14} seed={71} colors={['#C23A4A', '#E8408A', '#F59A1E']} />
        <GoldDust count={30} seed={72} />
        <div className="rb-content rb-center" style={{ position: 'absolute', inset: 0, display: 'grid', placeContent: 'center', gap: 'clamp(.6rem,2svh,1.2rem)', padding: '0 1rem' }}>
          <p className="c-in rb-eyebrow">The big day is approaching</p>
          <p className="c-in rb-names rb-gold-text" style={{ fontSize: 'clamp(2.6rem,10vw,6rem)' }}>{bride.firstName} &amp; {groom.firstName}</p>
          <p className="c-in rb-cap" style={{ color: '#F1D58B', fontSize: 'clamp(.8rem,2.4vw,1.2rem)' }}>{brandDate()}</p>
          <div className="c-in" role="timer" aria-label="Time remaining until the wedding" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(.5rem,3vw,2.4rem)', marginTop: 'clamp(.8rem,3svh,2rem)' }}>
            {cells.map(([label, v]) => (
              <div key={label} style={{ minWidth: 'clamp(3.6rem,17vw,7.5rem)', padding: 'clamp(.5rem,1.6vw,1rem) 0', border: '1px solid rgba(213,173,85,.55)', outline: '1px solid rgba(213,173,85,.2)', outlineOffset: -5, background: 'rgba(53,7,25,.45)' }}>
                <div className="rb-gold-text" style={{ fontFamily: 'Cinzel,serif', fontWeight: 600, fontVariantNumeric: 'tabular-nums', fontSize: 'clamp(1.9rem,8vw,4.4rem)', lineHeight: 1.05 }}>{String(v).padStart(2, '0')}</div>
                <div className="rb-cap" style={{ fontSize: 'clamp(.5rem,1.6vw,.72rem)', letterSpacing: '.3em', color: 'rgba(255,249,237,.8)' }}>{label}</div>
              </div>
            ))}
          </div>
          {c.isComplete && <p className="c-in rb-eyebrow">The celebrations have begun</p>}
          <p className="c-in" style={{ maxWidth: '30em', margin: '0 auto', fontStyle: 'italic', fontSize: 'clamp(.9rem,2.2vw,1.1rem)', color: 'rgba(255,249,237,.75)' }}>{countdownNote}</p>
        </div>
      </div>
    </section>
  );
}
