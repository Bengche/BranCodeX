import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import blogData from "../../data/blogData";

export const metadata = {
  title: "Blog — Web Development Tips & Guides for Cameroon | BranCodeX",
  description:
    "Expert web development articles for businesses in Cameroon. Learn SEO, website pricing, e-commerce, and how to grow your business online.",
  keywords: [
    "web development blog cameroon",
    "website tips cameroon",
    "seo guide cameroon",
    "website cost cameroon",
    "web developer bamenda blog",
  ],
  alternates: { canonical: "https://brancodex.com/blog" },
  openGraph: {
    title: "BranCodeX Blog — Web Development for Businesses in Cameroon",
    description:
      "Practical guides on websites, SEO, pricing, and digital growth for businesses in Cameroon and beyond.",
    url: "https://brancodex.com/blog",
  },
};

const categoryColors = {
  "Business Growth": "#22c55e",
  "Pricing Guide": "#3b82f6",
  SEO: "#8b5cf6",
  Technology: "#f59e0b",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="blog-page">
        {/* Hero */}
        <header className="blog-hero">
          <div className="blog-hero-inner">
            <span className="blog-hero-badge">KNOWLEDGE HUB</span>
            <h1>Web Development Tips &amp; Insights</h1>
            <p>
              Practical articles to help businesses in Cameroon build a stronger
              presence online — written by the team at BranCodeX.
            </p>
          </div>
        </header>

        {/* Grid */}
        <section className="blog-grid-section">
          <div className="blog-container">
            <p className="blog-count">
              {blogData.length} articles · Updated regularly
            </p>
            <div className="blog-grid">
              {blogData.map((post) => {
                const color = categoryColors[post.category] || "#22c55e";
                return (
                  <article key={post.slug} className="blog-card">
                    <div
                      className="blog-card-category"
                      style={{
                        color,
                        borderColor: `${color}40`,
                        background: `${color}10`,
                      }}
                    >
                      {post.category}
                    </div>
                    <h2 className="blog-card-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-meta">
                      <span>
                        <i className="fas fa-clock"></i> {post.readTime}
                      </span>
                      <span>
                        <i className="fas fa-calendar"></i>{" "}
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="blog-card-tags">
                      {post.tags.map((t) => (
                        <span key={t} className="blog-tag">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="blog-card-link"
                      style={{ color }}
                    >
                      Read Article <i className="fas fa-arrow-right"></i>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="blog-cta-section">
          <div className="blog-container">
            <div className="blog-cta-box">
              <h2>Ready to Build Your Business Online?</h2>
              <p>
                Stop reading — start growing. Contact BranCodeX for a free
                consultation and get your professional website live within 14
                days.
              </p>
              <div className="blog-cta-actions">
                <Link
                  href="/#contact"
                  className="blog-cta-btn blog-cta-btn--primary"
                >
                  Get a Free Quote
                </Link>
                <a
                  href="https://wa.me/237654155218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-cta-btn blog-cta-btn--secondary"
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
