import { useRef } from 'react';
import type { WeddingEvent } from '../../../data/weddingData';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { useStage } from '../hooks/useStage';
import { styleFor } from '../config/eventThemes';
import { formatLongDate, formatTime, formatWeekday, brandDate } from '../lib/dates';
import { LinkButton } from '../ui/ui';
import GoldBorder from '../art/GoldBorder';

const timeText = (ev: WeddingEvent) => {
  const start = ev.time || (ev.theme === 'wedding' ? weddingData.ceremonyTime : '');
  if (!start) return 'To be announced';
  return ev.endTime ? `${formatTime(start)} – ${formatTime(ev.endTime)}` : formatTime(start);
};

/** One reusable, data-driven scene for every event type (Haldi, Mehendi, Sangeet, Wedding, Reception, Engagement, custom). */
export default function EventScene({ event: ev, index }: { event: WeddingEvent; index: number }) {
  const root = useRef<HTMLElement>(null);
  const st = styleFor(ev);
  const { venue, bride, groom } = weddingData;
  const isWedding = ev.theme === 'wedding';
  const place = ev.venue || venue.name;
  const address = ev.address || (ev.venue ? '' : [venue.address, venue.city].filter(Boolean).join(', '));
  const maps = ev.mapsUrl || venue.mapsUrl;

  useStage(root, (tl) => {
    tl.fromTo('.rb-ev-eyebrow', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.2 }, 0.08)
      .fromTo('.rb-ev-title', { opacity: 0, y: 34, letterSpacing: '.35em' }, { opacity: 1, y: 0, letterSpacing: '.1em', duration: 0.3 }, 0.12)
      .fromTo('.rb-ev-tag', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.2 }, 0.26)
      .fromTo('.rb-ev-info > *', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.18, stagger: 0.07 }, 0.4)
      .fromTo('.rb-border .rb-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5 }, 0)
      .fromTo('.rb-henna .rb-draw, .rb-ev-hero .rb-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6 }, 0.05)
      .to('.rb-layer', { y: (_i, el: HTMLElement) => -Number(el.dataset.depth) * 30, duration: 0.4 }, 0.72);
  }, {
    end: '+=150%',
    entrance: (st) => {
      gsap.fromTo('.rb-layer', { opacity: 0, y: (_i, el: HTMLElement) => 80 + Number(el.dataset.depth) * 160 }, { opacity: 1, y: 0, ease: 'power2.out', stagger: 0.03, scrollTrigger: st });
      gsap.fromTo('.rb-ev-hero', { scale: 0.86 }, { scale: 1, ease: 'power2.out', scrollTrigger: st });
      gsap.fromTo('.rb-mandap', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', ease: 'power1.out', scrollTrigger: st });
    },
  });

  const Art = st.Art;
  const muted = st.light ? 'rgba(48,35,28,.8)' : 'rgba(255,249,237,.82)';
  return (
    <section id={`rb-event-${ev.id}`} ref={root} className="rb-scene rb-grain" data-event={ev.id} data-index={index} style={{ color: st.ink }}>
      <div className="rb-stage" style={{ background: st.bg }}>
        {ev.image && <img src={ev.image} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />}
        <div className="rb-border" style={{ position: 'absolute', inset: 0, zIndex: 6, opacity: 0.9 }}><GoldBorder /></div>
        <Art />
        {/* scrim keeps text legible over artwork */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none', background: `linear-gradient(180deg, ${st.light ? 'rgba(255,255,255,.0)' : 'rgba(20,2,10,.0)'} 0%, transparent 100%)` }} />
        <div className="rb-content rb-center" style={{ position: 'absolute', inset: '0 0 auto 0', zIndex: 7, padding: 'clamp(2.2rem,6svh,4rem) 1.4rem 0' }}>
          <p className="rb-ev-eyebrow rb-eyebrow" style={{ color: st.accent }}>{String(index + 1).padStart(2, '0')} · {ev.theme === 'custom' ? 'Celebration' : ev.theme}</p>
          <h2 className="rb-ev-title rb-title" style={{ marginTop: '.5rem', color: st.light ? st.accent : undefined, fontSize: st.title.length > 12 ? 'clamp(1.7rem,5.2vw,3.8rem)' : undefined }}>{st.title}</h2>
          {isWedding && <p className="rb-names-cap rb-ev-tag" style={{ marginTop: '.4rem' }}>{bride.firstName.toUpperCase()} &amp; {groom.firstName.toUpperCase()} <span style={{ display: 'block', fontSize: '.45em', letterSpacing: '.4em', color: st.accent }}>{brandDate()}</span></p>}
          <p className="rb-ev-tag rb-cap" style={{ marginTop: '.7rem', fontSize: 'clamp(.62rem,1.8vw,.95rem)', letterSpacing: '.26em', maxWidth: '36rem', marginInline: 'auto', color: muted }}>{st.tagline}</p>
        </div>
        <div className="rb-ev-info rb-center" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 7, padding: '0 1.2rem clamp(.8rem,3svh,2rem)', display: 'grid', gap: '.5rem', justifyItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.4rem 1.8rem', fontSize: 'clamp(.95rem,2.4vw,1.25rem)' }}>
            <span><b className="rb-cap" style={{ fontSize: '.62em', color: st.accent, marginRight: '.5em' }}>Date</b>{ev.date ? `${formatWeekday(ev.date)}, ${formatLongDate(ev.date)}` : 'To be announced'}</span>
            <span><b className="rb-cap" style={{ fontSize: '.62em', color: st.accent, marginRight: '.5em' }}>Time</b>{timeText(ev)}</span>
            <span><b className="rb-cap" style={{ fontSize: '.62em', color: st.accent, marginRight: '.5em' }}>Venue</b>{place || 'To be announced'}{address ? `, ${address}` : ''}</span>
            {ev.dressCode && <span><b className="rb-cap" style={{ fontSize: '.62em', color: st.accent, marginRight: '.5em' }}>Dress</b>{ev.dressCode}</span>}
          </div>
          <LinkButton href={maps} dark={st.light} disabledLabel="Directions soon">Get Directions</LinkButton>
        </div>
      </div>
    </section>
  );
}
