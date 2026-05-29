import React, { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Services.css';

const SERVICES = [
  {
    id: 'strategy',
    color: 'blue',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
      </svg>
    ),
    title: 'Content Strategy & Planning',
    short: 'Data-driven content calendars and weekly plans built around your audience.',
    desc: 'We help creators decide what to post next based on audience interest, current trends, competitor analysis, past content performance, and platform behavior. Instead of guessing content ideas, creators get a clear weekly or monthly content plan.',
    features: ['Content calendar planning', 'Trend research', 'Competitor research', 'Audience interest analysis', 'Weekly content ideas', 'Hook and topic suggestions'],
  },
  {
    id: 'scripts',
    color: 'violet',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Script & Idea Development',
    short: 'Structured scripts, hooks, and outlines that improve viewer retention.',
    desc: 'We help creators convert rough ideas into structured scripts, talking points, hooks, video outlines, and storytelling formats that increase viewer retention.',
    features: ['Video script writing', 'Short-form hook generation', 'Podcast topic breakdowns', 'Educational content outlines', 'Storytelling improvement', 'CTA and intro optimization'],
  },
  {
    id: 'repurpose',
    color: 'teal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    title: 'Video Repurposing',
    short: 'Turn one long video into Reels, Shorts, TikToks, and LinkedIn posts.',
    desc: 'We help creators turn long-form videos, podcasts, webinars, interviews, or gaming streams into multiple short-form clips for platforms like Instagram Reels, YouTube Shorts, TikTok, LinkedIn, and X.',
    features: ['Long video to short clips', 'High-engagement moment detection', 'Clip selection', 'Subtitle generation', 'Platform-specific formatting', 'Multiple content pieces from one video'],
  },
  {
    id: 'editing',
    color: 'orange',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    title: 'Video Editing Support',
    short: 'AI-assisted and human-refined editing to make every video platform-ready.',
    desc: 'We provide AI-assisted and human-refined editing support to make content more engaging, clean, and platform-ready.',
    features: ['Removing unnecessary sections', 'Adding subtitles', 'Adding transitions', 'Adding effects', 'Improving pacing', 'Creating short-form edits'],
  },
  {
    id: 'thumbnails',
    color: 'pink',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    title: 'Thumbnail & Creative Direction',
    short: 'CTR-focused thumbnails that stop the scroll and drive more clicks.',
    desc: 'We help creators improve click-through rate by creating professional thumbnail concepts and visual directions that match their brand and audience.',
    features: ['Thumbnail concepts', 'Visual direction', 'Text suggestions', 'Color and layout ideas', 'CTR-focused design', 'Multiple thumbnail variations'],
  },
  {
    id: 'copy',
    color: 'indigo',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Caption, Title & Description Writing',
    short: 'Platform-optimized copy that improves discoverability and engagement.',
    desc: 'We write platform-optimized titles, captions, descriptions, hashtags, and post copy that improve discoverability, engagement, and clarity.',
    features: ['YouTube titles', 'Instagram captions', 'LinkedIn post copy', 'TikTok captions', 'Hashtag research', 'SEO-friendly descriptions'],
  },
  {
    id: 'publishing',
    color: 'green',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Multi-Platform Publishing & Scheduling',
    short: 'Consistent publishing across YouTube, Instagram, TikTok, LinkedIn, and X.',
    desc: 'We help creators publish content consistently across multiple platforms at the right time with the right format and messaging.',
    features: ['YouTube posting support', 'Instagram posting support', 'TikTok posting support', 'LinkedIn posting support', 'X/Twitter posting support', 'Content scheduling'],
  },
  {
    id: 'community',
    color: 'rose',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Community & Comment Management',
    short: 'Monitor, engage, and turn audience feedback into your next content idea.',
    desc: 'We help creators manage audience engagement by tracking comments, identifying important feedback, and improving creator-audience relationships.',
    features: ['Comment monitoring', 'Reply suggestions', 'Audience feedback tracking', 'Community engagement support', 'Identifying common audience questions', 'Turning comments into content ideas'],
  },
  {
    id: 'analytics',
    color: 'amber',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="3" y1="20" x2="21" y2="20"/>
      </svg>
    ),
    title: 'Analytics & Performance Reports',
    short: 'Simple, actionable insights — not confusing raw numbers.',
    desc: 'We convert raw analytics into simple, actionable insights. Instead of only showing numbers, we explain what is working, what is not, and what should be improved.',
    features: ['Weekly performance reports', 'Retention analysis', 'Engagement analysis', 'CTR analysis', 'Best-performing content breakdown', 'Actionable recommendations'],
  },
  {
    id: 'growth',
    color: 'blue',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Growth Strategy',
    short: 'A dedicated content strategist studying data and planning your next moves.',
    desc: 'We act as a content strategist for creators. We study what is performing well and recommend what type of content should be created next.',
    features: ['Monthly growth strategy', 'Content improvement suggestions', 'Audience behavior insights', 'Competitor trend tracking', 'Best format recommendations', 'Next content ideas based on data'],
  },
];

function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`service-card service-card--${service.color}`}
      style={{ '--card-delay': `${(index % 3) * 0.08}s` }}
    >
      <div className="service-card__top">
        <div className="service-card__icon-wrap">
          {service.icon}
        </div>
        <span className={`badge badge-service badge-service--${service.color}`}>
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
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
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
        <svg
          width="14" height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
    </div>
  );
}

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section services" id="services" ref={ref}>
      <div className="container">
        <div className={`services__header ${isVisible ? 'services__header--visible' : ''}`}>
          <span className="section-label">What We Do</span>
          <h2 className="section-title">What KARA Does</h2>
          <p className="section-subtitle">
            We help creators turn one idea or one long-form video into a complete content system
            — strategy, editing, repurposing, distribution, and growth all in one workflow.
          </p>
        </div>

        <div className={`services__grid ${isVisible ? 'services__grid--visible' : ''}`}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}