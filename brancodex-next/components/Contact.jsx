/**
 * components/Contact.jsx
 *
 * 'use client' — EmailJS form submission.
 *
 * Original EmailJS keys preserved from the source HTML:
 *   Service ID : service_4i8dgy8
 *   Template ID: template_cncjp0c
 *   Public key : JwE9TMk7vUP9adouM
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE  = 'service_4i8dgy8';
const EMAILJS_TEMPLATE = 'template_cncjp0c';
const EMAILJS_KEY      = 'JwE9TMk7vUP9adouM';

const socialLinks = [
  {
    icon: 'fa-brands fa-whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.link/fhyxfh',
  },
  {
    icon: 'fa-solid fa-envelope',
    label: 'Email',
    href: 'mailto:bengc102@gmail.com',
  },
  {
    icon: 'fa-brands fa-linkedin-in',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/beng-brandon-che',
  },
  {
    icon: 'fa-brands fa-github',
    label: 'GitHub',
    href: 'https://github.com/brandon-hub',
  },
  {
    icon: 'fa-brands fa-facebook-f',
    label: 'Facebook',
    href: 'https://facebook.com/brancodex',
  },
];

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  useEffect(() => {
    emailjs.init(EMAILJS_KEY);
  }, []);

  async function sendEmail(e) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current);
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        {/* Left column — info */}
        <div className="contact-info" data-aos="fade-right">
          <h2 className="section-title text-left">Get In Touch</h2>
          <p className="contact-description">
            Have a project in mind? Fill in the form and we will respond within
            24&nbsp;hours. Based in Bamenda, Cameroon — working with clients
            worldwide.
          </p>

          <div className="contact-detail">
            <i className="fa fa-location-dot"></i>
            <span>Bamenda, North-West Region, Cameroon</span>
          </div>
          <div className="contact-detail">
            <i className="fa fa-envelope"></i>
            <a href="mailto:bengc102@gmail.com">bengc102@gmail.com</a>
          </div>
          <div className="contact-detail">
            <i className="fa-brands fa-whatsapp"></i>
            <a href="https://wa.link/fhyxfh" target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </div>

          <div className="social-links-row">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="contact-social-link"
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Right column — form */}
        <div className="contact-form-wrapper" data-aos="fade-left">
          <form
            ref={formRef}
            className="contact-form"
            onSubmit={sendEmail}
            noValidate
          >
            {/* Full name */}
            <div className="form-group">
              <label htmlFor="cf-name">Full name</label>
              <input
                id="cf-name"
                name="user_name"
                type="text"
                required
                maxLength={80}
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="cf-email">Email address</label>
              <input
                id="cf-email"
                name="user_email"
                type="email"
                required
                maxLength={100}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="cf-subject">Subject</label>
              <input
                id="cf-subject"
                name="subject"
                type="text"
                required
                maxLength={100}
                placeholder="e.g. New website project"
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                name="message"
                required
                minLength={20}
                maxLength={2000}
                rows={5}
                placeholder="Describe your project or question..."
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="contact-submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <i className="fa fa-spinner fa-spin"></i> Sending...
                </>
              ) : (
                <>
                  <i className="fa fa-paper-plane"></i> Send message
                </>
              )}
            </button>

            {/* Status messages */}
            {status === 'success' && (
              <p className="form-status success" role="status">
                Message sent! We will get back to you within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="form-status error" role="alert">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
