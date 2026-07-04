"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

interface Mouse {
  x: number;
  y: number;
}

const COUNT = 80;
const CONNECT_DIST = 130;
const CYAN = "6,182,212";
const BLUE = "59,130,246";

function createParticle(w: number, h: number, initial: boolean): Particle {
  return {
    x: Math.random() * w,
    y: initial ? Math.random() * h : h + 10,
    vx: (Math.random() - 0.5) * 0.38,
    vy: -(Math.random() * 0.45 + 0.12),
    r: Math.random() * 1.8 + 0.8,
    alpha: Math.random() * 0.45 + 0.15,
  };
}

/**
 * Canvas-based particle field with mouse-attraction and line connections.
 * Extracted as a pure, reusable component — no side-effects outside canvas.
 */
export default function ParticleCanvas({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    const mouse: Mouse = { x: -999, y: -999 };
    let rafId: number;
    let destroyed = false;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: COUNT }, () =>
        createParticle(W, H, true)
      );
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.16;
            ctx.strokeStyle = `rgba(${BLUE},${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const updateParticle = (p: Particle) => {
      // Mouse soft attraction
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110 && dist > 0) {
        p.vx += (dx / dist) * 0.01;
        p.vy += (dy / dist) * 0.01;
      }

      // Clamp speed
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.1) {
        p.vx = (p.vx / speed) * 1.1;
        p.vy = (p.vy / speed) * 1.1;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -20 || p.x < -20 || p.x > W + 20) {
        Object.assign(p, createParticle(W, H, false));
      }
    };

    const loop = () => {
      if (destroyed) return;
      ctx.clearRect(0, 0, W, H);
      drawConnections();
      for (const p of particles) {
        updateParticle(p);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN},${p.alpha})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(loop);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };
    const onResize = () => {
      resize();
      particles = Array.from({ length: COUNT }, () =>
        createParticle(W, H, true)
      );
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize, { passive: true });

    init();
    loop();

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
