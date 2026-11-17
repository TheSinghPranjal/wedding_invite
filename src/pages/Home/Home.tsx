import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ThemeCard from '../../components/ThemeCard/ThemeCard';
import Mandala from '../../components/common/Mandala';
import Ornament from '../../components/common/Ornament';
import { themes } from '../../data/themes';
import './Home.css';

const features = [
  { icon: '🪔', title: 'Beautiful Indian Themes', text: 'Palace-inspired designs steeped in Rajasthani, Mughal and temple artistry.' },
  { icon: '✍️', title: 'Personalised Details', text: 'Names, events, venues and blessings flow from a single wedding configuration.' },
  { icon: '📱', title: 'Made for Every Screen', text: 'Graceful on phones, tablets and desktops, so every guest sees it at its best.' },
  { icon: '✨', title: 'Elegant Animations', text: 'Lanterns, falling petals and scroll-told scenes that feel like unfolding a card.' },
  { icon: '💌', title: 'A Memorable Experience', text: 'Countdown, venue, love story and RSVP in one invitation your guests will treasure.' },
];

export default function Home() {
  const featured = themes[0];
  return (
    <div className="home">
      <Navbar />
      <main>
        <section className="hero">
          <Mandala className="hero__mandala hero__mandala--a" />
          <Mandala className="hero__mandala hero__mandala--b" />
          <div className="hero__copy">
            <p className="hero__shloka lang-hi" lang="hi">॥ शुभ विवाह ॥</p>
            <h1>Your Love Story Deserves a <span>Royal Beginning</span></h1>
            <p className="hero__lead">Discover beautifully crafted digital wedding invitations inspired by India's timeless traditions. Celebrate your special moments with invitations as unforgettable as your love story.</p>
            <div className="hero__cta">
              <Link to="/#themes" className="btn btn--maroon">Explore Invitation Themes</Link>
              <Link to="/#why" className="btn btn--ghost">Discover Our Story</Link>
            </div>
          </div>
          <div className="hero__art" aria-hidden="true">
            <div className="hero__arch"><img src={featured.preview} alt="" /></div>
            <div className="hero__card hero__card--phone">
              <span>Save the Date</span><b>Rati &amp; Pranjal</b><i>4 · 02 · 2027</i>
            </div>
            <div className="hero__card hero__card--note"><span>॥ श्री गणेशाय नमः ॥</span></div>
          </div>
          <div className="hero__toran" aria-hidden="true">{Array.from({ length: 21 }, (_, i) => <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />)}</div>
        </section>

        <section className="sec" id="themes">
          <header className="sec__head">
            <p className="eyebrow">The Collection</p>
            <h2>Featured Wedding Themes</h2>
            <Ornament />
            <p>Choose a design, preview the complete invitation, and imagine it with your own story.</p>
          </header>
          <div className="themes">{themes.map((t) => <ThemeCard key={t.id} theme={t} />)}</div>
          <p className="themes__soon">More invitation themes are being crafted with care.</p>
        </section>

        <section className="sec sec--maroon" id="why">
          <header className="sec__head">
            <p className="eyebrow">Why Choose Us</p>
            <h2>Why Choose Our Invitations?</h2>
            <Ornament />
          </header>
          <ul className="features">
            {features.map((f) => (
              <li key={f.title}><span className="features__icon" aria-hidden="true">{f.icon}</span><h3>{f.title}</h3><p>{f.text}</p></li>
            ))}
          </ul>
        </section>

        <section className="cta">
          <Mandala className="cta__mandala" />
          <p className="eyebrow">Begin Your Journey</p>
          <h2>Let Your Wedding Story Be Told in Gold</h2>
          <p>Step into a fully realised invitation and see how your celebration could unfold.</p>
          <Link to={`/themes/${featured.id}`} className="btn btn--gold">View {featured.name}</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
