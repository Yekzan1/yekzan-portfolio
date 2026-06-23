"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries/types";
import { profile } from "@/lib/profile";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button, Arrow } from "@/components/ui/button";

function CopyEmail({ value, copy, copied }: { value: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          /* ignore */
        }
      }}
      className="eyebrow uppercase tracking-[0.14em] text-ink-3 transition-colors hover:text-accent"
    >
      {done ? copied : copy}
    </button>
  );
}

export function Contact({ dict }: { dict: Dictionary }) {
  const colophon = [
    { label: dict.contact.phoneLabel, value: profile.phoneDisplay, href: `tel:${profile.phoneIntl}` },
    { label: dict.contact.locationLabel, value: profile.locationShort, href: undefined },
    ...profile.socials.map((s) => ({ label: s.label, value: "@" + s.href.split("/").pop(), href: s.href })),
    { label: dict.contact.availability, value: "—", href: undefined, availability: true },
  ];

  return (
    <Section id="contact">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              index="05"
              eyebrow={dict.contact.eyebrow}
              title={dict.contact.title}
              lead={dict.contact.lead}
            />

            <Reveal delay={0.1}>
              <div className="mt-12">
                <a
                  href={`mailto:${profile.email}`}
                  className="ul-static inline-block break-all font-display text-[clamp(1.6rem,4.5vw,2.6rem)] leading-tight text-ink"
                >
                  {profile.email}
                </a>
                <div className="mt-3">
                  <CopyEmail value={profile.email} copy={dict.contact.copy} copied={dict.contact.copied} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button href={`mailto:${profile.email}`} size="lg">
                  {dict.contact.cta}
                  <Arrow />
                </Button>
                <Button href={profile.cvPath} variant="link" size="lg" download>
                  {dict.contact.downloadCv} ↓
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Colophon */}
          <Reveal delay={0.12}>
            <dl className="flex flex-col gap-7 lg:border-l lg:border-line lg:pl-12">
              {colophon.map((c) => (
                <div key={c.label}>
                  <dt className="eyebrow uppercase tracking-[0.14em] text-accent">{c.label}</dt>
                  <dd className="mt-1.5 text-[1.05rem] text-ink">
                    {"availability" in c && c.availability ? (
                      <span className="inline-flex items-center gap-2 text-ink-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                        {dict.contact.availability}
                      </span>
                    ) : c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="ul-link transition-colors hover:text-accent"
                      >
                        {c.value}
                      </a>
                    ) : (
                      c.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
