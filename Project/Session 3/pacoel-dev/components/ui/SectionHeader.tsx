"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Reusable animated section header.
 * Used in About, Stack, Projects, and Contact sections.
 */
export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-14",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {/* Label pill */}
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-widest uppercase mb-4 border border-cyan-400/25 bg-cyan-400/[0.07] text-cyan-400">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
        {label}
      </span>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)] mb-3 leading-[1.15]">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
