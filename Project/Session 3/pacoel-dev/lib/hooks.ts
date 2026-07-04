"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the browser scroll progress (0–100).
 * Returns a float representing percentage scrolled.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight } = document.documentElement;
      const viewportH = window.innerHeight;
      const total = scrollHeight - viewportH;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return progress;
}

/**
 * Returns true once the user has scrolled past `threshold` pixels.
 */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}

/**
 * Returns the id of the currently visible section by observing
 * all <section id="..."> elements.
 */
export function useActiveSection(navIds: string[]): string {
  const [active, setActive] = useState(navIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-64px 0px -35% 0px" }
    );

    navIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navIds]);

  return active;
}
