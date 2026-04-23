import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-plum)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)] disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-plum)] text-white shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft-lg)]",
        secondary:
          "border border-[color-mix(in_srgb,var(--color-plum)_18%,transparent)] bg-white/90 text-[var(--color-plum)] hover:bg-white",
        ghost:
          "text-[var(--color-plum)] hover:bg-[color-mix(in_srgb,var(--color-plum)_6%,white)]",
        groovyPink:
          "bg-[var(--color-groovy-pink)] text-white shadow-md hover:-translate-y-0.5 hover:brightness-[1.05]",
        groovyTeal:
          "bg-[var(--color-groovy-teal)] text-white shadow-md hover:-translate-y-0.5 hover:brightness-[1.05]",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
  };

export function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
