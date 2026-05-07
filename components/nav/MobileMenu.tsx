'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type Item = { label: string; href: string };

type MobileMenuProps = {
  items: ReadonlyArray<Item>;
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
        return;
      }
      if (e.key === 'Tab' && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <div className="ml-auto lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-10 items-center justify-center rounded-xl border border-line-2 bg-white/[.04] transition-colors hover:bg-white/[.08]"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="text-white">
          {open ? (
            <>
              <path d="M6 6l12 12" />
              <path d="M18 6 6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h10" />
            </>
          )}
        </svg>
      </button>

      <div
        id="mobile-menu"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          'fixed inset-0 z-40 transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <div
          className={cn(
            'absolute left-3 right-3 top-3 rounded-2xl border border-line-2 bg-panel p-3 transition-transform',
            open ? 'translate-y-0' : '-translate-y-3',
          )}
        >
          <div className="flex items-center justify-between p-3">
            <span className="text-[12px] uppercase tracking-[0.18em] text-ink-3">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-line-2 bg-white/[.04]"
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="text-white">
                <path d="M6 6l12 12" />
                <path d="M18 6 6 18" />
              </svg>
            </button>
          </div>
          <ul className="mt-1 divide-y divide-line">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-3 py-4 text-[15px] text-white"
                >
                  <span>{item.label}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-ink-3">
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="px-3 pb-3 pt-2">
            <Button href="#contact" className="w-full" onClick={() => setOpen(false)}>
              Book a free audit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
