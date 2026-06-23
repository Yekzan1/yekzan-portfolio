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
    <footer className="relative z-[2] border-t border-line bg-paper-2">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr] lg:py-20">
          <div className="max-w-xs">
            <a href="#hero" className="font-display text-2xl text-ink">
              {profile.name}
            </a>
            <p className="mt-4 leading-relaxed text-ink-2">{dict.footer.tagline}</p>
            <a
              href={`mailto:${profile.email}`}
              className="ul-static mt-5 inline-block text-ink"
            >
              {profile.email}
            </a>
          </div>

          <nav aria-label={locale === "fr" ? "Pied de page" : "Footer"}>
            <p className="eyebrow uppercase tracking-[0.14em] text-accent">Navigation</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-ink-2 transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow uppercase tracking-[0.14em] text-accent">
              {locale === "fr" ? "Ailleurs" : "Elsewhere"}
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {profile.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ink-2 transition-colors hover:text-ink"
                  >
                    <GitHubMark className="h-4 w-4" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {profile.name}. {dict.footer.rights}
          </span>
          <span>{dict.footer.builtWith}</span>
          <a href="#hero" className="ul-static text-ink-2 transition-colors hover:text-ink">
            {dict.footer.backToTop} ↑
          </a>
        </div>

        <p className="pb-8 text-xs leading-relaxed text-ink-3">
          {locale === "fr"
            ? `Éditeur : ${profile.name} — Hébergeur : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.`
            : `Published by ${profile.name} — Hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.`}
        </p>
      </Container>
    </footer>
  );
}
