import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { SceneStatus } from '../3d/SceneContainer';
import type { WorldSceneApi } from '../3d/WorkstationScene';
import { QuickViewPanel } from './QuickViewPanel';
import { Chip, ReadoutRow } from './ExperienceSection';
import { Glow } from '../ui/Glow';
import { Led } from '../ui/Glow';
import { MagneticButton } from '../ui/MagneticButton';
import { Metric } from '../ui/Metric';
import { Reveal } from '../ui/Reveal';
import { Terminal } from '../ui/Terminal';
import { coreStack, profile } from '../../lib/experience/content';
import {
  worldAreas,
  type WorldArea,
  type WorldAreaId,
} from '../../lib/experience/content';
import { experienceCases } from '../../lib/experience/cases';
import { metrics, metricsForCase } from '../../lib/experience/metrics';
import { nexxoProductUrl } from '../../lib/experience/nexxo';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * The 3D workstation. Client-only and code-split: three.js is fetched after
 * first paint and never blocks the readable HTML that is already on screen.
 */
const WorkstationScene = dynamic(
  () => import('../3d/WorkstationScene').then((mod) => mod.WorkstationScene),
  { ssr: false }
);

const worldAreaMap = Object.fromEntries(
  worldAreas.map((area) => [area.id, area])
) as Record<WorldAreaId, WorldArea>;

/**
 * Proof panel for one world area (§8): object → camera dolly → information →
 * proof. Case-backed areas show the case file, its metrics and the deep dive;
 * section-backed areas (ARCHITECTURE / AI / HUMAN) show their pipeline and
 * jump into the page instead. Everything is HTML — the 3D object is only the
 * door to it.
 */
const AreaProofPanel = ({
  area,
  onClose,
}: {
  area: WorldArea;
  onClose: () => void;
}) => {
  const t = useExperienceTranslation();
  const accent = area.accent;
  const caseFile = area.caseId ? experienceCases[area.caseId] : null;
  const caseCopy = area.caseId ? t.cases[area.caseId] : null;
  const caseMetrics = caseFile ? metricsForCase(caseFile.id) : [];
  const areaName = t.world.areaNames[area.id];

  return (
    <Drawer
      isOpen
      placement="right"
      onClose={onClose}
      size={{ base: 'full', md: 'md' }}
    >
      <DrawerOverlay bg="rgba(5, 7, 10, 0.7)" backdropFilter="blur(4px)" />
      <DrawerContent
        bg="osSurface"
        borderColor="osBorder"
        borderLeftWidth="1px"
        role="dialog"
        aria-label={areaName}
      >
        <DrawerCloseButton
          color="osTextSecondary"
          _hover={{ color: 'osText' }}
          aria-label={t.world.labels.close}
        />

        <DrawerHeader px={6} pt={8} pb={0}>
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.22em"
            textTransform="uppercase"
            color={accent}
          >
            {areaName}
          </Text>

          <Heading
            as="h2"
            mt={2}
            fontFamily="heading"
            fontSize={{ base: '2xl', md: '3xl' }}
            color="osText"
          >
            {caseCopy ? caseCopy.title : areaName}
          </Heading>

          {caseCopy && (
            <Text
              mt={2}
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="osTextMuted"
            >
              {caseCopy.category} · {caseCopy.role}
            </Text>
          )}
        </DrawerHeader>

        <DrawerBody px={6} py={5}>
          {caseCopy && (
            <Text fontSize="sm" lineHeight="1.7" color="osTextSecondary">
              {caseCopy.summary}
            </Text>
          )}
          {!caseCopy && area.id === 'architecture' && (
            <>
              <Text fontSize="sm" lineHeight="1.7" color="osTextSecondary">
                {t.world.areas.architecture}
              </Text>
              <Text
                mt={5}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.18em"
                textTransform="uppercase"
                color="osTextMuted"
              >
                {t.world.labels.layers}
              </Text>
              <Wrap spacing={2} mt={2}>
                {[
                  'MOBILE APP',
                  'API',
                  'AUTH',
                  'SERVICES',
                  'DATABASE',
                ].map((layer) => (
                  <Chip key={layer} active accentColor={accent}>
                    {layer}
                  </Chip>
                ))}
              </Wrap>
            </>
          )}
          {!caseCopy && area.id === 'ai' && (
            <>
              <Text fontSize="sm" lineHeight="1.7" color="osTextSecondary">
                {t.world.areas.ai}
              </Text>
              <Text
                mt={5}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.18em"
                textTransform="uppercase"
                color="osTextMuted"
              >
                {t.world.labels.pipeline}
              </Text>
              <Wrap spacing={2} mt={2}>
                {['AI AGENT', 'MCP', 'N8N', 'INTERNAL SYSTEM', 'AUTOMATION'].map(
                  (stage) => (
                    <Chip key={stage} active accentColor={accent}>
                      {stage}
                    </Chip>
                  )
                )}
              </Wrap>
            </>
          )}
          {!caseCopy && area.id === 'human' && (
            <>
              <Text fontSize="sm" lineHeight="1.7" color="osTextSecondary">
                {t.world.areas.human}
              </Text>
              <Text
                mt={5}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.18em"
                textTransform="uppercase"
                color="osTextMuted"
              >
                {t.world.labels.interests}
              </Text>
              <Wrap spacing={2} mt={2}>
                {Object.values(t.sections.human.interests).map((interest) => (
                  <Chip key={interest} active accentColor={accent}>
                    {interest}
                  </Chip>
                ))}
              </Wrap>
            </>
          )}
          {!caseCopy && area.id === 'nexxo' && (
            <>
              {/** §17: recruiter understands Nexxo in ~20 seconds. */}
              <Text fontSize="sm" color="osTextSecondary">
                {t.world.nexxo.subtitle}
              </Text>
              <Text
                mt={5}
                fontFamily="mono"
                fontSize="sm"
                lineHeight="1.8"
                color="osText"
              >
                {t.world.nexxo.oneLiner}
              </Text>
              <Wrap spacing={2} mt={5}>
                <Chip active accentColor={accent}>
                  {t.nexxo.concepts.sharedExpenses}
                </Chip>
                <Chip active accentColor={accent}>
                  {t.nexxo.concepts.currencyReference}
                </Chip>
                <Chip active accentColor={accent}>
                  {t.nexxo.concepts.indexing}
                </Chip>
                <Chip active accentColor={accent}>
                  {t.nexxo.concepts.netting}
                </Chip>
              </Wrap>
            </>
          )}

          {caseMetrics.length > 0 && (
            <>
              <Text
                mt={6}
                mb={3}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.18em"
                textTransform="uppercase"
                color="osTextMuted"
              >
                {t.world.labels.proof}
              </Text>
              <Glow
                accentColor={accent}
                active
                borderRadius="md"
                p={4}
                bg="osElevated"
              >
                <SimpleMetricGrid>
                  {caseMetrics.map((metric) => (
                    <Metric
                      key={metric.id}
                      value={metric.value}
                      label={t.metrics[metric.id].label}
                      size="sm"
                    />
                  ))}
                </SimpleMetricGrid>
              </Glow>
            </>
          )}
        </DrawerBody>

        <Box px={6} pb={7} mt="auto">
          <Flex gap={6} flexWrap="wrap" alignItems="center">
            {caseFile && (
              <Link
                as={NextLink}
                href={caseFile.legacyHref}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.14em"
                textTransform="uppercase"
                color={accent}
                _hover={{ color: 'osText' }}
              >
                {t.world.labels.viewCase} →
              </Link>
            )}
            {caseFile?.externalHref && (
              <Link
                as="a"
                href={caseFile.externalHref}
                target="_blank"
                rel="noreferrer"
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.14em"
                textTransform="uppercase"
                color="osTextSecondary"
                _hover={{ color: 'osText' }}
              >
                {t.sections.cases.labels.live} ↗
              </Link>
            )}
            {area.id === 'nexxo' ? (
              <>
                <Link
                  as="a"
                  href={nexxoProductUrl}
                  target="_blank"
                  rel="noreferrer"
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.14em"
                  textTransform="uppercase"
                  color={accent}
                  _hover={{ color: 'osText' }}
                >
                  {t.world.nexxo.explore} ↗
                </Link>
                <Link
                  as={NextLink}
                  href="/#nexxo-lab"
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.14em"
                  textTransform="uppercase"
                  color={accent}
                  _hover={{ color: 'osText' }}
                >
                  {t.world.nexxo.caseStudy} →
                </Link>
              </>
            ) : (
              !caseFile && (
                <Link
                  as={NextLink}
                  href={
                    area.id === 'architecture'
                      ? '/#architecture'
                      : area.id === 'ai'
                        ? '/#ai-lab'
                        : '/#human'
                  }
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.14em"
                  textTransform="uppercase"
                  color={accent}
                  _hover={{ color: 'osText' }}
                >
                  {t.world.labels.openSection} →
                </Link>
              )
            )}
          </Flex>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

/** Two-column metric grid that stays readable down to 320px. */
const SimpleMetricGrid = ({ children }: { children: React.ReactNode }) => (
  <Flex flexWrap="wrap" gap={6}>
    {children}
  </Flex>
);

export const Hero = () => {
  const t = useExperienceTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [sceneStatus, setSceneStatus] = useState<
    'pending' | 'ready' | 'unavailable'
  >('pending');
  const [hoveredArea, setHoveredArea] = useState<WorldAreaId | null>(null);
  const [panelArea, setPanelArea] = useState<WorldAreaId | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const sceneApiRef = useRef<WorldSceneApi | null>(null);

  const handleSceneStatus = useCallback((status: SceneStatus) => {
    setSceneStatus(status === 'ready' ? 'ready' : 'unavailable');
  }, []);

  const handleSceneReady = useCallback((api: WorldSceneApi) => {
    sceneApiRef.current = api;
  }, []);

  const handleActivateArea = useCallback((areaId: WorldAreaId) => {
    setPanelArea(areaId);
    setPanelOpen(true);
  }, []);

  const handlePanelClose = useCallback(() => {
    setPanelOpen(false);
    setPanelArea(null);
    sceneApiRef.current?.focusArea(null);
  }, []);

  const openQuickView = useCallback(() => {
    setPanelArea(null);
    setPanelOpen(true);
  }, []);

  /**
   * The system navigation opens this same panel (no route change needed):
   * it dispatches a namespaced event instead of sharing state upward.
   */
  useEffect(() => {
    const open = () => openQuickView();
    window.addEventListener('haessler:quick-view', open);
    return () => window.removeEventListener('haessler:quick-view', open);
  }, [openQuickView]);

  const handleEnter = () => {
    document.getElementById('system')?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const hovered = hoveredArea ? worldAreaMap[hoveredArea] : null;
  const hoveredMetric =
    hovered?.headlineMetricId != null ? metrics[hovered.headlineMetricId] : null;

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

                <MagneticButton onClick={openQuickView} variant="outline">
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
                    {metrics.years.value}
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
                     * The world is a first-class element in normal flow on
                     * EVERY breakpoint: it renders above the terminal and
                     * never covers it (the previous desktop overlay sat on
                     * top of the readout). The terminal below stays as the
                     * permanent fallback — visible without WebGL, before the
                     * model loads, under reduced motion and for crawlers.
                     * Pure CSS, no JS breakpoint, single WebGL context.
                     */
                    position="relative"
                    height={{ base: '260px', sm: '340px', md: '420px' }}
                    mb={4}
                    borderRadius="md"
                    borderStyle="solid"
                    borderWidth="1px"
                    borderColor="osBorder"
                    bg="rgba(5, 7, 10, 0.4)"
                    opacity={sceneStatus === 'ready' ? 1 : 0}
                    transition="opacity 700ms ease"
                    pointerEvents={sceneStatus === 'ready' ? 'auto' : 'none'}
                  >
                    <WorkstationScene
                      onStatus={handleSceneStatus}
                      systemName={t.system.name}
                      systemStatus={t.system.status}
                      domains={t.system.domains}
                      onHoverArea={setHoveredArea}
                      onActivateArea={handleActivateArea}
                      onReady={handleSceneReady}
                    />

                    {/**
                     * Hover chip (§8): appears over the scene while an object
                     * is hot. Decorative only — screen readers get the same
                     * facts from the proof panel — so it hides from a11y.
                     */}
                    {hovered && sceneStatus === 'ready' && (
                      <Box
                        position="absolute"
                        bottom={{ base: 3, md: 5 }}
                        left="50%"
                        transform="translateX(-50%)"
                        px={4}
                        py={2}
                        bg="rgba(5, 7, 10, 0.88)"
                        borderWidth="1px"
                        borderColor={hovered.accent}
                        borderRadius="sm"
                        pointerEvents="none"
                        whiteSpace="nowrap"
                      >
                        <Text
                          fontFamily="mono"
                          fontSize="xs"
                          letterSpacing="0.18em"
                          textTransform="uppercase"
                          color={hovered.accent}
                        >
                          {t.world.areaNames[hovered.id]}
                        </Text>
                        {hoveredMetric && (
                          <Text
                            fontFamily="mono"
                            fontSize="xs"
                            letterSpacing="0.1em"
                            color="osTextSecondary"
                          >
                            {hoveredMetric.value}{' '}
                            {t.metrics[hoveredMetric.id].label}
                          </Text>
                        )}
                      </Box>
                    )}
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

      {panelOpen && panelArea && (
        <AreaProofPanel
          area={worldAreaMap[panelArea]}
          onClose={handlePanelClose}
        />
      )}

      {panelOpen && !panelArea && (
        <QuickViewPanel onClose={handlePanelClose} />
      )}
    </Box>
  );
};
