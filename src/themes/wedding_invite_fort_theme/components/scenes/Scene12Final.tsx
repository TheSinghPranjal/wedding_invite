import weddingData from '../../../../data/weddingData';
import { brandDate, downloadIcs } from '../../lib/dates';
import Palace from '../art/Palace';
import Stars from '../art/Stars';
import Reveal from '../ui/Reveal';
import LinkButton from '../ui/LinkButton';
import RsvpForm from '../ui/RsvpForm';

/** Scene 12 – closing scene: RSVP, calendar, directions, contact. */
export default function SceneFinal() {
  const { bride, groom, venue, contact } = weddingData;
  const wa = contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` : '';
  return (
    <section id="scene-12" className="scene bg-gradient-to-b from-[#2a2a55] via-[#0d1b4a] to-[#050a22] text-ivory pt-28 text-center">
      <Stars count={70} seed={11} />
      <div className="absolute inset-0 paisley opacity-[.05]" />
      <div className="relative z-10 px-6">
        <Reveal><p className="text-xs md:text-sm tracking-[0.5em] uppercase text-gold">With love and joy</p></Reveal>
        <Reveal delay={0.1}><h2 className="font-display text-5xl md:text-8xl mt-5">{bride.firstName} <span className="font-script text-gold">&amp;</span> {groom.firstName}</h2></Reveal>
        <Reveal delay={0.2}><p className="tracking-[0.45em] text-gold mt-5 text-sm md:text-lg">{brandDate()}</p></Reveal>
        <Reveal delay={0.3}><p className="italic text-xl md:text-2xl text-ivory/85 mt-6">We look forward to celebrating with you.</p></Reveal>

        <Reveal className="mt-16" delay={0.1}><h3 className="font-display text-3xl md:text-5xl mb-8">Please RSVP</h3></Reveal>
        <RsvpForm />
        {weddingData.rsvp.deadline && <p className="mt-4 text-sm text-ivory/60">Kindly reply by {weddingData.rsvp.deadline}</p>}

        <Reveal className="mt-14 flex flex-wrap justify-center gap-4">
          <LinkButton onClick={downloadIcs}>Add to Calendar</LinkButton>
          <LinkButton href={venue.mapsUrl} tone="ivory" disabledLabel="Directions soon">Venue Directions</LinkButton>
        </Reveal>

        <Reveal className="mt-12 text-ivory/80 space-y-1">
          {contact.phone && <p><a href={`tel:${contact.phone}`} className="underline underline-offset-4">{contact.phone}</a></p>}
          {contact.email && <p><a href={`mailto:${contact.email}`} className="underline underline-offset-4">{contact.email}</a></p>}
          {wa && <p><a href={wa} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">WhatsApp us</a></p>}
        </Reveal>
      </div>
      <Palace className="relative w-full h-[34vh] md:h-[44vh] mt-16 opacity-90" />
    </section>
  );
}
