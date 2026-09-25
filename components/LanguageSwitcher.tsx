import { useState } from 'react';
import { useRouter } from 'next/router';

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { locales, localeNames, defaultLocale, Locale } from '../lib/i18n';

interface LanguageSwitcherProps {
  /**
   * Optional subset of locales. Legacy pages pass nothing and keep offering
   * EN/ES/PT; the HAESSLER OS layer passes ['en', 'pt'].
   */
  locales?: Locale[];
  size?: 'sm' | 'xs';
  variant?: 'outline' | 'ghost';
}

const flagByLocale: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  pt: '🇧🇷',
};

/** Persists the chosen locale for Next.js automatic locale detection. */
const setLocaleCookie = (nextLocale: Locale) => {
  document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
};

export const LanguageSwitcher = ({
  locales: availableLocales,
  size = 'sm',
  variant = 'outline',
}: LanguageSwitcherProps = {}) => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const [isChanging, setIsChanging] = useState(false);

  const changeLocale = (nextLocale: Locale) => {
    if (nextLocale === locale || isChanging) return;
    setIsChanging(true);
    setLocaleCookie(nextLocale);
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  const offeredLocales = availableLocales?.length ? availableLocales : locales;
  const activeLocale = (locale ?? defaultLocale) as Locale;

  /**
   * Show one of the offered locales. The experience layer only offers EN/PT,
   * so a visitor landing on /es/... (where it renders the English fallback)
   * sees EN highlighted instead of an ES that is not in the list.
   * Legacy pages pass no subset, so `activeLocale` is always offered and the
   * behaviour there is unchanged.
   */
  const current: Locale = offeredLocales.includes(activeLocale)
    ? activeLocale
    : offeredLocales[0];

  return (
    <Menu isLazy={true}>
      <MenuButton
        as={Button}
        size={size}
        variant={variant}
        rightIcon={<ChevronDownIcon />}
        aria-label="Change language"
      >
        <Text as="span" fontSize="sm">
          {flagByLocale[current]} {current.toUpperCase()}
        </Text>
      </MenuButton>

      <MenuList>
        {offeredLocales.map((loc) => (
          <MenuItem
            key={loc}
            onClick={() => changeLocale(loc)}
            bg={loc === current ? 'whiteAlpha.200' : undefined}
          >
            <Text mr={2}>{flagByLocale[loc]}</Text>
            {localeNames[loc]}
            {loc === current && <Text as="span" ml={2}>✓</Text>}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
