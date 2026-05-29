"use client";

import { useState } from "react";
import { Check, Copy, Download, Mail, MapPin, Phone, Send } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/types";
import { profile } from "@/lib/profile";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

function CopyButton({ value, copy, copied }: { value: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  }
  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
      aria-label={done ? copied : copy}
    >
      {done ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
      {done ? copied : copy}
    </button>
  );
}

export function Contact({ dict }: { dict: Dictionary }) {
  const items = [
    {
      icon: Mail,
      label: dict.contact.emailLabel,
      value: profile.email,
      href: `mailto:${profile.email}`,
      copyable: true,
    },
    {
      icon: Phone,
      label: dict.contact.phoneLabel,
      value: profile.phoneDisplay,
      href: `tel:${profile.phoneIntl}`,
      copyable: true,
    },
    {
      icon: MapPin,
      label: dict.contact.locationLabel,
      value: profile.locationShort,
      href: undefined,
      copyable: false,
    },
  ];

  return (
    <Section id="contact">
      <Container>
        <SectionHeading
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
          lead={dict.contact.lead}
          align="center"
          className="items-center"
        />

        <Reveal delay={0.05}>
          <div className="mx-auto mt-7 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {dict.contact.availability}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "card-hover flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5",
                )}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background-soft text-accent">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-2">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-0.5 block break-words text-sm font-medium transition-colors hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 break-words text-sm font-medium">{item.value}</p>
                  )}
                </div>
                {item.copyable && (
                  <div className="mt-auto pt-1">
                    <CopyButton value={item.value} copy={dict.contact.copy} copied={dict.contact.copied} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Button href={`mailto:${profile.email}`} size="lg">
                <Send className="h-4 w-4" />
                {dict.contact.cta}
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button href={profile.cvPath} variant="secondary" size="lg" download>
                <Download className="h-4 w-4" />
                {dict.contact.downloadCv}
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
