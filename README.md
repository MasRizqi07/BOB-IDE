# Pacoel.Dev — Developer Portfolio

A high-performance, accessible developer portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

> **Live:** [pacoel.dev](https://pacoel.dev)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| Icons | Lucide React |
| Fonts | Inter + JetBrains Mono (next/font) |
| Deploy | Vercel |

---

## Project Structure

```
├── app/
│   ├── globals.css          # Design tokens, Tailwind layers
│   ├── layout.tsx           # Root layout, fonts, SEO metadata
│   ├── page.tsx             # Home — assembles all sections
│   ├── icon.tsx             # Dynamic favicon (P monogram)
│   ├── sitemap.ts           # /sitemap.xml
│   ├── robots.ts            # /robots.txt
│   └── api/
│       └── contact/
│           └── route.ts     # POST /api/contact (Resend-ready)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Fixed nav, scroll progress, mobile drawer
│   │   └── Footer.tsx       # Brand col, nav cols, back-to-top
│   ├── sections/
│   │   ├── Hero.tsx         # Particle bg, typed role, avatar, CTAs
│   │   ├── About.tsx        # Bio cards, highlights, stat counters
│   │   ├── TechStack.tsx    # Featured 5 + filterable full grid
│   │   ├── Projects.tsx     # Filter pills, featured/rest split
│   │   └── Contact.tsx      # Info cards, availability badge, form
│   └── ui/
│       ├── ParticleCanvas.tsx  # Canvas particle field, mouse attraction
│       ├── TypedRole.tsx       # Typewriter role rotator (state machine)
│       ├── SectionHeader.tsx   # Reusable animated section header
│       ├── StatGrid.tsx        # Animated number counters
│       ├── TechGrid.tsx        # Filterable tech cards with tooltips
│       ├── ProjectCard.tsx     # Gradient thumb, expand toggle, stack tags
│       └── ContactForm.tsx     # Validated form, mailto fallback
│
├── lib/
│   ├── utils.ts             # cn() utility (clsx + tailwind-merge)
│   ├── hooks.ts             # useScrollProgress, useScrolled, useActiveSection
│   └── data/
│       ├── techStack.ts     # 12 typed TechItems, 4 categories
│       ├── stats.ts         # 4 StatItems for About counters
│       └── projects.ts      # 6 typed Projects + filter config
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── postcss.config.mjs
```

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/pacoel/pacoel-dev.git
cd pacoel-dev
npm install          # or: pnpm install / yarn install
```

### 2. Environment variables

```bash
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SITE_URL (and RESEND_API_KEY if using real email)
```

### 3. Run locally

```bash
npm run dev
# → http://localhost:3000
```

### 4. Type-check & lint

```bash
npm run type-check   # tsc --noEmit
npm run lint         # eslint
```

### 5. Production build

```bash
npm run build
npm run start
```

---

## Personalisation Checklist

Before going live, replace every placeholder with real data:

- [ ] `lib/data/projects.ts` — real GitHub URLs, project descriptions, stack tags
- [ ] `lib/data/stats.ts` — your actual years / project count
- [ ] `lib/data/techStack.ts` — add or remove technologies
- [ ] `components/sections/Hero.tsx` — update social links (GitHub / LinkedIn)
- [ ] `components/layout/Navbar.tsx` & `Footer.tsx` — update email address
- [ ] `app/layout.tsx` — update `twitter.creator` handle
- [ ] `public/og-image.png` — 1200×630 Open Graph image
- [ ] `public/resume.pdf` — your actual résumé

### Enable real email (Resend)

```bash
npm install resend
```

Then in `app/api/contact/route.ts`, uncomment the Resend block and set `RESEND_API_KEY` in `.env.local`.

In `components/ui/ContactForm.tsx`, replace the `mailto:` block with:

```ts
const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
});
if (!res.ok) throw new Error("send failed");
```

---

## Deploy to Vercel

```bash
npx vercel
# or push to GitHub and connect the repo in the Vercel dashboard
```

Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in Vercel Environment Variables.

---

## Performance

The project is built to score **100 on all Lighthouse categories** on production builds. Key choices:

- `next/font` for zero-CLS font loading
- `aria-hidden` on all decorative elements
- `focus-visible` rings on every interactive element
- `prefers-reduced-motion` respected via CSS
- Particle canvas is `pointer-events: none` and `aria-hidden`
- No external CSS or JS blocking the critical path

---

## License

MIT — free to use, adapt, and deploy as your own portfolio.
