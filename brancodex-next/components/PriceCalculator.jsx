"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Pricing logic (mirrors BranCodeX Groq AI instructions exactly) ─────────

const WEBSITE_PLANS = [
  { pages: 1, name: "Landing Page", price: 189, delivery: "< 3 days" },
  { pages: 3, name: "Starter Plan", price: 199, delivery: "< 3 days" },
  { pages: 5, name: "Basic Plan", price: 269, delivery: "< 7 days" },
  { pages: 10, name: "Standard Plan", price: 469, delivery: "< 7 days" },
  { pages: 15, name: "Premium Plan", price: 999, delivery: "Custom timeline" },
];

const PLAN_FEATURES = {
  1: [
    "AI Chat Assistant",
    "Hosting & Domain (12 months)",
    "Mobile-first & SEO Optimized",
    "WhatsApp & Email Integration",
  ],
  3: [
    "Everything in Landing Page",
    "Up to 3 Responsive Pages",
    "Domain & Hosting included",
    "SSL Security Certificate",
  ],
  5: [
    "Everything in Starter Plan",
    "Up to 5 Pages + Speed Optimization",
    "Basic On-Page SEO",
    "WhatsApp Click-to-Chat",
  ],
  10: [
    "Everything in Basic Plan",
    "Up to 10 Pages + CMS/Blog",
    "Professional Business Emails",
    "Google Maps & Analytics",
  ],
  15: [
    "Everything in Standard Plan",
    "Up to 15 Pages",
    "Custom UI Design & Animations",
    "Advanced SEO & Admin Panel",
    "Newsletter & Priority Support",
  ],
};

function calcWebsite(pages) {
  // Exact plan match
  const exact = WEBSITE_PLANS.find((p) => p.pages === pages);
  if (exact) {
    return {
      name: exact.name,
      price: exact.price,
      delivery: exact.delivery,
      note: null,
      basePlanPages: exact.pages,
    };
  }
  // Intermediate: find the plan just below and add $36 per extra page
  const below = [...WEBSITE_PLANS].reverse().find((p) => p.pages < pages);
  const extraPages = pages - below.pages;
  return {
    name: `${pages}-Page Website`,
    price: below.price + extraPages * 36,
    delivery: below.delivery,
    note: `Based on ${below.name} + ${extraPages} extra page${extraPages > 1 ? "s" : ""} (×$36 each)`,
    basePlanPages: below.pages,
  };
}

function calcEcommerce(type, customCount) {
  if (type === "basic") {
    return {
      name: "Basic E-Commerce",
      price: 589,
      products: "Up to 20",
      delivery: "5–7 days",
    };
  }
  if (type === "advanced") {
    return {
      name: "Advanced E-Commerce",
      price: 1899,
      products: "Up to 110",
      delivery: "7–14 days",
    };
  }
  // Custom product count
  const count = parseInt(customCount) || 0;
  if (!count || count < 1) return null;
  const price = Math.round(count * 4.5 + 499);
  return {
    name: "Custom E-Commerce",
    price,
    products: `Up to ${count}`,
    delivery: "To be confirmed",
    note: `${count} products × $4.50 + $499 base`,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PriceCalculator() {
  const [projectType, setProjectType] = useState(null); // 'website' | 'ecommerce' | 'custom'
  const [pages, setPages] = useState(5);
  const [ecomType, setEcomType] = useState("basic"); // 'basic' | 'advanced' | 'custom'
  const [customCount, setCustomCount] = useState("");
  const [showResult, setShowResult] = useState(false);

  function handleTypeSelect(type) {
    setProjectType(type);
    setShowResult(false);
  }

  function handleCalculate() {
    setShowResult(true);
  }

  const websiteResult = projectType === "website" ? calcWebsite(pages) : null;
  const ecomResult =
    projectType === "ecommerce" ? calcEcommerce(ecomType, customCount) : null;
  const features = websiteResult
    ? PLAN_FEATURES[websiteResult.basePlanPages] || PLAN_FEATURES[15]
    : null;

  return (
    <section id="calculator" className="calculator-section">
      <div className="calculator-inner" data-aos="fade-up">
        <h2
          className="section-title"
          style={{ fontFamily: "'Playfair Display', serif", color: "#fff" }}
        >
          💡 Estimate Your Project Cost
        </h2>
        <p className="calculator-subtitle">
          Get an instant price estimate based on your project type. No sign-up
          required.
        </p>

        {/* Step 1 — project type */}
        <div className="calc-type-grid">
          {[
            {
              id: "website",
              icon: "🌐",
              label: "Website",
              desc: "Landing pages, business sites",
            },
            {
              id: "ecommerce",
              icon: "🛒",
              label: "E-Commerce",
              desc: "Online store with products",
            },
            {
              id: "custom",
              icon: "⚙️",
              label: "Custom App",
              desc: "Portals, platforms, dashboards",
            },
          ].map((t) => (
            <div
              key={t.id}
              className={`calc-type-card${projectType === t.id ? " active" : ""}`}
              onClick={() => handleTypeSelect(t.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleTypeSelect(t.id)}
            >
              <div className="calc-type-icon">{t.icon}</div>
              <div className="calc-type-label">{t.label}</div>
              <div className="calc-type-desc">{t.desc}</div>
            </div>
          ))}
        </div>

        {/* Step 2 — Website options */}
        {projectType === "website" && (
          <div className="calc-step" data-aos="fade-up">
            <h3>How many pages do you need?</h3>
            <div className="calc-slider-label">
              <span>Pages</span>
              <span className="calc-slider-value">{pages}</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={pages}
              onChange={(e) => {
                setPages(Number(e.target.value));
                setShowResult(false);
              }}
              className="calc-slider"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#64748b",
                fontSize: "0.75rem",
                marginTop: "0.25rem",
              }}
            >
              <span>1 page</span>
              <span>5</span>
              <span>10</span>
              <span>15 pages</span>
            </div>
            <button
              className="calc-estimate-btn"
              onClick={handleCalculate}
              style={{ marginTop: "1.5rem" }}
            >
              Calculate My Estimate →
            </button>
          </div>
        )}

        {/* Step 2 — E-Commerce options */}
        {projectType === "ecommerce" && (
          <div className="calc-step" data-aos="fade-up">
            <h3>How many products will you sell?</h3>
            <div className="calc-product-options">
              {[
                {
                  id: "basic",
                  label: "Up to 20 products",
                  sublabel: "Basic E-Commerce — $589",
                },
                {
                  id: "advanced",
                  label: "Up to 110 products",
                  sublabel: "Advanced E-Commerce — MoMo/Card payments",
                },
                {
                  id: "custom",
                  label: "Custom product count",
                  sublabel: "Enter your exact number below",
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`calc-radio-option${ecomType === opt.id ? " active" : ""}`}
                  onClick={() => {
                    setEcomType(opt.id);
                    setShowResult(false);
                  }}
                >
                  <input
                    type="radio"
                    name="ecomType"
                    value={opt.id}
                    checked={ecomType === opt.id}
                    readOnly
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>{opt.label}</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {opt.sublabel}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {ecomType === "custom" && (
              <input
                type="number"
                min={1}
                max={999}
                placeholder="e.g. 45"
                value={customCount}
                onChange={(e) => {
                  setCustomCount(e.target.value);
                  setShowResult(false);
                }}
                className="calc-custom-input"
              />
            )}

            <button
              className="calc-estimate-btn"
              onClick={handleCalculate}
              style={{ marginTop: "1.5rem" }}
              disabled={ecomType === "custom" && !customCount}
            >
              Calculate My Estimate →
            </button>
          </div>
        )}

        {/* Custom project — direct to team */}
        {projectType === "custom" && (
          <div className="calc-custom-redirect" data-aos="fade-up">
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
              🤝
            </div>
            <h3>Custom Projects Deserve Custom Quotes</h3>
            <p>
              Your project includes unique features — portals, tracking systems,
              dashboards, or specialised functionality. We don&apos;t provide
              automated estimates for these because we believe you deserve an
              accurate, personalised quote.
            </p>
            <p style={{ color: "#facc15", fontWeight: 600, margin: "1rem 0" }}>
              Our team will assess your project and provide the best price based
              on your exact requirements.
            </p>
            <div className="calc-custom-links">
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
                WhatsApp Us
              </a>
              <a
                href="mailto:contact@brancodex.com"
                className="calc-custom-link email"
              >
                <i
                  className="fas fa-envelope"
                  style={{ marginRight: "0.4rem" }}
                ></i>
                Email Us
              </a>
              <a href="tel:+237654155218" className="calc-custom-link call">
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "0.4rem" }}
                ></i>
                Call Us
              </a>
            </div>
          </div>
        )}

        {/* Result — Website */}
        {showResult && websiteResult && (
          <div className="calc-result" data-aos="zoom-in">
            <div className="calc-result-plan">{websiteResult.name}</div>
            <div className="calc-result-price">
              Starting from US${websiteResult.price.toLocaleString()}
            </div>
            {websiteResult.note && (
              <div className="calc-result-note">{websiteResult.note}</div>
            )}
            <div className="calc-result-note">
              🚀 Delivery: {websiteResult.delivery} &nbsp;|&nbsp; All prices in
              USD
            </div>
            <ul className="calc-result-features">
              {features.map((f) => (
                <li key={f}>
                  <i className="fas fa-check-circle"></i> {f}
                </li>
              ))}
            </ul>
            <p
              style={{
                color: "#64748b",
                fontSize: "0.8rem",
                marginBottom: "1.25rem",
              }}
            >
              This is a starting estimate. Final quote is tailored to your exact
              requirements.
            </p>
            <div className="calc-cta-row">
              <a
                href="https://wa.me/237654155218"
                target="_blank"
                rel="noopener noreferrer"
                className="calc-cta-primary"
              >
                Get Started on WhatsApp
              </a>
              <Link href="/#contact" className="calc-cta-secondary">
                Send a Message
              </Link>
            </div>
          </div>
        )}

        {/* Result — E-Commerce */}
        {showResult && ecomResult && (
          <div className="calc-result" data-aos="zoom-in">
            <div className="calc-result-plan">{ecomResult.name}</div>
            <div className="calc-result-price">
              Starting from US${ecomResult.price.toLocaleString()}
            </div>
            {ecomResult.note && (
              <div className="calc-result-note">{ecomResult.note}</div>
            )}
            <div className="calc-result-note">
              📦 Products: {ecomResult.products} &nbsp;|&nbsp; Delivery:{" "}
              {ecomResult.delivery}
            </div>
            <ul className="calc-result-features">
              <li>
                <i className="fas fa-check-circle"></i> AI Shopping Assistant
              </li>
              <li>
                <i className="fas fa-check-circle"></i> WhatsApp Order
                Notifications
              </li>
              {ecomResult.name === "Advanced E-Commerce" && (
                <>
                  <li>
                    <i className="fas fa-check-circle"></i> MoMo & Card Payment
                    Gateways
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i> Advanced SEO &
                    Customer Accounts
                  </li>
                </>
              )}
              <li>
                <i className="fas fa-check-circle"></i> Mobile-first &
                SEO-optimized
              </li>
            </ul>
            <p
              style={{
                color: "#64748b",
                fontSize: "0.8rem",
                marginBottom: "1.25rem",
              }}
            >
              This is a starting estimate. Final quote is tailored to your exact
              requirements.
            </p>
            <div className="calc-cta-row">
              <a
                href="https://wa.me/237654155218"
                target="_blank"
                rel="noopener noreferrer"
                className="calc-cta-primary"
              >
                Get Started on WhatsApp
              </a>
              <Link href="/#contact" className="calc-cta-secondary">
                Send a Message
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
