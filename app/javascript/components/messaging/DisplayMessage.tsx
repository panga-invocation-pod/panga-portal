import React from "react"

export interface Responder {
  responder_type: string
  options: string[]
}

export interface Message {
  id: string
  prompt: string
  responder: Responder
}

export default function DisplayMessage(message: Message) {
  return <div>{message.prompt}</div>
}
