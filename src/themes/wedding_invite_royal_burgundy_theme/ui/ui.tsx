import { useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import weddingData from '../../../data/weddingData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { dateParts, formatTime, isValidUrl } from '../lib/dates';
import { music, useMusic } from '../lib/music';
import { CircularOrnament } from '../art/Mandala';

/** In-view reveal. */
export function Reveal({ children, delay = 0, y = 26, className, as = 'div' }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'span' }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M className={className} initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </M>
  );
}

export function LinkButton({ href, onClick, children, dark = false, disabledLabel }: { href?: string; onClick?: () => void; children: ReactNode; dark?: boolean; disabledLabel?: string }) {
  const cls = `rb-btn${dark ? ' rb-btn--dark' : ''}`;
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{children}</button>;
  if (!href || !isValidUrl(href)) return <span className={cls} aria-disabled="true">{disabledLabel ?? children}</span>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
}

/** MONTH / WEEKDAY | DD | TIME / YEAR */
export function DateBlock({ iso, time, className = '' }: { iso: string; time?: string; className?: string }) {
  const p = dateParts(iso);
  if (!p) return <p className={`rb-date__sm ${className}`}>Date to be announced</p>;
  return (
    <div className={`rb-date ${className}`}>
      <p className="rb-date__sm">{p.month}</p>
      <div className="rb-date__row"><span className="rb-date__side">{p.weekday}</span><span className="rb-date__day">{p.day}</span><span className="rb-date__side">{time ? `AT ${formatTime(time).toUpperCase()}` : 'TIME TBA'}</span></div>
      <p className="rb-date__sm">{p.year}</p>
    </div>
  );
}

/** Photograph slot; an ornate placeholder until `src` is configured. */
export function PhotoSlot({ src, alt, label, initial }: { src: string; alt: string; label: string; initial: string }) {
  return (
    <div className="rb-photo">
      {src ? <img src={src} alt={alt} loading="lazy" decoding="async" /> : <div className="rb-photo__ph"><b aria-hidden="true">{initial}</b>{label}<span style={{ opacity: .7 }}>photo to be added</span></div>}
    </div>
  );
}

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => { gsap.to(bar.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } }); });
  return <div ref={bar} className="rb-progress" aria-hidden="true" />;
}

export function MusicToggle() {
  const { playing, failed } = useMusic();
  return (
    <button className="rb-music" onClick={() => music.toggle()} aria-label={playing ? 'Pause music' : 'Play music'} aria-pressed={playing} title={failed ? `Add a music file at ${weddingData.music.src}` : playing ? 'Pause music' : 'Play music'}>
      <svg viewBox="0 0 24 24" style={{ opacity: failed ? 0.4 : 1 }}>{playing ? <path d="M6 4h4v16H6zm8 0h4v16h-4z" /> : <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z" />}</svg>
    </button>
  );
}

/** Opening card; the tap is the user gesture that lets music start. */
export function IntroOverlay({ onOpen }: { onOpen: () => void }) {
  const [gone, setGone] = useState(false);
  const { bride, groom } = weddingData;
  const go = (withMusic: boolean) => { if (withMusic) void music.play(); setGone(true); onOpen(); };
  if (gone) return null;
  return (
    <motion.div className="rb-intro" exit={{ opacity: 0 }}>
      <div className="rb-intro__card">
        <CircularOrnament variant="sun" className="" style={{ position: 'absolute', width: 120, height: 120, left: '50%', top: -60, transform: 'translateX(-50%)', color: '#D5AD55', opacity: 0.8 }} />
        <p className="rb-hi" style={{ color: '#D5AD55', fontSize: '1.2rem', marginTop: '.8rem' }} lang="sa">{weddingData.blessings.line1}</p>
        <p className="rb-eyebrow" style={{ marginTop: '1.4rem', fontSize: '.65rem' }}>You are invited to the wedding of</p>
        <h1 className="rb-script rb-gold-text" style={{ fontSize: '3.4rem', lineHeight: 1.1, marginTop: '.6rem' }}>{bride.firstName} &amp; {groom.firstName}</h1>
        <p className="rb-cap" style={{ color: '#F1D58B', marginTop: '.8rem', fontSize: '.85rem' }}>4 February 2027</p>
        <button id="open-invite" className="rb-btn" style={{ marginTop: '2rem', width: '100%', background: '#D5AD55', color: '#350719' }} onClick={() => go(true)}>Open invitation</button>
        <button className="rb-btn" style={{ marginTop: '.7rem', width: '100%', border: 0, fontSize: '.65rem', opacity: 0.75 }} onClick={() => go(false)}>Open without music</button>
      </div>
    </motion.div>
  );
}

type Status = 'idle' | 'sending' | 'done' | 'error';
export function RsvpForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { endpoint } = weddingData.rsvp;
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') ?? '').trim();
    const attending = String(f.get('attending') ?? '');
    const guests = Number(f.get('guests') ?? 1);
    const message = String(f.get('message') ?? '').trim();
    const errs: Record<string, string> = {};
    if (name.length < 2) errs.name = 'Please enter your name';
    if (!['yes', 'no'].includes(attending)) errs.attending = 'Please let us know if you can attend';
    if (attending === 'yes' && (!Number.isInteger(guests) || guests < 1 || guests > 10)) errs.guests = 'Guests must be between 1 and 10';
    if (message.length > 500) errs.message = 'Message is too long (500 max)';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!endpoint) { setStatus('done'); return; }
    setStatus('sending');
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, attending: attending === 'yes', guests: attending === 'yes' ? guests : 0, message }) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
    } catch { setStatus('error'); }
  }
  if (status === 'done') return <p className="rb-script rb-gold-text rb-center" style={{ fontSize: '2.6rem', padding: '2rem 0' }}>Thank you — your response has been noted.</p>;
  return (
    <form onSubmit={submit} noValidate style={{ width: '100%', maxWidth: '28rem', margin: '0 auto', textAlign: 'left', display: 'grid', gap: '1.4rem' }}>
      <div><label className="rb-label" htmlFor="rb-name">Your name</label><input id="rb-name" name="name" autoComplete="name" className="rb-field" aria-invalid={!!errors.name} />{errors.name && <p role="alert" className="rb-err">{errors.name}</p>}</div>
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="rb-label" style={{ marginBottom: '.5rem' }}>Will you attend?</legend>
        <div style={{ display: 'flex', gap: '.7rem' }}>{[['yes', 'Joyfully accept'], ['no', 'Regretfully decline']].map(([v, l]) => <label key={v} className="rb-choice"><input type="radio" name="attending" value={v} style={{ position: 'absolute', opacity: 0 }} />{l}</label>)}</div>
        {errors.attending && <p role="alert" className="rb-err">{errors.attending}</p>}
      </fieldset>
      <div><label className="rb-label" htmlFor="rb-guests">Number of guests</label><input id="rb-guests" name="guests" type="number" min={1} max={10} defaultValue={1} inputMode="numeric" className="rb-field" />{errors.guests && <p role="alert" className="rb-err">{errors.guests}</p>}</div>
      <div><label className="rb-label" htmlFor="rb-msg">Message (optional)</label><textarea id="rb-msg" name="message" rows={3} className="rb-field" />{errors.message && <p role="alert" className="rb-err">{errors.message}</p>}</div>
      <button disabled={status === 'sending'} className="rb-btn" style={{ width: '100%' }}>{status === 'sending' ? 'Sending…' : 'Send RSVP'}</button>
      {status === 'error' && <p role="alert" className="rb-err">Something went wrong. Please try again, or contact us directly.</p>}
    </form>
  );
}

/** Expanding mandala transition between scenes: a ring blooms from the centre of a colour-to-colour gradient. */
export function MandalaBridge({ from, to }: { from: string; to: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.rb-bridge__m', { scale: 0.2, rotation: 0, opacity: 0 }, { scale: 2.6, rotation: 120, opacity: 0.9, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    return () => mm.revert();
  }, { scope: ref });
  return (
    <div ref={ref} aria-hidden="true" style={{ position: 'relative', height: '26vh', overflow: 'hidden', background: `linear-gradient(${from}, ${to})`, color: '#D5AD55' }}>
      <div className="rb-bridge__m" style={{ position: 'absolute', left: '50%', top: '50%', width: 220, height: 220, margin: '-110px 0 0 -110px', opacity: 0 }}><CircularOrnament variant="sun" style={{ width: '100%', height: '100%' }} /></div>
    </div>
  );
}
