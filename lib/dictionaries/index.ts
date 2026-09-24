import { useRouter } from 'next/router';

import { en } from './en';
import { es } from './es';
import { pt } from './pt';
import { Locale } from '../i18n';

export type { Dictionary } from './en';

const dictionaries: Record<Locale, typeof en> = { en, es, pt };

/**
 * Returns the dictionary for the current locale (from next/router).
 * Safe on first client render: falls back to the default locale.
 */
export const useTranslation = (): typeof en => {
  const router = useRouter();
  return dictionaries[(router.locale as Locale) ?? 'en'] ?? dictionaries.en;
};

export const getDictionary = (locale: Locale): typeof en =>
  dictionaries[locale] ?? dictionaries.en;
