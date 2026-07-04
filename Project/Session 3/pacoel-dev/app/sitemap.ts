import type { MetadataRoute } from "next";

/**
 * Generates /sitemap.xml at build time.
 * For a single-page portfolio there's only one URL.
 * Extend this if you add blog posts or project detail pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacoel.dev";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
