import React from "react"
import { IOption, ISelectOptionResponder, Respond } from "../types"
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
    <div className="button-group">
      {responder.options.map(({ text, type }: IOption) => (
        <Button
          colorScheme="primary"
          variant={type == "secondary" ? "outline" : "solid"}
          key={text}
          onClick={() => respond({ text: text })}
        >
          {text}
        </Button>
      ))}
    </div>
  )
}
