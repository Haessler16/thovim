import Link from 'next/link';
import Image from 'next/image';
import { Text, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  &:hover img {
    transform: rotate(20deg);
  }
`;

export const Logo = () => {
  const footPrintImg = `/images/footprint${useColorModeValue('', '-dark')}.png`;

  return (
    <Link href="/" passHref>
      <LogoBox>
        <Image src={footPrintImg} width={25} height={25} alt="logo" />
        <Text
          ml={3}
          fontFamily="M PLUS Rounded 1c"
          color={useColorModeValue('gray.80', 'whiteAlpha.90')}
        >
          Haessler León
        </Text>
      </LogoBox>
    </Link>
  );
};
