import {
  Container,
  Heading,
  SimpleGrid,
  Divider,
  Card,
  CardBody,
  CardHeader,
  UnorderedList,
  ListItem,
  Tag,
  Flex,
  Highlight,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { Section } from '../../components/Section';

import { WorkGridItem } from '../../components/GridItem';
import { ArticleLayout } from '../../layouts/Article';
import { useTranslation } from '../../lib/dictionaries';

import thumbDevels from '../../public/images/works/devels.png';
import thumbZume from '../../public/images/works/zumed.png';
import thumbDcf from '../../public/images/works/decentralfi.png';
import thumbMarvel from '../../public/images/works/marvel.jpg';
import thumbSimonSays from '../../public/images/works/simon-says.png';
import thumbBusi from '../../public/images/works/busi.png';
import thumbArMortgage from '../../public/images/works/ao.png';
import thumbAluxionHla from '../../public/images/works/grupo-hla.jpg';

const QUERY_HIGHLIGHT = [
  'React',
  'Testing',
  'Angular',
  'Docker',
  'Redux',
  'GraphQL',
  'AWS',
  'TypeScript',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
  'ARKit',
  'ARCore',
  'Swift',
  'Shopify',
  'HIPAA',
  'Healthcare',
  'React Native',
  'Expo',
  'NestJS',
  'TailwindCSS',
  'Next.js',
];

// Featured works data
const featuredWorks = [
  {
    id: 'busi',
    title: 'Busi',
    thumbnail: thumbBusi,
    descKey: 'busiDesc' as const,
    delay: '0.3',
  },
  {
    id: 'ar-mortgage',
    title: 'AR Mortgage',
    thumbnail: thumbArMortgage,
    descKey: 'arMortgageDesc' as const,
    delay: '0.4',
  },
  {
    id: 'aluxion-hla',
    title: 'Aluxion with HLA',
    thumbnail: thumbAluxionHla,
    descKey: 'aluxionDesc' as const,
    delay: '0.5',
  },
  {
    id: 'decentralfi',
    title: 'DecentralFi',
    thumbnail: thumbDcf,
    descKey: 'decentralFiDesc' as const,
    delay: '0.6',
  },
  {
    id: 'zumetrics',
    title: 'Zumetrics',
    thumbnail: thumbZume,
    descKey: 'zumetricsDesc' as const,
    delay: '0.7',
  },
];

// Experience Card Component
const ExperienceCard = ({ title, subtitle, description }) => (
  <Card bg="transparent" borderRadius="lg" border="1px" shadow="lg">
    <CardHeader>
      <Heading size="lg" textAlign="center">
        {title}
      </Heading>
      <Heading size="sm" textAlign="center" textDecoration="underline">
        {subtitle}
      </Heading>
    </CardHeader>
    <CardBody py="1.5" pb="1.5rem">
      <UnorderedList px="5" display="flex" flexDir="column" gap={2}>
        {description.map((item) => (
          <ListItem key={item}>
            <Highlight
              query={QUERY_HIGHLIGHT}
              styles={{
                color: 'teal.100',
              }}
            >
              {item}
            </Highlight>
          </ListItem>
        ))}
      </UnorderedList>
    </CardBody>
  </Card>
);

// Project Card Component
const ProjectCard = ({ title, subtitle, description }) => (
  <Card bg="transparent" borderRadius="lg" border="1px" shadow="lg">
    <CardHeader py="1.5" pt="1.5rem">
      <Heading size="lg" textAlign="center">
        {title}
      </Heading>
      <Heading size="sm" textAlign="center" textDecoration="underline">
        {subtitle}
      </Heading>
    </CardHeader>
    <CardBody py="1.5" pb="1.5rem">
      <Flex justifyContent="center" flexWrap="wrap" gap={1}>
        {description.map((item) => (
          <Tag key={item} variant="solid" colorScheme="blue" textAlign="center">
            {item}
          </Tag>
        ))}
      </Flex>
    </CardBody>
  </Card>
);

const Works = () => {
  const t = useTranslation();

  const outstandingWorks = [
    {
      title: 'Busi',
      subtitle: t.experience.busi.subtitle,
      description: t.experience.busi.items,
    },
    {
      title: 'Turpial Development',
      subtitle: t.experience.turpial.subtitle,
      description: t.experience.turpial.items,
    },
    {
      title: 'Zumetrics',
      subtitle: t.experience.zumetrics.subtitle,
      description: t.experience.zumetrics.items,
    },
  ];

  const myWorks = [
    {
      title: 'Nexxo',
      subtitle: t.myWorks.nexxo.subtitle,
      description: ['React Native', 'Expo', 'NestJS', 'PostgreSQL'],
    },
    {
      title: 'Quimicas Polyresin',
      subtitle: t.myWorks.quimicas.subtitle,
      description: ['Next.js', 'TypeScript', 'TailwindCSS', 'Dynamic Search'],
    },
    {
      title: 'Ponceleon',
      subtitle: t.myWorks.ponceleon.subtitle,
      description: ['HTML', 'CSS', 'JavaScript', 'React'],
    },
    {
      title: 'Ovmafot',
      subtitle: t.myWorks.ovmafot.subtitle,
      description: ['Wix', 'Wordpress', 'Css'],
    },
  ];

  const memoizedFeaturedWorks = useMemo(
    () =>
      featuredWorks.map((work) => (
        <Section key={work.id} delay={work.delay}>
          <WorkGridItem
            id={work.id}
            title={work.title}
            thumbnail={work.thumbnail}
          >
            {t.works[work.descKey]}
          </WorkGridItem>
        </Section>
      )),
    [t]
  );

  const memoizedExperienceCards = outstandingWorks.map((work) => (
    <ExperienceCard key={work.title} {...work} />
  ));

  const memoizedProjectCards = myWorks.map((work) => (
    <ProjectCard key={work.title} {...work} />
  ));

  return (
    <ArticleLayout title={t.meta.worksTitle}>
      <Container>
        <Heading as="h3" fontSize={20} mb={4} variant="section-title">
          {t.works.featuredTitle}
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {memoizedFeaturedWorks}
        </SimpleGrid>

        <Section delay={'0.8'}>
          <Divider my={6} />
          <Heading as="h3" fontSize={20} mb={4} variant="section-title">
            {t.works.collaborationsTitle}
          </Heading>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={'0.9'}>
            <WorkGridItem
              id="venezuela_locations"
              thumbnail={thumbDevels}
              title={t.works.devels}
            >
              {t.works.develsDesc}
            </WorkGridItem>
          </Section>
        </SimpleGrid>

        <Section delay={'1.0'}>
          <Divider my={6} />
          <Heading as="h3" fontSize={20} mb={4} variant="section-title">
            {t.works.previousTitle}
          </Heading>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={'1.1'}>
            <WorkGridItem
              id="marvel-angular"
              thumbnail={thumbMarvel}
              title={t.works.marvel}
            >
              {t.works.marvelDesc}
            </WorkGridItem>
          </Section>

          <Section delay={'1.2'}>
            <WorkGridItem
              id="simon-dice"
              thumbnail={thumbSimonSays}
              title={t.works.simon}
            >
              {t.works.simonDesc}
            </WorkGridItem>
          </Section>
        </SimpleGrid>

        <Section delay={'0.1'}>
          <Divider my={6} />
          <Heading as="h2" variant="section-title">
            {t.works.experienceTitle}
          </Heading>

          <SimpleGrid columns={1} gap={3}>
            {memoizedExperienceCards}
          </SimpleGrid>

          <SimpleGrid columns={[1, 1, 2]} gap={3} mt={3}>
            {memoizedProjectCards}
          </SimpleGrid>
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default Works;
