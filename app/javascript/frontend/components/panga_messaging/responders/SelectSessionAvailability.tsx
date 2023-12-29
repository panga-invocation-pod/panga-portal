import React from "react"
import {
  CheckboxGroup,
  Stack,
  Checkbox,
  FormControl,
  FormLabel,
  Box,
  Button,
} from "@chakra-ui/react"
import { CustomResponderProps } from "../../messaging/Responder"
import { DateTime } from "luxon"
import TimeRange from "../../utility/TimeRange"
import { FormProvider, useForm } from "react-hook-form"

interface SessionData {
  id: string
  start_at: string
  end_at: string
}

interface SelectSessionAvailabilityData {
  sessions: Array<SessionData>
}

interface SessionAvailabilityFormFieldValues {}

export default function SelectSessionAvailability({
  responder,
  respond,
}: CustomResponderProps) {
  const data: SelectSessionAvailabilityData = responder.custom_data

  console.log("data", data)

  const onSubmit = () => {
    console.log("onSubmit")
  }

  const methods = useForm<SessionAvailabilityFormFieldValues>({})

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={4} align="stretch">
          <FormControl as="fieldset">
            <FormLabel as="legend" fontWeight="bold">
              Select all suitable times
            </FormLabel>
            <CheckboxGroup colorScheme="green" defaultValue={[]}>
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
          </FormControl>
          <div className="select-option-responder">
            <Button type="submit" colorScheme="primary">
              Done
            </Button>
            <Button type="submit" colorScheme="primary" variant="outline">
              I'm keen, but none of these work
            </Button>
            <Button type="submit" colorScheme="primary" variant="outline">
              I think I'll pass on the workshop
            </Button>
          </div>
        </Stack>
      </form>
    </FormProvider>
  )
}
