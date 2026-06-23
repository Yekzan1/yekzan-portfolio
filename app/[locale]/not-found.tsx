import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] flex-col items-start justify-center px-6 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow uppercase tracking-[0.14em] text-accent">404</p>
        <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.2rem,6vw,4rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink">
          Cette page n’existe pas, ou plus.
        </h1>
        <p className="mt-4 max-w-md text-ink-2">
          This page doesn’t exist or has moved.
        </p>
        <Link href="/fr" className="ul-static mt-8 inline-block font-medium text-ink">
          ← Retour à l’accueil · Home
        </Link>
      </div>
    </section>
  );
}
