import NextLink from 'next/link';
import {
  Flex,
  Heading,
  Text,
  Container,
  Divider,
  Button,
} from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Container>
      <Heading as="h1">Not Found</Heading>
      <Text>The page you&apos;re looking for was not found</Text>
      <Divider my={6} />

      <Flex my={6} alignItems="center">
        <NextLink href="/">
          <Button colorScheme="teal">Return to home</Button>
        </NextLink>
      </Flex>
    </Container>
  );
};

export default NotFound;
