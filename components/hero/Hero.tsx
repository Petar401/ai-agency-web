import { Header } from '@/components/nav/Header';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';
import { SceneFallback } from './SceneFallback';
import { SceneIsland } from './SceneIsland';

export function Hero() {
  return (
    <section className="px-4 pt-7 sm:px-7" aria-labelledby="hero-title">
      <div className="on-dark relative mx-auto max-w-[1240px] overflow-hidden rounded-3xl bg-gradient-to-b from-[#0b0b0d] to-[#060607] px-5 pb-14 pt-6 text-white shadow-soft sm:px-10 sm:pb-20 lg:px-14">
        {/* top glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-260px] h-[700px] w-[1500px] -translate-x-1/2 glow-top opacity-55"
        />
        {/* side glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-[30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.25),transparent_60%)] blur-[40px] opacity-50"
        />

        <Header />

        <div className="relative grid gap-10 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-8 lg:pt-16">
          {/* COPY */}
          <div className="relative z-10 max-w-[760px]">
            <Reveal>
              <Badge>{site.hero.eyebrow}</Badge>
            </Reveal>
            <Reveal delay={120}>
              <h1
                id="hero-title"
                className="mt-6 text-display-xl"
              >
                <span className="block">{site.hero.title[0]}</span>
                <span className="block bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">
                  {site.hero.title[1]}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-[640px] text-base leading-relaxed text-ink-2 sm:text-[17px]">
                {site.hero.description}
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={site.hero.primaryCta.href}
                  leadingIcon={
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  }
                >
                  {site.hero.primaryCta.label}
                </Button>
                <Button href={site.hero.secondaryCta.href} variant="ghost">
                  {site.hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* 3D / FALLBACK PANEL */}
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line-2 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[520px]"
            aria-hidden
          >
            {/* Static fallback ships in the initial HTML; the R3F island mounts on top. */}
            <SceneFallback />
            <SceneIsland />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,#060607_100%)]"
            />
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="relative z-10 mt-14 border-t border-line pt-7">
          <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 opacity-55">
            {site.hero.trust.map((name) => (
              <li
                key={name}
                className="text-[clamp(16px,2vw,22px)] font-semibold tracking-[0.06em] text-white/85"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
