import { Button } from '@/components/ui/Button';
import { site } from '@/content/site';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="relative z-30 flex items-center gap-5 px-1 py-2">
      <Logo tone="dark" />

      <nav aria-label="Primary" className="ml-9 hidden flex-1 items-center gap-7 lg:flex">
        {site.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm text-ink-2 transition-colors hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="ml-auto hidden lg:block">
        <Button href="#contact" size="sm">
          Book audit
        </Button>
      </div>

      <MobileMenu items={site.nav} />
    </header>
  );
}
