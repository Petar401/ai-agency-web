import Link from 'next/link';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'light' | 'ghost' | 'outline';
type ButtonSize = 'md' | 'sm';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-[transform,background-color,border-color,color] duration-200 ease-out hover:-translate-y-px disabled:pointer-events-none disabled:opacity-50';

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  sm: 'h-9 px-4 text-[13px]',
};

const variants: Record<ButtonVariant, string> = {
  light: 'bg-white text-panel border border-white hover:bg-[#ececec]',
  ghost:
    'bg-white/[.06] text-white border border-line-2 hover:bg-white/[.12]',
  outline:
    'bg-transparent text-panel border border-panel/15 hover:border-panel/35 hover:bg-panel/5',
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = 'light',
    size = 'md',
    leadingIcon,
    trailingIcon,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      {leadingIcon ? <span className="-ml-0.5 flex">{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span className="-mr-0.5 flex">{trailingIcon}</span> : null}
    </>
  );

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as ComponentPropsWithoutRef<'a'> & { href: string };
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a {...anchorRest} href={href} className={classes} rel="noopener noreferrer" target="_blank">
          {content}
        </a>
      );
    }
    return (
      <Link {...(anchorRest as object)} href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button {...(rest as ComponentPropsWithoutRef<'button'>)} className={classes}>
      {content}
    </button>
  );
}

const Tag: ElementType = 'button';
Button.displayName = 'Button';
export { Tag as _ButtonTag };
