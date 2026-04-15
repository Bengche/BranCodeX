import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Hire a Web Developer in Bamenda, Cameroon | BranCodeX",
  description:
    "Looking for a professional web developer in Bamenda, Cameroon? BranCodeX builds fast, modern websites for businesses across Cameroon and worldwide. Get your quote today.",
  keywords: [
    "web developer Bamenda",
    "web developer Cameroon",
    "website design Bamenda",
    "web agency Cameroon",
    "hire web developer Cameroon",
    "web development Bamenda Cameroon",
    "affordable website Cameroon",
    "professional website Bamenda",
    "e-commerce Cameroon",
    "Next.js developer Cameroon",
  ],
  alternates: {
    canonical: "https://brancodex.com/hire-web-developer-cameroon",
  },
  openGraph: {
    title: "Hire a Web Developer in Bamenda, Cameroon | BranCodeX",
    description:
      "BranCodeX — the leading web development agency in Bamenda, Cameroon. We build fast, modern websites for businesses locally and worldwide.",
    url: "https://brancodex.com/hire-web-developer-cameroon",
    siteName: "BranCodeX",
  },
  twitter: {
    card: "summary",
    title: "Hire a Web Developer in Bamenda, Cameroon | BranCodeX",
    description:
      "BranCodeX — the leading web development agency in Bamenda, Cameroon. Fast, modern websites from $189.",
  },
};

const services = [
  {
    icon: "fa-laptop-code",
    title: "Custom Website Design",
    desc: "Pixel-perfect, brand-aligned websites designed from scratch. No templates — every site is unique to your business.",
  },
  {
    icon: "fa-cart-shopping",
    title: "E-Commerce Development",
    desc: "Full online stores with product management, MoMo & card payments, and inventory tracking for Cameroonian businesses.",
  },
  {
    icon: "fa-magnifying-glass-chart",
    title: "SEO Optimization",
    desc: "We optimize every site to rank on Google for your target keywords in Cameroon and internationally.",
  },
  {
    icon: "fa-mobile-screen",
    title: "Mobile-First Development",
    desc: "All sites are built mobile-first — because 80%+ of your customers in Cameroon browse on phones.",
  },
  {
    icon: "fa-gauge-high",
    title: "Performance Optimization",
    desc: "Sub-2-second load times. Fast websites rank higher, convert better, and keep visitors engaged.",
  },
  {
    icon: "fa-shield-halved",
    title: "Security & Maintenance",
    desc: "SSL certificates, security audits, regular backups, and monthly maintenance plans to keep your site safe.",
  },
];

const faqs = [
  {
    q: "Where are you based?",
    a: "We are headquartered in Bamenda, North West Region, Cameroon. We work with clients across Cameroon — Yaoundé, Douala, Buea, Limbe, Bafoussam — and internationally.",
  },
  {
    q: "How much does a website cost in Cameroon?",
    a: "Our prices start at $189 for a professional landing page and go up to $1,899 for a fully featured e-commerce store. View our complete pricing plans on the main site.",
  },
  {
    q: "Do you accept Mobile Money (MoMo)?",
    a: "Yes. We accept MTN Mobile Money, Orange Money, bank transfer, and PayPal for international clients.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most websites take 5–14 days depending on complexity. E-commerce projects typically take 2–4 weeks.",
  },
  {
    q: "Do you provide support after the website is launched?",
    a: "Yes. We offer ongoing maintenance and support packages to keep your site updated, secure, and running smoothly.",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://brancodex.com/#organization",
  name: "BranCodeX",
  description:
    "Professional web development agency based in Bamenda, Cameroon. We build fast, modern websites for businesses locally and worldwide.",
  url: "https://brancodex.com",
  telephone: "+237654155218",
  email: "contact@brancodex.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bamenda",
    addressRegion: "North West Region",
    addressCountry: "CM",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "5.9631",
    longitude: "10.1591",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [
    "https://github.com/Bengche/BranCodeX",
    "https://www.linkedin.com/in/beng-brandon-338382291",
  ],
  priceRange: "$189 - $1,899",
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "5.9631",
      longitude: "10.1591",
    },
    geoRadius: "50000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Landing Page",
          description: "1-page professional website",
        },
        price: "189",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Starter Website",
          description: "3-page business website",
        },
        price: "199",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-Commerce Store",
          description: "Full online store with product management",
        },
        price: "589",
        priceCurrency: "USD",
      },
    ],
  },
};

export default function HireWebDeveloperCameroon() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Navbar />
      <main className="seo-page">
        {/* Hero */}
        <section className="seo-hero">
          <div className="seo-hero-inner">
            <div className="seo-location-badge">
              <i className="fas fa-location-dot"></i> Bamenda, Cameroon ·
              Serving Clients Worldwide
            </div>
            <h1>Hire a Professional Web Developer in Bamenda, Cameroon</h1>
            <p>
              BranCodeX is Bamenda&apos;s leading web development agency. We
              build fast, modern, conversion-optimized websites for businesses
              across Cameroon — Yaoundé, Douala, Buea — and internationally.
              Starting from <strong>$189</strong>.
            </p>
            <div className="seo-hero-actions">
              <Link href="/#contact" className="seo-cta-btn primary">
                Get a Free Quote
              </Link>
              <a
                href="https://wa.me/237654155218"
                target="_blank"
                rel="noopener noreferrer"
                className="seo-cta-btn secondary"
              >
                <i className="fab fa-whatsapp"></i> WhatsApp Us Now
              </a>
            </div>
            <div className="seo-trust-row">
              <span>
                <i className="fas fa-check-circle"></i> 30+ Projects Delivered
              </span>
              <span>
                <i className="fas fa-check-circle"></i> Local & International
                Clients
              </span>
              <span>
                <i className="fas fa-check-circle"></i> MoMo Payments Accepted
              </span>
            </div>
          </div>
        </section>

        {/* Why BranCodeX */}
        <section className="seo-section seo-why">
          <div className="seo-container">
            <h2>Why Choose BranCodeX for Your Web Project in Cameroon?</h2>
            <p className="seo-section-sub">
              We understand the unique challenges of doing business in Cameroon
              — local payment methods, mobile-first audiences, and the need to
              compete on a global stage.
            </p>
            <div className="seo-why-grid">
              {[
                {
                  icon: "fa-map-marker-alt",
                  title: "Truly Local Expertise",
                  text: "We understand the Cameroonian market, local payment methods (MoMo, Orange Money), and how to position your business for local search.",
                },
                {
                  icon: "fa-code",
                  title: "Modern Technology Stack",
                  text: "We build with Next.js, React, and Tailwind CSS — the same tools used by world-class tech companies like Netflix and Vercel.",
                },
                {
                  icon: "fa-globe",
                  title: "International Quality",
                  text: "Our work competes with agencies in Europe and North America. Clients in the UK, USA, and France trust us to build their web presence.",
                },
                {
                  icon: "fa-headset",
                  title: "Direct Communication",
                  text: "You talk directly with the developer. No middlemen, no project managers in between — fast decisions, fast results.",
                },
                {
                  icon: "fa-money-bill-wave",
                  title: "Transparent Pricing",
                  text: "Fixed prices, no hidden fees. You know exactly what you pay before we start. Packages start at $189.",
                },
                {
                  icon: "fa-certificate",
                  title: "Satisfaction Guaranteed",
                  text: "We offer unlimited revisions on the first draft and keep refining until you are completely happy with the result.",
                },
              ].map((w) => (
                <div key={w.title} className="seo-why-card">
                  <i className={`fas ${w.icon}`}></i>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="seo-section seo-services-section">
          <div className="seo-container">
            <h2>Web Development Services in Bamenda, Cameroon</h2>
            <div className="seo-services-grid">
              {services.map((s) => (
                <div key={s.title} className="seo-service-card">
                  <i className={`fas ${s.icon}`}></i>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing snapshot */}
        <section className="seo-section seo-pricing-snapshot">
          <div className="seo-container">
            <h2>Website Pricing in Cameroon — Transparent, No Surprises</h2>
            <p className="seo-section-sub">
              Fixed prices in USD. Payments accepted via MoMo, Orange Money,
              bank transfer, or PayPal.
            </p>
            <div className="seo-pricing-table">
              {[
                { plan: "Landing Page", pages: "1 page", price: "$189" },
                { plan: "Starter", pages: "3 pages", price: "$199" },
                { plan: "Basic", pages: "5 pages", price: "$269" },
                { plan: "Standard", pages: "10 pages", price: "$469" },
                { plan: "Premium", pages: "15 pages", price: "$999" },
                {
                  plan: "E-Commerce Basic",
                  pages: "20 products",
                  price: "$589",
                },
                {
                  plan: "E-Commerce Advanced",
                  pages: "110 products",
                  price: "$1,899",
                },
              ].map((p) => (
                <div key={p.plan} className="seo-price-row">
                  <span className="seo-price-plan">{p.plan}</span>
                  <span className="seo-price-pages">{p.pages}</span>
                  <span className="seo-price-amount">{p.price}</span>
                </div>
              ))}
            </div>
            <div className="seo-pricing-cta">
              <Link href="/#plans" className="seo-cta-btn primary">
                View Full Plans
              </Link>
              <Link href="/#contact" className="seo-cta-btn secondary">
                Request Custom Quote
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="seo-section seo-faq-section">
          <div className="seo-container">
            <h2>Frequently Asked Questions — Web Development in Cameroon</h2>
            <div className="seo-faq-list">
              {faqs.map((f) => (
                <details key={f.q} className="seo-faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="seo-section seo-final-cta">
          <div className="seo-container">
            <div className="seo-cta-box">
              <h2>Ready to Grow Your Business Online?</h2>
              <p>
                Contact BranCodeX today for a free consultation. Tell us about
                your project — we will get back to you within 24 hours.
              </p>
              <div className="seo-hero-actions">
                <Link href="/#contact" className="seo-cta-btn primary">
                  Start Your Project
                </Link>
                <a href="tel:+237654155218" className="seo-cta-btn secondary">
                  <i className="fas fa-phone"></i> +237 654 155 218
                </a>
              </div>
              <p className="seo-cta-address">
                <i className="fas fa-location-dot"></i> Bamenda, North West
                Region, Cameroon &nbsp;·&nbsp;
                <a href="mailto:contact@brancodex.com">contact@brancodex.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
