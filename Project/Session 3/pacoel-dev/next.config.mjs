/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ── Strict / experimental ──────────────────────────── */
  reactStrictMode: true,

  /* ── Image optimisation ─────────────────────────────── */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      /* Add external image hosts here when needed, e.g.:
       * { protocol: "https", hostname: "avatars.githubusercontent.com" }
       */
    ],
  },

  /* ── Security headers ───────────────────────────────── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff"         },
          { key: "X-Frame-Options",           value: "DENY"            },
          { key: "X-XSS-Protection",          value: "1; mode=block"   },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};
export default nextConfig;
