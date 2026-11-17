import type { CSSProperties } from 'react';

/** Gold foil Ganesha profile with curled trunk (after reference 4). Fill uses the shared gold gradient. */
export function Ganesha({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 220 260" className={className} style={style} aria-hidden="true" focusable="false">
      <g fill="url(#rbGold)">
        {/* crown */}
        <path d="M108 6c5 6 5 12 0 18-5-6-5-12 0-18z" />
        <path d="M92 40c3-9 9-14 16-14s13 5 16 14z" /><path d="M80 58c2-9 12-15 28-15s26 6 28 15z" />
        <path d="M70 72c8-8 24-12 40-12 18 0 34 4 44 14-10-3-24-5-44-5s-30 1-40 3z" />
        <path d="M66 62c-8-4-10-12-4-17 6 1 9 5 9 10zM152 62c8-4 12-10 8-17-6 0-10 4-11 9z" />
        {/* ear */}
        <path d="M70 84C44 82 24 100 22 128c-1 22 12 42 32 44 12 0 18-10 18-22-2-26-4-52-2-66z" />
        {/* head + face */}
        <path d="M72 84c20-10 56-8 76 6 12 10 14 26 8 40-4 10-4 18-6 30-4 18-18 24-34 20-12-3-18-12-18-26 0-8-6-14-8-22-4-16-4-36-18-48z" />
        {/* trunk */}
        <path d="M118 120c8 30 14 56 4 82-8 20-30 34-54 28-18-5-22-26-8-34 12-6 26 0 26 14 0 8-8 10-12 6" fill="none" stroke="url(#rbGoldV)" strokeWidth="19" strokeLinecap="round" />
        {/* tusk + curls */}
        <path d="M144 128c14 4 28-2 38-14 6-8 4-18-6-18-8 0-10 8-4 12" fill="none" stroke="url(#rbGoldV)" strokeWidth="6" strokeLinecap="round" />
        <path d="M44 200c-12-4-20 6-14 16 6 8 18 4 16-6M40 218c-8 8-4 20 10 22 12 2 22-8 20-18M168 196c14-6 24 6 18 16-6 8-18 4-16-6M176 214c8 8 4 20-10 22" fill="none" stroke="url(#rbGoldV)" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g fill="none" stroke="#350719" strokeLinecap="round" strokeWidth="3">
        <path d="M60 100c12-4 14 10 8 22M84 90c-10 10-12 30-6 44" opacity=".85" />
        <path d="M110 98c10-6 22-4 30 4" /><path d="M92 76c14-6 38-6 54 2M86 66c16-6 44-6 62 2" strokeWidth="2" opacity=".8" />
        <path d="M118 112c-6 4-12 4-16 0" strokeWidth="2" />
        <path d="M92 52c10-6 20-6 30 0M98 36c6-4 12-4 18 0" strokeWidth="2" />
      </g>
    </svg>
  );
}

/** Calligraphic gold scroll corner (spirals + sprigs) after references 4. Draws top-left; rotate for other corners. */
export function ScrollCorner({ className = '', style, draw = false }: { className?: string; style?: CSSProperties; draw?: boolean }) {
  return (
    <svg viewBox="0 0 160 160" className={className} style={style} fill="none" stroke="url(#rbGold)" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" focusable="false">
      <g className={draw ? 'rb-draw' : undefined}>
        <path d="M6 150C6 70 50 8 150 6" /><path d="M16 150C16 84 58 20 150 16" strokeWidth="1.2" />
        <path d="M38 36c-12-6-24 2-22 14 2 10 16 12 20 4s-4-12-8-8" /><path d="M72 18c-6-12-22-10-26 2-3 10 8 18 16 12s2-14-4-12" />
        <path d="M24 88c-12 0-20 10-14 20 5 8 18 4 16-6" /><path d="M96 10c14 6 26 4 38 14" />
        <path d="M30 60c8-4 18-2 24 6M12 118c8-8 6-20 12-28" /><path d="M54 30c10 2 20 8 24 18M110 22c-4 10-12 16-22 18" />
        <path d="M44 62c4-8 10-12 18-12-2 8-8 14-18 12zM74 42c4-6 10-8 16-6-2 6-8 10-16 6z" fill="url(#rbGold)" stroke="none" />
      </g>
    </svg>
  );
}


/** Scalloped ogee-style arch outline path in a w×h box (used for the invitation panels). */
export function scallopArchPath(w: number, h: number, n = 13): string {
  const r = w / 2 - 4, cx = w / 2, cy = r + 34;
  const pts = Array.from({ length: n + 1 }, (_, i) => { const a = Math.PI - (i * Math.PI) / n; return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; });
  const sr = (Math.PI * r) / n / 1.55;
  let d = `M${pts[0][0]} ${h} L${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i <= n; i++) d += ` A${sr} ${sr} 0 0 1 ${pts[i][0]} ${pts[i][1]}`;
  return d + ` L${pts[n][0]} ${h}Z`;
}

/** Repeating scalloped border band (after reference 5). */
export function ScallopBand({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="100%" height="46" aria-hidden="true" focusable="false">
      <rect width="100%" height="46" y="0" fill="url(#rbScal)" /><rect y="40" width="100%" height="3" fill="url(#rbGold)" />
    </svg>
  );
}

/** Hanging glowing lantern on a chain. */
export function Lantern({ className = '', chain = 320, style }: { className?: string; chain?: number; style?: CSSProperties }) {
  return (
    <svg viewBox={`0 0 70 ${chain + 150}`} className={className} style={style} aria-hidden="true" focusable="false">
      <line x1="35" y1="0" x2="35" y2={chain} stroke="#D5AD55" strokeWidth="2" strokeDasharray="4 3" />
      <g transform={`translate(0 ${chain})`}>
        <circle cx="35" cy="40" r="46" fill="url(#rbGlow)" className="rb-pulse" />
        <path d="M35 0v12M24 24c0-8 22-8 22 0z" stroke="url(#rbGold)" strokeWidth="3" fill="url(#rbGold)" />
        <path d="M18 28h34l4 8v62l-4 8H18l-4-8V36z" fill="url(#rbLamp)" stroke="url(#rbGold)" strokeWidth="3" />
        <path d="M26 32v72M44 32v72" stroke="#A57B30" strokeWidth="2" opacity=".6" />
        <path d="M12 104h46l-6 12H18zM30 116l5 22 5-22z" fill="url(#rbGold)" />
      </g>
    </svg>
  );
}

/** Om glyph (text, rendered in Devanagari font). */
export const Om = ({ className = '' }: { className?: string }) => <span className={`rb-om ${className}`} lang="sa">ॐ</span>;
