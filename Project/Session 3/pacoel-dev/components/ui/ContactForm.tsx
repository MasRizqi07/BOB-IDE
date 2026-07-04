"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */
type FormState = "idle" | "sending" | "success" | "error";

interface FieldError {
  name?: string;
  email?: string;
  message?: string;
}

/* ─────────────────────────────────────────────────────────
   Validation
───────────────────────────────────────────────────────── */
function validate(
  name: string,
  email: string,
  message: string
): FieldError {
  const errors: FieldError = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message.trim()) errors.message = "Message is required.";
  else if (message.trim().length < 20)
    errors.message = "Message must be at least 20 characters.";
  return errors;
}

/* ─────────────────────────────────────────────────────────
   Input field
───────────────────────────────────────────────────────── */
function Field({
  id,
  label,
  type = "text",
  placeholder,
  error,
  multiline,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const base = cn(
    "w-full px-4 py-3 rounded-xl text-sm text-[var(--text)]",
    "bg-[var(--surface-3)] border transition-all duration-200",
    "placeholder:text-[var(--text-dim)] focus:outline-none",
    error
      ? "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      : "border-[var(--border)] focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15"
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(base, "resize-none leading-relaxed")}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          autoComplete={type === "email" ? "email" : "off"}
        />
      )}

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-400 flex items-center gap-1 overflow-hidden"
          >
            <AlertCircle size={11} aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   ContactForm — exported for use in Contact section
───────────────────────────────────────────────────────── */
export default function ContactForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors]   = useState<FieldError>({});
  const [state, setState]     = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  /* Clear field-level error on change */
  const clearError = (field: keyof FieldError) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(name, email, message);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      /* Focus first errored field for a11y */
      const firstKey = Object.keys(fieldErrors)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setState("sending");

    /*
     * mailto: fallback — works with zero backend.
     * Replace with a fetch() to /api/contact or Resend / Formspree
     * when a real email service is wired up.
     */
    try {
      const mailtoHref = `mailto:hello@pacoel.dev?subject=${encodeURIComponent(
        `Portfolio inquiry from ${name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      )}`;

      /* Simulate a brief sending state so the UI feels responsive */
      await new Promise<void>((resolve) => setTimeout(resolve, 800));

      window.location.href = mailtoHref;
      setState("success");
      setName(""); setEmail(""); setMessage("");
    } catch {
      setState("error");
    }
  };

  return (
    <div
      className={cn(
        "p-8 rounded-2xl",
        "bg-[var(--surface-2)] border border-[var(--border)]",
        "hover:border-cyan-400/20 transition-colors duration-300"
      )}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-3 h-3 rounded-full bg-red-500/70"   aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/70" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-emerald-400/70" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-[var(--text-dim)]">
          ~/pacoel/contact.sh
        </span>
      </div>

      <AnimatePresence mode="wait">
        {state === "success" ? (
          /* ── Success state ── */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center gap-4 py-12"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30">
              <CheckCircle2 size={32} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-base font-semibold text-[var(--text)] mb-1">
                Your mail client should open shortly.
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                If it doesn't, email me directly at{" "}
                <a
                  href="mailto:hello@pacoel.dev"
                  className="text-cyan-400 hover:underline"
                >
                  hello@pacoel.dev
                </a>
              </p>
            </div>
            <button
              onClick={() => setState("idle")}
              className="mt-2 text-xs font-mono text-[var(--text-dim)] hover:text-cyan-400 transition-colors duration-200 underline underline-offset-4"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-5"
            aria-label="Contact form"
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                id="name"
                label="Your Name"
                placeholder="Ada Lovelace"
                error={errors.name}
                value={name}
                onChange={(v) => { setName(v); clearError("name"); }}
              />
              <Field
                id="email"
                label="Email Address"
                type="email"
                placeholder="ada@example.com"
                error={errors.email}
                value={email}
                onChange={(v) => { setEmail(v); clearError("email"); }}
              />
            </div>

            <Field
              id="message"
              label="Message"
              placeholder="Tell me about your project, idea, or just say hello…"
              multiline
              error={errors.message}
              value={message}
              onChange={(v) => { setMessage(v); clearError("message"); }}
            />

            {/* Global error */}
            <AnimatePresence>
              {state === "error" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  role="alert"
                  className="text-xs text-red-400 flex items-center gap-1.5"
                >
                  <AlertCircle size={12} />
                  Something went wrong. Please email me directly at hello@pacoel.dev
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={state === "sending"}
              className={cn(
                "group flex items-center justify-center gap-2.5",
                "w-full py-3.5 rounded-xl font-semibold text-sm",
                "bg-gradient-to-r from-cyan-400 to-blue-500 text-[var(--bg)]",
                "hover:shadow-glow hover:scale-[1.01]",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none",
                "transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              )}
            >
              {state === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  Opening mail client…
                </>
              ) : (
                <>
                  <Send
                    size={15}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    aria-hidden="true"
                  />
                  Send Message
                </>
              )}
            </button>

            <p className="text-[11px] text-[var(--text-dim)] text-center">
              Or reach me directly at{" "}
              <a
                href="mailto:hello@pacoel.dev"
                className="text-cyan-400/80 hover:text-cyan-400 transition-colors"
              >
                hello@pacoel.dev
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
