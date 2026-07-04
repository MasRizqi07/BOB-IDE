"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled, useScrollProgress, useActiveSection } from "@/lib/hooks";

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About",    href: "#about",    id: "about"    },
  { label: "Stack",    href: "#stack",    id: "stack"    },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact",  href: "#contact",  id: "contact"  },
];

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

/* ─────────────────────────────────────────────────────────
   Scroll Progress Bar
───────────────────────────────────────────────────────── */
function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 h-[2px] z-[9999] bg-gradient-to-r from-cyan-400 to-blue-500 transition-[width] duration-100 ease-linear"
      style={{ width: `${progress}%` }}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   Logo Mark
───────────────────────────────────────────────────────── */
function Logo() {
  return (
    <Link
      href="#home"
      className="group flex items-center gap-2.5 focus-visible:outline-none"
      aria-label="Pacoel.Dev — back to top"
    >
      {/* Monogram badge */}
      <span
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-lg",
          "bg-gradient-to-br from-cyan-400/20 to-blue-500/20",
          "border border-cyan-400/30 text-cyan-400",
          "font-mono font-bold text-sm tracking-wider",
          "transition-all duration-300",
          "group-hover:border-cyan-400/60 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.35)]"
        )}
      >
        P
      </span>
      {/* Word mark */}
      <span className="font-mono font-semibold text-[15px] tracking-tight text-[var(--text)] group-hover:text-cyan-400 transition-colors duration-300">
        pacoel<span className="text-cyan-400">.dev</span>
      </span>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────
   Desktop Nav Link
───────────────────────────────────────────────────────── */
function NavLink({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(item.id);
    if (!target) return;
    const navH = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <a
      href={item.href}
      onClick={handleClick}
      className={cn(
        "relative px-3 py-1.5 text-sm font-medium transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md",
        active
          ? "text-cyan-400"
          : "text-[var(--text-muted)] hover:text-[var(--text)]"
      )}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
      {/* Active underline */}
      {active && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-cyan-400 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────
   Mobile Menu
───────────────────────────────────────────────────────── */
function MobileMenu({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: string;
}) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    onClose();
    // Small delay so the menu closes before scroll fires
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }, 260);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.nav
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className={cn(
              "fixed top-0 right-0 z-50 h-full w-[min(320px,85vw)]",
              "bg-[var(--surface)] border-l border-[var(--border)]",
              "flex flex-col pt-24 pb-12 px-8 gap-2"
            )}
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.id}
                href={item.href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  "flex items-center gap-3 py-3.5 text-lg font-medium",
                  "border-b border-[var(--border)] transition-colors duration-200",
                  active === item.id
                    ? "text-cyan-400"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                )}
              >
                <span className="font-mono text-xs text-cyan-400/60 w-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </motion.a>
            ))}

            {/* CTA */}
            <motion.a
              href="mailto:hello@pacoel.dev"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_ITEMS.length * 0.07 + 0.1 }}
              className={cn(
                "mt-auto flex items-center justify-center gap-2",
                "px-5 py-3 rounded-xl font-medium text-sm",
                "bg-gradient-to-r from-cyan-400/20 to-blue-500/20",
                "border border-cyan-400/30 text-cyan-400",
                "hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
                "transition-all duration-300"
              )}
            >
              Say Hello
            </motion.a>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────
   Navbar — main export
───────────────────────────────────────────────────────── */
export default function Navbar() {
  const scrolled = useScrolled(40);
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <ScrollProgressBar />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-400 ease-in-out",
          scrolled
            ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_1px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.id} item={item} active={active === item.id} />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:hello@pacoel.dev"
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium font-mono",
                "border border-cyan-400/30 text-cyan-400",
                "bg-cyan-400/[0.06]",
                "hover:border-cyan-400/60 hover:bg-cyan-400/[0.12]",
                "hover:shadow-[0_0_18px_rgba(6,182,212,0.2)]",
                "transition-all duration-250",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              )}
            >
              ./contact
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "md:hidden flex items-center justify-center",
              "w-10 h-10 rounded-lg border border-[var(--border)]",
              "text-[var(--text-muted)] hover:text-[var(--text)]",
              "hover:border-cyan-400/30 transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            )}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        active={active}
      />
    </>
  );
}
