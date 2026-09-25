import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { Glow } from '../ui/Glow';
import { Metric } from '../ui/Metric';
import { Reveal } from '../ui/Reveal';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';
import { experienceCases } from '../../lib/experience/cases';
import { metrics } from '../../lib/experience/metrics';
import { recruiter } from '../../lib/experience/content';

/**
 * Three flagship case files.
 *
 * Each card links into the existing legacy project page for the full write-up
 * instead of duplicating it, so there is exactly one place where each project
 * story lives.
 */
export const RecruiterProjects = () => {
  const t = useExperienceTranslation();

  return (
    <Box
      as="section"
      aria-labelledby="recruiter-work"
      borderBottomWidth="1px"
      borderColor="osBorder"
    >
      <Container maxW="1080px" py={{ base: 10, md: 16 }}>
        <Heading as="h2" id="recruiter-work" variant="os-eyebrow">
          {t.recruiter.casesTitle}
        </Heading>

        <SimpleGrid mt={9} columns={{ base: 1, lg: 3 }} gap={4} alignItems="stretch">
          {recruiter.caseIds.map((caseId, position) => {
            const item = experienceCases[caseId];
            const copy = t.cases[caseId];
            const headline = metrics[item.headlineMetricId];

            return (
              <Reveal key={caseId} delay={position * 0.05}>
                <Glow
                  h="full"
                  borderRadius="md"
                  bg="osSurface"
                  p={{ base: 5, md: 6 }}
                  display="flex"
                  flexDirection="column"
                >
                  <Flex alignItems="center" justifyContent="space-between" gap={3}>
                    <Text fontFamily="mono" fontSize="xs" color="osTextMuted">
                      {item.code}
                    </Text>
                    <Text
                      fontFamily="mono"
                      fontSize="xs"
                      letterSpacing="0.14em"
                      color="osAccent"
                      textAlign="right"
                    >
                      {copy.category}
                    </Text>
                  </Flex>

                  <Heading
                    as="h3"
                    mt={4}
                    fontFamily="heading"
                    fontSize="xl"
                    color="osText"
                  >
                    {copy.title}
                  </Heading>

                  <Text mt={1} fontFamily="mono" fontSize="xs" color="osTextMuted">
                    {copy.role}
                  </Text>

                  <Text mt={4} fontSize="sm" color="osTextSecondary">
                    {copy.summary}
                  </Text>

                  <Flex mt={5} gap={2} flexWrap="wrap">
                    {item.stack.map((technology) => (
                      <Text
                        key={technology}
                        fontFamily="mono"
                        fontSize="xs"
                        px={2}
                        py={1}
                        borderWidth="1px"
                        borderColor="osBorder"
                        borderRadius="sm"
                        color="osTextMuted"
                      >
                        {technology}
                      </Text>
                    ))}
                  </Flex>

                  <Flex
                    mt="auto"
                    pt={6}
                    alignItems="flex-end"
                    justifyContent="space-between"
                    gap={4}
                    flexWrap="wrap"
                  >
                    <Metric
                      size="sm"
                      value={headline.value}
                      label={t.metrics[item.headlineMetricId].label}
                    />

                    <Stack spacing={2} alignItems="flex-start">
                      <Link
                        as={NextLink}
                        href={item.legacyHref}
                        fontFamily="mono"
                        fontSize="xs"
                        letterSpacing="0.1em"
                        textTransform="uppercase"
                        color="osAccentSoft"
                        _hover={{ color: 'osAccent' }}
                      >
                        {t.recruiter.viewCase}
                      </Link>

                      {item.externalHref && (
                        <Link
                          href={item.externalHref}
                          target="_blank"
                          rel="noreferrer"
                          fontFamily="mono"
                          fontSize="xs"
                          letterSpacing="0.1em"
                          textTransform="uppercase"
                          color="osTextMuted"
                          _hover={{ color: 'osTextSecondary' }}
                        >
                          {t.recruiter.viewLive}
                        </Link>
                      )}
                    </Stack>
                  </Flex>
                </Glow>
              </Reveal>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
