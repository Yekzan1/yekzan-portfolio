# Contributing

Thanks for your interest in this project! It's the personal portfolio of
Yekzan KUS, but it's also built to be a clean, reusable Next.js template — so
contributions, bug reports and ideas are welcome.

## Getting started

```bash
git clone <your-fork-url>
cd yekzan-portfolio
npm install
npm run dev
```

The app runs at http://localhost:3000.

## Development workflow

- **Branch** off `main` (`git checkout -b feat/your-feature`).
- **Keep it typed** — the project is strict TypeScript. Run `npm run build` to
  type-check before opening a PR.
- **Lint** with `npm run lint`.
- **Match the style** — kebab-case filenames, server components by default,
  `"use client"` only where interactivity is needed.

## Where things live

- All factual data → [`lib/profile.ts`](lib/profile.ts)
- All copy (FR/EN) → [`lib/dictionaries/`](lib/dictionaries)
- The AI assistant's knowledge → [`lib/chatbot/knowledge.ts`](lib/chatbot/knowledge.ts)

If you change content, update **both** `fr.ts` and `en.ts` so the two locales
stay in sync (the shared `Dictionary` type enforces this at build time).

## Commit messages

Use clear, conventional-ish messages: `feat:`, `fix:`, `docs:`, `refactor:`,
`chore:`.

## Pull requests

1. Describe **what** changed and **why**.
2. Confirm `npm run build` passes.
3. Add a screenshot for any visual change.

By contributing, you agree your contributions are licensed under the project's
[MIT License](LICENSE).
