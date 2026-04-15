/**
 * app/sitemap.js
 *
 * Next.js automatically generates /sitemap.xml from this file.
 * A sitemap tells Google all the pages that exist on your site,
 * which makes it much easier for Google to find and rank them.
 */

const BASE = "https://brancodex.com";

const blogSlugs = [
  "why-your-business-in-cameroon-needs-a-website",
  "how-much-does-a-website-cost-in-cameroon",
  "how-to-rank-your-business-on-google-in-cameroon",
  "nextjs-vs-wordpress-which-is-better-for-cameroon-businesses",
  "web-development-services-cameroon",
  "ecommerce-cameroon",
  "web-development-douala",
  "web-development-yaounde",
  "ecommerce-douala-littoral",
  "ecommerce-yaounde-centre",
  "ecommerce-bamenda-northwest",
  "ecommerce-bafoussam-west",
  "ecommerce-buea-southwest",
  "ecommerce-garoua-north",
  "ecommerce-maroua-far-north",
  "ecommerce-ngaoundere-adamawa",
  "ecommerce-bertoua-east",
  "ecommerce-ebolowa-south",
];

const regionSlugs = [
  "cameroon",
  "douala",
  "yaounde",
  "bamenda",
  "bafoussam",
  "buea",
  "garoua",
  "maroua",
  "ngaoundere",
  "bertoua",
  "ebolowa",
];

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/faq`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/playground`, priority: 0.7, changeFrequency: "monthly" },
    {
      url: `${BASE}/hire-web-developer-cameroon`,
      priority: 0.9,
      changeFrequency: "monthly",
    },
    { url: `${BASE}/guide`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/blog`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/our-process`, priority: 0.7, changeFrequency: "monthly" },
  ].map((p) => ({ ...p, lastModified: now }));

  const blogPages = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const regionPages = regionSlugs.map((slug) => ({
    url: `${BASE}/web-developer-${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: slug === "cameroon" ? 0.95 : 0.85,
  }));

  return [...staticPages, ...blogPages, ...regionPages];
}
