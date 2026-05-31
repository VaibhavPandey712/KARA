'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { X as XIcon, Check } from 'lucide-react'

const TRADITIONAL = [
  'Hire multiple people separately',
  'Use 5–10 different disconnected tools',
  'Manually coordinate everyone',
  'Spend hours checking raw analytics',
  'Guess what content to create next',
  'High costs, slow delivery, hard to scale',
]

const KARA_WAY = [
  'One AI-assisted content team',
  'One connected, streamlined workflow',
  'Faster repurposing and delivery',
  'Data-backed content decisions',
  'Clear weekly strategy and content plan',
  'More time, less cost, and faster growth',
]

export default function WhyKara() {
  return (
    <section className="section why-kara" id="why-kara">
      <div className="container">
        <motion.div
          className="why-kara__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">Why KARA</span>
          <h2 className="section-title">Why KARA Is Different</h2>
          <p className="section-subtitle">
            Most creators either do everything themselves or struggle to manage
            a growing team. KARA is a smarter third path.
          </p>
        </motion.div>

        <div className="why-kara__grid">
          {/* Traditional */}
          <motion.div
            className="comparison-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="comparison-card__header">
              <div className="comparison-card__badge comparison-card__badge--old">
                <XIcon size={14} strokeWidth={2.5} />
                Traditional Way
              </div>
              <h3 className="comparison-card__title">Managing It Yourself</h3>
            </div>
            <ul className="comparison-card__list">
              {TRADITIONAL.map(item => (
                <li key={item} className="comparison-card__item comparison-card__item--old">
                  <span className="comparison-card__icon comparison-card__icon--old">
                    <XIcon size={11} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* VS divider */}
          <div className="comparison-vs" aria-hidden="true">
            <div className="comparison-vs__line" />
            <span className="comparison-vs__label">VS</span>
            <div className="comparison-vs__line" />
          </div>

          {/* KARA way */}
          <motion.div
            className="comparison-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="comparison-card__glow" aria-hidden="true" />
            <div className="comparison-card__header">
              <div className="comparison-card__badge comparison-card__badge--kara">
                <Check size={14} strokeWidth={2.5} />
                The KARA Way
              </div>
              <h3 className="comparison-card__title">Powered by KARA</h3>
            </div>
            <ul className="comparison-card__list">
              {KARA_WAY.map(item => (
                <li key={item} className="comparison-card__item comparison-card__item--kara">
                  <span className="comparison-card__icon comparison-card__icon--kara">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Mission statement */}
        <motion.div
          className="why-kara__statement"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="why-kara__statement-inner">
            <p className="why-kara__statement-kicker">Our mission</p>
            <p className="why-kara__statement-text">
              We are not just another editing tool. We are building the{' '}
              <span className="why-kara__highlight">operating system for the creator economy.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
