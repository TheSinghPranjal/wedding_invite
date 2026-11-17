import { Link } from 'react-router-dom';
import Mandala from '../common/Mandala';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="foot" id="contact">
      <Mandala className="foot__mandala" />
      <div className="foot__grid">
        <div>
          <p className="foot__brand">Shubh <em>Vivah</em> Studio</p>
          <p>Digital wedding invitations rooted in India's timeless traditions.</p>
        </div>
        <nav aria-label="Footer">
          <h3>Explore</h3>
          <Link to="/">Home</Link><Link to="/#themes">Explore Themes</Link><Link to="/#why">Why Us</Link>
        </nav>
        <div>
          <h3>Contact</h3>
          <p>hello@example.com</p><p>+91 00000 00000</p><p>India</p>
        </div>
        <div>
          <h3>Follow</h3>
          <p className="foot__social"><a href="#contact">Instagram</a><a href="#contact">Pinterest</a><a href="#contact">YouTube</a></p>
        </div>
      </div>
      <p className="foot__copy">© {new Date().getFullYear()} Shubh Vivah Studio. Made with love for every love story.</p>
    </footer>
  );
}
