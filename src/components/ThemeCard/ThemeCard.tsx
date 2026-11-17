import { Link } from 'react-router-dom';
import type { ThemeEntry } from '../../data/themes';
import './ThemeCard.css';

export default function ThemeCard({ theme }: { theme: ThemeEntry }) {
  return (
    <article className="tcard">
      <div className="tcard__frame">
        <div className="tcard__arch">
          <img src={theme.preview} alt={`${theme.name} invitation preview`} loading="lazy" decoding="async" />
        </div>
        <span className="tcard__num" aria-hidden="true">{theme.number}</span>
      </div>
      <div className="tcard__body">
        <p className="tcard__cat">{theme.category}</p>
        <h3>{theme.name}</h3>
        <p>{theme.description}</p>
        <ul className="tcard__tags" aria-label="Style tags">{theme.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        <Link to={`/themes/${theme.id}`} className="btn btn--maroon">View Invitation <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
