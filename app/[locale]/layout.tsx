import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { profile, skillGroups, SITE_URL } from "@/lib/profile";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Chatbot } from "@/components/chatbot/chatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafb" },
  ],
  colorScheme: "dark light",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : "fr";
  const dict = getDictionary(l);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: `%s · ${profile.name}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: profile.name }],
    creator: profile.name,
    applicationName: `${profile.name} — Portfolio`,
    alternates: {
      canonical: `/${l}`,
      languages: {
        "fr-FR": "/fr",
        "en-US": "/en",
        "x-default": "/fr",
      },
    },
    openGraph: {
      type: "website",
      siteName: `${profile.name} — Portfolio`,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${l}`,
      locale: l === "fr" ? "fr_FR" : "en_US",
      alternateLocale: l === "fr" ? "en_US" : "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    category: "technology",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const lang = locale === "fr" ? "fr-FR" : "en-US";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${profile.name} — Portfolio`,
        description: dict.meta.description,
        inLanguage: lang,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        jobTitle: locale === "fr" ? "Développeur web full-stack" : "Full-stack web developer",
        description: dict.meta.description,
        email: `mailto:${profile.email}`,
        telephone: `+${profile.phoneIntl.replace(/^\+?/, "")}`,
        url: SITE_URL,
        image: `${SITE_URL}/apple-icon`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Limas",
          addressRegion: "Beaujolais",
          addressCountry: "FR",
        },
        knowsLanguage: ["fr-FR", "en"],
        knowsAbout: skillGroups.flatMap((g) => g.items),
        alumniOf: { "@type": "EducationalOrganization", name: "Business School by CSND" },
        sameAs: profile.socials.map((s) => s.href),
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/${locale}#profilepage`,
        url: `${SITE_URL}/${locale}`,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        primaryImageOfPage: `${SITE_URL}/${locale}/opengraph-image`,
      },
    ],
  };

  return (
    <html lang={locale} className={`${inter.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only z-[70] rounded-full bg-accent px-4 py-2 text-sm text-accent-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            {dict.common.skipToContent}
          </a>

          <ScrollProgress />
          <Navbar dict={dict} locale={locale} />
          <main id="main">{children}</main>
          <Footer dict={dict} locale={locale} />
          <Chatbot dict={dict.assistant} locale={locale} />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
