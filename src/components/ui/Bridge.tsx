/** Soft colour hand-off between two non-pinned scenes so backgrounds never hard-cut. */
export default function Bridge({ from, to, className = '' }: { from: string; to: string; className?: string }) {
  return <div aria-hidden="true" className={`relative h-[16vh] md:h-[22vh] ${className}`} style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }} />;
}
