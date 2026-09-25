import { Box, SimpleGrid, Text } from '@chakra-ui/react';

import { ExperienceSection, ReadoutRow } from './ExperienceSection';
import { Glow } from '../ui/Glow';
import { Reveal } from '../ui/Reveal';
import { tools } from '../../lib/experience/content';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * TECHNOLOGIES AS TOOLS.
 *
 * No percentages: a number like "React 90%" says nothing. Each tool answers
 * WHERE it runs, WHY it is there and, when there is one, the RESULT that can be
 * pointed at. Tools without a published outcome simply omit that row instead of
 * implying evidence that does not exist.
 */
export const TechnologyLab = () => {
  const t = useExperienceTranslation();
  const labels = t.sections.tools.labels;

  return (
    <ExperienceSection
      id="tools"
      title={t.sections.tools.title}
      lead={t.sections.tools.lead}
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 6 }}>
        {tools.map((tool, position) => {
          const copy = t.sections.tools.items[tool.id];

          return (
            <Reveal key={tool.id} delay={position * 0.04}>
              <Glow bg="osSurface" borderRadius="md" p={5} height="100%">
                <Text
                  fontFamily="mono"
                  fontSize="sm"
                  letterSpacing="0.14em"
                  color="osText"
                >
                  {tool.name}
                </Text>

                <Box mt={3}>
                  <ReadoutRow label={labels.where}>{copy.where}</ReadoutRow>
                  <ReadoutRow label={labels.why}>{copy.why}</ReadoutRow>
                  {copy.result && (
                    <ReadoutRow label={labels.result}>{copy.result}</ReadoutRow>
                  )}
                </Box>
              </Glow>
            </Reveal>
          );
        })}
      </SimpleGrid>
    </ExperienceSection>
  );
};
