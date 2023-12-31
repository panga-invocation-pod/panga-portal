import React from "react"
import { IFormResponderButton } from "../../types"
import FormResponderButton from "./FormResponderButton"

interface FormSubmitButtonsProps {
  buttons?: IFormResponderButton[]
}

export default function FormSubmitButtons({ buttons }: FormSubmitButtonsProps) {
  if (!buttons) return null

  return (
    <div className="button-group">
      {buttons.map((button) => (
        <FormResponderButton {...button} key={button.name} />
      ))}
    </div>
  )
}
