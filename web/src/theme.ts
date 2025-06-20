import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        royalBlueDark: { value: '#091235' },
        royalBlueLight: { value: '#0074B7' },
        navyBlue: { value: '#003B73' },
        navyBlueBlack: { value: '#14202E' },
        midnightBlue: { value: '#2B4257' },
        blueGray: { value: '#88A9C3' },
        babyBlue: { value: '#BFD7ED' },
        blueGrotto: { value: '#60A3D9' },
      },
    },
    semanticTokens: {
      colors: {
        baseColor: {
          value: {
            base: '{colors.babyBlue}',
            _dark: '{colors.royalBlueDark}',
          },
        },
        baseText: {
          value: {
            base: '{colors.navyBlueBlack}',
            _dark: '{colors.blueGray}',
          },
        },
        cardBorder: {
          value: {
            base: '{colors.navyBlue}',
            _dark: '{colors.navyBlueBlack}',
          },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export { system };
