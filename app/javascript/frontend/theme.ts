import {
  extendTheme,
  theme as chakraTheme,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react"
import { cardAnatomy } from "@chakra-ui/anatomy"

const colors = {
  ...chakraTheme.colors,
  primary: {
    main: "#016A6D",
    50: "#015557",
    100: "#015f62",
    200: "#016A6D", //! main
    300: "#1a797c",
    400: "#34888a",
    500: "#4d9799",
    600: "#67a6a7",
    700: "#80b5b6",
    800: "#99c3c5",
    900: "#b3d2d3",
  },
  primaryFontColor: chakraTheme.colors.gray["300"],
  earth: {
    100: "#070404",
    200: "#140b0b",
    300: "#211212",
    400: "#2f1919",
    500: "#3c2020",
    600: "#4a2727",
    700: "#572e2e",
    800: "#643535",
    900: "#723c3c",
  },
  danger: {
    100: "#4d0000",
    200: "#660000",
    300: "#800000",
    400: "#990000",
    500: "#b30000",
    600: "#cc0000",
    700: "#e60000",
    800: "#ff0000",
    900: "#ff1a1a",
  },
}

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const cardBaseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: "earth.600",
  },
  header: {},
  body: {},
  footer: {},
})

const cardSizes = {
  md: definePartsStyle({
    container: {},
  }),
}

export const cardTheme = defineMultiStyleConfig({
  baseStyle: cardBaseStyle,
  sizes: cardSizes,
})

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "earth.300",
      },
    },
  },
  colors: colors,
  components: {
    Button: {
      variants: {
        solid: {
          color: "white",
        },
        outline: {
          color: "primary.300",
          borderColor: "primary.300",
          backgroundColor: "black",
        },
      },
      sizes: {
        md: {
          pt: "4px",
          pb: "2px",
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          color: colors.primaryFontColor,
          borderColor: "black",
          borderWidth: "2px",
          backgroundColor: "earth.600",
          _placeholder: {
            color: colors.primaryFontColor,
            opacity: 0.6,
          },
          _focus: {
            borderColor: "primary.600",
            boxShadow: "0 0 0 1px #016A6D",
          },
        },
      },
    },
    Card: cardTheme,
  },
})
