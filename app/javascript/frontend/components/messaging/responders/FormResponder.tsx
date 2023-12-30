import React from "react"
import { Stack, Button, FormLabel, Textarea } from "@chakra-ui/react"
import {
  IFormResponder,
  IFormResponderButton,
  IFormResponderField,
  Respond,
} from "../types"
import { ValidatedFormControl } from "../../utility/forms"

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

const nameToTitle = (name: string) =>
  capitalizeFirstLetter(name.replace(/_/g, " "))

interface FormResponderProps {
  responder: IFormResponder
  respond: Respond
}

const FormResponderButton = ({
  button_type,
  name,
  text,
}: IFormResponderButton) => {
  return (
    <Button
      type="submit"
      colorScheme="primary"
      variant={button_type == "submit" ? "solid" : "outline"}
    >
      {text || nameToTitle(name)}
    </Button>
  )
}

const FormResponderTextField = ({ name, placeholder }: IFormResponderField) => {
  return <Textarea name={name} placeholder={placeholder} />
}

const fieldTypes = {
  text: FormResponderTextField,
}

const FormResponderField = ({
  field,
  errors,
}: {
  field: IFormResponderField
  errors: any
}) => {
  const FieldComponent = fieldTypes[field.field_type]
  if (!FieldComponent)
    throw new Error(`Unknown field type: ${field.field_type}`)

  return (
    <ValidatedFormControl fieldError={errors}>
      <FormLabel fontWeight="bold">{nameToTitle(field.name)}</FormLabel>
      <FieldComponent {...field} />
    </ValidatedFormControl>
  )
}

export default function FormResponder({
  responder,
  respond,
}: FormResponderProps) {
  const { fields, buttons } = responder

  return (
    <Stack spacing={4} align="stretch">
      <form>
        <Stack spacing={4} align="stretch">
          {fields.map((field) => (
            <FormResponderField field={field} errors={null} />
          ))}
        </Stack>
      </form>
      <div className="button-group">
        {buttons.map((button) => (
          <FormResponderButton {...button} />
        ))}
      </div>
    </Stack>
  )
}
