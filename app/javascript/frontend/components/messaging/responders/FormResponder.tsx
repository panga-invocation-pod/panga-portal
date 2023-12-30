import React from "react"
import { Stack } from "@chakra-ui/react"
import { IFormResponder, IFormResponderButton, Respond } from "../types"
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

  const handleButtonClick =
    ({ button_type, name }: IFormResponderButton) =>
    () => {
      if (button_type == "submit") {
        console.log("handle submit")
      } else {
        respond({ text: name || button_type })
      }
    }

  return (
    <Stack spacing={4} align="stretch">
      <form>
        <Stack spacing={4} align="stretch">
          {fields.map((field) => (
            <FormResponderField key={field.name} field={field} errors={null} />
          ))}
        </Stack>
      </form>
      <div className="button-group">
        {buttons.map((button) => (
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
