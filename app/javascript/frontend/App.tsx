import React from "react"
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react"
const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
})

export default function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <div>hello from react</div>
    </ChakraBaseProvider>
  )
}
