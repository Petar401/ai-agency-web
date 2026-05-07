import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Enterprise() {
  return (
    <section
      id="enterprise"
      aria-labelledby="enterprise-title"
      className="px-4 sm:px-7"
    >
      <div className="container py-16 lg:py-24">
        <div className="on-dark relative overflow-hidden rounded-3xl bg-panel p-8 text-white sm:p-14 lg:p-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_80%_0%,rgba(255,255,255,0.07),transparent_60%)]"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            <Reveal>
              <SectionHeader
                tone="dark"
                eyebrow="For larger companies"
                titleId="enterprise-title"
                title="Your private internal AI. Trained on the way you work."
                description="For 50+ person teams we build a private AI agent that lives inside your stack — Slack, Teams, your CRM, your wiki, your warehouse. It answers staff questions, drafts documents, runs reports and triggers workflows on demand."
              />
              <ul className="mt-7 space-y-3 text-[15px] leading-relaxed text-ink-2">
                {[
                  'Private deployment — your data stays in your tenant',
                  'Connectors for HubSpot, Salesforce, Notion, Google, Slack, Teams',
                  'Role-based access and a full audit trail',
                  'Onboarded against your SOPs and brand voice',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 inline-flex size-4 shrink-0 items-center justify-center rounded border border-line-2 bg-white/[.06]">
                      <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="m3.5 8 3 3 6-7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="#contact">Talk to an engineer</Button>
              </div>
            </Reveal>

            {/* Terminal mock */}
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-2xl border border-line-2 bg-[#060607] shadow-soft">
                <div className="flex items-center gap-2 border-b border-line bg-white/[.02] px-4 py-3">
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="ml-auto text-[12px] uppercase tracking-[0.12em] text-ink-3">
                    internal-agent
                  </span>
                </div>
                <div className="space-y-3.5 px-5 py-5 text-[13.5px] leading-relaxed text-ink-2">
                  <p>
                    <span className="font-semibold text-white">@sarah</span> summarise Q1 vs Q2
                    sales by region
                  </p>
                  <p className="rounded-xl border border-line bg-white/[.04] px-4 py-3">
                    <span className="mr-2 inline-block rounded bg-white px-1.5 py-0.5 align-middle text-[10px] tracking-[0.18em] text-panel">
                      AI
                    </span>
                    Pulled from Salesforce + Stripe. <strong className="text-white">UK East</strong> +18% ·{' '}
                    <strong className="text-white">UK South</strong> +6% ·{' '}
                    <strong className="text-white">Midlands</strong> -3%. Drafted a 1-page brief —
                    sent to <span className="text-white">#sales-leads</span>.
                  </p>
                  <p>
                    <span className="font-semibold text-white">@james</span> draft an SOW for the
                    Cromer client
                  </p>
                  <p className="rounded-xl border border-line bg-white/[.04] px-4 py-3">
                    <span className="mr-2 inline-block rounded bg-white px-1.5 py-0.5 align-middle text-[10px] tracking-[0.18em] text-panel">
                      AI
                    </span>
                    Done. Using your standard template + Cromer scope notes from Notion. Ready in
                    Drive.
                  </p>
                  <p className="h-4">
                    <span className="inline-block h-3.5 w-2 animate-blink bg-white align-middle" />
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
