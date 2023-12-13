import { extendTheme, theme as chakraTheme } from "@chakra-ui/react"
const { Button, Container } = chakraTheme.components

export const theme = extendTheme({
  components: {
    Button,
    Container,
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
})
