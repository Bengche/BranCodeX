/**
 * app/sitemap.js
 *
 * Next.js automatically generates /sitemap.xml from this file.
 * A sitemap tells Google all the pages that exist on your site,
 * which makes it much easier for Google to find and rank them.
 */

export default function sitemap() {
  return [
    {
      url: 'https://brancodex.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,  // Most important page
    },
    {
      url: 'https://brancodex.com/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://brancodex.com/playground',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
