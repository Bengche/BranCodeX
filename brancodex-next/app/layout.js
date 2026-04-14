/**
 * app/layout.js
 *
 * This is the ROOT LAYOUT — it wraps every page on the site.
 * It is the best place for:
 *   ✅ Site-wide SEO metadata
 *   ✅ External CSS/font links (Font Awesome)
 *   ✅ Global CSS import
 *   ✅ Shared UI like the AOS animation init
 *
 * Think of it like the <html> and <body> tags in old HTML.
 */

import "./globals.css";
import AOSProvider from "@/components/AOSProvider";
import LoadingScreen from "@/components/LoadingScreen";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import CookieConsent from "@/components/CookieConsent";
import ScrollProgress from "@/components/ScrollProgress";
import CurrencyBadge from "@/components/CurrencyBadge";
import { Analytics } from "@vercel/analytics/react";

/* --------------------------------------------------------------------------
   SITE-WIDE SEO DEFAULTS
   Next.js reads this object and automatically builds all the <meta> tags.
   Each page can override individual fields by exporting its own `metadata`.
   -------------------------------------------------------------------------- */
export const metadata = {
  // The %s will be replaced by each page's own title
  title: {
    default: "BranCodeX | Web Development Agency in Bamenda, Cameroon",
    template: "%s | BranCodeX",
  },
  description:
    "BranCodeX is a professional web development agency in Bamenda, Cameroon. We build fast, modern websites, landing pages, e-commerce stores, and web apps for businesses in Cameroon and worldwide.",

  // Keywords help with SEO — especially for local searches in Cameroon
  keywords: [
    "web developer in Cameroon",
    "web development agency Cameroon",
    "web developer in Bamenda",
    "website design Cameroon",
    "web design Bamenda",
    "best web developers in Cameroon",
    "web developers in Africa",
    "landing pages Cameroon",
    "e-commerce Cameroon",
    "SEO Cameroon",
    "BranCodeX",
    "Beng Brandon Che",
    "Next.js developer Cameroon",
    "affordable website design",
  ],

  authors: [{ name: "Beng Brandon Che", url: "https://brancodex.com" }],
  creator: "Beng Brandon Che",
  publisher: "BranCodeX",

  // Tells search engines to index the site and follow all links
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // Canonical URL — tells Google which URL is the "official" one
  alternates: {
    canonical: "https://brancodex.com",
  },

  // Open Graph — controls the preview card when someone shares your link
  openGraph: {
    type: "website",
    url: "https://brancodex.com",
    title: "BranCodeX | Web Development Agency in Cameroon",
    description:
      "Modern, conversion-focused websites and e-commerce solutions built in Bamenda, Cameroon for clients worldwide.",
    siteName: "BranCodeX",
    images: [
      {
        url: "https://brancodex.com/images/favicon.png",
        width: 1200,
        height: 630,
        alt: "BranCodeX Web Development Agency",
      },
    ],
    locale: "en_US",
  },

  // Twitter/X card — controls how your link looks when shared on Twitter
  twitter: {
    card: "summary_large_image",
    title: "BranCodeX | Web Development Agency in Cameroon",
    description:
      "Web development agency in Bamenda, Cameroon delivering fast, modern websites, landing pages, and e-commerce experiences.",
    images: ["https://brancodex.com/images/favicon.png"],
    creator: "@brancodex",
  },

  // PWA Manifest
  manifest: "/manifest.json",

  // Favicon
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
          Font Awesome — provides all the icons (fa-rocket, fab, etc.)
          This is the same CDN link the original site used.
          It loads once here and works on every page automatically.
        */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
        />

        {/*
          JSON-LD Structured Data — this is what Google reads to understand
          WHO you are, WHERE you are, and WHAT you do. It helps you rank
          for local searches like "web developer in Bamenda".
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://brancodex.com/#organization",
                  name: "BranCodeX",
                  url: "https://brancodex.com",
                  logo: "https://brancodex.com/images/favicon.png",
                  foundingLocation: {
                    "@type": "Place",
                    name: "Bamenda, Cameroon",
                  },
                  areaServed: ["Bamenda", "Cameroon", "Worldwide"],
                  sameAs: [
                    "https://github.com/Bengche",
                    "https://www.linkedin.com/in/beng-brandon-338382291",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "bengc102@gmail.com",
                    contactType: "customer support",
                  },
                },
                {
                  "@type": "Person",
                  "@id": "https://brancodex.com/#person",
                  name: "Beng Brandon Che",
                  alternateName: "BranCodeX",
                  jobTitle: "Full-Stack Web Developer",
                  url: "https://brancodex.com",
                  image: "https://brancodex.com/images/favicon.png",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Bamenda",
                    addressRegion: "North West",
                    addressCountry: "CM",
                  },
                  areaServed: ["Bamenda", "Cameroon", "Worldwide"],
                  knowsAbout: [
                    "Web Design",
                    "Website Development",
                    "SEO",
                    "Landing Pages",
                    "E-Commerce",
                    "Next.js",
                    "React",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://brancodex.com/#website",
                  url: "https://brancodex.com",
                  name: "BranCodeX",
                  description:
                    "Web development agency in Bamenda, Cameroon building websites for clients worldwide.",
                  publisher: { "@id": "https://brancodex.com/#organization" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://brancodex.com/?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>

      <body className="bg-slate-900 text-white">
        <ScrollProgress />
        <LoadingScreen />
        <ExitIntentPopup />
        <CookieConsent />
        <CurrencyBadge />
        {/*
          AOSProvider wraps everything so AOS (scroll animations) is
          initialized once on the client, making all data-aos attributes work.
        */}
        <AOSProvider>{children}</AOSProvider>
        <Analytics />
      </body>
    </html>
  );
}
