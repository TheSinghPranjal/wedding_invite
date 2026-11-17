import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/#themes', label: 'Explore Themes' },
  { href: '/#why', label: 'About Us' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
        <span className="nav__mark" aria-hidden="true">ॐ</span>
        <span>Shubh <em>Vivah</em> Studio</span>
      </Link>
      <button className="nav__toggle" aria-expanded={open} aria-controls="nav-menu" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
        <span /><span /><span />
      </button>
      <nav id="nav-menu" className={`nav__menu${open ? ' is-open' : ''}`} aria-label="Primary">
        {links.map((l) => (<Link key={l.label} to={l.href} onClick={() => setOpen(false)}>{l.label}</Link>))}
        <Link to="/#themes" className="btn btn--maroon nav__cta" onClick={() => setOpen(false)}>Create Your Invitation</Link>
      </nav>
    </header>
  );
}
