"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const TYPE_LABELS = { css: "CSS", js: "JavaScript", html: "HTML", puzzle: "Puzzle" };

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

  if (loading || !challenge) return null;

  const typeLabel = TYPE_LABELS[challenge.type] || challenge.type;

  const editorParams = new URLSearchParams({
    ch_html:  challenge.starter_html || "",
    ch_css:   challenge.starter_css  || "",
    ch_js:    challenge.starter_js   || "",
    ch_title: challenge.title,
    ch_type:  challenge.type,
  });

  return (
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
          <span className={`wc-type-badge ${challenge.type}`}>{typeLabel}</span>
        </header>

        <div className="wc-body">
          <h3 className="wc-title">{challenge.title}</h3>
          <p className="wc-description">{challenge.description}</p>
        </div>

        <div className="wc-footer">
          <Link
            href={`/playground/challenge?${editorParams.toString()}`}
            className="wc-cta-btn"
          >
            <i className="fa fa-code" /> Accept Challenge
          </Link>
        </div>
      </div>
    </section>
  );
}
