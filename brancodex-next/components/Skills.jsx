/**
 * components/Skills.jsx
 *
 * 'use client' — tab switching is interactive.
 */

"use client";

import { useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────

const tabs = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools & CMS" },
  { id: "soft", label: "Soft Skills" },
];

const skillGroups = {
  frontend: [
    { name: "JavaScript", icon: "fab fa-js-square", color: "text-yellow-400" },
    { name: "React", icon: "fab fa-react", color: "text-blue-400" },
    { name: "Next.js", icon: "fab fa-js", color: "text-white" },
    { name: "Tailwind", icon: "fas fa-wind", color: "text-teal-400" },
    { name: "HTML5", icon: "fab fa-html5", color: "text-orange-500" },
    { name: "CSS3", icon: "fab fa-css3-alt", color: "text-blue-500" },
  ],
  backend: [
    { name: "Node.js", icon: "fab fa-node-js", color: "text-green-500" },
    { name: "Express", icon: "fas fa-server", color: "text-gray-300" },
    { name: "PostgreSQL", icon: "fas fa-database", color: "text-blue-500" },
  ],
  tools: [
    { name: "Git & GitHub", icon: "fab fa-git-alt", color: "text-red-500" },
    { name: "WordPress", icon: "fab fa-wordpress", color: "text-blue-700" },
  ],
  soft: [
    { name: "Comm.", icon: "fas fa-comments", color: "text-yellow-500" },
    {
      name: "Problem-Solving",
      icon: "fas fa-lightbulb",
      color: "text-yellow-300",
    },
    { name: "Teamwork", icon: "fas fa-users", color: "text-green-500" },
    { name: "Time Mgt.", icon: "fas fa-clock", color: "text-orange-400" },
  ],
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");

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
              className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skill pills grid */}
        <div
          className="skill-pills-grid"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {skillGroups[activeTab].map((skill) => (
            <div className="skill-pill" key={skill.name}>
              <i className={`${skill.icon} text-2xl ${skill.color || ""}`}></i>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
