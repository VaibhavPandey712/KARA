'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'

import { handleAuditClick as goToAudit } from '@/lib/onboarding'
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

export function Vision() {
  return (
    <section className="section vision" id="vision">
      <div className="container">
        <motion.div
          className="vision__inner"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="vision__content">
            <span className="section-label">Long-Term Vision</span>
            <h2 className="section-title">Our Long-Term Vision</h2>
            <p className="vision__body" style={{ marginTop: '20px' }}>
              Our goal is not to build just another social media agency or editing tool.
              Our long-term vision is to become the{' '}
              <strong>operating system for the creator economy.</strong>
            </p>
            <p className="vision__body">
              In the future, a creator should be able to upload one piece of content and
              have an AI-powered team automatically edit it, repurpose it, distribute it,
              analyze it, optimize it, and plan the next piece of content.
            </p>

            <div className="vision__statement">
              <div className="vision__statement-bar" aria-hidden="true" />
              <p>
                KARA is built for the future where creators focus on creativity,
                and AI handles the content operations.
              </p>
            </div>
          </div>

          <div className="vision__visual" aria-hidden="true">
            <div className="vision__orbit-container">
              {/* Center */}
              <div className="vision__center-node">
                <span>K</span>
              </div>
              {/* Rings */}
              <div className="vision__ring vision__ring--1">
                {['Edit', 'Post', 'Grow', 'Analyze'].map((label, i) => (
                  <div key={label} className="vision__orbit-dot" style={{ '--orbit-angle': `${i * 90}deg` } as React.CSSProperties}>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="vision__ring vision__ring--2" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function CTA() {
  const router = useRouter()

  const handleAuditClick = () => goToAudit(router)

  return (
    <section className="section cta" id="contact">
      <div className="container">
        <motion.div
          className="cta__inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cta__content">
            <span className="section-label cta__label">Get Started</span>
            <h2 className="cta__title">
              Ready to Build Your<br />
              <span className="cta__title-accent">Creator Growth System?</span>
            </h2>
            <p className="cta__subtitle">
              Get a free creator audit and discover how your existing content can be
              repurposed, optimized, and scaled across platforms.
            </p>

            <div className="cta__actions">
              <button className="cta__btn-primary" onClick={handleAuditClick}>
                <CalendarDays size={18} strokeWidth={2.5} />
                Book a Free Creator Audit
              </button>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta__btn-whatsapp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '2px' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact Us on WhatsApp
              </a>
            </div>

            {/* Trust signals */}
            <div className="cta__trust">
              <div className="cta__trust-item"><span className="cta__trust-icon">✓</span> Free creator audit</div>
              <div className="cta__trust-item"><span className="cta__trust-icon">✓</span> No commitment required</div>
              <div className="cta__trust-item"><span className="cta__trust-icon">✓</span> Personal growth plan</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
