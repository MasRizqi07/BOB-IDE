"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/ui/ContactForm";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────
   Contact info items
───────────────────────────────────────────────────────── */
interface InfoItem {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  highlight?: boolean;
}

const INFO_ITEMS: InfoItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@pacoel.dev",
    href: "mailto:hello@pacoel.dev",
    highlight: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/pacoel",
    href: "https://github.com/pacoel",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/pacoel",
    href: "https://linkedin.com/in/pacoel",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote — worldwide",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Usually within 24 h",
  },
  {
    icon: MessageSquare,
    label: "Open to",
    value: "Freelance · Full-time · Consulting",
  },
];

/* ─────────────────────────────────────────────────────────
   Info card
───────────────────────────────────────────────────────── */
function InfoCard({ item, index }: { item: InfoItem; index: number }) {
  const Icon = item.icon;
  const inner = (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl",
        "bg-[var(--surface-2)] border",
        item.highlight
          ? "border-cyan-400/30 bg-cyan-400/[0.04]"
          : "border-[var(--border)]",
        item.href && "hover:border-cyan-400/30 hover:bg-[var(--surface-3)]",
        "transition-all duration-200 group"
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg",
          item.highlight
            ? "bg-cyan-400/15 border border-cyan-400/25 text-cyan-400"
            : "bg-[var(--surface-3)] border border-[var(--border)] text-[var(--text-muted)]",
          item.href && "group-hover:text-cyan-400 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10",
          "transition-all duration-200"
        )}
      >
        <Icon size={16} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-0.5">
          {item.label}
        </p>
        <p
          className={cn(
            "text-sm font-medium truncate",
            item.highlight ? "text-cyan-400" : "text-[var(--text-muted)]",
            item.href && "group-hover:text-cyan-400"
          )}
        >
          {item.value}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {item.href ? (
        <a
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
          aria-label={`${item.label}: ${item.value}`}
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Contact Section
───────────────────────────────────────────────────────── */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-28 bg-[var(--bg)] overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-400/[0.04] blur-[100px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind, an interesting problem, or just want to say hello? My inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 items-start">

          {/* ── Left — info cards ── */}
          <div className="flex flex-col gap-3">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl mb-2",
                "bg-emerald-400/[0.06] border border-emerald-400/20"
              )}
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-dot flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-emerald-400">
                  Available for new projects
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Actively looking for freelance &amp; full-time roles
                </p>
              </div>
            </motion.div>

            {/* Info items */}
            {INFO_ITEMS.map((item, i) => (
              <InfoCard key={item.label} item={item} index={i} />
            ))}
          </div>

          {/* ── Right — form ── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
