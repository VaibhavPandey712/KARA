'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'Problem',      href: '#problem' },
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why KARA',     href: '#why-kara' },
  { label: 'Team',         href: '#team' },
]

// KARA Logo SVG — geometric angular shape inspired by VaultShield
function KaraLogo({ size = 32, color = '#192837' }: { size?: number; color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" overflow="visible" viewBox="0 0 256 256">
      <path
        d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z"
        fill={color}
      />
    </svg>
  )
}

export default function Navbar() {
   const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleAuthClick = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    router.push('/onboarding')
  } else {
    router.push('/auth')
  }
}

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__inner">
          {/* Logo */}
          <a
            href="#home"
            className="navbar__logo"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
          >
            <span className="navbar__logo-icon">
              <KaraLogo size={28} color="#192837" />
            </span>
            <span className="navbar__logo-text">KARA</span>
          </a>

          {/* Desktop nav links — centered */}
          <nav className="navbar__links" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="navbar__link"
                onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="navbar__actions">
          <button
  className="navbar__btn-primary"
  onClick={handleAuthClick}
>
  Get Free Audit
</button>
            <a
              href="#contact"
              className="navbar__btn-secondary"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            >
              Sign In
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="mobile-sheet"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mobile-sheet__header">
                <KaraLogo size={24} color="#192837" />
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={24} color="#192837" />
                </button>
              </div>

              <div className="mobile-sheet__divider" />

              <nav className="mobile-sheet__nav">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    className="mobile-sheet__link"
                    onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              <div className="mobile-sheet__actions">
             <button
  className="mobile-sheet__btn-primary"
  onClick={handleAuthClick}
>
  Get Free Audit
</button>
                <a
                  href="#contact"
                  className="mobile-sheet__btn-secondary"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                >
                  Sign In
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
