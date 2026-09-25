import { Box, type BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface GlowProps extends Omit<BoxProps, 'children'> {
  children?: ReactNode;
  /** Selected/active state. Reserved for a handful of moments, not every card. */
  active?: boolean;
}

/**
 * Restrained accent ring.
 *
 * The accent budget for the whole experience is roughly 3%, so this is a thin
 * ring plus a very soft halo instead of the usual neon drop shadow.
 */
export const Glow = ({ children, active = false, ...boxProps }: GlowProps) => (
  <Box
    borderWidth="1px"
    borderColor={active ? 'osAccent' : 'osBorder'}
    boxShadow={
      active
        ? '0 0 0 1px rgba(0, 229, 255, 0.35), 0 0 22px rgba(0, 229, 255, 0.10)'
        : undefined
    }
    transition="border-color 160ms ease, box-shadow 160ms ease"
    {...boxProps}
  >
    {children}
  </Box>
);

/** Tiny status LED. Used for "ONLINE" indicators and connection nodes. */
export const Led = ({ active = true }: { active?: boolean }) => (
  <Box
    as="span"
    display="inline-block"
    boxSize="6px"
    borderRadius="full"
    bg={active ? 'osAccent' : 'osTextMuted'}
    className={active ? 'os-led' : undefined}
  />
);
