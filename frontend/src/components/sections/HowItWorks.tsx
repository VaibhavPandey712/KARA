'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Upload, CalendarDays, RefreshCw, Globe, TrendingUp, Layers } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload or Share Your Content',
    desc: 'The creator uploads a YouTube video, podcast, webinar, gaming stream, course video, or even just a rough idea. Any format, any length.',
  },
  {
    number: '02',
    icon: CalendarDays,
    title: 'We Plan the Content System',
    desc: 'KARA studies the content and creates a complete plan — clips, captions, thumbnails, posting formats, and distribution across all relevant platforms.',
  },
  {
    number: '03',
    icon: RefreshCw,
    title: 'We Create & Repurpose',
    desc: 'The content is transformed into short-form videos, captions, thumbnails, descriptions, and platform-ready posts — all optimized for each channel.',
  },
  {
    number: '04',
    icon: Globe,
    title: 'We Publish & Manage',
    desc: 'Content is scheduled and published across YouTube, Instagram, TikTok, LinkedIn, and X at the optimal time with platform-specific formatting.',
  },
  {
    number: '05',
    icon: TrendingUp,
    title: 'We Analyze & Improve',
    desc: 'KARA studies performance data and delivers clear, actionable recommendations for your next piece of content. No guesswork — only data-backed decisions.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function HowItWorks() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <div className="container">
        <motion.div
          className="how-it-works__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">The Process</span>
          <h2 className="section-title">How KARA Works</h2>
          <p className="section-subtitle">
            A simple five-step workflow that takes your raw content and turns it
            into a complete multi-platform growth system.
          </p>
        </motion.div>

        <motion.div
          className="how-it-works__steps"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <motion.div key={step.number} className="step-card" variants={stepVariants}>
                <div className="step-card__number-wrap">
                  <div className="step-card__icon">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                  <span className="step-card__number">{step.number}</span>
                </div>

                <div className="step-card__content">
                  <h3 className="step-card__title">{step.title}</h3>
                  <p className="step-card__desc">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="how-it-works__footer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="how-it-works__tagline">
            <div className="how-it-works__tagline-icon">
              <Layers size={20} strokeWidth={2} />
            </div>
            <p className="how-it-works__tagline-text">
              One piece of content becomes a <strong>complete creator growth system.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
