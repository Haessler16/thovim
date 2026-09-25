import { chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'transition',
});

interface RevealProps {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  /** Vertical travel in px. Keep it small: this is a lab, not a slideshow. */
  distance?: number;
  className?: string;
  id?: string;
}

/**
 * Single reveal primitive for the experience layer.
 *
 * Timing lives inside `variants` rather than the `transition` prop, because on
 * a `chakra(motion.*)` component that prop is typed as the CSS transition and
 * rejects framer-motion's number-based config.
 *
 * Motion is decorative only: with `prefers-reduced-motion` the content renders
 * immediately and unshifted, so nothing is ever hidden behind an animation.
 */
export const Reveal = ({
  children,
  delay = 0,
  distance = 14,
  className,
  id,
}: RevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <StyledDiv className={className} id={id}>
        {children}
      </StyledDiv>
    );
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay, ease: 'easeOut' },
    },
  };

  return (
    <StyledDiv
      className={className}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </StyledDiv>
  );
};
