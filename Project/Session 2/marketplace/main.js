/* ═══════════════════════════════════════════════════════════
   main.js — Nexora Marketplace Landing Page
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

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  const targets = 'a, button, .feature-card, .cat-card, .seller-card, .price-card, .testi-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(targets)) ring.classList.add('hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(targets)) ring.classList.remove('hovering');
  });
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0'; ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1'; ring.style.opacity = '0.55';
  });
})();

/* ─────────────────────────────────────
   2. SCROLL PROGRESS BAR
───────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop   = document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = totalHeight > 0 ? (scrollTop / totalHeight * 100) + '%' : '0%';
  }, { passive: true });
})();

/* ─────────────────────────────────────
   3. NAVBAR
───────────────────────────────────── */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('section[id]')];
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === current));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─────────────────────────────────────
   4. HAMBURGER MENU
───────────────────────────────────── */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('navMenu');
  const links = document.querySelectorAll('.nav-link');
  if (!btn || !menu) return;

  const toggle = open => {
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  btn.addEventListener('click', () => toggle(!menu.classList.contains('open')));
  links.forEach(a => a.addEventListener('click', () => toggle(false)));
})();

/* ─────────────────────────────────────
   5. HERO CANVAS PARTICLE FIELD
───────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -999, y: -999 };
  const COUNT = 75;
  const LINK  = 130;

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - .5) * .35;
      this.vy = -(Math.random() * .5 + .1);
      this.r  = Math.random() * 1.8 + .8;
      this.a  = Math.random() * .45 + .15;
      // Random color choice: violet or cyan
      this.col = Math.random() > .5 ? '167,139,250' : '6,182,212';
    }
    update() {
      const dx = mouse.x - this.x, dy = mouse.y - this.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 110) { this.vx += dx / d * .01; this.vy += dy / d * .01; }
      const sp = Math.sqrt(this.vx ** 2 + this.vy ** 2);
      if (sp > 1.1) { this.vx /= sp * .88; this.vy /= sp * .88; }
      this.x += this.vx; this.y += this.vy;
      if (this.y < -20 || this.x < -20 || this.x > W + 20) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.col},${this.a})`;
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

  function drawLinks() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          const a = (1 - d / LINK) * .15;
          ctx.strokeStyle = `rgba(124,58,237,${a})`;
          ctx.lineWidth = .7;
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
    drawLinks();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });
  window.addEventListener('resize', init);

  init(); loop();
})();

/* ─────────────────────────────────────
   6. SCROLL REVEAL
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
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────
   7. COUNTER ANIMATION
───────────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const dur    = 1800;
      const start  = performance.now();

      function count(now) {
        const p    = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target) + (p >= 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(count);
      }
      requestAnimationFrame(count);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => obs.observe(n));
})();

/* ─────────────────────────────────────
   8. LIVE ORDERS COUNTER (Hero metric)
───────────────────────────────────── */
(function initLiveOrders() {
  const el = document.getElementById('ordersMetric');
  if (!el) return;

  let count = 1247;
  el.textContent = count.toLocaleString();

  // Animate a "live" incrementing counter
  setInterval(() => {
    count += Math.floor(Math.random() * 3) + 1;
    el.textContent = count.toLocaleString();
    // Brief flash animation
    el.style.color = '#34d399';
    setTimeout(() => { el.style.color = ''; }, 600);
  }, 3800);
})();

/* ─────────────────────────────────────
   9. PRICING TOGGLE
───────────────────────────────────── */
(function initPricingToggle() {
  const btn      = document.getElementById('pricingToggle');
  const monthly  = document.getElementById('togMonthly');
  const annual   = document.getElementById('togAnnual');
  const amounts  = document.querySelectorAll('.pc-amount');
  if (!btn) return;

  let isAnnual = false;

  btn.addEventListener('click', () => {
    isAnnual = !isAnnual;
    btn.setAttribute('aria-checked', isAnnual ? 'true' : 'false');
    monthly.classList.toggle('active', !isAnnual);
    annual.classList.toggle('active', isAnnual);

    amounts.forEach(el => {
      const val = isAnnual ? el.dataset.annual : el.dataset.monthly;
      // Animate out → update → animate in
      el.style.transform = 'translateY(-8px)';
      el.style.opacity   = '0';
      setTimeout(() => {
        el.textContent     = val;
        el.style.transform = 'translateY(8px)';
        requestAnimationFrame(() => {
          el.style.transition = 'all .3s ease';
          el.style.transform  = 'translateY(0)';
          el.style.opacity    = '1';
          setTimeout(() => { el.style.transition = ''; }, 320);
        });
      }, 160);
    });
  });

  monthly.classList.add('active');
})();

/* ─────────────────────────────────────
   10. TESTIMONIALS CAROUSEL
───────────────────────────────────── */
(function initCarousel() {
  const track    = document.getElementById('testiTrack');
  const dotsEl   = document.getElementById('carrDots');
  const prevBtn  = document.getElementById('carrPrev');
  const nextBtn  = document.getElementById('carrNext');
  if (!track) return;

  const cards   = track.querySelectorAll('.testi-card');
  const total   = cards.length;
  let current   = 0;
  let autoTimer;

  // Build dots
  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'carr-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function getPerPage() {
    if (window.innerWidth < 640)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function goTo(idx) {
    const perPage  = getPerPage();
    const maxIndex = Math.max(total - perPage, 0);
    current = Math.max(0, Math.min(idx, maxIndex));

    // Each card: calc(33.333% - 16px) wide + gap 24px
    const cardW  = track.offsetWidth / perPage;
    track.style.transform = `translateX(-${current * cardW}px)`;

    document.querySelectorAll('.carr-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  window.addEventListener('resize',  () => goTo(current));

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      const perPage  = getPerPage();
      const maxIndex = Math.max(total - perPage, 0);
      goTo(current < maxIndex ? current + 1 : 0);
    }, 5000);
  }

  // Touch / swipe support
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) { dx < 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
  });

  resetAuto();
})();

/* ─────────────────────────────────────
   11. CONTACT FORM
───────────────────────────────────── */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(inp => {
      inp.classList.remove('error');
      const empty = !inp.value.trim();
      const badMail = inp.type === 'email' && inp.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value);
      if (empty || badMail) { inp.classList.add('error'); valid = false; }
    });

    if (!valid) return;

    const btn = form.querySelector('.form-submit');
    btn.classList.add('sending');
    btn.disabled = true;

    setTimeout(() => {
      btn.classList.remove('sending');
      btn.disabled = false;
      form.reset();
      success.classList.add('visible');
      setTimeout(() => success.classList.remove('visible'), 4500);
    }, 1400);
  });

  form.querySelectorAll('input, textarea').forEach(inp => {
    inp.addEventListener('input', () => inp.classList.remove('error'));
  });
})();

/* ─────────────────────────────────────
   12. THEME TOGGLE
───────────────────────────────────── */
(function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const icon = btn?.querySelector('.theme-icon');
  const html = document.documentElement;
  if (!btn) return;

  const saved = localStorage.getItem('nexora-theme') || 'dark';
  apply(saved);

  btn.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem('nexora-theme', next);
  });

  function apply(t) {
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
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
  });
});

/* ─────────────────────────────────────
   14. 3D TILT EFFECT
───────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.feature-card, .seller-card, .price-card, .how-step').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
      const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ─────────────────────────────────────
   15. FEATURE CARD GLOW FOLLOW
───────────────────────────────────── */
(function initCardGlow() {
  document.querySelectorAll('.feature-card').forEach((card, i) => {
    const glowColors = [
      'rgba(167,139,250,.12)', 'rgba(6,182,212,.12)', 'rgba(245,158,11,.12)',
      'rgba(52,211,153,.12)',  'rgba(244,114,182,.12)','rgba(96,165,250,.12)'
    ];
    card.style.setProperty('--glow-color', glowColors[i % glowColors.length]);
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });
  });
})();

/* ─────────────────────────────────────
   16. CATEGORY CARD RIPPLE
───────────────────────────────────── */
(function initRipple() {
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', e => {
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size   = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        background: rgba(124,58,237,.15);
        border-radius: 50%;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
        transform: scale(0);
        animation: rippleAnim .6s ease-out forwards;
        pointer-events: none;
        z-index: 10;
      `;
      // Inject keyframes once
      if (!document.getElementById('rippleStyle')) {
        const s = document.createElement('style');
        s.id = 'rippleStyle';
        s.textContent = '@keyframes rippleAnim{to{transform:scale(1);opacity:0}}';
        document.head.appendChild(s);
      }
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
})();

/* ─────────────────────────────────────
   17. HERO PRODUCT CARD HOVER PARALLAX
───────────────────────────────────── */
(function initHeroParallax() {
  const stack = document.querySelector('.hero-card-stack');
  if (!stack) return;
  const hero  = document.querySelector('.hero');
  if (!hero) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const cx   = rect.width  / 2;
    const cy   = rect.height / 2;
    const dx   = (e.clientX - rect.left - cx) / cx;
    const dy   = (e.clientY - rect.top  - cy) / cy;
    stack.style.transform = `translate(${dx * -10}px, ${dy * -8}px)`;
  });
  hero.addEventListener('mouseleave', () => {
    stack.style.transform = '';
  });
})();
