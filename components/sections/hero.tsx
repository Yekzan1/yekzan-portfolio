import type { Dictionary } from "@/lib/dictionaries/types";
import { profile, stats } from "@/lib/profile";
import { Container } from "@/components/ui/section";
import { Button, Arrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      <Container>
        {/* Masthead line */}
        <Reveal>
          <div className="eyebrow flex items-center justify-between gap-4 border-b border-line pb-4 uppercase tracking-[0.14em]">
            <span className="text-ink">{profile.name}</span>
            <span className="hidden items-center gap-2 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {dict.hero.availability}
            </span>
            <span>{profile.locationShort}</span>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.06}>
          <h1 className="mt-10 max-w-[16ch] font-display font-normal leading-[1.0] tracking-[-0.025em] text-[clamp(2.6rem,8.5vw,5.7rem)] sm:mt-12">
            {dict.hero.titleLead}{" "}
            <em className="font-display italic text-accent">{dict.hero.titleAccent}</em>{" "}
            {dict.hero.titleTail}
          </h1>
        </Reveal>

        {/* Lower asymmetric row */}
        <div className="mt-14 grid gap-12 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-16">
          <Reveal delay={0.12}>
            <div>
              <p className="max-w-md text-pretty text-[1.15rem] leading-relaxed text-ink-2">
                {dict.hero.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button href="#work" size="lg">
                  {dict.hero.ctaPrimary}
                  <Arrow />
                </Button>
                <Button href={profile.cvPath} variant="link" size="lg" download>
                  {dict.hero.ctaSecondary} ↓
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Figures — magazine colophon */}
          <Reveal delay={0.18}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-7 border-t border-line pt-7 md:border-l md:border-t-0 md:pl-12 md:pt-1">
              {stats.map((s) => (
                <div key={s.labelKey} className="flex flex-col gap-1">
                  <dt className="stat-num font-display text-[2.6rem] font-normal leading-none text-ink">
                    {s.value}
                  </dt>
                  <dd className="text-sm leading-snug text-ink-3">
                    {dict.hero.statsLabels[s.labelKey as keyof typeof dict.hero.statsLabels]}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
