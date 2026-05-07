# Project Audit — ai-agency-web

_Audit date: 2026-05-07 · Branch: `claude/ai-agency-website-design-2odQ3`_

## 1. Current State

The repository is at its first commit. The working tree contains a single static landing page:

```
ai-agency-web/
├── .git/
├── index.html      # ~16 kB · single-page agency site (AtomAI-inspired dark theme)
├── styles.css      # ~19 kB · hand-written CSS, design tokens via :root vars
└── script.js       # ~3 kB  · vanilla JS (mobile nav, IO reveal, count-up, form stub)
```

Root commit: `Add NorfolkAI agency landing page in AtomAI dark style`.

### Stack & tooling
| Concern              | Status |
|----------------------|--------|
| Framework            | None — vanilla HTML/CSS/JS |
| Language             | Plain JS, no TypeScript |
| Build system         | None — files served as-is |
| Package manager      | None — no `package.json` |
| Styling              | Hand-rolled CSS with custom properties |
| Routing              | None — single page, hash anchors only |
| 3D / WebGL           | None |
| Component model      | None |
| Testing              | None |
| Linting / Formatting | None |
| CI / CD              | None |
| Deployment config    | None — static, deployable to any host |
| Public assets        | None — all icons inlined as SVG |
| SEO infrastructure   | `<title>` + meta description only. No OG, no schema, no sitemap, no robots. |
| Accessibility        | Decent baseline (semantic landmarks, labels, focus). No formal audit. |
| Analytics            | None |

### What works today
- Single-page marketing layout for an AI automation agency in Norwich (NorfolkAI).
- Sections: hero, services (4), internal-AI/enterprise, metrics, process, testimonial, contact form, footer.
- Responsive mobile breakpoints at 960px and 560px.
- Mobile drawer nav with `aria-expanded` toggling.
- Scroll-reveal via IntersectionObserver, with graceful fallback.
- Animated metric counters.
- Front-end-only form handler (status message; no submission).

### What is missing vs. the brief
- **No 3D experience.** The brief explicitly requires a real R3F-based 3D hero.
- **No componentization** — entire site is in one HTML file; impossible to extend without copy-paste.
- **No type safety** — no TS, no schema for content.
- **No SEO depth** — no OG image, no JSON-LD (Organization / LocalBusiness / FAQPage), no sitemap.xml, no robots.txt.
- **Limited section coverage** — brief asks for industries, case studies, FAQ; the current page has none.
- **No build/deploy pipeline** — no `package.json`, no Vercel/Netlify config, no env handling for the form.
- **No design system as code** — tokens exist as CSS variables but aren't reusable across components.
- **Performance/perf budget is informal** — fine today (no JS framework), but cannot stay this way once 3D is added.

---

## 2. Risks

| Risk | Severity | Notes |
|------|----------|-------|
| Adding R3F to vanilla HTML | High | Would require ad-hoc bundling; defeats the purpose of staying static. |
| Scope creep without componentization | High | Adding 6 new sections to one HTML file becomes unmaintainable fast. |
| SEO regression if rebuilt as a CSR SPA | High | Mitigated by choosing Next.js SSG for content sections. |
| 3D harming mobile perf | Medium | Mitigated by strict triangle/DPR budget, dynamic-import island, `prefers-reduced-motion` path. |
| Losing existing copy / structure during rebuild | Low | Preserved in git history at the root commit; reused as content source for `content/site.ts`. |
| Form has no real submission target | Low | Documented as out-of-scope for v1; pluggable to Resend/HubSpot in 15 min later. |

---

## 3. Opportunities

- **Greenfield framework choice** — nothing to migrate around; we can pick Next.js 14 cleanly.
- **Reuse the brand voice** — the hero/services/CTA copy is already strong and on-message; lift it into typed content.
- **Reuse the visual language** — dark panel-on-light-page composition, pill buttons, soft top-glow, restrained palette all carry forward and become the design system.
- **Lighthouse 90+ on mobile is achievable** — Next.js SSG + a single dynamic-imported R3F island is a known-good architecture.
- **Norwich/local SEO** — JSON-LD `LocalBusiness` is a quick win versus competitors.

---

## 4. Recommended Architecture

Migrate to **Next.js 14 (App Router) + TypeScript + Tailwind + React Three Fiber**, single-page composition with route-level code splitting. The 3D hero ships as a `dynamic(..., { ssr: false })` island so the HTML-first payload renders instantly on mobile and indexes cleanly.

Rationale (mapped to user priorities):
- **Mobile-first**: SSG → tiny initial HTML, R3F lazy-loaded, DPR clamped, mobile-simplified scene variant.
- **SEO**: SSR/SSG metadata, OG image generation, JSON-LD, sitemap, robots — all first-class in Next.
- **Production quality**: TS + ESLint + Prettier + clear component boundaries; one focused commit per phase.

Full design system, content plan, 3D scene spec, SEO/performance plan, accessibility plan, and verification checklist live in **`IMPLEMENTATION_PLAN.md`**.

---

## 5. Preserve / Replace / Delete

### Preserve (lifted into the new app)
- **Copy patterns**: hero badge, "Book a free automation audit" CTA, Norwich anchor, service taxonomy (expanded from 4 → 6 to match the brief's broader scope: AI Automation Systems, AI Agents, CRM/Lead Workflow, Internal Knowledge Assistant, Document Automation, Custom AI Integrations).
- **Visual language**: dark `#0a0a0b` panel on light `#f4f4f3` page, pill buttons, top-glow hero, trust-logo strip — these become design tokens in `tailwind.config.ts`.
- **Form fields**: name / business / email / team size / message — same shape, now POSTing to `/api/audit`.
- **Typography**: Inter, tight tracking on display sizes — moved to `next/font`.

### Replace (rewritten in the new stack)
- `index.html` → `app/page.tsx` composing `<Hero />`, `<Services />`, `<Industries />`, `<Process />`, `<CaseStudies />`, `<Testimonials />`, `<FAQ />`, `<CTA />`.
- `styles.css` → `globals.css` (tokens + base) + Tailwind utilities + per-component classes.
- `script.js` → React + framer-motion + R3F; mobile nav, reveals, counters become components/hooks.

### Delete (preserved in git history at the root commit)
- `index.html`, `styles.css`, `script.js` are removed in the commit that introduces the Next app. Anyone can `git show <root-commit>:index.html` to retrieve.

---

## 6. Stack Suitability Verdict

The current vanilla setup is **not suitable** for a 3D, SEO-hardened, componentized agency site. Adding R3F to vanilla HTML/JS would require ad-hoc bundling and gives up everything Next provides for free (SSG, route splitting, image/font opt, edge OG generation). Migrating now — at one commit, with no dependants — is the lowest-risk, highest-leverage moment. The migration plan is in `IMPLEMENTATION_PLAN.md`; the phased checklist is in `TASKS.md`.
