import { NextPage } from 'next';
import { ArticleLayout } from '../layouts/Article';
import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Stack,
  useColorModeValue,
  Grid,
  Icon,
  Center,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { Section } from '../components/Section';
import { Paragraph } from '../components/Paragraph';

import Tilt from 'react-parallax-tilt';

import {
  SiAdobeillustrator,
  SiAngularjs,
  SiCss3,
  SiNodedotjs,
  SiPython,
  SiReact,
} from 'react-icons/si';

const mySkills = [
  {
    title: 'React',
    description: '',
    attr: ['Next.js', 'React Native'],
    img: SiReact,
    bgColor: 'dodgerblue',
  },
  {
    title: 'Angular',
    description: '',
    attr: ['Angular Universal', 'Language Services'],
    img: SiAngularjs,
    bgColor: 'brown',
  },
  {
    title: 'Node',
    description: '',
    attr: ['Express', 'MongoDB', 'GraphQL'],
    img: SiNodedotjs,
    bgColor: 'darkgreen',
  },
  {
    title: 'Python',
    description: '',
    attr: ['Django', 'FastApi'],
    img: SiPython,
    bgColor: 'goldenrod',
  },
  {
    title: 'Css',
    description: '',
    attr: ['Material', 'Bootstap', 'Sass', 'Chakra UI', 'Framer Motion'],
    img: SiCss3,
    bgColor: 'deepskyblue',
  },
  {
    title: 'Design',
    description: '',
    attr: ['Illustrator', 'Photoshop', 'Figma', 'Corel Draw', 'After Effects'],
    img: SiAdobeillustrator,
    bgColor: 'chocolate',
  },
];

const Wrapper = ({ children }) => {
  return (
    <ArticleLayout title="About me">
      <Container>{children}</Container>
    </ArticleLayout>
  );
};

const AboutMe: NextPage = () => {
  return (
    <Wrapper>
      <Section>
        <Heading as="h2" variant="section-title">
          This is me:
        </Heading>

        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          mb={6}
          p={3}
          alignItems="center"
        >
          <Paragraph>
            I am passionate about the world of technology, especially the
            development of web, mobile and decentralized applications. That is
            why I have applied myself to acquire the knowledge and experience
            necessary for these areas. I have achieved this thanks to
            perseverance, discipline and the desire to continue learning, all in
            order to achieve my goals.
          </Paragraph>
        </Box>
      </Section>

      <Section delay={'0.3'}>
        <Heading as="h2" variant="section-title">
          Skills:
        </Heading>

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {mySkills.map(({ title, description, img, bgColor, attr }) => {
            return (
              <Tilt
                tiltMaxAngleX={7}
                tiltMaxAngleY={7}
                // tiltReverse={true}
                key={title}
              >
                <Card maxW="sm" borderRadius="lg" border="2px" h="full">
                  <CardBody p="0">
                    {/* <Image
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt={`My ${title} skill`}
                    /> */}
                    <Center
                      w="full"
                      h="150px"
                      bg={bgColor}
                      color="white"
                      borderTopRadius="md"
                    >
                      <Icon as={img} boxSize={'32'} />
                    </Center>

                    <Stack spacing="3" p="4">
                      <Heading size="md">{title}</Heading>

                      <UnorderedList px="5">
                        {attr.map((items) => {
                          return <ListItem key={items}>{items}</ListItem>;
                        })}
                      </UnorderedList>
                    </Stack>
                  </CardBody>
                </Card>
              </Tilt>
            );
          })}
        </Grid>
      </Section>
    </Wrapper>
  );
};

export default AboutMe;
