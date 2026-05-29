import React from 'react';
import './Hero.css';

const OUTPUT_TAGS = [
  { label: 'YouTube Short',    color: 'red',    icon: '▶' },
  { label: 'Instagram Reel',   color: 'pink',   icon: '◎' },
  { label: 'TikTok Clip',      color: 'violet', icon: '♪' },
  { label: 'LinkedIn Post',    color: 'blue',   icon: '◈' },
  { label: 'Thumbnail Design', color: 'teal',   icon: '◻' },
  { label: 'SEO Caption',      color: 'orange', icon: '✦' },
  { label: 'Analytics Report', color: 'green',  icon: '◉' },
  { label: 'Growth Strategy',  color: 'indigo', icon: '◆' },
];

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      {/* Background blobs */}
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />
      <div className="hero__blob hero__blob--3" aria-hidden="true" />

      <div className="container hero__inner">
        {/* Left: copy */}
        <div className="hero__copy">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            AI-Powered Creator Platform
          </div>

          <h1 className="hero__headline">
            Your AI-Powered<br />
            <span className="hero__headline-accent">Content Team</span><br />
            for Creator Growth
          </h1>

          <p className="hero__subheadline">
            KARA helps creators manage, repurpose, distribute, and grow their
            content across multiple platforms — without needing a large team of
            editors, managers, writers, and strategists.
          </p>

          <div className="hero__actions">
            {/* <button className="btn btn-primary hero__btn-primary" onClick={() => scrollTo('#contact')}>
              <span>Book a Free Creator Audit</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button> */}
            <button className="btn btn-secondary hero__btn-secondary" onClick={() => scrollTo('#how-it-works')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              See How It Works
            </button>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-avatars">
              {[1,2,3,4].map(i => (
                <div key={i} className={`hero__avatar hero__avatar--${i}`} aria-hidden="true" />
              ))}
            </div>
            <p className="hero__trust-text">
              <strong>500+</strong> creators already growing smarter
            </p>
          </div>
        </div>

        {/* Right: visual */}
        <div className="hero__visual" aria-label="KARA content workflow illustration">
          {/* Center card: creator upload */}
          <div className="hero__visual-center">
            <div className="hero__upload-card glass-card">
              <div className="hero__upload-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="12" y2="12"/>
                  <line x1="15" y1="15" x2="12" y2="12"/>
                </svg>
              </div>
              <p className="hero__upload-label">Upload Your Content</p>
              <p className="hero__upload-sub">1 video · 1 podcast · 1 idea</p>
              <div className="hero__upload-progress">
                <div className="hero__upload-bar" />
              </div>
            </div>

            {/* Arrow down */}
            <div className="hero__arrow" aria-hidden="true">
              <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
                <path d="M10 0 L10 22" stroke="url(#arrowGrad)" strokeWidth="2" strokeDasharray="4 3"/>
                <polygon points="10,30 4,20 16,20" fill="url(#arrowGrad)"/>
                <defs>
                  <linearGradient id="arrowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5b6af0" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* KARA engine */}
            <div className="hero__engine glass-card">
              <div className="hero__engine-icon">K</div>
              <div className="hero__engine-text">
                <p className="hero__engine-label">KARA Engine</p>
                <p className="hero__engine-sub">Processing & repurposing…</p>
              </div>
              <div className="hero__engine-ring" />
            </div>
          </div>

          {/* Output tags scattered around */}
          <div className="hero__outputs" aria-hidden="true">
            {OUTPUT_TAGS.map((tag, i) => (
              <div
                key={tag.label}
                className={`hero__output-tag hero__output-tag--${tag.color}`}
                style={{ '--delay': `${i * 0.15}s` }}
              >
                <span className="hero__output-tag-icon">{tag.icon}</span>
                {tag.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero__scroll-hint"
        onClick={() => scrollTo('#problem')}
        aria-label="Scroll down"
      >
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
      </button>
    </section>
  );
}