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
import { Analytics } from "@vercel/analytics/react";

/* --------------------------------------------------------------------------
   SITE-WIDE SEO DEFAULTS
   Next.js reads this object and automatically builds all the <meta> tags.
   Each page can override individual fields by exporting its own `metadata`.
   -------------------------------------------------------------------------- */
export const metadata = {
  metadataBase: new URL("https://brancodex.com"),
  // The %s will be replaced by each page's own title
  title: {
    default: "BranCodeX | Web Development Agency in Bamenda, Cameroon",
    template: "%s | BranCodeX",
  },
  description:
    "BranCodeX is a professional web development agency in Bamenda, Cameroon. We build fast, modern websites, landing pages, e-commerce stores, and web apps for businesses in Cameroon and worldwide.",

  // Keywords help with SEO — especially for local searches in Cameroon
  keywords: [
    // Cameroon — local intent (high priority)
    "web developer in Cameroon",
    "web development agency Cameroon",
    "web developer in Bamenda",
    "website design Cameroon",
    "web design Bamenda",
    "best web developer in Cameroon",
    "affordable website design Cameroon",
    "hire web developer Cameroon",
    "web development Bamenda Cameroon",
    "website design Bamenda",
    "web agency Bafoussam",
    "web developer Douala",
    "web developer Yaounde",
    "web developer Buea",
    "website design Yaoundé",
    "website design Douala",
    "e-commerce Cameroon",
    "online store Cameroon",
    "SEO Cameroon",
    "MoMo payment website Cameroon",
    "Next.js developer Cameroon",
    "WordPress developer Cameroon",
    // Africa — regional intent
    "web developer in Africa",
    "web development agency Africa",
    "best web developer Africa",
    "web design West Africa",
    "web developer Central Africa",
    "web developer Nigeria",
    "web developer Ghana",
    "web developer Senegal",
    "African web design agency",
    "web development company Sub-Saharan Africa",
    // Global / English-speaking
    "affordable web development agency",
    "freelance web developer",
    "professional website design",
    "landing page design",
    "e-commerce website development",
    "Next.js developer",
    "React web developer",
    "small business website design",
    "conversion-optimized website",
    // Brand
    "BranCodeX",
    "Beng Brandon Che",
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

  // Open Graph — let Next.js opengraph-image.jsx generate a real 1200×630 OG image.
  // Do NOT override openGraph.images here — that would bypass the generated image.
  openGraph: {
    type: "website",
    url: "https://brancodex.com",
    title: "BranCodeX | Web Development Agency in Cameroon",
    description:
      "Modern, conversion-focused websites and e-commerce solutions built in Bamenda, Cameroon for clients worldwide.",
    siteName: "BranCodeX",
    locale: "en_US",
  },

  // Twitter/X card — summary_large_image auto-picks up the opengraph-image.jsx
  twitter: {
    card: "summary_large_image",
    title: "BranCodeX | Web Development Agency in Cameroon",
    description:
      "Web development agency in Bamenda, Cameroon delivering fast, modern websites, landing pages, and e-commerce experiences.",
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
                  logo: {
                    "@type": "ImageObject",
                    url: "https://brancodex.com/images/favicon.png",
                    width: 512,
                    height: 512,
                  },
                  foundingLocation: {
                    "@type": "Place",
                    name: "Bamenda, Cameroon",
                  },
                  areaServed: [
                    "Bamenda",
                    "Cameroon",
                    "Douala",
                    "Yaoundé",
                    "Buea",
                    "Bafoussam",
                    "Africa",
                    "Worldwide",
                  ],
                  sameAs: [
                    "https://github.com/Bengche",
                    "https://github.com/Bengche/BranCodeX",
                    "https://www.linkedin.com/in/beng-brandon-338382291",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "contact@brancodex.com",
                    telephone: "+237654155218",
                    contactType: "customer support",
                    availableLanguage: ["English", "French"],
                  },
                },
                {
                  "@type": "Person",
                  "@id": "https://brancodex.com/#person",
                  name: "Beng Brandon Che",
                  alternateName: "BranCodeX",
                  jobTitle: "Full-Stack Web Developer",
                  url: "https://brancodex.com",
                  image: "https://brancodex.com/images/Beng Brandon Che.jpeg",
                  worksFor: { "@id": "https://brancodex.com/#organization" },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Bamenda",
                    addressRegion: "North West",
                    addressCountry: "CM",
                  },
                  areaServed: ["Bamenda", "Cameroon", "Africa", "Worldwide"],
                  knowsAbout: [
                    "Web Design",
                    "Website Development",
                    "SEO",
                    "Local SEO",
                    "Landing Pages",
                    "E-Commerce",
                    "Next.js",
                    "React",
                    "WordPress",
                    "Mobile-first Design",
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
