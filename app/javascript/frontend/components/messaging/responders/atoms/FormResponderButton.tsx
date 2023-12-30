import React from "react"
import { IFormResponderButton } from "../../types"
import { Button } from "@chakra-ui/react"
import { nameToTitle } from "../../../utility/strings"

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

export default FormResponderButton
