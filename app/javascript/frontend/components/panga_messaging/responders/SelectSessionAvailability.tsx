import React from "react"
import { CheckboxGroup, Stack, Checkbox } from "@chakra-ui/react"
import { CustomResponderProps } from "../../messaging/Responder"
import { DateTime } from "luxon"
import TimeRange from "../../utility/TimeRange"

interface SessionData {
  id: string
  start_at: string
  end_at: string
}

interface SelectSessionAvailabilityData {
  sessions: Array<SessionData>
}

export default function SelectSessionAvailability({
  responder,
  respond,
}: CustomResponderProps) {
  const data: SelectSessionAvailabilityData = responder.custom_data

  console.log("data", data)

  return (
    <CheckboxGroup colorScheme="green" defaultValue={["naruto", "kakashi"]}>
      <Stack spacing={2} direction="column">
        {data.sessions.map((session) => {
          const startAt = DateTime.fromISO(session.start_at)
          const endAt = DateTime.fromISO(session.end_at)

          return (
            <Checkbox key={session.id}>
              {startAt.toFormat("ccc d LLL")}
              , <TimeRange startAt={startAt} endAt={endAt} />
            </Checkbox>
          )
        })}
      </Stack>
    </CheckboxGroup>
  )
}
