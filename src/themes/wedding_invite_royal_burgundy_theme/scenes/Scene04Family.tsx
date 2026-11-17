import weddingData from '../../../data/weddingData';
import { SideOrnamentLayer } from '../art/Mandala';
import { ScrollCorner, scallopArchPath } from '../art/Ornaments';
import { GoldDust } from '../art/Particles';
import GoldBorder from '../art/GoldBorder';
import { Reveal } from '../ui/ui';

const Side = ({ heading, first, family }: { heading: string; first: string; family: { relation: string; name: string }[] }) => (
  <div className="rb-center">
    <Reveal><p className="rb-eyebrow">{heading}</p></Reveal>
    <Reveal delay={0.1}><p className="rb-names rb-gold-text" style={{ marginTop: '.3rem', fontSize: 'clamp(3rem,10vw,5rem)' }}>{first}</p></Reveal>
    {family.length > 0 && (
      <Reveal delay={0.2}>
        <ul style={{ listStyle: 'none', padding: 0, margin: '.4rem 0 0', display: 'grid', gap: '.35rem' }}>
          {family.map((m) => <li key={m.relation + m.name} className="rb-body" style={{ color: 'rgba(255,249,237,.88)' }}><span style={{ fontStyle: 'italic', color: '#F1D58B' }}>{m.relation}</span> {m.name}</li>)}
        </ul>
      </Reveal>
    )}
  </div>
);

/** Scene 04 - family introduction in a maroon scalloped arch. All names come from weddingData. */
export default function SceneFamily() {
  const { bride, groom, blessings } = weddingData;
  return (
    <section id="rb-scene-04" className="rb-scene rb-grain" style={{ background: 'linear-gradient(180deg,#650D25,#500A20 50%,#350719)', minHeight: '100svh' }}>
      <SideOrnamentLayer specs={[
        { side: 'left', kind: 'mandala', size: 720, top: 30, crop: 0.58, dir: 1, rotate: 130, opacity: 0.5, parallax: 140, layers: 4 },
        { side: 'right', kind: 'mandala', size: 760, top: 70, crop: 0.58, dir: -1, rotate: 120, opacity: 0.5, parallax: 180, layers: 4 },
        { side: 'left', kind: 'floral', size: 280, top: 92, crop: 0.5, dir: -1, rotate: 220, opacity: 0.4, parallax: 240, desktopOnly: true },
        { side: 'right', kind: 'floral', size: 280, top: 6, crop: 0.5, dir: 1, rotate: 220, opacity: 0.4, parallax: 240, desktopOnly: true },
      ]} />
      <GoldDust count={20} seed={61} />
      <GoldBorder />
      {[0, 1, 2, 3].map((i) => <ScrollCorner key={i} style={{ position: 'absolute', width: 'clamp(70px,14vw,140px)', zIndex: 3, top: i < 2 ? 24 : undefined, bottom: i >= 2 ? 24 : undefined, left: i % 2 === 0 ? 24 : undefined, right: i % 2 ? 24 : undefined, transform: `scale(${i % 2 ? -1 : 1}, ${i >= 2 ? -1 : 1})` }} />)}
      <div className="rb-content" style={{ position: 'relative', margin: '0 auto', width: 'min(92vw,560px)', padding: 'clamp(5rem,12svh,7rem) 0' }}>
        <svg viewBox="0 0 400 760" preserveAspectRatio="none" aria-hidden="true" focusable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }}>
          <path d={scallopArchPath(400, 760, 13)} fill="rgba(53,7,25,.55)" stroke="#D5AD55" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="rb-center" style={{ padding: '4rem 1.4rem 3rem', display: 'grid', gap: '2rem' }}>
          <Reveal><p className="rb-hi rb-gold-text" lang="sa" style={{ fontSize: '1.6rem' }}>{blessings.line1}</p></Reveal>
          <Reveal delay={0.1}><p className="rb-cap" style={{ fontSize: 'clamp(.8rem,2.4vw,1.05rem)', color: '#F1D58B', lineHeight: 1.7 }}>With the blessings of our families</p></Reveal>
          <Side heading="Bride's Family" first={bride.firstName} family={bride.family} />
          <Reveal><p className="rb-script rb-gold-text" style={{ fontSize: '3.4rem', lineHeight: 1 }}>&amp;</p></Reveal>
          <Side heading="Groom's Family" first={groom.firstName} family={groom.family} />
          {bride.family.length + groom.family.length === 0 && <Reveal><p style={{ fontStyle: 'italic', color: 'rgba(255,249,237,.6)' }}>{blessings.line2}</p></Reveal>}
        </div>
      </div>
    </section>
  );
}
