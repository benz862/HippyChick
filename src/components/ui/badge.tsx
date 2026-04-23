import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
  {
    variants: {
      tone: {
        plum: "bg-[color-mix(in_srgb,var(--color-plum)_10%,white)] text-[var(--color-plum)]",
        teal: "bg-[color-mix(in_srgb,var(--color-teal)_14%,white)] text-[var(--color-teal)]",
        magenta:
          "bg-[color-mix(in_srgb,var(--color-magenta)_16%,white)] text-[var(--color-magenta)]",
        gold: "bg-[color-mix(in_srgb,var(--color-gold)_22%,white)] text-[color-mix(in_srgb,var(--color-gold)_55%,black)]",
        purple:
          "bg-[color-mix(in_srgb,var(--color-purple)_18%,white)] text-[var(--color-purple)]",
        coral:
          "bg-[color-mix(in_srgb,var(--color-coral)_18%,white)] text-[var(--color-coral)]",
      },
    },
    defaultVariants: { tone: "plum" },
  },
);

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props} />
  );
}
