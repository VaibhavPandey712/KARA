'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, DollarSign, CalendarDays, TrendingUp, RefreshCw, BarChart3 } from 'lucide-react'

interface CreatorType {
  label: string
  emoji: string
}

const CREATOR_TYPES: CreatorType[] = [
  { label: 'YouTubers',         emoji: '▶' },
  { label: 'Instagram Creators',emoji: '◎' },
  { label: 'Podcasters',        emoji: '🎙' },
  { label: 'Coaches',           emoji: '◆' },
  { label: 'Educators',         emoji: '◈' },
  { label: 'Startup Founders',  emoji: '◉' },
  { label: 'Business Creators', emoji: '◻' },
  { label: 'Tech Creators',     emoji: '◧' },
  { label: 'Personal Brands',   emoji: '✦' },
  { label: 'Influencers',       emoji: '★' },
]

interface Benefit {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  title: string
  desc: string
}

const BENEFITS: Benefit[] = [
  {
    icon: Clock,
    title: 'Save Time',
    desc: 'Spend less time managing content operations and more time on creativity, deep work, and ideas that matter.',
  },
  {
    icon: DollarSign,
    title: 'Reduce Team Cost',
    desc: 'No need to hire a large team of editors, writers, managers, designers, and strategists separately.',
  },
  {
    icon: CalendarDays,
    title: 'Post Consistently',
    desc: 'Stay active on every platform with a steady publishing cadence — even during your busiest weeks.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Smarter',
    desc: 'Every content decision is backed by analytics and audience insights — not guesswork or gut feeling.',
  },
  {
    icon: RefreshCw,
    title: 'Repurpose More',
    desc: 'One long-form video becomes many short clips, posts, captions, and content assets across every platform.',
  },
  {
    icon: BarChart3,
    title: 'Understand Analytics',
    desc: 'Get plain-language explanations and clear action steps — not confusing dashboards full of raw numbers.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function TargetCreators() {
  return (
    <>
      {/* Target Creators */}
      <section className="section target-creators" id="creators">
        <div className="container">
          <motion.div
            className="target-creators__header"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">Who It's For</span>
            <h2 className="section-title">Built for Modern Creators</h2>
            <p className="section-subtitle">
              KARA is especially powerful for creators who already have content but
              struggle with consistency, editing, repurposing, posting, analytics, and growth planning.
            </p>
          </motion.div>

          <motion.div
            className="creators-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {CREATOR_TYPES.map((c) => (
              <motion.div
                key={c.label}
                className="creator-pill"
                variants={itemVariants}
              >
                <span className="creator-pill__emoji">{c.emoji}</span>
                {c.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section benefits" id="benefits">
        <div className="container">
          <motion.div
            className="benefits__header"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">Benefits</span>
            <h2 className="section-title">What Creators Get With KARA</h2>
            <p className="section-subtitle">
              A complete content operations system that saves time, reduces costs, and
              accelerates growth.
            </p>
          </motion.div>

          <motion.div
            className="benefits__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {BENEFITS.map((b) => {
              const Icon = b.icon
              return (
                <motion.div key={b.title} className="benefit-card" variants={itemVariants}>
                  <div className="benefit-card__icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="benefit-card__title">{b.title}</h3>
                  <p className="benefit-card__desc">{b.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </>
  )
}
