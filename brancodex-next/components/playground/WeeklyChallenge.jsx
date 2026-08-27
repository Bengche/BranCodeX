"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const TYPE_LABELS = {
  css: "CSS",
  js: "JavaScript",
  html: "HTML",
  puzzle: "Puzzle",
};

function buildSrcDoc(html, css, js) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}<script>${js}\x3c/script></body></html>`;
}

export default function WeeklyChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/challenges/active`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setChallenge(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Close modal on Escape
  useEffect(() => {
    if (!showPreview) return;
    function onKey(e) {
      if (e.key === "Escape") setShowPreview(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPreview]);

  if (loading || !challenge) return null;

  const typeLabel = TYPE_LABELS[challenge.type] || challenge.type;
  const hasSolution =
    challenge.solution_html || challenge.solution_css || challenge.solution_js;
  const solutionDoc = hasSolution
    ? buildSrcDoc(
        challenge.solution_html || "",
        challenge.solution_css || "",
        challenge.solution_js || "",
      )
    : "";

  const editorParams = new URLSearchParams({
    ch_html: challenge.starter_html || "",
    ch_css: challenge.starter_css || "",
    ch_js: challenge.starter_js || "",
    ch_sol_html: challenge.solution_html || "",
    ch_sol_css: challenge.solution_css || "",
    ch_sol_js: challenge.solution_js || "",
    ch_title: challenge.title,
    ch_type: challenge.type,
  });

  return (
    <>
      <section className="weekly-challenge-section">
        <div className="weekly-challenge-inner">
          <header className="wc-header">
            <div className="wc-header-text">
              <h2 className="wc-heading">Weekly Challenge</h2>
              <p className="wc-subheading">
                Week of{" "}
                {new Date(challenge.week_start).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <span className={`wc-type-badge ${challenge.type}`}>
              {typeLabel}
            </span>
          </header>

          <div className="wc-body">
            <h3 className="wc-title">{challenge.title}</h3>
            <p className="wc-description">{challenge.description}</p>
          </div>

          <div className="wc-footer">
            {hasSolution && (
              <button
                type="button"
                className="wc-preview-btn"
                onClick={() => setShowPreview(true)}
              >
                <i className="fa fa-eye" /> Preview Target
              </button>
            )}
            <Link
              href={`/playground/challenge?${editorParams.toString()}`}
              className="wc-cta-btn"
            >
              <i className="fa fa-code" /> Accept Challenge
            </Link>
          </div>
        </div>
      </section>

      {/* Target preview modal */}
      {showPreview && (
        <div
          className="wc-preview-overlay"
          onClick={() => setShowPreview(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Challenge target preview"
        >
          <div
            className="wc-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="wc-preview-modal-header">
              <div className="wc-preview-modal-title">
                <i className="fa fa-bullseye" /> Target Output
              </div>
              <button
                type="button"
                className="wc-preview-modal-close"
                onClick={() => setShowPreview(false)}
                aria-label="Close preview"
              >
                <i className="fa fa-xmark" />
              </button>
            </div>
            <div className="wc-preview-modal-note">
              This is the expected result. Build it in the editor using your own
              code.
            </div>
            <iframe
              className="wc-preview-frame"
              srcDoc={solutionDoc}
              sandbox="allow-scripts"
              title="Challenge target output"
            />
          </div>
        </div>
      )}
    </>
  );
}
