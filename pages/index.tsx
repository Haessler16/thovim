import type { NextPage } from 'next';
import { Container, Box, Heading } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Container>
      <Box borderRadius="lg" bg="red" mb={6} p={3} align="center">
        Hello, I´m a full-stack developer based in Venezuela!
      </Box>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Haessler León
          </Heading>
          <p>Digital Craftzman (Artist / Developer / Designer)</p>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
