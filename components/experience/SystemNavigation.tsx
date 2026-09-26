import { Box, Button, Container, Flex, Link, Text } from '@chakra-ui/react';
import { useReducedMotion } from 'framer-motion';
import NextLink from 'next/link';
import { useEffect, useState, type MouseEvent } from 'react';

import { LanguageSwitcher } from '../LanguageSwitcher';
import { Led } from '../ui/Glow';
import { experienceSections } from '../../lib/experience/content';
import {
  experienceLocales,
  useExperienceTranslation,
} from '../../lib/experience/dictionaries';

/**
 * HAESSLER OS navigation.
 *
 * Deliberately not the legacy navbar: a system bar with the section indices,
 * a status LED and scroll-spy, plus the two things a visitor always needs —
 * language and a way out to the classic portfolio.
 *
 * On small screens the anchors scroll horizontally instead of collapsing into
 * a hamburger: one tap beats two, and no drawer state to manage.
 */
export const SystemNavigation = () => {
  const t = useExperienceTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  /**
   * Scroll-spy over the section anchors. Read-only observation of the DOM the
   * page already renders, so nothing is duplicated for the sake of the nav.
   */
  useEffect(() => {
    const elements = experienceSections
      .map((section) => document.getElementById(section.anchor))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [mostVisible] = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (mostVisible) setActiveAnchor(mostVisible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.6] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    anchor: string
  ) => {
    const target = document.getElementById(anchor);

    // No JS target (or middle click): let the browser follow the real anchor.
    if (!target || event.metaKey || event.ctrlKey) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    // Keep the URL shareable without triggering a second jump.
    window.history.replaceState(null, '', `#${anchor}`);
    setActiveAnchor(anchor);
  };

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={30}
      bg="rgba(5, 7, 10, 0.86)"
      backdropFilter="blur(12px)"
      borderBottomWidth="1px"
      borderColor="osBorder"
    >
      <Container maxW="1080px" px={{ base: 5, md: 8 }} pt={3} pb={2}>
        <Flex alignItems="center" justifyContent="space-between" gap={4}>
          <Flex alignItems="center" gap={3} minW={0}>
            <Text
              fontFamily="mono"
              fontSize={{ base: 'xs', sm: 'sm' }}
              letterSpacing="0.18em"
              color="osText"
              whiteSpace="nowrap"
              isTruncated
              minW={0}
            >
              {t.system.name}
            </Text>

            <Flex alignItems="center" gap={2} display={{ base: 'none', sm: 'flex' }}>
              <Led />
              <Text
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.14em"
                color="osAccent"
                whiteSpace="nowrap"
              >
                {t.system.status}
              </Text>
            </Flex>
          </Flex>

          <Flex alignItems="center" gap={{ base: 2, md: 4 }} flexShrink={0}>
            <LanguageSwitcher
              locales={experienceLocales}
              size="xs"
              variant="ghost"
            />

            <Button
              size="xs"
              variant="outline"
              borderColor="osBorder"
              color="osText"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.14em"
              textTransform="uppercase"
              _hover={{ borderColor: 'osAccent', color: 'osAccent' }}
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(0, 229, 255, 0.45)' }}
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('haessler:quick-view')
                )
              }
            >
              {t.shell.quickView}
            </Button>

            <Link
              as={NextLink}
              href="/classic"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="osTextMuted"
              whiteSpace="nowrap"
              _hover={{ color: 'osAccent' }}
            >
              {t.shell.classicPortfolio}
            </Link>
          </Flex>
        </Flex>
      </Container>

      <Box borderTopWidth="1px" borderColor="osBorder" mt={2}>
        <Container maxW="1080px" px={{ base: 5, md: 8 }}>
          <Flex
            as="nav"
            aria-label={t.system.name}
            gap={{ base: 5, md: 7 }}
            overflowX="auto"
            py={3}
            sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
          >
            {experienceSections.map((section) => {
              const isActive = activeAnchor === section.anchor;

              return (
                <Link
                  key={section.id}
                  as={NextLink}
                  href={`/#${section.anchor}`}
                  onClick={(event) => handleAnchorClick(event, section.anchor)}
                  display="flex"
                  alignItems="baseline"
                  gap={2}
                  flexShrink={0}
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  whiteSpace="nowrap"
                  color={isActive ? 'osAccent' : 'osTextSecondary'}
                  borderBottomWidth="1px"
                  borderColor={isActive ? 'osAccent' : 'transparent'}
                  pb={1}
                  _hover={{ color: 'osAccent', borderColor: 'osAccent' }}
                  _focusVisible={{
                    outline: '2px solid',
                    outlineColor: 'osAccent',
                    outlineOffset: '3px',
                  }}
                >
                  <Text as="span" color={isActive ? 'osAccent' : 'osTextMuted'}>
                    {section.index}
                  </Text>
                  {t.nav[section.id]}
                </Link>
              );
            })}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
