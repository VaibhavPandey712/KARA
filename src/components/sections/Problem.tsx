'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Monitor, Users, Clock, BarChart3, Smile, Layers } from 'lucide-react'

const PAIN_POINTS = [
  {
    icon: Monitor,
    title: 'Too many tools',
    desc: 'Scattered across editing, scheduling, analytics, and design apps with no central system.',
  },
  {
    icon: Users,
    title: 'Too many team members',
    desc: 'Managing editors, writers, designers, and strategists adds complexity and communication overhead.',
  },
  {
    icon: Clock,
    title: 'Too much manual work',
    desc: 'Repurposing content, writing captions, and formatting for each platform takes hours every week.',
  },
  {
    icon: BarChart3,
    title: 'Too many dashboards',
    desc: 'Analytics live across YouTube Studio, Instagram Insights, TikTok, and more — impossible to unify.',
  },
  {
    icon: Smile,
    title: 'Not enough time to create',
    desc: 'Creators spend so much time managing operations that creativity and deep work suffer.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Problem() {
  return (
    <section className="section problem" id="problem">
      <div className="container">
        <motion.div
          className="problem__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">The Creator Problem</span>
          <h2 className="section-title">
            Creators Should Create,<br />
            <span className="problem__title-em">Not Manage Everything</span>
          </h2>
          <p className="section-subtitle">
            Today, being a creator means doing far more than just recording. You research trends,
            write scripts, edit videos, design thumbnails, craft captions, post across platforms,
            manage comments, study analytics, and plan future content. It never stops.
          </p>
        </motion.div>

        <motion.div
          className="problem__growth-note"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="problem__quote-bar" />
          <p className="problem__quote-text">
            As creators grow, they often need to hire video editors, thumbnail designers, script
            writers, social media managers, community managers, content strategists, and analytics
            specialists. Managing all these people becomes <strong>expensive, slow, confusing,
            and difficult to scale.</strong>
          </p>
        </motion.div>

        <motion.div
          className="problem__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PAIN_POINTS.map((point) => {
            const Icon = point.icon
            return (
              <motion.div key={point.title} className="problem__card" variants={itemVariants}>
                <div className="problem__card-icon">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="problem__card-title">{point.title}</h3>
                <p className="problem__card-desc">{point.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="problem__footer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="problem__solution-bar">
            <div className="problem__solution-icon">
              <Layers size={20} strokeWidth={2} />
            </div>
            <p className="problem__solution-text">
              KARA brings everything into <strong>one simple AI-assisted workflow.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
