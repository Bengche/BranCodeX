"use client";

import { useRef, useState, useEffect } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
const PROJECT_SLUGS = ["njimbong", "fonlok", "jobvibe", "country"];

function formatViews(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

function useProjectViews() {
  const [views, setViews] = useState({});

  useEffect(() => {
    const stored = (() => {
      try { return JSON.parse(localStorage.getItem("viewedProjects") || "{}"); }
      catch { return {}; }
    })();

    PROJECT_SLUGS.forEach(async (slug) => {
      try {
        // Record view if first visit
        if (!stored[slug]) {
          const res = await fetch(`${BACKEND_URL}/api/projects/${slug}/view`, { method: "POST" });
          const data = await res.json();
          if (data.views) setViews((v) => ({ ...v, [slug]: data.views }));
          stored[slug] = true;
          localStorage.setItem("viewedProjects", JSON.stringify(stored));
        } else {
          const res = await fetch(`${BACKEND_URL}/api/projects/${slug}/views`);
          const data = await res.json();
          if (data.views) setViews((v) => ({ ...v, [slug]: data.views }));
        }
      } catch { /* non-fatal */ }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return views;
}

export default function Projects() {
  const viewportRef = useRef(null);
  const [loadedIframes, setLoadedIframes] = useState({});
  const views = useProjectViews();

  function scrollSlider(direction) {
    const viewport = viewportRef.current;
    const card = viewport ? viewport.querySelector(".project-card") : null;
    if (viewport && card) {
      const scrollAmount = card.offsetWidth + 20;
      viewport.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  }

  function loadIframe(id, url) {
    setLoadedIframes((prev) => ({ ...prev, [id]: url }));
  }

  function ViewBadge({ slug }) {
    const count = views[slug];
    if (!count) return null;
    return (
      <span className="project-views-badge">
        <i className="fa fa-eye" /> {formatViews(count)}
      </span>
    );
  }

  return (
    <section
      id="projects"
      className="projects-section py-16 bg-gray-900 text-white overflow-hidden mt-6"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "yellow" }}
          >
            Projects
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Focused results, clean UX, and fast performance for clients in
            Bamenda, Cameroon, and the world.
          </p>
        </div>
        <div className="projects-viewport" ref={viewportRef}>
          <div className="projects-track" id="projectTrack">
            {/* Card 1: Njimbong */}
            <div className="project-card">
              <div className="media-container" id="media-njimbong">
                {loadedIframes["media-njimbong"] ? (
                  <iframe
                    src={loadedIframes["media-njimbong"]}
                    title="Njimbong"
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                ) : (
                  <>
                    <div
                      className="overlay-play"
                      onClick={() =>
                        loadIframe(
                          "media-njimbong",
                          "https://www.njimbong.com/",
                        )
                      }
                    >
                      <i className="fas fa-play-circle text-5xl"></i>
                      <span className="mt-2 font-bold">Interact with Site</span>
                    </div>
                    <img
                      src="/images/coder.jpg"
                      alt="Njimbong"
                      className="w-full h-full object-cover"
                    />
                  </>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-xl font-bold">Njimbong Marketplace</h3>
                  <ViewBadge slug="njimbong" />
                </div>
                <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                  Next.js + Node.js
                </span>
                <p className="text-gray-400 text-sm mt-3">
                  Secure buy-and-sell platform for the Cameroonian market.
                </p>
                <a
                  href="https://www.njimbong.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center bg-yellow-500 text-black py-2 rounded font-bold"
                >
                  View Live
                </a>
              </div>
            </div>

            {/* Card 2: Fonlok */}
            <div className="project-card">
              <div className="media-container" id="media-fonlok">
                {loadedIframes["media-fonlok"] ? (
                  <iframe
                    src={loadedIframes["media-fonlok"]}
                    title="Fonlok"
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                ) : (
                  <>
                    <div
                      className="overlay-play"
                      onClick={() =>
                        loadIframe("media-fonlok", "https://www.fonlok.com/")
                      }
                    >
                      <i className="fas fa-play-circle text-5xl"></i>
                      <span className="mt-2 font-bold">Interact with Site</span>
                    </div>
                    <img
                      src="/images/coder.jpg"
                      alt="Fonlok"
                      className="w-full h-full object-cover"
                    />
                  </>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-xl font-bold">Fonlok Escrow</h3>
                  <ViewBadge slug="fonlok" />
                </div>
                <span className="text-xs bg-green-600 px-2 py-1 rounded">
                  FinTech
                </span>
                <p className="text-gray-400 text-sm mt-3">
                  Trust-as-a-service middleman for MoMo transactions.
                </p>
                <a
                  href="https://www.fonlok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center bg-yellow-500 text-black py-2 rounded font-bold"
                >
                  View Live
                </a>
              </div>
            </div>

            {/* Card 3: Job Finder */}
            <div className="project-card">
              <div className="media-container" id="media-jobvibe">
                {loadedIframes["media-jobvibe"] ? (
                  <iframe
                    src={loadedIframes["media-jobvibe"]}
                    title="Job Vibe"
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                ) : (
                  <>
                    <div
                      className="overlay-play"
                      onClick={() =>
                        loadIframe(
                          "media-jobvibe",
                          "https://jobvibe.netlify.app/",
                        )
                      }
                    >
                      <i className="fas fa-play-circle text-5xl"></i>
                      <span className="mt-2 font-bold">Interact with Site</span>
                    </div>
                    <img
                      src="/images/coder.jpg"
                      alt="Job Vibe"
                      className="w-full h-full object-cover"
                    />
                  </>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-xl font-bold">Job Finder App</h3>
                  <ViewBadge slug="jobvibe" />
                </div>
                <span className="text-xs bg-purple-600 px-2 py-1 rounded">
                  React
                </span>
                <p className="text-gray-400 text-sm mt-3">
                  Global job search tool with real-time API filtering.
                </p>
                <a
                  href="https://jobvibe.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center bg-yellow-500 text-black py-2 rounded font-bold"
                >
                  View Live
                </a>
              </div>
            </div>

            {/* Card 4: Country */}
            <div className="project-card">
              <div className="media-container" id="media-country">
                {loadedIframes["media-country"] ? (
                  <iframe
                    src={loadedIframes["media-country"]}
                    title="Country Search"
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                ) : (
                  <>
                    <div
                      className="overlay-play"
                      onClick={() =>
                        loadIframe(
                          "media-country",
                          "https://country-info-searcher.netlify.app/",
                        )
                      }
                    >
                      <i className="fas fa-play-circle text-5xl"></i>
                      <span className="mt-2 font-bold">Interact with Site</span>
                    </div>
                    <img
                      src="/images/country-information-searcher.jpg"
                      alt="Country Search"
                      className="w-full h-full object-cover"
                    />
                  </>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-xl font-bold">Country Information</h3>
                  <ViewBadge slug="country" />
                </div>
                <span className="text-xs bg-orange-600 px-2 py-1 rounded">
                  JS API
                </span>
                <p className="text-gray-400 text-sm mt-3">
                  Data visualization tool for global geographic stats.
                </p>
                <a
                  href="https://country-info-searcher.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center bg-yellow-500 text-black py-2 rounded font-bold"
                >
                  View Live
                </a>
              </div>
            </div>

            {/* Card 5: School */}
            <div className="project-card">
              <div className="media-container">
                <div className="coming-soon">Coming Soon</div>
                <img
                  src="/images/coming_soon.jpg"
                  alt="School System"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">School Management</h3>
                <span className="text-xs bg-gray-600 px-2 py-1 rounded">
                  Next.js
                </span>
                <p className="text-gray-400 text-sm mt-3">
                  Enterprise-grade admin tool for educational centers.
                </p>
                <button className="mt-4 w-full bg-gray-700 text-gray-400 py-2 rounded cursor-not-allowed">
                  In Development
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-6 mt-10">
          <button className="slider-nav" onClick={() => scrollSlider(-1)}>
            ❮
          </button>
          <button className="slider-nav" onClick={() => scrollSlider(1)}>
            ❯
          </button>
        </div>
      </div>
    </section>
  );
}
