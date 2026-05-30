import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/profile";

const PRIMARY_HOST = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header.split(",")[0]?.trim().toLowerCase() ?? "";
    if (preferred.startsWith("en")) return "en";
    if (preferred.startsWith("fr")) return "fr";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Canonical-host redirect. Once a custom primary domain is configured
  // (NEXT_PUBLIC_SITE_URL → a non-vercel.app host), permanently redirect the
  // *.vercel.app deployment domain to it. Inert until that env var is set,
  // and never touches preview deployments (which keep the vercel.app SITE_URL).
  const host = request.headers.get("host") ?? "";
  if (PRIMARY_HOST && !PRIMARY_HOST.endsWith("vercel.app") && host.endsWith(".vercel.app")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = PRIMARY_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except API, Next internals, metadata routes and files with extensions.
  matcher: [
    "/((?!api|_next|opengraph-image|twitter-image|icon|apple-icon|sitemap|robots|manifest|.*\\.).*)",
  ],
};
