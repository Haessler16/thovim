import { Box, Flex, Heading, Wrap } from '@chakra-ui/react';

import { Chip, ExperienceSection, ReadoutRow } from './ExperienceSection';
import { Reveal } from '../ui/Reveal';
import {
  coreStack,
  profile,
  sectionAnchor,
  sectionIndex,
} from '../../lib/experience/content';
import { metrics } from '../../lib/experience/metrics';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * WHOAMI.
 *
 * No résumé paragraph: domains, stack and current state as data, so the section
 * reads in a couple of seconds instead of asking for a commitment.
 */
export const WhoAmI = () => {
  const t = useExperienceTranslation();

  return (
    <ExperienceSection
      id={sectionAnchor('system')}
      index={sectionIndex('system')}
      title={t.nav.system}
      lead={t.sections.system.lead}
    >
      <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 10, md: 16 }}>
        <Box flex="1 1 0" minW={0}>
          <Heading as="h3" variant="os-eyebrow">
            {t.sections.system.domainsLabel}
          </Heading>

          <Wrap mt={4} spacing={2}>
            {t.sections.system.domains.map((domain) => (
              <Chip key={domain}>{domain}</Chip>
            ))}
          </Wrap>

          <Heading as="h3" variant="os-eyebrow" mt={10}>
            {t.sections.system.stackLabel}
          </Heading>

          <Wrap mt={4} spacing={2}>
            {coreStack.map((technology) => (
              <Chip key={technology} active>
                {technology}
              </Chip>
            ))}
          </Wrap>
        </Box>

        <Box flex="1 1 0" minW={0}>
          <Reveal delay={0.05}>
            <ReadoutRow label={t.common.location}>{profile.location}</ReadoutRow>

            <ReadoutRow label={t.common.years}>
              {t.common.yearsValue}
            </ReadoutRow>

            <ReadoutRow label={t.sections.system.focusLabel}>
              {t.sections.system.focus}
            </ReadoutRow>
          </Reveal>
        </Box>
      </Flex>
    </ExperienceSection>
  );
};
