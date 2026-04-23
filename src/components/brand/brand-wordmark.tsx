import { cn } from "@/lib/utils";

const sizes = {
  sm: "text-[1.35rem] leading-[0.95] md:text-2xl",
  md: "text-3xl leading-[0.92] md:text-4xl",
  lg: "text-4xl leading-[0.9] md:text-5xl lg:text-[3.25rem]",
} as const;

type Props = {
  size?: keyof typeof sizes;
  className?: string;
};

/** Stacked groovy wordmark: plum / magenta / teal + gold peace accent */
export function BrandWordmark({ size = "md", className }: Props) {
  return (
    <div className={cn("relative inline-block select-none", sizes[size], className)}>
      <span
        className="pointer-events-none absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[var(--color-groovy-pink)]/70 blur-[1px]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -right-0.5 top-2 h-1.5 w-1.5 rounded-full bg-[var(--color-groovy-teal)]/80"
        aria-hidden
      />
      <div className="flex items-start gap-1.5">
        <div className="font-groovy tracking-tight">
          <span className="block -rotate-1 text-[var(--color-groovy-plum)] drop-shadow-sm">
            HIPPY
          </span>
          <span className="-mt-1 block pl-0.5 text-[var(--color-groovy-pink)] drop-shadow-sm [text-shadow:1px_1px_0_rgba(255,255,255,0.35)]">
            CHICK
          </span>
          <span className="-mt-1 block text-[var(--color-groovy-teal)] drop-shadow-sm">
            LIFE
          </span>
        </div>
        <PeaceAccent className="mt-1 h-8 w-8 shrink-0 md:h-9 md:w-9" />
      </div>
    </div>
  );
}

function PeaceAccent({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-[var(--color-groovy-gold)]", className)}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <circle
        cx="24"
        cy="24"
        r="19"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <path
        d="M24 9v30M24 20L10 40M24 20L38 40"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
