/**
 * components/Hero.jsx
 *
 * 'use client' — needed because Typed.js runs in the browser and
 * requires DOM access via useEffect + useRef.
 */

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const typedRef = useRef(null); // Reference to the DOM element Typed.js will type into

  useEffect(() => {
    // Dynamically import Typed.js so it only loads on the client
    import("typed.js").then(({ default: Typed }) => {
      const typed = new Typed(typedRef.current, {
        strings: [
          'Building Scalable Web Solutions from Cameroon, to the World! Welcome to <span class="text-yellow-300"><span class="bran">Bran</span><span class="code">Code</span><span class="x">X</span></span>',
        ],
        typeSpeed: 40,
        showCursor: true,
        cursorChar: "|",
      });

      // Cleanup: destroy the instance when the component unmounts
      return () => typed.destroy();
    });
  }, []);

  // Scroll-triggered animation for buttons and photo
  useEffect(() => {
    const butz = document.querySelector(".butz");
    const heroz = document.querySelector(".heroz");

    function onScroll() {
      if (butz) butz.classList.add("show-butz");
      if (heroz) heroz.classList.add("show-heroz");
    }

    // Trigger immediately + on scroll
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Hero section ─────────────────────────────────────────────── */}
      <header
        id="hero"
        className="w-full min-h-screen text-white flex items-center px-6 md:px-20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
          {/* Left: Text content */}
          <div className="flex-1 space-y-6 text-start md:text-left">
            {/* H1 is the most important SEO heading — make it descriptive */}
            <h1 className="text-3xl font-extrabold mb-4 md:text-start bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-300 bg-clip-text text-transparent">
              The Best Web Development Agency in Cameroon
            </h1>

            {/* Typed.js target element */}
            <h2
              ref={typedRef}
              className="text-xl md:text-4xl font-extrabold md:text-start bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-300 bg-clip-text text-transparent"
              data-aos="fade-down"
              aria-label="Building Scalable Web Solutions from Cameroon to the World — Welcome to BranCodeX"
            />

            {/* CTA buttons */}
            <div className="flex flex-row gap-4 justify-center md:justify-start butz">
              <Link href="/#projects">
                <button className="contact-btn text-base">Projects</button>
              </Link>
              <Link href="/#plans">
                <button className="contact-btn text-base">Pricing</button>
              </Link>
            </div>
          </div>

          {/* Right: Profile photo */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/Beng Brandon Che.jpg"
              alt="Beng Brandon Che — Web Developer in Bamenda Cameroon"
              width={320}
              height={320}
              className="rounded-full object-cover hover:scale-105 transition duration-500 heroz"
              priority
            />
          </div>
        </div>
      </header>
    </>
  );
}
