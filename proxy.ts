import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

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
