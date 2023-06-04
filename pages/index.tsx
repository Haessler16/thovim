import type { NextPage } from 'next';
import NextLink from 'next/link';
import {
  Container,
  Box,
  Heading,
  Button,
  Image,
  Link,
  useColorModeValue,
  SimpleGrid,
  List,
  ListItem,
  Icon,
} from '@chakra-ui/react';

import { Section } from '../components/Section';
import { Paragraph } from '../components/Paragraph';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { BioSection, BioYear } from '../components/Bio';

import { ArticleLayout } from '../layouts/Article';

import { IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';

import { GridItem } from '../components/GridItem';

import thumbYouTube from '../public/images/links/youtube.png';
import thumbInkdrop from '../public/images/works/inkdrop_eyecatch.png';

const Home: NextPage = () => {
  return (
    <ArticleLayout title="Home">
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          mb={6}
          p={3}
          alignItems="center"
        >
          Hello, I´m a full-stack developer based in Venezuela!
        </Box>
        {/* DESCRIPTION AND PHOTO */}
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Haessler León
            </Heading>

            <p>Digital Enthusiast ( Developer / Designer )</p>
          </Box>

          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            alignItems="center"
          >
            <Image
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/hae.jpeg"
              alt="Haessler León"
            />
          </Box>
        </Box>

        {/* WORK */}
        <Section delay={'0.1'}>
          <Heading as="h2" variant="section-title">
            Work
          </Heading>

          <Paragraph>
            I´m a full-stack developer based in Venezuela. I´m a passionate
            developer, designer and artist. I´m currently working as a
            freelancer.
            <NextLink href="/work/inkdrop">
              <br />
              <br />
              See my work
            </NextLink>
          </Paragraph>

          <Box alignItems="center" my={4}>
            <NextLink href="/works">
              <Button
                rightIcon={<ChevronRightIcon />}
                colorScheme="teal"
                variant="blue"
              >
                My Portfolio
              </Button>
            </NextLink>
          </Box>
        </Section>

        {/* BIOGRAPHY */}
        <Section delay={'0.2'}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>2000</BioYear>I Born in Tachira, Venezuela.
          </BioSection>
          <BioSection>
            <BioYear>2017</BioYear>Start to study Programing.
          </BioSection>
          <BioSection>
            <BioYear>2019 to present</BioYear>Works as a freelancer.
          </BioSection>
        </Section>

        {/* WHAT I LIKE */}
        <Section delay={'0.3'}>
          <Heading as="h3" variant="section-title">
            I 💙
          </Heading>

          <Paragraph>
            Art, Music, Drawing, Photography and Machine Learning
          </Paragraph>
        </Section>

        {/* SOCIAL MEDIA */}
        <Section delay={'0.3'}>
          <Heading as="h3" variant="section-title">
            On the web
          </Heading>

          <List>
            <ListItem>
              <Link href="https://github.com/Haessler16" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoGithub} />}
                >
                  @haessler16
                </Button>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="https://twitter.com/haesslertvm" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoTwitter} />}
                >
                  @haesslertvm
                </Button>
              </Link>
            </ListItem>

            <ListItem>
              <Link
                href="https://www.linkedin.com/in/haessler-leon-633a10182/"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoLinkedin} />}
                >
                  Linkedin
                </Button>
              </Link>
            </ListItem>
          </List>

          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            <GridItem
              href="https://www.youtube.com/devaslife"
              title="Dev as Life"
              thumbnail={thumbYouTube}
            >
              My YouTube channel
            </GridItem>
            <GridItem
              href="https://www.inkdrop.app/"
              title="Inkdrop"
              thumbnail={thumbInkdrop}
            >
              A Markdown note-taking app
            </GridItem>
          </SimpleGrid>

          <Box alignItems="center" my={4}>
            <NextLink href="/posts">
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                Popular posts
              </Button>
            </NextLink>
          </Box>
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default Home;
