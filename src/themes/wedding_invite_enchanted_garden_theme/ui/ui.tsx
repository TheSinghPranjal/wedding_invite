import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import weddingData from '../../../data/weddingData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { dateParts, isValidUrl } from '../lib/dates';
import { music, useMusic } from '../lib/music';
import { BotanicalOrbit } from '../art/Orbit';

/** In-view reveal (Framer Motion owns opacity/transform of its own wrapper only). */
export function Reveal({ children, delay = 0, y = 26, className, style }: { children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} style={style} initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function LinkButton({ href, onClick, children, dark = false, disabledLabel }: { href?: string; onClick?: () => void; children: ReactNode; dark?: boolean; disabledLabel?: string }) {
  const cls = `tg-btn${dark ? ' tg-btn--dark' : ''}`;
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{children}</button>;
  if (!href || !isValidUrl(href)) return <span className={cls} aria-disabled="true">{disabledLabel ?? children}</span>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
}

/** Curly white/gold divider. */
export function Flourish({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 260 26" className={`tg-divider ${className}`} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M8 14H88c10 0 14-8 22-8 9 0 10 9 3 10-6 1-8-6-3-7M252 14H172c-10 0-14-8-22-8-9 0-10 9-3 10 6 1 8-6 3-7" /><path d="M110 12c8 6 12 8 20 8s12-2 20-8M118 9c4-5 8-5 12 0 4-5 8-5 12 0" />
    </svg>
  );
}

export function DateLine({ iso }: { iso: string }) {
  const p = dateParts(iso);
  return <>{p ? `${p.day} ${p.month} ${p.year}` : 'Date to be announced'}</>;
}

export function PhotoSlot({ src, alt, label, initial }: { src: string; alt: string; label: string; initial: string }) {
  return <div className="tg-photo">{src ? <img src={src} alt={alt} loading="lazy" decoding="async" /> : <div className="tg-photo__ph"><b aria-hidden="true">{initial}</b>{label}<span style={{ opacity: .7 }}>photo to be added</span></div>}</div>;
}

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => { gsap.to(bar.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } }); });
  return <div ref={bar} className="tg-progress" aria-hidden="true" />;
}

export function MusicToggle() {
  const { playing, failed } = useMusic();
  return (
    <button className="tg-music" onClick={() => music.toggle()} aria-label={playing ? 'Pause music' : 'Play music'} aria-pressed={playing} title={failed ? `Add a music file at ${weddingData.music.src}` : playing ? 'Pause music' : 'Play music'}>
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
    <div className="tg-intro">
      <div style={{ position: 'relative', width: 'min(100%,24rem)', textAlign: 'center', padding: '2.6rem 1.6rem', border: '1px solid rgba(255,246,230,.6)', borderRadius: 28, background: 'rgba(60,7,22,.28)' }}>
        <BotanicalOrbit kind="festive" style={{ position: 'absolute', width: 130, height: 130, left: '50%', top: -66, transform: 'translateX(-50%)' }} />
        <p className="tg-pop" style={{ marginTop: '1.4rem', fontSize: '.62rem', color: '#F7C52D' }}>You are warmly invited</p>
        <h1 className="tg-ceremony" style={{ fontSize: '2.6rem', marginTop: '.6rem', color: '#FFF1F3' }}>{bride.firstName} <span className="tg-script tg-gold" style={{ fontSize: '2.6rem' }}>&amp;</span> {groom.firstName}</h1>
        <button id="open-invite" className="tg-btn" style={{ marginTop: '1.8rem', width: '100%', background: '#F7C52D', color: '#5A0C22', borderColor: '#F7C52D' }} onClick={() => go(true)}>Open invitation</button>
        <button className="tg-btn" style={{ marginTop: '.6rem', width: '100%', border: 0, fontSize: '.62rem', opacity: 0.8 }} onClick={() => go(false)}>Open without music</button>
      </div>
    </div>
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
  if (status === 'done') return <p className="tg-script" style={{ fontSize: '2.8rem', padding: '1.5rem 0', textAlign: 'center', color: '#6B3A22' }}>Thank you — your response has been noted.</p>;
  return (
    <form onSubmit={submit} noValidate style={{ width: '100%', textAlign: 'left', display: 'grid', gap: '1.2rem', color: '#3B2A20' }}>
      <div><label className="tg-label" htmlFor="tg-name">Your name</label><input id="tg-name" name="name" autoComplete="name" className="tg-field" aria-invalid={!!errors.name} />{errors.name && <p role="alert" className="tg-err">{errors.name}</p>}</div>
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="tg-label" style={{ marginBottom: '.5rem' }}>Will you attend?</legend>
        <div style={{ display: 'flex', gap: '.6rem' }}>{[['yes', 'Joyfully accept'], ['no', 'Regretfully decline']].map(([v, l]) => <label key={v} className="tg-choice"><input type="radio" name="attending" value={v} style={{ position: 'absolute', opacity: 0 }} />{l}</label>)}</div>
        {errors.attending && <p role="alert" className="tg-err">{errors.attending}</p>}
      </fieldset>
      <div><label className="tg-label" htmlFor="tg-guests">Number of guests</label><input id="tg-guests" name="guests" type="number" min={1} max={10} defaultValue={1} inputMode="numeric" className="tg-field" />{errors.guests && <p role="alert" className="tg-err">{errors.guests}</p>}</div>
      <div><label className="tg-label" htmlFor="tg-msg">Message (optional)</label><textarea id="tg-msg" name="message" rows={3} className="tg-field" />{errors.message && <p role="alert" className="tg-err">{errors.message}</p>}</div>
      <button disabled={status === 'sending'} className="tg-btn tg-btn--dark" style={{ width: '100%' }}>{status === 'sending' ? 'Sending…' : 'Send RSVP'}</button>
      {status === 'error' && <p role="alert" className="tg-err">Something went wrong. Please try again, or contact us directly.</p>}
    </form>
  );
}

/** Expanding circular wipe: the next scene's colour grows out of a rotating floral ring, covering the previous one. */
export function CircleWipe({ from, to, fromSide = 'right', kind = 'festive' }: { from: string; to: string; fromSide?: 'left' | 'right'; kind?: 'festive' | 'pink' | 'leaf' | 'gold' | 'concentric' }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const st = { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true };
      gsap.fromTo('.tg-wipe__c', { scale: 0.04 }, { scale: 1, ease: 'none', scrollTrigger: st });
      gsap.fromTo('.tg-wipe__r', { scale: 0.04, rotation: 0 }, { scale: 1, rotation: fromSide === 'right' ? -140 : 140, ease: 'none', scrollTrigger: st });
    });
    return () => mm.revert();
  }, { scope: ref });
  const D = '140vmax';
  const pos: CSSProperties = { position: 'absolute', top: '50%', [fromSide]: '0', width: D, height: D, margin: `calc(${D} / -2) 0 0 0`, transform: `translateX(${fromSide === 'right' ? '50%' : '-50%'})` };
  return (
    <div ref={ref} aria-hidden="true" style={{ position: 'relative', height: '70svh', overflow: 'hidden', background: from }}>
      <div style={{ ...pos, display: 'grid', placeItems: 'center' }}><div className="tg-wipe__c" style={{ width: '100%', height: '100%', borderRadius: '50%', background: to }} /></div>
      <div style={{ ...pos, display: 'grid', placeItems: 'center', color: '#D5AD55' }}><div className="tg-wipe__r" style={{ width: '112%', height: '112%' }}><BotanicalOrbit kind={kind} style={{ width: '100%', height: '100%' }} /></div></div>
    </div>
  );
}
