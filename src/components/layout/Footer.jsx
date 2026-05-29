import React from 'react';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why KARA',     href: '#why-kara' },
  { label: 'Team',         href: '#team' },
  { label: 'Contact',      href: '#contact' },
];

const SOCIAL = [
  {
    name: 'Instagram', href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn', href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: 'X', href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube', href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const scrollTo = (href, e) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <a href="#home" className="footer__logo" onClick={(e) => scrollTo('#home', e)}>
            <span className="footer__logo-mark">K</span>
            <span className="footer__logo-name">KARA</span>
          </a>
          <p className="footer__tagline">
            AI-powered content operations<br />for modern creators.
          </p>
          <div className="footer__social">
            {SOCIAL.map(s => (
              <a key={s.name} href={s.href} className="footer__social-link" aria-label={s.name} target="_blank" rel="noopener noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="footer__links-block">
          <p className="footer__links-title">Quick Links</p>
          <ul className="footer__links-list">
            {QUICK_LINKS.map(l => (
              <li key={l.label}>
                <a href={l.href} onClick={(e) => scrollTo(l.href, e)} className="footer__link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__links-block">
          <p className="footer__links-title">Get In Touch</p>
          <ul className="footer__links-list">
            <li><a href="mailto:hello@kara.ai" className="footer__link">hello@kara.ai</a></li>
            <li><a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="footer__link">Instagram</a></li>
            <li><a href="#contact" onClick={(e) => scrollTo('#contact', e)} className="footer__link">Book a Free Audit</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">© 2026 KARA. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__link-sm">Privacy Policy</a>
            <span className="footer__dot">·</span>
            <a href="#" className="footer__link-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}