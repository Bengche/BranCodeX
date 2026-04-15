/**
 * app/sitemap.js
 *
 * Next.js automatically generates /sitemap.xml from this file.
 * A sitemap tells Google all the pages that exist on your site,
 * which makes it much easier for Google to find and rank them.
 */

import blogData from "../data/blogData";

const BASE = "https://brancodex.com";

const blogSlugs = blogData.map((p) => p.slug);

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
    { url: `${BASE}/contact`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/privacy-policy`, priority: 0.4, changeFrequency: "yearly" },
    { url: `${BASE}/terms`, priority: 0.4, changeFrequency: "yearly" },
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
