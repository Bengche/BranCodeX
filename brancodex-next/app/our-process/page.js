import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HowWeWork from "../../components/HowWeWork";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How BranCodeX Builds Your Website",
  description:
    "A transparent, step-by-step process from the first consultation to your website going live — with no surprises and a 14-day delivery guarantee.",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    minValue: "189",
    maxValue: "1899",
  },
  totalTime: "P14D",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Discovery Call",
      text: "We have a free consultation to understand your business, goals, and target audience. We ask the right questions to ensure we build exactly what you need.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Proposal & Agreement",
      text: "We send you a clear project proposal with scope, timeline, and price. Once you approve and pay the deposit, we get started immediately.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Design & Development",
      text: "We build your website using modern technologies. You receive a staging link to review the design within 5–7 days.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review & Revisions",
      text: "You review the site and provide feedback. We make up to 3 rounds of revisions until the site is exactly how you want it.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Launch",
      text: "Once you approve, we deploy your site to your domain, configure hosting, and hand over full ownership. Post-launch support included.",
    },
  ],
};

export const metadata = {
  title: "Our Process — How We Build Your Website | BranCodeX",
  description:
    "See exactly how BranCodeX builds your website — from the first consultation to launch. A transparent, step-by-step process with no surprises and a 14-day delivery guarantee.",
  keywords: [
    "web development process cameroon",
    "how we build websites",
    "website development steps",
    "web agency process bamenda",
    "BranCodeX how we work",
    "website development timeline cameroon",
    "website design process africa",
  ],
  alternates: { canonical: "https://brancodex.com/our-process" },
  openGraph: {
    title: "Our Process — How We Build Your Website | BranCodeX",
    description:
      "A clear, transparent 5-step process from consultation to launch. No surprises. Professional web development in Cameroon.",
    url: "https://brancodex.com/our-process",
    siteName: "BranCodeX",
  },
  twitter: {
    card: "summary",
    title: "Our Process | BranCodeX",
    description:
      "A clear 5-step process from consultation to launch. Professional web development in Cameroon.",
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
      <main>
        {/* Page hero */}
        <header className="hww-page-hero">
          <div className="hww-page-hero-inner">
            <span className="hww-badge">OUR PROCESS</span>
            <h1>How We Build Your Website</h1>
            <p>
              A clear, structured process from our first conversation to your
              website going live — with full transparency at every step.
            </p>
          </div>
        </header>

        {/* Reuse the full process section */}
        <HowWeWork />
      </main>
      <Footer />
    </>
  );
}
