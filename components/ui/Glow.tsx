import { Box, type BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface GlowProps extends Omit<BoxProps, 'children'> {
  children?: ReactNode;
  /** Selected/active state. Reserved for a handful of moments, not every card. */
  active?: boolean;
  /**
   * Chakra color token for the ring (e.g. `osViolet`). Defaults to the cyan
   * primary; semantic accents are passed by the few callers that earn them.
   */
  accentColor?: string;
}

const haloByAccent: Record<string, string> = {
  osAccent: '0 0 0 1px rgba(0, 229, 255, 0.35), 0 0 22px rgba(0, 229, 255, 0.10)',
  osElectricBlue: '0 0 0 1px rgba(61, 139, 255, 0.35), 0 0 22px rgba(61, 139, 255, 0.10)',
  osViolet: '0 0 0 1px rgba(139, 92, 246, 0.35), 0 0 22px rgba(139, 92, 246, 0.10)',
  osMagenta: '0 0 0 1px rgba(225, 79, 209, 0.35), 0 0 22px rgba(225, 79, 209, 0.10)',
  osAmber: '0 0 0 1px rgba(245, 169, 127, 0.35), 0 0 22px rgba(245, 169, 127, 0.10)',
};

/**
 * Restrained accent ring.
 *
 * The accent budget for the whole experience is roughly 3%, so this is a thin
 * ring plus a very soft halo instead of the usual neon drop shadow.
 */
export const Glow = ({
  children,
  active = false,
  accentColor = 'osAccent',
  ...boxProps
}: GlowProps) => (
  <Box
    borderWidth="1px"
    borderColor={active ? accentColor : 'osBorder'}
    boxShadow={active ? haloByAccent[accentColor] ?? haloByAccent.osAccent : undefined}
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
