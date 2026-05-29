export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeLabels: Record<Locale, { label: string; native: string; flag: string }> = {
  fr: { label: "Français", native: "FR", flag: "🇫🇷" },
  en: { label: "English", native: "EN", flag: "🇬🇧" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
