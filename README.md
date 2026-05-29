<div align="center">

# Yekzan KUS — Portfolio

**An ultra-premium, bilingual (FR/EN) developer portfolio with a built-in AI assistant.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff5c97)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-8b5cf6.svg)](LICENSE)

[**Live demo →**](https://yekzan-kus.vercel.app)

</div>

---

> 🇫🇷 Portfolio personnel haut de gamme de **Yekzan KUS**, développeur web full-stack.
> Bilingue (français / anglais), mode sombre, animations fluides, assistant IA intégré
> et SEO optimisé. Construit avec Next.js, Tailwind CSS et Framer Motion.
>
> 🇬🇧 Premium personal portfolio of **Yekzan KUS**, full-stack web developer.
> Bilingual (French / English), dark mode, fluid animations, an embedded AI assistant
> and first-class SEO. Built with Next.js, Tailwind CSS and Framer Motion.

## ✨ Features

- **Bilingual FR/EN** with locale-prefixed routes (`/fr`, `/en`), automatic language
  detection, `hreflang` alternates and a seamless in-page language switch.
- **Dark mode by default** (with a light theme toggle) — no flash, system-independent.
- **Premium motion design** — aurora backdrops, scroll reveals, magnetic buttons,
  a rotating role headline, an animated timeline and micro-interactions throughout.
- **Built-in AI assistant** — a chat widget that answers questions about the profile.
  Works **100% free and offline** out of the box; optionally upgrades to Claude.
- **First-class SEO** — per-locale metadata, Open Graph & Twitter cards, dynamic OG
  images, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt` and a web manifest.
- **Fast** — statically generated, self-hosted fonts, minimal client JS.
- **Production-ready** — Dockerfile + docker-compose, MIT-licensed, clean architecture.

## 🧱 Tech stack

| Area        | Choice                                            |
| ----------- | ------------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router)     |
| UI          | [React 19](https://react.dev)                     |
| Styling     | [Tailwind CSS v4](https://tailwindcss.com)        |
| Animation   | [Framer Motion](https://www.framer.com/motion/)   |
| Icons       | [lucide-react](https://lucide.dev)                |
| Theming     | [next-themes](https://github.com/pacocoursey/next-themes) |
| AI (opt.)   | [Anthropic Claude](https://www.anthropic.com)     |
| Language    | TypeScript (strict)                               |

## 🚀 Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev      # http://localhost:3000  →  redirects to /fr or /en

# 3. Production build
npm run build
npm start
```

## 🔧 Environment variables

Everything is optional — the site runs with zero configuration. See [`.env.example`](.env.example).

| Variable               | Default                        | Purpose                                              |
| ---------------------- | ------------------------------ | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://yekzan-kus.vercel.app`| Canonical URL for SEO, sitemap and OG images.        |
| `ANTHROPIC_API_KEY`    | _(empty)_                      | Enables the Claude-powered assistant. Leave empty to use the free offline responder. |
| `ANTHROPIC_MODEL`      | `claude-haiku-4-5-20251001`    | Model used when a key is provided.                   |

## 🤖 The AI assistant

The chat widget answers visitor questions about Yekzan's skills, experience and
recommendations. It has **two modes**, chosen automatically:

1. **Offline (default, free forever)** — an intent-based responder backed by a
   curated knowledge base in [`lib/chatbot/knowledge.ts`](lib/chatbot/knowledge.ts).
   No API key, no billing, no external calls.
2. **Claude-powered (optional)** — set `ANTHROPIC_API_KEY` and the `/api/chat`
   route uses Claude with a system prompt **locked to the CV/recommendations**, so
   it stays factual and never invents anything. If the API errors, it gracefully
   falls back to the offline responder.

## 🐳 Docker

```bash
# Build and run with Docker
docker build -t portfolio .
docker run -p 3000:3000 portfolio

# …or with docker-compose
docker compose up --build
```

The image uses Next.js [standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
and runs as a non-root user. Pass `ANTHROPIC_API_KEY` / `NEXT_PUBLIC_SITE_URL` as env vars.

## 🗂️ Project structure

```
app/
  [locale]/            # Locale-scoped root layout + page (the single-page site)
    layout.tsx         # <html lang>, fonts, theme, SEO metadata, JSON-LD
    page.tsx           # Assembles all sections
    opengraph-image.tsx# Dynamic, per-locale OG image
  api/chat/route.ts    # Assistant endpoint (offline + optional Claude)
  icon.tsx, apple-icon.tsx, manifest.ts, robots.ts, sitemap.ts
proxy.ts               # Locale detection & redirect (Next 16 "proxy")
components/
  sections/            # Hero, About, Skills, Experience, Recommendations, Contact…
  layout/              # Navbar, Footer, ThemeToggle, LanguageSwitcher…
  chatbot/             # The chat widget
  ui/                  # Reveal, Magnetic, Button, Section primitives
lib/
  profile.ts           # ← single source of truth (factual data)
  dictionaries/        # fr.ts / en.ts / types.ts (all copy)
  i18n/                # locale config + getDictionary
  chatbot/knowledge.ts # assistant knowledge base + system prompt
```

## 🌍 Customisation

This doubles as a reusable template. To make it yours:

1. Edit **[`lib/profile.ts`](lib/profile.ts)** — name, contact, skills, experience, recommenders.
2. Edit **[`lib/dictionaries/fr.ts`](lib/dictionaries/fr.ts)** and **[`en.ts`](lib/dictionaries/en.ts)** — all visible copy.
3. Update the assistant facts in **[`lib/chatbot/knowledge.ts`](lib/chatbot/knowledge.ts)**.
4. Drop your CV at `public/cv-yekzan-kus.pdf` (or change `profile.cvPath`).
5. Tweak the palette via the CSS variables in **[`app/globals.css`](app/globals.css)**.

## ▲ Deployment

Optimised for **Vercel** (free Hobby tier):

1. Push this repo to GitHub.
2. Import it on [vercel.com/new](https://vercel.com/new).
3. (Optional) add `ANTHROPIC_API_KEY`; set `NEXT_PUBLIC_SITE_URL` to your domain.
4. Deploy. Every push to `main` redeploys automatically.

Works the same on any Node host or via the Docker image above.

## 📄 License

[MIT](LICENSE) for the code. Personal content (CV data, recommendation excerpts,
name) remains the property of Yekzan KUS.

<div align="center">
<sub>Built with Next.js, Tailwind CSS & Framer Motion — made in the Beaujolais.</sub>
</div>
