/**
 * Projects data — single source of truth.
 * Swap in real URLs, descriptions, and tags as needed.
 */

export type ProjectCategory = "systems" | "web" | "tooling" | "oss";

export interface ProjectLink {
  github?: string;
  live?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Longer technical detail shown on expanded / hover */
  detail: string;
  stack: string[];
  category: ProjectCategory;
  links: ProjectLink;
  /** Gradient stop classes for the thumbnail */
  gradient: string;
  featured: boolean;
  year: number;
}

export const PROJECTS: Project[] = [
  /* ── Featured ──────────────────────────────────────────── */
  {
    id: "voxel-engine",
    title: "VoxelCore",
    description:
      "A chunk-based voxel rendering engine with greedy meshing, frustum culling, and multithreaded chunk generation.",
    detail:
      "Written in C++17 with OpenGL 4.6. Implements a AABB BVH for fast ray-casting, a custom allocator for chunk pools, and lock-free queues for the worker threads.",
    stack: ["C++17", "OpenGL", "GLSL", "CMake"],
    category: "systems",
    links: {
      github: "https://github.com/pacoel/voxelcore",
    },
    gradient: "from-[#00589C]/60 via-[#003d6b]/40 to-[#050a14]",
    featured: true,
    year: 2024,
  },
  {
    id: "gortex",
    title: "Gortex",
    description:
      "High-throughput HTTP reverse proxy and load balancer written in Go — handles 100k+ req/s on a single node.",
    detail:
      "Uses Go's net/http and custom connection pooling. Implements weighted round-robin, least-connections, and consistent-hash routing strategies with a hot-reload config via fsnotify.",
    stack: ["Golang", "gRPC", "Docker", "Prometheus"],
    category: "systems",
    links: {
      github: "https://github.com/pacoel/gortex",
      live: "https://gortex.pacoel.dev",
    },
    gradient: "from-[#00ADD8]/60 via-[#006680]/40 to-[#050a14]",
    featured: true,
    year: 2024,
  },
  {
    id: "devboard",
    title: "DevBoard",
    description:
      "Real-time developer productivity dashboard — tracks GitHub activity, PR health, and CI pipeline metrics in one view.",
    detail:
      "Next.js 14 App Router with Server-Sent Events for live updates. GitHub OAuth via NextAuth, PostgreSQL + Prisma for persistence, and Recharts for metrics visualisation.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Recharts"],
    category: "web",
    links: {
      github: "https://github.com/pacoel/devboard",
      live: "https://devboard.pacoel.dev",
    },
    gradient: "from-[#7c3aed]/55 via-[#3b1f7a]/40 to-[#050a14]",
    featured: true,
    year: 2024,
  },
  /* ── Other ─────────────────────────────────────────────── */
  {
    id: "pyflux",
    title: "PyFlux",
    description:
      "Python CLI toolkit for building declarative data-pipeline DAGs with first-class async support and built-in retry logic.",
    detail:
      "Inspired by Airflow but stripped to essentials. YAML-based pipeline definitions, pluggable executors (local, thread, process), and a rich terminal UI via Rich.",
    stack: ["Python", "Click", "asyncio", "Rich", "PyYAML"],
    category: "tooling",
    links: {
      github: "https://github.com/pacoel/pyflux",
    },
    gradient: "from-blue-600/55 via-blue-900/40 to-[#050a14]",
    featured: false,
    year: 2023,
  },
  {
    id: "snaplink",
    title: "SnapLink",
    description:
      "Open-source URL shortener with analytics, custom slugs, QR generation, and a self-hostable Docker image.",
    detail:
      "React + Vite frontend, Go backend with Chi router and Redis for hot-path lookups. Fully self-hostable — single `docker compose up` gets you running.",
    stack: ["React", "Golang", "Redis", "Docker", "Tailwind"],
    category: "oss",
    links: {
      github: "https://github.com/pacoel/snaplink",
      live: "https://snap.pacoel.dev",
    },
    gradient: "from-emerald-600/55 via-emerald-900/40 to-[#050a14]",
    featured: false,
    year: 2023,
  },
  {
    id: "cppcheck-action",
    title: "cppcheck-action",
    description:
      "GitHub Action that runs cppcheck static analysis on C/C++ repos and posts annotated PR review comments.",
    detail:
      "Thin TypeScript wrapper around the cppcheck CLI. Parses XML output, maps to GitHub Checks API annotations, and supports per-repo suppressions via `.cppcheck`.",
    stack: ["TypeScript", "GitHub Actions", "C++", "Docker"],
    category: "oss",
    links: {
      github: "https://github.com/pacoel/cppcheck-action",
    },
    gradient: "from-orange-600/55 via-orange-900/40 to-[#050a14]",
    featured: false,
    year: 2023,
  },
];

export const PROJECT_FILTERS = [
  { id: "all",     label: "All Projects" },
  { id: "systems", label: "Systems"      },
  { id: "web",     label: "Web"          },
  { id: "tooling", label: "Tooling"      },
  { id: "oss",     label: "Open Source"  },
] as const;

export type ProjectFilterId = typeof PROJECT_FILTERS[number]["id"];
