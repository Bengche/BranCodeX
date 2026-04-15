/**
 * components/Plans.jsx
 *
 * 'use client' — needed for the "Show all features" toggle on each plan card.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Live XAF rate ──────────────────────────────────────────────────────────

const FALLBACK_RATE = 620;

function useXafRate() {
  const [rate, setRate] = useState(null);
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((d) => {
        if (d.result === "success" && d.rates?.XAF) setRate(d.rates.XAF);
        else setRate(FALLBACK_RATE);
      })
      .catch(() => setRate(FALLBACK_RATE));
  }, []);
  return rate;
}

// Converts "$189" → dollar amount, returns null for non-numeric strings
function parseDollars(priceStr) {
  const n = Number(priceStr.replace(/[$,]/g, ""));
  return isNaN(n) || n === 0 ? null : n;
}

// ─── Data ──────────────────────────────────────────────────────────────────

const websitePlans = [
  {
    title: "Landing Page",
    tagline: "High-conversion single-page sites.",
    price: "$189",
    aiLabel: "Includes AI Chat Assistant",
    features: [
      "Hosting & domain (12 months)",
      "Mobile-first & SEO Optimized",
      "WhatsApp & Email Integration",
      "Delivery in < 3 days",
    ],
  },
  {
    title: "Starter Plan",
    tagline: "Professional 3-page business presence.",
    price: "$199",
    aiLabel: "Includes Smart AI Support Bot",
    note: "Everything in Landing Page, plus:",
    features: [
      "Up to 3 Responsive Pages",
      "Domain & Hosting included",
      "SSL Security Certificate",
      "Delivery in < 3 days",
    ],
  },
  {
    title: "Basic Plan",
    tagline: "The complete 5-page startup toolkit.",
    price: "$269",
    aiLabel: "Includes Custom AI Assistant",
    note: "Everything in Starter, plus:",
    features: [
      "Up to 5 Pages + Speed Optimization",
      "Basic On-Page SEO",
      "WhatsApp Click-to-Chat",
      "Delivery in < 7 days",
    ],
  },
  {
    title: "Standard Plan",
    tagline: "Scalable solution for growing teams.",
    price: "$469",
    aiLabel: "AI Customer Lead-Gen",
    note: "Everything in Basic, plus:",
    featured: true,
    badge: "Most Popular",
    features: [
      "Up to 10 Pages + CMS/Blog",
      "Professional Business Emails",
      "Google Maps & Analytics",
      "Delivery in < 7 days",
    ],
  },
  {
    title: "Premium Plan",
    tagline: "Tailored high-end experience.",
    price: "$999",
    aiLabel: "Advanced AI Integration",
    note: "Everything in Standard, plus:",
    features: [
      "Custom UI Design & Animations",
      "Up to 15 Pages + Dark Mode",
      "Advanced SEO & Admin Panel",
      "Newsletter & Priority Support",
    ],
  },
];

const ecommercePlans = [
  {
    title: "Basic E-Commerce",
    tagline: "Start selling online today.",
    price: "$589",
    aiLabel: "Includes AI Shopping Assistant",
    featured: true,
    features: [
      "Up to 20 Products + Cart",
      "WhatsApp Order Notifications",
      "Manual Payment Support",
      "Delivery in 5–7 days",
    ],
  },
  {
    title: "Advanced E-Commerce",
    tagline: "Full-scale digital storefront.",
    price: "$1,899",
    aiLabel: "Personal Shopper AI",
    note: "Everything in Basic E-Commerce, plus:",
    features: [
      "Up to 110 Products + Admin Panel",
      "MoMo/Card Payment Gateways",
      "Advanced SEO & Accounts",
      "Delivery in 7–14 days",
    ],
  },
];

// ─── Card component ─────────────────────────────────────────────────────────

function PlanCard({ plan, xafRate }) {
  const [open, setOpen] = useState(false);

  const dollars = parseDollars(plan.price);
  const xafAmount =
    xafRate && dollars
      ? Math.round(dollars * xafRate).toLocaleString("en") + " FCFA"
      : null;

  const visibleFeatures = plan.features.slice(0, 3);
  const extraFeatures = plan.features.slice(3);

  return (
    <div className={`plan-item${plan.featured ? " plan-item--featured" : ""}`}>
      {plan.badge && <span className="plan-badge">{plan.badge}</span>}

      <div className="plan-card">
        <h3 className="plan-title">{plan.title}</h3>
        <p className="plan-tagline">{plan.tagline}</p>

        <div className="plan-price-block">
          <span className="plan-price-label">Starting from</span>
          <div className="plan-price-amount">
            <span className="plan-price-currency">US$</span>
            <span className="plan-price-num">{plan.price.replace("$", "")}</span>
          </div>
        </div>

        {xafAmount && (
          <p className="plan-xaf-price">
            <span className="xaf-live-dot" aria-hidden="true" />
            ≈&nbsp;<span className="xaf-val">{xafAmount}</span>
            &nbsp;· live rate
          </p>
        )}

        <p className="ai-highlight">
          <i className="fa fa-robot"></i>
          <strong>{plan.aiLabel}</strong>
        </p>

        {plan.note && <p className="plan-note-label">{plan.note}</p>}

        {/* Top 3 features — always visible */}
        <ul className="plan-features plan-features-visible">
          {visibleFeatures.map((f) => (
            <li key={f}>
              <i className="fa fa-check-circle"></i> {f}
            </li>
          ))}
        </ul>

        {/* Extra features — collapsible */}
        {extraFeatures.length > 0 && (
          <>
            <div
              className={`features-wrapper${
                open ? " features-wrapper--open" : ""
              }`}
            >
              <ul className="plan-features">
                {extraFeatures.map((f) => (
                  <li key={f}>
                    <i className="fa fa-check-circle"></i> {f}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="plan-features-toggle"
              type="button"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? "Hide" : `+ ${extraFeatures.length} more included`}
            </button>
          </>
        )}

        <Link href="/#contact" className="plan-cta-btn">
          Start This Plan <i className="fa fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function Plans() {
  const xafRate = useXafRate();
  return (
    <section id="plans" className="plans-section">
      <div className="plans-header">
        <h2 className="section-title text-black">Packages</h2>
        <p className="plans-intro">
          Scalable digital solutions designed for modern brands. Every project
          is engineered for conversion, performance, security, and growth.
        </p>
        <p className="plans-note">
          Prices represent <strong>base investments</strong>. Final quotes are
          tailored to your specific feature requirements and scope.
        </p>
      </div>

      {/* Website plans grid */}
      <div className="plans-grid">
        {websitePlans.map((plan) => (
          <PlanCard key={plan.title} plan={plan} xafRate={xafRate} />
        ))}

        {/* Custom Solutions card — no features toggle, just a CTA */}
        <div className="plan-item plan-card custom-quote-card">
          <h3 className="plan-title">Custom Solutions</h3>
          <p className="plan-tagline">Complex web apps &amp; unique logic.</p>
          <p className="plan-price">Tailored Pricing</p>
          <ul className="plan-features mb-6">
            <li>
              <i className="fa fa-robot" style={{ color: "#22c55e" }}></i>{" "}
              <strong>Custom AI Agent Workflows</strong>
            </li>
            <li>
              <i className="fa fa-check-circle" style={{ color: "green" }}></i>{" "}
              Bespoke Database Architecture
            </li>
            <li>
              <i className="fa fa-check-circle" style={{ color: "green" }}></i>{" "}
              API &amp; Full-Stack Engineering
            </li>
          </ul>
          <Link href="/#contact" className="btn-custom-cta">
            Request a Custom Quote
          </Link>
        </div>
      </div>

      {/* E-commerce plans */}
      <div className="plans-category-divider">
        <span className="plans-category-badge">
          <i className="fa fa-shopping-cart"></i> E-Commerce Ecosystems
        </span>
      </div>
      <div className="plans-grid">
        {ecommercePlans.map((plan) => (
          <PlanCard key={plan.title} plan={plan} xafRate={xafRate} />
        ))}

        {/* Enterprise card */}
        <div className="plan-item plan-card custom-quote-card">
          <h3 className="plan-title">Enterprise Commerce</h3>
          <p className="plan-tagline">Multi-vendor or high-volume stores.</p>
          <p className="plan-price">Tailored Pricing</p>
          <ul className="plan-features mb-6">
            <li>
              <i className="fa fa-robot" style={{ color: "#22c55e" }}></i>{" "}
              <strong>AI Inventory Automation</strong>
            </li>
            <li>
              <i className="fa fa-check-circle" style={{ color: "green" }}></i>{" "}
              Advanced Payment Escrow
            </li>
            <li>
              <i className="fa fa-check-circle" style={{ color: "green" }}></i>{" "}
              Vendor Dashboards &amp; Logistics
            </li>
          </ul>
          <Link href="/#contact" className="btn-custom-cta">
            Start Enterprise Project
          </Link>
        </div>
      </div>

      {/* Trust signal */}
      <div className="plans-trust-bar">
        <span><i className="fa fa-shield-alt"></i> No hidden fees</span>
        <span className="trust-sep">·</span>
        <span><i className="fa fa-comments"></i> Free consultation</span>
        <span className="trust-sep">·</span>
        <span><i className="fa fa-check-double"></i> 100% transparent scoping</span>
      </div>
    </section>
  );
}
