import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-[0_8px_30px_-8px_var(--ring)] hover:shadow-[0_12px_40px_-6px_var(--ring)] hover:brightness-110 active:scale-[0.98]",
  secondary:
    "glass text-foreground hover:border-border-strong hover:bg-surface-strong active:scale-[0.98]",
  ghost: "text-muted hover:text-foreground",
};

type BaseProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };
type AnchorProps = BaseProps &
  Omit<ComponentProps<"a">, "className" | "children"> & { href: string };
type ButtonProps = BaseProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

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
