'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, FileText, RefreshCw, Video, Image, MessageSquare,
  Globe, Users, BarChart3, Rocket, Check, ChevronDown,
} from 'lucide-react'

interface ServiceProps {
  id: string
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  title: string
  short: string
  desc: string
  features: string[]
}

const SERVICES: ServiceProps[] = [
  {
    id: 'strategy',
    icon: TrendingUp,
    title: 'Content Strategy & Planning',
    short: 'Data-driven content calendars and weekly plans built around your audience.',
    desc: 'We help creators decide what to post next based on audience interest, current trends, competitor analysis, past content performance, and platform behavior. Instead of guessing content ideas, creators get a clear weekly or monthly content plan.',
    features: ['Content calendar planning', 'Trend research', 'Competitor research', 'Audience interest analysis', 'Weekly content ideas', 'Hook and topic suggestions'],
  },
  {
    id: 'scripts',
    icon: FileText,
    title: 'Script & Idea Development',
    short: 'Structured scripts, hooks, and outlines that improve viewer retention.',
    desc: 'We help creators convert rough ideas into structured scripts, talking points, hooks, video outlines, and storytelling formats that increase viewer retention.',
    features: ['Video script writing', 'Short-form hook generation', 'Podcast topic breakdowns', 'Educational content outlines', 'Storytelling improvement', 'CTA and intro optimization'],
  },
  {
    id: 'repurpose',
    icon: RefreshCw,
    title: 'Video Repurposing',
    short: 'Turn one long video into Reels, Shorts, TikToks, and LinkedIn posts.',
    desc: 'We help creators turn long-form videos, podcasts, webinars, interviews, or gaming streams into multiple short-form clips for platforms like Instagram Reels, YouTube Shorts, TikTok, LinkedIn, and X.',
    features: ['Long video to short clips', 'High-engagement moment detection', 'Clip selection', 'Subtitle generation', 'Platform-specific formatting', 'Multiple content pieces from one video'],
  },
  {
    id: 'editing',
    icon: Video,
    title: 'Video Editing Support',
    short: 'AI-assisted and human-refined editing to make every video platform-ready.',
    desc: 'We provide AI-assisted and human-refined editing support to make content more engaging, clean, and platform-ready.',
    features: ['Removing unnecessary sections', 'Adding subtitles', 'Adding transitions', 'Adding effects', 'Improving pacing', 'Creating short-form edits'],
  },
  {
    id: 'thumbnails',
    icon: Image,
    title: 'Thumbnail & Creative Direction',
    short: 'CTR-focused thumbnails that stop the scroll and drive more clicks.',
    desc: 'We help creators improve click-through rate by creating professional thumbnail concepts and visual directions that match their brand and audience.',
    features: ['Thumbnail concepts', 'Visual direction', 'Text suggestions', 'Color and layout ideas', 'CTR-focused design', 'Multiple thumbnail variations'],
  },
  {
    id: 'copy',
    icon: MessageSquare,
    title: 'Caption, Title & Description Writing',
    short: 'Platform-optimized copy that improves discoverability and engagement.',
    desc: 'We write platform-optimized titles, captions, descriptions, hashtags, and post copy that improve discoverability, engagement, and clarity.',
    features: ['YouTube titles', 'Instagram captions', 'LinkedIn post copy', 'TikTok captions', 'Hashtag research', 'SEO-friendly descriptions'],
  },
  {
    id: 'publishing',
    icon: Globe,
    title: 'Multi-Platform Publishing & Scheduling',
    short: 'Consistent publishing across YouTube, Instagram, TikTok, LinkedIn, and X.',
    desc: 'We help creators publish content consistently across multiple platforms at the right time with the right format and messaging.',
    features: ['YouTube posting support', 'Instagram posting support', 'TikTok posting support', 'LinkedIn posting support', 'X/Twitter posting support', 'Content scheduling'],
  },
  {
    id: 'community',
    icon: Users,
    title: 'Community & Comment Management',
    short: 'Monitor, engage, and turn audience feedback into your next content idea.',
    desc: 'We help creators manage audience engagement by tracking comments, identifying important feedback, and improving creator-audience relationships.',
    features: ['Comment monitoring', 'Reply suggestions', 'Audience feedback tracking', 'Community engagement support', 'Identifying common audience questions', 'Turning comments into content ideas'],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics & Performance Reports',
    short: 'Simple, actionable insights — not confusing raw numbers.',
    desc: 'We convert raw analytics into simple, actionable insights. Instead of only showing numbers, we explain what is working, what is not, and what should be improved.',
    features: ['Weekly performance reports', 'Retention analysis', 'Engagement analysis', 'CTR analysis', 'Best-performing content breakdown', 'Actionable recommendations'],
  },
  {
    id: 'growth',
    icon: Rocket,
    title: 'Growth Strategy',
    short: 'A dedicated content strategist studying data and planning your next moves.',
    desc: 'We act as a content strategist for creators. We study what is performing well and recommend what type of content should be created next.',
    features: ['Monthly growth strategy', 'Content improvement suggestions', 'Audience behavior insights', 'Competitor trend tracking', 'Best format recommendations', 'Next content ideas based on data'],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function ServiceCard({ service, index }: { service: ServiceProps; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = service.icon

  return (
    <motion.div className="service-card" variants={cardVariants}>
      <div className="service-card__top">
        <div className="service-card__icon-wrap">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <span className="badge-service">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__short">{service.short}</p>

      {expanded && (
        <div className="service-card__expanded">
          <p className="service-card__desc">{service.desc}</p>
          <ul className="service-card__features">
            {service.features.map(f => (
              <li key={f} className="service-card__feature">
                <Check size={13} strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="service-card__toggle"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? 'Show less' : 'See details'}
        <ChevronDown
          size={14}
          strokeWidth={2.5}
          style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        />
      </button>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">What We Do</span>
          <h2 className="section-title">What KARA Does</h2>
          <p className="section-subtitle">
            We help creators turn one idea or one long-form video into a complete content system
            — strategy, editing, repurposing, distribution, and growth all in one workflow.
          </p>
        </motion.div>

        <motion.div
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
