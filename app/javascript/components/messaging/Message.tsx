import React from "react"
import { IMessage, Respond } from "./types"
import Responder from "./Responder"

interface MessageProps {
  message: IMessage
  respond: Respond
}

export default function Message({ message, respond }: MessageProps) {
  return (
    <div className="message">
      <div className="prompt">{message.prompt}</div>
      <Responder responder={message.responder} respond={respond} />
    </div>
  )
}
