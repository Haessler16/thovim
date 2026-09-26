import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { ExperienceSection } from './ExperienceSection';
import { MagneticButton } from '../ui/MagneticButton';
import { Reveal } from '../ui/Reveal';
import {
  profile,
  resolveCvLink,
  sectionAnchor,
  sectionIndex,
} from '../../lib/experience/content';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * CONTACT.
 *
 * The CV and WhatsApp buttons only render when `profile.links` actually holds a
 * URL — both are `null` today, so the section never offers a dead link. Adding
 * the real values in `lib/experience/content.ts` is all it takes for them to
 * appear.
 */
export const Contact = () => {
  const t = useExperienceTranslation();
  const cvLink = resolveCvLink(useRouter().locale);

  return (
    <ExperienceSection
      id={sectionAnchor('contact')}
      index={sectionIndex('contact')}
      title={t.nav.contact}
      lead={t.sections.contact.lead}
    >
      <Reveal>
        <Heading
          as="h3"
          fontFamily="heading"
          fontSize={{ base: '3xl', md: '5xl' }}
          lineHeight="1.05"
          letterSpacing="-0.02em"
          color="osText"
        >
          {t.sections.contact.statement}
        </Heading>
      </Reveal>

      <Reveal delay={0.05}>
        <Flex mt={8} gap={3} flexWrap="wrap" alignItems="center">
          <MagneticButton external href={`mailto:${profile.links.email}`}>
            {t.common.email}
          </MagneticButton>

          <MagneticButton external href={profile.links.linkedin} variant="outline">
            {t.common.linkedin}
          </MagneticButton>

          <MagneticButton external href={profile.links.github} variant="outline">
            {t.common.github}
          </MagneticButton>

          {cvLink && (
            <MagneticButton external href={cvLink} variant="outline">
              {t.common.cv}
            </MagneticButton>
          )}

          {profile.links.whatsapp && (
            <MagneticButton external href={profile.links.whatsapp} variant="outline">
              {t.common.whatsapp}
            </MagneticButton>
          )}
        </Flex>
      </Reveal>

      <Reveal delay={0.1}>
        <Text mt={6} fontFamily="mono" fontSize="xs" color="osTextMuted">
          {profile.links.email} · {profile.location}
        </Text>
      </Reveal>

      <Reveal delay={0.15}>
        <Flex
          mt={10}
          pt={6}
          gap={6}
          flexWrap="wrap"
          borderTopWidth="1px"
          borderColor="osBorder"
        >
          <Box>
            <Link
              as={NextLink}
              href="/recrutatech"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="osAccentSoft"
              _hover={{ color: 'osAccent' }}
            >
              {t.shell.quickView} →
            </Link>
            <Text mt={2} fontSize="xs" color="osTextMuted">
              {t.sections.contact.recruiterHint}
            </Text>
          </Box>

          <Box>
            <Link
              as={NextLink}
              href="/classic"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="osTextSecondary"
              _hover={{ color: 'osAccent' }}
            >
              {t.shell.classicPortfolio} →
            </Link>
            <Text mt={2} fontSize="xs" color="osTextMuted">
              {t.sections.contact.classicHint}
            </Text>
          </Box>
        </Flex>
      </Reveal>
    </ExperienceSection>
  );
};
