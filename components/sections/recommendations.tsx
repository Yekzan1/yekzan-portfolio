import { BadgeCheck, Quote } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/types";
import { recommenders } from "@/lib/profile";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function Recommendations({ dict }: { dict: Dictionary }) {
  return (
    <Section id="recommendations" className="bg-background-soft/40">
      <Container>
        <SectionHeading
          eyebrow={dict.recommendations.eyebrow}
          title={dict.recommendations.title}
          lead={dict.recommendations.lead}
        />

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {recommenders.map((rec) => {
            const quote = dict.recommendations.quotes[rec.id as keyof typeof dict.recommendations.quotes];
            return (
              <RevealItem key={rec.id} className="h-full">
                <figure className="card-hover relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-7">
                  <Quote className="h-8 w-8 text-accent/30" aria-hidden />

                  <blockquote className="mt-4 flex-1">
                    <p className="text-pretty font-serif text-lg italic leading-relaxed text-foreground/90">
                      {quote}
                    </p>
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                      {rec.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold tracking-tight">{rec.name}</p>
                      <p className="truncate text-xs text-muted">{rec.role}</p>
                    </div>
                    <span
                      className="ml-auto inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[0.65rem] font-medium text-emerald-400"
                      title={dict.recommendations.verified}
                    >
                      <BadgeCheck className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{dict.recommendations.verified}</span>
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
