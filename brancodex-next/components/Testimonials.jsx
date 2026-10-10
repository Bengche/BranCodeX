/**
 * components/Testimonials.jsx
 *
 * Shows approved reviews from the backend. If there are none (or the backend
 * is unreachable) the section does not render at all.
 */

"use client";

import { useState, useEffect } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

// The backend HTML-escapes text before saving it; React escapes again on render.
function decode(text = "") {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&amp;/g, "&");
}

function initials(name) {
  return decode(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("5");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${BACKEND_URL}/api/testimonials`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!cancelled && Array.isArray(data)) {
          setReviews(data.filter((t) => Number(t.rating) >= 4).slice(0, 6));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await fetch(`${BACKEND_URL}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, review, rating: Number(rating) }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus({
        type: "success",
        text: "Thank you. Your review will appear once we have approved it.",
      });
      setName("");
      setReview("");
      setRating("5");
    } catch {
      setStatus({
        type: "error",
        text: "Your review could not be sent. Please try again.",
      });
    } finally {
      setSending(false);
    }
  }

  if (!reviews.length) return null;

  return (
    <section id="testimonials" className="sec" aria-labelledby="reviews-title">
      <div className="sec-inner">
        <header className="sec-head">
          <h2 id="reviews-title">What clients say</h2>
        </header>

        <div className="reviews">
          {reviews.map((t) => (
            <figure key={t.id ?? t.created_at} className="review">
              <blockquote>
                <p>{decode(t.review)}</p>
              </blockquote>
              <figcaption>
                {t.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.photo_url} alt="" width="40" height="40" loading="lazy" />
                ) : (
                  <span className="review-avatar" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                )}
                <span>
                  <strong>{decode(t.name)}</strong>
                  <span className="review-rating">
                    {Number(t.rating)} out of 5
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="review-add">
          {!formOpen ? (
            <button
              type="button"
              className="text-link text-link--button"
              onClick={() => setFormOpen(true)}
            >
              Worked with us? Leave a review
            </button>
          ) : (
            <form className="form review-form" onSubmit={submit}>
              <div className="field">
                <label htmlFor="review-name">Your name</label>
                <input
                  id="review-name"
                  required
                  maxLength={120}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="review-text">Your review</label>
                <textarea
                  id="review-text"
                  rows="4"
                  required
                  maxLength={2000}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="review-rating">Rating</label>
                <select
                  id="review-rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} out of 5
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <button type="submit" className="btn btn--primary" disabled={sending}>
                  {sending ? "Sending…" : "Send review"}
                </button>
                <button
                  type="button"
                  className="text-link text-link--button"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
              {status.text && (
                <p role="status" className={`form-status form-status--${status.type}`}>
                  {status.text}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
