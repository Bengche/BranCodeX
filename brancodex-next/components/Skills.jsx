/**
 * components/Skills.jsx
 *
 * 'use client' — tab switching is interactive.
 */

'use client';

import { useState } from 'react';

// ─── Data ──────────────────────────────────────────────────────────────────

const tabs = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools & CMS' },
  { id: 'soft', label: 'Soft Skills' },
];

const skillGroups = {
  frontend: [
    { name: 'HTML5', icon: 'fa-brands fa-html5' },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt' },
    { name: 'JavaScript', icon: 'fa-brands fa-js' },
    { name: 'React', icon: 'fa-brands fa-react' },
    { name: 'Next.js', icon: 'fa-solid fa-n' },
    { name: 'Tailwind CSS', icon: 'fa-solid fa-wind' },
    { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap' },
    { name: 'Responsive Design', icon: 'fa-solid fa-mobile-screen' },
    { name: 'SEO Optimization', icon: 'fa-solid fa-magnifying-glass-chart' },
  ],
  backend: [
    { name: 'Node.js', icon: 'fa-brands fa-node-js' },
    { name: 'Express.js', icon: 'fa-solid fa-server' },
    { name: 'REST APIs', icon: 'fa-solid fa-plug' },
    { name: 'PostgreSQL', icon: 'fa-solid fa-database' },
    { name: 'Authentication & JWT', icon: 'fa-solid fa-lock' },
    { name: 'Performance Optimization', icon: 'fa-solid fa-gauge-high' },
  ],
  tools: [
    { name: 'Git & GitHub', icon: 'fa-brands fa-git-alt' },
    { name: 'WordPress', icon: 'fa-brands fa-wordpress' },
    { name: 'Figma', icon: 'fa-brands fa-figma' },
    { name: 'VS Code', icon: 'fa-solid fa-code' },
    { name: 'Jira', icon: 'fa-brands fa-jira' },
    { name: 'Elementor', icon: 'fa-solid fa-paint-roller' },
    { name: 'WooCommerce', icon: 'fa-brands fa-shopify' },
  ],
  soft: [
    { name: 'Problem Solving', icon: 'fa-solid fa-brain' },
    { name: 'Clear Communication', icon: 'fa-solid fa-comments' },
    { name: 'Team Collaboration', icon: 'fa-solid fa-people-group' },
    { name: 'Time Management', icon: 'fa-solid fa-clock' },
    { name: 'Client Empathy', icon: 'fa-solid fa-handshake' },
    { name: 'Adaptability', icon: 'fa-solid fa-arrows-rotate' },
    { name: 'Continuous Learning', icon: 'fa-solid fa-book-open' },
  ],
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');

  return (
    <section id="skills" className="skills-section">
      <div className="skills-inner">
        <h2 className="section-title" data-aos="fade-up">
          Our Technical Skills
        </h2>
        <p className="skills-intro" data-aos="fade-up" data-aos-delay="100">
          A curated mix of battle-tested technologies and modern frameworks that
          power every BranCodeX product — from pixel-perfect UIs to robust
          server-side logic.
        </p>

        {/* Tab buttons */}
        <div className="skill-tabs" data-aos="fade-up" data-aos-delay="150">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skill pills grid */}
        <div className="skill-pills-grid" data-aos="fade-up" data-aos-delay="200">
          {skillGroups[activeTab].map((skill) => (
            <div className="skill-pill" key={skill.name}>
              <i className={skill.icon}></i>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
