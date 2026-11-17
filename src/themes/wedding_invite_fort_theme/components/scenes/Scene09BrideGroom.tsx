import weddingData from '../../../../data/weddingData';
import Reveal from '../ui/Reveal';
import Portrait from '../ui/Portrait';
import Petals from '../art/Petals';

/** Scene 9 – blush-pink editorial intro of the couple; photos come from weddingData. */
export default function SceneBrideGroom() {
  const { bride, groom } = weddingData;
  const people = [bride, groom];
  return (
    <section id="scene-09" className="scene blush-paper grain py-24 md:py-40 px-6 text-midnight">
      <Petals count={16} seed={7} />
      <div className="text-center">
        <Reveal><p className="text-xs md:text-sm tracking-[0.5em] uppercase text-[#8a5a6e]">Meet the</p></Reveal>
        <Reveal delay={0.1}><h2 className="font-display text-5xl md:text-8xl mt-3 leading-none">BRIDE AND<br />GROOM</h2></Reveal>
      </div>
      <div className="max-w-5xl mx-auto mt-16 md:mt-28 grid md:grid-cols-2 gap-16 md:gap-20">
        {people.map((p, i) => (
          <div key={p.firstName} className={i === 1 ? 'md:mt-32' : ''}>
            <Portrait src={p.photo} alt={`${p.firstName}`} label={p.firstName} />
            <Reveal delay={0.1}><h3 className="font-display text-4xl md:text-5xl mt-6">{[p.firstName, p.lastName].filter(Boolean).join(' ')}</h3></Reveal>
            <Reveal delay={0.2}><p className="text-xs tracking-[0.4em] uppercase text-[#8a5a6e] mt-1">{i === 0 ? 'The Bride' : 'The Groom'}</p></Reveal>
            {p.bio && <Reveal delay={0.3}><p className="mt-4 text-lg md:text-xl leading-relaxed text-midnight/80">{p.bio}</p></Reveal>}
          </div>
        ))}
      </div>
    </section>
  );
}
