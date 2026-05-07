import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { site } from '@/content/site';

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="container py-16 lg:py-24"
    >
      <Reveal>
        <SectionHeader
          eyebrow="What clients say · placeholders"
          titleId="testimonials-title"
          title="Voices from the businesses we run with."
          description="These quotes are illustrative until our first wave of public client testimonials are signed off — clearly tagged below."
        />
      </Reveal>

      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {site.testimonials.map((t, i) => (
          <Reveal key={t.id} delay={i * 80} as="li">
            <figure className="relative h-full overflow-hidden rounded-2xl border border-panel/10 bg-white p-7">
              <span className="absolute right-5 top-5 rounded-full border border-panel/15 bg-panel/[.04] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-panel/45">
                placeholder
              </span>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
                className="text-panel/15"
              >
                <path d="M7 7h4v4H7v3a3 3 0 0 0 3 3v2a5 5 0 0 1-5-5V9a2 2 0 0 1 2-2zm10 0h4v4h-4v3a3 3 0 0 0 3 3v2a5 5 0 0 1-5-5V9a2 2 0 0 1 2-2z" />
              </svg>
              <blockquote className="mt-3 text-[16px] leading-relaxed text-panel">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-panel/10 pt-4 text-sm">
                <strong className="text-panel">{t.author}</strong>
                <span className="text-panel/55"> · {t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
