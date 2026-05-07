import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardProps = {
  children: ReactNode;
  className?: string;
  tone?: 'dark' | 'light';
  as?: 'div' | 'article' | 'section' | 'li';
};

export function Card({ children, className, tone = 'dark', as: As = 'article' }: CardProps) {
  const toneClasses =
    tone === 'dark'
      ? 'bg-panel-2 text-white border-line on-dark'
      : 'bg-white text-panel border-panel/10';
  return (
    <As
      className={cn(
        'group relative overflow-hidden rounded-2xl border p-7 transition-[transform,border-color] duration-300 ease-out',
        'hover:-translate-y-0.5',
        toneClasses,
        tone === 'dark' && 'hover:border-white/20',
        tone === 'light' && 'hover:border-panel/25',
        className,
      )}
    >
      {tone === 'dark' ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-px rounded-[calc(theme(borderRadius.2xl)-1px)] bg-[radial-gradient(450px_200px_at_0%_0%,rgba(255,255,255,0.07),transparent_60%)]"
        />
      ) : null}
      <div className="relative">{children}</div>
    </As>
  );
}
