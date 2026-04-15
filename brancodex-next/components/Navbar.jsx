/**
 * components/Navbar.jsx
 *
 * 'use client' — needed because this component manages state (menu open/close)
 * and attaches click event listeners.
 *
 * Features:
 *  - Sticky top navigation
 *  - Logo
 *  - Desktop links
 *  - "Hire Us" CTA button
 *  - Animated hamburger / X mobile menu
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Our Process", href: "/our-process" },
  { label: "Playground", href: "/playground" },
  { label: "FAQ's", href: "/faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // When the mobile menu is open, prevent the page from scrolling behind it
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    // Cleanup when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav
      id="navbar"
      className="sticky top-0 left-0 w-full z-50 backdrop-blur text-white shadow-md transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ── Logo ───────────────────────────────────────────────────────── */}
        <div className="flex items-center space-x-2 mr-10">
          <Image
            src="/images/favicon.png"
            alt="BranCodeX Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <Link href="/#hero">
            <span className="font-bold text-xl tracking-wide">
              <span className="bran">Bran</span>
              <span className="code">Code</span>
              <span className="x">X</span>
            </span>
          </Link>
        </div>

        {/* ── Desktop links ──────────────────────────────────────────────── */}
        <div className="hidden sm:flex flex-wrap items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link hover:text-blue-400 transition text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Desktop "Hire Us" button ──────────────────────────────────── */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/#contact" className="contact-btn1">
            Hire Us
          </Link>
        </div>

        {/* ── Mobile hamburger button ───────────────────────────────────── */}
        <div className="md:hidden z-50">
          <button
            id="menu-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className={menuOpen ? "open" : ""}
          >
            <div className="hamburger-icon">
              <span className="line-1"></span>
              <span className="line-2"></span>
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile overlay menu ──────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={menuOpen ? "active" : ""}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav-content">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-link"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}

          <div className="mobile-footer mt-8">
            <Link
              href="/#contact"
              className="hire-btn-mobile"
              onClick={closeMenu}
            >
              Hire Us
            </Link>
          </div>
        </nav>
      </div>
    </nav>
  );
}
