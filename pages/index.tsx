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
import { useTranslation } from '../lib/dictionaries';

// LAYOUTS
import { ArticleLayout } from '../layouts/Article';

// ICONS
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import thumbDecentral from '../public/images/works/last_preview.jpg';
import thumbAccessPay from '../public/images/works/busi.png';

const Home: NextPage = () => {
  const t = useTranslation();

  return (
    <ArticleLayout title={t.meta.homeTitle}>
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          mb={6}
          p={3}
          alignItems="center"
        >
          {t.index.hero}
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
              {t.meta.name}
            </Heading>

            <p>{t.meta.role}</p>
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
              alt={t.meta.name}
            />
          </Box>
        </Box>

        {/* WORK */}
        <Section delay={'0.1'}>
          <Heading as="h2" variant="section-title">
            {t.index.workTitle}
          </Heading>

          <Paragraph>{t.index.work1}</Paragraph>

          <Paragraph>
            {t.index.work2}
            <br />
            <br />
            <Link as={NextLink} href="/works" color="teal.200">
              {t.index.seeMyWork}
            </Link>
          </Paragraph>

          <Box alignItems="center" my={4}>
            <NextLink href="/works">
              <Button
                rightIcon={<ChevronRightIcon />}
                colorScheme="teal"
                variant="blue"
              >
                {t.index.myPortfolio}
              </Button>
            </NextLink>
          </Box>
        </Section>

        {/* BIOGRAPHY */}
        <Section delay={'0.2'}>
          <Heading as="h3" variant="section-title">
            {t.index.bioTitle}
          </Heading>

          <BioSection>
            <BioYear>2000</BioYear>
            {t.index.bio2000}
          </BioSection>

          <BioSection>
            <BioYear>2017</BioYear>
            {t.index.bio2017}
          </BioSection>

          <BioSection>
            <BioYear>2018 to present</BioYear>
            {t.index.bio2018}
          </BioSection>
        </Section>

        {/* WHAT I LIKE */}
        <Section delay={'0.3'}>
          <Heading as="h3" variant="section-title">
            {t.index.likeTitle}
          </Heading>

          <Paragraph>{t.index.like}</Paragraph>
        </Section>

        {/* SOCIAL MEDIA */}
        <Section delay={'0.3'}>
          <Heading as="h3" variant="section-title">
            {t.index.webTitle}
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
              <Link
                href="https://www.linkedin.com/in/haessler-leon/"
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
            <GridItem
              href="https://decentralfi.io/"
              title="DecentralFi"
              thumbnail={thumbDecentral}
            >
              {t.index.decentralFiDesc}
            </GridItem>

            <GridItem
              href="https://apps.apple.com/ve/app/accesspay/id6740498074"
              title="Access Pay"
              thumbnail={thumbAccessPay}
            >
              {t.index.accessPayDesc}
            </GridItem>
          </SimpleGrid>
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default Home;
