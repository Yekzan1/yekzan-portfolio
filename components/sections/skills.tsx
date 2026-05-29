import {
  Code2,
  Server,
  Database,
  ShoppingCart,
  Cpu,
  Network,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/types";
import { skillGroups } from "@/lib/profile";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const GROUP_ICONS: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  data: Database,
  cms: ShoppingCart,
  systems: Cpu,
  network: Network,
  seo: Search,
  tools: Wrench,
};

export function Skills({ dict }: { dict: Dictionary }) {
  return (
    <Section id="skills" className="bg-background-soft/40">
      <Container>
        <SectionHeading eyebrow={dict.skills.eyebrow} title={dict.skills.title} lead={dict.skills.lead} />

        <RevealGroup
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.06}
        >
          {skillGroups.map((group) => {
            const Icon = GROUP_ICONS[group.id] ?? Code2;
            const title = dict.skills.groups[group.id as keyof typeof dict.skills.groups];
            return (
              <RevealItem key={group.id}>
                <div className="card-hover group h-full rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background-soft text-accent transition-colors group-hover:border-accent/40">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-border bg-background-soft px-2 py-1 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
