import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { LegacyLayout } from '../components/legacy/LegacyLayout';

import { Fonts } from '../components/Fonts';
import { theme } from '../lib/theme';

import { AnimatePresence } from 'framer-motion';
import type { PageWithLayout } from '../lib/layout';

function MyApp({ Component, pageProps, router }: AppProps) {
  const page = <Component {...pageProps} />;

  /**
   * Page-level layouts.
   *
   * Legacy routes do not export `getLayout`, so they keep rendering inside
   * `LegacyLayout` -> `layouts/Main.tsx` with the exact same element tree
   * (Navbar, VoxelDog, AnimatePresence) as before.
   *
   * The HAESSLER OS routes (/ eventually, /recrutatech now) export their own
   * `getLayout` and take over the full viewport without the legacy chrome.
   */
  const getLayout = (Component as unknown as PageWithLayout).getLayout;

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      {getLayout ? (
        getLayout(page)
      ) : (
        <LegacyLayout router={router} locale={router.locale ?? 'en'}>
          <AnimatePresence mode="wait" initial={true}>
            {page}
          </AnimatePresence>
        </LegacyLayout>
      )}
    </ChakraProvider>
  );
}
export default MyApp;
