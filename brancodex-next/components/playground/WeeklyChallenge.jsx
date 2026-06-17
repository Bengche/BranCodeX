"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const TYPE_LABELS = { css: "CSS", js: "JavaScript", html: "HTML", puzzle: "Puzzle" };
const TYPE_COLORS = { css: "#38bdf8", js: "#fbbf24", html: "#f97316", puzzle: "#a78bfa" };

export default function WeeklyChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/challenges/active`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setChallenge(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; // silent — don't show skeleton on SSR
  if (!challenge) return null;

  const typeColor = TYPE_COLORS[challenge.type] || "#4f46e5";
  const typeLabel = TYPE_LABELS[challenge.type] || challenge.type;

  // Build the editor deep-link with starter code pre-loaded via URL search params
  const editorParams = new URLSearchParams({
    ch_html: challenge.starter_html || "",
    ch_css:  challenge.starter_css  || "",
    ch_js:   challenge.starter_js   || "",
  });

  return (
    <section className="weekly-challenge-section">
      <div className="weekly-challenge-inner">
        {/* Pill header */}
        <div className="wc-pill">
          <span className="wc-pulse" />
          Weekly Challenge
        </div>

        <div className="wc-card">
          {/* Left accent bar */}
          <div className="wc-accent-bar" style={{ background: typeColor }} />

          <div className="wc-content">
            <div className="wc-meta">
              <span className="wc-type-badge" style={{ color: typeColor, borderColor: typeColor }}>
                {typeLabel}
              </span>
              <span className="wc-week">
                Week of {new Date(challenge.week_start).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </span>
            </div>

            <h3 className="wc-title">{challenge.title}</h3>
            <p className="wc-description">{challenge.description}</p>

            <div className="wc-actions">
              <Link
                href={`/playground/challenge?${editorParams.toString()}`}
                className="wc-cta-btn"
              >
                <i className="fa fa-code" /> Accept Challenge
              </Link>
              <span className="wc-tip">
                <i className="fa fa-trophy" /> Top solution this week gets featured
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
