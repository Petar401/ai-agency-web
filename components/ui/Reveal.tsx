'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  /** Delay in ms before fade-up plays once in view */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
};

export function Reveal({ children, delay = 0, className, as: As = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <As
      ref={ref as never}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(
        shown ? 'animate-fade-up' : 'opacity-0',
        'will-change-[transform,opacity]',
        className,
      )}
    >
      {children}
    </As>
  );
}
