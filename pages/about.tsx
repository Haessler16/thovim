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
  SimpleGrid,
  Icon,
  Center,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { Section } from '../components/Section';
import { Paragraph } from '../components/Paragraph';
import { useTranslation } from '../lib/dictionaries';

import Tilt from 'react-parallax-tilt';

import {
  SiFigma,
  SiAngular,
  SiCss,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSwift,
  SiShopify,
} from 'react-icons/si';

const mySkills = [
  {
    title: 'React',
    description: '',
    attr: ['React Native', 'Next.js', 'Redux'],
    img: SiReact,
    bgColor: 'dodgerblue',
  },
  {
    title: 'Angular',
    description: '',
    attr: ['Angular Universal', 'Language Services'],
    img: SiAngular,
    bgColor: 'brown',
  },
  {
    title: 'Node',
    description: '',
    attr: ['Express', 'NestJS', 'MongoDB', 'GraphQL'],
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
    title: 'Swift',
    description: '',
    attr: ['iOS Development', 'SwiftUI', 'UIKit'],
    img: SiSwift,
    bgColor: '#FF4B33',
  },
  {
    title: 'Shopify',
    description: '',
    attr: ['Theme Development', 'App Development', 'Liquid'],
    img: SiShopify,
    bgColor: '#96BF47',
  },
  {
    title: 'Css',
    description: '',
    attr: ['Material', 'Bootstap', 'Tailwind', 'Sass', 'Framer Motion'],
    img: SiCss,
    bgColor: 'deepskyblue',
  },
  {
    title: 'Design',
    description: '',
    attr: ['Illustrator', 'Photoshop', 'Figma', 'Corel Draw', 'After Effects'],
    img: SiFigma,
    bgColor: 'chocolate',
  },
];

const Wrapper = ({ children }) => {
  const t = useTranslation();

  return (
    <ArticleLayout title={t.meta.aboutTitle}>
      <Container>{children}</Container>
    </ArticleLayout>
  );
};

const SkillCard = ({ title, img, bgColor, attr }) => (
  <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7}>
    <Card maxW="sm" borderRadius="lg" border="2px" h="full">
      <CardBody p="0">
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
            {attr.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </UnorderedList>
        </Stack>
      </CardBody>
    </Card>
  </Tilt>
);

const AboutMe: NextPage = () => {
  const bgColor = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200');
  const t = useTranslation();

  const skillCards = useMemo(
    () => mySkills.map((skill) => <SkillCard key={skill.title} {...skill} />),
    []
  );

  const introParts = useMemo(() => {
    const [beforeB, rest] = t.about.intro.split('<b>');
    const [bold, afterB] = rest.split('</b>');
    const [line1, line2] = afterB.split('<br/>');
    return { beforeB, bold, line1, line2 };
  }, [t]);

  return (
    <Wrapper>
      <Section>
        <Heading as="h2" variant="section-title">
          {t.about.title}
        </Heading>

        <Box borderRadius="lg" bg={bgColor} mb={6} p={3} alignItems="center">
          <Paragraph>
            {introParts.beforeB}
            <b>{introParts.bold}</b>
            {introParts.line1}
            <br />
            {introParts.line2}
          </Paragraph>
        </Box>
      </Section>

      <Section delay={'0.3'}>
        <Heading as="h2" variant="section-title">
          {t.about.skillsTitle}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {skillCards}
        </SimpleGrid>
      </Section>
    </Wrapper>
  );
};

export default AboutMe;
