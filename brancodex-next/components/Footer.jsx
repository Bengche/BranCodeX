/**
 * components/Footer.jsx
 *
 * Shared footer used on every page.
 * No interactivity needed, so this is a Server Component (no 'use client').
 */

import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ's", href: "/faq" },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  {
    icon: "fab fa-whatsapp",
    href: "https://wa.link/fhyxfh",
    label: "WhatsApp",
  },
  {
    icon: "fas fa-envelope",
    href: "mailto:contact@brancodex.com",
    label: "Email",
  },
  {
    icon: "fab fa-linkedin-in",
    href: "https://www.linkedin.com/in/beng-brandon-338382291",
    label: "LinkedIn",
  },
  {
    icon: "fab fa-github",
    href: "https://github.com/Bengche",
    label: "GitHub",
  },
  {
    icon: "fab fa-facebook-f",
    href: "https://www.facebook.com/bengbrandonche",
    label: "Facebook",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section" data-aos="fade-up">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <Link href="/">
            <h3 className="flex items-center gap-2">
              <Image
                src="/images/favicon.png"
                alt="BranCodeX"
                width={35}
                height={35}
              />
              <span className="font-bold text-xl tracking-wide">
                <span className="bran">Bran</span>
                <span className="code">Code</span>
                <span className="x">X</span>
              </span>
            </h3>
          </Link>
          <p>Crafting Interactive Experiences with Passion &amp; Precision.</p>
        </div>

        {/* Quick links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social icons */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            {socialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2025&ndash;{currentYear} <span className="bran">Bran</span>
          <span className="code">Code</span>
          <span className="x">X</span> | All Rights Reserved.
        </p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.78rem" }}>
          <Link href="/privacy-policy" style={{ color: "#64748b", textDecoration: "none", marginRight: "1rem" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "#64748b", textDecoration: "none", marginRight: "1rem" }}>Terms of Service</Link>
          <a href="mailto:contact@brancodex.com" style={{ color: "#64748b", textDecoration: "none" }}>contact@brancodex.com</a>
        </p>
      </div>
    </footer>
  );
}
