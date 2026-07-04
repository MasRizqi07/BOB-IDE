"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Systems Engineer",
  "C++ Developer",
  "Golang Architect",
  "Python Craftsman",
  "Next.js Builder",
  "Problem Solver",
];

const SPEED_TYPE = 68;   // ms per character typed
const SPEED_DEL  = 34;   // ms per character deleted
const PAUSE_END  = 1800; // ms pause after full word
const PAUSE_START = 280; // ms pause before next word

/**
 * Self-contained typewriter component.
 * Cycles through ROLES with type → pause → delete → pause loop.
 */
export default function TypedRole() {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");
  const roleIndexRef = useRef(0);
  const charIndexRef = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = ROLES[roleIndexRef.current];

      if (phase === "typing") {
        charIndexRef.current += 1;
        setDisplayed(word.slice(0, charIndexRef.current));
        if (charIndexRef.current === word.length) {
          setPhase("pausing");
          timer = setTimeout(() => setPhase("deleting"), PAUSE_END);
        } else {
          timer = setTimeout(tick, SPEED_TYPE);
        }
        return;
      }

      if (phase === "deleting") {
        charIndexRef.current -= 1;
        setDisplayed(word.slice(0, charIndexRef.current));
        if (charIndexRef.current === 0) {
          roleIndexRef.current = (roleIndexRef.current + 1) % ROLES.length;
          setPhase("waiting");
          timer = setTimeout(() => setPhase("typing"), PAUSE_START);
        } else {
          timer = setTimeout(tick, SPEED_DEL);
        }
        return;
      }
    };

    if (phase === "typing" || phase === "deleting") {
      timer = setTimeout(tick, phase === "typing" ? SPEED_TYPE : SPEED_DEL);
    }

    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <span className="inline-flex items-baseline gap-0.5" aria-live="polite" aria-label={`Role: ${displayed}`}>
      <span className="text-cyan-400">{displayed}</span>
      {/* Blinking cursor */}
      <span
        aria-hidden="true"
        className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-0.5 align-middle animate-blink"
        style={{ verticalAlign: "baseline", marginBottom: "0.08em" }}
      />
    </span>
  );
}
