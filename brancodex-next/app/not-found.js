import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "404 — Page Not Found | BranCodeX",
  description:
    "The page you are looking for doesn't exist. Return to BranCodeX — web development agency in Bamenda, Cameroon.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="nf-main">
        <div className="nf-inner">
          <div className="nf-glitch" aria-hidden="true">
            404
          </div>
          <div className="nf-icon">
            <i className="fas fa-triangle-exclamation"></i>
          </div>
          <h1>Page Not Found</h1>
          <p>
            The page you are looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          <div className="nf-actions">
            <Link href="/" className="nf-btn nf-btn--primary">
              <i className="fas fa-house"></i> Back to Homepage
            </Link>
            <Link href="/#contact" className="nf-btn nf-btn--secondary">
              <i className="fas fa-envelope"></i> Contact Us
            </Link>
          </div>

          <div className="nf-links">
            <span>Quick links:</span>
            <Link href="/#services">Services</Link>
            <Link href="/#plans">Pricing</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/hire-web-developer-cameroon">Hire Us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
