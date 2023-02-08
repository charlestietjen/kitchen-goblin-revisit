// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'green'
      }
    }
  }
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
