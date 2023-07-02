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
} from '@chakra-ui/react';
import { Section } from '../../components/Section';

import { WorkGridItem } from '../../components/GridItem';
import { ArticleLayout } from '../../layouts/Article';

import thumbPichu2 from '../../public/images/works/pichu2_eyecatch.png';
import thumbFreeDBTagger from '../../public/images/works/freedbtagger_eyecatch.png';
import thumbAmembo from '../../public/images/works/amembo_eyecatch.png';
import thumbDevels from '../../public/images/works/devels.png';
import thumbZume from '../../public/images/works/zumed.png';
import thumbDcf from '../../public/images/works/decentralfi.png';
import thumbMarvel from '../../public/images/works/marvel.jpg';
import thumbSimonSays from '../../public/images/works/simon-says.png';

const myWorks = [
  {
    title: 'Ovmafot',
    subtitle: 'Frontend',
    description: ['Wix', 'Wordpress', 'Css'],
  },
  {
    title: 'Ponceleon club',
    subtitle: 'Frontend',
    description: ['Hmtl', 'Css', 'Js', 'React'],
  },
  {
    title: 'Wingoo',
    subtitle: 'Frontend',
    description: ['React (Next.js)', 'Tailwind', 'React Forms'],
  },
  {
    title: 'Devels',
    subtitle: 'Full-Stack',
    description: [
      'Co-creador de Venezuela Locations',
      'Python (FastApi)',
      'React (Next.js)',
    ],
  },
];

const outstandingWorks = [
  {
    title: 'Turpial Development',
    subtitle: 'Frontend',
    description: [
      'Aplicaciones descentralizadas con Angular y React (Next.js).',
      'Testing con Cypress y Jest.',
      'Uso de servicios y plataformas Blockchain como Thorchain y Terra.',
      'Integración con Billeteras como Metamask, Xdefi y Keystore.',
    ],
  },
  {
    title: 'Zumetrics',
    subtitle: 'Full-Stack',
    description: [
      'Creación de PWA con Next.js, Redux y TypeScript.',
      'Maquetación con Css-Grid, Bootstrap y Styled Components.',
      'Creación de Backend en Node con Express, GraphQL y MongoDB.',
      'Implementación de Servicios como Auth0, Vercel, AWS, Heroku, Digital Ocean, GitHub y GitLap.',
      'Implementación de Test con Mocha, Jest y StoryBook',
    ],
  },
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

                    <UnorderedList px="5">
                      {description.map((items) => {
                        return <ListItem key={items}>{items}</ListItem>;
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

                    <UnorderedList px="5">
                      {description.map((items) => {
                        return <ListItem key={items}>{items}</ListItem>;
                      })}
                    </UnorderedList>
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
