import type { ReactNode } from 'react';
import { isValidUrl } from '../../lib/dates';

interface Props {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  tone?: 'gold' | 'dark' | 'ivory';
  disabledLabel?: string;
}

const tones = {
  gold: 'border-gold text-gold hover:bg-gold hover:text-midnight',
  dark: 'border-midnight/70 text-midnight hover:bg-midnight hover:text-ivory',
  ivory: 'border-ivory/70 text-ivory hover:bg-ivory hover:text-midnight',
};

export default function LinkButton({ href, onClick, children, tone = 'gold', disabledLabel }: Props) {
  const cls = `inline-flex items-center justify-center min-h-12 px-7 border text-[0.78rem] tracking-[0.3em] uppercase transition-colors duration-300 ${tones[tone]}`;
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{children}</button>;
  if (!href || !isValidUrl(href)) {
    return <span className={`${cls} opacity-45 cursor-not-allowed hover:!bg-transparent`} aria-disabled="true">{disabledLabel ?? children}</span>;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
}
