/**
 * components/Projects.jsx
 *
 * 'use client' — slider scroll + iframe live-preview on demand.
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';

// ─── Data ──────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 'njimbong',
    title: 'Njimbong Marketplace',
    description:
      'A full-featured e-commerce platform connecting local Cameroon vendors with buyers. Built with Next.js, PostgreSQL, and MoMo payment integration.',
    tags: ['E-Commerce', 'Next.js', 'PostgreSQL'],
    previewUrl: 'https://njimbong.com',
    thumbnail: '/images/njimbong-thumb.webp',
    live: true,
  },
  {
    id: 'fonlok',
    title: 'Fonlok Escrow',
    description:
      'A secure escrow service app that holds funds in trust for Cameroon online transactions. Reduces fraud and builds buyer-seller trust.',
    tags: ['FinTech', 'React', 'Node.js'],
    previewUrl: 'https://fonlok.com',
    thumbnail: '/images/fonlok-thumb.webp',
    live: true,
  },
  {
    id: 'jobfinder',
    title: 'Job Finder App',
    description:
      'A job listing platform tailored for Cameroon and Central Africa. Companies post vacancies; job seekers filter by city, sector, and experience level.',
    tags: ['Job Board', 'React', 'REST API'],
    previewUrl: 'https://jobfinder.brancodex.com',
    thumbnail: '/images/jobfinder-thumb.webp',
    live: true,
  },
  {
    id: 'countryinfo',
    title: 'Country Information App',
    description:
      'A React-based app using the Rest Countries API to display flag, population, currency, languages, and bordering nations for every country in the world.',
    tags: ['React', 'REST API', 'Education'],
    previewUrl: 'https://countries.brancodex.com',
    thumbnail: '/images/country-thumb.webp',
    live: true,
  },
  {
    id: 'schoolmgmt',
    title: 'School Management System',
    description:
      'An academic management platform for Cameroon secondary schools — student records, fee tracking, results, timetables, and teacher dashboards.',
    tags: ['EdTech', 'Node.js', 'PostgreSQL'],
    previewUrl: null,
    thumbnail: '/images/school-thumb.webp',
    live: false,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Projects() {
  const viewportRef = useRef(null);
  const iframeContainers = useRef({});

  /** Horizontal scroll for the card strip. */
  function scrollSlider(direction) {
    if (!viewportRef.current) return;
    const cardWidth =
      viewportRef.current.querySelector('.project-card')?.offsetWidth ?? 340;
    const gap = 20;
    viewportRef.current.scrollBy({
      left: direction === 'next' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    });
  }

  /** Replace the thumbnail with a live iframe on click. */
  function loadIframe(id, url) {
    const container = iframeContainers.current[id];
    if (!container || !url) return;
    container.innerHTML = `<iframe
      src="${url}"
      title="Live preview"
      loading="lazy"
      class="project-iframe"
      sandbox="allow-scripts allow-same-origin allow-forms"
    ></iframe>`;
  }

  return (
    <section id="projects" className="projects-section" data-aos="fade-up">
      <h2 className="section-title" data-aos="fade-up">
        Projects &amp; Case Studies
      </h2>
      <p className="projects-intro" data-aos="fade-up" data-aos-delay="100">
        Real products built for real clients — from Cameroon-focused platforms to
        global-ready web applications.
      </p>

      {/* Slider */}
      <div className="projects-slider-wrapper">
        <button
          className="proj-ctrl-btn left"
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollSlider('prev')}
        >
          <i className="fa fa-chevron-left"></i>
        </button>

        <div className="projects-viewport" ref={viewportRef}>
          <div className="projects-track">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                {/* Media area */}
                <div
                  className="project-media"
                  ref={(el) => (iframeContainers.current[project.id] = el)}
                >
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="340px"
                    style={{ objectFit: 'cover' }}
                    className="project-thumb"
                  />
                  {project.live && (
                    <button
                      type="button"
                      className="preview-overlay-btn"
                      onClick={() => loadIframe(project.id, project.previewUrl)}
                    >
                      <i className="fa fa-play-circle"></i> Load Preview
                    </button>
                  )}
                  {!project.live && (
                    <span className="coming-soon-label">Coming Soon</span>
                  )}
                </div>

                {/* Info */}
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.live && project.previewUrl && (
                    <a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-live-link"
                    >
                      View live <i className="fa fa-arrow-up-right-from-square"></i>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="proj-ctrl-btn right"
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollSlider('next')}
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
