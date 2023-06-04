import { NextPage } from 'next';
import { ArticleLayout } from '../layouts/Article';
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Image,
} from '@chakra-ui/react';
import { Section } from '../components/Section';
import { Paragraph } from '../components/Paragraph';

const AboutMe: NextPage = () => {
  return (
    <ArticleLayout title="About me">
      <Container>
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
              Me apasiona el mundo de la tecnología, especialmente el desarrollo
              de aplicaciones webs, móviles y descentralizadas. Por eso me he
              aplicado en adquirir el conocimiento y la experiencia necesarias
              para estas áreas. Esto lo he logrado gracias a la perseverancia,
              la disciplina y el deseo de seguir aprendiendo, todo con el fin de
              alcanzar mis metas.
            </Paragraph>
          </Box>
        </Section>

        <Section>
          <Heading as="h2" variant="section-title">
            Skills:
          </Heading>

          <Card maxW="sm">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">React</Heading>
                <Text>
                  This sofa is perfect for modern tropical spaces, baroque
                  inspired spaces, earthy toned spaces and for people who love a
                  chic design with a sprinkle of vintage design.
                </Text>
                <Text color="blue.600" fontSize="2xl">
                  $450
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default AboutMe;
