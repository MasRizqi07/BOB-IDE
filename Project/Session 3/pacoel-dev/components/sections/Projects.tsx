"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS, PROJECT_FILTERS } from "@/lib/data/projects";
import type { ProjectFilterId } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────
   Filter pill button
───────────────────────────────────────────────────────── */
function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
        active
          ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-[var(--bg)] shadow-glow"
          : [
              "bg-[var(--surface-2)] border border-[var(--border)]",
              "text-[var(--text-muted)] hover:text-[var(--text)]",
              "hover:border-[var(--border-2)]",
            ]
      )}
    >
      {label}
      <span
        className={cn(
          "text-[11px] font-mono px-1.5 py-0.5 rounded-full",
          active
            ? "bg-black/20 text-white/80"
            : "bg-[var(--surface-3)] text-[var(--text-dim)]"
        )}
      >
        {count}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   Projects Section
───────────────────────────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>("all");

  /* Derive counts and filtered list from data */
  const filterCounts = useMemo<Record<string, number>>(() => {
    const counts: Record<string, number> = { all: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  /* Featured projects always shown at the top */
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative py-28 bg-[var(--surface)] overflow-hidden"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-500/[0.03] blur-[100px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-20 left-0 w-[400px] h-[300px] bg-cyan-400/[0.03] blur-[80px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Projects"
          title="Featured Work"
          subtitle="A selection of things I've built — from low-level engines to production web apps."
        />

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap gap-2.5 justify-center mb-12"
          role="group"
          aria-label="Filter projects by category"
        >
          {PROJECT_FILTERS.map((f) => (
            <FilterPill
              key={f.id}
              label={f.label}
              count={filterCounts[f.id] ?? 0}
              active={activeFilter === f.id}
              onClick={() => setActiveFilter(f.id)}
            />
          ))}
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} className="space-y-10">

            {/* Featured row — 3-column on desktop */}
            {featured.length > 0 && (
              <div>
                {activeFilter === "all" && (
                  <p className="font-mono text-xs text-cyan-400/70 uppercase tracking-widest mb-5">
                    // featured
                  </p>
                )}
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {featured.map((project, i) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}

            {/* Rest — 3-column grid */}
            {rest.length > 0 && (
              <div>
                {activeFilter === "all" && (
                  <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-5">
                    // other projects
                  </p>
                )}
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {rest.map((project, i) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={featured.length + i}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 py-20 text-[var(--text-muted)]"
              >
                <span className="font-mono text-4xl">¯\_(ツ)_/¯</span>
                <p className="text-sm">No projects in that category yet.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-16"
        >
          <a
            href="https://github.com/pacoel"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex items-center gap-2.5 px-7 py-3.5 rounded-xl",
              "border border-[var(--border-2)] text-[var(--text-muted)]",
              "bg-cyan-400/[0.04] font-mono text-sm font-medium",
              "hover:bg-cyan-400/[0.09] hover:text-[var(--text)] hover:border-cyan-400/50",
              "hover:shadow-glow transition-all duration-250",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            )}
          >
            More on GitHub
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
