import { Box, Flex, Heading, Link, SimpleGrid, Text, Wrap } from '@chakra-ui/react';
import NextLink from 'next/link';

import { Chip, ExperienceSection } from './ExperienceSection';
import { Glow } from '../ui/Glow';
import { Metric } from '../ui/Metric';
import { Reveal } from '../ui/Reveal';
import { caseList, type CaseId } from '../../lib/experience/cases';
import { metrics } from '../../lib/experience/metrics';
import { sectionAnchor, sectionIndex } from '../../lib/experience/content';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * CASE FILES.
 *
 * Three projects, each linking out to the legacy deep-dive that already exists
 * (`/works/*`) instead of duplicating those write-ups here. Metrics shown on a
 * card are the ones `lib/experience/metrics.ts` attributes to that case.
 *
 * Each card carries its area's semantic accent (§14): Busi = MOBILE electric
 * blue, DecentralFi = WEB3 violet, Zumetrics = system cyan. Thin rings and
 * colored labels only — the accent budget stays small.
 */
const caseAccent: Record<CaseId, string> = {
  busi: 'osElectricBlue',
  decentralfi: 'osViolet',
  zumetrics: 'osAccent',
};

export const CaseFiles = () => {
  const t = useExperienceTranslation();
  const labels = t.sections.cases.labels;

  return (
    <ExperienceSection
      id={sectionAnchor('cases')}
      index={sectionIndex('cases')}
      title={t.nav.cases}
      lead={t.sections.cases.lead}
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: 8 }}>
        {caseList.map((caseFile, position) => {
          const copy = t.cases[caseFile.id];
          const caseMetrics = caseFile.metricIds.map((id) => metrics[id]);
          const accent = caseAccent[caseFile.id];

          return (
            <Reveal key={caseFile.id} delay={position * 0.05}>
              <Glow
                accentColor={accent}
                active
                bg="osSurface"
                borderRadius="md"
                p={{ base: 5, md: 7 }}
                height="100%"
                display="flex"
                flexDirection="column"
              >
                <Flex alignItems="center" justifyContent="space-between" gap={3}>
                  <Text
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="0.18em"
                    color={accent}
                  >
                    {caseFile.code}
                  </Text>
                  <Text
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                    color="osTextMuted"
                  >
                    {copy.category}
                  </Text>
                </Flex>

                <Heading
                  as="h3"
                  mt={4}
                  fontFamily="heading"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  color="osText"
                >
                  {copy.title}
                </Heading>

                <Text
                  mt={3}
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color="osTextMuted"
                >
                  {labels.role}: {copy.role}
                </Text>

                <Text mt={4} fontSize="sm" lineHeight="1.7" color="osTextSecondary">
                  {copy.summary}
                </Text>

                <SimpleGrid columns={2} spacing={5} mt={6}>
                  {caseMetrics.map((metric) => (
                    <Metric
                      key={metric.id}
                      value={metric.value}
                      label={t.metrics[metric.id].label}
                      size="sm"
                    />
                  ))}
                </SimpleGrid>

                <Wrap spacing={2} mt={6}>
                  {caseFile.stack.map((technology) => (
                    <Chip key={technology}>{technology}</Chip>
                  ))}
                </Wrap>

                <Flex
                  mt="auto"
                  pt={6}
                  gap={5}
                  flexWrap="wrap"
                  alignItems="center"
                  borderTopWidth="1px"
                  borderColor="osBorder"
                >
                  <Link
                    as={NextLink}
                    href={caseFile.legacyHref}
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="0.12em"
                    textTransform="uppercase"
                    color={accent}
                    _hover={{ color: 'osText' }}
                  >
                    {labels.deepDive} →
                  </Link>

                  {caseFile.externalHref && (
                    <Link
                      as="a"
                      href={caseFile.externalHref}
                      target="_blank"
                      rel="noreferrer"
                      fontFamily="mono"
                      fontSize="xs"
                      letterSpacing="0.12em"
                      textTransform="uppercase"
                      color="osTextSecondary"
                      _hover={{ color: 'osAccent' }}
                    >
                      {labels.live} ↗
                    </Link>
                  )}
                </Flex>
              </Glow>
            </Reveal>
          );
        })}
      </SimpleGrid>

      <Box mt={8}>
        <Link
          as={NextLink}
          href="/works"
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="0.12em"
          textTransform="uppercase"
          color="osTextSecondary"
          _hover={{ color: 'osAccent' }}
        >
          {labels.archive} →
        </Link>
      </Box>
    </ExperienceSection>
  );
};
