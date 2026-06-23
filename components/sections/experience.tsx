import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/dictionaries/types";
import { experiences } from "@/lib/profile";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

function formatMonth(ym: string, locale: Locale): string {
  const [y, m] = ym.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function Experience({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section id="work">
      <Container>
        <SectionHeading
          index="03"
          eyebrow={dict.work.eyebrow}
          title={dict.work.title}
          lead={dict.work.lead}
        />

        <div className="mt-14 border-t border-line">
          {experiences.map((exp) => {
            const item = dict.work.items[exp.id];
            const period = `${formatMonth(exp.period.start, locale)} — ${formatMonth(exp.period.end, locale)}`;
            return (
              <Reveal key={exp.id}>
                <article className="grid gap-5 border-b border-line py-9 md:grid-cols-[170px_1fr] md:gap-12 lg:py-11">
                  {/* Period + place */}
                  <div className="flex flex-col gap-1">
                    <span className="eyebrow tnum text-ink">{period}</span>
                    <span className="eyebrow">{exp.location}</span>
                  </div>

                  {/* Detail */}
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-[1.7rem] leading-tight text-ink">
                        {exp.company}
                      </h3>
                      <span className="eyebrow uppercase tracking-[0.14em] text-accent">
                        {item.role}
                      </span>
                    </div>

                    <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-2">
                      {item.summary}
                    </p>

                    <ul className="mt-5 flex max-w-2xl flex-col gap-2.5">
                      {item.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-3 text-ink-2">
                          <span className="mt-px shrink-0 text-accent" aria-hidden>
                            —
                          </span>
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="eyebrow mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
                      {exp.tech.map((t) => (
                        <li key={t} className="text-ink-3">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
