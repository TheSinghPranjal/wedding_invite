import weddingData from '../../data/weddingData';
import { brandDate } from '../../lib/dates';
import { Divider, Mandala } from '../art/Ornament';

/** The invitation text block. Shared by the phone mock-up (compact) and the full emerald scene. */
export default function InviteCopy({ compact = false }: { compact?: boolean }) {
  const { bride, groom, blessings } = weddingData;
  const fam = (f: typeof bride.family) => f.map((m) => `${m.relation} ${m.name}`.trim());
  const sides = [fam(bride.family), fam(groom.family)].filter((s) => s.length);
  const h = compact ? 'text-[0.62rem] leading-relaxed' : 'text-sm md:text-lg';
  return (
    <div className="text-center text-ivory flex flex-col items-center">
      <Mandala size={compact ? 74 : 130} glyph="ॐ" className="text-gold" />
      <p className={`font-hindi text-gold mt-3 ${compact ? 'text-xs' : 'text-xl md:text-3xl'}`}>{blessings.line1}</p>
      <p className={`mt-2 italic text-ivory/85 ${h}`}>{blessings.line2}</p>
      {sides.map((lines, i) => (
        <div key={i} className="mt-3">
          {i > 0 && <p className={`italic text-gold/90 mb-3 ${h}`}>and</p>}
          {lines.map((l) => <p key={l} className={`${h} text-ivory`}>{l}</p>)}
        </div>
      ))}
      <Divider className={`text-gold ${compact ? 'my-3 !w-20' : 'my-8'}`} />
      <p className={`tracking-[0.3em] uppercase text-gold ${compact ? 'text-[0.5rem]' : 'text-xs md:text-sm'}`}>Request the pleasure of your company</p>
      <p className={`tracking-[0.3em] uppercase text-ivory/80 mt-2 ${compact ? 'text-[0.5rem]' : 'text-xs md:text-sm'}`}>as we celebrate the wedding of</p>
      <p className={`font-display mt-4 leading-tight ${compact ? 'text-2xl' : 'text-5xl md:text-7xl'}`}>{bride.firstName}</p>
      <p className={`font-script text-gold ${compact ? 'text-xl' : 'text-4xl md:text-5xl'}`}>&amp;</p>
      <p className={`font-display leading-tight ${compact ? 'text-2xl' : 'text-5xl md:text-7xl'}`}>{groom.firstName}</p>
      <p className={`tracking-[0.4em] text-gold ${compact ? 'text-[0.55rem] mt-3' : 'text-sm md:text-lg mt-6'}`}>{brandDate()}</p>
    </div>
  );
}
