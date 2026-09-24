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

const flagByLocale: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  pt: '🇧🇷',
};

/** Persists the chosen locale for Next.js automatic locale detection. */
const setLocaleCookie = (nextLocale: Locale) => {
  document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
};

export const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const [isChanging, setIsChanging] = useState(false);

  const changeLocale = (nextLocale: Locale) => {
    if (nextLocale === locale || isChanging) return;
    setIsChanging(true);
    setLocaleCookie(nextLocale);
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  const current = (locale ?? defaultLocale) as Locale;

  return (
    <Menu isLazy={true}>
      <MenuButton
        as={Button}
        size="sm"
        variant="outline"
        rightIcon={<ChevronDownIcon />}
        aria-label="Change language"
      >
        <Text as="span" fontSize="sm">
          {flagByLocale[current]} {current.toUpperCase()}
        </Text>
      </MenuButton>

      <MenuList>
        {locales.map((loc) => (
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
