import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';

import { Metric } from '../ui/Metric';
import { Reveal } from '../ui/Reveal';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';
import { experienceCases } from '../../lib/experience/cases';
import { metrics } from '../../lib/experience/metrics';
import { recruiter } from '../../lib/experience/content';

/**
 * The four numbers a recruiter should take away. Each one links to the case
 * file it comes from, so the claim is always one click away from its evidence.
 */
export const RecruiterMetrics = () => {
  const t = useExperienceTranslation();

  return (
    <Box
      as="section"
      aria-labelledby="recruiter-proof"
      borderBottomWidth="1px"
      borderColor="osBorder"
    >
      <Container maxW="1080px" py={{ base: 10, md: 16 }}>
        <Heading as="h2" id="recruiter-proof" variant="os-eyebrow">
          {t.recruiter.proofTitle}
        </Heading>

        <SimpleGrid
          as="ul"
          mt={9}
          columns={{ base: 2, md: 4 }}
          spacingX={{ base: 4, md: 6 }}
          spacingY={10}
          m={0}
          p={0}
          listStyleType="none"
        >
          {recruiter.proofMetricIds.map((metricId, position) => {
            const metric = metrics[metricId];
            const copy = t.metrics[metricId];
            const caseHref = metric.caseId
              ? experienceCases[metric.caseId].legacyHref
              : undefined;

            return (
              <Box as="li" key={metricId}>
                <Reveal delay={position * 0.05}>
                  <Metric
                    value={metric.value}
                    label={copy.label}
                    href={caseHref}
                    hrefLabel={t.recruiter.viewCase}
                    // Exactly one cyan figure here: the accent stays an accent.
                    accent={position === 0}
                  />
                </Reveal>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
