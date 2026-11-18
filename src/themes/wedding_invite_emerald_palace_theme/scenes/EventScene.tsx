import { useRef } from 'react';
import type { WeddingEvent } from '../../../data/weddingData';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { useStage } from '../hooks/useStage';
import { styleFor } from '../config/eventThemes';
import { formatLongDate, formatTime, formatWeekday, brandDate } from '../lib/dates';
import { LinkButton } from '../ui/ui';

const timeText = (ev: WeddingEvent) => {
  const start = ev.time || (ev.theme === 'wedding' ? weddingData.ceremonyTime : '');
  if (!start) return 'To be announced';
  return ev.endTime ? `${formatTime(start)} – ${formatTime(ev.endTime)}` : formatTime(start);
};

/** One reusable, data-driven scene for every event type; art, palette and titles come from config/eventThemes. */
export default function EventScene({ event: ev, index }: { event: WeddingEvent; index: number }) {
  const root = useRef<HTMLElement>(null);
  const st = styleFor(ev);
  const { venue, bride, groom } = weddingData;
  const isWedding = ev.theme === 'wedding';
  const place = ev.venue || venue.name;
  const address = ev.address || (ev.venue ? '' : [venue.address, venue.city].filter(Boolean).join(', '));
  const maps = ev.mapsUrl || venue.mapsUrl;

  useStage(root, (tl) => {
    tl.fromTo('.ep-ev-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25 }, 0.05)
      .fromTo('.ep-ev-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.2)
      .fromTo('.ep-ev-info > *', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.15, stagger: 0.07 }, 0.4)
      .fromTo('.ep-henna .ep-draw, .ep-ev-hero .ep-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6 }, 0.05)
      .to('.ep-layer', { y: (_i, el: HTMLElement) => -Number(el.dataset.depth) * 30, duration: 0.4 }, 0.72);
  }, {
    end: '+=150%',
    entrance: (a) => {
      gsap.fromTo('.ep-layer', { opacity: 0, y: (_i, el: HTMLElement) => 80 + Number(el.dataset.depth) * 160 }, { opacity: 1, y: 0, ease: 'power2.out', stagger: 0.03, scrollTrigger: a });
      gsap.fromTo('.ep-ev-hero', { scale: 0.88 }, { scale: 1, ease: 'power2.out', scrollTrigger: a });
      gsap.fromTo('.ep-mandap', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', ease: 'power1.out', scrollTrigger: a });
    },
  });

  const Art = st.Art;
  const label = (t: string) => <b className="ep-sans" style={{ fontSize: '2.5cqw', color: st.accent, marginRight: '.8em', letterSpacing: '.2em', fontWeight: 600 }}>{t}</b>;
  const long = st.title.length > 12;
  return (
    <section id={`ep-event-${ev.id}`} ref={root} className="ep-scene ep-paper" data-event={ev.id} data-index={index} style={{ color: st.ink }}>
      <div className="ep-stage" style={{ background: st.bg }}>
        {ev.image && <img src={ev.image} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />}
        <div className="ep-board" style={{ ['--db' as string]: st.detailsBottom }}>
          <Art />
          <div className="ep-text" style={{ top: st.titleTop }}>
            <p className="ep-ev-title"><span className="ep-display" style={{ fontSize: long ? '8cqw' : '12cqw', color: st.heading, display: 'block' }}>{st.title}</span></p>
            {isWedding && <p className="ep-ev-tag ep-names" style={{ fontSize: '14cqw', marginTop: '1cqw', color: st.heading }}>{bride.firstName} &amp; {groom.firstName}<span className="ep-sans" style={{ display: 'block', fontSize: '3.4cqw', color: st.ink, marginTop: '1cqw', letterSpacing: '.18em' }}>{brandDate()}</span></p>}
            {st.tagline && <p className="ep-ev-tag ep-sans" style={{ fontSize: '2.9cqw', marginTop: '2.4cqw', lineHeight: 1.7, letterSpacing: '.16em', maxWidth: '74cqw', marginInline: 'auto', opacity: 0.92 }}>{st.tagline}</p>}
          </div>
          <div className="ep-ev-info ep-center" style={{ position: 'absolute', left: 0, right: 0, bottom: st.detailsBottom, zIndex: 7, padding: '0 6cqw', display: 'grid', gap: '1.8cqw', justifyItems: 'center' }}>
            <p className="ep-sans" style={{ fontSize: '3.7cqw', lineHeight: 1.45 }}>{label('DATE')}{ev.date ? `${formatWeekday(ev.date)}, ${formatLongDate(ev.date)}` : 'To be announced'}</p>
            <p className="ep-sans" style={{ fontSize: '3.7cqw', lineHeight: 1.45 }}>{label('TIME')}{timeText(ev)}</p>
            <p className="ep-sans" style={{ fontSize: '3.7cqw', lineHeight: 1.45, maxWidth: '84cqw' }}>{label('VENUE')}{place || 'To be announced'}{address ? `, ${address}` : ''}</p>
            {ev.dressCode && <p className="ep-sans" style={{ fontSize: '3.7cqw' }}>{label('DRESS')}{ev.dressCode}</p>}
            <LinkButton href={maps} light={st.ink === '#F8F1E3'} disabledLabel="Directions soon">Get Directions</LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
