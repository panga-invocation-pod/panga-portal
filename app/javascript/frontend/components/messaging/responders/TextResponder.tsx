import React from "react"
import { ITextResponder, Respond } from "../types"

interface TextResponderProps {
  responder: ITextResponder
  respond: Respond
}

export default function TextResponder({
  responder,
  respond,
}: TextResponderProps) {
  return (
    <div className="text-responder">
      <input
        type="text"
        className="form-control"
        onChange={(e) => respond({ text: e.target.value })}
      />
    </div>
  )
}
