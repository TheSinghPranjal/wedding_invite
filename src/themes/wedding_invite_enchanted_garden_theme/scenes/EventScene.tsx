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
    tl.fromTo('.tg-ev-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25 }, 0.05)
      .fromTo('.tg-ev-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.2)
      .fromTo('.tg-ev-info > *', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.15, stagger: 0.07 }, 0.4)
      .fromTo('.tg-henna .tg-draw, .tg-ev-hero .tg-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6 }, 0.05)
      .to('.tg-layer', { y: (_i, el: HTMLElement) => -Number(el.dataset.depth) * 30, duration: 0.4 }, 0.72);
  }, {
    end: '+=150%',
    entrance: (a) => {
      gsap.fromTo('.tg-layer', { opacity: 0, y: (_i, el: HTMLElement) => 80 + Number(el.dataset.depth) * 160 }, { opacity: 1, y: 0, ease: 'power2.out', stagger: 0.03, scrollTrigger: a });
      gsap.fromTo('.tg-ev-hero', { scale: 0.88 }, { scale: 1, ease: 'power2.out', scrollTrigger: a });
      gsap.fromTo('.tg-mandap', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', ease: 'power1.out', scrollTrigger: a });
    },
  });

  const Art = st.Art;
  const serif = st.chapter === 'botanical' ? 'tg-gilda' : 'tg-ceremony';
  const label = (t: string) => <b className="tg-pop" style={{ fontSize: '2.6cqw', color: st.accent, marginRight: '.7em', letterSpacing: '.2em' }}>{t}</b>;
  return (
    <section id={`tg-event-${ev.id}`} ref={root} className="tg-scene tg-paper" data-event={ev.id} data-index={index} style={{ color: st.ink }}>
      <div className="tg-stage" style={{ background: st.bg }}>
        {ev.image && <img src={ev.image} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />}
        <div className="tg-board" style={{ ['--db' as string]: st.detailsBottom }}>
          <Art />
          <div className="tg-text" style={{ top: st.titleTop }}>
            <p className="tg-ev-title" style={{ marginTop: 0 }}><span className={serif} style={{ fontSize: st.title.length > 18 ? '8cqw' : '10cqw', color: st.light ? st.accent : '#FFF1F3', display: 'block', textTransform: st.chapter === 'botanical' ? 'uppercase' : undefined, letterSpacing: st.chapter === 'botanical' ? '.08em' : undefined }}>{st.title}</span></p>
            {isWedding && <p className="tg-ev-tag tg-gilda" style={{ fontSize: '7cqw', marginTop: '1.5cqw', letterSpacing: '.06em' }}>{bride.firstName.toUpperCase()} &amp; {groom.firstName.toUpperCase()}<span className="tg-pop" style={{ display: 'block', fontSize: '3.4cqw', color: st.accent, marginTop: '1.4cqw' }}>{brandDate()}</span></p>}
            {st.tagline && <p className="tg-ev-tag tg-pop" style={{ fontSize: '2.9cqw', marginTop: '2.4cqw', lineHeight: 1.6, maxWidth: '76cqw', marginInline: 'auto', opacity: 0.92 }}>{st.tagline}</p>}
          </div>
          <div className="tg-ev-info tg-center" style={{ position: 'absolute', left: 0, right: 0, bottom: st.detailsBottom, zIndex: 7, padding: '0 6cqw', display: 'grid', gap: '1.8cqw', justifyItems: 'center' }}>
            <p style={{ fontSize: '4cqw', lineHeight: 1.4 }}>{label('DATE')}{ev.date ? `${formatWeekday(ev.date)}, ${formatLongDate(ev.date)}` : 'To be announced'}</p>
            <p style={{ fontSize: '4cqw', lineHeight: 1.4 }}>{label('TIME')}{timeText(ev)}</p>
            <p style={{ fontSize: '4cqw', lineHeight: 1.4, maxWidth: '84cqw' }}>{label('VENUE')}{place || 'To be announced'}{address ? `, ${address}` : ''}</p>
            {ev.dressCode && <p style={{ fontSize: '4cqw' }}>{label('DRESS')}{ev.dressCode}</p>}
            <LinkButton href={maps} dark={st.light} disabledLabel="Directions soon">Get Directions</LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
