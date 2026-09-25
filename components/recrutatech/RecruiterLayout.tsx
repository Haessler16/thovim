import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { LanguageSwitcher } from '../LanguageSwitcher';
import { Led } from '../ui/Glow';
import {
  experienceLocales,
  useExperienceTranslation,
} from '../../lib/experience/dictionaries';
import { profile } from '../../lib/experience/content';

interface RecruiterLayoutProps {
  children: ReactNode;
}

/**
 * Recruiter shell.
 *
 * Deliberately has no navbar, no 3D and no scroll-driven animation: a recruiter
 * arrives from a QR/NFC card and should reach proof and contact within seconds.
 *
 * The body background is forced while this layout is mounted (Emotion `Global`
 * is applied and removed with the component), so the legacy light theme never
 * leaks through behind the dark surface.
 */
export const RecruiterLayout = ({ children }: RecruiterLayoutProps) => {
  const t = useExperienceTranslation();
  const router = useRouter();
  const locale = router.locale ?? 'en';

  return (
    <>
      <Global
        styles={{
          'body': { backgroundColor: '#05070A', color: '#E8F1F5' },
        }}
      />

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Haessler León — Full Stack &amp; Mobile Engineer</title>
        <meta
          name="description"
          content="Haessler León — Full Stack & Mobile Engineer with 9+ years building production web, mobile and backend systems. Curitiba, Brazil."
        />
        <link rel="icon" href="/h_blue_light.jfif" />
        <meta property="og:title" content="Haessler León — Full Stack & Mobile Engineer" />
        <meta
          property="og:description"
          content="9+ years building production web, mobile and backend systems."
        />
        <meta property="og:type" content="profile" />
        {/* Same approach as the legacy shell: keep <html lang> in sync with
            the active locale without a client-side effect. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang = '${locale}';`,
          }}
        />
      </Head>

      <Box bg="osBg" color="osText" minH="100vh">
        <Box
          as="a"
          href="#recruiter-content"
          position="absolute"
          left="-9999px"
          top={2}
          zIndex={20}
          px={4}
          py={2}
          bg="osElevated"
          color="osText"
          borderWidth="1px"
          borderColor="osAccent"
          borderRadius="md"
          fontFamily="mono"
          fontSize="xs"
          _focus={{ left: 4 }}
        >
          {t.shell.skipToContent}
        </Box>

        <Box
          as="header"
          borderBottomWidth="1px"
          borderColor="osBorder"
          bg="osSurface"
        >
          <Container
            maxW="1080px"
            py={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={4}
            flexWrap="wrap"
          >
            <Flex alignItems="center" gap={3} minW={0}>
              <Text
                fontFamily="mono"
                fontSize="sm"
                letterSpacing="0.18em"
                color="osText"
              >
                {t.system.name}
              </Text>

              <Text
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.14em"
                color="osTextMuted"
                display={{ base: 'none', sm: 'block' }}
              >
                {t.recruiter.sceneTitle}
              </Text>

              <Flex alignItems="center" gap={2}>
                <Led />
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.14em"
                  color="osAccent"
                >
                  {t.system.status}
                </Text>
              </Flex>
            </Flex>

            <Flex alignItems="center" gap={4}>
              <LanguageSwitcher
                locales={experienceLocales}
                size="xs"
                variant="outline"
              />

              <Link
                as={NextLink}
                href="/"
                display={{ base: 'none', md: 'inline-block' }}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.14em"
                textTransform="uppercase"
                color="osAccentSoft"
                _hover={{ color: 'osAccent' }}
              >
                {t.recruiter.exploreFull}
              </Link>
            </Flex>
          </Container>
        </Box>

        <Box as="main" id="recruiter-content">
          {children}
        </Box>

        <Box as="footer" borderTopWidth="1px" borderColor="osBorder" py={8}>
          <Container maxW="1080px">
            <Text fontFamily="mono" fontSize="xs" color="osTextMuted">
              {profile.name} · {profile.location}
            </Text>
          </Container>
        </Box>
      </Box>
    </>
  );
};
