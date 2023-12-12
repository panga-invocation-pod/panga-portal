import React from "react"
import { IResponder, Respond } from "./types"
import SelectOptionResponder from "./responders/SelectOptionResponder"

interface ResponderProps {
  responder: IResponder
  respond: Respond
}

const responderComponents: {
  [key: string]: React.FC<ResponderProps>
} = {
  select_option: SelectOptionResponder,
}

export default function Responder(props: ResponderProps) {
  const ResponderComponent = responderComponents[props.responder.responder_type]
  return (
    <div className="responder">
      <ResponderComponent {...props} />
    </div>
  )
}
