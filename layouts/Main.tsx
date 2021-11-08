import Header from 'next/head';
import { Navbar } from '../components/Navbar';
import NoSsr from '../components/No-Ssr';
import { Box, Container } from '@chakra-ui/react';
import { VoxelDog } from '../components/Voxel-Dog';

export const MainLayout = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Header>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Haessler Leon</title>
      </Header>

      <Navbar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <NoSsr>
          <VoxelDog />
        </NoSsr>
        {children}
      </Container>
    </Box>
  );
};
