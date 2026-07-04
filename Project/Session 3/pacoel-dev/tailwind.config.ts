import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /* ── Fonts ───────────────────────────────────────── */
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },

      /* ── Brand colours ───────────────────────────────── */
      colors: {
        cyan: {
          400: "#06b6d4",
          500: "#0891b2",
        },
        blue: {
          500: "#3b82f6",
          600: "#2563eb",
        },
        bg: "#050a14",
        surface: "#0a1120",
        "surface-2": "#0f1a2e",
        "surface-3": "#162038",
      },

      /* ── Animations ──────────────────────────────────── */
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        orbit: {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        pulseDot: {
          "0%, 100%": { boxShadow: "0 0 0 3px rgba(34,197,94,0.22)" },
          "50%":       { boxShadow: "0 0 0 7px rgba(34,197,94,0.07)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease both",
        "fade-in":    "fadeIn 0.4s ease both",
        blink:        "blink 1s step-end infinite",
        orbit:        "orbit 10s linear infinite",
        float:        "float 4s ease-in-out infinite",
        "pulse-dot":  "pulseDot 2.2s ease-in-out infinite",
      },

      /* ── Durations ───────────────────────────────────── */
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
      },

      /* ── Shadows ─────────────────────────────────────── */
      boxShadow: {
        glow:    "0 0 24px rgba(6, 182, 212, 0.25)",
        "glow-lg": "0 0 48px rgba(6, 182, 212, 0.18)",
        card:    "0 4px 32px rgba(0, 0, 0, 0.35)",
      },

      /* ── Border radius ───────────────────────────────── */
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },

      /* ── Backdrop blur ───────────────────────────────── */
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
