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
import { Section } from '../../components/Section';

import { WorkGridItem } from '../../components/GridItem';
import { ArticleLayout } from '../../layouts/Article';

import thumbDevels from '../../public/images/works/devels.png';
import thumbZume from '../../public/images/works/zumed.png';
import thumbDcf from '../../public/images/works/decentralfi.png';
import thumbMarvel from '../../public/images/works/marvel.jpg';
import thumbSimonSays from '../../public/images/works/simon-says.png';

const myWorks = [
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
    description: ['Hmtl', 'Css', 'Js', 'React'],
  },
  {
    title: 'Ovmafot',
    subtitle: 'Frontend',
    description: ['Wix', 'Wordpress', 'Css'],
  },
];

const outstandingWorks = [
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
];

const Works = () => {
  return (
    <ArticleLayout title="Works">
      <Container>
        <Heading as="h3" fontSize={20} mb={4} variant="section-title">
          Works
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={'0.2'}>
            <WorkGridItem
              id="decentralfi"
              title="DecentralFi"
              thumbnail={thumbDcf}
            >
              A decentralized web application for cryptocurrencies.
            </WorkGridItem>
          </Section>

          <Section delay={'0.3'}>
            <WorkGridItem
              id="zumetrics"
              title="Zumetrics"
              thumbnail={thumbZume}
            >
              A web app to display social media metrics.
            </WorkGridItem>
          </Section>

          {/* <Section >
            <WorkGridItem
              id="fourpainters"
              title="The four painters"
              thumbnail={thumbFourPainters}
            >
              A video work generated with deep learning, imitating famous four
              painters like Van Gogh
            </WorkGridItem>
          </Section>

          <Section >
            <WorkGridItem id="menkiki" thumbnail={thumbMenkiki} title="Menkiki">
              An app that suggests ramen(noodle) shops based on a given photo of
              the ramen you want to eat
            </WorkGridItem>
          </Section> */}
        </SimpleGrid>

        <Section delay={'0.3'}>
          <Divider my={6} />

          <Heading as="h3" fontSize={20} mb={4} variant="section-title">
            Collaborations
          </Heading>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={'0.3'}>
            <WorkGridItem
              id="venezuela_locations"
              thumbnail={thumbDevels}
              title="Devels - Venezuela locations"
            >
              An api to get the different locations in Venezuela.
            </WorkGridItem>
          </Section>

          {/* <Section delay={'0.3'}>
            <WorkGridItem id="styly" thumbnail={thumbStyly} title="Styly">
              A VR Creative tools for fashion brands
            </WorkGridItem>
          </Section> */}
        </SimpleGrid>

        <Section delay={'0.4'}>
          <Divider my={6} />

          <Heading as="h3" fontSize={20} mb={4} variant="section-title">
            Old works
          </Heading>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={'0.5'}>
            <WorkGridItem
              id="marvel-angular"
              thumbnail={thumbMarvel}
              title="Marvel-Angular"
            >
              An app to see characters, comics, series from Marvel.
            </WorkGridItem>
          </Section>

          <Section delay={'0.5'}>
            <WorkGridItem
              id="simon-dice"
              thumbnail={thumbSimonSays}
              title="Simon dice"
            >
              Web page to play simon says 😄.
            </WorkGridItem>
          </Section>

          {/* <Section delay={'0.6'}>
            <WorkGridItem id="amembo" thumbnail={thumbAmembo} title="Amembo">
              P2P private file sharing tool with MSN Messenger integration for
              Windows
            </WorkGridItem>
          </Section> */}
        </SimpleGrid>

        <Section delay={'0.1'}>
          <Heading as="h2" variant="section-title">
            Experience:
          </Heading>

          <SimpleGrid columns={1} gap={3}>
            {outstandingWorks.map(({ title, subtitle, description }) => {
              return (
                <Card
                  key={title}
                  bg="transparent"
                  borderRadius="lg"
                  border="1px"
                  shadow="lg"
                >
                  <CardHeader>
                    <Heading size="lg" textAlign="center">
                      {title}
                    </Heading>

                    <Heading
                      size="sm"
                      textAlign="center"
                      textDecoration="underline"
                    >
                      {subtitle}
                    </Heading>
                  </CardHeader>

                  <CardBody py="1.5" pb="1.5rem">
                    {/* <Text>{description}</Text> */}

                    <UnorderedList
                      px="5"
                      display="flex"
                      flexDir="column"
                      gap={2}
                    >
                      {description.map((items) => {
                        return (
                          <ListItem key={items}>
                            <Highlight
                              query={QUERY_HIGHLIGHT}
                              styles={{
                                color: 'teal.100',
                              }}
                            >
                              {items}
                            </Highlight>
                          </ListItem>
                        );
                      })}
                    </UnorderedList>
                  </CardBody>
                </Card>
              );
            })}
          </SimpleGrid>

          <SimpleGrid columns={[1, 1, 2]} gap={3} mt={3}>
            {myWorks.map(({ title, subtitle, description }) => {
              return (
                <Card
                  key={title}
                  bg="transparent"
                  borderRadius="lg"
                  border="1px"
                  shadow="lg"
                >
                  <CardHeader py="1.5" pt="1.5rem">
                    <Heading size="lg" textAlign="center">
                      {title}
                    </Heading>

                    <Heading
                      size="sm"
                      textAlign="center"
                      textDecoration="underline"
                    >
                      {subtitle}
                    </Heading>
                  </CardHeader>

                  <CardBody py="1.5" pb="1.5rem">
                    {/* <Text>{description}</Text> */}

                    {/* <UnorderedList px="5"> */}
                    <Flex justifyContent="center" flexWrap="wrap" gap={1}>
                      {description.map((items) => {
                        return (
                          <Tag
                            key={items}
                            variant="solid"
                            colorScheme="blue"
                            textAlign="center"
                          >
                            {items}
                          </Tag>
                        );
                      })}
                    </Flex>
                    {/* </UnorderedList> */}
                  </CardBody>
                </Card>
              );
            })}
          </SimpleGrid>
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default Works;
