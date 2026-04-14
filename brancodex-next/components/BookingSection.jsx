"use client";

import { useEffect } from "react";

// ── Replace this URL with your actual Calendly link once you set up an account
// at https://calendly.com/signup — create a "30 min strategy call" event type
// and paste the full URL below (e.g. https://calendly.com/brancodex/30min)
const CALENDLY_URL = "https://calendly.com/bengc102/30min";

export default function BookingSection() {
  useEffect(() => {
    // Load Calendly embed script
    const existing = document.getElementById("calendly-script");
    if (existing) return;
    const script = document.createElement("script");
    script.id = "calendly-script";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="booking" className="booking-section">
      <div className="booking-inner" data-aos="fade-up">
        <div className="booking-header">
          <h2>📅 Book a Free 30-Min Strategy Call</h2>
          <p>
            No commitment. No sales pressure. Just honest advice on how to grow
            your business online — from an expert who has launched products used
            across Cameroon and beyond.
          </p>
        </div>

        {/* Trust perks */}
        <div className="booking-perks">
          {[
            { icon: "fa-check", text: "100% Free — no credit card" },
            { icon: "fa-clock", text: "30 minutes, your schedule" },
            { icon: "fa-globe", text: "Works for all time zones" },
            { icon: "fa-shield-halved", text: "No pressure, just value" },
          ].map((p) => (
            <span key={p.text} className="booking-perk">
              <i className={`fas ${p.icon}`}></i> {p.text}
            </span>
          ))}
        </div>

        {/* Calendly inline widget */}
        <div className="calendly-wrapper">
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: "320px", height: "680px" }}
          />
        </div>

        {/* Fallback for users who prefer other channels */}
        <div className="booking-fallback">
          <p style={{ color: "#64748b", marginBottom: "0.75rem" }}>
            Prefer a different channel?
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://wa.me/237654155218"
              target="_blank"
              rel="noopener noreferrer"
              className="calc-custom-link whatsapp"
            >
              <i
                className="fab fa-whatsapp"
                style={{ marginRight: "0.4rem" }}
              ></i>
              WhatsApp
            </a>
            <a
              href="mailto:contact@brancodex.com"
              className="calc-custom-link email"
            >
              <i
                className="fas fa-envelope"
                style={{ marginRight: "0.4rem" }}
              ></i>
              Email
            </a>
            <a href="tel:+237654155218" className="calc-custom-link call">
              <i className="fas fa-phone" style={{ marginRight: "0.4rem" }}></i>
              Call +237 654 155 218
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
