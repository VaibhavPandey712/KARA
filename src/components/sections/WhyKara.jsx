import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './WhyKara.css';

const TRADITIONAL = [
  'Hire multiple people separately',
  'Use 5–10 different disconnected tools',
  'Manually coordinate everyone',
  'Spend hours checking raw analytics',
  'Guess what content to create next',
  'High costs, slow delivery, hard to scale',
];

const KARA_WAY = [
  'One AI-assisted content team',
  'One connected, streamlined workflow',
  'Faster repurposing and delivery',
  'Data-backed content decisions',
  'Clear weekly strategy and content plan',
  'More time, less cost, and faster growth',
];

export default function WhyKara() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section why-kara" id="why-kara" ref={ref}>
      <div className="container">
        <div className={`why-kara__header ${isVisible ? 'why-kara__header--visible' : ''}`}>
          <span className="section-label">Why KARA</span>
          <h2 className="section-title">Why KARA Is Different</h2>
          <p className="section-subtitle">
            Most creators either do everything themselves or struggle to manage
            a growing team. KARA is a smarter third path.
          </p>
        </div>

        <div className={`why-kara__grid ${isVisible ? 'why-kara__grid--visible' : ''}`}>
          {/* Traditional */}
          <div className="comparison-card comparison-card--old">
            <div className="comparison-card__header">
              <div className="comparison-card__badge comparison-card__badge--old">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Traditional Way
              </div>
              <h3 className="comparison-card__title">Managing It Yourself</h3>
            </div>
            <ul className="comparison-card__list">
              {TRADITIONAL.map(item => (
                <li key={item} className="comparison-card__item comparison-card__item--old">
                  <span className="comparison-card__icon comparison-card__icon--old">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* VS divider */}
          <div className="comparison-vs" aria-hidden="true">
            <div className="comparison-vs__line" />
            <span className="comparison-vs__label">VS</span>
            <div className="comparison-vs__line" />
          </div>

          {/* KARA way */}
          <div className="comparison-card comparison-card--kara">
            <div className="comparison-card__glow" aria-hidden="true" />
            <div className="comparison-card__header">
              <div className="comparison-card__badge comparison-card__badge--kara">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                The KARA Way
              </div>
              <h3 className="comparison-card__title">Powered by KARA</h3>
            </div>
            <ul className="comparison-card__list">
              {KARA_WAY.map(item => (
                <li key={item} className="comparison-card__item comparison-card__item--kara">
                  <span className="comparison-card__icon comparison-card__icon--kara">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mission statement */}
        <div className={`why-kara__statement ${isVisible ? 'why-kara__statement--visible' : ''}`}>
          <div className="why-kara__statement-inner">
            <p className="why-kara__statement-kicker">Our mission</p>
            <p className="why-kara__statement-text">
              We are not just another editing tool. We are building the{' '}
              <span className="why-kara__highlight">operating system for the creator economy.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}