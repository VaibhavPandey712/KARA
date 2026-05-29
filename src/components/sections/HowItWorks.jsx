import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './HowItWorks.css';

const STEPS = [
  {
    number: '01',
    color: 'blue',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
    title: 'Upload or Share Your Content',
    desc: 'The creator uploads a YouTube video, podcast, webinar, gaming stream, course video, or even just a rough idea. Any format, any length.',
  },
  {
    number: '02',
    color: 'violet',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'We Plan the Content System',
    desc: 'KARA studies the content and creates a complete plan — clips, captions, thumbnails, posting formats, and distribution across all relevant platforms.',
  },
  {
    number: '03',
    color: 'teal',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    title: 'We Create & Repurpose',
    desc: 'The content is transformed into short-form videos, captions, thumbnails, descriptions, and platform-ready posts — all optimized for each channel.',
  },
  {
    number: '04',
    color: 'orange',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'We Publish & Manage',
    desc: 'Content is scheduled and published across YouTube, Instagram, TikTok, LinkedIn, and X at the optimal time with platform-specific formatting.',
  },
  {
    number: '05',
    color: 'green',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'We Analyze & Improve',
    desc: 'KARA studies performance data and delivers clear, actionable recommendations for your next piece of content. No guesswork — only data-backed decisions.',
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section how-it-works" id="how-it-works" ref={ref}>
      <div className="container">
        <div className={`how-it-works__header ${isVisible ? 'how-it-works__header--visible' : ''}`}>
          <span className="section-label">The Process</span>
          <h2 className="section-title">How KARA Works</h2>
          <p className="section-subtitle">
            A simple five-step workflow that takes your raw content and turns it
            into a complete multi-platform growth system.
          </p>
        </div>

        <div className={`how-it-works__steps ${isVisible ? 'how-it-works__steps--visible' : ''}`}>
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`step-card step-card--${step.color}`}
              style={{ '--step-delay': `${i * 0.12}s` }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="step-card__connector" aria-hidden="true">
                  <div className="step-card__connector-line" />
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <polygon points="5,10 0,0 10,0" fill="var(--color-border)"/>
                  </svg>
                </div>
              )}

              <div className="step-card__number-wrap">
                <div className="step-card__icon">{step.icon}</div>
                <span className="step-card__number">{step.number}</span>
              </div>

              <div className="step-card__content">
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`how-it-works__footer ${isVisible ? 'how-it-works__footer--visible' : ''}`}>
          <div className="how-it-works__tagline">
            <div className="how-it-works__tagline-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <p>
              One piece of content becomes a{' '}
              <strong>complete creator growth system.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}