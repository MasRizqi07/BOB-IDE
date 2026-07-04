"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import TechGrid from "@/components/ui/TechGrid";
import { TECH_STACK } from "@/lib/data/techStack";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────
   Primary tech callouts — the 5 focal technologies
───────────────────────────────────────────────────────── */
const FEATURED = [
  {
    name: "C++",
    symbol: "C⁺⁺",
    color: "#00589C",
    bg: "from-[#00589C]/10 to-[#00589C]/5",
    border: "border-[#00589C]/25",
    desc: "Performance-critical systems, embedded, game engines",
  },
  {
    name: "Golang",
    symbol: "Go",
    color: "#00ADD8",
    bg: "from-[#00ADD8]/10 to-[#00ADD8]/5",
    border: "border-[#00ADD8]/25",
    desc: "Concurrent microservices & CLI tooling",
  },
  {
    name: "Python",
    symbol: "Py",
    color: "#3B82F6",
    bg: "from-blue-500/10 to-blue-500/5",
    border: "border-blue-500/25",
    desc: "Automation, data pipelines & scripting",
  },
  {
    name: "Next.js",
    symbol: "N▲",
    color: "#FFFFFF",
    bg: "from-white/8 to-white/4",
    border: "border-white/15",
    desc: "Full-stack React — App Router, RSC, Edge",
  },
  {
    name: "React",
    symbol: "⚛",
    color: "#61DAFB",
    bg: "from-[#61DAFB]/10 to-[#61DAFB]/5",
    border: "border-[#61DAFB]/25",
    desc: "Component architecture & performant UIs",
  },
] as const;

/* ─────────────────────────────────────────────────────────
   Featured tech card
───────────────────────────────────────────────────────── */
function FeaturedCard({
  item,
  index,
}: {
  item: (typeof FEATURED)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col items-center text-center gap-3 p-5 rounded-2xl",
        "bg-gradient-to-br border",
        item.bg,
        item.border,
        "group hover:scale-[1.04] hover:shadow-card transition-all duration-300"
      )}
    >
      {/* Rank */}
      <span className="absolute top-2.5 right-3 font-mono text-[10px] text-[var(--text-dim)]">
        0{index + 1}
      </span>

      {/* Symbol */}
      <span
        className="text-3xl font-bold font-mono leading-none"
        style={{ color: item.color }}
        aria-hidden="true"
      >
        {item.symbol}
      </span>

      {/* Name */}
      <span className="text-sm font-bold text-[var(--text)]">{item.name}</span>

      {/* Desc */}
      <span className="text-[11px] text-[var(--text-muted)] leading-snug">
        {item.desc}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   TechStack Section
───────────────────────────────────────────────────────── */
export default function TechStack() {
  return (
    <section
      id="stack"
      className="relative py-28 bg-[var(--bg)] overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-400/[0.04] blur-[80px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Tech Stack"
          title="My Toolkit"
          subtitle="Technologies I reach for daily — from the kernel to the browser."
        />

        {/* Featured 5 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16">
          {FEATURED.map((item, i) => (
            <FeaturedCard key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="font-mono text-xs text-[var(--text-dim)] whitespace-nowrap">
            full stack
          </span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Filterable full grid */}
        <TechGrid items={TECH_STACK} />
      </div>
    </section>
  );
}
