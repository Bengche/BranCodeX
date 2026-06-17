"use client";

import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    setStatusMsg("Sending your message…");
    setSuccess(false);
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (res.ok) {
        setSuccess(true);
        setStatusMsg("Message sent! You'll receive a confirmation email shortly.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json();
        setStatusMsg(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatusMsg("Network error. Please check your connection and try again.");
    }
    setSending(false);
  }

  return (
    <section id="contact" className="contact-section" data-aos="fade-up">
      <div className="contact-container">
        <h2>💌 Let&#39;s Connect</h2>
        <p className="contact-intro">
          Got a project in mind, a question to ask, or just want to say hi?{" "}
          I&#39;d love to hear from you. Fill out the form and let&#39;s build
          something amazing!
        </p>

        <form id="contact-form" className="contact-form" onSubmit={sendMessage}>
          <div className="form-group">
            <label htmlFor="name">
              <i className="fas fa-user"></i> Your Name
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Your Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">
              <i className="fas fa-comment-dots"></i> Message
            </label>
            <textarea
              id="message"
              rows="5"
              required
              placeholder="What&#39;s on your mind?"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="contact-btn" disabled={sending}>
            <i className="fas fa-paper-plane"></i>{" "}
            {sending ? "Sending…" : "Send Message"}
          </button>
        </form>

        {statusMsg && (
          <div
            id="message-status"
            className={`message-status${success ? " success" : " error"}`}
          >
            {success ? <i className="fas fa-circle-check" /> : <i className="fas fa-triangle-exclamation" />}
            {" "}{statusMsg}
          </div>
        )}

        <div className="social-links" data-aos="fade-up">
          <p>Or connect with us on social media 👇</p>
          <div className="icons">
            <a
              href="https://wa.link/fhyxfh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="mailto:contact@brancodex.com">
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href="https://wa.link/fhyxfh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/beng-brandon-338382291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/Bengche"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.facebook.com/bengbrandonche?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
