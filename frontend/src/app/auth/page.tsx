'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getOnboardingStatus } from '@/lib/api'
import { getSiteUrl } from '@/lib/config'
import { useRouter } from 'next/navigation'

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

export default function AuthPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession()
      if (cancelled) return

      if (!session?.user) {
        setChecking(false)
        return
      }

      try {
        const { hasAudit } = await getOnboardingStatus()
        if (cancelled) return
        router.replace(hasAudit ? '/plans' : '/onboarding')
      } catch {
        if (!cancelled) router.replace('/onboarding')
      }
    }

    checkSession()
    return () => { cancelled = true }
  }, [router])

  const handleGoogleLogin = async () => {
    const siteUrl = getSiteUrl()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
      },
    })
  }

  if (checking) {
    return (
      <div className="auth-page">
        <div style={{ color: 'var(--color-ink-3)', fontSize: '14px' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
       <div className="auth2-logo__mark">
  <KaraLogo size={28} color="black" />
</div>
          <span className="auth-logo__text">KARA</span>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h1 className="auth-heading__title">
            Your Creator Growth<br />
            <span className="auth-heading__accent">System Awaits</span>
          </h1>
          <p className="auth-heading__sub">
            Get your free creator audit — profile, content, consistency & growth opportunities, all analyzed for you.
          </p>
        </div>

        {/* What you get */}
        <div className="auth-perks">
          {[
            { icon: '◎', text: 'Profile & bio audit' },
            { icon: '▶', text: 'Content quality review' },
            { icon: '◆', text: 'Growth opportunity map' },
            { icon: '✦', text: 'Personalized action plan' },
          ].map((perk) => (
            <div key={perk.text} className="auth-perk">
              <span className="auth-perk__icon">{perk.icon}</span>
              <span className="auth-perk__text">{perk.text}</span>
            </div>
          ))}
        </div>

        {/* Google Button */}
        <button className="auth-google-btn" onClick={handleGoogleLogin}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="auth-footer-note">
          Free audit · No credit card · Takes 2 minutes
        </p>
      </div>

      {/* Background orbs */}
      <div className="auth-orb auth-orb--1" aria-hidden="true" />
      <div className="auth-orb auth-orb--2" aria-hidden="true" />
      <div className="auth-orb auth-orb--3" aria-hidden="true" />
    </div>
  )
}
