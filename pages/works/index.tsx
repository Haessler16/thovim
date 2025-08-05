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

import thumbDevels from '../../public/images/works/devels.png';
import thumbZume from '../../public/images/works/zumed.png';
import thumbDcf from '../../public/images/works/decentralfi.png';
import thumbMarvel from '../../public/images/works/marvel.jpg';
import thumbSimonSays from '../../public/images/works/simon-says.png';
import thumbBusi from '../../public/images/works/busi.png';
import thumbArMortgage from '../../public/images/works/ao.png';
import thumbAluxionHla from '../../public/images/works/grupo-hla.jpg';
import thumbNexxo from '../../public/images/works/busi_home.jpeg';
import thumbPolyresin from '../../public/images/works/hla_home.png';

const myWorks = [
  // {
  //   title: 'Nexxo',
  //   subtitle: 'Mobile Full-Stack',
  //   description: ['React Native', 'Expo', 'NestJS', 'PostgreSQL'],
  // },
  // {
  //   title: 'Quimicas Polyresin',
  //   subtitle: 'Frontend',
  //   description: ['Next.js', 'TypeScript', 'TailwindCSS', 'Dynamic Search'],
  // },
  {
    title: 'AR Mortgage',
    subtitle: 'Frontend',
    description: ['Wix', 'Zoho', 'CSS'],
  },
  {
    title: 'Aluxion with HLA',
    subtitle: 'Full-Stack',
    description: ['React', 'Next.js', 'PostgreSQL', 'NestJS'],
  },
  {
    title: 'Devels',
    subtitle: 'Full-Stack',
    description: ['Venezuela Locations', 'React (Next.js)', 'Python (FastApi)'],
  },
  {
    title: 'Wingoo',
    subtitle: 'Frontend',
    description: ['React (Next.js)', 'Tailwind', 'React Forms'],
  },
  {
    title: 'Ponceleon',
    subtitle: 'Frontend',
    description: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    title: 'Ovmafot',
    subtitle: 'Frontend',
    description: ['Wix', 'Wordpress', 'Css'],
  },
];

const outstandingWorks = [
  {
    title: 'Busi',
    subtitle: 'Mobile / Frontend',
    description: [
      'Creation of decentralized applications with Angular, React (Next.js) and Tailwind.',
      'Testing with Cypress, Jest and Docker implementation.',
      'Use of Blockchain services and platforms such as Thorchain, Terra and Telegram bots´ creation.',
      'Integration with Wallets such as Metamask, Xdefi and Keystore.',
    ],
  },
  {
    title: 'Turpial Development',
    subtitle: 'Web 3 Developer / Frontend',
    description: [
      'Creation of decentralized applications with Angular, React (Next.js) and Tailwind.',
      'Testing with Cypress, Jest and Docker implementation.',
      'Use of Blockchain services and platforms such as Thorchain, Terra and Telegram bots´ creation.',
      'Integration with Wallets such as Metamask, Xdefi and Keystore.',
    ],
  },
  {
    title: 'Zumetrics',
    subtitle: 'Tech Lead / Full-Stack',
    description: [
      'PWA creation with Next.js, Redux and TypeScript.',
      'Layouts with Css-Grid, Bootstrap, Styled Components and Graphs with Chart.js, D3 and Amcharts.',
      'Backend creation in Node.js with Express, GraphQL and MongoDB.',
      'Implementation of Services such as Auth0, Vercel, AWS, Heroku, Digital Ocean, GitHub and GitLap.',
      'Test implementation with Mocha, Jest and StoryBook',
    ],
  },
];

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
  // {
  //   id: 'nexxo',
  //   title: 'Nexxo',
  //   thumbnail: thumbNexxo,
  //   description:
  //     'Mobile app for managing shared expenses with friends and groups.',
  //   delay: '0.1',
  // },
  // {
  //   id: 'quimicas-polyresin',
  //   title: 'Quimicas Polyresin',
  //   thumbnail: thumbPolyresin,
  //   description: 'Chemical plant services portal with dynamic product search.',
  //   delay: '0.2',
  // },
  {
    id: 'busi',
    title: 'Busi',
    thumbnail: thumbBusi,
    description:
      'Digital platform transforming public transportation in Latin America.',
    delay: '0.3',
  },
  {
    id: 'ar-mortgage',
    title: 'AR Mortgage',
    thumbnail: thumbArMortgage,
    description: 'Strategic mortgage solutions platform.',
    delay: '0.4',
  },
  {
    id: 'aluxion-hla',
    title: 'Aluxion with HLA',
    thumbnail: thumbAluxionHla,
    description:
      'Healthcare management system in collaboration with Grupo HLA.',
    delay: '0.5',
  },
  {
    id: 'decentralfi',
    title: 'DecentralFi',
    thumbnail: thumbDcf,
    description: 'A decentralized web application for cryptocurrencies.',
    delay: '0.6',
  },
  {
    id: 'zumetrics',
    title: 'Zumetrics',
    thumbnail: thumbZume,
    description: 'A web app to display social media metrics.',
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
  const memoizedFeaturedWorks = useMemo(
    () =>
      featuredWorks.map((work) => (
        <Section key={work.id} delay={work.delay}>
          <WorkGridItem
            id={work.id}
            title={work.title}
            thumbnail={work.thumbnail}
          >
            {work.description}
          </WorkGridItem>
        </Section>
      )),
    []
  );

  const memoizedExperienceCards = useMemo(
    () =>
      outstandingWorks.map((work) => (
        <ExperienceCard key={work.title} {...work} />
      )),
    []
  );

  const memoizedProjectCards = useMemo(
    () => myWorks.map((work) => <ProjectCard key={work.title} {...work} />),
    []
  );

  return (
    <ArticleLayout title="Works">
      <Container>
        <Heading as="h3" fontSize={20} mb={4} variant="section-title">
          Featured Works
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {memoizedFeaturedWorks}
        </SimpleGrid>

        <Section delay={'0.8'}>
          <Divider my={6} />
          <Heading as="h3" fontSize={20} mb={4} variant="section-title">
            Collaborations
          </Heading>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={'0.9'}>
            <WorkGridItem
              id="venezuela_locations"
              thumbnail={thumbDevels}
              title="Devels - Venezuela locations"
            >
              An API to get the different locations in Venezuela.
            </WorkGridItem>
          </Section>
        </SimpleGrid>

        <Section delay={'1.0'}>
          <Divider my={6} />
          <Heading as="h3" fontSize={20} mb={4} variant="section-title">
            Previous Works
          </Heading>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={'1.1'}>
            <WorkGridItem
              id="marvel-angular"
              thumbnail={thumbMarvel}
              title="Marvel-Angular"
            >
              An app to see characters, comics, series from Marvel.
            </WorkGridItem>
          </Section>

          <Section delay={'1.2'}>
            <WorkGridItem
              id="simon-dice"
              thumbnail={thumbSimonSays}
              title="Simon dice"
            >
              Web page to play simon says 😄.
            </WorkGridItem>
          </Section>
        </SimpleGrid>

        <Section delay={'0.1'}>
          <Divider my={6} />
          <Heading as="h2" variant="section-title">
            Professional Experience
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
