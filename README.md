# NorfolkAI — AI Automation Agency, Norwich

A production-quality, mobile-first, SEO-optimized landing site for **NorfolkAI**, a Norwich-rooted AI automation agency serving local SMEs and internal-AI engagements for larger teams.

Single-page composition, dark/light dual-tone, with a holographic 3D hero (R3F) that lazy-loads after first paint and gracefully falls back to static HTML on no-WebGL or `prefers-reduced-motion`.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict, `noUncheckedIndexedAccess`)
- **Styling**: Tailwind CSS + design tokens
- **3D**: `three`, `@react-three/fiber`, `@react-three/drei` (Text only)
- **Tooling**: ESLint (`next/core-web-vitals`), Prettier with Tailwind plugin
- **Package manager**: pnpm (npm/yarn work too)

## Run locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Build & ship

```bash
pnpm build        # production build
pnpm start        # serve the production build locally
pnpm typecheck    # strict tsc --noEmit
pnpm lint         # next lint
pnpm format       # prettier --write .
```

## Deploy

The repo is Vercel-friendly with no custom config required:

1. Push the `claude/ai-agency-website-design-2odQ3` branch (or merge to `main`).
2. Import the repo into Vercel.
3. No environment variables are required for v1.

The `/api/audit` route currently logs to stdout and returns `{ ok: true }`. To wire it to an inbox or CRM (Resend, HubSpot, Salesforce, Slack), edit `app/api/audit/route.ts` — the request shape and response contract are already locked.

## Structure

```
app/
  layout.tsx               # fonts, metadata, JSON-LD
  page.tsx                 # composes all sections
  globals.css              # tokens + Tailwind layers
  api/audit/route.ts       # POST endpoint (validate + log + 200)
  opengraph-image.tsx      # 1200×630 social card (next/og)
  robots.ts, sitemap.ts    # generated routes

components/
  hero/                    # Hero, SceneFallback, SceneCanvas, SceneIsland, HologramTabs
  nav/                     # Header, MobileMenu, Footer, Logo
  sections/                # Services, Industries, Enterprise, Process,
                           # CaseStudies, Testimonials, FAQ, CTA
  ui/                      # Button, Badge, Card, SectionHeader, Reveal, Field

content/site.ts            # single source of truth for visible copy
lib/                       # cn, seo (buildMetadata), schema (JSON-LD bundles)
public/favicon.svg
```

## Editing content

All visible copy lives in **`content/site.ts`** as a typed object. Hero, services, industries, process, case studies, testimonials, FAQ and footer all read from it.

Items that should be replaced before launch are clearly tagged:
- **Case studies** — every entry is tagged `[example]` in the data and visibly tagged "example" in the UI.
- **Testimonials** — every entry is tagged `[placeholder]` in the data and visibly tagged "placeholder" in the UI.
- **Trust logos** — names in `site.hero.trust`. Replace with real client wordmarks when available.

## What's done

| Concern | Status |
|---|---|
| TypeScript strict, ESLint, Prettier | ✓ |
| Tailwind tokens (color, type, spacing, radius, motion) | ✓ |
| Mobile-first responsive (360 / 768 / 1024 / 1440) | ✓ |
| Header + focus-trapped mobile drawer + footer | ✓ |
| Hero with copy, CTAs, trust strip | ✓ |
| Static SVG fallback for the 3D scene (SSR + no-WebGL) | ✓ |
| R3F hologram-tabs island, dynamic-imported, IO-paused, reduced-motion-gated, mobile-simplified | ✓ |
| 6 services, 6 industries, enterprise/internal-AI, 5-step process, 3 case studies, 3 testimonials, 8 FAQs, audit form | ✓ |
| `/api/audit` POST with validation, logging, JSON response | ✓ |
| `app/sitemap.ts`, `app/robots.ts`, dynamic OG image | ✓ |
| JSON-LD: Organization, ProfessionalService, FAQPage, Service ItemList | ✓ |
| Skip-to-main, focus-visible, aria-labelledby, aria-live, native `<details>` | ✓ |
| `prefers-reduced-motion` honored everywhere (CSS + R3F frameloop) | ✓ |
| Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) | ✓ |
| Phase-by-phase commit history on `claude/ai-agency-website-design-2odQ3` | ✓ |

## What's intentionally out of scope (v1 follow-ups)

- Wiring `/api/audit` to Resend / HubSpot / Slack (15-min add-on; contract is stable).
- Real client logos and testimonials (placeholders are clearly tagged).
- CMS/blog (the Next.js choice already accommodates).
- Analytics (Plausible/GA) and cookie banner.
- Localization beyond `en-GB`.

## Performance notes

- Home route first-load JS: **~99 kB** (server-rendered shell).
- Hero R3F island chunk: **~165 kB gz**, lazy-loaded after first paint via `dynamic({ ssr: false })`.
- DPR clamped to 1.75 on the 3D canvas.
- `frameloop` switches to `"never"` when the hero is off-screen, and to `"demand"` when `prefers-reduced-motion` is set.
- Aspect-ratio reserved for the 3D panel (no CLS).

## Repository history

Branch `claude/ai-agency-website-design-2odQ3` is built phase-by-phase:

1. Initial AtomAI-style static landing (preserved at root commit).
2. Project audit (`PROJECT_AUDIT.md`, `IMPLEMENTATION_PLAN.md`, `TASKS.md`).
3. Next.js 14 + TS + Tailwind scaffolding.
4. Design system primitives.
5. Content + SEO scaffolding (sitemap, robots, OG, JSON-LD).
6. Header, Mobile menu, Footer.
7. Static hero + SVG fallback.
8. R3F holographic-tabs scene.
9. All sections.
10. `/api/audit` endpoint.
11. Performance + accessibility polish.
12. Docs (this README).
