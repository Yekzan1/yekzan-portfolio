"use client";

import { usePathname, useRouter } from "next/navigation";
import { Fragment, useTransition } from "react";
import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  function switchTo(locale: Locale) {
    if (locale === current) return;
    const segments = pathname.split("/");
    segments[1] = locale;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    startTransition(() => router.push(segments.join("/") + hash));
  }

  return (
    <div className="eyebrow flex items-center gap-2 uppercase tracking-[0.14em]">
      {locales.map((locale, i) => (
        <Fragment key={locale}>
          {i > 0 && (
            <span className="text-line-strong" aria-hidden>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "transition-colors",
              locale === current ? "text-accent" : "text-ink-3 hover:text-ink",
            )}
          >
            {locale}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
