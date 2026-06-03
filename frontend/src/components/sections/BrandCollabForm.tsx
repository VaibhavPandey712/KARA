'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ArrowRight, X, Handshake, CheckCircle2, Mail } from 'lucide-react'
import { submitBrandCollab } from '@/lib/api'

/* ── Options ──────────────────────────────────── */

const BRAND_TYPES = [
  'Fashion', 'Fitness', 'Beauty / Skincare', 'Food', 'Tech',
  'Gaming', 'Education', 'Travel', 'Finance', 'Lifestyle',
  'Apps / Software', 'Local businesses', 'Open to all relevant brands',
]

const COLLAB_TYPES = [
  'Paid promotion', 'Barter collaboration', 'Affiliate collaboration',
  'Product review', 'Sponsored reel/short', 'Story promotion',
  'Long-term brand partnership', 'Event collaboration',
]

const PROMOTE_OPTIONS = [
  'Yes',
  'No',
  'Only after trying the product',
  'Depends on the brand',
]

const TOTAL_STEPS = 5

/* ── Component ────────────────────────────────── */

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function BrandCollabForm({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(true)
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    brandTypes: [] as string[],
    collabTypes: [] as string[],
    promoteUnused: '',
    contactDetail: '',
    contactType: 'whatsapp',
    dreamBrands: '',
  })

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep(0)
      setVisible(true)
      setSuccess(false)
      setError('')
      setForm({
        brandTypes: [],
        collabTypes: [],
        promoteUnused: '',
        contactDetail: '',
        contactType: 'whatsapp',
        dreamBrands: '',
      })
    }
  }, [isOpen])

  // Auto-close after success
  useEffect(() => {
    if (success) {
      const t = setTimeout(onClose, 5000)
      return () => clearTimeout(t)
    }
  }, [success, onClose])

  // Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const transition = useCallback((newStep: number, dir: 'left' | 'right') => {
    setVisible(false)
    setSlideDir(dir)
    setTimeout(() => { setStep(newStep); setError(''); setVisible(true) }, 300)
  }, [])

  const goNext = useCallback(() => transition(step + 1, 'left'), [step, transition])
  const goBack = useCallback(() => transition(step - 1, 'right'), [step, transition])

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      await submitBrandCollab({
        brandTypes: form.brandTypes,
        collabTypes: form.collabTypes,
        promoteUnused: form.promoteUnused,
        contactDetail: form.contactDetail.trim(),
        dreamBrands: form.dreamBrands.trim(),
      })
      setSuccess(true)
    } catch (err: unknown) {
      console.error('Collab submit error:', err)
      setError((err as Error).message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  const progress = step === 0 ? 0 : (step / TOTAL_STEPS) * 100
  const animClass = visible
    ? 'slide-enter-right'
    : slideDir === 'left' ? 'slide-exit-left' : 'slide-exit-right'

  /* ── Success Screen ── */
  if (success) {
    return (
      <div className="collab-modal__backdrop" onClick={onClose}>
        <div className="collab-modal__container" onClick={e => e.stopPropagation()}>
          <button className="collab-modal__close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
          <div className="collab-success">
            <div className="collab-success__burst" />
            <div className="collab-success__icon-ring">
              <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>
            <h2 className="collab-success__title">You&apos;re In! 🎉</h2>
            <p className="collab-success__sub">
              Thank you for your interest in brand collaborations.
              <br />
              <strong>We&apos;ll get back to you within 24 hours</strong> with matched brand opportunities.
            </p>
            <div className="collab-success__pill">
              <span className="collab-success__dot" />
              Our team is on it
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <div className="collab-modal__backdrop" onClick={onClose}>
      <div className="collab-modal__container" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="collab-modal__close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Progress */}
        {step > 0 && (
          <div className="collab-modal__progress">
            <div className="collab-modal__progress-bar" style={{ width: `${progress}%` }} />
          </div>
        )}

        {/* Step dots */}
        {step > 0 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div key={i} style={{
                width: i === step - 1 ? '20px' : '6px',
                height: '6px',
                borderRadius: i === step - 1 ? '3px' : '50%',
                background: i < step
                  ? (i === step - 1 ? 'var(--color-accent)' : 'var(--color-accent-mid)')
                  : 'var(--color-border-strong)',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
        )}

        <div className={`onboarding-card collab-modal__card ${animClass}`}>

          {/* STEP 0 — Welcome */}
          {step === 0 && (
            <div className="ob-step">
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #F59E0B, #EA580C)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 40px rgba(245, 158, 11, 0.25)',
              }}>
                <Handshake size={28} color="#fff" strokeWidth={1.8} />
              </div>
              <h2 className="ob-title">
                Let&apos;s find <span style={{ color: 'var(--color-accent)' }}>brand deals</span> for you
              </h2>
              <p className="ob-sub">
                Answer a few quick questions so we can match you with the{' '}
                <strong style={{ color: 'var(--color-ink-2)' }}>right brands and collaborations.</strong>{' '}
                Takes under a minute.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {['Paid deals', 'Barter collabs', 'Brand matching', 'Direct outreach'].map(p => (
                  <div key={p} className="auth-perk">
                    <span className="auth-perk__icon">✦</span>
                    <span className="auth-perk__text">{p}</span>
                  </div>
                ))}
              </div>
              <button className="ob-btn-primary ob-btn--full" style={{ marginTop: 'auto' }} onClick={goNext}>
                Let&apos;s go <ArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          )}

          {/* STEP 1 — Brand Types */}
          {step === 1 && (
            <div className="ob-step">
              <div className="ob-step-label">01 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">What type of brands do you want to work with?</h2>
              <p className="ob-sub">Select all that apply.</p>
              <div className="ob-chips">
                {BRAND_TYPES.map(b => (
                  <button key={b}
                    className={`ob-chip ${form.brandTypes.includes(b) ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, brandTypes: toggle(f.brandTypes, b) }))}
                  >
                    {form.brandTypes.includes(b) && <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓ </span>}
                    {b}
                  </button>
                ))}
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext} disabled={form.brandTypes.length === 0}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Collaboration Types */}
          {step === 2 && (
            <div className="ob-step">
              <div className="ob-step-label">02 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">What collaboration type are you open to?</h2>
              <p className="ob-sub">Select all that interest you.</p>
              <div className="ob-chips">
                {COLLAB_TYPES.map(c => (
                  <button key={c}
                    className={`ob-chip ${form.collabTypes.includes(c) ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, collabTypes: toggle(f.collabTypes, c) }))}
                  >
                    {form.collabTypes.includes(c) && <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓ </span>}
                    {c}
                  </button>
                ))}
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext} disabled={form.collabTypes.length === 0}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Promote Unused */}
          {step === 3 && (
            <div className="ob-step">
              <div className="ob-step-label">03 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">Are you comfortable promoting products you have not used before?</h2>
              <p className="ob-sub">This helps us protect creator trust &amp; brand quality.</p>
              <div className="ob-chips">
                {PROMOTE_OPTIONS.map(p => (
                  <button key={p}
                    className={`ob-chip ${form.promoteUnused === p ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, promoteUnused: p }))}
                  >
                    {form.promoteUnused === p && <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓ </span>}
                    {p}
                  </button>
                ))}
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext} disabled={!form.promoteUnused}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — Contact + Dream Brands + Submit */}
          {step === 4 && (
            <div className="ob-step">
              <div className="ob-step-label">04 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">Share your contact for collaboration updates</h2>
              <p className="ob-sub">We&apos;ll reach out when we find matching brands.</p>

              <div className="ob-contact-toggle">
                <button
                  className={`ob-contact-tab ob-contact-tab--whatsapp ${form.contactType === 'whatsapp' ? 'ob-contact-tab--active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, contactType: 'whatsapp' }))}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>
                <button
                  className={`ob-contact-tab ob-contact-tab--email ${form.contactType === 'email' ? 'ob-contact-tab--active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, contactType: 'email' }))}
                >
                  <Mail size={15} strokeWidth={1.8} />
                  Email
                </button>
              </div>

              <div className="ob-input-wrap">
                <input className="ob-input"
                  placeholder={form.contactType === 'whatsapp' ? '+91 your WhatsApp number' : 'your@email.com'}
                  value={form.contactDetail}
                  onChange={e => setForm(f => ({ ...f, contactDetail: e.target.value }))} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: 'var(--color-ink-3)', fontWeight: 500 }}>
                  Any brands you want to work with?{' '}
                  <span style={{ color: 'var(--color-ink-4)', fontWeight: 400 }}>(optional)</span>
                </label>
                <input className="ob-input"
                  placeholder="Example: skincare brands, fitness brands, clothing brands, local cafes"
                  value={form.dreamBrands}
                  onChange={e => setForm(f => ({ ...f, dreamBrands: e.target.value }))} />
              </div>

              {error && <p className="ob-error">{error}</p>}

              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" style={{ padding: '14px 28px', fontSize: '15px' }}
                  onClick={handleSubmit} disabled={submitting || !form.contactDetail.trim()}>
                  {submitting ? 'Submitting...' : 'Get Brand Deals'} <ArrowRight size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 — Hidden, reserved for TOTAL_STEPS count */}
          {step === 5 && (
            <div className="ob-step">
              <p className="ob-sub">Processing...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
