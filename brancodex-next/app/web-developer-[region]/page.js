/**
 * app/web-developer-[region]/page.js
 *
 * Dynamic landing pages for all 10 Cameroonian regions + overall Cameroon.
 * Each page has:
 *  - Unique SEO metadata targeting city/region keywords
 *  - LocalBusiness JSON-LD structured data
 *  - City-specific hero, intro, and value propositions
 *  - Services section, pricing teaser, and CTA
 *
 * Generated routes (via generateStaticParams):
 *  /web-developer-cameroon
 *  /web-developer-douala
 *  /web-developer-yaounde
 *  /web-developer-bamenda
 *  /web-developer-bafoussam
 *  /web-developer-buea
 *  /web-developer-garoua
 *  /web-developer-maroua
 *  /web-developer-ngaoundere
 *  /web-developer-bertoua
 *  /web-developer-ebolowa
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import regionData from "../../data/regionData";

export async function generateStaticParams() {
  return regionData.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }) {
  const r = regionData.find((x) => x.slug === params.region);
  if (!r) return {};
  return {
    title: r.metaTitle,
    description: r.metaDescription,
    keywords: r.keywords,
    alternates: { canonical: r.canonicalUrl },
    openGraph: {
      title: r.metaTitle,
      description: r.metaDescription,
      url: r.canonicalUrl,
      siteName: "BranCodeX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: r.metaTitle,
      description: r.metaDescription,
    },
  };
}

const services = [
  {
    icon: "fa-laptop-code",
    title: "Custom Website Design",
    desc: "Pixel-perfect, brand-aligned websites built from scratch. No templates — every site is unique to your business.",
  },
  {
    icon: "fa-cart-shopping",
    title: "E-Commerce Development",
    desc: "Full online stores with MoMo & card payments, inventory management, and order tracking for Cameroonian businesses.",
  },
  {
    icon: "fa-magnifying-glass-chart",
    title: "SEO Optimization",
    desc: "Each site is optimized to rank on Google for your target city and service keywords from day one.",
  },
  {
    icon: "fa-mobile-screen",
    title: "Mobile-First Development",
    desc: "80%+ of your customers browse on phones. Every site we build is mobile-first with fast load times on Cameroonian networks.",
  },
  {
    icon: "fa-gauge-high",
    title: "Performance & Speed",
    desc: "Sub-2-second load times. Fast websites rank higher, convert more visitors, and reduce bounce rates significantly.",
  },
  {
    icon: "fa-headset",
    title: "Post-Launch Support",
    desc: "WhatsApp and email support after launch. We are with you long after your site goes live.",
  },
];

const stats = [
  { number: "47+", label: "Sites Built" },
  { number: "12", label: "Countries Served" },
  { number: "100%", label: "On-Time Delivery" },
  { number: "14 days", label: "Average Launch Time" },
];

export default function RegionPage({ params }) {
  const r = regionData.find((x) => x.slug === params.region);
  if (!r) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "BranCodeX",
    url: "https://brancodex.com",
    logo: "https://brancodex.com/images/favicon.png",
    image: "https://brancodex.com/images/favicon.png",
    description: r.metaDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bamenda",
      addressRegion: "North West",
      addressCountry: "CM",
    },
    areaServed: [
      { "@type": "City", name: r.schemaCity },
      { "@type": "Country", name: "Cameroon" },
    ],
    serviceType: "Web Development",
    priceRange: "$189 - $1,899",
    telephone: "+237654155218",
    email: "contact@brancodex.com",
    sameAs: [
      "https://github.com/Bengche",
      "https://www.linkedin.com/in/beng-brandon-338382291",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="region-hero">
        <div className="region-hero-bg" aria-hidden="true" />
        <div className="region-inner">
          <span className="region-badge">
            <i className="fas fa-map-marker-alt"></i>&nbsp; {r.regionLabel}
          </span>
          <h1 className="region-hero-title">{r.heroTitle}</h1>
          <p className="region-hero-sub">{r.heroSubtitle}</p>
          <div className="region-hero-actions">
            <a href="/#contact" className="region-btn region-btn--primary">
              <i className="fas fa-rocket"></i> Get a Free Quote
            </a>
            <a
              href="https://wa.me/237654155218"
              target="_blank"
              rel="noopener noreferrer"
              className="region-btn region-btn--whatsapp"
            >
              <i className="fab fa-whatsapp"></i> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="region-stats">
        <div className="region-stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="region-stat-item">
              <span className="region-stat-num">{s.number}</span>
              <span className="region-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────────────── */}
      <section className="region-intro">
        <div className="region-inner">
          <div className="region-intro-grid">
            <div className="region-intro-text">
              <span className="region-badge">About This Market</span>
              <h2>
                Web Development for{" "}
                <span className="region-accent">{r.city}</span> Businesses
              </h2>
              <p>{r.intro}</p>
              <Link href="/blog" className="region-text-link">
                Read our guides for Cameroonian businesses{" "}
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="region-why-grid">
              {r.whyUs.map((item) => (
                <div key={item.title} className="region-why-card">
                  <div className="region-why-icon">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────────── */}
      <section className="region-services">
        <div className="region-inner">
          <div className="region-section-header">
            <span className="region-badge">What We Build</span>
            <h2>
              Web Development Services in{" "}
              <span className="region-accent">{r.city}</span>
            </h2>
            <p>
              Every service below is available to businesses in {r.city} and the
              {" "}{r.region}. We handle everything from design to launch to
              ongoing support.
            </p>
          </div>
          <div className="region-services-grid">
            {services.map((s) => (
              <div key={s.title} className="region-service-card">
                <div className="region-service-icon">
                  <i className={`fas ${s.icon}`}></i>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ────────────────────────────────────────────────────── */}
      <section className="region-pricing">
        <div className="region-inner">
          <div className="region-pricing-box">
            <div className="region-pricing-text">
              <span className="region-badge">Transparent Pricing</span>
              <h2>
                Websites starting at{" "}
                <span className="region-accent">$189</span>
              </h2>
              <p>
                Professional websites for {r.city} businesses from $189
                (~116,000 XAF). No hidden fees. Pay via MTN Mobile Money,
                Orange Money, or international transfer.
              </p>
              <ul className="region-pricing-list">
                <li>
                  <i className="fas fa-check-circle"></i> Landing Page — $189
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> 5-Page Website — $269
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> E-Commerce Store — from $589
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> All packages include SEO, SSL &amp; mobile-first design
                </li>
              </ul>
              <div className="region-pricing-actions">
                <a href="/#plans" className="region-btn region-btn--primary">
                  View All Plans
                </a>
                <a href="/#contact" className="region-btn region-btn--outline">
                  Get Custom Quote
                </a>
              </div>
            </div>
            <div className="region-pricing-trust">
              <div className="region-trust-item">
                <i className="fas fa-shield-halved"></i>
                <div>
                  <strong>Satisfaction Guarantee</strong>
                  <span>
                    We build until you are 100% satisfied with the result.
                  </span>
                </div>
              </div>
              <div className="region-trust-item">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>14-Day Delivery</strong>
                  <span>Most websites are live within 7–14 business days.</span>
                </div>
              </div>
              <div className="region-trust-item">
                <i className="fab fa-whatsapp"></i>
                <div>
                  <strong>WhatsApp Support</strong>
                  <span>
                    Reach us directly on WhatsApp — no tickets, no delays.
                  </span>
                </div>
              </div>
              <div className="region-trust-item">
                <i className="fas fa-mobile-screen-button"></i>
                <div>
                  <strong>MoMo Payments Accepted</strong>
                  <span>
                    Pay in XAF via MTN Mobile Money or Orange Money with ease.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="region-cta">
        <div className="region-inner">
          <div className="region-cta-box">
            <h2>
              Ready to grow your {r.city} business online?
            </h2>
            <p>
              Send us a message today for a free consultation and personalized
              quote. We respond within 24 hours — usually much faster.
            </p>
            <div className="region-cta-actions">
              <a href="/#contact" className="region-btn region-btn--primary">
                <i className="fas fa-paper-plane"></i> Send a Message
              </a>
              <a
                href="https://wa.me/237654155218"
                target="_blank"
                rel="noopener noreferrer"
                className="region-btn region-btn--whatsapp"
              >
                <i className="fab fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER REGIONS ─────────────────────────────────────────────────────── */}
      <section className="region-other">
        <div className="region-inner">
          <h2 className="region-other-title">
            We serve all 10 regions of Cameroon
          </h2>
          <div className="region-other-grid">
            {regionData
              .filter((x) => x.slug !== params.region)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/web-developer-${x.slug}`}
                  className="region-other-link"
                >
                  <i className="fas fa-map-marker-alt"></i> {x.city}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
