import { useRef } from 'react';
import weddingData from '../../../data/weddingData';
import { useStage } from '../hooks/useStage';
import { SideOrnamentLayer } from '../art/Mandala';
import { Ganesha, ScrollCorner, scallopArchPath } from '../art/Ornaments';
import { FlowerString } from '../art/Flora';
import { GoldDust } from '../art/Particles';
import { DateBlock } from '../ui/ui';

/** Scene 02 - royal invitation unveiled inside a scalloped arch card. */
export default function SceneInvitation() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom, weddingDate, ceremonyTime, venue } = weddingData;
  useStage(root, (tl) => {
    tl.fromTo('.i-corner', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05 }, 0)
      .fromTo('.i-string', { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 0.05)
      .fromTo('.i-card', { clipPath: 'inset(50% 0 50% 0)', scaleY: 0.92, opacity: 0.4 }, { clipPath: 'inset(0% 0 0% 0)', scaleY: 1, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.12)
      .fromTo('.i-ganesha', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.15 }, 0.36)
      .fromTo('.i-line', { opacity: 0, y: 22, filter: 'blur(5px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.12, stagger: 0.07 }, 0.4)
      .to('.i-card', { y: -14, duration: 0.3 }, 0.8);
  }, { end: '+=160%' });
  return (
    <section id="rb-scene-02" ref={root} className="rb-scene rb-grain">
      <div className="rb-stage rb-burg-bg">
        <SideOrnamentLayer />
        <GoldDust count={26} seed={41} />
        <ScrollCorner className="i-corner" style={{ position: 'absolute', top: 6, left: 6, width: 'min(44vw,380px)', zIndex: 2 }} />
        <ScrollCorner className="i-corner" style={{ position: 'absolute', top: 6, right: 6, width: 'min(44vw,380px)', transform: 'scaleX(-1)', zIndex: 2 }} />
        {[0, 1].map((i) => <div key={`l${i}`} className="i-string" style={{ position: 'absolute', left: `${3 + i * 5.5}%`, top: 0, width: 30, zIndex: 3 }}><FlowerString length={170 + i * 60} white delay={i * 0.5} /></div>)}
        {[0, 1].map((i) => <div key={`r${i}`} className="i-string" style={{ position: 'absolute', right: `${3 + i * 5.5}%`, top: 0, width: 30, zIndex: 3 }}><FlowerString length={170 + i * 60} white delay={i * 0.5 + 0.3} /></div>)}
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 4 }}>
          <div className="i-card rb-card" style={{ width: 'min(90vw, calc(88svh * 2 / 3), 466px)', aspectRatio: '2 / 3', filter: 'drop-shadow(0 24px 40px rgba(0,0,0,.5))' }}>
            <svg viewBox="0 0 400 600" width="100%" height="100%" aria-hidden="true" focusable="false">
              <defs><linearGradient id="rbPanel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E4BC45" /><stop offset=".5" stopColor="#D9AF35" /><stop offset="1" stopColor="#C49A24" /></linearGradient></defs>
              <path d={scallopArchPath(400, 600, 13)} fill="url(#rbPanel)" stroke="#F1D58B" strokeWidth="3" />
              <path d={scallopArchPath(400, 600, 13)} fill="none" stroke="#8E6A14" strokeWidth="1" opacity=".5" transform="translate(10 12) scale(.95 .96)" />
            </svg>
            <div className="rb-card__txt" style={{ paddingTop: '20cqw' }}>
              <Ganesha className="i-ganesha" style={{ width: '13cqw' }} />
              <p className="i-line rb-cap" style={{ fontSize: '3cqw', marginTop: '3cqw' }}>Together with their families</p>
              <p className="i-line rb-names-cap" style={{ fontSize: '11cqw', marginTop: '2cqw', color: '#350719' }}>{bride.firstName.toUpperCase()}</p>
              <p className="i-line rb-script" style={{ fontSize: '9cqw', lineHeight: 0.8, color: '#650D25' }}>&amp;</p>
              <p className="i-line rb-names-cap" style={{ fontSize: '11cqw', color: '#350719' }}>{groom.firstName.toUpperCase()}</p>
              <p className="i-line" style={{ fontSize: '4.2cqw', marginTop: '3cqw', lineHeight: 1.35, maxWidth: '24em', fontWeight: 500 }}>Cordially invite you to join the celebration of their wedding.</p>
              <div className="i-line" style={{ marginTop: '3.5cqw', color: '#350719', width: '100%' }}><DateBlock iso={weddingDate} time={ceremonyTime} /></div>
              {venue.name && <p className="i-line rb-cap" style={{ fontSize: '2.8cqw', marginTop: '3cqw' }}>at {venue.name}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
