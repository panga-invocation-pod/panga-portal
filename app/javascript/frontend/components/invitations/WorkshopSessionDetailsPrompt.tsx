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
import { ICustomPrompt } from "../messaging/types"
import { DateTime } from "luxon"
import DateText from "../utility/DateText"
import TimeRange from "../utility/TimeRange"
import { arrayToSentence } from "../utility/strings"

interface IAddress {
  name: string
  addressStreet: string
  suburb: string
  postcode: string
  state: string
  traditionalCountry: string
}

interface ILocation {
  id: number
  name: string
  directions: string
  accessibility: string
  image: {
    url: string
    alt: string
  }
  address: IAddress
}

interface IFacilitator {
  id: number
  name: string
}

interface IWorkshopSession {
  id: number
  name: string
  start_at: string
  end_at: string
  facilitators: IFacilitator[]
  location: ILocation
}

const Address = ({ address }: { address: IAddress }) => (
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

function WorkshopSessionDetailCard({ session }: { session: IWorkshopSession }) {
  return (
    <Card direction={{ base: "column" }} overflow="hidden" variant="outline">
      <Image
        objectFit="cover"
        maxW={{ base: "100%" }}
        maxH={300}
        src={session.location.image.url}
        alt={session.location.image.alt}
      />

      <Stack>
        <CardBody>
          <Heading size="md" mb={4}>
            {session.name}
          </Heading>

          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                <DateText value={DateTime.fromISO(session.start_at)} />
              </Text>
              <TimeRange
                startAt={DateTime.fromISO(session.start_at)}
                endAt={DateTime.fromISO(session.end_at)}
              />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Facilitators
              </Text>
              <Text>
                {arrayToSentence(
                  session.facilitators.map((f) => f.name),
                  "&",
                )}
              </Text>
            </Box>
            <Box>
              <Address address={session.location.address} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                {session.location.name}
              </Text>
              <Text>{session.location.directions}</Text>
              {session.location.accessibility && (
                <Text mt={4}>{session.location.accessibility}</Text>
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

export default function WorkshopSessionDetailsPrompt({
  prompt,
  mode,
  finished,
  onFinished,
}: {
  prompt: ICustomPrompt
  mode: null | "fast"
  finished: boolean
  onFinished: () => void
}) {
  useEffect(() => {
    if (!finished) setTimeout(() => onFinished(), 100)
  }, [prompt, finished])

  const promptSession = prompt.data.session as IWorkshopSession
  console.log("session", promptSession)

  const session: IWorkshopSession = {
    ...promptSession,
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

  return <WorkshopSessionDetailCard session={session} />
}
