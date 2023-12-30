import React from "react"
import { Stack } from "@chakra-ui/react"
import {
  IFormResponder,
  IFormResponderButton,
  IFormResponderField,
  Respond,
} from "../types"
import FormResponderButton from "./atoms/FormResponderButton"
import FormResponderField from "./atoms/FormResponderField"
import * as yup from "yup"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

interface FormResponderProps {
  responder: IFormResponder
  respond: Respond
}

function schemaTypeFromField(field: IFormResponderField) {
  switch (field.field_type) {
    case "text":
      return yup.string()
    default:
      throw new Error(`Unknown field type: ${field.field_type}`)
  }
}

function schemaFromField(field: IFormResponderField) {
  let result = schemaTypeFromField(field)
  if (field.required) {
    result = result.required("Required")
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

  console.log("errors", errors)

  const handleButtonClick =
    ({ button_type, name }: IFormResponderButton) =>
    () => {
      if (button_type == "submit") {
        console.log("handle submit")
      } else {
        respond({ text: name || button_type })
      }
    }

  const submitButtons = buttons.filter(
    (button) => button.button_type == "submit",
  )
  const otherButtons = buttons.filter(
    (button) => button.button_type != "submit",
  )

  const onSubmit = (data: any) => {
    console.log("on submit", data)
  }

  return (
    <Stack spacing={4} align="stretch">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={4} align="stretch">
            {fields.map((field) => (
              <FormResponderField
                key={field.name}
                field={field}
                errors={errors[field.name]}
              />
            ))}
            <div className="button-group">
              {submitButtons.map((button) => (
                <FormResponderButton {...button} key={button.name} />
              ))}
            </div>
          </Stack>
        </form>
      </FormProvider>
      <div className="button-group">
        {otherButtons.map((button) => (
          <FormResponderButton
            {...button}
            key={button.name}
            onClick={handleButtonClick(button)}
          />
        ))}
      </div>
    </Stack>
  )
}
