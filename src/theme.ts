import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#ffe6f0',
      100: '#ffb8d2',
      200: '#ff8ab5',
      300: '#ff5c98',
      400: '#ff2e7b',
      500: '#ff0062', // 주요 브랜드 색상
      600: '#cc004e',
      700: '#99003a',
      800: '#660027',
      900: '#330013',
    },
    secondary: {
      50: '#e6f2ff',
      100: '#b8daff',
      200: '#8ac2ff',
      300: '#5caaff',
      400: '#2e92ff',
      500: '#007aff', // 보조 브랜드 색상
      600: '#0062cc',
      700: '#004999',
      800: '#003166',
      900: '#001833',
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Open Sans', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
      },
      variants: {
        primary: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        secondary: {
          bg: 'secondary.500',
          color: 'white',
          _hover: {
            bg: 'secondary.600',
          },
        },
      },
    },
  },
});

export default theme;