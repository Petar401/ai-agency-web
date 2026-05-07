import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { site } from '@/content/site';

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="container py-16 lg:py-24"
    >
      <Reveal>
        <SectionHeader
          eyebrow="How we work"
          titleId="process-title"
          title="Five weeks from idea to live agent."
          description="A repeatable sequence we run for every engagement — small enough to be predictable, structured enough to ship."
        />
      </Reveal>

      <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {site.process.map((step, i) => (
          <Reveal key={step.step} delay={i * 60} as="li">
            <article className="group relative h-full overflow-hidden rounded-2xl border border-panel/10 bg-white p-6 transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-panel/25 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.18)]">
              <span className="text-[12px] uppercase tracking-[0.18em] text-panel/40">
                {step.step}
              </span>
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-panel/65">{step.copy}</p>
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
