import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './TargetCreators.css';

const CREATOR_TYPES = [
  { label: 'YouTubers',         emoji: '▶', color: 'red' },
  { label: 'Instagram Creators',emoji: '◎', color: 'pink' },
  { label: 'Podcasters',        emoji: '🎙', color: 'violet' },
  { label: 'Coaches',           emoji: '◆', color: 'blue' },
  { label: 'Educators',         emoji: '◈', color: 'indigo' },
  { label: 'Startup Founders',  emoji: '◉', color: 'teal' },
  { label: 'Business Creators', emoji: '◻', color: 'green' },
  { label: 'Tech Creators',     emoji: '◧', color: 'cyan' },
  { label: 'Personal Brands',   emoji: '✦', color: 'amber' },
  { label: 'Influencers',       emoji: '★', color: 'orange' },
];

const BENEFITS = [
  {
    color: 'blue',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Save Time',
    desc: 'Spend less time managing content operations and more time on creativity, deep work, and ideas that matter.',
  },
  {
    color: 'green',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Reduce Team Cost',
    desc: 'No need to hire a large team of editors, writers, managers, designers, and strategists separately.',
  },
  {
    color: 'teal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Post Consistently',
    desc: 'Stay active on every platform with a steady publishing cadence — even during your busiest weeks.',
  },
  {
    color: 'violet',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Grow Smarter',
    desc: 'Every content decision is backed by analytics and audience insights — not guesswork or gut feeling.',
  },
  {
    color: 'orange',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    title: 'Repurpose More',
    desc: 'One long-form video becomes many short clips, posts, captions, and content assets across every platform.',
  },
  {
    color: 'indigo',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="3" y1="20" x2="21" y2="20"/>
      </svg>
    ),
    title: 'Understand Analytics',
    desc: 'Get plain-language explanations and clear action steps — not confusing dashboards full of raw numbers.',
  },
];

export default function TargetCreators() {
  const { ref: creatorsRef, isVisible: creatorsVisible } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();

  return (
    <>
      {/* Target Creators */}
      <section className="section target-creators" id="creators" ref={creatorsRef}>
        <div className="container">
          <div className={`target-creators__header ${creatorsVisible ? 'target-creators__header--visible' : ''}`}>
            <span className="section-label">Who It's For</span>
            <h2 className="section-title">Built for Modern Creators</h2>
            <p className="section-subtitle">
              KARA is especially powerful for creators who already have content but
              struggle with consistency, editing, repurposing, posting, analytics, and growth planning.
            </p>
          </div>

          <div className={`creators-grid ${creatorsVisible ? 'creators-grid--visible' : ''}`}>
            {CREATOR_TYPES.map((c, i) => (
              <div
                key={c.label}
                className={`creator-pill creator-pill--${c.color}`}
                style={{ '--pill-delay': `${i * 0.06}s` }}
              >
                <span className="creator-pill__emoji">{c.emoji}</span>
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section benefits" id="benefits" ref={benefitsRef}>
        <div className="container">
          <div className={`benefits__header ${benefitsVisible ? 'benefits__header--visible' : ''}`}>
            <span className="section-label">Benefits</span>
            <h2 className="section-title">What Creators Get With KARA</h2>
            <p className="section-subtitle">
              A complete content operations system that saves time, reduces costs, and
              accelerates growth.
            </p>
          </div>

          <div className={`benefits__grid ${benefitsVisible ? 'benefits__grid--visible' : ''}`}>
            {BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className={`benefit-card benefit-card--${b.color}`}
                style={{ '--card-delay': `${i * 0.1}s` }}
              >
                <div className="benefit-card__icon">{b.icon}</div>
                <h3 className="benefit-card__title">{b.title}</h3>
                <p className="benefit-card__desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}