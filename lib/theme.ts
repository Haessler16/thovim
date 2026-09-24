import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: {
    body: {
      bg: { light: '#f0e7db', dark: '#202023' },
    },
  },
};

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4,
      },
    },
  },

  Link: {
    baseStyle: {
      color: { light: '#3d7aed', dark: '#ff63c3' },
    },
  },
};

const fonts = {
  heading: "'M PLUS Rounded 1c'",
};

const colors = {
  glassTeal: '#88ccca',
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts,
});
