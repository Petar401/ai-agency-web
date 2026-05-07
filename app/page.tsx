import { Hero } from '@/components/hero/Hero';
import { Footer } from '@/components/nav/Footer';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { CTA } from '@/components/sections/CTA';
import { Enterprise } from '@/components/sections/Enterprise';
import { FAQ } from '@/components/sections/FAQ';
import { Industries } from '@/components/sections/Industries';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <Industries />
        <Enterprise />
        <Process />
        <CaseStudies />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
