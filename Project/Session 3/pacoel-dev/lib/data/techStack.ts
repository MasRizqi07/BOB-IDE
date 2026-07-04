/**
 * Tech stack data — single source of truth.
 * Each entry maps to a TechBadge card in the Stack section.
 */

export type SkillLevel = "expert" | "advanced" | "proficient";

export interface TechItem {
  name: string;
  category: "systems" | "backend" | "frontend" | "tooling";
  level: SkillLevel;
  /** Short descriptor shown on hover */
  description: string;
  /** Accent colour (Tailwind-compatible hex or rgba) */
  color: string;
  /** Unicode / text symbol used as icon fallback */
  symbol: string;
}

export const TECH_STACK: TechItem[] = [
  /* ── Systems ──────────────────────────────────────────── */
  {
    name: "C++",
    category: "systems",
    level: "expert",
    description: "High-performance systems, game engines, embedded",
    color: "#00589C",
    symbol: "C⁺⁺",
  },
  {
    name: "Golang",
    category: "systems",
    level: "expert",
    description: "Concurrent services, CLIs, microservices",
    color: "#00ADD8",
    symbol: "Go",
  },
  /* ── Backend ───────────────────────────────────────────── */
  {
    name: "Python",
    category: "backend",
    level: "expert",
    description: "Scripting, data pipelines, FastAPI, automation",
    color: "#3B82F6",
    symbol: "Py",
  },
  {
    name: "Node.js",
    category: "backend",
    level: "advanced",
    description: "REST & GraphQL APIs, real-time with Socket.IO",
    color: "#84CC16",
    symbol: "JS",
  },
  {
    name: "PostgreSQL",
    category: "backend",
    level: "advanced",
    description: "Relational modelling, query optimisation, pgvector",
    color: "#336791",
    symbol: "PG",
  },
  /* ── Frontend ──────────────────────────────────────────── */
  {
    name: "Next.js",
    category: "frontend",
    level: "expert",
    description: "App Router, RSC, ISR, Edge runtime",
    color: "#FFFFFF",
    symbol: "N▲",
  },
  {
    name: "React",
    category: "frontend",
    level: "expert",
    description: "Hooks, context, concurrent features, performance",
    color: "#61DAFB",
    symbol: "⚛",
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: "expert",
    description: "Strict mode, generics, type-safe architecture",
    color: "#3178C6",
    symbol: "TS",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: "advanced",
    description: "Utility-first, design systems, responsive layouts",
    color: "#06B6D4",
    symbol: "TW",
  },
  /* ── Tooling ───────────────────────────────────────────── */
  {
    name: "Docker",
    category: "tooling",
    level: "advanced",
    description: "Containerisation, compose, multi-stage builds",
    color: "#2496ED",
    symbol: "🐳",
  },
  {
    name: "Git",
    category: "tooling",
    level: "expert",
    description: "Branching strategies, CI/CD, GitHub Actions",
    color: "#F05032",
    symbol: "⎇",
  },
  {
    name: "Linux",
    category: "tooling",
    level: "advanced",
    description: "Shell scripting, system administration, kernel basics",
    color: "#FCC624",
    symbol: "🐧",
  },
];

export const TECH_CATEGORIES = [
  { id: "all",      label: "All"      },
  { id: "systems",  label: "Systems"  },
  { id: "backend",  label: "Backend"  },
  { id: "frontend", label: "Frontend" },
  { id: "tooling",  label: "Tooling"  },
] as const;

export type TechCategoryId = typeof TECH_CATEGORIES[number]["id"];
