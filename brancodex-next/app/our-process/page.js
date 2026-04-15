import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HowWeWork from "../../components/HowWeWork";

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
  ],
  alternates: { canonical: "https://brancodex.com/our-process" },
  openGraph: {
    title: "Our Process — How We Build Your Website | BranCodeX",
    description:
      "A clear, transparent 5-step process from consultation to launch. No surprises. Professional web development in Cameroon.",
    url: "https://brancodex.com/our-process",
  },
};

export default function OurProcessPage() {
  return (
    <>
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
