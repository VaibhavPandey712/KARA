'use client'

import React from 'react'
import { Instagram, Linkedin, Youtube } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Problem',      href: '#problem' },
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why KARA',     href: '#why-kara' },
  { label: 'Team',         href: '#team' },
  { label: 'Contact',      href: '#contact' },
]

const SOCIAL = [
  {
    name: 'Instagram', href: '#',
    icon: <Instagram size={18} strokeWidth={1.8} />,
  },
  {
    name: 'LinkedIn', href: '#',
    icon: <Linkedin size={18} strokeWidth={1.8} />,
  },
  {
    name: 'X', href: 'https://x.com/KARAforcreators',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube', href: '#',
    icon: <Youtube size={18} strokeWidth={1.8} />,
  },
]

export default function Footer() {
  const scrollTo = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

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
            <li><a href="mailto:hello@kara.ai" className="footer__link">karaoswithai@gmail.com</a></li>
            <li><a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="footer__link">WhatsApp Support</a></li>
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
  )
}
