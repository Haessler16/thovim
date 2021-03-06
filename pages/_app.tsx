import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { MainLayout } from '../layouts/Main';

import { Fonts } from '../components/Fonts';
import { theme } from '../lib/theme';

import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }: AppProps) {
  // const getLayout = Component.getLayout() || ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <MainLayout router={router}>
        <AnimatePresence exitBeforeEnter initial={true}>
          <Component {...pageProps} />
        </AnimatePresence>
      </MainLayout>
    </ChakraProvider>
  );
}
export default MyApp;
