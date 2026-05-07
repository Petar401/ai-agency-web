import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { site } from '@/content/site';

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="container py-16 lg:py-24"
    >
      <Reveal>
        <SectionHeader
          eyebrow="FAQ"
          titleId="faq-title"
          title="Honest answers to the questions we get most."
        />
      </Reveal>

      <div className="mt-12 grid gap-3 lg:grid-cols-2">
        {site.faq.map((entry, i) => (
          <Reveal key={entry.q} delay={(i % 2) * 60} as="div">
            <details className="group rounded-2xl border border-panel/10 bg-white px-6 py-5 transition-[border-color,box-shadow] open:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.18)] [&[open]]:border-panel/25">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium tracking-tight text-panel">
                <span>{entry.q}</span>
                <span
                  aria-hidden
                  className="ml-auto inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-panel/15 text-panel/55 transition-transform group-open:rotate-45"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-panel/65">{entry.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
