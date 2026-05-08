# Tasks — NorfolkAI 3D Agency Site

_All v1 phases shipped on `claude/ai-agency-website-design-2odQ3`. Follow-ups documented at the end._

## Phase 0 — Audit ✓

- [x] Inspect repository state and dependencies
- [x] Decide stack and architecture (Next.js 14 + TS + Tailwind + R3F)
- [x] `PROJECT_AUDIT.md`
- [x] `IMPLEMENTATION_PLAN.md`
- [x] `TASKS.md`
- [x] User confirmation to proceed

## Phase 1 — Foundation ✓

- [x] `package.json` (next 14.2, react 18.3, ts 5.5, tailwind 3.4)
- [x] `tsconfig.json` strict + `paths: { "@/*": ... }`
- [x] `tailwind.config.ts` with design tokens
- [x] `postcss.config.mjs`
- [x] `next.config.mjs` (security headers, compress)
- [x] `.eslintrc.json`, `.prettierrc`, `.editorconfig`, `.gitignore`
- [x] `app/layout.tsx` shell with Inter via `next/font`
- [x] `app/page.tsx` placeholder
- [x] `app/globals.css` Tailwind layers + tokens
- [x] Removed `index.html`, `styles.css`, `script.js` (preserved in git history)
- [x] `pnpm typecheck && pnpm lint && pnpm build` clean

## Phase 2 — Design System ✓

- [x] `Button` (light / ghost / outline · md / sm)
- [x] `Badge`, `Card` (dark + light tones), `SectionHeader`
- [x] `Reveal` (client, IO + reduced-motion)
- [x] `Field` (Input / Select / Textarea with labels and error states)
- [x] `lib/cn` helper
- [x] Smoke-tested on `page.tsx`

## Phase 3 — Content & SEO ✓

- [x] `content/site.ts` typed: hero, 6 services, 6 industries, 5-step process,
      3 case studies (`[example]`), 3 testimonials (`[placeholder]`), 8 FAQs, footer
- [x] `lib/seo.ts` (`buildMetadata`)
- [x] `lib/schema.ts` (Organization, ProfessionalService, FAQPage, Service ItemList)
- [x] `app/layout.tsx` metadata + JSON-LD `<script>` injection
- [x] `app/sitemap.ts`, `app/robots.ts`
- [x] `app/opengraph-image.tsx` (next/og 1200×630)
- [x] `public/favicon.svg`

## Phase 4 — Header / Footer / Mobile nav ✓

- [x] `components/nav/Logo` (dual tone)
- [x] `components/nav/Header` (logo, links, CTA pill)
- [x] `components/nav/MobileMenu` (focus trap, Esc, scroll lock)
- [x] `components/nav/Footer` (4-col + bottom bar)

## Phase 5 — Hero (static) ✓

- [x] `components/hero/Hero` (badge, gradient h1, sub, CTAs, trust strip)
- [x] `components/hero/SceneFallback` (HTML hologram tabs in initial HTML)
- [x] aspect-ratio reserved on 3D box (no CLS)

## Phase 6 — 3D scene ✓

- [x] `three`, `@react-three/fiber`, `@react-three/drei` installed
- [x] `components/hero/SceneCanvas` (DPR clamp, frameloop gating, IO pause)
- [x] `components/hero/HologramTabs` (6 holo tabs, custom shader: edge mask, fresnel, scanline, top-fade)
- [x] drei `<Text>` for service labels (only one SDF text per tab, runtime perf)
- [x] Connecting filaments (additive `LineSegments`)
- [x] Lissajous camera drift, dampened pointer parallax
- [x] `prefers-reduced-motion` → freeze drift, no parallax
- [x] `< 480px` → 4 tabs visible
- [x] `dynamic({ ssr: false })` via `SceneIsland`
- [x] Hero island chunk lazy-loaded (~165 kB gz)

## Phase 7 — Sections ✓

- [x] `Services` (6 dark cards in light section)
- [x] `Industries` (6 light tiles)
- [x] `Enterprise` (internal AI + terminal mock)
- [x] `Process` (5 steps)
- [x] `CaseStudies` (3 example studies, problem/solution/outcome + headline metric)
- [x] `Testimonials` (3 quotes, each tagged `placeholder`)
- [x] `FAQ` (8 entries via native `<details>`)
- [x] `CTA` (client form, validation, aria-live status)
- [x] All sections use `aria-labelledby`

## Phase 8 — Form API ✓

- [x] `app/api/audit/route.ts` POST: validate, length-cap, log, return JSON
- [x] Smoke-tested: empty body → 400 with per-field errors; valid body → 200

## Phase 9 — Performance pass ✓

- [x] All section content ships in initial HTML (verified via `curl`)
- [x] R3F island NOT in initial chunk list (verified via build output)
- [x] No CLS (aspect-ratio reserved for 3D box)
- [x] `:has(canvas)` rule fades the static fallback once R3F mounts
- [x] Robots.txt + sitemap.xml + JSON-LD all resolve

## Phase 10 — Accessibility pass ✓

- [x] Skip-to-main link (visible on focus)
- [x] `<main id="main">` target
- [x] `:focus-visible` ring across the site
- [x] Native `<details>` markers hidden so the rendered + toggle is consistent
- [x] All landmarks: `header`, `main`, `nav`, `footer`, `section[aria-labelledby]`
- [x] Form labels real `<label>` + `aria-invalid` + `aria-describedby`
- [x] Form status `role="status"` + `aria-live="polite"`
- [x] Mobile menu: focus trap, Esc, scroll lock, hash-close
- [x] `prefers-reduced-motion` honored (CSS + R3F)

## Phase 11 — QA & polish ✓

- [x] Viewport sweep planned at 360 / 768 / 1024 / 1440 (Tailwind responsive utilities + container)
- [x] All `[example]` and `[placeholder]` content visibly tagged
- [x] Typecheck, lint, build green at every phase

## Phase 12 — Docs ✓

- [x] `README.md` (run, build, deploy, structure, content edit guide)
- [x] `PROJECT_AUDIT.md` reflects final 3D direction (hologram tabs)
- [x] `IMPLEMENTATION_PLAN.md` reflects shipped architecture
- [x] `TASKS.md` (this file) finalized

---

## Definition of Done — v1 ✓

- [x] All phases complete and committed.
- [x] `pnpm typecheck && pnpm lint && pnpm build` clean.
- [x] All content ships in initial HTML.
- [x] R3F island lazy-loaded as separate chunk.
- [x] WebGL-off and reduced-motion paths in place.
- [x] All `[placeholder]` / `[example]` content clearly tagged in UI for non-engineers to find.
- [x] `README.md` lets a new engineer run, build, and deploy without asking questions.

---

## Open follow-ups (post v1)

- **Wire `/api/audit`** to a real destination (Resend, HubSpot, Slack). Replace the `console.log` block in `app/api/audit/route.ts`. Contract stays the same.
- **Real client logos** to replace `site.hero.trust`.
- **Real testimonials** to replace the three `placeholder` entries in `site.testimonials`.
- **Real case studies** to replace the three `example` entries in `site.caseStudies`.
- **Lighthouse run** in a real browser/device (the offline sandbox can't run it). Targets in `IMPLEMENTATION_PLAN.md`.
- **Visual QA** of the R3F scene in a desktop + mobile browser. Static fallback is verified; the live R3F shader needs human eyes.
- **Analytics** (Plausible or GA) and a cookie banner if marketing cookies are added.
- **Privacy / Terms pages** (links exist in the footer but the routes aren't built yet).
- **Optional**: scroll-driven scene where hero hologram tabs travel into the Services section. Would justify adding `@react-three/scroll-controls`.
