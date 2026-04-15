/**
 * app/faq/page.js — FAQ page
 *
 * Server component — renders an accessible accordion from faqData.js.
 * Each item starts collapsed; opening is handled via <details>/<summary>
 * which works without any JavaScript.
 */

import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FAQAccordion from "../../components/FAQAccordion";

export const metadata = {
  title: "FAQ | BranCodeX — Web Development Questions Answered",
  description:
    "Find answers to the most common questions about BranCodeX web development services, pricing, timelines, hosting, SEO, and more. Based in Cameroon, serving clients worldwide.",
  alternates: {
    canonical: "https://brancodex.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | BranCodeX",
    description:
      "Everything you need to know about BranCodeX web development services — pricing, delivery time, SEO, hosting, and more.",
    url: "https://brancodex.com/faq",
  },
};

export default function FAQPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="faq-page">
        {/* Page header */}
        <header className="faq-hero">
          <div className="faq-hero-inner">
            <h1>Frequently Asked Questions</h1>
            <p>
              Got questions about our services, pricing, or process? Find quick
              answers below. Still unsure?{" "}
              <Link href="/#contact">Contact us directly.</Link>
            </p>
          </div>
        </header>

        {/* Accordion list */}
        <section className="faq-section" aria-label="FAQ accordion">
          <FAQAccordion />
        </section>
      </main>

      <Footer />
    </>
  );
}
