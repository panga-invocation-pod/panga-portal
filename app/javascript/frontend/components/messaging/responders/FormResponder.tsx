import React from "react"
import { Stack, Button } from "@chakra-ui/react"
import { IFormResponder, IFormResponderButton, Respond } from "../types"
import { titleCase } from "title-case"

interface FormResponderProps {
  responder: IFormResponder
  respond: Respond
}

const FormButton = ({ button_type, name, text }: IFormResponderButton) => {
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

export default function FormResponder({
  responder,
  respond,
}: FormResponderProps) {
  return (
    <Stack spacing={4} align="stretch">
      <div className="button-group">
        {responder.buttons.map((button) => (
          <FormButton {...button} />
        ))}
      </div>
    </Stack>
  )
}
