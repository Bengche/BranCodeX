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
  const [scrolled, setScrolled] = useState(false);

  // Glass effect on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When the mobile menu is open, prevent body scroll and hide floating widgets
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-500${scrolled ? " navbar--scrolled" : ""}`}
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
        <div className="hidden lg:flex flex-wrap items-center space-x-6">
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

        {/* ── Desktop auth + CTA buttons ─────────────────────────────── */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            href="/auth/login"
            className="nav-link text-sm hover:text-blue-400 transition"
          >
            Sign In
          </Link>
          <Link href="/auth/register" className="nav-register-btn">
            Register
          </Link>
          <Link href="/#booking" className="nav-book-btn">
            <i
              className="fa fa-calendar-check"
              style={{ marginRight: "5px" }}
            />
            Book a Call
          </Link>
          <Link href="/#contact" className="contact-btn1">
            Hire Us
          </Link>
        </div>

        {/* ── Mobile hamburger button ───────────────────────────────────── */}
        <div className="lg:hidden z-50">
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
        aria-modal={menuOpen}
        role="dialog"
      >
        <nav className="mobile-nav-content" aria-label="Mobile navigation">
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

          <div className="mobile-menu-ctas">
            <Link
              href="/auth/login"
              className="mobile-cta-secondary"
              onClick={closeMenu}
            >
              <i className="fa fa-right-to-bracket" />
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="mobile-cta-secondary mobile-cta-secondary--purple"
              onClick={closeMenu}
            >
              <i className="fa fa-user-plus" />
              Create Account
            </Link>
            <Link
              href="/#booking"
              className="mobile-cta-secondary mobile-cta-secondary--green"
              onClick={closeMenu}
            >
              <i className="fa fa-calendar-check" />
              Book a Call
            </Link>
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
