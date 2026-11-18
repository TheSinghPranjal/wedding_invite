import { useRef } from 'react';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { useStage } from '../hooks/useStage';
import { BotanicalOrbitSystem, BotanicalOrbit, GoldStar, Bloom, Leaf, type OrbitSpec } from '../art/Orbit';
import { FestiveCanopy, KalashDecoration, PalmTree, LotusBorder, Twinkles, IllustratedWeddingCouple } from '../art/Festive';
import { OrganicShapes, HangingFloralArrangement, HangingStars, ChampagneGlasses, WeddingElephant, FloralCorner, GeometricFrame } from '../art/Botanical';
import { Flourish, DateLine } from '../ui/ui';
import { dateParts, formatTime } from '../lib/dates';
import { A } from './common';

const botOrbits: OrbitSpec[] = [
  { side: 'left', kind: 'pink', size: 500, top: 46, crop: 0.66, dir: 1, rotate: 110, opacity: 0.5, parallax: 120 },
  { side: 'right', kind: 'leaf', size: 520, top: 64, crop: 0.66, dir: -1, rotate: 100, opacity: 0.5, parallax: 160 },
  { side: 'left', kind: 'starburst', size: 210, top: 90, crop: 0.5, dir: -1, rotate: 220, opacity: 0.4, parallax: 240, desktopOnly: true },
  { side: 'right', kind: 'medallion', size: 200, top: 10, crop: 0.5, dir: 1, rotate: 240, opacity: 0.4, parallax: 260, desktopOnly: true },
];

/** Scene 04 - cinematic bridge: the pink festive chapter is cut away by a growing floral circle revealing the sage botanical world. */
export function SceneTransition() {
  const root = useRef<HTMLElement>(null);
  useStage(root, (tl) => {
    const stage = root.current?.querySelector('.tg-stage') as HTMLElement;
    tl.to('.t-couple, .t-palm', { opacity: 0, duration: 0.3 }, 0)
      .to('.t-canopy', { yPercent: -100, duration: 0.5 }, 0.05).to('.t-lotus', { opacity: 0, duration: 0.3 }, 0.05)
      .to('.t-kalash', { scale: 0.6, opacity: 0.5, duration: 0.4 }, 0.1)
      .fromTo(stage, { '--r': '0vmax' }, { '--r': '150vmax', duration: 0.75, ease: 'power1.in' }, 0.25)
      .fromTo('.t-bot-board', { scale: 1.12 }, { scale: 1, duration: 0.75 }, 0.25)
      .fromTo('.t-flowers', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0.6);
  }, { end: '+=190%' });
  return (
    <section id="tg-scene-04" ref={root} className="tg-scene">
      <div className="tg-stage tg-fest">
        <div className="tg-board">
          <Twinkles count={10} seed={21} />
          <A className="t-palm" style={{ left: '-7cqw', bottom: '-4cqw', width: '46cqw', zIndex: 2 }}><PalmTree className="tg-fit" /></A>
          <A className="t-palm" style={{ right: '-7cqw', bottom: '-4cqw', width: '46cqw', zIndex: 2, transform: 'scaleX(-1)' }}><PalmTree className="tg-fit" /></A>
          <A className="t-canopy" style={{ top: 0, left: 0, width: '100%', zIndex: 4 }}><FestiveCanopy className="tg-fit" /></A>
          <A className="t-kalash tg-float" style={{ top: '27%', left: '50%', width: '17cqw', marginLeft: '-8.5cqw', zIndex: 3 }}><KalashDecoration /></A>
          <A className="t-couple" style={{ left: '50%', bottom: '9cqw', width: '70cqw', marginLeft: '-35cqw', zIndex: 3 }}><IllustratedWeddingCouple className="tg-fit-w" /></A>
          <A className="t-lotus" style={{ bottom: 0, left: 0, width: '100%', height: '8cqw', zIndex: 5 }}><LotusBorder className="tg-fit" /></A>
        </div>
        <div className="tr-bot tg-paper">
          <div className="tg-board t-bot-board" style={{ overflow: 'visible' }}>
            <OrganicShapes variant="dark" className="tg-fit" style={{ position: 'absolute', inset: 0 }} />
            <A className="t-flowers" style={{ top: 0, left: 0, width: '100%', zIndex: 3 }}><HangingFloralArrangement className="tg-fit" /></A>
            <HangingStars />
          </div>
        </div>
        <div className="tr-ring"><BotanicalOrbit kind="pink" style={{ width: '100%', height: '100%' }} /></div>
      </div>
    </section>
  );
}

/** Scene 05 - botanical background: floral ceiling, dropping gold strings and stars; an ivory wash opens into the Save the Date. */
export function SceneBotanicalIntro() {
  const root = useRef<HTMLElement>(null);
  useStage(root, (tl) => {
    tl.fromTo('.b-flowers', { scale: 0.92, opacity: 0.5, transformOrigin: '50% 0%' }, { scale: 1.02, opacity: 1, duration: 0.4 }, 0)
      .fromTo('.b-strings', { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.05)
      .fromTo('.b-shape', { y: 30 }, { y: -20, duration: 1 }, 0)
      .fromTo('.b-orn', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.08 }, 0.2)
      .fromTo('.b-glasses', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.35)
      .fromTo('.b-wash', { clipPath: 'circle(0% at 50% 62%)' }, { clipPath: 'circle(150% at 50% 62%)', duration: 0.4, ease: 'power1.in' }, 0.62);
  }, { end: '+=130%' });
  return (
    <section id="tg-scene-05" ref={root} className="tg-scene tg-paper">
      <div className="tg-stage" style={{ background: '#6F705A' }}>
        <BotanicalOrbitSystem specs={botOrbits} color="#D5AD55" />
        <div className="tg-board">
          <OrganicShapes variant="dark" className="b-shape tg-fit" style={{ position: 'absolute', inset: '-4% 0' }} />
          <A className="b-flowers" style={{ top: 0, left: 0, width: '100%', zIndex: 3 }}><HangingFloralArrangement className="tg-fit" /></A>
          <div className="b-strings"><HangingStars /></div>
          <A className="b-glasses" style={{ top: '27%', left: '50%', width: '26cqw', marginLeft: '-13cqw', zIndex: 3 }}><ChampagneGlasses className="tg-fit" /></A>
          <A className="b-orn" style={{ top: '46%', left: '15%', width: '10cqw', zIndex: 3 }}><svg viewBox="-24 -24 48 48"><GoldStar r={22} fill="url(#tgBronze)" /></svg></A>
          <A className="b-orn" style={{ top: '46%', right: '15%', width: '10cqw', zIndex: 3 }}><svg viewBox="-24 -24 48 48"><GoldStar r={22} fill="url(#tgBronze)" /></svg></A>
          <A className="b-orn tg-brown" style={{ top: '40%', left: 0, right: 0, zIndex: 3 }}><Flourish color="#8A5A34" /></A>
          <A className="b-orn tg-brown" style={{ top: '60%', left: 0, right: 0, zIndex: 3 }}><Flourish color="#8A5A34" /></A>
          <A className="b-wash" style={{ inset: 0, zIndex: 8, background: '#ECE6C3' }}>{null}</A>
        </div>
      </div>
    </section>
  );
}

const Elephants = ({ className = '' }: { className?: string }) => (
  <>
    <A className={`${className} tg-ele-l`} style={{ left: '-4cqw', bottom: '3cqw', width: '56cqw', zIndex: 4 }}><WeddingElephant className="tg-fit-w" /></A>
    <A className={`${className} tg-ele-r`} style={{ right: '-4cqw', bottom: '3cqw', width: '56cqw', zIndex: 4, transform: 'scaleX(-1)' }}><WeddingElephant className="tg-fit-w" /></A>
    <A style={{ left: '-6cqw', bottom: '-6cqw', width: '40cqw', zIndex: 5 }}><FloralCorner className="tg-fit-w" /></A>
    <A style={{ right: '-6cqw', bottom: '-6cqw', width: '40cqw', zIndex: 5, transform: 'scaleX(-1)' }}><FloralCorner className="tg-fit-w" /></A>
  </>
);

/** Scene 06 - Save the Date. */
export function SceneSaveTheDate() {
  const root = useRef<HTMLElement>(null);
  const { weddingDate, ceremonyTime, venue } = weddingData;
  const place = [venue.address, venue.city].filter(Boolean).join(', ');
  useStage(root, (tl) => {
    tl.fromTo('.s-flowers', { y: -60, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.25 }, 0)
      .fromTo('.s-glass-l', { rotation: -30, x: -18, transformOrigin: '90% 100%' }, { rotation: 0, x: 0, duration: 0.3, ease: 'power2.in' }, 0.05)
      .fromTo('.s-glass-r', { rotation: 30, x: 18, transformOrigin: '10% 100%' }, { rotation: 0, x: 0, duration: 0.3, ease: 'power2.in' }, 0.05)
      .fromTo('.s-line', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.12, stagger: 0.07 }, 0.2)
      .fromTo('.tg-ele-l', { x: '-110%' }, { x: '0%', duration: 0.45, ease: 'power2.out' }, 0.3)
      .fromTo('.tg-ele-r', { x: '110%' }, { x: '0%', duration: 0.45, ease: 'power2.out' }, 0.3);
    gsap.set('.s-glass-l, .s-glass-r', { transformBox: 'view-box' });
  }, { end: '+=150%' });
  return (
    <section id="tg-scene-06" ref={root} className="tg-scene tg-paper">
      <div className="tg-stage" style={{ background: '#ECE6C3' }}>
        <BotanicalOrbitSystem specs={botOrbits} color="#B9905A" />
        <div className="tg-board">
          <OrganicShapes variant="cream" className="tg-fit" style={{ position: 'absolute', inset: 0 }} />
          <A className="s-flowers" style={{ top: 0, left: 0, width: '100%', zIndex: 3 }}><HangingFloralArrangement className="tg-fit" /></A>
          <HangingStars strings={[[8, 270], [20, 170], [80, 170], [92, 270]]} />
          <A style={{ top: '25%', left: '50%', width: '26cqw', marginLeft: '-13cqw', zIndex: 3 }}><ChampagneGlasses className="tg-fit" /></A>
          <div className="tg-text tg-brown" style={{ top: '37%', display: 'grid', gap: '2cqw', justifyItems: 'center', color: '#6B3A22' }}>
            <Flourish className="s-line" color="#8A5A34" />
            <p className="s-line tg-pop" style={{ fontSize: '7cqw' }}>Save the date</p>
            <p className="s-line tg-pop" style={{ fontSize: '4.6cqw' }}><DateLine iso={weddingDate} /></p>
            {/^\d{2}:\d{2}$/.test(ceremonyTime) && <p className="s-line tg-pop" style={{ fontSize: '4.2cqw' }}>At {formatTime(ceremonyTime)}</p>}
            <Flourish className="s-line" color="#8A5A34" />
            <p className="s-line tg-pop" style={{ fontSize: '5.6cqw' }}>Venue</p>
            <p className="s-line tg-pop" style={{ fontSize: '3.6cqw', maxWidth: '76cqw', lineHeight: 1.6 }}>{venue.name || 'To be announced'}{place ? <><br />{place}</> : null}</p>
            <Flourish className="s-line" color="#8A5A34" />
            <p className="s-line tg-pop" style={{ fontSize: '3.4cqw', maxWidth: '70cqw', lineHeight: 1.7 }}>Your presence will grace us with joy on this blessed day!</p>
          </div>
          <Elephants />
        </div>
      </div>
    </section>
  );
}

/** Scene 07 - couple reveal inside the gold geometric frame. */
export function SceneCoupleReveal() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom, weddingDate } = weddingData;
  const p = dateParts(weddingDate);
  useStage(root, (tl) => {
    tl.fromTo('.r-frame .tg-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, stagger: 0.08 }, 0)
      .fromTo('.r-bloom', { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.06, ease: 'back.out(1.5)' }, 0.2)
      .fromTo('.r-line', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.12, stagger: 0.07 }, 0.3)
      .fromTo('.r-star', { rotation: -40, opacity: 0 }, { rotation: 0, opacity: 1, duration: 0.3 }, 0.3)
      .fromTo('.tg-ele-l', { x: '-110%' }, { x: '0%', duration: 0.45, ease: 'power2.out' }, 0.4)
      .fromTo('.tg-ele-r', { x: '110%' }, { x: '0%', duration: 0.45, ease: 'power2.out' }, 0.4);
  }, { end: '+=150%' });
  return (
    <section id="tg-scene-07" ref={root} className="tg-scene tg-paper">
      <div className="tg-stage" style={{ background: '#6F7059' }}>
        <BotanicalOrbitSystem specs={botOrbits} color="#D5AD55" />
        <div className="tg-board">
          <OrganicShapes variant="frame" className="tg-fit" style={{ position: 'absolute', inset: 0 }} />
          <A className="r-frame" style={{ top: '17%', left: '6%', width: '88%', zIndex: 3 }}><GeometricFrame className="tg-fit-w" /></A>
          <A className="r-bloom" style={{ top: '25%', left: '4%', width: '24cqw', zIndex: 4 }}><svg viewBox="0 0 100 130"><Leaf x={30} y={70} len={44} rot={-60} fill="#CFD8B8" /><Leaf x={34} y={80} len={40} rot={-100} fill="#8FA0A0" /><Bloom x={44} y={60} r={20} petals={5} /><Bloom x={60} y={92} r={13} petals={5} rot={20} /></svg></A>
          <A className="r-bloom" style={{ top: '42%', right: '5%', width: '22cqw', zIndex: 4 }}><svg viewBox="0 0 100 130"><Leaf x={70} y={60} len={44} rot={-120} fill="#CFD8B8" /><Bloom x={56} y={70} r={20} petals={5} rot={15} /><Bloom x={40} y={102} r={13} petals={5} /></svg></A>
          <A className="r-star" style={{ top: '20%', right: '8%', width: '12cqw', zIndex: 4 }}><svg viewBox="-24 -24 48 48" className="tg-twinkle"><GoldStar r={22} fill="url(#tgBronze)" /></svg></A>
          <A className="r-star" style={{ top: '28%', right: '1%', width: '10cqw', zIndex: 4 }}><svg viewBox="-24 -24 48 48"><GoldStar r={22} fill="url(#tgBronze)" /></svg></A>
          <div className="tg-text" style={{ top: '31%', display: 'grid', gap: '1.2cqw', justifyItems: 'center', color: '#8A5A34' }}>
            <p className="r-line tg-pop" style={{ fontSize: '3.4cqw' }}>The wedding of</p>
            <p className="r-line tg-gilda" style={{ fontSize: '14cqw', lineHeight: 1 }}>{bride.firstName}</p>
            <p className="r-line tg-gilda" style={{ fontSize: '8cqw', lineHeight: 0.9 }}>&amp;</p>
            <p className="r-line tg-gilda" style={{ fontSize: '14cqw', lineHeight: 1 }}>{groom.firstName}</p>
            <p className="r-line tg-pop" style={{ fontSize: '4cqw', marginTop: '2cqw' }}>{p?.weekday ?? ''}</p>
            <p className="r-line tg-pop" style={{ fontSize: '3.4cqw' }}>{p ? `${p.day} ${p.month} ${p.year}` : ''}</p>
          </div>
          <Elephants />
        </div>
      </div>
    </section>
  );
}
