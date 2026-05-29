import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "../dictionaries/types";
import { fr } from "../dictionaries/fr";
import { en } from "../dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.fr;
}

export type { Dictionary };
