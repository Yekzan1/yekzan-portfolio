import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-7xl font-normal text-gradient sm:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        Page introuvable · Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        Cette page n’existe pas ou a été déplacée. This page doesn’t exist or has moved.
      </p>
      <Link
        href="/fr"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground shadow-[0_8px_30px_-8px_var(--ring)] transition-all hover:brightness-110"
      >
        ← Accueil · Home
      </Link>
    </section>
  );
}
