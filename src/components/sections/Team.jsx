import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Team.css';

const TEAM = [
  {
    id: 'ceo',
    initials: 'VP',
    name: 'Vaibhav Pandey',
    role: 'Founder & CEO',
    color: 'blue',
    desc: 'Leads the vision, strategy, creator partnerships, and overall direction of KARA. Focused on building the future operating system for the creator economy.',
    links: { linkedin: 'https://www.linkedin.com/in/vaibhav-pandey05/', x: '#' },
  },
  {
    id: 'cto',
    initials: 'ST',
    name: 'Sparsh Tyagi',
    role: 'Chief Technology Officer',
    color: 'violet',
    desc: 'Leads product development, AI systems, automation, platform architecture, and technical innovation behind KARA.',
    links: { linkedin: 'linkedin.com/in/sparsh-tyagi-a2519832a', x: '#' },
  },
  {
    id: 'coo',
    initials: 'YS',
    name: 'Yuvraj Singh',
    role: 'Chief Operating Officer',
    color: 'teal',
    desc: 'Manages operations, creator workflows, delivery systems, team coordination, and ensures smooth execution for every creator account.',
    links: { linkedin: 'linkedin.com/in/yuvraj-singh-08b046339', x: '#' },
  },
  {
    id: 'cfo',
    initials: 'VR',
    name: 'Vaishnavi Rajawat',
    role: 'Chief Financial Officer',
    color: 'orange',
    desc: 'Handles financial planning, pricing strategy, business growth, budgeting, and long-term sustainability of KARA.',
    links: { linkedin: 'linkedin.com/in/vaishnavi-rajawat-a22552362', x: '#' },
  },
];

const GRADIENT_MAP = {
  blue: 'linear-gradient(135deg, #5b6af0, #818cf8)',
  violet: 'linear-gradient(135deg, #7c3aed, #c084fc)',
  teal: 'linear-gradient(135deg, #0d9488, #5eead4)',
  orange: 'linear-gradient(135deg, #ea580c, #fb923c)',
};

export default function Team() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section team" id="team" ref={ref}>
      <div className="container">
        <div className={`team__header ${isVisible ? 'team__header--visible' : ''}`}>
          <span className="section-label">Leadership</span>
          <h2 className="section-title">Meet the Team Behind KARA</h2>
          <p className="section-subtitle">
            A passionate team of creators, engineers, and operators building the
            future of content management.
          </p>
        </div>

        <div className={`team__grid ${isVisible ? 'team__grid--visible' : ''}`}>
          {TEAM.map((member, i) => (
            <div
              key={member.id}
              className="team-card"
              style={{ '--card-delay': `${i * 0.12}s` }}
            >
              {/* Avatar */}
              <div className="team-card__avatar-wrap">
                <div
                  className="team-card__avatar"
                  style={{ background: GRADIENT_MAP[member.color] }}
                  aria-label={`${member.name} avatar`}
                >
                  <span className="team-card__initials">{member.initials}</span>
                </div>
                <div className="team-card__avatar-ring" aria-hidden="true" />
              </div>

              {/* Info */}
              <div className="team-card__info">
                <p className={`team-card__role team-card__role--${member.color}`}>{member.role}</p>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__desc">{member.desc}</p>
              </div>

              {/* Social */}
              <div className="team-card__social">
                <a href={member.links.linkedin} className="team-card__social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href={member.links.x} className="team-card__social-link" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}