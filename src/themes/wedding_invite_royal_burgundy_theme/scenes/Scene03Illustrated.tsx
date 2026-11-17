import { useRef } from 'react';
import weddingData from '../../../data/weddingData';
import { useStage } from '../hooks/useStage';
import { SideOrnamentLayer } from '../art/Mandala';
import { MarigoldTorana, FlowerString, BananaLeaf } from '../art/Flora';
import { Umbrella, Peacock, Chhatri, MarigoldPot, PalaceSkyline } from '../art/Decor';
import Mandap from '../art/Mandap';
import { Petals } from '../art/Particles';
import { DateBlock } from '../ui/ui';

const A = ({ style, children, className = '' }: { style: React.CSSProperties; children: React.ReactNode; className?: string }) => <div className={className} style={{ position: 'absolute', ...style }}>{children}</div>;

/** Scene 03 - illustrated Indian wedding invitation (mandap, torans, umbrellas, peacocks, palace, couple). */
export default function SceneIllustrated() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom, weddingDate, ceremonyTime, venue } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.s3-rise', { y: (i) => 160 + i * 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, 0)
      .fromTo('.s3-drop', { y: -240, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 0.05)
      .fromTo('.s3-text > *', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.14, stagger: 0.07 }, 0.25)
      .to('.s3-rise', { y: (i) => -12 - i * 4, duration: 0.3 }, 0.75);
  }, { end: '+=150%' });
  return (
    <section id="rb-scene-03" ref={root} className="rb-scene rb-grain">
      <div className="rb-stage" style={{ background: 'linear-gradient(180deg, #E8C65A 0%, #D9AF35 55%, #C99A24 100%)', color: '#350719' }}>
        <SideOrnamentLayer color="#8E1B2E" specs={[
          { side: 'left', kind: 'mandala', size: 560, top: 40, crop: 0.66, dir: 1, rotate: 110, opacity: 0.22, parallax: 100, layers: 4 },
          { side: 'right', kind: 'mandala', size: 600, top: 60, crop: 0.66, dir: -1, rotate: 100, opacity: 0.22, parallax: 140, layers: 4 },
          { side: 'left', kind: 'floral', size: 220, top: 88, crop: 0.5, dir: -1, rotate: 200, opacity: 0.2, parallax: 200, desktopOnly: true },
          { side: 'right', kind: 'floral', size: 220, top: 12, crop: 0.5, dir: 1, rotate: 200, opacity: 0.2, parallax: 200, desktopOnly: true },
        ]} />
        <Petals count={14} seed={51} colors={['#F59A1E', '#FFD84F', '#E2552B']} />
        <A style={{ left: 0, right: 0, bottom: 0, height: '40%', color: 'rgba(80,10,32,.16)', ['--win' as string]: '#D9AF35', zIndex: 1 }}><PalaceSkyline className="rb-fit" /></A>
        <MarigoldTorana className="rb-torana s3-drop" />
        {[0, 1].map((i) => <A key={`l${i}`} className="s3-drop" style={{ left: `${3 + i * 6}%`, top: 0, width: 28, zIndex: 3 }}><FlowerString length={150 + i * 70} white delay={i * 0.4} /></A>)}
        {[0, 1].map((i) => <A key={`r${i}`} className="s3-drop" style={{ right: `${3 + i * 6}%`, top: 0, width: 28, zIndex: 3 }}><FlowerString length={150 + i * 70} white delay={i * 0.4 + 0.2} /></A>)}

        <div className="s3-text rb-center rb-content" style={{ position: 'absolute', top: 'clamp(3.2rem,11svh,6.4rem)', left: 0, right: 0, padding: '0 1rem', display: 'grid', gap: 'clamp(.2rem,.8svh,.6rem)', justifyItems: 'center' }}>
          <p className="rb-hi" lang="hi" style={{ fontSize: 'clamp(1.2rem,4.4vw,1.9rem)', color: '#8E1B2E' }}>॥ शुभ विवाह ॥</p>
          <p className="rb-cap" style={{ fontSize: 'clamp(.6rem,1.8vw,.85rem)' }}>Together with their families</p>
          <p className="rb-names-cap" style={{ fontSize: 'clamp(1.6rem,6vw,3.2rem)' }}>{bride.firstName.toUpperCase()}</p>
          <p className="rb-script" style={{ fontSize: 'clamp(1.6rem,5vw,2.6rem)', lineHeight: 0.8, color: '#8E1B2E' }}>&amp;</p>
          <p className="rb-names-cap" style={{ fontSize: 'clamp(1.6rem,6vw,3.2rem)' }}>{groom.firstName.toUpperCase()}</p>
          <p style={{ fontSize: 'clamp(.95rem,2.4vw,1.25rem)', maxWidth: '26em', lineHeight: 1.3, fontWeight: 500 }}>cordially invite you to join the occasion of their joyous commitment on</p>
          <div style={{ width: 'min(86vw,24rem)' }}><DateBlock iso={weddingDate} time={ceremonyTime} /></div>
          {venue.name && <p className="rb-cap" style={{ fontSize: 'clamp(.6rem,1.8vw,.85rem)' }}>at {venue.name}</p>}
        </div>

        <A className="s3-rise" style={{ left: '-4%', bottom: '5%', width: 'min(24vw,170px)', zIndex: 4 }}><BananaLeaf /></A>
        <A className="s3-rise" style={{ right: '-4%', bottom: '5%', width: 'min(24vw,170px)', transform: 'scaleX(-1)', zIndex: 4 }}><BananaLeaf /></A>
        <A className="s3-rise" style={{ left: '4%', bottom: '24%', width: 'min(15vw,92px)', zIndex: 2 }}><Chhatri /></A>
        <A className="s3-rise" style={{ right: '4%', bottom: '24%', width: 'min(15vw,92px)', zIndex: 2 }}><Chhatri /></A>
        <A className="s3-rise" style={{ left: '50%', bottom: '3%', transform: 'translateX(-50%)', height: 'min(40svh,420px)', aspectRatio: '1', zIndex: 3 }}><Mandap className="rb-fit" /></A>
        <A className="s3-rise" style={{ left: '12%', bottom: '14%', width: 'min(22vw,120px)', zIndex: 4 }}><Umbrella a="#26406E" b="#E8408A" /></A>
        <A className="s3-rise" style={{ right: '12%', bottom: '14%', width: 'min(22vw,120px)', zIndex: 4 }}><Umbrella a="#26406E" b="#E8408A" /></A>
        <A className="s3-rise" style={{ left: '1%', bottom: '2%', width: 'min(13vw,86px)', zIndex: 5 }}><Peacock /></A>
        <A className="s3-rise" style={{ right: '1%', bottom: '2%', width: 'min(13vw,86px)', transform: 'scaleX(-1)', zIndex: 5 }}><Peacock /></A>
        <A className="s3-rise" style={{ left: '17%', bottom: '2%', width: 'min(10vw,52px)', zIndex: 5 }}><MarigoldPot /></A>
        <A className="s3-rise" style={{ right: '17%', bottom: '2%', width: 'min(10vw,52px)', zIndex: 5 }}><MarigoldPot /></A>
      </div>
    </section>
  );
}
