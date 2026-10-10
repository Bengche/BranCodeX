/**
 * components/Plans.jsx
 *
 * Pricing: a plain comparison table with a Websites / Online Stores switch
 * and a USD / FCFA switch (the live rate is only fetched when FCFA is chosen).
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FALLBACK_RATE = 620;

const CATEGORIES = {
  websites: {
    label: "Websites",
    plans: [
      {
        name: "Launch",
        tagline: "One to three pages to get your business online.",
        usd: 189,
        note: "$189 for 1 page, $199 for 3 pages",
        delivery: "Ready in under 3 days",
        features: [
          "Responsive design on every device",
          "Hosting and domain free for the first year",
          "SSL certificate and a business email",
          "Basic SEO and Google Analytics",
          "WhatsApp and email contact buttons",
        ],
        revisions: "2 rounds of revisions",
      },
      {
        name: "Business",
        tagline: "A full website for a company that is growing.",
        usd: 269,
        note: "$269 for 5 pages, $469 for 10 pages with a blog",
        delivery: "Ready in under 7 days",
        featured: true,
        features: [
          "Everything in Launch",
          "Contact form that goes to your inbox",
          "Sitemap and Google Search Console setup",
          "Page speed optimisation",
          "Blog you can update yourself (10 pages)",
        ],
        revisions: "2 rounds of revisions",
      },
      {
        name: "Premium",
        tagline: "Custom design, built around your brand.",
        usd: 999,
        note: "Up to 15 pages",
        delivery: "Ready in under 14 days",
        features: [
          "Everything in Business",
          "Custom design and animations",
          "MTN MoMo, Orange Money and card payments",
          "Admin dashboard",
          "Monthly check-up and priority support",
        ],
        revisions: "3 rounds of revisions",
      },
    ],
    custom: {
      text: "Web apps, databases, integrations or anything that does not fit the packages above?",
      cta: "Ask for a custom quote",
    },
  },
  stores: {
    label: "Online stores",
    plans: [
      {
        name: "Starter Store",
        tagline: "Everything you need to start selling.",
        usd: 589,
        note: "Up to 20 products",
        delivery: "Ready in 5 to 7 days",
        features: [
          "Cart and checkout",
          "Search and category filters",
          "Order alerts on WhatsApp",
          "Bank transfer payments",
          "Order confirmation emails",
        ],
        revisions: "2 rounds of revisions",
      },
      {
        name: "Pro Store",
        tagline: "A complete store with online payments.",
        usd: 1899,
        note: "Up to 110 products",
        delivery: "Ready in 7 to 14 days",
        featured: true,
        features: [
          "Everything in Starter Store",
          "MTN MoMo and Orange Money",
          "Card payments through Stripe or PayPal",
          "Customer accounts and order history",
          "Admin panel with low-stock alerts",
        ],
        revisions: "3 rounds of revisions",
      },
    ],
    custom: {
      text: "Selling from several vendors, or need escrow payments and delivery tracking?",
      cta: "Tell us about your marketplace",
    },
  },
};

function useXafRate(enabled) {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    if (!enabled || rate) return;
    let cancelled = false;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setRate(d?.rates?.XAF || FALLBACK_RATE);
      })
      .catch(() => {
        if (!cancelled) setRate(FALLBACK_RATE);
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, rate]);

  return rate;
}

function formatPrice(usd, currency, rate) {
  if (currency === "XAF") {
    const xaf = Math.round((usd * (rate || FALLBACK_RATE)) / 500) * 500;
    return `${xaf.toLocaleString("en-US")} FCFA`;
  }
  return `$${usd.toLocaleString("en-US")}`;
}

export default function Plans() {
  const [category, setCategory] = useState("websites");
  const [currency, setCurrency] = useState("USD");
  const rate = useXafRate(currency === "XAF");

  const active = CATEGORIES[category];

  return (
    <section id="plans" className="pricing" aria-labelledby="pricing-title">
      <div className="pricing-inner">
        <header className="pricing-header">
          <h2 id="pricing-title">Pricing</h2>
          <p>
            Every package includes hosting and a domain for the first year, an
            SSL certificate and a business email. The prices below are where
            each package starts. The final quote depends on what you need
            built.
          </p>
        </header>

        <div className="pricing-controls">
          <div className="pricing-tabs" role="tablist" aria-label="Category">
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={category === key}
                onClick={() => setCategory(key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pricing-currency" role="group" aria-label="Currency">
            {[
              ["USD", "USD"],
              ["XAF", "FCFA"],
            ].map(([code, label]) => (
              <button
                key={code}
                type="button"
                aria-pressed={currency === code}
                onClick={() => setCurrency(code)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`pricing-table pricing-table--${active.plans.length}`}
          role="tabpanel"
        >
          {active.plans.map((plan) => (
            <article
              key={plan.name}
              className={`pricing-col${plan.featured ? " pricing-col--featured" : ""}`}
            >
              <p className="pricing-flag">
                {plan.featured ? "Most chosen" : "\u00a0"}
              </p>
              <h3>{plan.name}</h3>
              <p className="pricing-tagline">{plan.tagline}</p>

              <p className="pricing-price">
                <span>From</span> {formatPrice(plan.usd, currency, rate)}
              </p>
              <p className="pricing-note">{plan.note}</p>

              <Link href="/#contact" className="pricing-btn">
                Get a quote
              </Link>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <p className="pricing-delivery">
                {plan.delivery}
                <br />
                {plan.revisions}
              </p>
            </article>
          ))}
        </div>

        <p className="pricing-custom">
          {active.custom.text}{" "}
          <Link href="/#contact">{active.custom.cta}</Link>
        </p>

        <p className="pricing-footnote">
          {currency === "XAF" &&
            "FCFA amounts are rounded and based on today's exchange rate. "}
          Not sure which package fits?{" "}
          <Link href="/#booking">Book a free call</Link> and we will work it out
          together.
        </p>
      </div>
    </section>
  );
}
