"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/lib/data/stats";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animates a number from 0 → `target` over `duration` ms
 * using easeOutCubic, triggered once when the element enters the viewport.
 */
function AnimatedNumber({
  target,
  suffix,
  duration = 1600,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;

    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOutCubic(progress) * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      <span className="text-cyan-400">{suffix}</span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   StatCard
───────────────────────────────────────────────────────── */
function StatCard({
  stat,
  index,
}: {
  stat: StatItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col items-center text-center p-6 rounded-2xl",
        "bg-[var(--surface-2)] border border-[var(--border)]",
        "group hover:border-cyan-400/30 hover:bg-[var(--surface-3)]",
        "transition-all duration-300"
      )}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/[0.04] group-hover:to-blue-500/[0.04] transition-all duration-300"
      />

      <p className="text-4xl font-bold text-[var(--text)] mb-1 font-mono">
        <AnimatedNumber target={stat.value} suffix={stat.suffix} />
      </p>
      <p className="text-sm font-semibold text-[var(--text)] mb-0.5">
        {stat.label}
      </p>
      <p className="text-xs text-[var(--text-muted)]">{stat.description}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   StatGrid — exported for use in About
───────────────────────────────────────────────────────── */
export default function StatGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  );
}
