import { Logo } from './Logo';
import NextLink from 'next/link';
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
  Flex,
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
      borderRadius="full"
      py={1}
      px={2}
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
        p={2}
        display="flex"
        maxW="container.md"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading as="h1" size="lg" letterSpacing={'tighter'}>
          <Logo />
        </Heading>

        <Flex as="section" gap={2}>
          <Stack
            display={{ base: 'none', md: 'flex' }}
            direction={{ base: 'column', md: 'row' }}
            width={{ base: 'full', md: 'auto' }}
            alignItems="center"
            mt={{ base: 4, md: 0 }}
            fontSize="md"
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

            <Box
              ml={2}
              display={{ base: 'inline-block', md: 'none' }}
              as="section"
            >
              <Menu isLazy={true}>
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="outline"
                  aria-label="Options"
                />

                <MenuList>
                  <MenuItem
                    as={NextLink}
                    href="/about"
                    _active={{ bgColor: 'transparent' }}
                    bg={path === '/about' ? 'whiteAlpha.200' : 'inherit'}
                  >
                    About
                  </MenuItem>

                  <MenuItem
                    href="/works"
                    as={NextLink}
                    _active={{ bgColor: 'transparent' }}
                    bgColor={path === '/works' ? 'whiteAlpha.200' : undefined}
                  >
                    Works
                  </MenuItem>

                  <MenuItem
                    href="/contact"
                    as={NextLink}
                    _active={{ bgColor: 'transparent' }}
                    bgColor={path === '/contact' ? 'whiteAlpha.200' : undefined}
                  >
                    Contact
                  </MenuItem>

                  <MenuItem
                    as={NextLink}
                    href="https://github.com/Haessler16/thovim"
                    _active={{ bgColor: 'transparent' }}
                  >
                    View Source
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
