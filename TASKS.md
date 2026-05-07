# Tasks — NorfolkAI 3D Agency Site

_Phased checklist. Each phase ends with `pnpm build` + `pnpm typecheck` + `pnpm lint` green and is one commit. Mark `[x]` as completed._

## Phase 0 — Audit (this branch's first deliverable)

- [x] Inspect repository state and dependencies
- [x] Decide stack and architecture (Next.js 14 + TS + Tailwind + R3F)
- [x] `PROJECT_AUDIT.md`
- [x] `IMPLEMENTATION_PLAN.md`
- [x] `TASKS.md` (this file)
- [ ] **Pause for user confirmation before scaffolding**

---

## Phase 1 — Foundation

- [ ] `pnpm init` → `package.json`
- [ ] Install: `next`, `react`, `react-dom`, `typescript`, `@types/react`, `@types/node`
- [ ] Install dev: `eslint`, `eslint-config-next`, `prettier`, `prettier-plugin-tailwindcss`
- [ ] Install styling: `tailwindcss`, `postcss`, `autoprefixer`
- [ ] `tsconfig.json` (strict, `paths: { "@/*": ["./*"] }`)
- [ ] `tailwind.config.ts` with design tokens
- [ ] `postcss.config.mjs`
- [ ] `next.config.mjs` (security headers, compress)
- [ ] `.eslintrc.json`, `.prettierrc`, `.editorconfig`, `.gitignore`
- [ ] `app/layout.tsx` shell with Inter via `next/font`
- [ ] `app/page.tsx` placeholder
- [ ] `app/globals.css` Tailwind layers + base tokens
- [ ] Remove `index.html`, `styles.css`, `script.js` (preserved in git history)
- [ ] `pnpm build && pnpm typecheck && pnpm lint` ✓
- [ ] Commit: `chore: scaffold Next.js 14 + TS + Tailwind foundation`

## Phase 2 — Design System

- [ ] `components/ui/Button.tsx` (variants: light, ghost, outline; size: md, sm)
- [ ] `components/ui/Badge.tsx`
- [ ] `components/ui/Card.tsx`
- [ ] `components/ui/SectionHeader.tsx` (eyebrow, h2, sub)
- [ ] `components/ui/Reveal.tsx` ('use client', IO + reduced-motion)
- [ ] `components/ui/Field.tsx` (label, input/select/textarea, error)
- [ ] Smoke-test all primitives on `page.tsx`
- [ ] Visual check at 360 / 768 / 1024 / 1440
- [ ] Commit: `feat(ui): design system primitives`

## Phase 3 — Content & SEO scaffolding

- [ ] `content/site.ts` (typed) — hero, services (6), industries (6), process (5), case studies (3), testimonials (3), FAQ (8), footer
- [ ] `lib/seo.ts` (`buildMetadata` helper)
- [ ] `lib/schema.ts` (Organization, LocalBusiness, FAQPage)
- [ ] `app/layout.tsx` metadata + JSON-LD `<Script>` injection
- [ ] `app/sitemap.ts`
- [ ] `app/robots.ts`
- [ ] `app/opengraph-image.tsx` (next/og 1200×630)
- [ ] Verify `<title>`, OG, JSON-LD via view-source
- [ ] Commit: `feat(seo): metadata, schema, sitemap, robots, OG image`

## Phase 4 — Header / Footer / Mobile nav

- [ ] `components/nav/Header.tsx` (logo, links, CTA pill)
- [ ] `components/nav/MobileMenu.tsx` ('use client', focus trap, Esc, scroll lock)
- [ ] `components/nav/Footer.tsx` (4-column: brand, services, company, contact + bottom bar)
- [ ] Compose into `app/layout.tsx`
- [ ] Keyboard tour ✓
- [ ] Commit: `feat(nav): header, mobile menu, footer`

## Phase 5 — Hero (static)

- [ ] `components/hero/Hero.tsx` (badge, h1 with gradient, sub, CTAs, trust strip)
- [ ] `components/hero/SceneFallback.tsx` (static SVG node graph, sized to hero box)
- [ ] Reserve aspect-ratio for the 3D box to avoid CLS
- [ ] Verify hero is fully usable without any client JS
- [ ] Commit: `feat(hero): static hero with SVG fallback`

## Phase 6 — 3D scene (hologram service tabs)

- [ ] Install: `three`, `@react-three/fiber`, `@react-three/drei`
- [ ] `components/hero/SceneCanvas.tsx` ('use client', dynamic-import target)
- [ ] `components/hero/HologramTabs.tsx` (6 tabs: rounded planes + custom shader: neon edge, fresnel rim, scanline noise)
- [ ] drei `<Text>` for tab labels (SDF, no DOM overlay)
- [ ] Subtle additive `LineSegments` filaments between adjacent tabs
- [ ] Per-tab Y-axis rotation ±3° with phase offsets
- [ ] DPR clamp `min(devicePixelRatio, 1.75)`
- [ ] Lissajous camera drift; pointer parallax with damping
- [ ] `IntersectionObserver` pause/resume
- [ ] `prefers-reduced-motion` → freeze drift + rotation, no parallax
- [ ] `< 480px` → 4 tabs visible, no parallax, slower drift
- [ ] Wire `dynamic(() => import('./SceneCanvas'), { ssr: false, loading: SceneFallback })`
- [ ] Verify triangle count < 3k (Stats drei helper, dev only)
- [ ] Verify hero island chunk < 130 kB gz in `next build` output
- [ ] Commit: `feat(hero): R3F holographic service tabs with mobile + reduced-motion fallbacks`

## Phase 7 — Sections

- [ ] `components/sections/Services.tsx` (6 cards, dark)
- [ ] `components/sections/Industries.tsx` (6 tiles, light)
- [ ] `components/sections/Process.tsx` (5 steps; horizontal scroll desktop, stack mobile)
- [ ] `components/sections/CaseStudies.tsx` (3 placeholder studies, problem/solution/outcome)
- [ ] `components/sections/Testimonials.tsx` (3 quotes, marked `[placeholder]`)
- [ ] `components/sections/FAQ.tsx` (`<details>`/`<summary>`, 8 entries)
- [ ] `components/sections/CTA.tsx` ('use client', form, validation, status live region)
- [ ] Compose all into `app/page.tsx`
- [ ] Each section uses `aria-labelledby` and `<Reveal>`
- [ ] Commit: `feat(sections): services, industries, process, case studies, testimonials, FAQ, CTA`

## Phase 8 — Form API

- [ ] `app/api/audit/route.ts` (POST, validate via zod, log + 200; CORS limited to same-origin)
- [ ] Client form: optimistic disabled state, success message, error live region
- [ ] Document Resend/HubSpot wiring as a TODO (env-driven, out-of-scope for v1)
- [ ] Commit: `feat(form): /api/audit endpoint and client wiring`

## Phase 9 — Performance pass

- [ ] Lighthouse mobile (Moto G4 throttle, slow 4G) — capture report
- [ ] Lighthouse desktop — capture report
- [ ] Verify hero island lazy-loads (Network tab; check chunk name)
- [ ] Verify no CLS from hero (use Performance tab)
- [ ] Fix any LCP/CLS/TBT regressions
- [ ] Targets met: Performance ≥ 90 mobile, ≥ 95 desktop
- [ ] Commit: `perf: lighthouse pass`

## Phase 10 — Accessibility pass

- [ ] axe DevTools — 0 critical, 0 serious
- [ ] Keyboard-only tour from `/` → form submit → footer link
- [ ] Screen reader smoke (VoiceOver or NVDA): landmarks, headings, form errors
- [ ] Verify focus rings visible on all interactive elements
- [ ] Verify `prefers-reduced-motion` path
- [ ] Commit: `a11y: keyboard, screen reader, reduced-motion fixes`

## Phase 11 — QA & polish

- [ ] Viewport sweep: 360, 414, 768, 1024, 1280, 1440 — screenshots in PR
- [ ] No horizontal scroll, no overlap, no orphaned widows in headlines
- [ ] Hover and focus states on every interactive element
- [ ] Copy proofread; all `[placeholder]` clearly tagged in UI text
- [ ] Favicon + apple-touch-icon resolve
- [ ] Commit: `chore: QA polish across viewports`

## Phase 12 — Docs & deploy readiness

- [ ] `README.md`: stack, scripts, run/build, deploy to Vercel, env vars (none required for v1)
- [ ] Update `PROJECT_AUDIT.md` final state
- [ ] Update `TASKS.md` with completed checkboxes
- [ ] (Optional) `vercel.json` if non-defaults needed
- [ ] Final `pnpm build` clean
- [ ] Commit: `docs: README + finalize audit/tasks`
- [ ] Push to `claude/ai-agency-website-design-2odQ3`

---

## Definition of Done (v1)

- [ ] All Phase 1–12 checkboxes ticked.
- [ ] Lighthouse mobile: Performance ≥ 90, A11y ≥ 95, SEO 100, Best Practices ≥ 95.
- [ ] WebGL-off and reduced-motion paths verified manually.
- [ ] `next build` clean; hero island lazy-loaded as a separate chunk under 120 kB gz.
- [ ] All `[placeholder]` content clearly tagged so a non-engineer can find what to replace.
- [ ] `README.md` lets a new engineer run, build, and deploy without asking questions.
