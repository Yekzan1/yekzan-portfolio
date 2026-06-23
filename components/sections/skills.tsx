import type { Dictionary } from "@/lib/dictionaries/types";
import { skillGroups } from "@/lib/profile";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Skills({ dict }: { dict: Dictionary }) {
  return (
    <Section id="skills" tint>
      <Container>
        <SectionHeading
          index="02"
          eyebrow={dict.skills.eyebrow}
          title={dict.skills.title}
          lead={dict.skills.lead}
        />

        <dl className="mt-14 border-t border-line">
          {skillGroups.map((group, i) => {
            const title = dict.skills.groups[group.id as keyof typeof dict.skills.groups];
            return (
              <Reveal key={group.id} delay={Math.min(i * 0.03, 0.18)}>
                <div className="grid gap-3 border-b border-line py-6 sm:grid-cols-[220px_1fr] sm:gap-10 sm:py-7">
                  <dt className="flex items-baseline gap-4">
                    <span className="eyebrow tnum text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.3rem] leading-tight text-ink">{title}</span>
                  </dt>
                  <dd className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[1.05rem] sm:pt-1">
                    {group.items.map((item, idx) => (
                      <span key={item} className="inline-flex items-center gap-5">
                        {idx > 0 && (
                          <span className="text-line-strong" aria-hidden>
                            ·
                          </span>
                        )}
                        <span className="text-ink-2 transition-colors hover:text-accent">{item}</span>
                      </span>
                    ))}
                  </dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </Section>
  );
}
