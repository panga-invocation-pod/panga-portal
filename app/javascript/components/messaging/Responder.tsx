import React from "react"
import { IResponder, Respond } from "./types"
import SelectOptionResponder from "./responders/SelectOptionResponder"
import TextResponder from "./responders/TextResponder"

interface ResponderProps {
  responder: IResponder
  respond: Respond
}

const responderComponents: {
  [key: string]: React.FC<ResponderProps>
} = {
  select_option: SelectOptionResponder,
  text: TextResponder,
}

export default function Responder(props: ResponderProps) {
  const ResponderComponent = responderComponents[props.responder.responder_type]

  if (!ResponderComponent) {
    return <div>Unknown responder type: {props.responder.responder_type}</div>
  }

  return (
    <div className="responder">
      <ResponderComponent {...props} />
    </div>
  )
}
