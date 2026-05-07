import Link from 'next/link';
import { cn } from '@/lib/cn';
import { site } from '@/content/site';

type LogoProps = {
  className?: string;
  tone?: 'dark' | 'light';
};

export function Logo({ className, tone = 'dark' }: LogoProps) {
  const isDark = tone === 'dark';
  return (
    <Link
      href="/"
      aria-label={`${site.brand.name} — home`}
      className={cn(
        'inline-flex items-center gap-2.5 font-semibold tracking-tight',
        isDark ? 'text-white' : 'text-panel',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'flex size-7 items-center justify-center rounded-lg border',
          isDark
            ? 'border-line-2 bg-gradient-to-b from-white/[.18] to-white/[.04] text-white'
            : 'border-panel/15 bg-gradient-to-b from-white to-panel/[.04] text-panel',
        )}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        </svg>
      </span>
      <span className="text-[18px]">{site.brand.name}</span>
    </Link>
  );
}
