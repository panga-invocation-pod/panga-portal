import React from "react"
import {
  Stack,
  Checkbox,
  FormLabel,
  forwardRef,
  CheckboxProps,
} from "@chakra-ui/react"
import { CustomResponderProps } from "../../messaging/Responder"
import {
  Controller,
  FieldValues,
  FormProvider,
  UseFormReturn,
  useForm,
} from "react-hook-form"
import { ValidatedFormControl } from "../../utility/forms"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { IFormResponderButton } from "../../messaging/types"
import FormNonSubmitButtons from "../../messaging/responders/atoms/FormNonSubmitButtons"
import FormSubmitButtons from "../../messaging/responders/atoms/FormSubmitButtons"
import FormCheckboxGroup from "../../messaging/responders/atoms/FormCheckboxGroup"

interface SessionData {
  id: string | number
  start_at: string
  end_at: string
}

interface SelectSessionAvailabilityData {
  sessions: SessionData[]
  buttons?: IFormResponderButton[]
}

interface SessionFieldValues extends FieldValues {
  id: string
}

interface SessionAvailabilityFormFieldValues extends FieldValues {
  sessions: Array<SessionFieldValues>
}

export default function SelectSessionAvailability({
  responder,
  respond,
}: CustomResponderProps) {
  const data: SelectSessionAvailabilityData = responder.custom_data

  const validationSchema = yup.object().shape({
    sessions: yup.array().min(1).required(),
  })

  const handleSubmit = (data: any) => {
    respond({ ...data, submit: true })
  }

  const methods: UseFormReturn<SessionAvailabilityFormFieldValues> =
    useForm<SessionAvailabilityFormFieldValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        sessions: [],
      },
    })
  const { errors } = methods.formState

  console.log("data.sessions", data.sessions)

  return (
    <Stack spacing={4} align="stretch">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Stack spacing={4} align="stretch">
            <ValidatedFormControl fieldError={errors.sessions as any}>
              <FormLabel fontWeight="bold">Select all suitable times</FormLabel>
              <FormCheckboxGroup name="sessions" options={data.sessions} />
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
