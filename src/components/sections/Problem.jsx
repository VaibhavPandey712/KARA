import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Problem.css';

const PAIN_POINTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Too many tools',
    desc: 'Scattered across editing, scheduling, analytics, and design apps with no central system.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Too many team members',
    desc: 'Managing editors, writers, designers, and strategists adds complexity and communication overhead.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Too much manual work',
    desc: 'Repurposing content, writing captions, and formatting for each platform takes hours every week.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Too many dashboards',
    desc: 'Analytics live across YouTube Studio, Instagram Insights, TikTok, and more — impossible to unify.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: 'Not enough time to create',
    desc: 'Creators spend so much time managing operations that creativity and deep work suffer.',
  },
];

export default function Problem() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section problem" id="problem" ref={ref}>
      <div className="container">
        <div className={`problem__header ${isVisible ? 'problem__header--visible' : ''}`}>
          <span className="section-label">The Creator Problem</span>
          <h2 className="section-title">
            Creators Should Create,<br />
            <em className="problem__title-em">Not Manage Everything</em>
          </h2>
          <p className="section-subtitle">
            Today, being a creator means doing far more than just recording. You research trends,
            write scripts, edit videos, design thumbnails, craft captions, post across platforms,
            manage comments, study analytics, and plan future content. It never stops.
          </p>
        </div>

        <div className="problem__growth-note">
          <div className="problem__quote-bar" />
          <p>
            As creators grow, they often need to hire video editors, thumbnail designers, script
            writers, social media managers, community managers, content strategists, and analytics
            specialists. Managing all these people becomes <strong>expensive, slow, confusing,
            and difficult to scale.</strong>
          </p>
        </div>

        <div className={`problem__grid ${isVisible ? 'problem__grid--visible' : ''}`}>
          {PAIN_POINTS.map((point, i) => (
            <div
              key={point.title}
              className="problem__card"
              style={{ '--card-delay': `${i * 0.1}s` }}
            >
              <div className="problem__card-icon">
                {point.icon}
              </div>
              <h3 className="problem__card-title">{point.title}</h3>
              <p className="problem__card-desc">{point.desc}</p>
            </div>
          ))}
        </div>

        <div className={`problem__footer ${isVisible ? 'problem__footer--visible' : ''}`}>
          <div className="problem__solution-bar">
            <div className="problem__solution-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <p className="problem__solution-text">
              KARA brings everything into <strong>one simple AI-assisted workflow.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}