import React from "react"
import { ISelectOptionResponder, Respond } from "../types"

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
        <button
          key={option}
          type="button"
          className="btn btn-outline-primary"
          onClick={() => respond({ text: option })}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
