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

import thumbInkdrop from '../../public/images/works/inkdrop_eyecatch.png';
import thumbWalknote from '../../public/images/works/walknote_eyecatch.png';
import thumbFourPainters from '../../public/images/works/the-four-painters_eyecatch.jpg';
import thumbMenkiki from '../../public/images/works/menkiki_eyecatch.png';
import thumbModeTokyo from '../../public/images/works/modetokyo_eyecatch.png';
import thumbStyly from '../../public/images/works/styly_eyecatch.png';
import thumbPichu2 from '../../public/images/works/pichu2_eyecatch.png';
import thumbFreeDBTagger from '../../public/images/works/freedbtagger_eyecatch.png';
import thumbAmembo from '../../public/images/works/amembo_eyecatch.png';
import thumbDevels from '../../public/images/works/devels.png';
import thumbZume from '../../public/images/works/zumed.png';
import thumbDcf from '../../public/images/works/decentralfi.png';

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
      'Colaborador en la creación de Venezuela Locations',
      'Python (FastApi)',
      'React (Next.js)',
      'Express.js',
    ],
  },
];

const outstandingWorks = [
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
];

const Works = () => {
  return (
    <ArticleLayout title="Works">
      <Container>
        <Section delay={'0.1'}>
          <Heading as="h2" variant="section-title">
            Works:
          </Heading>

          <SimpleGrid columns={[1, 1, 2]} gap={3}>
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

          <SimpleGrid columns={1} gap={3} mt={3}>
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
        </Section>

        <Heading as="h3" fontSize={20} mb={4}>
          Works
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section>
            <WorkGridItem id="decentralfi" title="Inkdrop" thumbnail={thumbDcf}>
              A markdow note-taking app
            </WorkGridItem>
          </Section>

          <Section>
            <WorkGridItem id="walknote" title="Walknote" thumbnail={thumbZume}>
              Music recommendation app for iOS
            </WorkGridItem>
          </Section>

          <Section delay={'0.2'}>
            <WorkGridItem
              id="fourpainters"
              title="The four painters"
              thumbnail={thumbFourPainters}
            >
              A video work generated with deep learning, imitating famous four
              painters like Van Gogh
            </WorkGridItem>
          </Section>

          <Section delay={'0.3'}>
            <WorkGridItem id="menkiki" thumbnail={thumbMenkiki} title="Menkiki">
              An app that suggests ramen(noodle) shops based on a given photo of
              the ramen you want to eat
            </WorkGridItem>
          </Section>
        </SimpleGrid>

        <Section delay={'0.3'}>
          <Divider my={6} />

          <Heading as="h3" fontSize={20} mb={4}>
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
              The mode magazine for understanding to personally enjoy Japan
            </WorkGridItem>
          </Section>

          <Section delay={'0.3'}>
            <WorkGridItem id="styly" thumbnail={thumbStyly} title="Styly">
              A VR Creative tools for fashion brands
            </WorkGridItem>
          </Section>
        </SimpleGrid>

        <Section delay={'0.4'}>
          <Divider my={6} />

          <Heading as="h3" fontSize={20} mb={4}>
            Old works
          </Heading>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={'0.5'}>
            <WorkGridItem
              id="pichu2"
              thumbnail={thumbPichu2}
              title="Pichu*Pichu"
            >
              Twitter client app for iPhone Safari
            </WorkGridItem>
          </Section>
          <Section delay={'0.5'}>
            <WorkGridItem
              id="freedbtagger"
              thumbnail={thumbFreeDBTagger}
              title="freeDBTagger"
            >
              Automatic audio file tagging tool using FreeDB for Windows
            </WorkGridItem>
          </Section>
          <Section delay={'0.6'}>
            <WorkGridItem id="amembo" thumbnail={thumbAmembo} title="Amembo">
              P2P private file sharing tool with MSN Messenger integration for
              Windows
            </WorkGridItem>
          </Section>
        </SimpleGrid>
      </Container>
    </ArticleLayout>
  );
};

export default Works;
