/** Divider with a lotus-like centre motif. */
export default function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`orn ${className}`} aria-hidden="true">
      <span /><svg viewBox="0 0 40 24" width="40" height="24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M20 2c4 5 4 12 0 20-4-8-4-15 0-20z" /><path d="M20 22C12 20 6 14 4 8c8 0 14 4 16 14z" /><path d="M20 22c8-2 14-8 16-14-8 0-14 4-16 14z" />
      </svg><span />
    </div>
  );
}
