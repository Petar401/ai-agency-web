import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { site } from '@/content/site';

export function CaseStudies() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="px-4 sm:px-7"
    >
      <div className="container py-16 lg:py-24">
        <Reveal>
          <SectionHeader
            eyebrow="Work · examples"
            titleId="work-title"
            title="What this looks like in practice."
            description="Three illustrative builds — anonymised structures based on the kind of engagements we run. Real client studies replace these as they ship."
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {site.caseStudies.map((cs, i) => (
            <Reveal key={cs.id} delay={i * 80} as="li">
              <article className="on-dark relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel-2 p-7 text-white">
                <span className="absolute right-5 top-5 rounded-full border border-line-2 bg-white/[.04] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-ink-3">
                  example
                </span>
                <span className="text-[12px] uppercase tracking-[0.16em] text-ink-3">
                  {cs.tag.replace('[example] ', '')}
                </span>
                <div className="mt-7">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-ink-4">Problem</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{cs.problem}</p>
                </div>
                <div className="mt-5">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-ink-4">Solution</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{cs.solution}</p>
                </div>
                <div className="mt-5">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-ink-4">Outcome</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{cs.outcome}</p>
                </div>
                <div className="mt-auto flex items-end justify-between border-t border-line pt-5">
                  <span className="text-[12px] uppercase tracking-[0.16em] text-ink-4">
                    {cs.metric.label}
                  </span>
                  <span className="text-[34px] font-semibold leading-none tracking-tighter text-white">
                    {cs.metric.value}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
