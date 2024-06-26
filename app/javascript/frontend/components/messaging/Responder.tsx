import React from "react"
import { ICustomResponder, IResponder, Respond } from "./types"
import SelectOptionResponder from "./responders/SelectOptionResponder"
import TextResponder from "./responders/TextResponder"
import { MessagingContext } from "./context"
import FormResponder from "./responders/FormResponder"

export interface ResponderProps {
  responder: IResponder
  respond: Respond
}

export interface CustomResponderProps {
  responder: ICustomResponder
  respond: Respond
}

const responderComponents: {
  [key: string]: React.FC<ResponderProps>
} = {
  select_option: SelectOptionResponder as React.FC<ResponderProps>,
  text: TextResponder as React.FC<ResponderProps>,
  form: FormResponder as React.FC<ResponderProps>,
}

export default function Responder(props: ResponderProps) {
  const config = React.useContext(MessagingContext)
  const { responder_type } = props.responder

  let ResponderComponent = responderComponents[responder_type]

  if (responder_type == "custom") {
    ResponderComponent = config.responders[props.responder.name]
  }

  if (!ResponderComponent) {
    return <div>Unknown responder type: {props.responder.responder_type}</div>
  }

  return (
    <div className="responder">
      <ResponderComponent {...props} />
    </div>
  )
}
