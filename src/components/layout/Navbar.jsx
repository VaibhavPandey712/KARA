import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why KARA',     href: '#why-kara' },
  { label: 'Team',         href: '#team' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Determine active section
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        {/* Logo */}
        <a href="#home" className="navbar__logo" onClick={() => handleNavClick('#home')}>
          <span className="navbar__logo-mark">K</span>
          <span className="navbar__logo-text">KARA</span>
        </a>

        {/* Desktop nav */}
        <nav className="navbar__links" role="navigation" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`navbar__link ${activeSection === href.slice(1) ? 'navbar__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="btn btn-primary navbar__cta"
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
        >
          Get Free Analysis
        </a>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="navbar__drawer-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="navbar__drawer-link"
              onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary navbar__drawer-cta"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          >
            Book a Free Audit
          </a>
        </nav>
      </div>
    </header>
  );
}