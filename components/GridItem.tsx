import NextLink from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { ReactNode } from 'react';

interface IGridItemProps {
  children?: ReactNode;
  href: string;
  title: string;
  thumbnail: string | StaticImageData;
}

export const GridItem = ({
  children,
  href,
  title,
  thumbnail,
}: IGridItemProps) => {
  return (
    <Box w="100" alignItems="center">
      <LinkBox cursor="pointer">
        <Image
          src={thumbnail}
          alt={title}
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
        />
        <LinkOverlay href={href} target="_blank">
          <Text mt={2}></Text>
        </LinkOverlay>
        <Text fontSize={14}>{children}</Text>
      </LinkBox>
    </Box>
  );
};

export const WorkGridItem = ({ children, id, title, thumbnail }) => {
  return (
    <Box w="100" alignItems="center">
      <NextLink href={`/works/${id}`}>
        {/* <LinkBox cursor="pointer"> */}
        <Image
          src={thumbnail}
          alt={title}
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
          width="130"
        />

        {/* <LinkOverlay href={`/works/${id}`} target="_blank"> */}
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
        {/* </LinkOverlay> */}

        <Text fontSize={14}>{children}</Text>
        {/* </LinkBox> */}
      </NextLink>
    </Box>
  );
};

export const GridItemStyle = () => (
  <Global
    styles={`.grid-item-thumbnail{
    border-radius: 12px;
  }`}
  />
);
