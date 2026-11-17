import type { CSSProperties } from 'react';

export type OutfitKey = 'wedding' | 'haldi' | 'mehendi' | 'sangeet' | 'reception' | 'engagement';
interface Outfit { lehenga: string; trim: string; blouse: string; dupatta: string; sherwani: string; stole: string; pants: string; turban: string }

export const outfits: Record<OutfitKey, Outfit> = {
  wedding:    { lehenga: '#F3E2BC', trim: '#8E1B2E', blouse: '#9C2A3C', dupatta: '#E9A596', sherwani: '#CDB48A', stole: '#8E1B2E', pants: '#D8C7A2', turban: '#C23A4A' },
  haldi:      { lehenga: '#F6D24A', trim: '#E07A1F', blouse: '#FFF2C8', dupatta: '#FFF6DC', sherwani: '#FFF6E2', stole: '#F2A41E', pants: '#FFF6E2', turban: '#F2A41E' },
  mehendi:    { lehenga: '#2E7D4F', trim: '#D5AD55', blouse: '#E8C97A', dupatta: '#A8D58A', sherwani: '#E5D9B8', stole: '#2E7D4F', pants: '#E5D9B8', turban: '#2E7D4F' },
  sangeet:    { lehenga: '#5B1E6E', trim: '#D5AD55', blouse: '#8E2A5C', dupatta: '#D9588A', sherwani: '#2C1740', stole: '#D5AD55', pants: '#2C1740', turban: '#8E2A5C' },
  reception:  { lehenga: '#F1E4C8', trim: '#C9A24C', blouse: '#E9D5A5', dupatta: '#F8EFDC', sherwani: '#2B1A1F', stole: '#C9A24C', pants: '#2B1A1F', turban: '#2B1A1F' },
  engagement: { lehenga: '#E9A8A4', trim: '#D5AD55', blouse: '#F4C9C0', dupatta: '#F8E4DE', sherwani: '#33405E', stole: '#D5AD55', pants: '#33405E', turban: '#33405E' },
};

const SKIN = '#E2B08A', HAIR = '#2A1612';

/** Flat-style illustrated bride & groom (faceless, after the reference invitations). One consistent drawing, recoloured per event. */
export default function Couple({ variant = 'wedding', only, henna = false, className = '', style }: { variant?: OutfitKey; only?: 'bride' | 'groom'; henna?: boolean; className?: string; style?: CSSProperties }) {
  const o = outfits[variant];
  const dots = Array.from({ length: 24 }, (_, i) => ({ x: 130 + ((i * 53) % 150), y: 250 + Math.floor((i * 37) % 150) }));
  const groom = (
    <g>
      <path d="M82 262h46l-3 156h-15l-5-120-5 120H85z" fill={o.pants} /><ellipse cx="94" cy="422" rx="14" ry="6" fill="#5A3A22" /><ellipse cx="120" cy="422" rx="14" ry="6" fill="#5A3A22" />
      <path d="M66 126c0-10 16-14 40-14s40 4 40 14l6 160H60z" fill={o.sherwani} />
      <path d="M106 112v174" stroke="#B89A66" strokeWidth="1.5" />{[140, 164, 188, 212, 236].map((y) => <circle key={y} cx="106" cy={y} r="2.8" fill="#D5AD55" />)}
      <path d="M92 112l14 22 14-22" fill="#E9DDBF" stroke="#B89A66" strokeWidth="1" />
      <path d="M68 124l24-6 16 170-24 6zM146 124l-24-6-16 170 24 6z" fill={o.stole} opacity=".96" />
      <path d="M96 118c-14 40-18 110-14 170" stroke="#D5AD55" strokeWidth="1.2" fill="none" /><path d="M122 118c14 40 18 110 14 170" stroke="#D5AD55" strokeWidth="1.2" fill="none" />
      <rect x="98" y="96" width="16" height="22" fill={SKIN} /><ellipse cx="106" cy="82" rx="17" ry="21" fill={SKIN} />
      <path d="M88 78c-2-18 12-26 20-26 12 0 20 10 18 26-4-8-12-12-20-12s-14 4-18 12z" fill={HAIR} />
      <path d="M126 66c8 6 10 16 6 26" stroke={HAIR} strokeWidth="3" fill="none" />
      <path d="M84 132c-10 30-8 60 4 84h16l-6-84z" fill={o.sherwani} /><circle cx="116" cy="214" r="6" fill={SKIN} />
    </g>
  );
  const bride = (
    <g>
      <path d="M160 206c-8 90-36 170-56 220h196c-22-52-48-130-62-220z" fill={o.lehenga} />
      <path d="M104 410q98 22 196 0v16H104z" fill={o.trim} />
      <path d="M118 380q80 18 168 0M134 340q64 14 136 0" stroke={o.trim} strokeWidth="3" fill="none" strokeDasharray="1 7" strokeLinecap="round" />
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="2.2" fill={o.trim} opacity=".55" />)}
      <path d="M170 134c0-8 12-12 28-12s28 4 28 12l4 70h-64z" fill={o.blouse} />
      <path d="M168 190h64v18h-64z" fill={SKIN} /><path d="M166 204q34 10 68 0l-4 12h-60z" fill={o.trim} />
      <rect x="190" y="104" width="14" height="22" fill={SKIN} /><ellipse cx="197" cy="90" rx="16" ry="20" fill={SKIN} />
      <path d="M180 86c-4-18 10-26 18-26 12 0 20 8 16 28-4-8-10-14-18-14s-12 4-16 12z" fill={HAIR} /><path d="M180 90c-4 24 2 44 10 56l-8-6c-8-14-10-36-2-50z" fill={HAIR} />
      <circle cx="197" cy="72" r="2.4" fill="#C2253A" /><path d="M197 62v8" stroke="#D5AD55" strokeWidth="1.4" />
      <path d="M184 134q13 20 26 0" stroke="#D5AD55" strokeWidth="2.6" fill="none" /><circle cx="197" cy="150" r="3" fill="#D5AD55" />
      <path d="M178 76c-12 6-18 24-14 54 4 40 2 86-4 140l12 8c8-60 12-110 10-150 0-26 4-40 10-52z" fill={o.dupatta} opacity=".78" stroke={o.trim} strokeWidth="1.6" />
      <path d="M210 76c14 6 22 24 20 60-2 50 4 100 18 150l-12 6c-14-50-22-100-22-150 0-28 0-44-6-58z" fill={o.dupatta} opacity=".7" stroke={o.trim} strokeWidth="1.2" />
      <path d="M172 140c-14 28-14 52-8 70l14 2c-2-20 0-44 10-66z" fill={o.blouse} /><circle cx="138" cy="214" r="6" fill={SKIN} />
      {henna && <path d="M132 212q6-8 12 0M134 216q4-6 8 0" stroke="#7A2E14" strokeWidth="1.4" fill="none" />}
      <path d="M146 208q14 2 24-4" stroke="#D5AD55" strokeWidth="3" fill="none" strokeDasharray="3 3" />
    </g>
  );
  const vb = only === 'bride' ? '100 40 210 400' : only === 'groom' ? '50 40 130 400' : '40 40 270 400';
  return (
    <svg viewBox={vb} className={className} style={style} aria-hidden="true" focusable="false">
      {only !== 'bride' && groom}{only !== 'groom' && bride}
    </svg>
  );
}
