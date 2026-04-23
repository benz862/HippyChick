import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md";
};

/** Raster logo from `/hippy-logo.png` (add `Hippy_Logo.png` → `site/public/hippy-logo.png`). */
export function SiteLogo({ className, size = "md" }: Props) {
  return (
    <Image
      src="/hippy-logo.png"
      alt="Hippy Chick Life"
      width={420}
      height={140}
      priority
      className={cn(
        "h-auto w-auto max-w-[200px] object-contain object-left md:max-w-[240px]",
        size === "sm" && "max-w-[170px] md:max-w-[200px]",
        className,
      )}
      sizes="(max-width: 768px) 200px, 240px"
    />
  );
}
