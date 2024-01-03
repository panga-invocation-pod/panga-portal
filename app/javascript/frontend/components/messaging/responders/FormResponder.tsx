import React from "react"
import { Stack } from "@chakra-ui/react"
import { IFormResponder, IFormResponderField, Respond } from "../types"
import FormResponderField from "./atoms/FormResponderField"
import * as yup from "yup"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import FormNonSubmitButtons from "./atoms/FormNonSubmitButtons"
import FormSubmitButtons from "./atoms/FormSubmitButtons"

interface FormResponderProps {
  responder: IFormResponder
  respond: Respond
}

function schemaTypeFromField(field: IFormResponderField) {
  switch (field.field_type) {
    case "text":
      return yup.string()
    case "email":
      return yup.string().email("Invalid email")
    case "checkbox_group":
      return yup.array().of(yup.string())
    default:
      throw new Error(`Unknown field type: ${field.field_type}`)
  }
}

function schemaFromField(field: IFormResponderField) {
  let result = schemaTypeFromField(field)
  if (field.required) {
    switch (field.field_type) {
      case "checkbox_group":
        result = result.min(1).required("Required")
      default:
        result = result.required("Required")
    }
  }
  return result
}

function schemaFromFields(fields: IFormResponderField[]) {
  const schema: { [key: string]: any } = {}

  fields.forEach((field) => {
    schema[field.name] = schemaFromField(field)
  })

  return yup.object().shape(schema)
}

export default function FormResponder({
  responder,
  respond,
}: FormResponderProps) {
  const { fields, buttons } = responder

  const validationSchema = schemaFromFields(fields)

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
  })
  const { errors } = methods.formState

  const submitButtons = buttons.filter(
    (button) => button.button_type == "submit",
  )
  const otherButtons = buttons.filter(
    (button) => button.button_type != "submit",
  )

  const handleSubmit = (data: any) => {
    respond({ ...data, submit: true })
  }

  return (
    <Stack spacing={4} align="stretch">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Stack spacing={4} align="stretch">
            {fields.map((field) => (
              <FormResponderField
                key={field.name}
                field={field}
                errors={errors[field.name]}
                registerProps={methods.register(field.name)}
              />
            ))}
            <FormSubmitButtons buttons={submitButtons} />
          </Stack>
        </form>
      </FormProvider>
      <FormNonSubmitButtons respond={respond} buttons={otherButtons} />
    </Stack>
  )
}
