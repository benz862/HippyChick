import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-plum)]/70",
        className,
      )}
      {...props}
    />
  );
}
