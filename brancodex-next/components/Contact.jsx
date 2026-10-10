/**
 * components/Contact.jsx
 *
 * One place to get in touch: project form, plus direct channels and the
 * booking link. Used on the home page and on /contact (asPage).
 */

"use client";

import { useState } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
const CALENDLY_URL = "https://calendly.com/bengc102/30min";

export default function Contact({ asPage = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const Heading = asPage ? "h1" : "h2";

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus({
        type: "success",
        text: "Message sent. A confirmation is on its way to your inbox and we will reply within 24 hours.",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus({
        type: "error",
        text: "Your message could not be sent. Please try again, or write to contact@brancodex.com.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className={`sec sec--alt${asPage ? " sec--page" : ""}`}
      aria-labelledby="contact-title"
    >
      <div className="sec-inner contact">
        <div>
          <header className="sec-head">
            <Heading id="contact-title">Tell us about your project</Heading>
            <p>
              Say what you need built and when you need it. We reply within 24
              hours with next steps and a price.
            </p>
          </header>

          <form className="form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="contact-message">Your project</label>
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                required
                maxLength={5000}
                placeholder="What do you need, and when do you need it?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn--primary" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </button>
            {status.text && (
              <p role="status" className={`form-status form-status--${status.type}`}>
                {status.text}
              </p>
            )}
          </form>
        </div>

        <aside id="booking" className="contact-side" aria-label="Other ways to reach us">
          <h3>Prefer to talk?</h3>
          <p>
            Book a free 30-minute call and we will go through your idea
            together. No commitment.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            Book a free call
          </a>

          <ul className="contact-list">
            <li>
              <span>WhatsApp</span>
              <a href="https://wa.me/237654155218" target="_blank" rel="noopener noreferrer">
                +237 654 155 218
              </a>
            </li>
            <li>
              <span>Phone</span>
              <a href="tel:+237654155218">+237 654 155 218</a>
            </li>
            <li>
              <span>Email</span>
              <a href="mailto:contact@brancodex.com">contact@brancodex.com</a>
            </li>
            <li>
              <span>Based in</span>
              Bamenda, Cameroon
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
