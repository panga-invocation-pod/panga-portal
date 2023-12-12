import React from "react"
import { IResponder } from "./types"
import SelectOptionResponder from "./responders/SelectOptionResponder"

const responderComponents: {
  [key: string]: React.FC<{ responder: IResponder }>
} = {
  select_option: SelectOptionResponder,
}

export default function Responder({ responder }: { responder: IResponder }) {
  const ResponderComponent = responderComponents[responder.responder_type]
  return (
    <div className="responder">
      <ResponderComponent responder={responder} />
    </div>
  )
}
