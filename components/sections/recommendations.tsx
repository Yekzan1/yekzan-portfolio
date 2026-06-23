import type { Dictionary } from "@/lib/dictionaries/types";
import { recommenders } from "@/lib/profile";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Recommendations({ dict }: { dict: Dictionary }) {
  return (
    <Section id="recommendations">
      <Container>
        <SectionHeading
          index="04"
          eyebrow={dict.recommendations.eyebrow}
          title={dict.recommendations.title}
          lead={dict.recommendations.lead}
        />

        <div className="mt-16 flex flex-col">
          {recommenders.map((rec, i) => {
            const quote =
              dict.recommendations.quotes[rec.id as keyof typeof dict.recommendations.quotes];
            return (
              <Reveal key={rec.id}>
                <figure className="grid gap-6 border-t border-line py-12 md:grid-cols-[1fr_2.1fr] md:gap-14">
                  <figcaption className="flex flex-col">
                    <span className="eyebrow tnum text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-4 font-display text-xl text-ink">{rec.name}</span>
                    <span className="mt-1 text-ink-2">{rec.role}</span>
                    <span className="eyebrow mt-4 uppercase tracking-[0.14em] text-ink-3">
                      {dict.recommendations.verified}
                    </span>
                  </figcaption>

                  <blockquote className="relative">
                    <span
                      className="absolute -left-1 -top-6 font-display text-6xl leading-none text-accent/30 select-none"
                      aria-hidden
                    >
                      &ldquo;
                    </span>
                    <p className="font-display text-[clamp(1.35rem,2.5vw,1.85rem)] italic leading-[1.4] text-ink">
                      {quote}
                    </p>
                  </blockquote>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
