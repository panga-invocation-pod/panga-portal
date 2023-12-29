import { extendTheme, theme as chakraTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "#150b0b",
      },
    },
  },
  colors: {
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
  },
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
  },
})
