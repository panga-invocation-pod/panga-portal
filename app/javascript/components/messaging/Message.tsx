import React from "react"
import { IMessage } from "./types"
import Responder from "./Responder"

export default function Message({ message }: { message: IMessage }) {
  return (
    <div className="message">
      <div className="prompt">{message.prompt}</div>
      <Responder responder={message.responder} />
    </div>
  )
}
