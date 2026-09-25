import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';

import { MagneticButton } from '../ui/MagneticButton';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';
import { profile } from '../../lib/experience/content';
import { metrics } from '../../lib/experience/metrics';
import type { RecruiterSource } from '../../lib/experience/content';

interface RecruiterHeroProps {
  /** Populated from ?source=qr|nfc on the physical networking card. */
  source: RecruiterSource | null;
}

export const RecruiterHero = ({ source }: RecruiterHeroProps) => {
  const t = useExperienceTranslation();

  const sourceNote =
    source === 'nfc'
      ? t.recruiter.sourceNfc
      : source === 'qr'
        ? t.recruiter.sourceQr
        : null;

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      borderBottomWidth="1px"
      borderColor="osBorder"
    >
      <Box
        aria-hidden="true"
        position="absolute"
        inset={0}
        className="os-grid-bg"
        opacity={0.55}
      />

      {/* Fades the grid back into the page background so it never competes. */}
      <Box
        aria-hidden="true"
        position="absolute"
        inset={0}
        bgGradient="linear(to bottom, transparent, transparent 40%, osBg)"
      />

      <Container
        position="relative"
        maxW="1080px"
        pt={{ base: 12, md: 20 }}
        pb={{ base: 10, md: 16 }}
      >
        <Text
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="0.24em"
          textTransform="uppercase"
          color="osAccent"
        >
          {t.recruiter.sceneTitle}
        </Text>

        <Text
          mt={4}
          fontFamily="mono"
          fontSize={{ base: 'sm', md: 'md' }}
          letterSpacing="0.06em"
          color="osTextSecondary"
        >
          {t.recruiter.eyebrow}
        </Text>

        <Heading
          as="h1"
          mt={5}
          fontFamily="heading"
          fontSize={{ base: '4xl', md: '6xl' }}
          lineHeight="1"
          letterSpacing="-0.02em"
          color="osText"
        >
          {profile.name}
        </Heading>

        <Text mt={4} fontSize={{ base: 'lg', md: 'xl' }} color="osTextSecondary">
          {t.role.fullstackMobile}
        </Text>

        <Flex
          mt={5}
          gap={3}
          alignItems="center"
          flexWrap="wrap"
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="0.16em"
          textTransform="uppercase"
          color="osTextMuted"
        >
          <Text color="osText">
            {metrics.years.value} {t.common.years}
          </Text>
          <Text aria-hidden="true">{t.recruiter.metaSeparator}</Text>
          <Text>{profile.location}</Text>
        </Flex>

        <Flex mt={9} gap={3} flexWrap="wrap">
          <MagneticButton external href={`mailto:${profile.links.email}`}>
            {t.common.email}
          </MagneticButton>

          <MagneticButton external href={profile.links.linkedin} variant="outline">
            {t.common.linkedin}
          </MagneticButton>

          <MagneticButton external href={profile.links.github} variant="outline">
            {t.common.github}
          </MagneticButton>
        </Flex>

        {sourceNote && (
          <Text mt={5} fontFamily="mono" fontSize="xs" color="osTextMuted">
            {sourceNote}
          </Text>
        )}
      </Container>
    </Box>
  );
};
