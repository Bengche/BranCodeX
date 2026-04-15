"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE = "service_4i8dgy8";
const EMAILJS_TEMPLATE = "template_cncjp0c";
const EMAILJS_KEY = "JwE9TMk7vUP9adouM";

export default function Contact() {
  const formRef = useRef(null);
  const [statusMsg, setStatusMsg] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    setStatusMsg("Sending message...");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        formRef.current,
        EMAILJS_KEY,
      );
      setStatusMsg("✅ Message sent! I'll get back to you soon 😊");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatusMsg("❌ Something went wrong. Please try again.");
    }
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

        <form
          id="contact-form"
          className="contact-form"
          ref={formRef}
          onSubmit={sendMessage}
        >
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
            ></textarea>
          </div>
          <button type="submit" className="contact-btn">
            <i className="fas fa-paper-plane"></i> Send Message
          </button>
        </form>

        <div id="message-status" className="message-status">
          {statusMsg}
        </div>

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
