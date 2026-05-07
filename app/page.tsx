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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:text-panel focus:shadow-soft"
      >
        Skip to main content
      </a>
      <main id="main">
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
