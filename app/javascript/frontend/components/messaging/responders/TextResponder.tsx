import React from "react"
import { IFormResponder, ITextResponder, Respond } from "../types"
import FormResponder from "./FormResponder"

interface TextResponderProps {
  responder: ITextResponder
  respond: Respond
}

export default function TextResponder({
  responder,
  respond,
}: TextResponderProps) {
  const formResponder: IFormResponder = {
    responder_type: "form",
    fields: [
      {
        name: "text",
        label: null,
        field_type: "text",
        required: true,
      },
    ],
    buttons: [
      {
        name: "submit",
        button_type: "submit",
      },
    ],
  }

  return <FormResponder responder={formResponder} respond={respond} />
}
