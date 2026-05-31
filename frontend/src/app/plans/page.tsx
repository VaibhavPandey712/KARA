'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Check, X, Zap, Star, Crown, ArrowRight, MessageCircle, ArrowLeft } from 'lucide-react'

const PLANS = [
  {
    key: 'lite',
    name: 'KARA Lite',
    tagline: 'For creators just getting started',
    price: '4,999',
    period: '/month',
    color: '#3B82F6',
    glowBg: 'rgba(59,130,246,0.07)',
    glowBorder: 'rgba(59,130,246,0.2)',
    glowShadow: 'rgba(59,130,246,0.15)',
    icon: <Zap size={20} strokeWidth={2} />,
    popular: false,
    cta: 'Start with Lite',
    whatsapp: 'Hi, I want to subscribe to KARA Lite plan at ₹4,999/month',
    features: [
      { text: '1 platform managed', yes: true },
      { text: 'Up to 8 posts/month', yes: true },
      { text: 'Basic video repurposing (4 clips)', yes: true },
      { text: 'Caption & hashtag writing', yes: true },
      { text: 'Monthly content calendar', yes: true },
      { text: 'Basic analytics summary', yes: true },
      { text: 'Video editing support', yes: false },
      { text: 'Thumbnail design', yes: false },
      { text: 'Dedicated strategist', yes: false },
      { text: 'Multi-platform publishing', yes: false },
    ],
  },
  {
    key: 'pro',
    name: 'KARA Pro',
    tagline: 'For serious creators scaling up',
    price: '12,999',
    period: '/month',
    color: '#7342E2',
    glowBg: 'rgba(115,66,226,0.07)',
    glowBorder: 'rgba(115,66,226,0.25)',
    glowShadow: 'rgba(115,66,226,0.2)',
    icon: <Star size={20} strokeWidth={2} />,
    popular: true,
    cta: 'Start with Pro',
    whatsapp: 'Hi, I want to subscribe to KARA Pro plan at ₹12,999/month',
    features: [
      { text: '3 platforms managed', yes: true },
      { text: 'Up to 20 posts/month', yes: true },
      { text: 'Full video repurposing (12 clips)', yes: true },
      { text: 'Caption, title & description writing', yes: true },
      { text: 'Weekly content calendar', yes: true },
      { text: 'Full analytics & performance report', yes: true },
      { text: 'Video editing support', yes: true },
      { text: 'Thumbnail design (8/month)', yes: true },
      { text: 'Dedicated content strategist', yes: false },
      { text: 'Multi-platform publishing', yes: true },
    ],
  },
  {
    key: 'elite',
    name: 'KARA Elite',
    tagline: 'Full content ops, fully managed',
    price: '24,999',
    period: '/month',
    color: '#EA580C',
    glowBg: 'rgba(234,88,12,0.07)',
    glowBorder: 'rgba(234,88,12,0.2)',
    glowShadow: 'rgba(234,88,12,0.15)',
    icon: <Crown size={20} strokeWidth={2} />,
    popular: false,
    cta: 'Start with Elite',
    whatsapp: 'Hi, I want to subscribe to KARA Elite plan at ₹24,999/month',
    features: [
      { text: 'All platforms managed', yes: true },
      { text: 'Unlimited posts/month', yes: true },
      { text: 'Unlimited video repurposing', yes: true },
      { text: 'Full copywriting suite', yes: true },
      { text: 'Daily content calendar & planning', yes: true },
      { text: 'Weekly analytics + strategy calls', yes: true },
      { text: 'Priority video editing', yes: true },
      { text: 'Unlimited thumbnail design', yes: true },
      { text: 'Dedicated content strategist', yes: true },
      { text: 'Multi-platform publishing + scheduling', yes: true },
    ],
  },
]

export default function PlansPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const [homeHovered, setHomeHovered] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/auth')
      else setUser(user)
    })
  }, [router])

  const handlePlanClick = (whatsappMsg: string) => {
    const encoded = encodeURIComponent(whatsappMsg)
    window.open(`https://wa.me/917XXXXXXXXX?text=${encoded}`, '_blank')
  }

  if (!user) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--color-surface)',
    }}>
      <div style={{ color: 'var(--color-ink-3)', fontSize: '14px' }}>Loading...</div>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-surface)',
      padding: '48px 24px 80px',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
    }}>

      {/* Back to Home — floating top left */}
      <button
        onClick={() => router.push('/')}
        onMouseEnter={() => setHomeHovered(true)}
        onMouseLeave={() => setHomeHovered(false)}
        style={{
          position: 'fixed',
          top: '24px',
          left: '24px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px 10px 14px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--color-border)',
          background: homeHovered ? 'var(--color-bg)' : 'var(--color-surface)',
          color: homeHovered ? 'var(--color-ink)' : 'var(--color-ink-3)',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'var(--font-body)',
          cursor: 'pointer',
          boxShadow: homeHovered ? '0 4px 20px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
          transform: homeHovered ? 'translateY(-1px)' : 'translateY(0)',
          transition: 'all 0.2s ease',
          letterSpacing: '0.01em',
        }}
      >
        <ArrowLeft
          size={14}
          strokeWidth={2.5}
          style={{
            transform: homeHovered ? 'translateX(-2px)' : 'translateX(0)',
            transition: 'transform 0.2s ease',
          }}
        />
        Back to Home
      </button>

      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '1100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '52px',
      }}>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: '640px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          marginTop: '32px',
        }}>

          <div className="section-label">⚡ Free audit used</div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 700,
            color: 'var(--color-ink)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0,
          }}>
            You're out of free credits.{' '}
            <span style={{ color: 'var(--color-accent)' }}>Upgrade to keep growing.</span>
          </h1>

          <p style={{
            fontSize: '15px',
            color: 'var(--color-ink-3)',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Your free audit gave you a snapshot. A KARA plan gives you a full content team — strategy, editing, repurposing, publishing, and growth, every single month.
          </p>

          <div style={{
            background: 'var(--color-accent-soft)',
            border: '1px solid var(--color-accent-mid)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            width: '100%',
            textAlign: 'left',
          }}>
            <div style={{
              fontSize: '11px', fontWeight: 700, color: 'var(--color-accent)',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              ✦ What you unlocked with your free audit
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Profile audit', 'Content review', '7-day growth plan', 'Platform analysis'].map(item => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '13px', color: 'var(--color-ink-2)',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '5px 12px',
                }}>
                  <Check size={12} strokeWidth={2.5} color="var(--color-accent)" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          width: '100%',
          alignItems: 'start',
        }}>
          {PLANS.map(plan => {
            const isHovered = hoveredPlan === plan.key
            const isBtnHovered = hoveredBtn === plan.key

            return (
              <div
                key={plan.key}
                onMouseEnter={() => setHoveredPlan(plan.key)}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{
                  position: 'relative',
                  background: 'var(--color-bg)',
                  border: `1px solid ${isHovered || plan.popular ? plan.glowBorder : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-xl)',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  boxShadow: isHovered
                    ? `0 16px 48px ${plan.glowShadow}, 0 4px 16px rgba(0,0,0,0.06)`
                    : plan.popular
                      ? `0 8px 32px ${plan.glowBg}`
                      : '0 2px 8px rgba(0,0,0,0.04)',
                  transform: isHovered
                    ? 'translateY(-6px) scale(1.01)'
                    : plan.popular
                      ? 'scale(1.02)'
                      : 'scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'default',
                }}
              >

                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-14px', left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--color-accent)',
                    color: '#fff',
                    fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    whiteSpace: 'nowrap',
                    boxShadow: 'var(--shadow-accent)',
                  }}>
                    ⚡ Most Popular
                  </div>
                )}

                {/* Icon + Name */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '44px', height: '44px',
                    borderRadius: 'var(--radius-sm)',
                    background: isHovered ? plan.color : plan.glowBg,
                    border: `1px solid ${plan.glowBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isHovered ? '#fff' : plan.color,
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                  }}>
                    {plan.icon}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '18px', fontWeight: 700,
                      color: 'var(--color-ink)', margin: '0 0 4px',
                    }}>
                      {plan.name}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--color-ink-3)', margin: 0 }}>
                      {plan.tagline}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{
                    fontSize: '16px', color: 'var(--color-ink-3)',
                    fontWeight: 500, alignSelf: 'flex-start', marginTop: '6px',
                  }}>₹</span>
                  <span style={{
                    fontSize: '36px', fontWeight: 800,
                    color: isHovered ? plan.color : 'var(--color-ink)',
                    letterSpacing: '-0.03em',
                    fontFamily: 'var(--font-heading)',
                    transition: 'color 0.3s ease',
                  }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--color-ink-3)', fontWeight: 500 }}>
                    {plan.period}
                  </span>
                </div>

                <div style={{
                  height: '1px',
                  background: isHovered ? plan.glowBorder : 'var(--color-border)',
                  transition: 'background 0.3s ease',
                }} />

                {/* Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  {plan.features.map((f, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '8px',
                      fontSize: '13px', lineHeight: 1.4,
                      color: f.yes ? 'var(--color-ink-2)' : 'var(--color-ink-4)',
                      transform: isHovered && f.yes ? 'translateX(2px)' : 'translateX(0)',
                      transition: `transform 0.2s ease ${i * 0.02}s`,
                    }}>
                      {f.yes
                        ? <Check size={14} strokeWidth={2.5} color={plan.color} style={{ flexShrink: 0, marginTop: '1px' }} />
                        : <X size={14} strokeWidth={2} color="var(--color-ink-4)" style={{ flexShrink: 0, marginTop: '1px' }} />
                      }
                      {f.text}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handlePlanClick(plan.whatsapp)}
                  onMouseEnter={() => setHoveredBtn(plan.key)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%', padding: '14px',
                    borderRadius: 'var(--radius-full)',
                    border: isBtnHovered || plan.popular ? 'none' : `1.5px solid ${plan.glowBorder}`,
                    background: isBtnHovered || plan.popular ? plan.color : plan.glowBg,
                    color: isBtnHovered || plan.popular ? '#fff' : plan.color,
                    fontSize: '14px', fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    boxShadow: isBtnHovered
                      ? `0 8px 24px ${plan.glowShadow}`
                      : plan.popular
                        ? 'var(--shadow-accent)'
                        : 'none',
                    transform: isBtnHovered ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    marginTop: 'auto',
                  }}
                >
                  <MessageCircle size={14} strokeWidth={2} />
                  {plan.cta}
                  <ArrowRight
                    size={14}
                    strokeWidth={2}
                    style={{
                      marginLeft: 'auto',
                      transform: isBtnHovered ? 'translateX(3px)' : 'translateX(0)',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </button>

              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={{ fontSize: '13px', color: 'var(--color-ink-4)' }}>
            All plans billed monthly · Cancel anytime · Setup within 48 hours
          </p>
          <p style={{ fontSize: '13px', color: 'var(--color-ink-4)' }}>
            Not sure which plan?{' '}
            <a href="https://wa.me/917XXXXXXXXX" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
              Chat with us on WhatsApp
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}