import { NextPage } from 'next';
import { ArticleLayout } from '../layouts/Article';
import { Box, Container, useColorModeValue } from '@chakra-ui/react';

const Contact: NextPage = () => {
  return (
    <ArticleLayout title="Contact me">
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
      </Container>
    </ArticleLayout>
  );
};

export default Contact;
