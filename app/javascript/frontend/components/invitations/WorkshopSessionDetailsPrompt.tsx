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
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { IPrompt } from "../messaging/types"
import { DateTime } from "luxon"
import DateText from "../utility/DateText"
import TimeRange from "../utility/TimeRange"
import { arrayToSentence } from "../utility/strings"

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

  const workshopSession = {
    id: 1,
    name: "Panga Context Setting",
    startAt: "2024-01-25T10:00:00.000Z",
    endAt: "2024-01-25T11:30:00.000Z",
    facilitators: [
      {
        id: 1,
        name: "Teq",
      },
      {
        id: 2,
        name: "Jade",
      },
    ],
    // facilitators: [
    //   {
    //     id: 1,
    //     name: "Teq & Jade",
    //   },
    // ],
    // location: {
    //   id: 1,
    //   name: "Reynard St Neighbourhood House",
    //   address: "104a Reynard Street",
    //   suburb: "Coburg",
    //   postcode: "3058",
    //   state: "VIC",
    //   country: "Australia",
    //   wheelchairAccess: true,
    //   wheelchairAccessDescription:
    //     "Wheelchair accessible via ramp at main entrance. Accessible toilet.",
    // },
    // room: {
    //   id: 1,
    //   name: "Wombat Room",
    //   description: "Enter via west door and down corridor to your right.",
    // },
  }

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
            {workshopSession.name}
          </Heading>

          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                <DateText value={DateTime.fromISO(workshopSession.startAt)} />
              </Text>
              <TimeRange
                startAt={DateTime.fromISO(workshopSession.startAt)}
                endAt={DateTime.fromISO(workshopSession.endAt)}
              />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Facilitators
              </Text>
              <Text>
                {arrayToSentence(
                  workshopSession.facilitators.map((f) => f.name),
                  "&",
                )}
              </Text>
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
