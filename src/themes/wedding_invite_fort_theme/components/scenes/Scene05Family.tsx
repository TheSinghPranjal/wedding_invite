import weddingData from '../../../../data/weddingData';
import { Divider } from '../art/Ornament';
import Reveal from '../ui/Reveal';

function Side({ title, name, family, align }: { title: string; name: string; family: { relation: string; name: string }[]; align: string }) {
  return (
    <div className={`text-center ${align}`}>
      <Reveal><p className="tracking-[0.45em] text-xs text-gold uppercase">{title}</p></Reveal>
      <Reveal delay={0.1}><h3 className="font-display text-4xl md:text-6xl mt-4 text-ivory">{name}</h3></Reveal>
      <div className="mt-6 space-y-3 min-h-16">
        {family.length ? (
          family.map((m) => (
            <Reveal key={m.relation + m.name} delay={0.2}>
              <p className="italic text-ivory/75 text-base md:text-lg">{m.relation}</p>
              <p className="text-xl md:text-2xl text-ivory">{m.name}</p>
            </Reveal>
          ))
        ) : (
          <Reveal delay={0.2}><p className="italic text-ivory/45">Family details coming soon</p></Reveal>
        )}
      </div>
    </div>
  );
}

/** Scene 5 – family introduction, fully driven by weddingData.bride/groom.family */
export default function SceneFamily() {
  const { bride, groom } = weddingData;
  return (
    <section id="scene-05" className="scene emerald-paper grain py-24 md:py-36 px-6 text-ivory">
      <div className="absolute inset-0 paisley opacity-[.07]" />
      <Reveal><p className="text-center font-display text-2xl md:text-4xl gold-text">Our Families</p></Reveal>
      <Reveal delay={0.1}><Divider className="text-gold mt-5 mb-14 md:mb-20" /></Reveal>
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto_1fr] gap-14 md:gap-10 items-start">
        <Side title="The Bride" name={bride.firstName} family={bride.family} align="" />
        <div className="hidden md:block self-stretch w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
        <Side title="The Groom" name={groom.firstName} family={groom.family} align="" />
      </div>
    </section>
  );
}
