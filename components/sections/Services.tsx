import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { site } from '@/content/site';
import { ServiceIcon } from './ServiceIcon';

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="px-4 sm:px-7"
    >
      <div className="container py-24 lg:py-32">
        <Reveal>
          <SectionHeader
            eyebrow="Core services"
            titleId="services-title"
            title={<>AI agents and automations that pay for themselves.</>}
            description="Six production workflows we build, ship and operate — tailored to your stack, your team and your data."
          />
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {site.services.map((s, i) => (
            <Reveal key={s.id} delay={i * 70} as="li">
              <Card tone="dark" as="div">
                <div className="mb-6 flex size-11 items-center justify-center rounded-xl border border-line-2 bg-gradient-to-b from-white/[.08] to-white/[.02] text-white">
                  <ServiceIcon id={s.id} />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{s.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="relative pl-5 text-[14px] text-ink-2 before:absolute before:left-0 before:top-2.5 before:size-1.5 before:rounded-full before:bg-white/55"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
