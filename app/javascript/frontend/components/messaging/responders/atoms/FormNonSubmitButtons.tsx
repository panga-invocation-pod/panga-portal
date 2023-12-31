import React from "react"
import FormResponderButton from "./FormResponderButton"
import { IFormResponderButton, Respond } from "../../types"

interface FormNonSubmitButtonsProps {
  respond: Respond
  buttons?: IFormResponderButton[]
}

export default function FormNonSubmitButtons({
  respond,
  buttons,
}: FormNonSubmitButtonsProps) {
  const handleButtonClick =
    ({ button_type, name }: IFormResponderButton) =>
    () => {
      respond({ text: name || button_type, submit: false })
    }

  if (!buttons) return null

  return (
    <div className="button-group">
      {buttons.map((button) => (
        <FormResponderButton
          {...button}
          key={button.name}
          onClick={handleButtonClick(button)}
        />
      ))}
    </div>
  )
}
