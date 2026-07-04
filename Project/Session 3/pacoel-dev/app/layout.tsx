import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

/* ─────────────────────────────────────────────────────────
   Fonts
───────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* ─────────────────────────────────────────────────────────
   Metadata — optimised for SEO & social sharing
───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://pacoel.dev"),
  title: {
    default: "Pacoel.Dev — Systems & Web Engineer",
    template: "%s | Pacoel.Dev",
  },
  description:
    "Systems and web engineer specialising in C++, Golang, Python, Next.js, and React. Building performant, reliable software from the ground up.",
  keywords: [
    "Pacoel",
    "developer",
    "portfolio",
    "C++",
    "Golang",
    "Python",
    "Next.js",
    "React",
    "software engineer",
    "systems engineer",
  ],
  authors: [{ name: "Pacoel", url: "https://pacoel.dev" }],
  creator: "Pacoel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pacoel.dev",
    title: "Pacoel.Dev — Systems & Web Engineer",
    description:
      "Systems and web engineer specialising in C++, Golang, Python, Next.js, and React.",
    siteName: "Pacoel.Dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacoel.Dev — Systems & Web Engineer",
    description:
      "Systems and web engineer specialising in C++, Golang, Python, Next.js, and React.",
    creator: "@pacoel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050a14",
  width: "device-width",
  initialScale: 1,
};

/* ─────────────────────────────────────────────────────────
   Root Layout
───────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-[var(--bg)] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
