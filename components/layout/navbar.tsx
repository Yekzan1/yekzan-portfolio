"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/dictionaries/types";
import { profile } from "@/lib/profile";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const SECTION_IDS = ["about", "skills", "work", "recommendations", "contact"] as const;

export function Navbar({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const links = [
    { id: "about", label: dict.nav.about },
    { id: "skills", label: dict.nav.skills },
    { id: "work", label: dict.nav.work },
    { id: "recommendations", label: dict.nav.recommendations },
    { id: "contact", label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-500 sm:px-4",
          scrolled
            ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
            : "border border-transparent bg-transparent",
        )}
      >
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 pl-1"
          aria-label={profile.name}
        >
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-accent text-sm font-semibold text-accent-foreground shadow-[0_4px_16px_-4px_var(--ring)]">
            {profile.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            {profile.name}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active === link.id
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-strong"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher current={locale} />
          </div>
          <ThemeToggle label={dict.nav.theme} />
          <a
            href="#contact"
            className="hidden h-9 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-foreground shadow-[0_4px_16px_-4px_var(--ring)] transition-all hover:brightness-110 lg:inline-flex"
          >
            {dict.nav.cta}
          </a>
          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={dict.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              className="absolute inset-x-4 top-20 rounded-3xl border border-border bg-background-soft p-4 shadow-2xl"
            >
              <ul className="flex flex-col">
                {links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors hover:bg-surface"
                    >
                      {link.label}
                      <span className="text-muted-2">↗</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-border px-2 pt-4">
                <LanguageSwitcher current={locale} />
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
                >
                  {dict.nav.cta}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
