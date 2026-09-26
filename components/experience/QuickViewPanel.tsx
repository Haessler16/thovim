import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  Text,
  Wrap,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { Chip } from './ExperienceSection';
import { Glow } from '../ui/Glow';
import { MagneticButton } from '../ui/MagneticButton';
import { Metric } from '../ui/Metric';
import {
  coreStack,
  lookingForIds,
  profile,
  recruiter,
  resolveCvLink,
} from '../../lib/experience/content';
import { useRouter } from 'next/router';
import { experienceCases } from '../../lib/experience/cases';
import { featuredMetricIds, metrics } from '../../lib/experience/metrics';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

interface QuickViewPanelProps {
  onClose: () => void;
}

/**
 * QUICK VIEW (§17): the 20–30 second recruiter read, on the page.
 *
 * Everything a recruiter needs in one scannable panel — name, role, the four
 * headline numbers, core stack, the three flagship projects, what Haessler is
 * looking for and how to reach him — without touching the 3D world. Closes
 * with the button, the overlay or Escape (the Drawer handles Escape).
 *
 * The data comes from the same structured sources as the rest of the site
 * (`profile`, `metrics`, `experienceCases`, `coreStack`); nothing is
 * duplicated and nothing is invented. CV/WhatsApp appear only when real URLs
 * exist in `profile.links`.
 */
export const QuickViewPanel = ({ onClose }: QuickViewPanelProps) => {
  const t = useExperienceTranslation();
  const { locale } = useRouter();
  const cvLink = resolveCvLink(locale);
  const featuredMetrics = featuredMetricIds.map((id) => metrics[id]);

  const contacts: Array<{ label: string; href: string; external: boolean }> = [
    { label: t.common.email, href: `mailto:${profile.links.email}`, external: false },
    { label: t.common.linkedin, href: profile.links.linkedin, external: true },
    { label: t.common.github, href: profile.links.github, external: true },
    ...(cvLink
      ? [{ label: t.common.cv, href: cvLink, external: true }]
      : []),
    ...(profile.links.whatsapp
      ? [
          {
            label: t.common.whatsapp,
            href: profile.links.whatsapp,
            external: true,
          },
        ]
      : []),
  ];

  return (
    <Drawer isOpen placement="right" onClose={onClose} size={{ base: 'full', md: 'md' }}>
      <DrawerOverlay bg="rgba(5, 7, 10, 0.7)" backdropFilter="blur(4px)" />
      <DrawerContent
        bg="osSurface"
        borderColor="osBorder"
        borderLeftWidth="1px"
        role="dialog"
        aria-label={t.quickView.title}
      >
        <DrawerCloseButton
          color="osTextSecondary"
          _hover={{ color: 'osText' }}
          aria-label={t.quickView.close}
        />

        <DrawerHeader px={6} pt={8} pb={0}>
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.22em"
            textTransform="uppercase"
            color="osAccent"
          >
            {t.quickView.title}
          </Text>

          <Heading
            as="h2"
            mt={2}
            fontFamily="heading"
            fontSize={{ base: '2xl', md: '3xl' }}
            color="osText"
          >
            {profile.name}
          </Heading>

          <Text mt={1} fontSize="md" color="osTextSecondary">
            {t.role.fullstackMobile}
          </Text>
        </DrawerHeader>

        <DrawerBody px={6} py={5}>
          {/* The four headline numbers, scannable in one glance. */}
          <Glow active borderRadius="md" p={4} bg="osElevated">
            <Flex flexWrap="wrap" gap={6}>
              {featuredMetrics.map((metric) => (
                <Metric
                  key={metric.id}
                  value={metric.value}
                  label={t.metrics[metric.id].label}
                  size="sm"
                />
              ))}
              <Metric
                value={profile.location.split(',')[0]}
                label={t.quickView.locationLabel}
                size="sm"
              />
            </Flex>
          </Glow>

          <Text
            mt={6}
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color="osTextMuted"
          >
            {t.quickView.stackLabel}
          </Text>
          <Wrap spacing={2} mt={2}>
            {coreStack.map((technology) => (
              <Chip key={technology} active>
                {technology}
              </Chip>
            ))}
          </Wrap>

          <Text
            mt={6}
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color="osTextMuted"
          >
            {t.quickView.casesLabel}
          </Text>
          <Wrap spacing={2} mt={2}>
            {recruiter.caseIds.map((caseId) => (
              <Chip key={caseId}>{experienceCases[caseId].code}</Chip>
            ))}
          </Wrap>
          <Wrap spacing={2} mt={3}>
            {recruiter.caseIds.map((caseId) => (
              <Link
                key={caseId}
                as={NextLink}
                href={experienceCases[caseId].legacyHref}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.08em"
                color="osAccentSoft"
                _hover={{ color: 'osAccent' }}
              >
                {t.cases[caseId].title} →
              </Link>
            ))}
          </Wrap>

          <Text
            mt={6}
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color="osTextMuted"
          >
            {t.quickView.lookingForLabel}
          </Text>
          <Wrap spacing={2} mt={2}>
            {lookingForIds.map((id) => (
              <Chip key={id}>{t.recruiter.lookingFor[id]}</Chip>
            ))}
          </Wrap>

          <Text
            mt={6}
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color="osTextMuted"
          >
            {t.quickView.contactLabel}
          </Text>
          <Flex gap={5} flexWrap="wrap" alignItems="center" mt={2}>
            {contacts.map((contact) => (
              <Link
                key={contact.label}
                as={contact.external ? 'a' : NextLink}
                {...(contact.external
                  ? { href: contact.href, target: '_blank', rel: 'noreferrer' }
                  : { href: contact.href })}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="osAccentSoft"
                _hover={{ color: 'osAccent' }}
              >
                {contact.label}
              </Link>
            ))}
          </Flex>
        </DrawerBody>

        <Box px={6} pb={7} mt="auto">
          <MagneticButton href="/recrutatech" variant="outline">
            {t.quickView.recruiterPage}
          </MagneticButton>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};
