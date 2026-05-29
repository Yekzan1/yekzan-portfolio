import { MapPin } from "lucide-react";
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
        <SectionHeading eyebrow={dict.work.eyebrow} title={dict.work.title} lead={dict.work.lead} />

        <div className="relative mt-14">
          {/* Timeline spine */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/70 via-border to-transparent sm:left-[9px]"
          />

          <ol className="flex flex-col gap-3">
            {experiences.map((exp, i) => {
              const item = dict.work.items[exp.id];
              const period = `${formatMonth(exp.period.start, locale)} — ${formatMonth(exp.period.end, locale)}`;
              return (
                <li key={exp.id} className="relative pl-8 sm:pl-12">
                  {/* Node */}
                  <span
                    className="absolute left-0 top-6 grid h-4 w-4 place-items-center rounded-full border border-accent/50 bg-background sm:left-0.5"
                    aria-hidden
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--ring)]" />
                  </span>

                  <Reveal delay={Math.min(i * 0.04, 0.2)}>
                    <article className="card-hover rounded-2xl border border-border bg-surface p-5 sm:p-6">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-lg font-semibold tracking-tight">{exp.company}</h3>
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-2">
                          {period}
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <span className="font-medium text-accent">{item.role}</span>
                        <span className="inline-flex items-center gap-1 text-muted-2">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>

                      <ul className="mt-4 flex flex-col gap-2">
                        {item.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                          <li
                            key={t}
                            className="rounded-md border border-border bg-background-soft px-2 py-0.5 text-xs text-muted-2"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
