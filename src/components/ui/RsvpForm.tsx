import { useState, type FormEvent } from 'react';
import weddingData from '../../data/weddingData';

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function RsvpForm() {
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

    if (!endpoint) { setStatus('done'); return; } // no backend configured yet
    setStatus('sending');
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, attending: attending === 'yes', guests: attending === 'yes' ? guests : 0, message }) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return <p className="font-display text-2xl text-gold text-center py-8">Thank you — your response has been noted.</p>;
  }
  const inp = 'w-full bg-transparent border-b border-gold/50 py-3 text-lg text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold';
  return (
    <form onSubmit={submit} noValidate className="w-full max-w-md mx-auto text-left space-y-6">
      <div>
        <label htmlFor="rsvp-name" className="text-xs tracking-[0.3em] uppercase text-gold">Your name</label>
        <input id="rsvp-name" name="name" autoComplete="name" className={inp} aria-invalid={!!errors.name} />
        {errors.name && <p role="alert" className="text-sm text-[#ffb4a2] mt-1">{errors.name}</p>}
      </div>
      <fieldset>
        <legend className="text-xs tracking-[0.3em] uppercase text-gold mb-2">Will you attend?</legend>
        <div className="flex gap-3">
          {[['yes', 'Joyfully accept'], ['no', 'Regretfully decline']].map(([v, l]) => (
            <label key={v} className="flex-1 min-h-12 grid place-items-center border border-gold/50 text-sm cursor-pointer has-[:checked]:bg-gold has-[:checked]:text-midnight">
              <input type="radio" name="attending" value={v} className="sr-only" />{l}
            </label>
          ))}
        </div>
        {errors.attending && <p role="alert" className="text-sm text-[#ffb4a2] mt-1">{errors.attending}</p>}
      </fieldset>
      <div>
        <label htmlFor="rsvp-guests" className="text-xs tracking-[0.3em] uppercase text-gold">Number of guests</label>
        <input id="rsvp-guests" name="guests" type="number" min={1} max={10} defaultValue={1} inputMode="numeric" className={inp} />
        {errors.guests && <p role="alert" className="text-sm text-[#ffb4a2] mt-1">{errors.guests}</p>}
      </div>
      <div>
        <label htmlFor="rsvp-msg" className="text-xs tracking-[0.3em] uppercase text-gold">Message (optional)</label>
        <textarea id="rsvp-msg" name="message" rows={3} className={inp} />
        {errors.message && <p role="alert" className="text-sm text-[#ffb4a2] mt-1">{errors.message}</p>}
      </div>
      <button disabled={status === 'sending'} className="w-full min-h-12 border border-gold text-gold tracking-[0.35em] uppercase text-sm hover:bg-gold hover:text-midnight transition-colors disabled:opacity-50">
        {status === 'sending' ? 'Sending…' : 'Send RSVP'}
      </button>
      {status === 'error' && <p role="alert" className="text-sm text-[#ffb4a2]">Something went wrong. Please try again, or contact us directly.</p>}
    </form>
  );
}
