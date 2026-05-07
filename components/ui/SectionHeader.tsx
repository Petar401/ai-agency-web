import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
  /** id used for `aria-labelledby` */
  titleId?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  titleId,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            'mb-4 inline-block text-eyebrow uppercase',
            tone === 'dark' ? 'text-ink-3' : 'text-panel/55',
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        id={titleId}
        className={cn(
          'text-display-lg',
          tone === 'dark' ? 'text-white' : 'text-panel',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed sm:text-[17px]',
            tone === 'dark' ? 'text-ink-2' : 'text-panel/65',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
