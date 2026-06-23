import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}>{children}</div>
  );
}

/** Magazine-style numbered label, e.g. "01 — À propos". */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-3", className)}>
      {index && <span className="tnum text-ink">{index}</span>}
      <span className="h-px w-7 bg-line-strong" aria-hidden />
      <span className="uppercase tracking-[0.14em]">{children}</span>
    </span>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col", className)}>
      <Reveal>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-6 max-w-3xl text-pretty font-display font-normal leading-[1.06] tracking-[-0.02em] text-[clamp(1.9rem,4.6vw,3.4rem)]">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-ink-2">
            {lead}
          </p>
        </Reveal>
      )}
    </header>
  );
}

export function Section({
  id,
  children,
  className,
  tint,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  /** warm paper tint for alternating sections */
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-20 sm:py-28 lg:py-32", tint && "bg-paper-2", className)}
    >
      {children}
    </section>
  );
}
