import React from "react"
import { Stack, Button } from "@chakra-ui/react"
import {
  IFormResponder,
  IFormResponderButton,
  IFormResponderField,
  Respond,
} from "../types"
import { titleCase } from "title-case"

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
      {text || titleCase(name)}
    </Button>
  )
}

const FormResponderTextField = ({ name }: IFormResponderField) => {
  return <div>Text field: {name}</div>
}

const fieldTypes = {
  text: FormResponderTextField,
}

const FormResponderField = (field: IFormResponderField) => {
  const FieldComponent = fieldTypes[field.field_type]
  if (!FieldComponent)
    throw new Error(`Unknown field type: ${field.field_type}`)

  return <FieldComponent {...field} />
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
            <FormResponderField {...field} />
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
