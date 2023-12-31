import React from "react"
import { IOption, ISelectOptionResponder, Respond } from "../types"
import { Button, Text } from "@chakra-ui/react"

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
      {responder.options.map(({ text, value, type }: IOption) => (
        <Button
          colorScheme="primary"
          variant={type == "secondary" ? "outline" : "solid"}
          key={text}
          onClick={() => respond({ text: value || text })}
          whiteSpace="normal"
          height="auto"
          blockSize="auto"
        >
          <Text paddingY={2}>{text}</Text>
        </Button>
      ))}
    </div>
  )
}
