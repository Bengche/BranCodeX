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

import { useState, useEffect, useRef } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const accountMenuRef = useRef(null);

  const desktopNavLinks = navLinks.filter((link) =>
    [
      "Home",
      "Services",
      "Projects",
      "Testimonials",
      "Blog",
      "Contact",
    ].includes(link.label),
  );

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

  // Reflect auth state from localStorage so nav actions are accurate.
  useEffect(() => {
    const syncAuthState = () => {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("bx_token");
      const rawUser = localStorage.getItem("bx_user");
      let parsedUser = null;

      if (rawUser) {
        try {
          parsedUser = JSON.parse(rawUser);
        } catch {
          parsedUser = null;
        }
      }

      setIsLoggedIn(Boolean(token));
      setCurrentUser(parsedUser);
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("focus", syncAuthState);
    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("focus", syncAuthState);
    };
  }, []);

  // Close account menu when clicking outside or pressing Escape.
  useEffect(() => {
    const onMouseDown = (event) => {
      if (!accountMenuRef.current) return;
      if (!accountMenuRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setAccountMenuOpen(false);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function getUserInitials() {
    const name = currentUser?.name?.trim();
    if (!name) return "AC";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  function signOut() {
    localStorage.removeItem("bx_token");
    localStorage.removeItem("bx_user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAccountMenuOpen(false);
    closeMenu();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-500${scrolled ? " navbar--scrolled" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
        {/* ── Logo ───────────────────────────────────────────────────────── */}
        <div className="flex items-center space-x-2 mr-6 xl:mr-10">
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
        <div className="hidden lg:flex items-center gap-4 xl:gap-5 nav-desktop-links">
          {desktopNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-slate-200 hover:text-emerald-300 transition-colors text-[13px] xl:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Desktop auth + CTA buttons ─────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 nav-desktop-actions">
          {isLoggedIn ? (
            <div className="nav-account" ref={accountMenuRef}>
              <button
                type="button"
                className="nav-account-trigger"
                aria-expanded={accountMenuOpen}
                aria-haspopup="menu"
                onClick={() => setAccountMenuOpen((prev) => !prev)}
              >
                <span className="nav-account-avatar">{getUserInitials()}</span>
                <span className="nav-account-name">
                  {currentUser?.name || "Account"}
                </span>
                <i className="fa fa-chevron-down" aria-hidden="true" />
              </button>

              <div
                className={`nav-account-menu${accountMenuOpen ? " is-open" : ""}`}
                role="menu"
              >
                <div className="nav-account-menu-header">Account</div>
                <div className="nav-account-menu-user">
                  {currentUser?.name || "Signed in user"}
                </div>
                <Link
                  href="/auth/login"
                  className="nav-account-menu-item"
                  onClick={() => setAccountMenuOpen(false)}
                  role="menuitem"
                >
                  <i className="fa fa-user" aria-hidden="true" />
                  Account
                </Link>
                <button
                  type="button"
                  className="nav-account-menu-item nav-account-menu-item--danger"
                  onClick={signOut}
                  role="menuitem"
                >
                  <i className="fa fa-right-from-bracket" aria-hidden="true" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="nav-link text-sm text-slate-200 hover:text-emerald-300 transition-colors"
              >
                Sign In
              </Link>
              <Link href="/auth/register" className="nav-register-btn">
                Register
              </Link>
            </>
          )}
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
          {/* ── Primary CTAs — always visible at the top ───────────────── */}
          <div className="mobile-menu-ctas">
            {/* Auth row — side by side */}
            {isLoggedIn ? (
              <button
                type="button"
                className="mobile-cta-secondary mobile-cta-secondary--danger"
                onClick={signOut}
              >
                <i className="fa fa-right-from-bracket" />
                Sign Out
              </button>
            ) : (
              <div className="mobile-auth-row">
                <Link
                  href="/auth/login"
                  className="mobile-cta-secondary mobile-cta-secondary--half"
                  onClick={closeMenu}
                >
                  <i className="fa fa-right-to-bracket" />
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="mobile-cta-secondary mobile-cta-secondary--purple mobile-cta-secondary--half"
                  onClick={closeMenu}
                >
                  <i className="fa fa-user-plus" />
                  Register
                </Link>
              </div>
            )}

            {/* Primary action buttons */}
            <Link
              href="/#booking"
              className="mobile-cta-secondary mobile-cta-secondary--green"
              onClick={closeMenu}
            >
              <i className="fa fa-calendar-check" />
              Book a Free Call
            </Link>
            <Link
              href="/#contact"
              className="hire-btn-mobile"
              onClick={closeMenu}
            >
              Hire Us
            </Link>
          </div>

          {/* ── Nav links — below the fold with a divider ─────────────── */}
          <div className="mobile-nav-divider">
            <span>Navigate</span>
          </div>

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
        </nav>
      </div>
    </nav>
  );
}
