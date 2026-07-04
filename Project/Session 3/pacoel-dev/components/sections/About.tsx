"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Layers,
  Users,
  GitBranch,
  BookOpen,
  Cpu,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import StatGrid from "@/components/ui/StatGrid";
import { STATS } from "@/lib/data/stats";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────
   Highlight item (bullet list inside bio card)
───────────────────────────────────────────────────────── */
interface HighlightItem {
  icon: React.ElementType;
  text: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  { icon: Cpu,       text: "Low-level systems in C++ & Golang" },
  { icon: Layers,    text: "Full-stack web with Next.js & React" },
  { icon: Code2,     text: "Python tooling, scripts & data pipelines" },
  { icon: GitBranch, text: "Open-source contributor & maintainer" },
  { icon: BookOpen,  text: "Technical writer & documentation advocate" },
  { icon: Users,     text: "Mentor to junior engineers in the community" },
];

/* ─────────────────────────────────────────────────────────
   Animation config
───────────────────────────────────────────────────────── */
const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  show:   {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  show:   {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────────────────────────────────────────────
   About Section
───────────────────────────────────────────────────────── */
export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 bg-[var(--surface)] overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="About Me"
          title="Who I Am"
          subtitle="A systems-minded engineer who writes software that runs fast, fails gracefully, and reads clearly."
        />

        {/* Bio + highlights grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* ── Left — narrative bio ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className={cn(
              "p-8 rounded-2xl",
              "bg-[var(--surface-2)] border border-[var(--border)]",
              "hover:border-cyan-400/20 transition-colors duration-300"
            )}
          >
            {/* Terminal-style header */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/70" aria-hidden="true" />
              <span className="ml-3 font-mono text-xs text-[var(--text-dim)]">
                ~/pacoel/about.md
              </span>
            </div>

            <div className="space-y-4 text-[var(--text-muted)] leading-relaxed text-[15px]">
              <p>
                I&apos;m a software engineer with{" "}
                <strong className="text-[var(--text)] font-semibold">
                  5+ years of experience
                </strong>{" "}
                building everything from real-time systems in C++ to full-stack
                web applications in Next.js — often for the same product.
              </p>
              <p>
                My engineering philosophy lives at the intersection of{" "}
                <strong className="text-cyan-400 font-medium">
                  performance rigour
                </strong>{" "}
                and{" "}
                <strong className="text-cyan-400 font-medium">
                  developer ergonomics
                </strong>
                . I believe the best software is fast to run,{" "}
                easy to change, and a pleasure to read.
              </p>
              <p>
                Outside of shipping code I contribute to open-source, write
                deep-dive technical posts, and mentor engineers who are
                moving from scripting into systems work.
              </p>
            </div>
          </motion.div>

          {/* ── Right — highlights list ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className={cn(
              "p-8 rounded-2xl",
              "bg-[var(--surface-2)] border border-[var(--border)]",
              "hover:border-cyan-400/20 transition-colors duration-300"
            )}
          >
            <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-6">
              // what I do
            </p>
            <ul className="space-y-4">
              {HIGHLIGHTS.map(({ icon: Icon, text }, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 text-[15px] text-[var(--text-muted)]"
                >
                  <span className={cn(
                    "flex-shrink-0 flex items-center justify-center",
                    "w-8 h-8 rounded-lg",
                    "bg-cyan-400/[0.08] border border-cyan-400/20",
                    "text-cyan-400"
                  )}>
                    <Icon size={15} />
                  </span>
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stat counters */}
        <StatGrid stats={STATS} />
      </div>
    </section>
  );
}
