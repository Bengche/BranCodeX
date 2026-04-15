"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("bcx_exit_shown")) return;

    // Trigger on mouse leaving top of viewport (desktop exit intent)
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("bcx_exit_shown", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
        clearTimeout(timer);
      }
    };

    // Fallback: show after 40 seconds (catches mobile users)
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("bcx_exit_shown")) {
        setShow(true);
        sessionStorage.setItem("bcx_exit_shown", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    }, 40000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !website.trim()) return;
    setSending(true);

    // Normalise website — add https:// if missing
    const siteUrl = website.trim().startsWith("http")
      ? website.trim()
      : `https://${website.trim()}`;

    try {
      await emailjs.send(
        "service_c5vabbm",
        "template_9q6e9vr",
        {
          name: name.trim(),
          email: email.trim(),
          title: "Free Website Audit Request",
          time: new Date().toLocaleString(),
          message:
            `🎯 NEW FREE WEBSITE AUDIT REQUEST\n\n` +
            `Name:    ${name.trim()}\n` +
            `Email:   ${email.trim()}\n` +
            `Website: ${siteUrl}\n\n` +
            `Action: Visit their site, run PageSpeed Insights + SEO checks, ` +
            `then reply to ${email.trim()} with the audit report within 24 h.`,
        },
        "n6JWvzVKqpFDqg1xt"
      );
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Could not send — please try again or contact us directly.");
      setSending(false);
      return;
    }

    setSending(false);
    setSubmitted(true);
  }

  function close() {
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      className="exit-popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Free website audit offer"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="exit-popup">
        <button
          type="button"
          className="exit-popup-close"
          aria-label="Close"
          onClick={close}
        >
          &times;
        </button>

        {!submitted ? (
          <>
            <div className="exit-popup-icon">🎯</div>
            <h2 className="exit-popup-title">Wait — Before You Leave!</h2>
            <p className="exit-popup-text">
              Get a{" "}
              <strong className="text-yellow-400">Free Website Audit</strong> —
              we&apos;ll analyse your site&apos;s speed, SEO, mobile experience
              and security, then send you a full actionable report within 24
              hours. 100% free, no strings attached.
            </p>

            <form className="exit-popup-form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="exit-popup-input"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="exit-popup-input"
              />
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Your website URL (e.g. mybusiness.com)"
                required
                className="exit-popup-input"
              />
              {error && <p className="exit-popup-error">{error}</p>}
              <button
                type="submit"
                className="exit-popup-btn"
                disabled={sending}
              >
                {sending ? "Sending request…" : "Get My Free Audit →"}
              </button>
            </form>

            <a href="/guide" className="exit-popup-secondary" onClick={close}>
              📄 Or read: &quot;5 Mistakes Cameroonian Businesses Make With
              Their Website&quot;
            </a>

            <button type="button" className="exit-popup-skip" onClick={close}>
              No thanks, I&apos;ll pass for now
            </button>
          </>
        ) : (
          <>
            <div className="exit-popup-icon">✅</div>
            <h2 className="exit-popup-title">Request Received!</h2>
            <p className="exit-popup-text">
              Thanks, <strong className="text-yellow-400">{name}</strong>!
              We&apos;ll audit{" "}
              <strong className="text-yellow-400">{website}</strong> and send
              the full report to{" "}
              <strong className="text-yellow-400">{email}</strong> within 24
              hours.
            </p>
            <a href="/#contact" className="exit-popup-btn" onClick={close}>
              Or message us directly →
            </a>
          </>
        )}
      </div>
    </div>
  );
}
