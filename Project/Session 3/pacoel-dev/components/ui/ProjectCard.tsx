"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

/* ─────────────────────────────────────────────────────────
   Stack tag pill
───────────────────────────────────────────────────────── */
function StackTag({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full",
        "text-[11px] font-mono font-medium",
        "bg-[var(--surface-3)] border border-[var(--border)]",
        "text-[var(--text-muted)]",
        "transition-colors duration-200 hover:text-cyan-400 hover:border-cyan-400/30"
      )}
    >
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   Category badge
───────────────────────────────────────────────────────── */
const CATEGORY_STYLES: Record<Project["category"], string> = {
  systems: "bg-[#00589C]/15 text-[#00ADD8] border-[#00ADD8]/25",
  web:     "bg-violet-500/15 text-violet-400 border-violet-500/25",
  tooling: "bg-blue-500/15   text-blue-400   border-blue-500/25",
  oss:     "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

const CATEGORY_LABELS: Record<Project["category"], string> = {
  systems: "Systems",
  web:     "Web App",
  tooling: "Tooling",
  oss:     "Open Source",
};

/* ─────────────────────────────────────────────────────────
   ProjectCard
───────────────────────────────────────────────────────── */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden",
        "bg-[var(--surface-2)] border border-[var(--border)]",
        "hover:border-cyan-400/25 transition-all duration-350",
        "hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      )}
    >
      {/* ── Gradient thumbnail ── */}
      <div
        className={cn(
          "relative h-40 bg-gradient-to-br flex items-end p-4 overflow-hidden",
          project.gradient
        )}
      >
        {/* Subtle noise texture overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Radial glow behind symbol */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(255,255,255,0.07),transparent)]"
        />

        {/* Year badge */}
        <span className="absolute top-3 right-3 font-mono text-[11px] text-white/50">
          {project.year}
        </span>

        {/* Featured star */}
        {project.featured && (
          <span
            className={cn(
              "absolute top-3 left-3 flex items-center gap-1",
              "px-2 py-0.5 rounded-full",
              "bg-amber-400/15 border border-amber-400/30 text-amber-400",
              "text-[10px] font-mono font-medium"
            )}
          >
            <Star size={9} fill="currentColor" />
            Featured
          </span>
        )}

        {/* Category badge — bottom-left */}
        <span
          className={cn(
            "relative z-10 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border",
            CATEGORY_STYLES[project.category]
          )}
        >
          {CATEGORY_LABELS[project.category]}
        </span>

        {/* Quick-action links — slide in on hover */}
        <div
          className={cn(
            "absolute bottom-3 right-3 flex gap-2",
            "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
            "transition-all duration-250"
          )}
        >
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg",
                "bg-black/50 backdrop-blur-sm border border-white/15",
                "text-white/80 hover:text-white hover:border-white/40",
                "transition-all duration-200"
              )}
            >
              <Github size={14} />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg",
                "bg-black/50 backdrop-blur-sm border border-white/15",
                "text-white/80 hover:text-white hover:border-white/40",
                "transition-all duration-200"
              )}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-[var(--text)] leading-tight group-hover:text-cyan-400 transition-colors duration-200">
            {project.title}
          </h3>
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={expanded ? "Show less" : "Show more"}
            className={cn(
              "flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full",
              "border border-[var(--border)] text-[var(--text-dim)]",
              "hover:border-cyan-400/40 hover:text-cyan-400",
              "transition-all duration-200",
              expanded && "rotate-45 border-cyan-400/40 text-cyan-400"
            )}
          >
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Expandable technical detail */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.p
              key="detail"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs text-[var(--text-muted)] leading-relaxed border-l-2 border-cyan-400/30 pl-3 overflow-hidden"
            >
              {project.detail}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.stack.map((tag) => (
            <StackTag key={tag} label={tag} />
          ))}
        </div>

        {/* Bottom links row */}
        <div className="flex items-center gap-4 pt-1 border-t border-[var(--border)]">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-1.5 text-xs font-mono text-[var(--text-dim)]",
                "hover:text-cyan-400 transition-colors duration-200"
              )}
            >
              <Github size={12} />
              Source
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-1.5 text-xs font-mono text-[var(--text-dim)]",
                "hover:text-cyan-400 transition-colors duration-200"
              )}
            >
              <ExternalLink size={12} />
              Live demo
            </a>
          )}
          {!project.links.github && !project.links.live && (
            <span className="text-xs font-mono text-[var(--text-dim)]">
              Private repo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
