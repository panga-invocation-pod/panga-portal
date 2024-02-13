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

const Address = ({ address }) => (
  <>
    <Text fontSize="lg" fontWeight="bold">
      {address.name}
    </Text>
    <Text>{address.addressStreet}</Text>
    <Text>{address.traditionalCountry}</Text>
    <Text>
      {address.suburb} {address.postcode} {address.state}
    </Text>
  </>
)

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
    location: {
      id: 1,
      name: "Wombat Room",
      directions: "Enter via west door and down corridor to your right",
      accessibility: "Wheelchair accessible via ramp at main entrance",
      image: {
        url: "https://rsnh.org.au/wp-content/uploads/2023/12/outdoor-tables-in-lovely-garden-setting-reynard-street-neighbourhood-house-in-coburg.jpg",
        alt: "Reynard St Neighbourhood House",
      },
      address: {
        name: "Reynard St Neighbourhood House",
        addressStreet: "104a Reynard Street",
        suburb: "Coburg",
        postcode: "3058",
        state: "VIC",
        traditionalCountry: "Wurundjeri Country",
      },
    },
  }

  return (
    <Card direction={{ base: "column" }} overflow="hidden" variant="outline">
      <Image
        objectFit="cover"
        maxW={{ base: "100%" }}
        maxH={300}
        src={workshopSession.location.image.url}
        alt={workshopSession.location.image.alt}
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
              <Address address={workshopSession.location.address} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                {workshopSession.location.name}
              </Text>
              <Text>{workshopSession.location.directions}</Text>
              {workshopSession.location.accessibility && (
                <Text mt={4}>{workshopSession.location.accessibility}</Text>
              )}
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
