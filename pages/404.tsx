import NextLink from 'next/link';
import {
  Flex,
  Heading,
  Text,
  Container,
  Divider,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from '../lib/dictionaries';

const NotFound = () => {
  const t = useTranslation();

  return (
    <Container>
      <Heading as="h1">{t.notFound.title}</Heading>
      <Text>{t.notFound.text}</Text>
      <Divider my={6} />

      <Flex my={6} alignItems="center">
        <NextLink href="/">
          <Button colorScheme="teal">{t.notFound.backHome}</Button>
        </NextLink>
      </Flex>
    </Container>
  );
};

export default NotFound;
