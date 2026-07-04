"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const NAV_COLS = [
  {
    heading: "Navigate",
    links: [
      { label: "Home",     href: "#home"     },
      { label: "About",    href: "#about"    },
      { label: "Stack",    href: "#stack"    },
      { label: "Projects", href: "#projects" },
      { label: "Contact",  href: "#contact"  },
    ],
  },
  {
    heading: "Projects",
    links: [
      { label: "VoxelCore",       href: "https://github.com/pacoel/voxelcore"       },
      { label: "Gortex",          href: "https://github.com/pacoel/gortex"          },
      { label: "DevBoard",        href: "https://github.com/pacoel/devboard"        },
      { label: "SnapLink",        href: "https://github.com/pacoel/snaplink"        },
      { label: "More on GitHub",  href: "https://github.com/pacoel"                 },
    ],
  },
];

const SOCIALS = [
  { icon: Github,   href: "https://github.com/pacoel",       label: "GitHub"   },
  { icon: Linkedin, href: "https://linkedin.com/in/pacoel",   label: "LinkedIn" },
  { icon: Mail,     href: "mailto:hello@pacoel.dev",          label: "Email"    },
];

/* ─────────────────────────────────────────────────────────
   Smooth-scroll utility — SSR-safe (guards typeof window)
───────────────────────────────────────────────────────── */
function scrollTo(href: string) {
  if (typeof window === "undefined") return;
  if (!href.startsWith("#")) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - 72,
    behavior: "smooth",
  });
}

/* ─────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="relative bg-[var(--surface)] border-t border-[var(--border)] overflow-hidden">
      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
      />

      {/* ── Main footer body ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              className="group flex items-center gap-2.5 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
              aria-label="Back to top"
            >
              <span
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-lg",
                  "bg-gradient-to-br from-cyan-400/20 to-blue-500/20",
                  "border border-cyan-400/30 text-cyan-400",
                  "font-mono font-bold text-sm",
                  "group-hover:shadow-[0_0_16px_rgba(6,182,212,0.3)] transition-all duration-300"
                )}
              >
                P
              </span>
              <span className="font-mono font-semibold text-[15px] text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors duration-200">
                pacoel<span className="text-cyan-400">.dev</span>
              </span>
            </button>

            {/* Tagline */}
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              Systems &amp; web engineer building performant,
              reliable software — from kernel-space to browser.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-lg",
                    "border border-[var(--border)] bg-[var(--surface-2)]",
                    "text-[var(--text-muted)] hover:text-cyan-400",
                    "hover:border-cyan-400/35 hover:bg-cyan-400/[0.07]",
                    "hover:shadow-[0_0_12px_rgba(6,182,212,0.18)]",
                    "transition-all duration-200"
                  )}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          {NAV_COLS.map((col, ci) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + ci * 0.08 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-widest">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollTo(href)}
                      className={cn(
                        "text-sm text-[var(--text-muted)] hover:text-cyan-400",
                        "transition-colors duration-200 text-left",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
                      )}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-dim)] font-mono text-center sm:text-left">
            © {new Date().getFullYear()} Pacoel.Dev — Built with{" "}
            <span className="text-cyan-400/70">Next.js</span>,{" "}
            <span className="text-cyan-400/70">TypeScript</span> &amp;{" "}
            <span className="text-cyan-400/70">Framer Motion</span>
          </p>

          {/* Tech pills */}
          <div className="hidden sm:flex items-center gap-2">
            {["Next.js 14", "Tailwind v3", "Framer Motion"].map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-dim)]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => scrollTo("#home")}
            aria-label="Back to top"
            className={cn(
              "flex items-center gap-1.5 text-xs font-mono text-[var(--text-dim)]",
              "hover:text-cyan-400 transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
            )}
          >
            <ArrowUp size={12} aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
