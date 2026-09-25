import { Box, Button, Flex, Link, Text, Wrap } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';

import { Chip, ExperienceSection, ReadoutRow } from './ExperienceSection';
import { Glow } from '../ui/Glow';
import { experienceCases } from '../../lib/experience/cases';
import {
  problems,
  sectionAnchor,
  sectionIndex,
  type ProblemId,
} from '../../lib/experience/content';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/** Dash-prefixed list used by constraints / decisions / tradeoffs. */
const LabList = ({ items }: { items: string[] }) => (
  <Box as="ul" listStyleType="none">
    {items.map((item) => (
      <Text as="li" key={item} mb={2} lineHeight="1.6">
        <Text as="span" color="osAccent" mr={2}>
          —
        </Text>
        {item}
      </Text>
    ))}
  </Box>
);

/**
 * PROBLEM LAB.
 *
 * The section that carries the senior signal: constraints first, then the
 * decisions, the tradeoffs that were accepted and the outcome. The visitor can
 * switch problems without leaving the page, and each one links to its case file
 * for the full write-up.
 */
export const ProblemLab = () => {
  const t = useExperienceTranslation();
  const labels = t.sections.problems.labels;
  const [activeProblemId, setActiveProblemId] = useState<ProblemId>(
    problems[0].id
  );

  const activeProblem =
    problems.find((problem) => problem.id === activeProblemId) ?? problems[0];
  const copy = t.sections.problems.items[activeProblem.id];
  const relatedCase = experienceCases[activeProblem.caseId];

  return (
    <ExperienceSection
      id={sectionAnchor('problems')}
      index={sectionIndex('problems')}
      title={t.nav.problems}
      lead={t.sections.problems.lead}
    >
      <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 12 }}>
        <Box w={{ lg: '320px' }} flexShrink={0}>
          <Flex direction="column" gap={3}>
            {problems.map((problem) => {
              const isActive = problem.id === activeProblemId;

              return (
                <Button
                  key={problem.id}
                  variant="outline"
                  height="auto"
                  py={4}
                  px={4}
                  display="block"
                  textAlign="left"
                  whiteSpace="normal"
                  bg={isActive ? 'osElevated' : 'transparent'}
                  borderColor={isActive ? 'osAccent' : 'osBorder'}
                  _hover={{ borderColor: 'osAccent' }}
                  _focusVisible={{
                    boxShadow: '0 0 0 3px rgba(0, 229, 255, 0.45)',
                    outline: 'none',
                  }}
                  onClick={() => setActiveProblemId(problem.id)}
                  aria-pressed={isActive}
                >
                  <Text
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="0.18em"
                    color={isActive ? 'osAccent' : 'osTextMuted'}
                  >
                    {problem.code}
                  </Text>
                  <Text
                    mt={2}
                    fontFamily="mono"
                    fontSize="sm"
                    lineHeight="1.5"
                    color={isActive ? 'osText' : 'osTextSecondary'}
                  >
                    {t.sections.problems.items[problem.id].title}
                  </Text>
                </Button>
              );
            })}
          </Flex>
        </Box>

        <Box flex="1 1 0" minW={0}>
          <Glow active bg="osSurface" borderRadius="md" p={{ base: 5, md: 7 }}>
            <Text fontSize="sm" lineHeight="1.7" color="osTextSecondary">
              {copy.summary}
            </Text>

            <Box mt={6}>
              <ReadoutRow label={labels.constraints}>
                <LabList items={copy.constraints} />
              </ReadoutRow>

              <ReadoutRow label={labels.decisions}>
                <LabList items={copy.decisions} />
              </ReadoutRow>

              <ReadoutRow label={labels.tradeoffs}>
                <LabList items={copy.tradeoffs} />
              </ReadoutRow>

              <ReadoutRow label={labels.stack}>
                <Wrap spacing={2}>
                  {relatedCase.stack.map((technology) => (
                    <Chip key={technology}>{technology}</Chip>
                  ))}
                </Wrap>
              </ReadoutRow>

              <ReadoutRow label={labels.result}>
                <Text color="osText">{copy.result}</Text>
              </ReadoutRow>
            </Box>

            <Link
              as={NextLink}
              href={relatedCase.legacyHref}
              mt={6}
              display="inline-block"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="osAccentSoft"
              _hover={{ color: 'osAccent' }}
            >
              {t.sections.cases.labels.deepDive} →
            </Link>
          </Glow>
        </Box>
      </Flex>
    </ExperienceSection>
  );
};
