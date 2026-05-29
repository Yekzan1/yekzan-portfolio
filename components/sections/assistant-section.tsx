"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/types";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

function openAssistant(question?: string) {
  window.dispatchEvent(new CustomEvent("open-assistant", { detail: { question } }));
}

export function AssistantSection({ dict }: { dict: Dictionary }) {
  return (
    <Section id="assistant">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-12 sm:px-12 sm:py-16">
            {/* Glow */}
            <div
              aria-hidden
              className="absolute left-1/2 top-0 h-64 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[100px]"
              style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
            />

            <div className="relative flex flex-col items-center text-center">
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="grid h-16 w-16 place-items-center rounded-2xl border border-border bg-background-soft text-accent shadow-[0_8px_30px_-8px_var(--ring)]"
              >
                <Sparkles className="h-8 w-8" />
              </motion.span>

              <SectionHeading
                eyebrow={dict.assistant.eyebrow}
                title={dict.assistant.title}
                lead={dict.assistant.lead}
                align="center"
                className="mt-6 items-center"
              />

              <button
                type="button"
                onClick={() => openAssistant()}
                className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground shadow-[0_8px_30px_-8px_var(--ring)] transition-all hover:brightness-110 active:scale-[0.98]"
              >
                {dict.assistant.open}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {dict.assistant.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => openAssistant(s)}
                    className="rounded-full border border-border bg-background-soft px-3.5 py-2 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
