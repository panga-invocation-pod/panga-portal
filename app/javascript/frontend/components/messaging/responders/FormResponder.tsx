import React from "react"
import { Stack } from "@chakra-ui/react"
import { IFormResponder, Respond } from "../types"
import FormResponderButton from "./atoms/FormResponderButton"
import FormResponderField from "./atoms/FormResponderField"

interface FormResponderProps {
  responder: IFormResponder
  respond: Respond
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
