import type { CSSProperties } from 'react';

export const PALACE_SRC = '/images/palace.jpg';

/** Illuminated palace artwork (public/images/palace.jpg). Cropped by its container via object-fit. */
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
