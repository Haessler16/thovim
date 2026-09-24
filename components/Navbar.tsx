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
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '../lib/dictionaries';

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
  const t = useTranslation();

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      style={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
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

        <Flex as="section" gap={2} alignItems="center">
          <Stack
            display={{ base: 'none', md: 'flex' }}
            direction={{ base: 'column', md: 'row' }}
            width={{ base: 'full', md: 'auto' }}
            alignItems="center"
            mt={{ base: 4, md: 0 }}
            fontSize="md"
          >
            <LinkItem href="/about" path={path}>
              {t.nav.about}
            </LinkItem>

            <LinkItem href="/works" path={path}>
              {t.nav.works}
            </LinkItem>

            <LinkItem href="/contact" path={path}>
              {t.nav.contact}
            </LinkItem>
          </Stack>

          <Box display="flex" alignItems="center" gap={1}>
            <LanguageSwitcher />

            <ThemeToggleButton />

            <Box
              ml={1}
              display={{ base: 'inline-block', md: 'none' }}
              as="section"
            >
              <Menu isLazy={true}>
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="outline"
                  aria-label={t.nav.options}
                />

                <MenuList>
                  <MenuItem
                    as={NextLink}
                    href="/about"
                    _active={{ bgColor: 'transparent' }}
                    bg={path === '/about' ? 'whiteAlpha.200' : 'inherit'}
                  >
                    {t.nav.about}
                  </MenuItem>

                  <MenuItem
                    href="/works"
                    as={NextLink}
                    _active={{ bgColor: 'transparent' }}
                    bgColor={path === '/works' ? 'whiteAlpha.200' : undefined}
                  >
                    {t.nav.works}
                  </MenuItem>

                  <MenuItem
                    href="/contact"
                    as={NextLink}
                    _active={{ bgColor: 'transparent' }}
                    bgColor={path === '/contact' ? 'whiteAlpha.200' : undefined}
                  >
                    {t.nav.contact}
                  </MenuItem>

                  <MenuItem
                    as={NextLink}
                    href="https://github.com/Haessler16/thovim"
                    _active={{ bgColor: 'transparent' }}
                  >
                    {t.nav.viewSource}
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
