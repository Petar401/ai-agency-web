import Link from 'next/link';
import { site } from '@/content/site';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer id="footer" className="container pb-12 pt-12 lg:pt-16">
      <div className="grid gap-10 border-t border-panel/10 pt-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-panel/65">
            {site.footer.tagline}
          </p>
          <div className="mt-5 space-y-1 text-sm text-panel">
            <a className="block hover:underline" href={`mailto:${site.brand.email}`}>
              {site.brand.email}
            </a>
            <a className="block hover:underline" href={`tel:${site.brand.phone.replace(/\s+/g, '')}`}>
              {site.brand.phone}
            </a>
            <span className="block text-panel/55">
              {site.brand.address.street}, {site.brand.address.locality} {site.brand.address.postcode}, UK
            </span>
          </div>
        </div>

        {site.footer.columns.map((col) => (
          <div key={col.heading}>
            <h5 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-panel/55">
              {col.heading}
            </h5>
            <ul className="space-y-2 text-[14px] text-panel/85">
              {col.links.map((l) => {
                const isHash = l.href.startsWith('#');
                if (isHash) {
                  return (
                    <li key={l.label}>
                      <a className="block py-0.5 hover:text-panel" href={l.href}>
                        {l.label}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={l.label}>
                    <Link className="block py-0.5 hover:text-panel" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-2 text-[13px] text-panel/55 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {site.brand.name}. All rights reserved.</span>
        <span>Made in Norwich.</span>
      </div>
    </footer>
  );
}
