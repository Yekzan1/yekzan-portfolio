"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/types";
import { profile, stats, techRibbon } from "@/lib/profile";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

function RotatingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [roles.length]);

  return (
    <span className="relative inline-grid">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "0.7em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.7em", opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="font-medium text-foreground"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero({ dict }: { dict: Dictionary }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16">
      <AuroraBackground />

      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start">
          {/* Availability pill */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {dict.hero.availability}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.02em] sm:text-6xl md:text-7xl"
          >
            {dict.hero.titleLead}{" "}
            <span className="text-gradient font-serif font-normal italic">
              {dict.hero.titleAccent}
            </span>{" "}
            {dict.hero.titleTail}
          </motion.h1>

          {/* Name + rotating role */}
          <motion.p
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-2 text-lg text-muted sm:text-xl"
          >
            <span className="font-medium text-foreground">{profile.name}</span>
            <span className="text-muted-2">—</span>
            <RotatingRole roles={dict.hero.roles} />
          </motion.p>

          {/* Description */}
          <motion.p variants={item} className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted">
            {dict.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href="#work" size="lg">
                {dict.hero.ctaPrimary}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button href={profile.cvPath} variant="secondary" size="lg" download>
                <Download className="h-4 w-4" />
                {dict.hero.ctaSecondary}
              </Button>
            </Magnetic>
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={item}
            className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.labelKey} className="flex flex-col gap-1">
                <dt className="order-2 text-xs leading-snug text-muted">
                  {dict.hero.statsLabels[stat.labelKey as keyof typeof dict.hero.statsLabels]}
                </dt>
                <dd className="order-1 font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Tech ribbon */}
      <div className="relative mt-16 w-full">
        <div className="mask-fade-x flex overflow-hidden">
          <div className="flex shrink-0 items-center gap-3 pr-3" style={{ animation: "var(--animate-marquee)" }}>
            {[...techRibbon, ...techRibbon].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="whitespace-nowrap rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label={dict.hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-2 sm:flex"
      >
        {dict.hero.scroll}
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
