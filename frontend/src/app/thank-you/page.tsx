'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Check, Clock, Mail, ArrowLeft } from 'lucide-react'

export default function ThankYouPage() {
  const router = useRouter()

  const perks = [
    'Profile & bio audit',
    'Content quality review',
    'Consistency analysis',
    'Growth opportunity map',
    '7-day action plan',
  ]

  const greenGradient = '#22c55e'
  const greenGlow = '0 10px 30px -8px rgba(34,197,94,0.5)'
  const karaGradient = 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'

  return (
    <div className="thankyou-page">
      <div className="auth-orb auth-orb--1" aria-hidden="true" />
      <div className="auth-orb auth-orb--2" aria-hidden="true" />

      <div className="thankyou-card">

        {/* Green check circle */}
        <div style={{
          position: 'relative',
          width: '80px', height: '80px',
          alignSelf: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            background: greenGradient,
            opacity: 0.3,
            animation: 'thankyouPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
          }} />
          <div style={{
            position: 'relative',
            width: '80px', height: '80px', borderRadius: '50%',
            background: greenGradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: greenGlow,
          }}>
            <Check size={38} strokeWidth={3} color="#fff" />
          </div>
        </div>

        <h1 className="thankyou-title">You&apos;re all set!</h1>

        <p className="thankyou-sub">
          Your creator audit request has been received. Our team will analyze your profile
          and send you a <strong>personalized growth report</strong> within 24 hours.
        </p>

        {/* Meta badges */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            fontSize: '12px', fontWeight: 500, color: 'var(--color-ink-3)',
          }}>
            <Clock size={13} strokeWidth={2} /> Within 24 hours
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            fontSize: '12px', fontWeight: 500, color: 'var(--color-ink-3)',
          }}>
            <Mail size={13} strokeWidth={2} /> Delivered to your inbox
          </div>
        </div>

        {/* Perks list */}
        <div className="thankyou-perks">
          {perks.map(p => (
            <div key={p} className="thankyou-perk" style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: greenGradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px -4px rgba(34,197,94,0.5)',
              }}>
                <Check size={14} strokeWidth={3} color="#fff" />
              </div>
              {p}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="ob-btn-primary"
          onClick={() => router.push('/')}
          style={{
            background: karaGradient,
            boxShadow: '0 10px 30px -8px rgba(124,58,237,0.5)',
            border: 'none',
            color: '#fff',
          }}
        >
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to Home
        </button>

        <p style={{ fontSize: '12px', color: 'var(--color-ink-4)', textAlign: 'center', margin: 0 }}>
          Didn&apos;t get a confirmation email? Check your spam folder.
        </p>
      </div>

      <style jsx>{`
        @keyframes thankyouPing {
          75%, 100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}