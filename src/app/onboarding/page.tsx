'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Phone, Mail, ArrowRight } from 'lucide-react'

const NICHES = ['Fitness', 'Fashion', 'Gaming', 'Education', 'Comedy', 'Finance', 'Travel', 'Food', 'Tech', 'Music', 'Business', 'Lifestyle', 'Beauty', 'Sports', 'Motivation']

const PROBLEMS = ['Editing takes too long', 'Inconsistent posting', 'No content ideas', 'Slow growth', 'Low views', 'Low engagement', 'Poor branding', 'Analytics confusion', 'Monetization struggles', 'Not sure where to start']

const GOALS = ['Grow followers fast', 'Get more views', 'Land brand deals', 'Better content quality', 'Post more consistently', 'Build personal brand', 'Earn from content', 'Go viral']

const PLATFORMS = ['YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'X (Twitter)', 'Podcast', 'Multiple platforms']

const STEPS = [
  'welcome', 'platform', 'niche', 'managing', 'problems', 'goals', 'contact'
]


export default function OnboardingPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [animating, setAnimating] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [form, setForm] = useState({
    platform: '',
    platformLink: '',
    niche: '',
    managing: '',
    problems: [] as string[],
    goals: [] as string[],
    contactType: 'whatsapp',
    contact: '',
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/auth')
      else setUser(user)
    })
  }, [router])

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Creator'

  const goNext = () => {
    if (animating) return
    setDirection('forward')
    setAnimating(true)
    setTimeout(() => {
      setStep(s => s + 1)
      setAnimating(false)
    }, 320)
  }

  const goBack = () => {
    if (animating || step === 0) return
    setDirection('back')
    setAnimating(true)
    setTimeout(() => {
      setStep(s => s - 1)
      setAnimating(false)
    }, 320)
  }

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]

  const handleSubmit = async () => {
    if (submitting) return

    setSubmitting(true)
    setSubmitError('')

    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !currentUser) {
      setSubmitting(false)
      router.push('/auth')
      return
    }

    setUser(currentUser)

    const { error } = await supabase
      .from('creator_audits')
      .insert({
        user_id: currentUser.id,
        platform: form.platform,
        platform_link: form.platformLink,
        niche: form.niche,
        managing_type: form.managing,
        biggest_problems: form.problems,
        goals: form.goals,
        contact_detail: form.contact,
        contact_type: form.contactType,
      })

    setSubmitting(false)

    if (error) {
      setSubmitError(
        [error.message, error.details, error.hint]
          .filter(Boolean)
          .join(' ')
      )
      return
    }

    router.push('/thank-you')
  }

  const progress = (step / (STEPS.length - 1)) * 100

  const slideClass = animating
    ? direction === 'forward' ? 'slide-exit-left' : 'slide-exit-right'
    : direction === 'forward' ? 'slide-enter-right' : 'slide-enter-left'

  return (
    <div className="onboarding-page">
      {/* Orbs */}
      <div className="auth-orb auth-orb--1" aria-hidden="true" />
      <div className="auth-orb auth-orb--2" aria-hidden="true" />

      {/* Progress bar */}
      {step > 0 && (
        <div className="onboarding-progress">
          <div className="onboarding-progress__bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="onboarding-wrap">
        <div className={`onboarding-card ${slideClass}`}>

          {/* STEP 0 — Welcome */}
          {step === 0 && (
            <div className="ob-step">
              <div className="ob-emoji">👋</div>
              <h2 className="ob-title">Hey {firstName}!</h2>
              <p className="ob-sub">
                Welcome to KARA. We&apos;re going to ask you a few quick questions to build your
                <strong> free personalized creator audit.</strong>
              </p>
              <p className="ob-sub" style={{ marginTop: '8px', opacity: 0.6, fontSize: '14px' }}>
                Takes less than 2 minutes. All multiple choice.
              </p>
              <button className="ob-btn-primary ob-btn--full" onClick={goNext}>
                Let&apos;s go →
              </button>
            </div>
          )}

          {/* STEP 1 — Platform */}
          {step === 1 && (
            <div className="ob-step">
              <div className="ob-step-label">01 / 06</div>
              <h2 className="ob-title">Where do you create content?</h2>
              <p className="ob-sub">Pick your main platform right now.</p>
              <div className="ob-chips">
                {PLATFORMS.map(p => (
                  <button
                    key={p}
                    className={`ob-chip ${form.platform === p ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, platform: p }))}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="ob-input-wrap">
                <input
                  className="ob-input"
                  placeholder="Paste your profile link or username"
                  value={form.platformLink}
                  onChange={e => setForm(f => ({ ...f, platformLink: e.target.value }))}
                />
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button
                  className="ob-btn-primary"
                  onClick={goNext}
                  disabled={!form.platform}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Niche */}
          {step === 2 && (
            <div className="ob-step">
              <div className="ob-step-label">02 / 06</div>
              <h2 className="ob-title">What&apos;s your content niche?</h2>
              <p className="ob-sub">What do you mainly talk about?</p>
              <div className="ob-chips">
                {NICHES.map(n => (
                  <button
                    key={n}
                    className={`ob-chip ${form.niche === n ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, niche: n }))}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button
                  className="ob-btn-primary"
                  onClick={goNext}
                  disabled={!form.niche}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Managing */}
          {step === 3 && (
            <div className="ob-step">
              <div className="ob-step-label">03 / 06</div>
              <h2 className="ob-title">How are you managing your content right now?</h2>
              <div className="ob-big-choices">
                {[
                  { val: 'yes', emoji: '🙋', label: 'All by myself', sub: 'Doing everything solo' },
                  { val: 'partially', emoji: '🤝', label: 'Partially with help', sub: 'Some tasks outsourced' },
                  { val: 'no', emoji: '👥', label: 'I have a team', sub: 'Multiple people involved' },
                ].map(opt => (
                  <button
                    key={opt.val}
                    className={`ob-big-choice ${form.managing === opt.val ? 'ob-big-choice--active' : ''}`}
                    onClick={() => { setForm(f => ({ ...f, managing: opt.val })); }}
                  >
                    <span className="ob-big-choice__emoji">{opt.emoji}</span>
                    <span className="ob-big-choice__label">{opt.label}</span>
                    <span className="ob-big-choice__sub">{opt.sub}</span>
                  </button>
                ))}
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button
                  className="ob-btn-primary"
                  onClick={goNext}
                  disabled={!form.managing}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — Problems */}
          {step === 4 && (
            <div className="ob-step">
              <div className="ob-step-label">04 / 06</div>
              <h2 className="ob-title">What&apos;s holding you back?</h2>
              <p className="ob-sub">Select all that apply.</p>
              <div className="ob-chips">
                {PROBLEMS.map(p => (
                  <button
                    key={p}
                    className={`ob-chip ${form.problems.includes(p) ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, problems: toggleArray(f.problems, p) }))}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button
                  className="ob-btn-primary"
                  onClick={goNext}
                  disabled={form.problems.length === 0}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 — Goals */}
          {step === 5 && (
            <div className="ob-step">
              <div className="ob-step-label">05 / 06</div>
              <h2 className="ob-title">What do you want in the next 3 months?</h2>
              <p className="ob-sub">Pick your top goals.</p>
              <div className="ob-chips">
                {GOALS.map(g => (
                  <button
                    key={g}
                    className={`ob-chip ${form.goals.includes(g) ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, goals: toggleArray(f.goals, g) }))}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button
                  className="ob-btn-primary"
                  onClick={goNext}
                  disabled={form.goals.length === 0}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

        {/* STEP 6 — Contact */}
{step === 6 && (
  <div className="ob-step">
    <div className="ob-step-label">06 / 06</div>
    <h2 className="ob-title">Where should we send your audit?</h2>
    <p className="ob-sub">We&apos;ll send your personalized report here.</p>

    <div className="ob-contact-toggle">
      <button
        className={`ob-contact-tab ${form.contactType === 'whatsapp' ? 'ob-contact-tab--active' : ''}`}
        onClick={() => setForm(f => ({ ...f, contactType: 'whatsapp' }))}
      >
        <Phone size={15} strokeWidth={1.8} />
        <span>WhatsApp</span>
      </button>
      <button
        className={`ob-contact-tab ${form.contactType === 'email' ? 'ob-contact-tab--active' : ''}`}
        onClick={() => setForm(f => ({ ...f, contactType: 'email' }))}
      >
        <Mail size={15} strokeWidth={1.8} />
        <span>Email</span>
      </button>
    </div>

    <input
      className="ob-input"
      placeholder={form.contactType === 'whatsapp' ? '+91 your WhatsApp number' : 'your@email.com'}
      value={form.contact}
      onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
    />

    {submitError && (
      <p className="ob-error" role="alert">{submitError}</p>
    )}

    <div className="ob-nav">
      <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
      <button
        className="ob-btn-primary ob-btn--submit"
        onClick={handleSubmit}
        disabled={!form.contact || submitting}
      >
        Get My Free Audit
        <ArrowRight size={15} strokeWidth={2} />
      </button>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  )
}
