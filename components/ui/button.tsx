import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "link";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 font-medium tracking-tight transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Variant, Record<Size, string>> = {
  primary: { md: "h-11 px-6 text-sm rounded-sm", lg: "h-13 px-7 text-[0.95rem] rounded-sm" },
  outline: { md: "h-11 px-6 text-sm rounded-sm", lg: "h-13 px-7 text-[0.95rem] rounded-sm" },
  link: { md: "text-sm", lg: "text-[0.95rem]" },
};

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-deep active:translate-y-px",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper active:translate-y-px",
  link: "ul-static pb-0.5 text-ink",
};

type BaseProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };
type AnchorProps = BaseProps &
  Omit<ComponentProps<"a">, "className" | "children"> & { href: string };
type ButtonProps = BaseProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, sizes[variant][size], variants[variant], className);

  if (typeof rest.href === "string") {
    return (
      <a className={classes} {...(rest as unknown as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as unknown as ComponentProps<"button">)}>
      {children}
    </button>
  );
}

/** Small inline arrow that nudges on hover — used across editorial CTAs. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
      className={cn("h-4 w-4 transition-transform duration-300 group-hover:translate-x-1", className)}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
