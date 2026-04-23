import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-white/70 bg-white/75 p-8 shadow-[var(--shadow-soft)] backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
