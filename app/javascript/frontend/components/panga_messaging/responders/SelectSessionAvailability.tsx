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
import { IFormResponderButton } from "../../messaging/types"
import FormResponderButton from "../../messaging/responders/atoms/FormResponderButton"
import FormNonSubmitButtons from "../../messaging/responders/atoms/FormNonSubmitButtons"
import FormSubmitButtons from "../../messaging/responders/atoms/FormSubmitButtons"

interface SessionData {
  id: string
  start_at: string
  end_at: string
}

interface SelectSessionAvailabilityData {
  sessions: SessionData[]
  buttons?: IFormResponderButton[]
}

interface SessionAvailabilityFormFieldValues {
  sessions: Array<string>
}

export default function SelectSessionAvailability({
  responder,
  respond,
}: CustomResponderProps) {
  const data: SelectSessionAvailabilityData = responder.custom_data

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
            <FormSubmitButtons
              buttons={[
                { name: "submit", button_type: "submit", text: "Done" },
              ]}
            />
          </Stack>
        </form>
      </FormProvider>
      <FormNonSubmitButtons respond={respond} buttons={data.buttons} />
    </Stack>
  )
}
