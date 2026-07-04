"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Terminal } from "lucide-react";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import TypedRole from "@/components/ui/TypedRole";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────
   Animation variants — all entries staggered from a parent
───────────────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const itemLeft = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.6,  ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────────────────────────────────────────────────
   Social links data
───────────────────────────────────────────────────────── */
const SOCIALS = [
  { icon: Github,   href: "https://github.com/pacoel",          label: "GitHub"   },
  { icon: Linkedin, href: "https://linkedin.com/in/pacoel",      label: "LinkedIn" },
  { icon: Mail,     href: "mailto:hello@pacoel.dev",             label: "Email"    },
];

/* ─────────────────────────────────────────────────────────
   Avatar Visual — orbiting rings + initials
───────────────────────────────────────────────────────── */
function AvatarVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80 select-none"
    >
      {/* Outer orbit ring */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-cyan-400/15 animate-orbit"
        style={{ animationDuration: "14s" }}
      >
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400/70 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
      </div>

      {/* Inner orbit ring */}
      <div
        aria-hidden="true"
        className="absolute inset-[14%] rounded-full border border-blue-500/15"
        style={{ animation: "orbit 9s linear infinite reverse" }}
      >
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-500/70 shadow-[0_0_8px_rgba(59,130,246,0.7)]" />
      </div>

      {/* Pulsing glow */}
      <div
        aria-hidden="true"
        className="absolute inset-[18%] rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-500/8 blur-xl"
      />

      {/* Avatar circle */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "relative z-10 flex items-center justify-center",
          "w-36 h-36 rounded-full",
          "bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface-3)]",
          "border-2 border-cyan-400/30",
          "shadow-[0_0_0_8px_rgba(6,182,212,0.06),0_0_40px_rgba(6,182,212,0.15)]"
        )}
      >
        <span className="font-mono font-bold text-4xl text-cyan-400 tracking-wider">
          P
        </span>
      </motion.div>

      {/* Float badge — top right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className={cn(
          "absolute top-6 -right-4 z-20",
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
          "bg-[var(--surface-2)] border border-cyan-400/20",
          "text-xs font-mono font-medium text-[var(--text-muted)]",
          "shadow-card"
        )}
        style={{ animation: "float 3.5s ease-in-out infinite" }}
      >
        <Terminal size={11} className="text-cyan-400" />
        <span>Open to work</span>
      </motion.div>

      {/* Float badge — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className={cn(
          "absolute -bottom-2 -left-6 z-20",
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
          "bg-[var(--surface-2)] border border-blue-500/20",
          "text-xs font-mono font-medium text-[var(--text-muted)]",
          "shadow-card"
        )}
        style={{ animation: "float 4.2s ease-in-out 0.6s infinite" }}
      >
        <span className="text-blue-400">⚡</span>
        <span>5+ yrs exp</span>
      </motion.div>

      {/* Available indicator */}
      <div className={cn(
        "absolute bottom-6 left-1/2 -translate-x-1/2 z-20",
        "flex items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-[var(--surface-2)] border border-emerald-500/25",
        "text-xs font-medium text-emerald-400"
      )}>
        <span
          className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot"
          aria-hidden="true"
        />
        Available
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Scroll hint
───────────────────────────────────────────────────────── */
function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-[var(--text-dim)] text-xs font-mono"
      aria-hidden="true"
    >
      <span>scroll</span>
      {/* Mouse icon */}
      <div className="w-5 h-8 rounded-full border border-current/40 flex items-start justify-center pt-1.5">
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-2 rounded-full bg-current"
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Hero — main export
───────────────────────────────────────────────────────── */
export default function Hero() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg)]"
    >
      {/* Particle canvas background */}
      <ParticleCanvas className="pointer-events-none" />

      {/* Radial gradient vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.08),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_50%,rgba(59,130,246,0.06),transparent)]"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-[var(--nav-h)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center min-h-[calc(100vh-var(--nav-h))] py-20 lg:py-0">

          {/* ── Left column — text ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Status pill */}
            <motion.div variants={item}>
              <span className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6",
                "border border-cyan-400/20 bg-cyan-400/[0.06]",
                "text-xs font-mono font-medium text-cyan-400 tracking-wider uppercase"
              )}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
                Systems &amp; Web Engineer
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={item}
              className="text-[var(--text-muted)] text-sm font-mono tracking-widest uppercase mb-2"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[var(--text)] leading-[1.05] mb-4"
            >
              Pacoel
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                .Dev
              </span>
            </motion.h1>

            {/* Typed role */}
            <motion.h2
              variants={item}
              className="text-xl sm:text-2xl font-mono font-medium text-[var(--text-muted)] mb-6 h-8"
            >
              <TypedRole />
            </motion.h2>

            {/* Tagline */}
            <motion.p
              variants={item}
              className={cn(
                "text-base sm:text-lg text-[var(--text-muted)] leading-relaxed",
                "max-w-md mb-10",
                "border-l-2 border-cyan-400/40 pl-4"
              )}
            >
              Building robust systems at the intersection of&nbsp;
              <strong className="text-[var(--text)] font-medium">low-level performance</strong>
              &nbsp;and&nbsp;
              <strong className="text-[var(--text)] font-medium">modern web craft</strong>
              —&nbsp;from kernel-space to browser.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-4 mb-10 justify-center lg:justify-start"
            >
              <button
                onClick={() => handleScroll("projects")}
                className={cn(
                  "group flex items-center gap-2 px-6 py-3 rounded-xl",
                  "bg-gradient-to-r from-cyan-400 to-blue-500",
                  "text-[var(--bg)] font-semibold text-sm",
                  "hover:shadow-glow hover:scale-[1.03]",
                  "transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                )}
              >
                View Projects
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>

              <button
                onClick={() => handleScroll("contact")}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl",
                  "border border-[var(--border-2)] text-[var(--text)] font-semibold text-sm",
                  "bg-cyan-400/[0.04]",
                  "hover:bg-cyan-400/[0.09] hover:border-cyan-400/50",
                  "transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                )}
              >
                Get in Touch
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={item}
              className="flex items-center gap-3"
            >
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg",
                    "border border-[var(--border)] bg-[var(--surface-2)]",
                    "text-[var(--text-muted)] hover:text-cyan-400",
                    "hover:border-cyan-400/40 hover:bg-cyan-400/[0.07]",
                    "hover:shadow-[0_0_14px_rgba(6,182,212,0.2)]",
                    "transition-all duration-250"
                  )}
                >
                  <Icon size={17} />
                </a>
              ))}

              {/* Separator */}
              <span className="w-px h-6 bg-[var(--border)] mx-1" aria-hidden="true" />

              {/* Resume link */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[var(--text-muted)] hover:text-cyan-400 transition-colors duration-200 underline underline-offset-4 decoration-dotted"
              >
                resume.pdf
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right column — avatar visual ── */}
          <div className="flex justify-center lg:justify-end">
            <AvatarVisual />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <ScrollHint />

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg)] to-transparent"
      />
    </section>
  );
}
