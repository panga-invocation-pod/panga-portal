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
  image?: {
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
  location?: ILocation
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
      {session.location && session.location.image && (
        <Image
          objectFit="cover"
          maxW={{ base: "100%" }}
          maxH={300}
          src={session.location.image.url}
          alt={session.location.image.alt}
        />
      )}

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
            {session.facilitators && session.facilitators.length > 0 && (
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
            )}
            {session.location && (
              <>
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
              </>
            )}
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

export default function EventSessionDetailsPrompt({
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

  const session = prompt.data.session as IWorkshopSession
  console.log("session", session)

  return <WorkshopSessionDetailCard session={session} />
}
