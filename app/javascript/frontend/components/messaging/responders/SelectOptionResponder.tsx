import React from "react"
import { ISelectOptionResponder, Respond } from "../types"
import { Button } from "@chakra-ui/react"

interface SelectOptionResponderProps {
  responder: ISelectOptionResponder
  respond: Respond
}

export default function SelectOptionResponder({
  responder,
  respond,
}: SelectOptionResponderProps) {
  return (
    <div className="select-option-responder">
      {responder.options.map((option) => (
        <Button
          colorScheme="primary"
          key={option}
          onClick={() => respond({ text: option })}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}
