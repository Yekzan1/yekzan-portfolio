import type { Dictionary } from "@/lib/dictionaries/types";
import { profile } from "@/lib/profile";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function About({ dict }: { dict: Dictionary }) {
  const facts = [
    {
      label: dict.about.education.label,
      lines: [dict.about.education.degree, dict.about.education.school, dict.about.education.period],
    },
    {
      label: dict.about.languages.label,
      lines: dict.about.languages.items.map((l) => `${l.name} — ${l.level}`),
    },
    { label: dict.about.violin.label, lines: [dict.about.violin.detail] },
    { label: "Localisation", lines: [profile.locationShort] },
  ];

  return (
    <Section id="about">
      <Container>
        <SectionHeading
          index="01"
          eyebrow={dict.about.eyebrow}
          title={dict.about.title}
          lead={dict.about.lead}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Narrative */}
          <div className="max-w-2xl">
            <div className="flex flex-col gap-6">
              {dict.about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <p className="text-[1.12rem] leading-[1.7] text-ink-2">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <blockquote className="mt-10 border-l-2 border-accent pl-6">
                <p className="font-display text-[1.6rem] italic leading-snug text-ink">
                  {dict.about.signature}
                </p>
                <cite className="eyebrow mt-3 block uppercase not-italic tracking-[0.14em]">
                  {dict.about.signatureSource}
                </cite>
              </blockquote>
            </Reveal>
          </div>

          {/* Colophon facts */}
          <Reveal delay={0.08}>
            <dl className="flex flex-col gap-8 lg:border-l lg:border-line lg:pl-12">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="eyebrow uppercase tracking-[0.14em] text-accent">{f.label}</dt>
                  <dd className="mt-2 flex flex-col gap-0.5">
                    {f.lines.map((line, i) => (
                      <span key={i} className={i === 0 ? "font-medium text-ink" : "text-ink-2"}>
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Ways of working — numbered editorial index, no cards/icons */}
        <dl className="mt-20 grid gap-x-14 gap-y-10 sm:grid-cols-2">
          {dict.about.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05}>
              <div className="border-t border-line pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow tnum text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <dt className="font-display text-xl text-ink">{card.title}</dt>
                </div>
                <dd className="mt-3 leading-relaxed text-ink-2">{card.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
