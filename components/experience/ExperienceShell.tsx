import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, type ReactNode } from 'react';

import { BootSequence } from './BootSequence';
import { SystemNavigation } from './SystemNavigation';
import { Led } from '../ui/Glow';
import { profile } from '../../lib/experience/content';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/** Marks the boot log as seen for the rest of the browsing session. */
const BOOT_SESSION_KEY = 'haessler-world-booted';

interface ExperienceShellProps {
  children: ReactNode;
}

/**
 * HAESSLER WORLD page shell.
 *
 * Owns everything the legacy `MainLayout` owned for the old site — document
 * head, navigation, viewport background — but shaped for the immersive page:
 * no legacy navbar, no VoxelDog on every route, full-width sections.
 *
 * The body colours are forced while this layout is mounted (Emotion `Global`
 * unmounts with it), so the legacy light theme cannot leak through behind the
 * dark surface.
 */
export const ExperienceShell = ({ children }: ExperienceShellProps) => {
  const t = useExperienceTranslation();
  const router = useRouter();
  const locale = router.locale ?? 'en';
  const [isBooting, setIsBooting] = useState(false);

  useEffect(() => {
    /**
     * Client-only decision on purpose: the server HTML and the first client
     * paint both start without the overlay, so there is no hydration mismatch
     * and the page is fully readable if this effect never runs.
     */
    let alreadyBooted = true;

    try {
      alreadyBooted = window.sessionStorage.getItem(BOOT_SESSION_KEY) === '1';
    } catch {
      // Storage can be unavailable (private mode, blocked cookies).
      alreadyBooted = false;
    }

    if (alreadyBooted) return;

    /**
     * Deferred one frame so this effect never calls setState synchronously
     * (cascading-render lint rule). The overlay mounts right after the first
     * painted frame, which is when it appeared before this deferral anyway.
     */
    const frame = window.requestAnimationFrame(() => setIsBooting(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleBootComplete = useCallback(() => {
    try {
      window.sessionStorage.setItem(BOOT_SESSION_KEY, '1');
    } catch {
      // Not being able to remember the boot is not worth failing over.
    }

    setIsBooting(false);
  }, []);

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
          content="HAESSLER WORLD — a small interactive 3D engineering world by Haessler León, Full Stack & Mobile Engineer with 9+ years building production web, mobile and backend systems in Curitiba, Brazil."
        />
        <link rel="icon" href="/h_blue_light.jfif" />
        <meta
          property="og:title"
          content="Haessler León — Full Stack & Mobile Engineer"
        />
        <meta
          property="og:description"
          content="9+ years building production web, mobile and backend systems."
        />
        <meta property="og:type" content="profile" />
        {/* Same approach as the legacy shell: keep <html lang> in sync with the
            active locale without a client-side effect. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang = '${locale}';`,
          }}
        />
      </Head>

      <Box bg="osBg" color="osText" minH="100vh">
        <Box
          as="a"
          href="#experience-content"
          position="absolute"
          left="-9999px"
          top={2}
          zIndex={40}
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

        <SystemNavigation />

        <Box as="main" id="experience-content">
          {children}
        </Box>

        <Box as="footer" borderTopWidth="1px" borderColor="osBorder" py={10}>
          <Container maxW="1080px" px={{ base: 5, md: 8 }}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={6}
              alignItems={{ md: 'center' }}
              justifyContent="space-between"
            >
              <Flex alignItems="center" gap={3} minW={0}>
                <Led />
                <Text fontFamily="mono" fontSize="xs" color="osTextMuted">
                  {t.system.name} · {profile.name} · {profile.location}
                </Text>
              </Flex>

              <Flex gap={5} flexWrap="wrap" alignItems="center">
                <Link
                  as={NextLink}
                  href={`mailto:${profile.links.email}`}
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color="osTextSecondary"
                  _hover={{ color: 'osAccent' }}
                >
                  {t.common.email}
                </Link>

                <Link
                  as="a"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color="osTextSecondary"
                  _hover={{ color: 'osAccent' }}
                >
                  {t.common.linkedin}
                </Link>

                <Link
                  as="a"
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color="osTextSecondary"
                  _hover={{ color: 'osAccent' }}
                >
                  {t.common.github}
                </Link>

                <Link
                  as={NextLink}
                  href="/classic"
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color="osTextMuted"
                  _hover={{ color: 'osAccent' }}
                >
                  {t.shell.classicPortfolio}
                </Link>
              </Flex>
            </Flex>
          </Container>
        </Box>
      </Box>

      <AnimatePresence>
        {isBooting && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{ position: 'fixed', inset: 0, zIndex: 60 }}
          >
            <BootSequence onComplete={handleBootComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
