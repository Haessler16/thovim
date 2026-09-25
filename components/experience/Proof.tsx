import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';

import { ExperienceSection } from './ExperienceSection';
import { Led } from '../ui/Glow';
import { Metric } from '../ui/Metric';
import { Reveal } from '../ui/Reveal';
import { experienceCases } from '../../lib/experience/cases';
import { metricList } from '../../lib/experience/metrics';
import { sectionAnchor, sectionIndex } from '../../lib/experience/content';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * PROOF.
 *
 * Outcomes, not skill bars. Every card links back to the case file it came
 * from, and each one declares where its number comes from:
 *
 *  - `repository`: already documented in the portfolio/CV
 *  - `brief`: supplied in the brief and not yet verifiable in the repo
 *
 * The second group is flagged while running `next dev`, so the figures that
 * still need confirming stay visible to whoever is editing the site and can be
 * confirmed or deleted in `lib/experience/metrics.ts` before publishing.
 */
export const Proof = () => {
  const t = useExperienceTranslation();
  const showPendingState = process.env.NODE_ENV !== 'production';

  return (
    <ExperienceSection
      id={sectionAnchor('proof')}
      index={sectionIndex('proof')}
      title={t.nav.proof}
      lead={t.sections.proof.lead}
    >
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 4, md: 6 }}>
        {metricList.map((metric, position) => {
          const copy = t.metrics[metric.id];
          const isVerified = metric.source === 'repository';
          const evidenceHref = metric.caseId
            ? experienceCases[metric.caseId].legacyHref
            : undefined;

          const statusLabel = isVerified
            ? t.sections.proof.verified
            : showPendingState
              ? t.sections.proof.pending
              : '';

          return (
            <Reveal key={metric.id} delay={position * 0.05}>
              <Box bg="osSurface" borderWidth="1px" borderColor="osBorder" borderRadius="md" p={5} height="100%">
                <Flex alignItems="center" justifyContent="space-between" gap={2} mb={4}>
                  <Text
                    fontFamily="mono"
                    fontSize="10px"
                    letterSpacing="0.16em"
                    color={isVerified ? 'osAccent' : 'osTextMuted'}
                  >
                    {statusLabel}
                  </Text>
                  <Led active={isVerified} />
                </Flex>

                <Metric
                  value={metric.value}
                  label={copy.label}
                  context={copy.context}
                  href={evidenceHref}
                  hrefLabel={t.sections.proof.evidence}
                />
              </Box>
            </Reveal>
          );
        })}
      </SimpleGrid>
    </ExperienceSection>
  );
};
