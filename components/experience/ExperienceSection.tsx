import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Reveal } from '../ui/Reveal';

interface ExperienceSectionProps {
  /** DOM anchor. Must match `experienceSections[].anchor`. */
  id: string;
  /** Two-digit system index. Omitted for sections that are not in the nav. */
  index?: string;
  /** Localised label, usually `t.nav.*`. */
  title: string;
  /** One sentence of context, not a wall of text. */
  lead?: string;
  children: ReactNode;
}

/**
 * One section of the HAESSLER OS page.
 *
 * Every section shares the same header grammar (index / label / hairline) so
 * the page reads as one system instead of ten unrelated blocks. The container
 * lives here rather than at page level so a section can be reordered or
 * removed without touching the page's layout maths.
 */
export const ExperienceSection = ({
  id,
  index,
  title,
  lead,
  children,
}: ExperienceSectionProps) => (
  <Box
    as="section"
    id={id}
    /** Clears the sticky navigation when an anchor is followed. */
    scrollMarginTop={{ base: '112px', md: '76px' }}
    borderTopWidth="1px"
    borderColor="osBorder"
    py={{ base: 14, md: 20 }}
  >
    <Container maxW="1080px" px={{ base: 5, md: 8 }}>
      <Reveal>
        <Flex alignItems="center" gap={{ base: 3, md: 4 }}>
          {index && (
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.2em"
              color="osAccent"
              flexShrink={0}
            >
              {index}
            </Text>
          )}

          <Heading
            as="h2"
            fontFamily="mono"
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="normal"
            letterSpacing="0.24em"
            textTransform="uppercase"
            color="osText"
            whiteSpace="nowrap"
          >
            {title}
          </Heading>

          <Box flexGrow={1} height="1px" bg="osBorder" />
        </Flex>
      </Reveal>

      {lead && (
        <Reveal delay={0.05}>
          <Text
            mt={6}
            maxW="68ch"
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight="1.6"
            color="osTextSecondary"
          >
            {lead}
          </Text>
        </Reveal>
      )}

      <Box mt={{ base: 8, md: 12 }}>{children}</Box>
    </Container>
  </Box>
);

/** Label/value row, monospace label on the left. Stacks on small screens. */
export const ReadoutRow = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <Flex
    direction={{ base: 'column', sm: 'row' }}
    gap={{ base: 1, sm: 4 }}
    py={3}
    alignItems={{ sm: 'baseline' }}
    borderBottomWidth="1px"
    borderColor="osBorder"
    _last={{ borderBottomWidth: 0, pb: 0 }}
  >
    <Text
      fontFamily="mono"
      fontSize="xs"
      letterSpacing="0.16em"
      textTransform="uppercase"
      color="osTextMuted"
      minW={{ sm: '150px' }}
      flexShrink={0}
    >
      {label}
    </Text>

    <Box flexGrow={1} fontSize="sm" color="osTextSecondary" lineHeight="1.6">
      {children}
    </Box>
  </Flex>
);

/** Stack/metadata chip. `active` spends a little of the cyan budget. */
export const Chip = ({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) => (
  <Box
    as="span"
    display="inline-block"
    px={3}
    py={1}
    borderWidth="1px"
    borderColor={active ? 'osAccent' : 'osBorder'}
    borderRadius="sm"
    bg="osSurface"
    fontFamily="mono"
    fontSize="xs"
    letterSpacing="0.08em"
    color={active ? 'osAccent' : 'osTextSecondary'}
  >
    {children}
  </Box>
);
