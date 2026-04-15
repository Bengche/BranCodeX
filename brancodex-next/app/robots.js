/**
 * app/robots.js
 *
 * Next.js automatically generates /robots.txt from this file.
 * robots.txt tells search engine crawlers what they can/cannot access.
 * We want all pages to be crawled and indexed.
 */

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*", // applies to all crawlers (Googlebot, Bingbot, etc.)
        allow: "/", // allow everything
        disallow: ["/api/"], // prevent API routes from being indexed
      },
    ],
    sitemap: "https://brancodex.com/sitemap.xml",
  };
}
