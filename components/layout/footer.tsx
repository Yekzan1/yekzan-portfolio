import { ArrowUp, Heart, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/dictionaries/types";
import { profile } from "@/lib/profile";
import { Container } from "@/components/ui/section";

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

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
            {profile.socials.length > 0 && (
              <div className="mt-4 flex items-center gap-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    <GitHubMark className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
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
