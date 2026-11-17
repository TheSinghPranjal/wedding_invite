import weddingData from '../../../data/weddingData';
import { HangingGreens, FlowerBall, Peony } from '../art/Flora';
import { Petals } from '../art/Particles';
import { SideOrnamentLayer } from '../art/Mandala';
import { Reveal, PhotoSlot } from '../ui/ui';

const Person = ({ role, name, bio, photo }: { role: string; name: string; bio: string; photo: string }) => (
  <div className="rb-center" style={{ display: 'grid', gap: '.7rem', justifyItems: 'center' }}>
    <Reveal><div style={{ width: 'min(70vw,300px)' }}><PhotoSlot src={photo} alt={`${name}`} label={role} initial={name.charAt(0)} /></div></Reveal>
    <Reveal delay={0.1}><p className="rb-eyebrow" style={{ color: '#8E1B2E' }}>{role}</p></Reveal>
    <Reveal delay={0.2}><h3 className="rb-names" style={{ color: '#650D25', fontSize: 'clamp(3rem,9vw,5.5rem)' }}>{name}</h3></Reveal>
    {bio && <Reveal delay={0.3}><p className="rb-body" style={{ maxWidth: '24em', color: '#30231C' }}>{bio}</p></Reveal>}
  </div>
);

/** Scene 12 - meet the bride and groom, botanical ivory/blush editorial layout (after reference 3). */
export default function SceneMeet() {
  const { bride, groom } = weddingData;
  return (
    <section id="rb-scene-12" className="rb-scene rb-ivory-bg" style={{ background: 'linear-gradient(180deg,#FFF9ED,#FBEEE6 60%,#F8E6DF)', minHeight: '100svh', padding: 'clamp(9rem,26vw,14rem) 1.2rem 8rem' }}>
      <SideOrnamentLayer color="#C9A24C" specs={[
        { side: 'left', kind: 'mandala', size: 560, top: 48, crop: 0.7, dir: 1, rotate: 100, opacity: 0.2, parallax: 120, layers: 3 },
        { side: 'right', kind: 'mandala', size: 600, top: 62, crop: 0.7, dir: -1, rotate: 100, opacity: 0.2, parallax: 150, layers: 3 },
      ]} />
      <Petals count={10} seed={91} colors={['#FFFDF6', '#F3DDB8', '#EDA99E']} />
      <div style={{ position: 'absolute', inset: '0 0 auto 0', height: 'clamp(110px,30vw,280px)', zIndex: 1 }}><HangingGreens className="rb-fit" /></div>
      <div style={{ position: 'absolute', left: '3%', top: 0, width: 'clamp(70px,14vw,130px)', zIndex: 2 }}><FlowerBall drop={90} /></div>
      <div style={{ position: 'absolute', left: '12%', top: 0, width: 'clamp(60px,11vw,100px)', zIndex: 2 }}><FlowerBall drop={40} /></div>
      <div style={{ position: 'absolute', right: '3%', top: 0, width: 'clamp(70px,14vw,130px)', zIndex: 2 }}><FlowerBall drop={70} /></div>
      <div style={{ position: 'absolute', right: '12%', top: 0, width: 'clamp(60px,11vw,100px)', zIndex: 2 }}><FlowerBall drop={30} /></div>
      <div style={{ position: 'absolute', left: -20, bottom: -10, width: 'clamp(110px,24vw,220px)', zIndex: 1 }}><Peony /></div>
      <div style={{ position: 'absolute', right: -20, bottom: -10, width: 'clamp(110px,24vw,220px)', transform: 'scaleX(-1)', zIndex: 1 }}><Peony tone="rose" /></div>
      <div className="rb-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '4rem 2rem', maxWidth: 1000, margin: '0 auto' }}>
        <Person role="Meet the Bride" name={bride.firstName} bio={bride.bio} photo={bride.photo} />
        <Person role="Meet the Groom" name={groom.firstName} bio={groom.bio} photo={groom.photo} />
      </div>
    </section>
  );
}
