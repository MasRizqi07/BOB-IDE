import type { MetadataRoute } from "next";

/**
 * Generates /robots.txt at build time.
 * Allows all crawlers on production; block everything on preview deployments.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacoel.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
