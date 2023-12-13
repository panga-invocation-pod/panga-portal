import React from "react"
import { ChakraBaseProvider } from "@chakra-ui/react"
import { theme } from "./theme"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"

export default function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  )
}
