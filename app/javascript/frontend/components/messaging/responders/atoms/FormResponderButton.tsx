import React from "react"
import { IFormResponderButton } from "../../types"
import { Button } from "@chakra-ui/react"
import { nameToTitle } from "../../../utility/strings"

type FormResponderButtonProps = IFormResponderButton & {
  onClick?: () => void
}

const FormResponderButton = ({
  button_type,
  name,
  text,
  onClick,
}: FormResponderButtonProps) => {
  return (
    <Button
      type="submit"
      colorScheme="primary"
      variant={button_type == "submit" ? "solid" : "outline"}
      onClick={onClick}
    >
      {text || nameToTitle(name)}
    </Button>
  )
}

export default FormResponderButton
