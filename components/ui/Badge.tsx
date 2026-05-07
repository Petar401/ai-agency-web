import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeProps = {
  children: ReactNode;
  className?: string;
  withDot?: boolean;
};

export function Badge({ children, className, withDot = true }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line-2 bg-gradient-to-b from-white/[.06] to-white/[.02] px-4 py-2 text-[13px] text-ink-2',
        className,
      )}
    >
      {withDot ? (
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.1)]"
        />
      ) : null}
      {children}
    </span>
  );
}
