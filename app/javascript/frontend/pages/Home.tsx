import React from "react"
import { Heading, Flex, Center } from "@chakra-ui/react"

export default function Home() {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <Heading>
        <Center>Welcome to Panga</Center>
      </Heading>
      <Center>
        <p>...more coming soon</p>
      </Center>
    </Flex>
  )
}
