/**
 * components/Plans.jsx
 *
 * 'use client' — needed for the "Show all features" toggle on each plan card.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';

// ─── Data ──────────────────────────────────────────────────────────────────

const websitePlans = [
  {
    title: 'Landing Page',
    tagline: 'High-conversion single-page sites.',
    price: '$189',
    aiLabel: 'Includes AI Chat Assistant',
    features: [
      'Hosting & domain (12 months)',
      'Mobile-first & SEO Optimized',
      'WhatsApp & Email Integration',
      'Delivery in < 3 days',
    ],
  },
  {
    title: 'Starter Plan',
    tagline: 'Professional 3-page business presence.',
    price: '$199',
    aiLabel: 'Includes Smart AI Support Bot',
    note: 'Everything in Landing Page, plus:',
    features: [
      'Up to 3 Responsive Pages',
      'Domain & Hosting included',
      'SSL Security Certificate',
      'Delivery in < 3 days',
    ],
  },
  {
    title: 'Basic Plan',
    tagline: 'The complete 5-page startup toolkit.',
    price: '$269',
    aiLabel: 'Includes Custom AI Assistant',
    note: 'Everything in Starter, plus:',
    features: [
      'Up to 5 Pages + Speed Optimization',
      'Basic On-Page SEO',
      'WhatsApp Click-to-Chat',
      'Delivery in < 7 days',
    ],
  },
  {
    title: 'Standard Plan',
    tagline: 'Scalable solution for growing teams.',
    price: '$469',
    aiLabel: 'AI Customer Lead-Gen',
    note: 'Everything in Basic, plus:',
    featured: true,
    badge: 'Most Popular',
    features: [
      'Up to 10 Pages + CMS/Blog',
      'Professional Business Emails',
      'Google Maps & Analytics',
      'Delivery in < 7 days',
    ],
  },
  {
    title: 'Premium Plan',
    tagline: 'Tailored high-end experience.',
    price: '$999',
    aiLabel: 'Advanced AI Integration',
    note: 'Everything in Standard, plus:',
    features: [
      'Custom UI Design & Animations',
      'Up to 15 Pages + Dark Mode',
      'Advanced SEO & Admin Panel',
      'Newsletter & Priority Support',
    ],
  },
];

const ecommercePlans = [
  {
    title: 'Basic E-Commerce',
    tagline: 'Start selling online today.',
    price: '$589',
    aiLabel: 'Includes AI Shopping Assistant',
    featured: true,
    features: [
      'Up to 20 Products + Cart',
      'WhatsApp Order Notifications',
      'Manual Payment Support',
      'Delivery in 5–7 days',
    ],
  },
  {
    title: 'Advanced E-Commerce',
    tagline: 'Full-scale digital storefront.',
    price: '$1,899',
    aiLabel: 'Personal Shopper AI',
    note: 'Everything in Basic E-Commerce, plus:',
    features: [
      'Up to 110 Products + Admin Panel',
      'MoMo/Card Payment Gateways',
      'Advanced SEO & Accounts',
      'Delivery in 7–14 days',
    ],
  },
];

// ─── Card component ─────────────────────────────────────────────────────────

function PlanCard({ plan }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`plan-item${plan.featured ? ' plan-item--featured' : ''}`}>
      {plan.badge && <span className="plan-badge">{plan.badge}</span>}

      <div className={`plan-card${open ? '' : ' is-collapsed'}`}>
        <h3 className="plan-title">{plan.title}</h3>
        <p className="plan-tagline">{plan.tagline}</p>
        <p className="plan-price">
          Starting from US$ <span>{plan.price.replace('$', '')}</span>
        </p>

        <p className="ai-highlight">
          <i className="fa fa-robot" style={{ color: '#3b82f6' }}></i>
          <strong>{plan.aiLabel}</strong>
        </p>

        {plan.note && (
          <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#3b82f6', margin: '10px 0 5px', textTransform: 'uppercase' }}>
            {plan.note}
          </p>
        )}

        <div className="features-wrapper">
          <ul className="plan-features">
            {plan.features.map((f) => (
              <li key={f}>
                <i className="fa fa-check-circle" style={{ color: 'green' }}></i> {f}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="plan-features-toggle"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? 'Hide features' : 'Show all features'}
        </button>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function Plans() {
  return (
    <section id="plans" className="plans-section">
      <div className="plans-header">
        <h2 className="section-title text-black">Packages</h2>
        <p className="plans-intro">
          Scalable digital solutions designed for modern brands. Every project is
          engineered for conversion, performance, security, and growth.
        </p>
        <p className="plans-note">
          Prices represent <strong>base investments</strong>. Final quotes are
          tailored to your specific feature requirements and scope.
        </p>
      </div>

      {/* Website plans grid */}
      <div className="plans-grid">
        {websitePlans.map((plan) => (
          <PlanCard key={plan.title} plan={plan} />
        ))}

        {/* Custom Solutions card — no features toggle, just a CTA */}
        <div className="plan-item plan-card custom-quote-card">
          <h3 className="plan-title">Custom Solutions</h3>
          <p className="plan-tagline">Complex web apps &amp; unique logic.</p>
          <p className="plan-price">Tailored Pricing</p>
          <ul className="plan-features mb-6">
            <li>
              <i className="fa fa-robot" style={{ color: '#3b82f6' }}></i>{' '}
              <strong>Custom AI Agent Workflows</strong>
            </li>
            <li>
              <i className="fa fa-check-circle" style={{ color: 'green' }}></i>{' '}
              Bespoke Database Architecture
            </li>
            <li>
              <i className="fa fa-check-circle" style={{ color: 'green' }}></i>{' '}
              API &amp; Full-Stack Engineering
            </li>
          </ul>
          <Link href="/#contact" className="btn-custom-cta">
            Request a Custom Quote
          </Link>
        </div>
      </div>

      {/* E-commerce plans */}
      <h3 className="plans-subheading mt-8 mb-4 font-bold text-2xl">
        E-Commerce Ecosystems
      </h3>
      <div className="plans-grid">
        {ecommercePlans.map((plan) => (
          <PlanCard key={plan.title} plan={plan} />
        ))}

        {/* Enterprise card */}
        <div className="plan-item plan-card custom-quote-card">
          <h3 className="plan-title">Enterprise Commerce</h3>
          <p className="plan-tagline">Multi-vendor or high-volume stores.</p>
          <p className="plan-price">Tailored Pricing</p>
          <ul className="plan-features mb-6">
            <li>
              <i className="fa fa-robot" style={{ color: '#3b82f6' }}></i>{' '}
              <strong>AI Inventory Automation</strong>
            </li>
            <li>
              <i className="fa fa-check-circle" style={{ color: 'green' }}></i>{' '}
              Advanced Payment Escrow
            </li>
            <li>
              <i className="fa fa-check-circle" style={{ color: 'green' }}></i>{' '}
              Vendor Dashboards &amp; Logistics
            </li>
          </ul>
          <Link href="/#contact" className="btn-custom-cta">
            Start Enterprise Project
          </Link>
        </div>
      </div>
    </section>
  );
}
