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
} from '@chakra-ui/react';

import { Section } from '../components/Section';
import { Paragraph } from '../components/Paragraph';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { BioSection, BioYear } from '../components/Bio';

import { ArticleLayout } from '../layouts/Article';

const Home: NextPage = () => {
  return (
    <ArticleLayout title="Home">
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          mb={6}
          p={3}
          align="center"
        >
          Hello, I´m a full-stack developer based in Venezuela!
        </Box>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Haessler León
            </Heading>
            <p>Digital Craftzman (Artist / Developer / Designer)</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            align="center"
          >
            <Image
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/takuya.jpg"
              alt="Haessler León"
            />
          </Box>
        </Box>
        <Section delay={'0.1'}>
          <Heading as="h2" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            I´m a full-stack developer based in Venezuela. I´m a passionate
            developer, designer and artist. I´m currently working as a
            freelancer.
            <NextLink href="/work/inkdrop">
              <Link>
                <br />
                <br />
                See my work
              </Link>
            </NextLink>
          </Paragraph>
          <Box align="center" my={4}>
            <NextLink href="/works">
              <Button
                rightIcon={<ChevronRightIcon />}
                colorScheme="teal"
                variantcolor="blue"
              >
                My Portfolio
              </Button>
            </NextLink>
          </Box>
        </Section>
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

        <Section delay={'0.3'}>
          <Heading as="h3" variant="section-title">
            I 💙
          </Heading>
          <Paragraph>
            Art, Music{' '}
            <Link href="https://www.instagram.com/haesslerleon/">Drawing</Link>,{' '}
            <Link href="https://www.instagram.com/haesslerleon/">
              Photography
            </Link>
            , Machine Learning
          </Paragraph>
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default Home;
