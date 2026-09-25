import { Box, Text, Wrap } from '@chakra-ui/react';

import { Chip, ExperienceSection, ReadoutRow } from './ExperienceSection';
import { Terminal } from '../ui/Terminal';
import { Reveal } from '../ui/Reveal';
import {
  lookingForIds,
  nowFocusIds,
  nowPriorityIds,
  profile,
  sectionAnchor,
  sectionIndex,
} from '../../lib/experience/content';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * NOW.
 *
 * A state readout, not a "looking for opportunities" poster with a date on it.
 * Every value comes from `lib/experience/content`, so updating availability or
 * focus is a one-file change and no section copy has to be rewritten.
 */
export const Now = () => {
  const t = useExperienceTranslation();
  const labels = t.sections.now.labels;

  return (
    <ExperienceSection
      id={sectionAnchor('now')}
      index={sectionIndex('now')}
      title={t.nav.now}
      lead={t.sections.now.lead}
    >
      <Reveal>
        <Box maxW="760px">
          <Terminal title={t.nav.now} meta={t.system.name}>
            <ReadoutRow label={labels.location}>{profile.location}</ReadoutRow>

            <ReadoutRow label={labels.focus}>
              <Wrap spacing={2}>
                {nowFocusIds.map((focusId) => (
                  <Chip key={focusId}>{t.sections.now.focus[focusId]}</Chip>
                ))}
              </Wrap>
            </ReadoutRow>

            <ReadoutRow label={labels.lookingFor}>
              <Box as="ul" listStyleType="none">
                {lookingForIds.map((lookingForId) => (
                  <Text as="li" key={lookingForId} mb={1}>
                    <Text as="span" color="osAccent" mr={2}>
                      —
                    </Text>
                    {t.recruiter.lookingFor[lookingForId]}
                  </Text>
                ))}
              </Box>
            </ReadoutRow>

            <ReadoutRow label={labels.priorities}>
              <Wrap spacing={2}>
                {nowPriorityIds.map((priorityId) => (
                  <Chip key={priorityId}>
                    {t.sections.now.priorities[priorityId]}
                  </Chip>
                ))}
              </Wrap>
            </ReadoutRow>
          </Terminal>
        </Box>
      </Reveal>
    </ExperienceSection>
  );
};
