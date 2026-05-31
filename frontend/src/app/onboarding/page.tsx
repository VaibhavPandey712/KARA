'use client'
import { FaXTwitter } from "react-icons/fa6";
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { checkOnboardingStatus, submitAuditForm } from '@/lib/onboarding'
import { ArrowRight, Phone, Mail, Instagram, Twitter, Linkedin, Youtube, Music } from 'lucide-react'
const PLATFORMS = ['Instagram', 'YouTube', 'LinkedIn', 'X (Twitter)', 'Podcast', 'Multiple']
const NICHES = ['Fitness', 'Fashion / Lifestyle', 'Gaming', 'Education', 'Tech', 'Finance', 'Food', 'Travel', 'Comedy / Entertainment', 'Beauty / Skincare', 'Business / Startup', 'Personal Brand', 'Other']
const PROBLEMS = ['Low views', 'Not getting followers', 'No content ideas', 'Inconsistent posting', 'Poor editing quality', 'Weak captions / hooks', 'Low engagement', "Don't understand analytics", 'Not getting brand deals', 'Not sure what is wrong']
const IMPROVE = ['Grow followers', 'Increase views', 'Improve content quality', 'Post consistently', 'Build personal brand', 'Get brand deals', 'Understand analytics', 'Monetize my content']
const HELP = ['Content ideas', 'Caption and hook writing', 'Profile improvement', 'Posting calendar', 'Analytics review', 'Video editing', 'Growth strategy', 'Full creator management']

const TOTAL_STEPS = 9

export default function OnboardingPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(true)
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    platform: '',
    profileLink: '',
    niche: '',
    nicheOther: '',
    problems: [] as string[],
    problemOther: '',
    improve: [] as string[],
    improveOther: '',
    help: [] as string[],
    helpOther: '',
    contact: '',
    contactType: 'whatsapp',
    specificNote: '',
    igConnected: false,
    ytConnected: false,
    ttConnected: false,
    liConnected: false,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (cancelled) return

      if (!user) {
        router.replace('/auth')
        return
      }

      try {
        const { hasAudit } = await checkOnboardingStatus(user)
        if (cancelled) return
        if (hasAudit) {
          router.replace('/plans')
          return
        }
      } catch (err) {
        console.error('Onboarding status check failed:', err)
      }

      if (!cancelled) {
        setUser(user)
        setLoading(false)
      }
    }

    init()
    return () => { cancelled = true }
  }, [router])

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'Creator'

  const transition = (newStep: number, dir: 'left' | 'right') => {
    setVisible(false)
    setSlideDir(dir)
    setTimeout(() => { setStep(newStep); setError(''); setVisible(true) }, 300)
  }

  const goNext = () => transition(step + 1, 'left')
  const goBack = () => transition(step - 1, 'right')
  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]

  const handleSubmit = async () => {
    if (!user) return
    setSubmitting(true)
    setError('')

    try {
      const finalNiche = form.niche === 'Other' ? form.nicheOther : form.niche
      const finalProblems = [
        ...form.problems,
        ...(form.problemOther.trim() ? [form.problemOther.trim()] : [])
      ]
      const finalGoals = [
        ...form.improve,
        ...(form.improveOther.trim() ? [form.improveOther.trim()] : [])
      ]
      const finalHelp = [
        ...form.help,
        ...(form.helpOther.trim() ? [form.helpOther.trim()] : [])
      ]

      await submitAuditForm(user.id, {
        name: form.name.trim(),
        platform: form.platform,
        profileLink: form.profileLink.trim(),
        niche: finalNiche,
        problems: finalProblems,
        goals: finalGoals,
        helpNeeded: finalHelp,
        contact: form.contact.trim(),
        contactType: form.contactType,
        specificNote: form.specificNote.trim(),
        igConnected: form.igConnected,
        ytConnected: form.ytConnected,
        ttConnected: form.ttConnected,
        liConnected: form.liConnected,
      })

      router.push('/thank-you')
    } catch (err: any) {
      console.error('Submit error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const progress = step === 0 ? 0 : (step / TOTAL_STEPS) * 100
  const animClass = visible
    ? 'slide-enter-right'
    : slideDir === 'left' ? 'slide-exit-left' : 'slide-exit-right'

  if (!user || loading) return (
    <div className="onboarding-page">
      <div style={{ color: 'var(--color-ink-3)', fontSize: '14px' }}>Loading...</div>
    </div>
  )

  return (
    <div className="onboarding-page">
      {step > 0 && (
        <div className="onboarding-progress">
          <div className="onboarding-progress__bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="onboarding-wrap">
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

        <div className={`onboarding-card ${animClass}`}>

          {/* STEP 0 — Welcome */}
         {step === 0 && (
  <div className="ob-step">
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <div style={{
        width: '64px', height: '64px', borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--color-accent), #9B6CF7)',
        border: '2px solid var(--color-accent-mid)', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: '24px', color: '#fff',
        boxShadow: 'var(--shadow-glow)',
      }}>
        {user?.user_metadata?.avatar_url
          ? <img src={user.user_metadata.avatar_url} alt={firstName} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span>{firstName[0]}</span>}
      </div>
      <span style={{
        position: 'absolute', bottom: '-4px', right: '-8px', fontSize: '22px',
        display: 'inline-block',
        animation: 'wave 1.8s ease-in-out infinite',
        transformOrigin: '70% 70%',
      }}>👋</span>
    </div>
    <h2 className="ob-title">
      Hey {firstName}, welcome to <span style={{ color: 'var(--color-accent)' }}>KARA!</span>
    </h2>
    <p className="ob-sub">
      Answer a few quick questions and we'll build your{' '}
      <strong style={{ color: 'var(--color-ink-2)' }}>free personalized creator audit.</strong>{' '}
      Takes under 2 minutes.
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
      {['Profile audit', 'Content review', 'Growth map', '7-day plan'].map(p => (
        <div key={p} className="auth-perk">
          <span className="auth-perk__icon">✦</span>
          <span className="auth-perk__text">{p}</span>
        </div>
      ))}
    </div>
    <button className="ob-btn-primary ob-btn--full" style={{ marginTop: 'auto' }} onClick={goNext}>
      Let's build my audit <ArrowRight size={16} strokeWidth={2} />
    </button>
  </div>
)}

          {/* STEP 1 — Name */}
          {step === 1 && (
            <div className="ob-step">
              <div className="ob-step-label">01 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">What's your name?</h2>
              <p className="ob-sub">So we can personalize your audit.</p>
              <div className="ob-input-wrap">
                <input className="ob-input" style={{ fontSize: '16px', padding: '14px 16px' }}
                  placeholder="Enter your name" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext} disabled={!form.name.trim()}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Platform */}
          {step === 2 && (
            <div className="ob-step">
              <div className="ob-step-label">02 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">Where do you create content?</h2>
              <p className="ob-sub">Pick your main platform.</p>
              <div className="ob-chips">
                {PLATFORMS.map(p => (
                  <button key={p} className={`ob-chip ${form.platform === p ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, platform: p }))}>{p}</button>
                ))}
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext} disabled={!form.platform}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Profile Link */}
          {step === 3 && (
            <div className="ob-step">
              <div className="ob-step-label">03 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">Paste your profile link</h2>
              <p className="ob-sub">We'll audit your actual profile.</p>
              <div className="ob-input-wrap">
                <input className="ob-input" style={{ fontSize: '16px', padding: '14px 16px' }}
                  placeholder={`Your ${form.platform || 'profile'} link or @username`}
                  value={form.profileLink}
                  onChange={e => setForm(f => ({ ...f, profileLink: e.target.value }))} />
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext} disabled={!form.profileLink.trim()}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — Niche */}
          {step === 4 && (
            <div className="ob-step">
              <div className="ob-step-label">04 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">What's your content niche?</h2>
              <p className="ob-sub">What do you mainly create about?</p>
              <div className="ob-chips">
                {NICHES.map(n => (
                  <button key={n} className={`ob-chip ${form.niche === n ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, niche: n }))}>{n}</button>
                ))}
              </div>
              {form.niche === 'Other' && (
                <div className="ob-input-wrap">
                  <input className="ob-input" placeholder="Tell us your niche"
                    value={form.nicheOther}
                    onChange={e => setForm(f => ({ ...f, nicheOther: e.target.value }))} />
                </div>
              )}
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext}
                  disabled={!form.niche || (form.niche === 'Other' && !form.nicheOther.trim())}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 — Problems */}
          {step === 5 && (
            <div className="ob-step">
              <div className="ob-step-label">05 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">What's your biggest problem right now?</h2>
              <p className="ob-sub">Select all that apply.</p>
              <div className="ob-chips">
                {PROBLEMS.map(p => (
                  <button key={p} className={`ob-chip ${form.problems.includes(p) ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, problems: toggle(f.problems, p) }))}>
                    {form.problems.includes(p) && <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓ </span>}
                    {p}
                  </button>
                ))}
              </div>
              <div className="ob-input-wrap">
                <input className="ob-input" placeholder="Other — type your problem here (optional)"
                  value={form.problemOther}
                  onChange={e => setForm(f => ({ ...f, problemOther: e.target.value }))} />
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext}
                  disabled={form.problems.length === 0 && !form.problemOther.trim()}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6 — Improve */}
          {step === 6 && (
            <div className="ob-step">
              <div className="ob-step-label">06 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">What do you want to improve first?</h2>
              <p className="ob-sub">Pick your top priorities.</p>
              <div className="ob-chips">
                {IMPROVE.map(g => (
                  <button key={g} className={`ob-chip ${form.improve.includes(g) ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, improve: toggle(f.improve, g) }))}>
                    {form.improve.includes(g) && <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓ </span>}
                    {g}
                  </button>
                ))}
              </div>
              <div className="ob-input-wrap">
                <input className="ob-input" placeholder="Other — anything else? (optional)"
                  value={form.improveOther}
                  onChange={e => setForm(f => ({ ...f, improveOther: e.target.value }))} />
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext}
                  disabled={form.improve.length === 0 && !form.improveOther.trim()}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 7 — Help */}
          {step === 7 && (
            <div className="ob-step">
              <div className="ob-step-label">07 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">What kind of help do you want from KARA?</h2>
              <p className="ob-sub">Select all that interest you.</p>
              <div className="ob-chips">
                {HELP.map(h => (
                  <button key={h} className={`ob-chip ${form.help.includes(h) ? 'ob-chip--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, help: toggle(f.help, h) }))}>
                    {form.help.includes(h) && <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓ </span>}
                    {h}
                  </button>
                ))}
              </div>
              <div className="ob-input-wrap">
                <input className="ob-input" placeholder="Other — something specific? (optional)"
                  value={form.helpOther}
                  onChange={e => setForm(f => ({ ...f, helpOther: e.target.value }))} />
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext}
                  disabled={form.help.length === 0 && !form.helpOther.trim()}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 8 — Contact */}
          {step === 8 && (
            <div className="ob-step">
              <div className="ob-step-label">08 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">Where should we send your audit?</h2>
              <p className="ob-sub">We'll reach out within 24 hours.</p>
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
                  value={form.contact}
                  onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} />
              </div>
              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" onClick={goNext} disabled={!form.contact.trim()}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 9 — Social Connect + Note */}
          {step === 9 && (
            <div className="ob-step">
              <div className="ob-step-label">09 / {TOTAL_STEPS}</div>
              <h2 className="ob-title">
                Connect your accounts{' '}
                <span style={{ color: 'var(--color-ink-4)', fontWeight: 400, fontSize: '0.72em' }}>(optional)</span>
              </h2>
              <p className="ob-sub">
                Give KARA access so we can run a deeper audit. You can skip this — we'll use your profile link instead.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
               {([
  { key: 'igConnected', icon: <Instagram size={18} strokeWidth={1.8} />, label: 'Instagram', color: '#E1306C', note: 'Reels, posts, reach & engagement' },
  { key: 'ytConnected', icon: <Youtube size={18} strokeWidth={1.8} />, label: 'YouTube', color: '#FF0000', note: 'Videos, watch time & analytics' },
  { key: 'liConnected', icon: <Linkedin size={18} strokeWidth={1.8} />, label: 'LinkedIn', color: '#0077B5', note: 'Posts, impressions & reach' },
 {
  key: 'ttConnected',
  icon: <FaXTwitter size={18} />,
  label: 'X',
  color: '#000000',
  note: 'Posts, impressions & followers'
},] as const).map(({ key, icon, label, color, note }) => {
                  const connected = form[key]
                  return (
                    <div key={key} style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '14px 16px', borderRadius: 'var(--radius-md)',
                      border: `1px solid ${connected ? 'var(--color-accent-mid)' : 'var(--color-border)'}`,
                      background: connected ? 'var(--color-accent-soft)' : 'var(--color-surface)',
                      transition: 'all 0.2s ease',
                    }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: `${color}18`, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color, flexShrink: 0,
                      }}>{icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-ink)' }}>{label}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-ink-3)' }}>{note}</div>
                      </div>
                      <button
                        onClick={() => setForm(f => ({ ...f, [key]: !connected }))}
                        style={{
                          padding: '7px 16px', borderRadius: 'var(--radius-full)',
                          border: connected ? 'none' : '1.5px solid var(--color-border-strong)',
                          background: connected ? 'var(--color-accent)' : 'transparent',
                          color: connected ? '#fff' : 'var(--color-ink-3)',
                          fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)',
                          cursor: 'pointer', transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {connected ? '✓ Requested' : 'Request Access'}
                      </button>
                    </div>
                  )
                })}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                <label style={{ fontSize: '13px', color: 'var(--color-ink-3)', fontWeight: 500 }}>
                  Anything specific to check?{' '}
                  <span style={{ color: 'var(--color-ink-4)', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea className="ob-input"
                  style={{ resize: 'none', lineHeight: 1.6, minHeight: '90px' }}
                  placeholder="My reels aren't getting views / I want a better bio / Need content ideas..."
                  value={form.specificNote}
                  onChange={e => setForm(f => ({ ...f, specificNote: e.target.value }))}
                  rows={3} />
              </div>

              {error && <p className="ob-error">{error}</p>}

              <div className="ob-nav">
                <button className="ob-btn-ghost" onClick={goBack}>← Back</button>
                <button className="ob-btn-primary" style={{ padding: '14px 28px', fontSize: '15px' }}
                  onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Get My Free Audit'} <ArrowRight size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}