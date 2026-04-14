"use client";

import { useState, useEffect } from "react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bcx_exit_shown")) return;

    // Trigger on mouse leaving top of viewport
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("bcx_exit_shown", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
        clearTimeout(timer);
      }
    };

    // Fallback: show after 40 seconds of browsing
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
    if (!email.trim()) return;
    setSending(true);

    // Send notification via EmailJS
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_4i8dgy8",
          template_id: "template_cncjp0c",
          user_id: "JwE9TMk7vUP9adouM",
          template_params: {
            name: "Website Audit Lead",
            email: email,
            message: `🎯 New free audit request from exit popup!\n\nEmail: ${email}\n\nThis visitor wants a free website audit — contact them promptly!`,
          },
        }),
      });
    } catch {
      // Silently fail — still show success to user
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
              <strong className="text-yellow-400">Free Website Audit</strong>{" "}
              for your business. We&apos;ll check your speed, SEO, mobile
              experience, and give you a full actionable report — at no cost.
            </p>

            <form className="exit-popup-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="exit-popup-input"
              />
              <button
                type="submit"
                className="exit-popup-btn"
                disabled={sending}
              >
                {sending ? "Submitting..." : "Get My Free Audit →"}
              </button>
            </form>

            <a href="/guide" className="exit-popup-secondary" onClick={close}>
              📄 Or download: &quot;5 Mistakes Cameroonian Businesses Make With
              Their Website&quot;
            </a>

            <button type="button" className="exit-popup-skip" onClick={close}>
              No thanks, I&apos;ll pass for now
            </button>
          </>
        ) : (
          <>
            <div className="exit-popup-icon">✅</div>
            <h2 className="exit-popup-title">You&apos;re All Set!</h2>
            <p className="exit-popup-text">
              We&apos;ve received your request. Our team will send your free
              website audit to{" "}
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
