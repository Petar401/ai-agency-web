import { Footer } from '@/components/nav/Footer';
import { Header } from '@/components/nav/Header';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export default function HomePage() {
  return (
    <>
      <main>
        {/* DARK HERO PANEL — header lives inside this panel */}
        <section className="px-4 pt-7 sm:px-7">
          <div className="on-dark relative mx-auto max-w-[1240px] overflow-hidden rounded-3xl bg-gradient-to-b from-[#0b0b0d] to-[#060607] px-5 pb-14 pt-6 text-white shadow-soft sm:px-10 sm:pb-20 lg:px-14">
            {/* glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[-260px] h-[700px] w-[1500px] -translate-x-1/2 glow-top opacity-55"
            />
            <Header />

            <div className="relative z-10 max-w-[980px] pt-14 lg:pt-20">
              <Reveal>
                <Badge>Norwich · AI Automation Agency</Badge>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="mt-6 text-display-xl">
                  <span className="block">Phase 4 nav</span>
                  <span className="block bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">
                    in place.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-6 max-w-[620px] text-base leading-relaxed text-ink-2 sm:text-[17px]">
                  Sticky-feel header with logo, nav, primary CTA, and a focus-trapped mobile drawer.
                  Static hero copy + 3D scene land in Phases 5–6. Footer composed below.
                </p>
              </Reveal>
              <Reveal delay={360}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#contact">Book a free automation audit</Button>
                  <Button href="#services" variant="ghost">
                    See what we build
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* placeholder so anchors resolve while later phases build out */}
        <section id="services" aria-hidden className="container py-24" />
        <section id="contact" aria-hidden className="container pb-24" />
      </main>
      <Footer />
    </>
  );
}
