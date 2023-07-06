import { Logo } from './Logo';
import NextLink from 'next/link';
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import { ThemeToggleButton } from './ThemeToggleButton';

const LinkItem = ({ href, path, children }) => {
  const active = path === href;
  const inactiveColor = useColorModeValue('gray.800', 'gray.200');
  const activeColor = useColorModeValue('gray.200', 'gray.800');
  const activeBg = useColorModeValue('purple.500', 'orange.200');

  return (
    <Link
      as={NextLink}
      href={href}
      bg={active ? activeBg : undefined}
      color={active ? activeColor : inactiveColor}
      borderRadius="md"
      p={1}
    >
      {children}
    </Link>
  );
};

export const Navbar = (props) => {
  const { path } = props;

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202330')}
      style={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, nmd: 0 }}
        >
          <LinkItem href="/about" path={path}>
            About
          </LinkItem>

          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>

          {/* <LinkItem href="/posts" path={path}>
            Posts
          </LinkItem> */}

          <LinkItem href="/contact" path={path}>
            Contact
          </LinkItem>
        </Stack>

        <Box alignItems="right">
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />

              <MenuList>
                <MenuItem as={NextLink} href="/about">
                  About
                </MenuItem>

                <MenuItem href="/works" as={NextLink}>
                  Works
                </MenuItem>

                <MenuItem href="/contact" as={NextLink}>
                  Contact
                </MenuItem>

                <MenuItem
                  as={NextLink}
                  href="https://github.com/Haessler16/thovim"
                >
                  View Source
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
