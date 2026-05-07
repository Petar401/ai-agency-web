# Implementation Plan — NorfolkAI 3D Agency Site

_Companion to `PROJECT_AUDIT.md`. Phased checklist lives in `TASKS.md`._

## 1. Goals (locked)

- Premium, mobile-first, SEO-optimized 3D landing site for **NorfolkAI** — a Norwich-rooted AI automation agency for SMEs and internal-AI for larger teams.
- Production-ready code: TypeScript, componentized, accessible, performant.
- 3D hero used strategically (automation node graph) — never gimmicky.
- All copy specific and business-oriented; placeholders are explicitly tagged.

## 2. Stack (locked)

- **Framework**: Next.js 14 (App Router) — SSR/SSG, metadata API, route splitting, edge OG, `next/font`, `next/image`.
- **Language**: TypeScript (strict).
- **Styling**: Tailwind CSS v3 with custom design tokens + a small `globals.css`.
- **3D**: `three`, `@react-three/fiber`, `@react-three/drei` (only the helpers we use).
- **Motion**: `framer-motion` for in-view fades and small UI micro-interactions, gated on `prefers-reduced-motion`.
- **Tooling**: ESLint (next/core-web-vitals + ts), Prettier, `pnpm` (preferred; falls back to npm).
- **Deploy**: Vercel-friendly out of the box; static-export-friendly except for the `/api/audit` route.

## 3. Target File Structure

```
ai-agency-web/
├── app/
│   ├── layout.tsx              # fonts, metadata template, JSON-LD <Script>
│   ├── page.tsx                # composes all sections
│   ├── globals.css             # Tailwind layers + tokens
│   ├── opengraph-image.tsx     # next/og 1200×630
│   ├── robots.ts
│   ├── sitemap.ts
│   └── api/audit/route.ts      # POST: validate + log + 200 (Resend/HubSpot pluggable later)
├── components/
│   ├── nav/{Header,MobileMenu,Footer}.tsx
│   ├── hero/{Hero,SceneCanvas,NodeGraph,SceneFallback}.tsx
│   ├── sections/{Services,Industries,Process,CaseStudies,Testimonials,FAQ,CTA}.tsx
│   └── ui/{Button,Badge,Card,SectionHeader,Reveal,Field}.tsx
├── content/site.ts             # all copy (typed)
├── lib/{seo.ts,schema.ts,motion.ts}
├── public/{favicon.svg,og-default.png,icons/*.svg}
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs             # security headers, compress
├── tsconfig.json
├── package.json
├── README.md
├── PROJECT_AUDIT.md
├── IMPLEMENTATION_PLAN.md
└── TASKS.md
```

## 4. Design System

**Type**: Inter Variable via `next/font/google`. Tight tracking on display sizes (`-0.035em`).
- `display-xl` clamp(46px, 8.5vw, 116px) / 0.96 / 800
- `display-lg` clamp(32px, 4.4vw, 56px) / 1.05 / 700
- `body` 15–17px / 1.6 / 400

**Color** (single accent, restrained):
- `bg.canvas` `#f4f4f3` · `bg.panel` `#0a0a0b` · `bg.panel-2` `#0f0f11`
- `ink.0..4` white-with-decreasing-alpha for dark surfaces
- `slate.900..500` for light surfaces
- Accent `#E7E2D4` (warm parchment) — used only for highlights. **No purple/neon.**

**Surfaces**: 18px / 28px rounded panels; soft top-glow only inside dark sections.
**Spacing**: 4-pt grid; sections `clamp(70px, 10vw, 130px)`; container max `1240px`.
**Buttons**: pill 999px, three variants (`light`, `ghost`, `outline`); 44px min hit target.
**Motion**: 200–800 ms ease-out; gated on `prefers-reduced-motion`.
**Theme**: dark panel on light page (matches the AtomAI reference). No theme toggle in v1.

## 5. Content Plan (lives in `content/site.ts`)

**Hero**
- Eyebrow: `● Norwich · AI Automation Agency`
- H1: `AI systems that run the work you don't have time for.`
- Sub: `NorfolkAI builds production AI agents and automations for Norwich SMEs — and private internal AI for larger teams. Lead generation, onboarding, marketing and operations, handled.`
- CTAs: `Book a free automation audit` / `See what we build`

**Services** (6)
1. AI Automation Systems
2. AI Agents (Sales / Support / Ops)
3. CRM & Lead Workflow
4. Internal Knowledge Assistant
5. Document & Admin Automation
6. Custom AI Integrations

**Industries**: Professional services · Trades & field services · Ecommerce · Healthcare admin · Property · Hospitality.

**Process** (5): Audit → Strategy → Build → Integrate → Optimise.

**Case studies** (3, marked `[example]`): Problem / Solution / Outcome with one headline metric each.

**Testimonials**: 3 quotes, marked `[placeholder]`.

**FAQ** (8): timelines, pricing, UK GDPR/data privacy, on-prem vs cloud, integrations, post-launch support, IP ownership, why Norwich.

**Contact form**: name, business, email, team size, message → POST `/api/audit`.

**Footer**: Norwich address placeholder, email/phone placeholders, service links, legal placeholders, socials placeholders.

## 6. 3D Scene Spec (`components/hero/NodeGraph.tsx`)

- ~28 nodes via a single `InstancedMesh` of low-poly icospheres (radius 0.08, 1 segment).
- Edges via a single `LineSegments` with prebuilt `BufferGeometry`; subtle alpha pulse over time.
- `PerspectiveCamera` fov 35; slow lissajous drift ±0.4 units; dampened pointer parallax.
- Lighting: one `hemisphereLight` + one rim `directionalLight`. No shadows. No postprocessing in v1.
- Triangles < 4k. DPR clamped to `min(devicePixelRatio, 1.75)`.
- `frameloop="always"`, paused via `IntersectionObserver` when off-screen.
- Loaded with `dynamic(() => import('./SceneCanvas'), { ssr: false, loading: () => <SceneFallback /> })`.
- Fallbacks:
  - No WebGL → static SVG node graph.
  - `prefers-reduced-motion` → render scene but freeze drift, no parallax.
  - Mobile (< 480px) → simplified 16-node version, no parallax.
- Bundle target: hero island < 120 kB gzipped JS (no postprocessing, no GLTF).

## 7. SEO & Performance

- `app/layout.tsx` exports `metadata` (title template, description, OG, Twitter, canonical).
- JSON-LD via `<Script type="application/ld+json">` in `layout.tsx`: `Organization`, `LocalBusiness` (Norwich, NR1, GB), `FAQPage` from FAQ content.
- `app/sitemap.ts` + `app/robots.ts`.
- `app/opengraph-image.tsx` renders 1200×630 OG (next/og).
- `next/font` for Inter — no external font request, no FOUT.
- `next/image` for any future raster assets.
- `next.config.mjs`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, basic `Permissions-Policy`, `compress: true`.
- Lighthouse targets: Performance ≥ 90 mobile / ≥ 95 desktop; Accessibility ≥ 95; SEO 100; Best Practices ≥ 95.

## 8. Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<section aria-labelledby>`, `<nav>`, `<footer>`).
- `:focus-visible` ring everywhere interactive.
- Reveal animations and 3D drift gated on `prefers-reduced-motion`.
- Form labels are real `<label>` elements; errors announced via `aria-live="polite"`.
- FAQ uses native `<details>`/`<summary>` for built-in keyboard support.
- Mobile menu: focus trap, Esc to close, closes on hash navigation.
- Color contrast: white on `#0a0a0b` ≥ 18:1; secondary `rgba(255,255,255,0.72)` ≥ 11:1.

## 9. Component Inventory

**RSC (server components)**: every section, all of `nav/`, all of `ui/` except `Reveal`, `Field`, and `MobileMenu`.

**Client components** (the only `'use client'` files):
- `components/hero/SceneCanvas.tsx` (R3F)
- `components/hero/NodeGraph.tsx` (R3F)
- `components/nav/MobileMenu.tsx`
- `components/sections/CTA.tsx` (form state)
- `components/ui/Reveal.tsx` (IO-based)
- `components/ui/Field.tsx` (controlled inputs)
- `components/sections/FAQ.tsx` (only if we add JS-driven open state — otherwise stays server with `<details>`)

This boundary keeps view-source full for SEO.

## 10. Phased Build Strategy

Each phase = one focused commit. Each phase ends with `pnpm build` + `pnpm typecheck` + `pnpm lint` green.

1. **Foundation** — scaffold Next + TS + Tailwind + ESLint + Prettier. Remove old `index.html/styles.css/script.js`.
2. **Design system** — tokens + `ui/*` primitives, smoke-tested on `page.tsx`.
3. **Content & SEO scaffolding** — `content/site.ts`, `lib/seo.ts`, `lib/schema.ts`, sitemap, robots, OG image.
4. **Header / Footer / Mobile nav**.
5. **Hero static** — copy, CTAs, fallback SVG node graph; site fully usable without 3D.
6. **3D scene** — `SceneCanvas` + `NodeGraph` dynamic-imported; reduced-motion + mobile variants; IO pause.
7. **Sections** — Services, Industries, Process, Case Studies, Testimonials, FAQ, CTA.
8. **Form** — `app/api/audit/route.ts` + client form (validation, success/error live region).
9. **Performance pass** — Lighthouse mobile + desktop; fix LCP/CLS/TBT.
10. **A11y pass** — axe + manual keyboard tour; fix anything flagged.
11. **QA & polish** — viewport sweep (360 / 414 / 768 / 1024 / 1280 / 1440); proofread.
12. **Docs** — `README.md` (run/build/deploy on Vercel); finalize `PROJECT_AUDIT.md` and `TASKS.md`.

## 11. Verification (run before declaring done)

1. `pnpm install && pnpm dev` → `http://localhost:3000` serves all sections.
2. `pnpm build && pnpm start` → production build serves; no client-only code in RSC.
3. **Lighthouse mobile** (Moto G4 throttle): Performance ≥ 90, A11y ≥ 95, SEO 100.
4. **WebGL off** → hero falls back to SVG; site still 100% usable.
5. **Reduced-motion on** → no drift, no fades; content still appears.
6. **Keyboard tour** → focus visible everywhere; mobile menu trap works; FAQ via Enter/Space.
7. **Form** → empty submit shows inline errors; valid submit shows success; `/api/audit` log present.
8. **SEO** → view-source has full HTML for hero/services/FAQ; `<title>`, OG, JSON-LD present; `/robots.txt` and `/sitemap.xml` resolve.
9. **Viewport sweep** → no horizontal scroll, no overlap at 360 / 414 / 768 / 1024 / 1280 / 1440.
10. **Bundle inspector** → `next build` shows hero island as a separate chunk.

## 12. Out of Scope for v1 (followups)

- Real CMS / blog (the Next.js choice already accommodates).
- Wiring `/api/audit` to Resend or HubSpot (15-min add-on; needs env vars).
- Real client logos / testimonials.
- Localization beyond en-GB.
- Analytics (Plausible/GA) and cookie banner.

## 13. Risks & Mitigations

- **R3F mobile perf** — strict triangle/DPR budget, frameloop gating, simplified mobile scene, no postprocessing.
- **CLS from late-hydrating 3D** — canvas reserves its hero box via aspect-ratio CSS; SSR ships the SVG fallback in the same box.
- **SEO regressions vs static HTML** — only 4–6 small files marked `'use client'`; everything else server-rendered.
- **Scope creep** — phased commits; each green before next; case studies and testimonials are explicitly placeholder so we don't block on copy.
