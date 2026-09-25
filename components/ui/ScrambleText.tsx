import { Box, VisuallyHidden } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>_%';

interface ScrambleTextProps {
  text: string;
  /** Total animation length in ms. Short on purpose. */
  durationMs?: number;
  className?: string;
}

/**
 * Decorative decode-in effect for system labels.
 *
 * Server-rendered output is already the final text, so there is no hydration
 * mismatch, no empty first paint and nothing to wait for. Screen readers get
 * the clean string through the visually hidden node, and reduced motion skips
 * the animation entirely.
 */
export const ScrambleText = ({
  text,
  durationMs = 520,
  className,
}: ScrambleTextProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    // Reduced motion is handled at render time instead of by writing state
    // synchronously here, which would cause a cascading render.
    if (shouldReduceMotion) return;

    const totalFrames = Math.max(1, Math.round(durationMs / 16));
    let frame = 0;
    let raf = 0;

    const tick = () => {
      frame += 1;
      const progress = frame / totalFrames;

      setDisplay(
        text
          .split('')
          .map((character, position) => {
            if (character === ' ') return ' ';
            const settledAt = position / Math.max(1, text.length) + 0.25;
            return progress >= settledAt
              ? character
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (frame < totalFrames) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, durationMs, shouldReduceMotion]);

  return (
    <Box as="span" className={className}>
      <Box as="span" aria-hidden="true">
        {shouldReduceMotion ? text : display}
      </Box>
      <VisuallyHidden>{text}</VisuallyHidden>
    </Box>
  );
};
