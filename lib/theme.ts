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

      // HAESSLER OS variants (additive; legacy headings unaffected).
      'os-eyebrow': {
        fontFamily: 'mono',
        fontSize: 'xs',
        fontWeight: 'normal',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'osTextMuted',
      },
      'os-title': {
        fontFamily: 'heading',
        fontSize: { base: '3xl', md: '4xl' },
        lineHeight: '1.1',
        color: 'osText',
      },
      'os-label': {
        fontFamily: 'mono',
        fontSize: 'xs',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'osAccent',
        fontWeight: 'normal',
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
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
};

const colors = {
  glassTeal: '#88ccca',

  /**
   * HAESSLER OS design tokens.
   * Scoped to the new experience + recruiter pages. The legacy site keeps
   * using the original palette above so its appearance does not change.
   * Flat token names on purpose: they resolve reliably as `bg="osSurface"`.
   */
  osBg: '#05070A',
  osSurface: '#0B1117',
  osElevated: '#111A22',
  osBorder: '#1A2730',
  osText: '#E8F1F5',
  osTextSecondary: '#8A9AA5',
  osTextMuted: '#52616B',
  osAccent: '#00E5FF',
  osAccentSoft: '#4CC9FF',

  /**
   * Semantic area accents for HAESSLER WORLD. Cyan (`osAccent`) remains the
   * primary brand color and covers SYSTEM / ARCHITECTURE / WEB; these are
   * used sparingly, one world area each:
   *   MOBILE → osElectricBlue · WEB3 → osViolet · AI → osMagenta ·
   *   HUMAN → osAmber.
   */
  osElectricBlue: '#3D8BFF',
  osViolet: '#8B5CF6',
  osMagenta: '#E14FD1',
  osAmber: '#F5A97F',
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
