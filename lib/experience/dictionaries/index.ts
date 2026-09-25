import { useRouter } from 'next/router';

import { en, type ExperienceDictionary } from './en';
import { pt } from './pt';
import type { Locale } from '../../i18n';

/**
 * HAESSLER OS namespace.
 *
 * The new experience ships in EN + PT only. The legacy dictionary keeps
 * EN + ES + PT untouched, so Spanish visitors still get the classic portfolio
 * under /es/... — the experience simply falls back to English for any locale
 * that does not have a translation yet (no scattered locale conditionals).
 */
export type { ExperienceDictionary } from './en';

export const experienceLocales: Locale[] = ['en', 'pt'];

const dictionaries: Partial<Record<Locale, ExperienceDictionary>> = { en, pt };

export const getExperienceDictionary = (
  locale?: string | null
): ExperienceDictionary =>
  dictionaries[(locale ?? 'en') as Locale] ?? en;

/** Client hook. Safe on first render: falls back to English. */
export const useExperienceTranslation = (): ExperienceDictionary => {
  const router = useRouter();
  return getExperienceDictionary(router.locale);
};
