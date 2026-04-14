/**
 * components/About.jsx
 *
 * About section with scroll-triggered fade-in animation.
 * 'use client' needed for the IntersectionObserver animation.
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function About() {
  const sectionRef = useRef(null);

  // Watches when the section enters the viewport, then adds a CSS class
  // that triggers the CSS transition defined in globals.css (.show-about)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('show-about');
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <h2 className="section-title">About Us</h2>

      <div className="about-card">
        <p>
          Welcome to <strong>BranCodeX</strong>. We are a web development agency
          based in Cameroon, and we engineer clean, interactive, and
          user-friendly platforms using custom full-stack technologies and
          WordPress to power your business growth.
        </p>

        <h4 className="font-bold underline mt-4">Our mission?</h4>
        <p>
          To turn ideas into beautiful, functional digital experiences that make
          people smile and businesses grow.
        </p>

        <h4 className="font-bold underline mt-4">Where is BranCodeX located?</h4>
        <p>
          Based in <strong>Bamenda, Cameroon</strong>, we work with clients
          across Cameroon and worldwide.
        </p>

        <Link href="/#contact">
          <button className="contact-btn mt-4">Let&apos;s Build Together</button>
        </Link>
      </div>
    </section>
  );
}
