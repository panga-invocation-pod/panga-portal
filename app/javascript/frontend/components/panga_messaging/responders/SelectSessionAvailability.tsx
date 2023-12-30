import React from "react"
import {
  CheckboxGroup,
  Stack,
  Checkbox,
  FormLabel,
  Button,
} from "@chakra-ui/react"
import { CustomResponderProps } from "../../messaging/Responder"
import { DateTime } from "luxon"
import TimeRange from "../../utility/TimeRange"
import { FormProvider, useForm } from "react-hook-form"
import { ValidatedFormControl } from "../../utility/forms"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

interface SessionData {
  id: string
  start_at: string
  end_at: string
}

interface SelectSessionAvailabilityData {
  sessions: Array<SessionData>
}

interface SessionAvailabilityFormFieldValues {
  sessions: Array<string>
}

export default function SelectSessionAvailability({
  responder,
  respond,
}: CustomResponderProps) {
  const data: SelectSessionAvailabilityData = responder.custom_data

  console.log("data", data)

  const validationSchema = yup.object().shape({
    sessions: yup.array().min(1).required(),
  })

  const onSubmit = () => {
    console.log("onSubmit")
  }

  const methods = useForm<SessionAvailabilityFormFieldValues>({
    resolver: yupResolver(validationSchema),
  })
  const { errors } = methods.formState

  console.log("errors", errors)

  return (
    <Stack spacing={4} align="stretch">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={4} align="stretch">
            <ValidatedFormControl fieldError={errors.sessions as any}>
              <FormLabel fontWeight="bold">Select all suitable times</FormLabel>
              <CheckboxGroup colorScheme="primary" defaultValue={[]}>
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
            </ValidatedFormControl>
            <div className="button-group">
              <Button type="submit" colorScheme="primary">
                Done
              </Button>
            </div>
          </Stack>
        </form>
      </FormProvider>
      <div className="button-group">
        <Button type="submit" colorScheme="primary" variant="outline">
          I'm keen, but none of these work
        </Button>
        <Button type="submit" colorScheme="primary" variant="outline">
          I think I'll pass on the workshop
        </Button>
      </div>
    </Stack>
  )
}
