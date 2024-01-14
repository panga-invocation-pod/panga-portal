import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Text,
  StackDivider,
  Box,
  Divider,
  VStack,
  HStack,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { IPrompt } from "../messaging/types"

export default function WorkshopSessionDetailsPrompt({
  prompt,
  mode,
  onFinished,
}: {
  prompt: IPrompt
  mode: null | "fast"
  onFinished: () => void
}) {
  useEffect(() => {
    setTimeout(() => onFinished(), 100)
  })

  return (
    <Card direction={{ base: "column" }} overflow="hidden" variant="outline">
      <Image
        objectFit="cover"
        maxW={{ base: "100%" }}
        maxH={300}
        src="https://rsnh.org.au/wp-content/uploads/elementor/thumbs/IMG_9865-scaled-pz3ourhl8lcdtj30x2l2cp58y8s0cdn0syd0gkzxgw.jpg"
        alt="Reynard St Neighbourhood House"
      />

      <Stack>
        <CardBody>
          <Heading size="md" mb={4}>
            Panga Context Setting
          </Heading>

          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Monday 25 Jan, 2024
              </Text>
              <Text>10:00 am - 11:30 am</Text>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Facilitators
              </Text>
              <Text>Teq & Jade</Text>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Reynard St Neighbourhood House
              </Text>
              <Text>104a Reynard Street</Text>
              <Text>Wurrundjeri Country</Text>
              <Text>Coburg 3058 VIC</Text>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Wombat Room
              </Text>
              <Text>Enter via west door and down corridor to your right.</Text>
              <Text mt={4}>
                Wheelchair accessible via ramp at main entrance. Accessible
                toilet.
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Stack direction="row">
            <Button variant="outline" colorScheme="primary">
              Add to Calendar
            </Button>
            <Button variant="outline" colorScheme="primary">
              See map
            </Button>
          </Stack>
        </CardFooter>
      </Stack>
    </Card>
  )
}
