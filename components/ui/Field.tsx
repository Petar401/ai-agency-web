'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '@/lib/cn';

const inputBase =
  'w-full rounded-xl border border-line-2 bg-white/[.04] px-4 py-3 text-[15px] text-white placeholder:text-ink-4 transition-[border-color,background-color] focus:outline-none focus:border-white/40 focus:bg-white/[.07]';

type LabelProps = {
  children: ReactNode;
  htmlFor: string;
  className?: string;
};

function FieldLabel({ children, htmlFor, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('mb-1.5 block text-[12px] uppercase tracking-[0.04em] text-ink-3', className)}
    >
      {children}
    </label>
  );
}

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className, ...rest }: InputProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const errorId = `${inputId}-error`;
  return (
    <div className="flex flex-col">
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <input
        id={inputId}
        className={cn(inputBase, error && 'border-red-400/60', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-[12px] text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextareaProps = ComponentPropsWithoutRef<'textarea'> & {
  label: string;
  error?: string;
};

export function Textarea({ label, error, id, className, ...rest }: TextareaProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const errorId = `${inputId}-error`;
  return (
    <div className="flex flex-col">
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <textarea
        id={inputId}
        className={cn(inputBase, 'min-h-[96px] resize-y', error && 'border-red-400/60', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-[12px] text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SelectProps = ComponentPropsWithoutRef<'select'> & {
  label: string;
  error?: string;
  children: ReactNode;
};

export function Select({ label, error, id, className, children, ...rest }: SelectProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const errorId = `${inputId}-error`;
  return (
    <div className="flex flex-col">
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <select
        id={inputId}
        className={cn(
          inputBase,
          'appearance-none bg-[linear-gradient(45deg,transparent_50%,#fff_50%),linear-gradient(135deg,#fff_50%,transparent_50%)] bg-[length:5px_5px] bg-[position:calc(100%-18px)_center,calc(100%-13px)_center] bg-no-repeat pr-10',
          error && 'border-red-400/60',
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      >
        {children}
      </select>
      {error ? (
        <p id={errorId} className="mt-1.5 text-[12px] text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
