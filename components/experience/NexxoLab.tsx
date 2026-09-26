import { Box, Flex, Text, Wrap } from '@chakra-ui/react';
import { useState } from 'react';

import { Chip, ExperienceSection } from './ExperienceSection';
import { Glow } from '../ui/Glow';
import { MagneticButton } from '../ui/MagneticButton';
import { Reveal } from '../ui/Reveal';
import {
  nexxoCapabilities,
  nexxoConceptIds,
  nexxoFlowIds,
  nexxoGroupPreview,
  nexxoLegacyHref,
  nexxoPlatforms,
  nexxoPrincipleKeys,
  nexxoProductUrl,
  nexxoStack,
  nexxoTimeline,
  nexxoUseCaseIds,
  type NexxoFlowId,
} from '../../lib/experience/nexxo';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * NEXXO PRODUCT LAB (§4–§9 of the Nexxo brief).
 *
 * A first-class HTML case study — never WebGL-only (§13). The 3D phone in
 * the hero scene is the door; everything a recruiter or engineer needs lives
 * here as semantic HTML: the problem, the product, the indexed-netting data
 * flow, the concept screen, the origin story, the verified stack and the
 * CTAs into the real product.
 *
 * Content discipline (§15): no users, downloads, revenue, funding or
 * performance figures — none are published anywhere. The group preview is
 * the official site's illustrative example and is labeled as such.
 */
export const NexxoLab = () => {
  const t = useExperienceTranslation();
  const [activeFlowNode, setActiveFlowNode] = useState<NexxoFlowId>('expense');

  return (
    <ExperienceSection id="nexxo-lab" title={t.nexxo.title}>
      {/* — header — */}
      <Reveal>
        <Text
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="0.22em"
          textTransform="uppercase"
          color="osElectricBlue"
        >
          {t.nexxo.eyebrow} · {t.nexxo.category}
        </Text>
      </Reveal>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: 10, lg: 14 }}
        mt={{ base: 8, md: 10 }}
        alignItems={{ lg: 'flex-start' }}
      >
        {/* — left column: problem / product / why / engineering — */}
        <Box flex="1 1 0" minW={0}>
          <Reveal delay={0.05}>
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color="osTextMuted"
            >
              {t.nexxo.problemTitle}
            </Text>
            <Text mt={3} fontSize="md" lineHeight="1.7" color="osTextSecondary">
              {t.nexxo.problem}
            </Text>

            <Text
              mt={7}
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color="osTextMuted"
            >
              {t.nexxo.productTitle}
            </Text>
            <Text mt={3} fontSize="md" lineHeight="1.7" color="osTextSecondary">
              {t.nexxo.product}
            </Text>

            <Text
              mt={7}
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color="osTextMuted"
            >
              {t.nexxo.conceptsTitle}
            </Text>
            <Wrap spacing={2} mt={3}>
              {nexxoConceptIds.map((conceptId) => (
                <Chip key={conceptId} active accentColor="osElectricBlue">
                  {t.nexxo.concepts[conceptId]}
                </Chip>
              ))}
            </Wrap>

            <Text
              mt={7}
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color="osTextMuted"
            >
              {t.nexxo.useCasesTitle}
            </Text>
            <Wrap spacing={2} mt={3}>
              {nexxoUseCaseIds.map((useCaseId) => (
                <Chip key={useCaseId}>
                  {t.nexxo.useCases[useCaseId]}
                </Chip>
              ))}
            </Wrap>

            {/* — §7 WHY I BUILT IT — */}
            <Glow
              accentColor="osAmber"
              bg="osSurface"
              borderRadius="md"
              p={{ base: 5, md: 6 }}
              mt={9}
            >
              <Text
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.18em"
                textTransform="uppercase"
                color="osAmber"
              >
                {t.nexxo.whyTitle}
              </Text>
              <Text
                mt={3}
                fontSize="md"
                lineHeight="1.7"
                color="osTextSecondary"
              >
                {t.nexxo.whyBody}
              </Text>

              <Flex
                direction={{ base: 'column', sm: 'row' }}
                flexWrap="wrap"
                gap={4}
                mt={5}
              >
                {nexxoPrincipleKeys.map((principleKey) => (
                  <Text
                    key={principleKey}
                    flex={{ sm: '1 1 40%' }}
                    fontSize="xs"
                    lineHeight="1.6"
                    color="osTextMuted"
                  >
                    <Text as="span" color="osAmber" mr={2}>
                      ›
                    </Text>
                    {t.nexxo.principles[principleKey]}
                  </Text>
                ))}
              </Flex>
            </Glow>

            {/* — §8 ENGINEERING (verified only) — */}
            <Text
              mt={9}
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color="osElectricBlue"
            >
              {t.nexxo.engineeringTitle}
            </Text>
            <Text mt={2} fontSize="sm" color="osTextMuted">
              {t.nexxo.engineeringLead}
            </Text>

            <Text
              mt={5}
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="osTextMuted"
            >
              {t.nexxo.stackLabel}
            </Text>
            <Wrap spacing={2} mt={2}>
              {nexxoStack.map((technology) => (
                <Chip key={technology} active accentColor="osElectricBlue">
                  {technology}
                </Chip>
              ))}
            </Wrap>

            <Flex gap={{ base: 6, sm: 10 }} flexWrap="wrap" mt={5}>
              <Box>
                <Text
                  fontFamily="mono"
                  fontSize="10px"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  color="osTextMuted"
                >
                  {t.nexxo.platformsLabel}
                </Text>
                <Wrap spacing={2} mt={2}>
                  {nexxoPlatforms.map((platform) => (
                    <Chip key={platform}>{platform}</Chip>
                  ))}
                </Wrap>
              </Box>
              <Box minW={0}>
                <Text
                  fontFamily="mono"
                  fontSize="10px"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  color="osTextMuted"
                >
                  {t.nexxo.capabilitiesLabel}
                </Text>
                <Wrap spacing={2} mt={2}>
                  {nexxoCapabilities.map((capability) => (
                    <Chip key={capability}>{capability}</Chip>
                  ))}
                </Wrap>
              </Box>
            </Flex>

            {/* — ORIGIN timeline (official /about) — */}
            <Text
              mt={9}
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color="osTextMuted"
            >
              {t.nexxo.timelineTitle}
            </Text>
            <Box mt={3}>
              {nexxoTimeline.map((milestone) => (
                <Flex key={milestone.key} gap={4} py={2} alignItems="baseline">
                  <Text
                    fontFamily="mono"
                    fontSize="sm"
                    color="osElectricBlue"
                    flexShrink={0}
                  >
                    {milestone.year}
                  </Text>
                  <Text fontSize="sm" lineHeight="1.6" color="osTextSecondary">
                    {t.nexxo.timeline[milestone.key]}
                  </Text>
                </Flex>
              ))}
            </Box>
            <Text mt={3} fontSize="xs" color="osTextMuted">
              {t.nexxo.dataSources}
            </Text>

            {/* — §9 CTAs — */}
            <Flex mt={9} gap={3} flexWrap="wrap" alignItems="center">
              <MagneticButton href={nexxoProductUrl} external>
                {t.nexxo.explore}
              </MagneticButton>

              <MagneticButton href={nexxoLegacyHref} variant="outline">
                {t.nexxo.caseStudy}
              </MagneticButton>
            </Flex>
          </Reveal>
        </Box>

        {/* — right column: data flow + concept screen — */}
        <Box flexShrink={0} w="100%" maxW={{ lg: '340px' }}>
          <Reveal delay={0.1}>
            {/* — §5 interactive data flow — */}
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color="osElectricBlue"
            >
              {t.nexxo.flowTitle}
            </Text>
            <Text
              mt={1}
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="osTextMuted"
            >
              {t.nexxo.flowHint}
            </Text>

            <Box
              as="ul"
              listStyleType="none"
              mt={4}
              borderLeftWidth="1px"
              borderColor="osBorder"
              ml={2}
            >
              {nexxoFlowIds.map((flowId, index) => {
                const isActive = flowId === activeFlowNode;

                return (
                  <Box as="li" key={flowId} position="relative" pl={6}>
                    <Box
                      as="button"
                      type="button"
                      display="block"
                      w="100%"
                      textAlign="left"
                      py={2}
                      onMouseEnter={() => setActiveFlowNode(flowId)}
                      onFocus={() => setActiveFlowNode(flowId)}
                      onClick={() => setActiveFlowNode(flowId)}
                      aria-pressed={isActive}
                      _focusVisible={{
                        outline: '2px solid',
                        outlineColor: 'osElectricBlue',
                        outlineOffset: '2px',
                      }}
                    >
                      <Flex alignItems="center" gap={3}>
                        <Box
                          boxSize="8px"
                          borderRadius="full"
                          borderWidth="1px"
                          borderColor={
                            isActive ? 'osElectricBlue' : 'osBorder'
                          }
                          bg={isActive ? 'osElectricBlue' : 'osSurface'}
                          transition="background-color 160ms ease, border-color 160ms ease, transform 160ms ease"
                          transform={isActive ? 'scale(1.35)' : 'scale(1)'}
                          position="absolute"
                          left={-4.5}
                        />
                        <Text
                          fontFamily="mono"
                          fontSize="xs"
                          letterSpacing="0.14em"
                          textTransform="uppercase"
                          color={isActive ? 'osText' : 'osTextSecondary'}
                          transition="color 160ms ease"
                        >
                          {t.nexxo.flow[flowId]}
                        </Text>
                      </Flex>
                    </Box>

                    {index < nexxoFlowIds.length - 1 && (
                      <Box aria-hidden="true" pb={2} pl={0}>
                        <Text fontFamily="mono" fontSize="10px" color="osTextMuted">
                          ↓
                        </Text>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>

            <Text
              mt={3}
              minH="48px"
              fontSize="sm"
              lineHeight="1.6"
              color="osTextSecondary"
            >
              {t.nexxo.flowDetail[activeFlowNode]}
            </Text>

            {/* — §6 concept screen (illustrative, official example) — */}
            <Glow
              accentColor="osElectricBlue"
              active
              borderRadius="lg"
              p={3}
              bg="osSurface"
              mt={7}
              maxW="300px"
              mx={{ base: 'auto', lg: 0 }}
            >
              <Box
                borderWidth="1px"
                borderColor="osBorder"
                borderRadius="md"
                overflow="hidden"
                bg="osElevated"
              >
                <Flex
                  px={4}
                  py={3}
                  borderBottomWidth="1px"
                  borderColor="osBorder"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={3}
                >
                  <Text
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                    color="osText"
                    isTruncated
                  >
                    {t.nexxo.previewTripLabel}: {nexxoGroupPreview.trip}
                  </Text>
                  <Box boxSize="6px" borderRadius="full" bg="osElectricBlue" />
                </Flex>

                <Box px={4} py={3}>
                  {nexxoGroupPreview.members.map((member) => (
                    <Flex
                      key={member.name}
                      justifyContent="space-between"
                      alignItems="baseline"
                      py={2}
                      borderBottomWidth="1px"
                      borderColor="osBorder"
                      _last={{ borderBottomWidth: 0 }}
                    >
                      <Text fontSize="sm" color="osText">
                        {member.name}
                      </Text>
                      <Text
                        fontFamily="mono"
                        fontSize="xs"
                        color={member.positive ? 'osAccentSoft' : 'osTextSecondary'}
                      >
                        {member.positive ? 'receives' : 'pays'} {member.amount}
                      </Text>
                    </Flex>
                  ))}
                </Box>

                <Box px={4} py={2} bg="osSurface">
                  <Text
                    fontFamily="mono"
                    fontSize="10px"
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                    color="osTextMuted"
                  >
                    {t.nexxo.previewTitle} · {t.nexxo.previewIllustrative}
                  </Text>
                </Box>
              </Box>
            </Glow>
          </Reveal>
        </Box>
      </Flex>
    </ExperienceSection>
  );
};
