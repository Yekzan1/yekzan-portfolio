"use client";

import type { Dictionary } from "@/lib/dictionaries/types";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

function openAssistant() {
  window.dispatchEvent(new CustomEvent("open-assistant"));
}

export function AssistantSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="assistant" className="border-t border-line bg-paper-2">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow uppercase tracking-[0.14em] text-accent">
                {dict.assistant.eyebrow}
              </p>
              <p className="mt-3 font-display text-[1.5rem] leading-snug text-ink">
                {dict.assistant.title}
              </p>
            </div>
            <button
              type="button"
              onClick={openAssistant}
              className="ul-static group shrink-0 self-start pb-1 text-[0.95rem] font-medium text-ink sm:self-center"
            >
              {dict.assistant.open}
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
