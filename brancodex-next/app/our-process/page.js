import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const steps = [
  {
    title: "Discovery call",
    text: "A free call to understand your business, your customers and what the website needs to do. We ask a lot of questions so we build the right thing the first time.",
  },
  {
    title: "Proposal and agreement",
    text: "You receive a written proposal with the scope, the timeline and a fixed price. Payment is split into 50% to start and 50% on delivery.",
  },
  {
    title: "Design",
    text: "We create a mockup of your key pages. You review it, ask for changes, and approve the design before any code is written.",
  },
  {
    title: "Build and review",
    text: "We build the site and send you a private preview link, usually within 5 to 7 days. You test every page on your phone and computer and send us your changes. Packages include 2 or 3 rounds of revisions.",
  },
  {
    title: "Launch",
    text: "We connect your domain, set up hosting and SSL, run final speed and mobile checks, and go live. You own the site, and we stay available for support afterwards.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How BranCodeX builds your website",
  description:
    "The steps from the first consultation to your website going live.",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "189",
  },
  step: steps.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.text,
  })),
};

export const metadata = {
  title: "Our Process: How We Build Your Website | BranCodeX",
  description:
    "From the first call to launch day: how BranCodeX designs, builds and delivers your website in Cameroon, step by step, with a fixed price and clear timelines.",
  alternates: { canonical: "https://brancodex.com/our-process" },
  openGraph: {
    title: "Our Process: How We Build Your Website | BranCodeX",
    description:
      "Five clear steps from consultation to launch, with a fixed price and no surprises.",
    url: "https://brancodex.com/our-process",
    siteName: "BranCodeX",
  },
};

export default function OurProcessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Navbar />
      <main id="main-content">
        <header className="page-head">
          <div className="sec-inner">
            <h1>How we build your website</h1>
            <p>
              Five steps from the first conversation to a live site. You know
              the price and the timeline before we start, and you approve each
              stage before we move on.
            </p>
          </div>
        </header>

        <section className="sec sec--alt" aria-label="Process steps">
          <div className="sec-inner">
            <ol className="timeline">
              {steps.map((step) => (
                <li key={step.title}>
                  <h2>{step.title}</h2>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="page-cta">
              <div>
                <h2>After launch</h2>
                <p>
                  Monthly maintenance covers security updates, backups, content
                  edits and monitoring, so your site stays fast and safe.
                </p>
              </div>
              <Link href="/#contact" className="btn btn--primary">
                Start with a free call
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
