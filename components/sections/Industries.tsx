import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { site } from '@/content/site';

export function Industries() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-title"
      className="container py-16 lg:py-24"
    >
      <Reveal>
        <SectionHeader
          eyebrow="Where this works"
          titleId="industries-title"
          title="Built for businesses that run on people."
          description="The same automation patterns adapt across industries. Here are the ones we know best."
        />
      </Reveal>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {site.industries.map((ind, i) => (
          <Reveal key={ind.id} delay={i * 60} as="li">
            <Card tone="light" as="div" className="p-6">
              <h3 className="text-[17px] font-semibold tracking-tight text-panel">{ind.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-panel/65">{ind.blurb}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
