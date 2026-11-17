import { music, useMusic } from '../../lib/music';
import weddingData from '../../data/weddingData';

export default function MusicToggle() {
  const { playing, failed } = useMusic();
  return (
    <button
      onClick={() => music.toggle()}
      className="fixed bottom-5 right-5 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full border border-gold bg-midnight/70 backdrop-blur grid place-items-center hover:scale-105 transition-transform"
      aria-label={playing ? 'Pause music' : 'Play music'}
      aria-pressed={playing}
      title={failed ? `Add a music file at ${weddingData.music.src}` : playing ? 'Pause music' : 'Play music'}
    >
      {playing && <span className="absolute inset-0 rounded-full border border-gold/60 animate-ping" />}
      <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-gold ${failed ? 'opacity-40' : ''}`}>
        {playing ? <path d="M6 4h4v16H6zm8 0h4v16h-4z" /> : <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z" />}
      </svg>
    </button>
  );
}
