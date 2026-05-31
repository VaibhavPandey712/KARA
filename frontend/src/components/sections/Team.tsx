'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'

interface TeamMember {
  id: string
  initials: string
  name: string
  role: string
  gradient: string
  desc: string
  links: { linkedin: string; x: string }
}

const TEAM: TeamMember[] = [
  {
    id: 'ceo',
    initials: 'VP',
    name: 'Vaibhav Pandey',
    role: 'Founder & CEO',
    gradient: 'linear-gradient(135deg, #7342E2, #9B6CF7)',
    desc: 'Leads the vision, strategy, creator partnerships, and overall direction of KARA. Focused on building the future operating system for the creator economy.',
    links: { linkedin: 'https://www.linkedin.com/in/vaibhav-pandey05/', x: '#' },
  },
  {
    id: 'cto',
    initials: 'ST',
    name: 'Sparsh Tyagi',
    role: 'Chief Technology Officer',
    gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
    desc: 'Leads product development, AI systems, automation, platform architecture, and technical innovation behind KARA.',
    links: { linkedin: 'https://linkedin.com/in/sparsh-tyagi-a2519832a', x: '#' },
  },
  {
    id: 'coo',
    initials: 'YS',
    name: 'Yuvraj Singh',
    role: 'Chief Operating Officer',
    gradient: 'linear-gradient(135deg, #0D9488, #5EEAD4)',
    desc: 'Manages operations, creator workflows, delivery systems, team coordination, and ensures smooth execution for every creator account.',
    links: { linkedin: 'https://linkedin.com/in/yuvraj-singh-08b046339', x: '#' },
  },
  {
    id: 'cfo',
    initials: 'VR',
    name: 'Vaishnavi Rajawat',
    role: 'Chief Financial Officer',
    gradient: 'linear-gradient(135deg, #EA580C, #FB923C)',
    desc: 'Handles financial planning, pricing strategy, business growth, budgeting, and long-term sustainability of KARA.',
    links: { linkedin: 'https://linkedin.com/in/vaishnavi-rajawat-a22552362', x: '#' },
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Team() {
  return (
    <section className="section team" id="team">
      <div className="container">
        <motion.div
          className="team__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">Leadership</span>
          <h2 className="section-title">Meet the Team Behind KARA</h2>
          <p className="section-subtitle">
            A passionate team of creators, engineers, and operators building the
            future of content management.
          </p>
        </motion.div>

        <motion.div
          className="team__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {TEAM.map((member) => (
            <motion.div key={member.id} className="team-card" variants={cardVariants}>
              {/* Avatar */}
              <div className="team-card__avatar-wrap">
                <div
                  className="team-card__avatar"
                  style={{ background: member.gradient }}
                  aria-label={`${member.name} avatar`}
                >
                  <span className="team-card__initials">{member.initials}</span>
                </div>
                <div className="team-card__avatar-ring" aria-hidden="true" />
              </div>

              {/* Info */}
              <div className="team-card__info">
                <p className="team-card__role">{member.role}</p>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__desc">{member.desc}</p>
              </div>

              {/* Social */}
              <div className="team-card__social">
                <a href={member.links.linkedin} className="team-card__social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={15} strokeWidth={1.8} />
                </a>
                <a href={member.links.x} className="team-card__social-link" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
