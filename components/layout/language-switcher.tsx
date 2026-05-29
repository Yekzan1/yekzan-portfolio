"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Swaps the leading /fr or /en segment while preserving the current
 * scroll anchor (#section), so the language switch feels seamless.
 */
export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(locale: Locale) {
    if (locale === current) return;
    const segments = pathname.split("/");
    segments[1] = locale; // replace locale segment
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    startTransition(() => {
      router.push(segments.join("/") + hash);
    });
  }

  return (
    <div
      className="relative flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-medium"
      data-pending={isPending}
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative z-10 rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
              active ? "text-accent-foreground" : "text-muted hover:text-foreground",
            )}
          >
            {active && (
              <span className="absolute inset-0 -z-10 rounded-full bg-accent shadow-[0_4px_16px_-4px_var(--ring)]" />
            )}
            {locale}
          </button>
        );
      })}
    </div>
  );
}
