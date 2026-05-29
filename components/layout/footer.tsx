import { ArrowUp, Heart, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/dictionaries/types";
import { profile } from "@/lib/profile";
import { Container } from "@/components/ui/section";

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const year = new Date().getFullYear();
  const links = [
    { id: "about", label: dict.nav.about },
    { id: "skills", label: dict.nav.skills },
    { id: "work", label: dict.nav.work },
    { id: "recommendations", label: dict.nav.recommendations },
    { id: "contact", label: dict.nav.contact },
  ];

  return (
    <footer className="relative border-t border-border py-14">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="#hero" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-sm font-semibold text-accent-foreground">
                {profile.initials}
              </span>
              <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">{dict.footer.tagline}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
          </div>

          {/* Nav */}
          <nav aria-label={locale === "fr" ? "Pied de page" : "Footer"}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm sm:flex sm:flex-col">
              {links.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-2 sm:flex-row">
          <p>
            © {year} {profile.name}. {dict.footer.rights}
          </p>
          <p className="inline-flex items-center gap-1.5">
            {dict.footer.builtWith}
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              {dict.footer.madeIn} <Heart className="h-3 w-3 text-accent" />
            </span>
            <a
              href="#hero"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              {dict.footer.backToTop}
              <ArrowUp className="h-3 w-3" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
