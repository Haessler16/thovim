import { Box, Container, Flex, Heading, Text, Wrap } from '@chakra-ui/react';
import { useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

import type { SceneStatus } from '../3d/SceneContainer';
import { Chip, ReadoutRow } from './ExperienceSection';
import { Led } from '../ui/Glow';
import { MagneticButton } from '../ui/MagneticButton';
import { Reveal } from '../ui/Reveal';
import { Terminal } from '../ui/Terminal';
import { coreStack, profile } from '../../lib/experience/content';
import { metrics } from '../../lib/experience/metrics';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * The 3D workstation. Client-only and code-split: three.js is fetched after
 * first paint and never blocks the readable HTML that is already on screen.
 */
const WorkstationScene = dynamic(
  () => import('../3d/WorkstationScene').then((mod) => mod.WorkstationScene),
  { ssr: false }
);

/**
 * Entry point of the experience.
 *
 * The 3D workstation (PHASE 4) mounts inside the panel marked with
 * `data-scene-slot="workstation"`. Until then that panel renders the system
 * readout, which is exactly the fallback the scene has to keep for visitors
 * without WebGL — so the slot is a real part of the design, not a placeholder
 * waiting to be deleted.
 */
export const Hero = () => {
  const t = useExperienceTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [sceneStatus, setSceneStatus] = useState<
    'pending' | 'ready' | 'unavailable'
  >('pending');

  const handleSceneStatus = useCallback((status: SceneStatus) => {
    setSceneStatus(status === 'ready' ? 'ready' : 'unavailable');
  }, []);

  const handleEnter = () => {
    document.getElementById('system')?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      borderBottomWidth="1px"
      borderColor="osBorder"
      className="os-scanlines"
    >
      <Box
        aria-hidden="true"
        position="absolute"
        inset={0}
        className="os-grid-bg"
        opacity={0.5}
      />

      {/* Fades the grid into the page background so it never competes. */}
      <Box
        aria-hidden="true"
        position="absolute"
        inset={0}
        bgGradient="linear(to bottom, transparent, transparent 45%, osBg)"
      />

      <Container
        position="relative"
        maxW="1080px"
        px={{ base: 5, md: 8 }}
        pt={{ base: 14, md: 20 }}
        pb={{ base: 14, md: 20 }}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 12, lg: 16 }}
          alignItems={{ lg: 'center' }}
          minH={{ lg: 'calc(100vh - 220px)' }}
        >
          <Box flex="1 1 0" minW={0}>
            <Reveal>
              <Flex alignItems="center" gap={3}>
                <Led />
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.22em"
                  textTransform="uppercase"
                  color="osAccent"
                >
                  {t.hero.eyebrow}
                </Text>
              </Flex>
            </Reveal>

            <Reveal delay={0.05}>
              <Heading
                as="h1"
                mt={5}
                fontFamily="heading"
                fontSize={{ base: '4xl', md: '6xl' }}
                lineHeight="1"
                letterSpacing="-0.02em"
                color="osText"
              >
                {profile.name}
              </Heading>
            </Reveal>

            <Reveal delay={0.1}>
              <Text
                mt={4}
                fontSize={{ base: 'lg', md: 'xl' }}
                color="osTextSecondary"
              >
                {t.role.fullstackMobile}
              </Text>
            </Reveal>

            <Reveal delay={0.15}>
              <Flex
                as="ul"
                direction="column"
                gap={1}
                mt={6}
                fontFamily="mono"
                fontSize="sm"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="osTextMuted"
                listStyleType="none"
              >
                {t.system.tagline.map((line) => (
                  <Text as="li" key={line}>
                    <Text as="span" color="osAccent" mr={2}>
                      ›
                    </Text>
                    {line}
                  </Text>
                ))}
              </Flex>
            </Reveal>

            <Reveal delay={0.2}>
              <Text
                mt={7}
                maxW="52ch"
                fontSize={{ base: 'md', md: 'lg' }}
                lineHeight="1.6"
                color="osTextSecondary"
              >
                {t.hero.intro}
              </Text>
            </Reveal>

            <Reveal delay={0.25}>
              <Flex mt={9} gap={3} flexWrap="wrap" alignItems="center">
                <MagneticButton onClick={handleEnter}>
                  {t.system.enter}
                </MagneticButton>

                <MagneticButton href="/recrutatech" variant="outline">
                  {t.shell.quickView}
                </MagneticButton>
              </Flex>
            </Reveal>
          </Box>

          <Box flex="1 1 0" minW={0} w="100%">
            <Reveal delay={0.15}>
              {/**
               * The scene slot is a real fallback design, not a placeholder:
               * the terminal readout is the base layer (visible without
               * WebGL, before the model loads, for reduced motion and for
               * every crawler) and the 3D world fades in over it only once
               * it is actually ready.
               */}
              <Box
                data-scene-slot="workstation"
                position="relative"
                overflow="hidden"
              >
                <Terminal
                  title={t.hero.readoutTitle}
                  meta={t.hero.readoutMeta}
                >
                  <ReadoutRow label={t.system.name}>
                    {t.system.status}
                  </ReadoutRow>

                  <ReadoutRow label={t.common.location}>
                    {profile.location}
                  </ReadoutRow>

                  <ReadoutRow label={t.common.years}>
                    {metrics.years.value} — {t.common.yearsValue}
                  </ReadoutRow>

                  <Box py={3} borderBottomWidth="1px" borderColor="osBorder">
                    <Text
                      fontFamily="mono"
                      fontSize="xs"
                      letterSpacing="0.16em"
                      textTransform="uppercase"
                      color="osTextMuted"
                      mb={3}
                    >
                      {t.sections.system.stackLabel}
                    </Text>
                    <Wrap spacing={2}>
                      {coreStack.map((technology) => (
                        <Chip key={technology}>{technology}</Chip>
                      ))}
                    </Wrap>
                  </Box>

                  <ReadoutRow label={t.sections.system.focusLabel}>
                    {t.sections.system.focus}
                  </ReadoutRow>
                </Terminal>

                {sceneStatus !== 'unavailable' && (
                  <Box
                    aria-hidden="true"
                    /**
                     * Mobile: the world stacks BELOW the terminal at its own
                     * height, so the scene never covers the readable HTML.
                     * md+: it fades in over the terminal as the opening
                     * composition. Pure CSS — no JS breakpoint, no re-mount,
                     * still a single WebGL context.
                     */
                    position={{ base: 'relative', md: 'absolute' }}
                    top={{ base: 'auto', md: 0 }}
                    left={{ base: 'auto', md: 0 }}
                    right={{ base: 'auto', md: 0 }}
                    bottom={{ base: 'auto', md: 0 }}
                    height={{ base: '240px', sm: '320px', md: '100%' }}
                    mt={{ base: 3, md: 0 }}
                    borderRadius={{ base: 'md', md: 0 }}
                    borderStyle={{ base: 'solid', md: 'none' }}
                    borderWidth={{ base: '1px', md: '0px' }}
                    borderColor={{ base: 'osBorder', md: 'transparent' }}
                    bg={{ base: 'rgba(5, 7, 10, 0.4)', md: 'transparent' }}
                    opacity={sceneStatus === 'ready' ? 1 : 0}
                    transition="opacity 700ms ease"
                    pointerEvents={sceneStatus === 'ready' ? 'auto' : 'none'}
                  >
                    <WorkstationScene onStatus={handleSceneStatus} />
                  </Box>
                )}
              </Box>
            </Reveal>

            <Reveal delay={0.25}>
              <Text
                mt={5}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="osTextMuted"
                textAlign="right"
              >
                {t.hero.scrollHint}
              </Text>
            </Reveal>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
