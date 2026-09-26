import { Text, Wrap } from '@chakra-ui/react';

import { Chip, ExperienceSection } from './ExperienceSection';
import { Glow } from '../ui/Glow';
import { Reveal } from '../ui/Reveal';
import {
  humanInterestIds,
  sectionAnchor,
  sectionIndex,
} from '../../lib/experience/content';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * HUMAN.EXE.
 *
 * The shortest section on purpose. It exists so the page ends with a person
 * rather than a metrics table, and it does that with five labels and one line —
 * not a biography. PHASE 4 can hang a small set of 3D desk objects beside it,
 * but the content stands on its own without them.
 */
export const HumanExe = () => {
  const t = useExperienceTranslation();

  return (
    <ExperienceSection
      id={sectionAnchor('human')}
      index={sectionIndex('human')}
      title={t.nav.human}
      lead={t.sections.human.lead}
    >
      <Reveal>
        {/**
         * HUMAN is the one place the palette goes warm (§13/§14): an amber
         * ring around the panel and warm-tinted chips, nothing else on the
         * page uses this color.
         */}
        <Glow accentColor="osAmber" active bg="osSurface" borderRadius="md" p={{ base: 5, md: 7 }}>
          <Wrap spacing={3}>
            {humanInterestIds.map((interestId) => (
              <Chip key={interestId} active accentColor="osAmber">
                {t.sections.human.interests[interestId]}
              </Chip>
            ))}
          </Wrap>

          <Text mt={6} fontSize="sm" color="osTextMuted">
            {t.sections.human.note}
          </Text>
        </Glow>
      </Reveal>
    </ExperienceSection>
  );
};
