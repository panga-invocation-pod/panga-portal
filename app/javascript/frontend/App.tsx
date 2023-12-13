import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "./theme"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}
