import { CheckboxGroup, Stack, Checkbox } from "@chakra-ui/react"
import React from "react"
import { CustomResponderProps } from "../../messaging/Responder"

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
        {data.sessions.map((session) => (
          <Checkbox value={session.id} key={session.id}>
            {session.start_at}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  )
}
