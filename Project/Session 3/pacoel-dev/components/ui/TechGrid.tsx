"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TechItem, TechCategoryId } from "@/lib/data/techStack";
import { TECH_CATEGORIES } from "@/lib/data/techStack";

/* ─────────────────────────────────────────────────────────
   Level badge
───────────────────────────────────────────────────────── */
const LEVEL_STYLES: Record<TechItem["level"], string> = {
  expert:     "bg-cyan-400/15   text-cyan-400   border-cyan-400/25",
  advanced:   "bg-blue-500/15   text-blue-400   border-blue-500/25",
  proficient: "bg-violet-500/15 text-violet-400 border-violet-500/25",
};

/* ─────────────────────────────────────────────────────────
   Single TechCard
───────────────────────────────────────────────────────── */
function TechCard({ item, index }: { item: TechItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.32, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-2",
        "p-5 rounded-2xl cursor-default select-none",
        "bg-[var(--surface-2)] border border-[var(--border)]",
        "transition-all duration-300 group",
        hovered
          ? "border-[var(--border-2)] shadow-[0_0_24px_rgba(6,182,212,0.15)] bg-[var(--surface-3)]"
          : ""
      )}
    >
      {/* Radial glow on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${item.color}12 0%, transparent 70%)`,
        }}
      />

      {/* Symbol */}
      <span
        className="text-2xl font-bold font-mono leading-none transition-transform duration-300 group-hover:scale-110"
        style={{ color: item.color }}
        aria-hidden="true"
      >
        {item.symbol}
      </span>

      {/* Name */}
      <span className="text-sm font-semibold text-[var(--text)] text-center leading-tight">
        {item.name}
      </span>

      {/* Level badge */}
      <span
        className={cn(
          "text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border capitalize",
          LEVEL_STYLES[item.level]
        )}
      >
        {item.level}
      </span>

      {/* Description tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "absolute -bottom-10 left-1/2 -translate-x-1/2 z-20",
              "whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px]",
              "bg-[var(--surface-3)] border border-[var(--border-2)]",
              "text-[var(--text-muted)] pointer-events-none shadow-card"
            )}
          >
            {item.description}
            {/* Arrow */}
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[var(--surface-3)] border-l border-t border-[var(--border-2)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Filter Tab
───────────────────────────────────────────────────────── */
function FilterTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
        active
          ? "text-[var(--bg)] bg-gradient-to-r from-cyan-400 to-blue-500 shadow-glow"
          : "text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--border-2)]"
      )}
    >
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   TechGrid — exported for use in TechStack section
───────────────────────────────────────────────────────── */
export default function TechGrid({ items }: { items: TechItem[] }) {
  const [activeCategory, setActiveCategory] = useState<TechCategoryId>("all");

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex flex-wrap gap-2 justify-center"
        role="tablist"
        aria-label="Filter by category"
      >
        {TECH_CATEGORIES.map((cat) => (
          <FilterTab
            key={cat.id}
            label={cat.label}
            active={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
          />
        ))}
      </motion.div>

      {/* Cards grid */}
      <motion.div
        layout
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 pb-10"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <TechCard key={item.name} item={item} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
