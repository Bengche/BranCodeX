/**
 * app/playground/page.js — Playground page
 *
 * Interactive section with three games/tools.
 * Each tool is a 'use client' component loaded below Navbar + static intro.
 */

import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JokesSection from "../../components/playground/JokesSection";
import QuizSection from "../../components/playground/QuizSection";
import LiveCodeEditor from "../../components/playground/LiveCodeEditor";

export const metadata = {
  title: "Playground | BranCodeX — Interactive Web Tools & Quiz",
  description:
    "Explore BranCodeX's interactive playground: fetch random jokes, take a general knowledge and Cameroon history quiz, or write and preview live HTML/CSS/JavaScript code — all in your browser.",
  alternates: {
    canonical: "https://brancodex.com/playground",
  },
  openGraph: {
    title: "BranCodeX Playground — Jokes, Quiz & Live Code Editor",
    description:
      "Test your knowledge on Cameroon history, write live code, and have fun with our interactive browser tools.",
    url: "https://brancodex.com/playground",
  },
};

export default function PlaygroundPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="playground-page">
        {/* Page header */}
        <header className="playground-hero">
          <div className="playground-hero-inner">
            <h1>Interactive Playground</h1>
            <p>
              Learn, play, and explore — built for curious minds. No account
              required. Just open the page and dive in.
            </p>
            <nav className="playground-quick-nav" aria-label="Jump to section">
              <a href="#jokes">Jokes</a>
              <a href="#quiz">Quiz</a>
              <a href="#live-editor">Live Editor</a>
            </nav>
          </div>
        </header>

        {/* Jokes */}
        <section id="jokes">
          <JokesSection />
        </section>

        {/* Quiz */}
        <section id="quiz">
          <QuizSection />
        </section>

        {/* Live code editor */}
        <section id="live-editor">
          <LiveCodeEditor />
        </section>

        {/* Back to home */}
        <div className="playground-back-home">
          <Link href="/" className="back-home-link">
            <i className="fa fa-arrow-left"></i> Back to portfolio
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
