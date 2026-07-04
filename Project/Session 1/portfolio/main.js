/* ═══════════════════════════════════════════════════════════
   main.js — Nikki Satmaka Portfolio v2
   Vanilla JS · No dependencies
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────
   1. CUSTOM CURSOR
───────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let rafId;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateCursor() {
    // Dot follows instantly
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';

    // Ring lags slightly for smooth trail
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    rafId = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, .card, .tech-badge, .filter-btn, .social-link';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) ring.classList.add('hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) ring.classList.remove('hovering');
  });
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '0.6';
  });
})();

/* ─────────────────────────────────────
   2. SCROLL PROGRESS BAR
───────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop    = document.documentElement.scrollTop;
    const totalHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct          = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
    bar.style.width    = pct + '%';
  }, { passive: true });
})();

/* ─────────────────────────────────────
   3. NAVBAR — scroll state + active section
───────────────────────────────────── */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('section[id]')];
  if (!navbar) return;

  // Scrolled style
  const onScroll = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Active section highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ─────────────────────────────────────
   4. HAMBURGER MOBILE MENU
───────────────────────────────────── */
(function initHamburger() {
  const btn     = document.getElementById('hamburger');
  const menu    = document.getElementById('navMenu');
  const links   = document.querySelectorAll('.nav-link');
  if (!btn || !menu) return;

  const toggle = open => {
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  btn.addEventListener('click', () => toggle(!menu.classList.contains('open')));
  links.forEach(a => a.addEventListener('click', () => toggle(false)));
  // Close on outside click
  menu.addEventListener('click', e => { if (e.target === menu) toggle(false); });
})();

/* ─────────────────────────────────────
   5. TYPED TEXT EFFECT
───────────────────────────────────── */
(function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const words  = [
    'Full-Stack Developer',
    'UI / UX Engineer',
    'Open Source Builder',
    'Problem Solver',
    'React Specialist'
  ];
  let wi = 0, ci = 0, deleting = false, pause = false;
  const SPEED_TYPE = 72, SPEED_DEL = 38, PAUSE_END = 1600, PAUSE_START = 300;

  function tick() {
    const word = words[wi];
    if (pause) return;

    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        pause = true;
        setTimeout(() => { deleting = true; pause = false; tick(); }, PAUSE_END);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        pause = true;
        setTimeout(() => { pause = false; tick(); }, PAUSE_START);
        return;
      }
    }
    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }
  setTimeout(tick, 800);
})();

/* ─────────────────────────────────────
   6. HERO CANVAS PARTICLE FIELD
───────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: -999, y: -999 };
  const COUNT = 90;
  const CONNECT_DIST = 140;

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : H + 10;
      this.vx = (Math.random() - .5) * .4;
      this.vy = -(Math.random() * .5 + .15);
      this.r  = Math.random() * 2 + 1;
      this.alpha = Math.random() * .5 + .2;
    }
    update() {
      // Mouse attraction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        this.vx += dx / dist * .012;
        this.vy += dy / dist * .012;
      }
      // Speed cap
      const speed = Math.sqrt(this.vx**2 + this.vy**2);
      if (speed > 1.2) { this.vx /= speed * .85; this.vy /= speed * .85; }

      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -20 || this.x < -20 || this.x > W + 20) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6,182,212,${this.alpha})`;
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < CONNECT_DIST) {
          const alpha = (1 - d / CONNECT_DIST) * .18;
          ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
          ctx.lineWidth   = .8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  init();
  loop();
})();

/* ─────────────────────────────────────
   7. SCROLL REVEAL
───────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────
   8. COUNTER ANIMATION
───────────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-number[data-target]');
  if (!nums.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1600;
      const start  = performance.now();

      function count(now) {
        const progress = Math.min((now - start) / dur, 1);
        const ease     = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(count);
        else el.textContent = target;
      }
      requestAnimationFrame(count);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => obs.observe(n));
})();

/* ─────────────────────────────────────
   9. SKILL BAR ANIMATION
───────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill[data-width]');
  if (!fills.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const fill = e.target;
      // Small delay so the reveal animation happens first
      setTimeout(() => {
        fill.style.width = fill.dataset.width + '%';
      }, 200);
      obs.unobserve(fill);
    });
  }, { threshold: 0.4 });

  fills.forEach(f => obs.observe(f));
})();

/* ─────────────────────────────────────
   10. PROJECT FILTER
───────────────────────────────────── */
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        // Re-trigger grid layout update
        card.style.display = match ? '' : 'none';
      });
    });
  });
})();

/* ─────────────────────────────────────
   11. CONTACT FORM (demo)
───────────────────────────────────── */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Simple validation
    form.querySelectorAll('[required]').forEach(input => {
      input.classList.remove('error');
      if (!input.value.trim()) { input.classList.add('error'); valid = false; }
      if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.classList.add('error');
        valid = false;
      }
    });

    if (!valid) return;

    const btn = form.querySelector('.form-submit');
    btn.classList.add('sending');
    btn.disabled = true;

    // Simulate network delay
    setTimeout(() => {
      btn.classList.remove('sending');
      btn.disabled = false;
      form.reset();
      success.classList.add('visible');
      setTimeout(() => success.classList.remove('visible'), 4000);
    }, 1500);
  });

  // Live error clear on input
  form.querySelectorAll('input, textarea').forEach(inp => {
    inp.addEventListener('input', () => inp.classList.remove('error'));
  });
})();

/* ─────────────────────────────────────
   12. THEME TOGGLE (light ↔ dark)
───────────────────────────────────── */
(function initTheme() {
  const btn   = document.getElementById('themeToggle');
  const icon  = btn?.querySelector('.theme-icon');
  const html  = document.documentElement;
  if (!btn) return;

  const saved = localStorage.getItem('ns-theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('ns-theme', next);
  });

  function applyTheme(t) {
    html.dataset.theme = t;
    if (icon) icon.textContent = t === 'dark' ? '☀' : '☾';
  }
})();

/* ─────────────────────────────────────
   13. SMOOTH ANCHOR SCROLL
───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const NAV_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
    const top   = target.getBoundingClientRect().top + window.scrollY - NAV_H;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─────────────────────────────────────
   14. SKILL CARD — 3D TILT EFFECT
───────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = dy * -6;
      const rotY   = dx *  6;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
