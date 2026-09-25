import { Box, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

interface MetricProps {
  /** Pre-formatted figure, e.g. "30K+", "99.8%". */
  value: string;
  label: string;
  context?: string;
  /** Optional evidence link (usually a legacy case page). */
  href?: string;
  hrefLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Turns the figure cyan. Reserved for the metric under focus. */
  accent?: boolean;
  as?: 'div' | 'li';
}

const valueSizes = {
  sm: { base: '2xl' },
  md: { base: '3xl' },
  lg: { base: '4xl', md: '5xl' },
} as const;

/**
 * A production outcome, not a skill bar. Pure presentation: callers resolve
 * `value` from `lib/experience/metrics` and `label`/`context` from the
 * dictionary, so this component never touches content.
 */
export const Metric = ({
  value,
  label,
  context,
  href,
  hrefLabel,
  size = 'md',
  accent = false,
  as = 'div',
}: MetricProps) => (
  <Box as={as} listStyleType="none">
    <Text
      fontFamily="mono"
      fontSize={valueSizes[size]}
      lineHeight="1"
      letterSpacing="-0.02em"
      color={accent ? 'osAccent' : 'osText'}
    >
      {value}
    </Text>

    <Text
      mt={2}
      fontFamily="mono"
      fontSize="xs"
      letterSpacing="0.16em"
      textTransform="uppercase"
      color="osTextSecondary"
    >
      {label}
    </Text>

    {context && (
      <Text mt={2} fontSize="sm" color="osTextMuted">
        {context}
      </Text>
    )}

    {href && hrefLabel && (
      <Link
        as={NextLink}
        mt={2}
        display="inline-block"
        href={href}
        fontSize="xs"
        fontFamily="mono"
        letterSpacing="0.1em"
        textTransform="uppercase"
        color="osAccentSoft"
        _hover={{ color: 'osAccent' }}
      >
        {hrefLabel}
      </Link>
    )}
  </Box>
);
