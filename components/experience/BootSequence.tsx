import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useExperienceTranslation } from '../../lib/experience/dictionaries';

interface BootSequenceProps {
  /**
   * Called when the log finishes, the visitor skips it, or reduced motion is
   * requested. Must be referentially stable (the shell passes a `useCallback`)
   * or the timers restart on every render.
   */
  onComplete: () => void;
}

/** Per-line delay. Four lines land in ~800ms: a boot, not a loading screen. */
const LINE_MS = 200;
/** Pause on the final "SYSTEM ONLINE" line before handing over. */
const HOLD_MS = 520;

/**
 * Short boot overlay.
 *
 * Rules it follows on purpose:
 *  - never blocks content for long: ~1.3s total and skippable from the first
 *    frame (click, Escape or Enter-equivalent button)
 *  - rendered client-side only, so the prerendered HTML anyone receives
 *    already contains the real page underneath
 *  - skipped entirely with `prefers-reduced-motion`
 *  - lives in sessionStorage, so a refresh does not re-run it
 */
export const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const t = useExperienceTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(0);

  const lineCount = t.boot.lines.length;

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    const lineTimers = Array.from({ length: lineCount }, (_, index) =>
      window.setTimeout(() => setVisibleLines(index + 1), index * LINE_MS)
    );

    const finishTimer = window.setTimeout(
      onComplete,
      lineCount * LINE_MS + HOLD_MS
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onComplete();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      lineTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lineCount, onComplete, shouldReduceMotion]);

  const progress = lineCount === 0 ? 0 : visibleLines / lineCount;

  return (
    <Box
      position="fixed"
      inset={0}
      bg="osBg"
      className="os-grid-bg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
      py={10}
      role="status"
      aria-live="polite"
    >
      <Box className="os-scanlines" position="relative" w="100%" maxW="520px">
        <Flex alignItems="center" gap={3} mb={6}>
          <Box boxSize="8px" borderRadius="full" bg="osAccent" />
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.24em"
            textTransform="uppercase"
            color="osTextSecondary"
          >
            {t.system.name}
          </Text>
        </Flex>

        {t.boot.lines.map((line, index) => (
          <Text
            key={line}
            fontFamily="mono"
            fontSize={{ base: 'sm', md: 'md' }}
            lineHeight="1.9"
            color={index === lineCount - 1 ? 'osAccent' : 'osTextSecondary'}
            opacity={index < visibleLines ? 1 : 0}
            transition="opacity 180ms ease"
          >
            {line}
          </Text>
        ))}

        <Box mt={6} height="2px" bg="osBorder" overflow="hidden">
          <Box
            height="100%"
            bg="osAccent"
            width={`${Math.round(progress * 100)}%`}
            transition="width 180ms linear"
          />
        </Box>

        <Button
          mt={8}
          size="xs"
          variant="ghost"
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="0.18em"
          color="osTextMuted"
          _hover={{ color: 'osAccent' }}
          _focusVisible={{ boxShadow: '0 0 0 3px rgba(0, 229, 255, 0.45)' }}
          onClick={onComplete}
        >
          {t.boot.skip} [ESC]
        </Button>
      </Box>
    </Box>
  );
};
