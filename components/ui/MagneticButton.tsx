import { Box, Button, type ButtonProps } from '@chakra-ui/react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import NextLink from 'next/link';
import { useRef, type PointerEvent, type ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  /** Internal route. Ignored when `external` is set. */
  href?: string;
  external?: boolean;
  onClick?: ButtonProps['onClick'];
  variant?: 'solid' | 'outline' | 'ghost';
  size?: ButtonProps['size'];
  'aria-label'?: string;
  /** Max cursor attraction in px. Kept at 4-8: it is a hint, not a toy. */
  strength?: number;
}

const spring = { stiffness: 260, damping: 20, mass: 0.4 };

/**
 * CTA with a subtle cursor attraction. Built on the framer-motion already in
 * the project — no extra dependency. Falls back to a plain button when the
 * visitor prefers reduced motion or uses a touch device (no pointermove).
 */
export const MagneticButton = ({
  children,
  href,
  external = false,
  onClick,
  variant = 'solid',
  size = 'md',
  strength = 6,
  ...ariaProps
}: MagneticButtonProps) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (shouldReduceMotion) return;
    const node = containerRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    rawX.set((offsetX / (rect.width / 2 || 1)) * strength);
    rawY.set((offsetY / (rect.height / 2 || 1)) * strength);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const isSolid = variant === 'solid';
  // `mailto:` and `tel:` should not open a new tab, only real URLs should.
  const opensNewTab = external && href?.startsWith('http') === true;

  return (
    <Box
      as="span"
      ref={containerRef}
      display="inline-block"
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <motion.div style={{ x, y, display: 'inline-block' }}>
        <Button
          as={href && !external ? NextLink : href ? 'a' : undefined}
          href={href}
          target={opensNewTab ? '_blank' : undefined}
          rel={opensNewTab ? 'noreferrer' : undefined}
          onClick={onClick}
          size={size}
          variant={isSolid ? 'solid' : variant}
          bg={isSolid ? 'osAccent' : undefined}
          color={isSolid ? 'osBg' : 'osText'}
          borderColor="osBorder"
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="0.16em"
          textTransform="uppercase"
          px={5}
          _hover={
            isSolid
              ? { bg: 'osAccentSoft' }
              : { borderColor: 'osAccent', color: 'osAccent' }
          }
          _focusVisible={{
            boxShadow: '0 0 0 3px rgba(0, 229, 255, 0.45)',
            outline: 'none',
          }}
          {...ariaProps}
        >
          {children}
        </Button>
      </motion.div>
    </Box>
  );
};
