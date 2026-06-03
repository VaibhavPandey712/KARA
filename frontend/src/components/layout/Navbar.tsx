'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, Shield } from 'lucide-react'
import { handleAuditClick as goToAudit } from '@/lib/onboarding'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { checkIsAdmin } from '@/lib/api'

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'Problem',      href: '#problem' },
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why KARA',     href: '#why-kara' },
  { label: 'Team',         href: '#team' },
]

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
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        checkIsAdmin().then(setIsAdmin)
      } else {
        setIsAdmin(false)
      }
    })
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        checkIsAdmin().then(setIsAdmin)
      } else {
        setIsAdmin(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setDropdownOpen(false)
    router.push('/')
  }

  const handleAuthClick = () => goToAudit(router)

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const avatarUrl = user?.user_metadata?.avatar_url
  const fullName = user?.user_metadata?.full_name || 'Creator'
  const email = user?.email || ''
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__inner">
          {/* Logo */}
          <a href="#home" className="navbar__logo"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}>
            <span className="navbar__logo-icon">
              <KaraLogo size={28} color="#192837" />
            </span>
            <span className="navbar__logo-text">KARA</span>
          </a>

          {/* Desktop nav links */}
          <nav className="navbar__links" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} className="navbar__link"
                onClick={(e) => { e.preventDefault(); handleNavClick(href) }}>
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="navbar__actions">
            {isAdmin && (
              <button className="navbar__btn-secondary" onClick={() => router.push('/admin')}>
                <Shield size={14} strokeWidth={2} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
                Admin Panel
              </button>
            )}
            <button className="navbar__btn-primary" onClick={handleAuthClick}>
              Get Free Audit
            </button>

            {user ? (
              /* Profile dropdown */
              <div className="nav-profile" ref={dropdownRef}>
                <button
                  className="nav-profile__btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="Profile menu"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={fullName} className="nav-profile__avatar" />
                  ) : (
                    <div className="nav-profile__initials">{initials}</div>
                  )}
                  <div className="nav-profile__dot" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="nav-dropdown"
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* User info */}
                      <div className="nav-dropdown__user">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={fullName} className="nav-dropdown__avatar" />
                        ) : (
                          <div className="nav-dropdown__initials">{initials}</div>
                        )}
                        <div>
                          <p className="nav-dropdown__name">{fullName}</p>
                          <p className="nav-dropdown__email">{email}</p>
                        </div>
                      </div>

                      <div className="nav-dropdown__divider" />

                      {isAdmin && (
                        <>
                          <button className="nav-dropdown__admin" onClick={() => { setDropdownOpen(false); router.push('/admin'); }}>
                            <Shield size={14} strokeWidth={2} />
                            Admin Panel
                          </button>
                          <div className="nav-dropdown__divider" />
                        </>
                      )}

                      {/* Sign out */}
                      <button className="nav-dropdown__signout" onClick={handleSignOut}>
                        <LogOut size={14} strokeWidth={2} />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button className="navbar__btn-secondary" onClick={() => router.push('/auth')}>
                Sign In
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="mobile-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} onClick={() => setMenuOpen(false)} />

            <motion.div className="mobile-sheet"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>

              <div className="mobile-sheet__header">
                <KaraLogo size={24} color="#192837" />
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={24} color="#192837" />
                </button>
              </div>

              <div className="mobile-sheet__divider" />

              {/* Mobile user info */}
              {user && (
                <div className="mobile-sheet__user">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={fullName} className="mobile-sheet__user-avatar" />
                  ) : (
                    <div className="mobile-sheet__user-initials">{initials}</div>
                  )}
                  <div>
                    <p className="mobile-sheet__user-name">{fullName}</p>
                    <p className="mobile-sheet__user-email">{email}</p>
                  </div>
                </div>
              )}

              <nav className="mobile-sheet__nav">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a key={href} href={href} className="mobile-sheet__link"
                    onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                    {label}
                  </motion.a>
                ))}
              </nav>

              <div className="mobile-sheet__actions">
                {isAdmin && (
                  <button className="mobile-sheet__btn-admin" onClick={() => { setMenuOpen(false); router.push('/admin'); }}>
                    <Shield size={15} strokeWidth={2} />
                    Admin Panel
                  </button>
                )}
                <button className="mobile-sheet__btn-primary" onClick={handleAuthClick}>
                  Get Free Audit
                </button>
                {user ? (
                  <button className="mobile-sheet__btn-signout" onClick={handleSignOut}>
                    <LogOut size={15} strokeWidth={2} />
                    Sign Out
                  </button>
                ) : (
                  <button className="mobile-sheet__btn-secondary" onClick={() => router.push('/auth')}>
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}