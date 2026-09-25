import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { ExperienceSection, ReadoutRow } from './ExperienceSection';
import { Glow } from '../ui/Glow';
import {
  architectureLayers,
  sectionAnchor,
  sectionIndex,
  type ArchitectureLayerId,
} from '../../lib/experience/content';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';

/**
 * ARCHITECTURE LAB.
 *
 * A request path (client → API → auth → services → database) where each node
 * explains why it exists and what it costs. The tradeoff row is the point:
 * anyone can list layers, the senior signal is knowing what each one charges.
 *
 * Not a tutorial — the copy is short and every layer is a real stop in the
 * systems described by the case files.
 */
export const ArchitectureLab = () => {
  const t = useExperienceTranslation();
  const labels = t.sections.architecture.labels;
  const [activeLayerId, setActiveLayerId] =
    useState<ArchitectureLayerId>('api');

  const activeLayer =
    architectureLayers.find((layer) => layer.id === activeLayerId) ??
    architectureLayers[0];
  const copy = t.sections.architecture.layers[activeLayer.id];

  return (
    <ExperienceSection
      id={sectionAnchor('architecture')}
      index={sectionIndex('architecture')}
      title={t.nav.architecture}
      lead={t.sections.architecture.lead}
    >
      <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 14 }}>
        <Box w={{ lg: '340px' }} flexShrink={0}>
          <Box as="ol" listStyleType="none">
            {architectureLayers.map((layer, index) => {
              const isActive = layer.id === activeLayerId;
              const isLast = index === architectureLayers.length - 1;
              const layerCopy = t.sections.architecture.layers[layer.id];

              return (
                <Box as="li" key={layer.id} display="flex" gap={4}>
                  {/* Connector rail: node + the line running to the next layer. */}
                  <Flex direction="column" alignItems="center" width="8px" flexShrink={0}>
                    <Box
                      boxSize="7px"
                      borderRadius="full"
                      bg={isActive ? 'osAccent' : 'osBorder'}
                      boxShadow={
                        isActive ? '0 0 0 3px rgba(0, 229, 255, 0.12)' : undefined
                      }
                      mt="10px"
                    />
                    {!isLast && (
                      <Box width="1px" flexGrow={1} bg="osBorder" mt={1} />
                    )}
                  </Flex>

                  <Box flex="1 1 0" minW={0} pb={5}>
                    <Button
                      variant="ghost"
                      height="auto"
                      px={2}
                      py={1}
                      width="100%"
                      display="block"
                      textAlign="left"
                      whiteSpace="normal"
                      _hover={{ bg: 'osElevated' }}
                      _focusVisible={{
                        boxShadow: '0 0 0 3px rgba(0, 229, 255, 0.45)',
                        outline: 'none',
                      }}
                      onClick={() => setActiveLayerId(layer.id)}
                      aria-pressed={isActive}
                    >
                      <Text
                        fontFamily="mono"
                        fontSize="sm"
                        letterSpacing="0.18em"
                        textTransform="uppercase"
                        color={isActive ? 'osAccent' : 'osText'}
                      >
                        {layerCopy.label}
                      </Text>
                      <Text
                        mt={1}
                        fontFamily="mono"
                        fontSize="xs"
                        letterSpacing="0.1em"
                        color="osTextMuted"
                      >
                        {layer.channel}
                      </Text>
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box flex="1 1 0" minW={0}>
          <Glow active bg="osSurface" borderRadius="md" p={{ base: 5, md: 7 }}>
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="osTextMuted"
            >
              {t.sections.architecture.hint}
            </Text>

            <Text
              mt={4}
              fontFamily="mono"
              fontSize={{ base: 'xl', md: '2xl' }}
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="osText"
            >
              {copy.label}
            </Text>

            <Box mt={6}>
              <ReadoutRow label={labels.channel}>{activeLayer.channel}</ReadoutRow>
              <ReadoutRow label={labels.why}>{copy.why}</ReadoutRow>
              <ReadoutRow label={labels.tradeoff}>{copy.tradeoff}</ReadoutRow>
            </Box>
          </Glow>
        </Box>
      </Flex>
    </ExperienceSection>
  );
};
