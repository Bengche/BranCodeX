import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import blogData from "../../../data/blogData";

export function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = blogData.find((p) => p.slug === params.slug);
  if (!post) return { title: "Article Not Found | BranCodeX" };

  return {
    title: `${post.title} | BranCodeX Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author, url: "https://brancodex.com" }],
    alternates: { canonical: `https://brancodex.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://brancodex.com/blog/${post.slug}`,
      siteName: "BranCodeX",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: "https://brancodex.com/images/BranCodeX.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["https://brancodex.com/images/BranCodeX.jpg"],
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = blogData.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const otherPosts = blogData.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://brancodex.com",
    },
    publisher: {
      "@type": "Organization",
      name: "BranCodeX",
      url: "https://brancodex.com",
      logo: {
        "@type": "ImageObject",
        url: "https://brancodex.com/images/favicon.png",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    image: "https://brancodex.com/images/BranCodeX.jpg",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://brancodex.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="blog-post-page">
        {/* Back breadcrumb */}
        <div className="blog-post-breadcrumb">
          <div className="blog-post-breadcrumb-inner">
            <Link href="/blog">
              <i className="fas fa-arrow-left"></i> All Articles
            </Link>
            <span>/</span>
            <span>{post.category}</span>
          </div>
        </div>

        <article className="blog-post-article">
          <div className="blog-post-inner">
            {/* Header */}
            <header className="blog-post-header">
              <div className="blog-post-category">{post.category}</div>
              <h1 className="blog-post-title">{post.title}</h1>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <div className="blog-post-meta">
                <span>
                  <i className="fas fa-user"></i> {post.author}
                </span>
                <span>
                  <i className="fas fa-calendar"></i>{" "}
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>
                  <i className="fas fa-clock"></i> {post.readTime}
                </span>
              </div>
              <div className="blog-post-tags">
                {post.tags.map((t) => (
                  <span key={t} className="blog-tag">
                    #{t}
                  </span>
                ))}
              </div>
            </header>

            {/* Article body */}
            <div
              className="blog-post-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author box */}
            <div className="blog-post-author-box">
              <div className="blog-post-author-avatar">
                <i className="fas fa-user-tie"></i>
              </div>
              <div className="blog-post-author-info">
                <strong>{post.author}</strong>
                <span>
                  Full-Stack Web Developer · Founder of BranCodeX · Bamenda,
                  Cameroon
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="blog-post-cta-box">
              <h3>Ready to Build Your Business Online?</h3>
              <p>
                Get a free consultation with BranCodeX — Bamenda&apos;s leading
                web development agency. We will assess your needs and get your
                professional website live within 14 days.
              </p>
              <div className="blog-post-cta-actions">
                <Link
                  href="/contact"
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

            {/* Internal SEO Links */}
            <div style={{ marginTop: "2rem", padding: "1.5rem", background: "#0f172a", borderRadius: "1rem", border: "1px solid #1e293b" }}>
              <p style={{ color: "#94a3b8", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>More from BranCodeX</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {[
                  { href: "/", label: "BranCodeX — Professional Web Development Agency" },
                  { href: "/contact", label: "Get a Free Quote" },
                  { href: "/blog/best-web-developer-in-cameroon", label: "Best Web Developer in Cameroon" },
                  { href: "/blog/best-web-developer-in-africa", label: "Best Web Developer in Africa" },
                  { href: "/blog/best-web-developer-in-the-world", label: "Best Web Developers in the World" },
                  { href: "/blog/web-development-services-cameroon", label: "Web Development Services" },
                  { href: "/blog/how-much-does-a-website-cost-in-cameroon", label: "Website Pricing Guide" },
                  { href: "/blog/how-to-rank-your-business-on-google-in-cameroon", label: "SEO Guide for Businesses" },
                  { href: "/faq", label: "FAQ" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    style={{ color: "#22c55e", fontSize: "0.82rem", textDecoration: "underline", textUnderlineOffset: "3px" }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <section className="blog-related">
            <div className="blog-post-inner">
              <h2>More Articles</h2>
              <div className="blog-related-grid">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="blog-related-card"
                  >
                    <span
                      className="blog-card-category"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {p.category}
                    </span>
                    <span className="blog-related-title">{p.title}</span>
                    <span className="blog-related-read">
                      {p.readTime} <i className="fas fa-arrow-right"></i>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
