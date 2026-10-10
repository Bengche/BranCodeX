/**
 * app/layout.js
 *
 * Root layout: site-wide metadata, structured data, global styles and the two
 * floating helpers (WhatsApp and chat).
 */

import "./globals.css";
import "./sections.css";
import AOSProvider from "@/components/AOSProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrandonAI from "@/components/BrandonAI";

const SITE_URL = "https://brancodex.com";

// Pages set their own canonical URL; nothing is set here so that pages
// without one never point at the home page by mistake.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Web Development Agency in Bamenda, Cameroon | BranCodeX",
    template: "%s | BranCodeX",
  },
  description:
    "BranCodeX builds fast websites, online stores and web apps for businesses in Cameroon and worldwide. Prices from $189, delivered in days. Get a free quote.",
  authors: [{ name: "Beng Brandon Che", url: SITE_URL }],
  creator: "Beng Brandon Che",
  publisher: "BranCodeX",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // The generated opengraph-image.jsx supplies the share image.
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "BranCodeX | Web Development Agency in Cameroon",
    description:
      "Fast websites, online stores and web apps built in Bamenda, Cameroon for clients worldwide.",
    siteName: "BranCodeX",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BranCodeX | Web Development Agency in Cameroon",
    description:
      "Fast websites, online stores and web apps built in Bamenda, Cameroon for clients worldwide.",
    creator: "@brancodex",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "BranCodeX",
      legalName: "BRANCODEX SARL",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/favicon.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/images/favicon.png`,
      description:
        "Web development agency in Bamenda, Cameroon building websites, online stores and web apps.",
      email: "contact@brancodex.com",
      telephone: "+237654155218",
      priceRange: "$189 - $1899",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bamenda",
        addressRegion: "North West",
        addressCountry: "CM",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 5.9597,
        longitude: 10.146,
      },
      areaServed: [
        { "@type": "Country", name: "Cameroon" },
        { "@type": "Place", name: "Worldwide" },
      ],
      founder: { "@id": `${SITE_URL}/#person` },
      knowsLanguage: ["en", "fr"],
      sameAs: [
        "https://github.com/Bengche",
        "https://www.linkedin.com/in/beng-brandon-338382291",
        "https://www.facebook.com/bengbrandonche",
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
      "@id": `${SITE_URL}/#person`,
      name: "Beng Brandon Che",
      jobTitle: "Founder and Full-Stack Web Developer",
      url: SITE_URL,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      knowsAbout: [
        "Web development",
        "Next.js",
        "React",
        "Node.js",
        "WordPress",
        "E-commerce",
        "Search engine optimization",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "BranCodeX",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>

      <body className="bg-slate-900 text-white">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AOSProvider>{children}</AOSProvider>
        <WhatsAppButton />
        <BrandonAI />
      </body>
    </html>
  );
}
