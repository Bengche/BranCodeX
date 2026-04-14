import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title:
    "5 Mistakes Cameroonian Businesses Make With Their Website | BranCodeX",
  description:
    "Discover the 5 most common website mistakes that cost Cameroonian businesses clients and revenue — and how to fix them. Free guide by BranCodeX.",
  alternates: { canonical: "https://brancodex.com/guide" },
  openGraph: {
    title: "5 Website Mistakes Cameroonian Businesses Must Avoid",
    description:
      "Free guide: The 5 critical website mistakes that are costing your business clients right now — and the exact fixes.",
    url: "https://brancodex.com/guide",
  },
};

const mistakes = [
  {
    number: "01",
    icon: "fa-mobile-screen",
    title: "Not Having a Mobile-Optimized Website",
    problem:
      "Over 80% of internet users in Cameroon browse on mobile phones. If your website isn't designed for mobile first, you are actively losing clients every single day. Slow-loading, hard-to-tap buttons and text that requires zooming will drive visitors straight to your competitors.",
    fix: "Mobile-first design ensures your website looks perfect on every screen size. Every BranCodeX site is built mobile-first from day one — because that is where your customers are.",
    stat: "80%+ of Cameroonian users browse on mobile",
    color: "#ef4444",
  },
  {
    number: "02",
    icon: "fa-lock",
    title: "No SSL Certificate (No HTTPS)",
    problem:
      "If your website URL starts with http:// instead of https://, browsers display a 'Not Secure' warning to every visitor. This destroys trust instantly — especially for businesses that handle payments or client information. Google also actively penalizes non-secure sites in search rankings.",
    fix: "SSL certificates are now free and standard. Every BranCodeX package includes an SSL certificate, transforming your site to secure HTTPS automatically.",
    stat: "Google ranks HTTPS sites higher in search results",
    color: "#f59e0b",
  },
  {
    number: "03",
    icon: "fa-gauge-high",
    title: "Slow Page Load Speed",
    problem:
      "Studies show that 53% of visitors abandon a website that takes more than 3 seconds to load. Heavy, unoptimized images, bloated code, and cheap shared hosting are the main culprits. A slow website costs you customers and damages your Google ranking.",
    fix: "Speed optimization includes image compression, code minification, CDN delivery, and choosing the right hosting. BranCodeX builds for performance — targeting sub-2-second load times on every project.",
    stat: "53% of visitors leave if a page takes 3+ seconds",
    color: "#8b5cf6",
  },
  {
    number: "04",
    icon: "fa-bullseye",
    title: "No Clear Call-to-Action (CTA)",
    problem:
      "Many business websites look beautiful but fail to tell visitors what to do next. Without a clear 'Call Us', 'Get a Quote', or 'WhatsApp Us' button prominently placed, visitors browse and leave without ever becoming customers. You are spending money to bring people to a dead end.",
    fix: "Every page should have one primary CTA above the fold. BranCodeX designs every layout around conversion — making it obvious and easy for visitors to take the next step with your business.",
    stat: "Websites with clear CTAs convert up to 200% more",
    color: "#22c55e",
  },
  {
    number: "05",
    icon: "fa-magnifying-glass",
    title: "Not Showing Up on Google (No SEO)",
    problem:
      "Having a beautiful website that no one can find is like opening a shop in the middle of the forest. Without basic SEO (Search Engine Optimization), your website will not appear when potential clients search for your services on Google. Most businesses in Cameroon have zero SEO strategy.",
    fix: "SEO includes optimized page titles, descriptions, proper heading structure, local business markup, and content that Google understands. BranCodeX includes basic on-page SEO in every project — giving you a real chance to rank.",
    stat: "93% of online experiences begin with a search engine",
    color: "#3b82f6",
  },
];

export default function GuidePage() {
  return (
    <>
      <Navbar />
      <main className="guide-page">
        {/* Header */}
        <header className="guide-hero">
          <div className="guide-hero-inner">
            <span className="guide-badge">FREE GUIDE</span>
            <h1>
              5 Costly Mistakes Cameroonian Businesses Make With Their Website
            </h1>
            <p>
              And the exact fixes that will turn your website into a
              client-generating machine.
            </p>
            <div className="guide-meta">
              <span>
                <i className="fas fa-user"></i> By BranCodeX — Bamenda, Cameroon
              </span>
              <span>
                <i className="fas fa-clock"></i> 5 min read
              </span>
              <span>
                <i className="fas fa-globe"></i> For businesses in Cameroon &
                beyond
              </span>
            </div>
          </div>
        </header>

        {/* Intro */}
        <section className="guide-intro-section">
          <div className="guide-container">
            <p className="guide-intro-text">
              After building websites for businesses across Cameroon and
              internationally, one pattern stands out: the same five mistakes
              appear in <strong>over 90% of small business websites</strong> we
              review. These mistakes are silently costing businesses thousands
              of dollars in lost clients every year.
            </p>
            <p className="guide-intro-text">
              The good news? Every single one of them is fixable. This guide
              breaks them down plainly and tells you exactly what to do about
              each one.
            </p>
          </div>
        </section>

        {/* Mistakes */}
        <section className="guide-mistakes-section">
          <div className="guide-container">
            {mistakes.map((m) => (
              <article key={m.number} className="guide-mistake">
                <div
                  className="guide-mistake-number"
                  style={{ borderColor: m.color, color: m.color }}
                >
                  {m.number}
                </div>
                <div className="guide-mistake-content">
                  <div className="guide-mistake-header">
                    <i
                      className={`fas ${m.icon}`}
                      style={{ color: m.color }}
                    ></i>
                    <h2>{m.title}</h2>
                  </div>
                  <div className="guide-stat" style={{ borderColor: m.color }}>
                    <i
                      className="fas fa-chart-bar"
                      style={{ color: m.color }}
                    ></i>
                    {m.stat}
                  </div>
                  <h3 className="guide-problem-label">❌ The Problem</h3>
                  <p className="guide-problem-text">{m.problem}</p>
                  <h3 className="guide-fix-label">✅ The Fix</h3>
                  <p className="guide-fix-text">{m.fix}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA at bottom */}
        <section className="guide-cta-section">
          <div className="guide-container">
            <div className="guide-cta-box">
              <h2>Is Your Website Making Any of These Mistakes?</h2>
              <p>
                Get a <strong>free website audit</strong> from BranCodeX. We
                will review your site, identify every issue, and tell you
                exactly how to fix it — completely free, no obligation.
              </p>
              <div className="guide-cta-actions">
                <Link href="/#contact" className="guide-cta-btn primary">
                  Request a Free Audit
                </Link>
                <a
                  href="https://wa.me/237654155218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guide-cta-btn secondary"
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp Us
                </a>
              </div>
              <p className="guide-cta-small">
                Based in Bamenda, Cameroon · Serving clients worldwide ·{" "}
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
