"use client";

import { useState } from "react";

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <section
      id="skills"
      className="skills-section py-16 bg-gray-900 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2
          className="section-title text-4xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Tech Stack
        </h2>
        <p className="text-gray-400 mb-10">
          Sharpened through practice, engineered for performance.
        </p>
        <div className="skills-tabs-container mb-12 border-b border-gray-800">
          <div className="skills-tabs flex justify-start md:justify-center overflow-x-auto no-scrollbar">
            <button
              className={`tab-btn${activeTab === "frontend" ? " active" : ""}`}
              onClick={() => setActiveTab("frontend")}
            >
              Frontend
            </button>
            <button
              className={`tab-btn${activeTab === "backend" ? " active" : ""}`}
              onClick={() => setActiveTab("backend")}
            >
              Backend
            </button>
            <button
              className={`tab-btn${activeTab === "tools" ? " active" : ""}`}
              onClick={() => setActiveTab("tools")}
            >
              Tools & CMS
            </button>
            <button
              className={`tab-btn${activeTab === "soft" ? " active" : ""}`}
              onClick={() => setActiveTab("soft")}
            >
              Soft Skills
            </button>
          </div>
        </div>
        <div className="skills-display-area min-h-[300px]">
          <div
            id="frontend"
            className={`skill-group${activeTab === "frontend" ? " active" : ""}`}
          >
            <div className="skills-grid">
              <div className="skill-pill">
                <i className="fab fa-js-square text-yellow-400 text-2xl"></i>{" "}
                <span>JavaScript</span>
              </div>
              <div className="skill-pill">
                <i className="fab fa-react text-blue-400 text-2xl"></i>{" "}
                <span>React</span>
              </div>
              <div className="skill-pill">
                <i className="fab fa-js text-white text-2xl"></i>{" "}
                <span>Next.js</span>
              </div>
              <div className="skill-pill">
                <i className="fas fa-wind text-teal-400 text-2xl"></i>{" "}
                <span>Tailwind</span>
              </div>
              <div className="skill-pill">
                <i className="fab fa-html5 text-orange-500 text-2xl"></i>{" "}
                <span>HTML5</span>
              </div>
              <div className="skill-pill">
                <i className="fab fa-css3-alt text-blue-500 text-2xl"></i>{" "}
                <span>CSS3</span>
              </div>
            </div>
          </div>
          <div
            id="backend"
            className={`skill-group${activeTab === "backend" ? " active" : ""}`}
          >
            <div className="skills-grid">
              <div className="skill-pill">
                <i className="fab fa-node-js text-green-500 text-2xl"></i>{" "}
                <span>Node.js</span>
              </div>
              <div className="skill-pill">
                <i className="fas fa-server text-gray-300 text-2xl"></i>{" "}
                <span>Express</span>
              </div>
              <div className="skill-pill">
                <i className="fas fa-database text-blue-500 text-2xl"></i>{" "}
                <span>PostgreSQL</span>
              </div>
            </div>
          </div>
          <div
            id="tools"
            className={`skill-group${activeTab === "tools" ? " active" : ""}`}
          >
            <div className="skills-grid">
              <div className="skill-pill">
                <i className="fab fa-git-alt text-red-500 text-2xl"></i>{" "}
                <span>Git &amp; GitHub</span>
              </div>
              <div className="skill-pill">
                <i className="fab fa-wordpress text-blue-700 text-2xl"></i>{" "}
                <span>WordPress</span>
              </div>
            </div>
          </div>
          <div
            id="soft"
            className={`skill-group${activeTab === "soft" ? " active" : ""}`}
          >
            <div className="skills-grid">
              <div className="skill-pill">
                <i className="fas fa-comments text-yellow-500 text-2xl"></i>{" "}
                <span>Comm.</span>
              </div>
              <div className="skill-pill">
                <i className="fas fa-lightbulb text-yellow-300 text-2xl"></i>{" "}
                <span>Problem-Solving</span>
              </div>
              <div className="skill-pill">
                <i className="fas fa-users text-green-500 text-2xl"></i>{" "}
                <span>Teamwork</span>
              </div>
              <div className="skill-pill">
                <i className="fas fa-clock text-orange-400 text-2xl"></i>{" "}
                <span>Time Mgt.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
