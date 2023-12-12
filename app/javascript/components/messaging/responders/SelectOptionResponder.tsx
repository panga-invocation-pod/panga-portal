import React from "react"
import { ISelectOptionResponder } from "../types"

interface SelectOptionResponderProps {
  responder: ISelectOptionResponder
}

export default function SelectOptionResponder({
  responder,
}: SelectOptionResponderProps) {
  return (
    <div className="select-option-responder">
      {responder.options.map((option) => (
        <button key={option} type="button" className="btn btn-outline-primary">
          {option}
        </button>
      ))}
    </div>
  )
}
