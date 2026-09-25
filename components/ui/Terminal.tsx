import { Box, Flex, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface TerminalProps {
  /** Monospace header label, e.g. "NOW.CONFIG". */
  title?: string;
  /** Right-aligned header metadata, usually a status readout. */
  meta?: string;
  /** Plain monospace lines. Use `children` for anything richer. */
  lines?: string[];
  children?: ReactNode;
  className?: string;
}

/**
 * Terminal panel used for system state readouts (NOW, AI LAB, boot sequence).
 * Deliberately dumb: it renders whatever it is given in monospace.
 */
export const Terminal = ({
  title,
  meta,
  lines,
  children,
  className,
}: TerminalProps) => (
  <Box
    className={`os-panel ${className ?? ''}`}
    borderRadius="md"
    overflow="hidden"
    fontFamily="mono"
  >
    {(title || meta) && (
      <Flex
        px={4}
        py={2}
        alignItems="center"
        justifyContent="space-between"
        gap={3}
        borderBottomWidth="1px"
        borderColor="osBorder"
        bg="osElevated"
      >
        <Flex alignItems="center" gap={2} minW={0}>
          <Box boxSize="8px" borderRadius="full" bg="osAccent" opacity={0.9} />
          <Box boxSize="8px" borderRadius="full" bg="osBorder" />
          <Box boxSize="8px" borderRadius="full" bg="osBorder" />
          {title && (
            <Text
              ml={2}
              fontSize="xs"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="osTextSecondary"
              isTruncated
            >
              {title}
            </Text>
          )}
        </Flex>

        {meta && (
          <Text
            fontSize="xs"
            letterSpacing="0.12em"
            textTransform="uppercase"
            color="osTextMuted"
            flexShrink={0}
          >
            {meta}
          </Text>
        )}
      </Flex>
    )}

    <Box px={4} py={4} fontSize="sm" color="osText">
      {lines?.map((line) => (
        <Text key={line} lineHeight="1.7" color="osTextSecondary">
          {line}
        </Text>
      ))}
      {children}
    </Box>
  </Box>
);
