import { Compass, Layers, Rocket, Crosshair, GraduationCap, Languages, Music } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/types";
import { profile } from "@/lib/profile";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const CARD_ICONS = [Compass, Layers, Rocket, Crosshair];

export function About({ dict }: { dict: Dictionary }) {
  return (
    <Section id="about">
      <Container>
        <SectionHeading eyebrow={dict.about.eyebrow} title={dict.about.title} lead={dict.about.lead} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          {/* Narrative */}
          <div className="flex flex-col gap-6">
            {dict.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-lg leading-relaxed text-muted [&>strong]:text-foreground">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.1}>
              <blockquote className="mt-2 border-l-2 border-accent/60 pl-5">
                <p className="font-serif text-xl italic leading-snug text-foreground">
                  {dict.about.signature}
                </p>
                <cite className="mt-2 block text-sm not-italic text-muted-2">
                  {dict.about.signatureSource}
                </cite>
              </blockquote>
            </Reveal>
          </div>

          {/* Identity panel */}
          <Reveal delay={0.1}>
            <aside className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-7">
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
              />
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-lg font-semibold text-accent-foreground shadow-[0_8px_24px_-8px_var(--ring)]">
                  {profile.initials}
                </span>
                <div>
                  <p className="text-base font-semibold tracking-tight">{profile.name}</p>
                  <p className="text-sm text-muted">{profile.locationShort}</p>
                </div>
              </div>

              <dl className="mt-7 flex flex-col gap-5 text-sm">
                <div className="flex gap-3">
                  <GraduationCap className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-2">
                      {dict.about.education.label}
                    </dt>
                    <dd className="mt-1 font-medium leading-snug">{dict.about.education.degree}</dd>
                    <dd className="text-muted">{dict.about.education.school}</dd>
                    <dd className="text-muted-2">{dict.about.education.period}</dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Languages className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-2">
                      {dict.about.languages.label}
                    </dt>
                    <dd className="mt-1 flex flex-wrap gap-2">
                      {dict.about.languages.items.map((l) => (
                        <span
                          key={l.name}
                          className="rounded-full border border-border bg-background-soft px-2.5 py-1 text-xs"
                        >
                          {l.name} · <span className="text-muted">{l.level}</span>
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Music className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-2">
                      {dict.about.violin.label}
                    </dt>
                    <dd className="mt-1 text-muted">{dict.about.violin.detail}</dd>
                  </div>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>

        {/* Value props */}
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.about.cards.map((card, i) => {
            const Icon = CARD_ICONS[i % CARD_ICONS.length];
            return (
              <RevealItem key={card.title}>
                <div className="card-hover h-full rounded-2xl border border-border bg-surface p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{card.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
