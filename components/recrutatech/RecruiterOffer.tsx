import { Box, Container, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { Reveal } from '../ui/Reveal';
import { useExperienceTranslation } from '../../lib/experience/dictionaries';
import { recruiter } from '../../lib/experience/content';
import type { ExperienceDictionary } from '../../lib/experience/dictionaries';

interface OfferListProps {
  title: string;
  items: string[];
}

const OfferList = ({ title, items }: OfferListProps) => (
  <Box>
    <Heading as="h2" variant="os-eyebrow">
      {title}
    </Heading>

    <Box as="ul" mt={6} m={0} p={0} listStyleType="none">
      {items.map((item) => (
        <Flex as="li" key={item} alignItems="flex-start" gap={3} mb={3}>
          <Box
            aria-hidden="true"
            mt="7px"
            boxSize="6px"
            flexShrink={0}
            borderWidth="1px"
            borderColor="osAccent"
          />
          <Text fontSize="md" color="osTextSecondary">
            {item}
          </Text>
        </Flex>
      ))}
    </Box>
  </Box>
);

/** "What I build" + "What I'm looking for": the two questions recruiters ask. */
export const RecruiterOffer = () => {
  const t: ExperienceDictionary = useExperienceTranslation();

  const buildItems = recruiter.whatIBuildIds.map((id) => t.recruiter.whatIBuild[id]);
  const lookingForItems = recruiter.lookingForIds.map(
    (id) => t.recruiter.lookingFor[id]
  );

  return (
    <Box as="section" borderBottomWidth="1px" borderColor="osBorder">
      <Container maxW="1080px" py={{ base: 10, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 10, md: 12 }}>
          <Reveal>
            <OfferList title={t.recruiter.whatIBuildTitle} items={buildItems} />
          </Reveal>

          <Reveal delay={0.05}>
            <OfferList title={t.recruiter.lookingForTitle} items={lookingForItems} />
          </Reveal>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
