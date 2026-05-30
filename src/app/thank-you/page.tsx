'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function ThankYouPage() {
  const router = useRouter()

  return (
    <div className="thankyou-page">
      <div className="auth-orb auth-orb--1" aria-hidden="true" />
      <div className="auth-orb auth-orb--2" aria-hidden="true" />

      <div className="thankyou-card">
        <div className="thankyou-icon">✦</div>
        <h1 className="thankyou-title">You&apos;re all set!</h1>
        <p className="thankyou-sub">
          Your creator audit request has been received. Our team will analyze your profile
          and send you a <strong>personalized growth report</strong> within 24 hours.
        </p>

        <div className="thankyou-perks">
          {[
            '✓ Profile & bio audit',
            '✓ Content quality review',
            '✓ Consistency analysis',
            '✓ Growth opportunity map',
            '✓ 7-day action plan',
          ].map(p => (
            <div key={p} className="thankyou-perk">{p}</div>
          ))}
        </div>

        <button className="ob-btn-primary" onClick={() => router.push('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
