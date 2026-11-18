import weddingData from '../../../data/weddingData';

const IST_OFFSET = '+05:30';

/** Absolute instant of the wedding. Uses ceremonyTime if set, else 00:00 of the wedding day. Timezone fixed to Asia/Kolkata. */
export function getWeddingInstant(): Date {
  const { weddingDate, ceremonyTime, timezone } = weddingData;
  const time = /^\d{2}:\d{2}$/.test(ceremonyTime) ? ceremonyTime : '00:00';
  // Asia/Kolkata has no DST, so a fixed offset is exact.
  const offset = timezone === 'Asia/Kolkata' ? IST_OFFSET : 'Z';
  return new Date(`${weddingDate}T${time}:00${offset}`);
}

export function formatLongDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00${IST_OFFSET}`);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

export function formatWeekday(iso: string): string {
  if (!iso) return '';
  return new Date(`${iso}T12:00:00${IST_OFFSET}`).toLocaleDateString('en-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' });
}

/** "04 FEBRUARY 2027" */
export function brandDate(): string {
  const d = getWeddingInstant();
  const day = d.toLocaleDateString('en-IN', { day: '2-digit', timeZone: 'Asia/Kolkata' });
  const month = d.toLocaleDateString('en-IN', { month: 'long', timeZone: 'Asia/Kolkata' }).toUpperCase();
  const year = d.toLocaleDateString('en-IN', { year: 'numeric', timeZone: 'Asia/Kolkata' });
  return `${day} ${month} ${year}`;
}

export function isValidUrl(u: string): boolean {
  return /^https?:\/\//i.test(u);
}

const pad = (n: number) => String(n).padStart(2, '0');

/** .ics content for the wedding. Venue included only when configured. */
export function buildIcs(): string {
  const { bride, groom, venue, ceremonyTime, weddingDate } = weddingData;
  const title = `Wedding of ${bride.firstName} & ${groom.firstName}`;
  const ymd = weddingDate.replace(/-/g, '');
  const location = [venue.name, venue.address, venue.city].filter(Boolean).join(', ');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invite//EN', 'BEGIN:VEVENT',
    `UID:${ymd}-${bride.firstName}-${groom.firstName}@wedding-invite`.toLowerCase(),
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`];
  if (/^\d{2}:\d{2}$/.test(ceremonyTime)) {
    const start = getWeddingInstant();
    const end = new Date(start.getTime() + 3 * 3600 * 1000);
    const f = (d: Date) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
    lines.push(`DTSTART:${f(start)}`, `DTEND:${f(end)}`);
  } else {
    const next = new Date(Date.UTC(+weddingDate.slice(0, 4), +weddingDate.slice(5, 7) - 1, +weddingDate.slice(8, 10) + 1));
    lines.push(`DTSTART;VALUE=DATE:${ymd}`, `DTEND;VALUE=DATE:${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}`);
  }
  lines.push(`SUMMARY:${title}`);
  if (location) lines.push(`LOCATION:${location.replace(/,/g, '\\,')}`);
  if (isValidUrl(venue.mapsUrl)) lines.push(`DESCRIPTION:Directions: ${venue.mapsUrl}`);
  lines.push('END:VEVENT', 'END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wedding.ics';
  a.click();
  URL.revokeObjectURL(url);
}

/** { month: 'JANUARY', weekday: 'SUNDAY', day: '07', year: '2030' } from an ISO date, or null. */
export function dateParts(iso: string) {
  if (!iso) return null;
  const d = new Date(`${iso}T12:00:00${IST_OFFSET}`);
  const f = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString('en-IN', { ...o, timeZone: 'Asia/Kolkata' });
  return { month: f({ month: 'long' }).toUpperCase(), weekday: f({ weekday: 'long' }).toUpperCase(), day: f({ day: '2-digit' }), year: f({ year: 'numeric' }) };
}

/** '19:30' -> '7:30 PM'; other free text is returned untouched. */
export function formatTime(t: string): string {
  const m = /^(\d{2}):(\d{2})$/.exec(t);
  if (!m) return t;
  const h = +m[1];
  return `${((h + 11) % 12) + 1}:${m[2]} ${h >= 12 ? 'PM' : 'AM'}`;
}
