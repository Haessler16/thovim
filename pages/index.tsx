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
import { ChevronRightIcon } from '@chakra-ui/icons';

// COMPONENTS
import { Section } from '../components/Section';
import { Paragraph } from '../components/Paragraph';
import { BioSection, BioYear } from '../components/Bio';
import { GridItem } from '../components/GridItem';

// LAYOUTS
import { ArticleLayout } from '../layouts/Article';

// ICONS
import { IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import thumbDecentral from '../public/images/works/last_preview.jpg';

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
        <Box as="section" display={{ md: 'flex' }}>
          <Box
            flexGrow={1}
            display="flex"
            flexDir="column"
            justifyContent="center"
          >
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
              maxWidth="130px"
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
            In more than 5 years I have been able to work with various
            JavaScript and Python technologies both in Frontend and Backend,
            especially with React.js, Angular and Node.js.
          </Paragraph>

          <Paragraph>
            I have specialized in Web 3 bone technologies, in the creation of
            interfaces for the management of crypto currencies, blockchain and
            virtual wallets. At the same time, I gained experience in the
            creation of complex dashboards that allow the visualization of data
            through graphs.
            <br />
            <br />
            <Link as={NextLink} href="/work/decentralfi" color="teal.200">
              See my work
            </Link>
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
            <BioYear>2018 to present</BioYear>Works as a freelancer.
          </BioSection>
        </Section>

        {/* WHAT I LIKE */}
        <Section delay={'0.3'}>
          <Heading as="h3" variant="section-title">
            I 💙
          </Heading>

          <Paragraph>
            Comics, Drawing, Music, Photography and Machine Learning
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

          <SimpleGrid mt={2} columns={[1, 2, 2]} gap={6}>
            {/* <GridItem
              href="https://www.youtube.com/devaslife"
              title="Dev as Life"
              thumbnail={thumbYouTube}
            >
              My YouTube channel
            </GridItem> */}

            <GridItem
              href="https://decentralfi.io/"
              title="DecentralFi"
              thumbnail={thumbDecentral}
            >
              A crypto decentralize app
            </GridItem>
          </SimpleGrid>

          {/* <Box my={4}>
            <NextLink href="/posts">
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                Popular posts
              </Button>
            </NextLink>
          </Box> */}
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default Home;
