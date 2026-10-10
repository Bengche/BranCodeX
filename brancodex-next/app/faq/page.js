import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import faqData from "../../data/faqData";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export const metadata = {
  title: "FAQ: Web Development Questions Answered | BranCodeX",
  description:
    "Answers about BranCodeX pricing, timelines, hosting, revisions, payments and SEO. Web development agency in Bamenda, Cameroon, serving clients worldwide.",
  alternates: { canonical: "https://brancodex.com/faq" },
  openGraph: {
    title: "Frequently Asked Questions | BranCodeX",
    description:
      "Pricing, delivery time, SEO, hosting and more, answered by BranCodeX.",
    url: "https://brancodex.com/faq",
    siteName: "BranCodeX",
  },
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main id="main-content">
        <header className="page-head">
          <div className="sec-inner">
            <h1>Frequently asked questions</h1>
            <p>
              Quick answers about our services, pricing and process. Cannot find
              yours? <Link href="/#contact">Send us a message</Link>.
            </p>
          </div>
        </header>

        <section className="sec sec--alt" aria-label="Questions and answers">
          <div className="sec-inner qa-wrap">
            {faqData.map((item) => (
              <details key={item.question} className="qa" name="faq">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
