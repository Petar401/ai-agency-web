import { Hero } from '@/components/hero/Hero';
import { Footer } from '@/components/nav/Footer';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        {/* Section anchors used by hero CTAs — populated in Phase 7 */}
        <section id="services" aria-hidden className="container py-16" />
        <section id="contact" aria-hidden className="container pb-16" />
      </main>
      <Footer />
    </>
  );
}
