/**
 * components/Footer.jsx
 *
 * Shared footer. Server component.
 */

import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Work", href: "/#projects" },
      { label: "Services", href: "/#services" },
      { label: "Pricing", href: "/#plans" },
      { label: "Our process", href: "/our-process" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Website guide", href: "/guide" },
      { label: "FAQ", href: "/faq" },
      { label: "Playground", href: "/playground" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

const social = [
  { label: "WhatsApp", href: "https://wa.me/237654155218", icon: "fab fa-whatsapp" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/beng-brandon-338382291",
    icon: "fab fa-linkedin-in",
  },
  { label: "GitHub", href: "https://github.com/Bengche", icon: "fab fa-github" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/bengbrandonche",
    icon: "fab fa-facebook-f",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="BranCodeX home">
            <Image src="/images/favicon.png" alt="" width={32} height={32} />
            <span>
              <span className="bran">Bran</span>
              <span className="code">Code</span>
              <span className="x">X</span>
            </span>
          </Link>
          <p>
            Websites, online stores and web apps for businesses in Cameroon and
            worldwide.
          </p>
          <p className="footer-contact">
            <a href="mailto:contact@brancodex.com">contact@brancodex.com</a>
            <br />
            <a href="tel:+237654155218">+237 654 155 218</a>
          </p>
          <div className="footer-social">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <i className={s.icon} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className="footer-col" aria-label={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2025&ndash;{year} BranCodeX. All rights reserved.
        </p>
        <p>
          BRANCODEX SARL, registered in Cameroon. RCCM RC/EBWA/2026/B/65, NIU
          M052618656154Z.
        </p>
      </div>
    </footer>
  );
}
