import type { CSSProperties } from 'react';

import palaceUrl from '../../assets/palace.jpg';
export const PALACE_SRC = palaceUrl;

/** Illuminated palace artwork (assets/palace.jpg). Cropped by its container via object-fit. */
export default function Palace({ className = '', style, position = '50% 100%' }: { className?: string; style?: CSSProperties; position?: string }) {
  return (
    <img
      src={PALACE_SRC}
      alt=""
      aria-hidden="true"
      decoding="async"
      draggable={false}
      className={`object-cover select-none ${className}`}
      style={{ objectPosition: position, ...style }}
    />
  );
}
