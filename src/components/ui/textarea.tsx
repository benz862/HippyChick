import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-[140px] w-full rounded-2xl border border-[color-mix(in_srgb,var(--color-plum)_12%,transparent)] bg-white/90 px-4 py-3 text-sm text-[var(--color-espresso)] shadow-inner shadow-black/[0.02] outline-none transition focus:border-[color-mix(in_srgb,var(--color-magenta)_45%,transparent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-magenta)_25%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}
