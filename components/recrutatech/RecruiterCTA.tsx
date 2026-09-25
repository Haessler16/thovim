import { Box, Container, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { MagneticButton } from '../ui/MagneticButton';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';
import { profile } from '../../lib/experience/content';

interface ContactAction {
  key: string;
  label: string;
  href: string;
}

/**
 * Every contact route in one row. CV and WhatsApp only appear once a real URL
 * is configured in `profile.links` — no dead links, no placeholder targets.
 */
export const RecruiterCTA = () => {
  const t = useExperienceTranslation();
  const { email, linkedin, github, cv, whatsapp } = profile.links;

  const actions: ContactAction[] = [
    { key: 'email', label: t.common.email, href: `mailto:${email}` },
    { key: 'linkedin', label: t.common.linkedin, href: linkedin },
    { key: 'github', label: t.common.github, href: github },
  ];

  if (cv) {
    actions.push({ key: 'cv', label: t.common.cv, href: cv });
  }

  if (whatsapp) {
    actions.push({ key: 'whatsapp', label: t.common.whatsapp, href: whatsapp });
  }

  return (
    <Box as="section" aria-labelledby="recruiter-contact">
      <Container maxW="1080px" py={{ base: 12, md: 20 }}>
        <Heading as="h2" id="recruiter-contact" variant="os-eyebrow">
          {t.recruiter.contactTitle}
        </Heading>

        <Text
          mt={5}
          fontFamily="heading"
          fontSize={{ base: '2xl', md: '4xl' }}
          lineHeight="1.15"
          letterSpacing="-0.01em"
          color="osText"
        >
          {t.recruiter.statement}
        </Text>

        <Flex mt={9} gap={3} flexWrap="wrap">
          {actions.map((action, position) => (
            <MagneticButton
              key={action.key}
              external
              href={action.href}
              variant={position === 0 ? 'solid' : 'outline'}
            >
              {action.label}
            </MagneticButton>
          ))}
        </Flex>

        <Flex mt={10} alignItems="center" gap={3} flexWrap="wrap">
          <Link
            as={NextLink}
            href="/"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.14em"
            textTransform="uppercase"
            color="osAccentSoft"
            _hover={{ color: 'osAccent' }}
          >
            {t.recruiter.exploreFull}
          </Link>

          <Text aria-hidden="true" color="osTextMuted">
            →
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};
