"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/dictionaries/types";
import { profile } from "@/lib/profile";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

const SECTION_IDS = ["about", "skills", "work", "recommendations", "contact"] as const;

export function Navbar({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const links = [
    { id: "about", label: dict.nav.about, n: "01" },
    { id: "skills", label: dict.nav.skills, n: "02" },
    { id: "work", label: dict.nav.work, n: "03" },
    { id: "recommendations", label: dict.nav.recommendations, n: "04" },
    { id: "contact", label: dict.nav.contact, n: "05" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b border-line bg-paper/95 backdrop-blur-[2px]" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#hero" className="font-display text-lg tracking-tight text-ink" aria-label={profile.name}>
          {profile.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "text-sm transition-colors",
                active === link.id ? "text-accent" : "text-ink-2 hover:text-ink",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden sm:block">
            <LanguageSwitcher current={locale} />
          </div>
          <button
            type="button"
            aria-label={dict.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 items-center gap-2 text-sm text-ink md:hidden"
          >
            <span className="eyebrow uppercase tracking-[0.14em]">
              {open ? "✕" : dict.nav.menu}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-40 bg-paper md:hidden"
          >
            <nav className="flex flex-col px-5 pt-4 sm:px-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="flex items-baseline gap-4 border-b border-line py-5"
                >
                  <span className="eyebrow tnum text-accent">{link.n}</span>
                  <span className="font-display text-2xl text-ink">{link.label}</span>
                </motion.a>
              ))}
              <div className="mt-8">
                <LanguageSwitcher current={locale} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
