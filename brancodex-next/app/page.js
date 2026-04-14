/**
 * app/page.js — Home page
 *
 * Assembles every section component in the correct order.
 * Metadata exported here overrides the layout default for the home page.
 */

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ResultsStrip from "../components/ResultsStrip";
import About from "../components/About";
import Services from "../components/Services";
import Plans from "../components/Plans";
import HowWeWork from "../components/HowWeWork";
import PriceCalculator from "../components/PriceCalculator";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import PlaygroundTeaser from "../components/PlaygroundTeaser";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import BookingSection from "../components/BookingSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export const metadata = {
  title: "BranCodeX | Best Web Development Agency in Cameroon",
  description:
    "BranCodeX is the leading web development agency in Bamenda, Cameroon. We build fast, SEO-optimised websites, landing pages, e-commerce stores, and custom web apps for clients in Cameroon and worldwide.",
  alternates: {
    canonical: "https://brancodex.com",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ResultsStrip />
        <About />
        <Services />
        <HowWeWork />
        <Plans />
        <PriceCalculator />
        <Skills />
        <Projects />
        <PlaygroundTeaser />
        <Testimonials />
        <CTASection />
        <Contact />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
