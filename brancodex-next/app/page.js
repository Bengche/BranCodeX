/**
 * app/page.js — Home page
 *
 * Hero, work, services, process, pricing, about, reviews, contact.
 */

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Services from "../components/Services";
import ProcessSteps from "../components/ProcessSteps";
import Plans from "../components/Plans";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata = {
  title: "Web Development Agency in Bamenda, Cameroon | BranCodeX",
  description:
    "BranCodeX builds fast websites, online stores and web apps for businesses in Cameroon and worldwide. Prices from $189, delivered in days. Get a free quote.",
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
        <Projects />
        <Services />
        <ProcessSteps />
        <Plans />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
