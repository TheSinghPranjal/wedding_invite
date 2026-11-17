import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import weddingData, { type WeddingEvent } from '../../data/weddingData';
import { formatLongDate, formatWeekday } from '../../lib/dates';
import { Mandala, Marigold } from '../art/Ornament';
import Palace from '../art/Palace';
import Reveal from '../ui/Reveal';
import LinkButton from '../ui/LinkButton';

interface Look { bg: string; ink: string; accent: string; sub: string }

const looks: Record<WeddingEvent['theme'], Look> = {
  mehendi: { bg: 'linear-gradient(160deg,#1f5a43,#2f7d5c 60%,#17432f)', ink: '#f3ecd6', accent: '#d9b45a', sub: '#cfe3d0' },
  haldi: { bg: 'linear-gradient(160deg,#f2c230,#e6a817 60%,#c98a0c)', ink: '#3b2406', accent: '#7a4a00', sub: '#5b3a08' },
  sangeet: { bg: 'linear-gradient(160deg,#0d1b4a,#1a2a7a 60%,#0a1236)', ink: '#f5f0e8', accent: '#e0bb62', sub: '#c8cfe8' },
  wedding: { bg: 'linear-gradient(170deg,#fbf3dc,#f0dfae 60%,#e3c97c)', ink: '#3a2608', accent: '#9a7220', sub: '#6b4c14' },
  reception: { bg: 'linear-gradient(160deg,#14080f,#2a0f1e 60%,#0c0408)', ink: '#f5e9e0', accent: '#d9a45e', sub: '#c9b0a8' },
  engagement: { bg: 'linear-gradient(160deg,#4a1d33,#7a2f52 60%,#3a1427)', ink: '#f8e9ee', accent: '#e6bd6a', sub: '#e0c3cd' },
  custom: { bg: 'linear-gradient(160deg,#143338,#215159 60%,#0e2529)', ink: '#f1ede0', accent: '#d9b45a', sub: '#c3d8d6' },
};

function Vine({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 300 400" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M150 400 C 80 330 220 280 150 200 C 90 140 200 90 150 20" />
      {[340, 280, 220, 160, 100, 50].map((y, i) => (
        <g key={y} transform={`translate(${i % 2 ? 190 : 110} ${y}) rotate(${i % 2 ? 30 : -30})`}>
          <path d="M0 0 C 30 -30 60 -10 40 20 C 20 40 -10 20 0 0Z" />
          <circle cx="22" cy="2" r="3" fill={color} />
        </g>
      ))}
    </svg>
  );
}

function Art({ theme, look }: { theme: WeddingEvent['theme']; look: Look }) {
  if (theme === 'mehendi') return <div className="ev-art w-full h-full opacity-80"><Vine color={look.accent} /></div>;
  if (theme === 'haldi')
    return (
      <div className="ev-art relative w-full h-full">
        <Marigold size={170} className="absolute top-2 left-4" />
        <Marigold size={110} className="absolute bottom-6 right-2 rotate-12" />
        <Marigold size={70} className="absolute top-1/2 right-10" />
      </div>
    );
  if (theme === 'sangeet') return <div className="ev-art grid place-items-center w-full h-full"><Mandala size={320} className="text-gold" /></div>;
  if (theme === 'wedding') return <div className="ev-art w-full h-full flex items-end"><Palace className="w-full h-full" position="50% 85%" /></div>;
  if (theme === 'reception') return <div className="ev-art w-full h-full opacity-80"><Vine color={look.accent} /></div>;
  return <div className="ev-art grid place-items-center w-full h-full"><Mandala size={300} className="text-gold" /></div>;
}

function EventScene({ ev, index }: { ev: WeddingEvent; index: number }) {
  const look = looks[ev.theme] ?? looks.custom;
  const ref = useRef<HTMLElement>(null);
  const flip = index % 2 === 1;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.ev-art', { yPercent: 14 }, { yPercent: -14, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.fromTo('.ev-photo', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'top 15%', scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const tbd = (s: string, fallback: string) => (s ? s : fallback);
  return (
    <section
      ref={ref}
      className="event-scene scene md:sticky md:top-0 min-h-svh grid md:grid-cols-2 items-center gap-8 px-6 md:px-16 py-20 grain"
      style={{ background: look.bg, color: look.ink, zIndex: index + 1 }}
      data-event={ev.id}
    >
      <div className={`${flip ? 'md:order-2' : ''} relative h-64 md:h-[70vh] overflow-hidden`} style={{ color: look.accent }}>
        {ev.image ? (
          <img src={ev.image} alt={ev.name} loading="lazy" className="ev-photo w-full h-full object-cover" />
        ) : (
          <Art theme={ev.theme} look={look} />
        )}
      </div>
      <div className="relative z-10 text-center md:text-left">
        <Reveal><p className="text-xs tracking-[0.5em] uppercase" style={{ color: look.accent }}>{String(index + 1).padStart(2, '0')} · {ev.theme === 'custom' ? 'Celebration' : ev.theme}</p></Reveal>
        <Reveal delay={0.1}><h2 className="font-display text-5xl md:text-7xl mt-4 leading-tight">{ev.name}</h2></Reveal>
        <Reveal delay={0.2}><p className="italic text-lg md:text-xl mt-4" style={{ color: look.sub }}>{ev.description}</p></Reveal>
        <Reveal delay={0.3}>
          <dl className="mt-8 space-y-3 text-base md:text-lg">
            <div><dt className="text-[0.7rem] tracking-[0.4em] uppercase" style={{ color: look.accent }}>Date</dt><dd>{ev.date ? `${formatWeekday(ev.date)}, ${formatLongDate(ev.date)}` : 'To be announced'}</dd></div>
            <div><dt className="text-[0.7rem] tracking-[0.4em] uppercase" style={{ color: look.accent }}>Time</dt><dd>{tbd(ev.time, 'To be announced')}</dd></div>
            <div><dt className="text-[0.7rem] tracking-[0.4em] uppercase" style={{ color: look.accent }}>Venue</dt><dd>{tbd(ev.venue, 'To be announced')}{ev.address && <span className="block text-sm opacity-80">{ev.address}</span>}</dd></div>
            {ev.dressCode && <div><dt className="text-[0.7rem] tracking-[0.4em] uppercase" style={{ color: look.accent }}>Dress code</dt><dd>{ev.dressCode}</dd></div>}
          </dl>
        </Reveal>
        <Reveal delay={0.4} className="mt-8">
          <LinkButton href={ev.mapsUrl} tone={ev.theme === 'haldi' || ev.theme === 'wedding' ? 'dark' : 'ivory'} disabledLabel="Directions soon">Get Directions</LinkButton>
        </Reveal>
      </div>
    </section>
  );
}

/** Scene 6 – generated entirely from weddingData.events; each event is its own themed scene that stacks over the previous. */
export default function SceneEvents() {
  return (
    <div id="scene-06">
      <div className="bg-midnight text-center py-20 px-6 text-ivory">
        <Reveal><p className="text-xs tracking-[0.5em] uppercase text-gold">Join us for</p></Reveal>
        <Reveal delay={0.1}><h2 className="font-display text-4xl md:text-6xl mt-3 gold-text">The Celebrations</h2></Reveal>
      </div>
      {weddingData.events.map((ev, i) => <EventScene key={ev.id} ev={ev} index={i} />)}
    </div>
  );
}
