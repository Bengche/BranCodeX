"use client";

import { useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // { type: "success"|"error", text }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({
          type: "success",
          text: "You're subscribed! Check your inbox for a confirmation.",
        });
        setEmail("");
      } else {
        setMsg({
          type: "error",
          text: data?.error || "Subscription failed. Please try again.",
        });
      }
    } catch {
      setMsg({ type: "error", text: "Network error. Please try again." });
    }
    setLoading(false);
  }

  return (
    <section className="newsletter-section" data-aos="fade-up">
      <div className="newsletter-inner">
        <div className="newsletter-text">
          <span className="newsletter-badge">NEWSLETTER</span>
          <h2>Stay in the Loop</h2>
          <p>
            Get notified about new projects, blog posts, web dev tips, and
            exclusive offers — straight to your inbox. No spam, ever.
          </p>
        </div>

        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          <div className="newsletter-input-row">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              aria-label="Email address"
            />
            <button type="submit" className="newsletter-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fa fa-spinner fa-spin" /> Subscribing…
                </>
              ) : (
                <>
                  <i className="fa fa-paper-plane" /> Subscribe
                </>
              )}
            </button>
          </div>

          {msg && (
            <div className={`newsletter-msg newsletter-msg--${msg.type}`}>
              <i
                className={`fa ${msg.type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"}`}
              />{" "}
              {msg.text}
            </div>
          )}

          <p className="newsletter-privacy">
            <i className="fa fa-lock" /> Your email is safe. Unsubscribe any
            time.
          </p>
        </form>
      </div>
    </section>
  );
}
