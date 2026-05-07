import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Input, Select, Textarea } from '@/components/ui/Field';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* DARK PANEL — smoke test on dark surface */}
      <section className="px-4 pt-7 sm:px-7">
        <div className="on-dark relative mx-auto max-w-[1240px] overflow-hidden rounded-3xl bg-gradient-to-b from-[#0b0b0d] to-[#060607] p-6 text-white shadow-soft sm:p-12">
          <Reveal>
            <Badge>Phase 2 · Design system primitives</Badge>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-display-xl text-white">
              <span className="block">Tokens, primitives,</span>
              <span className="block bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">
                building blocks ready.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-[620px] text-base leading-relaxed text-ink-2 sm:text-[17px]">
              Buttons, badges, cards, section headers, reveal wrapper and form fields are wired to
              the design tokens. Sections, nav and 3D land in subsequent phases.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#sections">Primary CTA</Button>
              <Button variant="ghost" href="#fields">
                Secondary
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIGHT — cards smoke test */}
      <section id="sections" className="container py-24 lg:py-32">
        <Reveal>
          <SectionHeader
            eyebrow="Smoke test"
            title="Cards, headers and reveals."
            description="Each primitive is a server component except Reveal and Field — keeping view-source full for SEO."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Reveal delay={80}>
            <Card tone="dark">
              <h3 className="text-xl tracking-tight">Dark card</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Used inside dark panels (services, enterprise, CTA).
              </p>
            </Card>
          </Reveal>
          <Reveal delay={160}>
            <Card tone="light">
              <h3 className="text-xl tracking-tight">Light card</h3>
              <p className="mt-2 text-sm leading-relaxed text-panel/65">
                Used inside light sections (industries, process).
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* DARK — fields smoke test */}
      <section id="fields" className="px-4 pb-12 sm:px-7">
        <div className="on-dark relative mx-auto max-w-[1240px] overflow-hidden rounded-3xl bg-panel p-8 text-white sm:p-14">
          <SectionHeader
            tone="dark"
            eyebrow="Form field primitives"
            title="Inputs, selects and textareas."
          />
          <form className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
            <Input label="Name" name="name" placeholder="Your name" />
            <Input label="Email" name="email" type="email" placeholder="you@company.co.uk" />
            <Select label="Team size" name="size" defaultValue="1">
              <option value="1">1–10 (small business)</option>
              <option value="2">11–50</option>
              <option value="3">51–250 (internal agent)</option>
              <option value="4">250+</option>
            </Select>
            <Input label="Business" name="company" placeholder="Company name" />
            <div className="sm:col-span-2">
              <Textarea label="What should we automate?" name="message" rows={3} />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
